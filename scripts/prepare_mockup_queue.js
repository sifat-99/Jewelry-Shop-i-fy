// scripts/prepare_mockup_queue.js
const fs = require('fs');
const path = require('path');

const csv = fs.readFileSync('product_images_mapping.csv', 'utf8');
const lines = csv.split('\n').slice(1).filter(l => l.trim().length > 0);

const queue = [];

lines.forEach((line, idx) => {
  const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  if (parts.length < 3) return;

  const title = parts[0].replace(/"/g, '').trim();
  const handle = parts[1].replace(/"/g, '').trim();
  const category = parts[2].replace(/"/g, '').trim();
  const cleanTitle = title.replace(/[\/\\:*?"<>|]/g, '_');
  const filename = `${cleanTitle}_02-Lifestyle.webp`;

  // Detect metal
  let metal = '18k yellow gold';
  const lower = title.toLowerCase();
  if (lower.includes('silver') || lower.includes('sterling')) {
    metal = '925 sterling silver';
  } else if (lower.includes('rose gold')) {
    metal = '18k rose gold';
  }

  // Detect category-based macro prompt
  let prompt = '';
  if (category.includes('Chains') || category.includes('Necklace') || category.includes('Lockets') || category.includes('Charms')) {
    prompt = `Extreme close-up macro lifestyle photograph strictly focused on the ${title} crafted in ${metal} resting on a woman's collarbone and decolletage. The camera is tightly framed with the jewelry centered as the hero subject in sharp optical focus. She wears an open-collar relaxed crisp white textured linen shirt framing the jewelry. Soft natural morning window daylight, authentic fine human skin texture with subtle natural pores, shallow depth of field. High-end luxury jewelry brand product detail photography, photorealistic 50mm macro look.`;
  } else if (category.includes('Ring')) {
    prompt = `Close-up candid macro lifestyle photograph of an elegant hand wearing the ${title} in ${metal} on the finger. The hand is holding an artisanal matte ceramic coffee mug in a sunlit cafe. Natural warm sunlight, authentic human skin texture with realistic micro-pores and soft knuckle creases, neatly manicured bare nails. Sharp optical focus on the ring metal facets and gemstone details, creamy shallow depth of field bokeh, warm earthy tones, photorealistic editorial look.`;
  } else if (category.includes('Handchains')) {
    prompt = `Detailed macro lifestyle photograph of a woman's hand and wrist resting naturally on a warm neutral linen cafe table. She is wearing the ${title} in ${metal}: delicate chain around the wrist connecting down the back of the hand to the finger loop. Natural ambient daylight, authentic skin texture with realistic delicate pores, sharp optical focus on the hand chain links, subtle blurred cafe background, photorealistic luxury fashion editorial look.`;
  } else if (category.includes('Bangle') || category.includes('Bracelet') || category.includes('Permanent')) {
    prompt = `Macro close-up lifestyle photograph of an elegant wrist resting gracefully on a textured linen table wearing the ${title} in ${metal}. Natural side window lighting casting gentle soft highlights on the polished metal, realistic skin pores and wrist contours, sharp focus on the bracelet details and clasp, shallow depth of field, minimalist luxury jewelry editorial photography.`;
  } else if (category.includes('Earring') || category.includes('Piercing')) {
    prompt = `Intimate macro side-profile photograph strictly focused on the earlobe wearing the ${title} in ${metal}. Soft strands of natural hair are gently tucked behind the ear. Clean natural daylight, authentic skin texture with delicate natural pores, sharp optical focus on the earring, soft out-of-focus background, luxury jewelry brand detail shot, 100% photorealistic.`;
  } else if (category.includes('Men') || category.includes('Gentlemen')) {
    prompt = `Masculine macro lifestyle photograph focused on the ${title} in ${metal} worn on a man's wrist or collarbone. Paired with a dark charcoal textured organic linen shirt, natural directional window daylight, authentic skin texture, sharp metal focus, modern sophisticated luxury aesthetic, photorealistic editorial photography.`;
  } else {
    prompt = `High-end candid lifestyle flatlay and close-up photograph of the ${title} resting on a natural linen and warm wooden cafe table in soft morning daylight. Sharp optical focus on the jewelry piece, natural shadows, authentic editorial composition.`;
  }

  queue.push({
    index: idx + 1,
    title,
    handle,
    category,
    metal,
    filename,
    prompt
  });
});

fs.writeFileSync('mockup_generation_queue.json', JSON.stringify(queue, null, 2));
console.log(`Generated mockup queue with ${queue.length} products in mockup_generation_queue.json`);
