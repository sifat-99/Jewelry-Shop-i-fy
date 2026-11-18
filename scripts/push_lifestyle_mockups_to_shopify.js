// scripts/push_lifestyle_mockups_to_shopify.js
/**
 * Automatically pushes the new 2nd lifestyle mockups to all products on Shopify.
 * Replaces the old 2nd image (position 2) with the newly approved photorealistic WebP mockups.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const STORE = 'le-velair-w6ickwvy.myshopify.com';
const MOCKUP_DIR = path.join(process.env.HOME, 'Downloads', 'Aurelle_All_351_Lifestyle_Mockups');

function runGraphql(query, allowMutations = false) {
  const args = ['store', 'execute', '--store', STORE, '--query', query, '--json'];
  if (allowMutations) args.push('--allow-mutations');
  try {
    const stdout = execFileSync('shopify', args, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    const lines = stdout.split('\n');
    const jsonText = lines.filter(l => !l.startsWith('{"type":"progress"')).join('\n');
    return JSON.parse(jsonText.trim());
  } catch (err) {
    console.error('GraphQL Error:', err.message);
  }
  return null;
}

async function uploadLocalFileToShopify(filePath, filename) {
  // 1. Stage upload
  const ext = path.extname(filename).toLowerCase();
  const mimeType = ext === '.webp' ? 'image/webp' : ext === '.png' ? 'image/png' : 'image/jpeg';
  
  const stageMutation = `mutation {
    stagedUploadsCreate(input: [{
      resource: IMAGE,
      filename: "${filename}",
      mimeType: "${mimeType}",
      httpMethod: POST
    }]) {
      stagedTargets {
        url
        resourceUrl
        parameters {
          name
          value
        }
      }
      userErrors {
        field
        message
      }
    }
  }`;

  const stageRes = runGraphql(stageMutation, true);
  if (!stageRes?.data?.stagedUploadsCreate?.stagedTargets?.[0]) {
    throw new Error('Failed to create staged upload target');
  }

  const target = stageRes.data.stagedUploadsCreate.stagedTargets[0];
  
  // 2. HTTP POST upload using curl
  const curlArgs = ['-s', '-X', 'POST', target.url];
  for (const param of target.parameters) {
    curlArgs.push('-F', `${param.name}=${param.value}`);
  }
  curlArgs.push('-F', `file=@${filePath}`);

  execFileSync('curl', curlArgs, { stdio: 'pipe' });

  return target.resourceUrl;
}

async function main() {
  console.log('=== Shopify Lifestyle Mockups Push Pipeline ===\n');

  if (!fs.existsSync(MOCKUP_DIR)) {
    console.error(`Mockup directory not found: ${MOCKUP_DIR}`);
    console.error('Please ensure the mockups are generated before running this script.');
    process.exit(1);
  }

  const files = fs.readdirSync(MOCKUP_DIR).filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'));
  console.log(`Found ${files.length} mockup files in ${MOCKUP_DIR}.\n`);

  // Fetch all products from store
  console.log('Fetching store products...');
  let allProducts = [];
  let cursor = null;
  while (true) {
    const after = cursor ? `, after: "${cursor}"` : '';
    const query = `query {
      products(first: 250${after}) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id
          title
          handle
          media(first: 10) {
            nodes {
              id
              mediaContentType
              status
              ... on MediaImage {
                image {
                  url
                }
              }
            }
          }
        }
      }
    }`;
    const res = runGraphql(query);
    allProducts = allProducts.concat(res.data.products.nodes);
    if (!res.data.products.pageInfo.hasNextPage) break;
    cursor = res.data.products.pageInfo.endCursor;
  }
  console.log(`Fetched ${allProducts.length} products from Shopify.\n`);

  let updatedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < allProducts.length; i++) {
    const product = allProducts[i];
    const cleanTitle = product.title.replace(/[\/\\:*?"<>|]/g, '_');
    
    // Find matching mockup file
    const matchedFile = files.find(f => {
      const lowerF = f.toLowerCase();
      const lowerTitle = cleanTitle.toLowerCase();
      return lowerF.startsWith(lowerTitle) || lowerF.includes(product.handle);
    });

    if (!matchedFile) {
      console.log(`[${i + 1}/${allProducts.length}] [SKIP] No mockup found for: ${product.title}`);
      skippedCount++;
      continue;
    }

    console.log(`[${i + 1}/${allProducts.length}] Processing: ${product.title}...`);
    const filePath = path.join(MOCKUP_DIR, matchedFile);

    try {
      // 1. Upload new image
      const resourceUrl = await uploadLocalFileToShopify(filePath, matchedFile);

      // 2. Attach new media to product
      const createMediaMutation = `mutation {
        productCreateMedia(
          productId: "${product.id}",
          media: [{
            originalSource: "${resourceUrl}",
            alt: "${cleanTitle} – Lifestyle product image",
            mediaContentType: IMAGE
          }]
        ) {
          media {
            id
            status
          }
          userErrors {
            field
            message
          }
        }
      }`;
      const createRes = runGraphql(createMediaMutation, true);
      const newMediaId = createRes?.data?.productCreateMedia?.media?.[0]?.id;

      if (!newMediaId) {
        console.error(`  [ERROR] Failed to attach media to ${product.title}`);
        continue;
      }

      // 3. Identify old 2nd image (position 2)
      const currentMedia = product.media?.nodes || [];
      const oldLifestyleMedia = currentMedia[1]; // index 1 is position 2

      // 4. Delete old 2nd image if it exists
      if (oldLifestyleMedia && oldLifestyleMedia.id) {
        const deleteMutation = `mutation {
          productDeleteMedia(
            productId: "${product.id}",
            mediaIds: ["${oldLifestyleMedia.id}"]
          ) {
            deletedMediaIds
            userErrors {
              field
              message
            }
          }
        }`;
        runGraphql(deleteMutation, true);
      }

      // 5. Reorder media so new image sits at position 2
      const updatedMediaList = currentMedia
        .filter(m => !oldLifestyleMedia || m.id !== oldLifestyleMedia.id)
        .map(m => m.id);
      
      // Insert newMediaId at position 2 (index 1)
      updatedMediaList.splice(1, 0, newMediaId);

      const reorderMoves = updatedMediaList.map((id, index) => `{ id: "${id}", newPosition: "${index}" }`).join(', ');
      const reorderMutation = `mutation {
        productReorderMedia(
          id: "${product.id}",
          moves: [${reorderMoves}]
        ) {
          userErrors {
            field
            message
          }
        }
      }`;
      runGraphql(reorderMutation, true);

      console.log(`  -> Successfully updated 2nd lifestyle image for "${product.title}"!`);
      updatedCount++;
    } catch (err) {
      console.error(`  [ERROR] Exception processing ${product.title}:`, err.message);
    }
  }

  console.log('\n======================================================');
  console.log(`Pipeline Complete!`);
  console.log(`Successfully Updated: ${updatedCount} products`);
  console.log(`Skipped: ${skippedCount} products`);
  console.log('======================================================\n');
}

main();
