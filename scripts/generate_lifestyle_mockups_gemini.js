// scripts/generate_lifestyle_mockups_gemini.js
/**
 * Automated Lifestyle Mockup Generator using Gemini / Imagen 3 API.
 * Reads prompts and metadata from mockup_generation_queue.json,
 * generates 1024x1024 photorealistic images, and converts them to optimized WebP (<110KB).
 *
 * Requirements:
 *   - GEMINI_API_KEY environment variable (or passed via --key=YOUR_KEY)
 *   - cwebp installed (already present at /opt/homebrew/bin/cwebp)
 *
 * Usage:
 *   export GEMINI_API_KEY="AIzaSy..."
 *   node scripts/generate_lifestyle_mockups_gemini.js --limit 5
 *   node scripts/generate_lifestyle_mockups_gemini.js --index 1
 *   node scripts/generate_lifestyle_mockups_gemini.js --all
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

// 1. Config & Paths
const QUEUE_FILE = path.join(__dirname, '..', 'mockup_generation_queue.json');
const OUTPUT_DIR = path.join(process.env.HOME, 'Downloads', 'Aurelle_All_351_Lifestyle_Mockups');

// Parse CLI args
const args = process.argv.slice(2);
let apiKey = process.env.GEMINI_API_KEY || '';
let limit = null;
let singleIndex = null;
let runAll = false;

args.forEach(arg => {
  if (arg.startsWith('--key=')) apiKey = arg.split('=')[1].trim();
  if (arg.startsWith('--limit=')) limit = parseInt(arg.split('=')[1].trim(), 10);
  if (arg === '--limit' && args[args.indexOf(arg) + 1]) limit = parseInt(args[args.indexOf(arg) + 1], 10);
  if (arg.startsWith('--index=')) singleIndex = parseInt(arg.split('=')[1].trim(), 10);
  if (arg === '--index' && args[args.indexOf(arg) + 1]) singleIndex = parseInt(args[args.indexOf(arg) + 1], 10);
  if (arg === '--all') runAll = true;
});

if (!apiKey) {
  console.error('\n❌ ERROR: GEMINI_API_KEY is required!');
  console.error('Run: export GEMINI_API_KEY="your-key-here"');
  console.error('Or pass: node scripts/generate_lifestyle_mockups_gemini.js --key=YOUR_KEY\n');
  process.exit(1);
}

if (!fs.existsSync(QUEUE_FILE)) {
  console.error(`\n❌ ERROR: Queue file not found at ${QUEUE_FILE}\n`);
  process.exit(1);
}

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 2. Load Queue
const queue = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
console.log(`Loaded ${queue.length} products from queue.`);

let tasks = queue;
if (singleIndex !== null) {
  tasks = queue.filter(item => item.index === singleIndex);
} else if (limit) {
  tasks = queue.slice(0, limit);
}

console.log(`Processing ${tasks.length} item(s)...\nOutput directory: ${OUTPUT_DIR}\n`);

// 3. API Call Function using Imagen 3 on Google GenAI endpoint
async function generateImage(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

  const payload = {
    instances: [
      { prompt: prompt }
    ],
    parameters: {
      sampleCount: 1,
      aspectRatio: '1:1',
      outputMimeType: 'image/jpeg',
      personGeneration: 'ALLOW_ADULT'
    }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText}`);
  }

  const json = await res.json();
  if (!json.predictions || json.predictions.length === 0) {
    throw new Error('No predictions returned from Imagen 3 API');
  }

  const b64 = json.predictions[0].bytesBase64Encoded;
  return Buffer.from(b64, 'base64');
}

// 4. Processing Loop
async function processQueue() {
  for (let i = 0; i < tasks.length; i++) {
    const item = tasks[i];
    const targetWebP = path.join(OUTPUT_DIR, item.filename);
    const tempJpg = path.join(OUTPUT_DIR, `temp_${item.index}.jpg`);

    if (fs.existsSync(targetWebP)) {
      console.log(`[${i + 1}/${tasks.length}] ⏭️  Skipping #${item.index} (Already exists: ${item.filename})`);
      continue;
    }

    console.log(`[${i + 1}/${tasks.length}] 🎨 Generating #${item.index}: ${item.title} (${item.category})...`);

    try {
      const imgBuffer = await generateImage(item.prompt);
      fs.writeFileSync(tempJpg, imgBuffer);

      // Convert to optimized WebP (<110KB) via cwebp
      execFileSync('cwebp', ['-q', '82', '-m', '6', tempJpg, '-o', targetWebP], { stdio: 'pipe' });

      // Clean temp jpg
      if (fs.existsSync(tempJpg)) fs.unlinkSync(tempJpg);

      const stats = fs.statSync(targetWebP);
      const kb = (stats.size / 1024).toFixed(1);
      console.log(`  ✅ Saved: ${item.filename} (${kb} KB)`);

      // Gentle rate-limit pause (1.5s) between requests
      await new Promise(r => setTimeout(r, 1500));

    } catch (err) {
      console.error(`  ❌ Failed #${item.index} ${item.title}:`, err.message);
      if (fs.existsSync(tempJpg)) fs.unlinkSync(tempJpg);

      if (err.message.includes('429') || err.message.includes('quota') || err.message.includes('RESOURCE_EXHAUSTED')) {
        console.error('\n⚠️ Rate limit or Quota reached. Stopping process.\n');
        break;
      }
    }
  }

  console.log('\n✨ Batch processing completed!\n');
}

processQueue();
