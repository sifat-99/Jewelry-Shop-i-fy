// scripts/import-data.js
const https = require('https');

const STORE = process.env.SHOPIFY_STORE || 'le-velair-w6ickwvy.myshopify.com';
const ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN || process.argv[2];

if (!ACCESS_TOKEN) {
  console.error('\n[ERROR] Shopify Admin API Access Token is required.');
  console.error('Usage: node scripts/import-data.js <YOUR_ADMIN_API_ACCESS_TOKEN>\n');
  console.error('Or set environment variable: export SHOPIFY_ACCESS_TOKEN=shpat_xxxx\n');
  process.exit(1);
}

const COLLECTIONS = [
  { title: 'New', handle: 'new' },
  { title: 'Bestsellers', handle: 'bestsellers' },
  { title: 'Fingerprint Jewelry', handle: 'fingerprint-jewelry' },
  { title: 'Engravable Jewelry', handle: 'engravable-jewelry' },
  { title: 'Engravable Chains', handle: 'engravable-chains' },
  { title: 'Engravable Rings', handle: 'engravable-rings' },
  { title: 'Engravable Bracelets', handle: 'engravable-bracelets' },
  { title: 'Engravable Bangles', handle: 'engravable-bangles' },
  { title: 'Engravable Earrings', handle: 'engravable-earrings' },
  { title: 'Keychains', handle: 'keychains' },
  { title: 'Jewellery', handle: 'jewellery' },
  { title: 'Handchains', handle: 'handchains' },
  { title: 'Chains', handle: 'chains' },
  { title: 'Bangles', handle: 'bangles' },
  { title: 'Bracelets', handle: 'bracelets' },
  { title: 'Earrings', handle: 'earrings' },
  { title: 'Earring Sets', handle: 'earring-sets' },
  { title: 'The Ring', handle: 'rings' },
  { title: 'Piercings', handle: 'piercings' },
  { title: 'Belly Piercings', handle: 'belly-piercings' },
  { title: 'Ear Piercings', handle: 'ear-piercings' },
  { title: 'Nose Piercings', handle: 'nose-piercings' },
  { title: 'Gentlemen', handle: 'men' },
  { title: 'Outlet', handle: 'sale' },
  { title: 'Permanent Jewelry', handle: 'permanent-jewelry' }
];

function request(path, method, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: STORE,
      port: 443,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ACCESS_TOKEN,
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            resolve({ error: true, statusCode: res.statusCode, data: parsed });
          }
        } catch (e) {
          resolve({ error: true, statusCode: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function graphql(query, variables = {}) {
  return request('/admin/api/2024-01/graphql.json', 'POST', { query, variables });
}

async function getExistingCollections() {
  console.log('Fetching existing collections...');
  const res = await request('/admin/api/2024-01/custom_collections.json?limit=250', 'GET');
  if (res.error) {
    console.error('Error fetching collections:', res);
    return [];
  }
  return res.custom_collections || [];
}

async function createCollections() {
  console.log('\n--- Creating Collections ---');
  const existing = await getExistingCollections();
  const existingHandles = new Set(existing.map(c => c.handle));

  for (const col of COLLECTIONS) {
    if (existingHandles.has(col.handle)) {
      console.log(`[EXISTS] Collection "${col.title}" (${col.handle}) already exists.`);
      continue;
    }

    console.log(`[CREATING] Collection "${col.title}" (${col.handle})...`);
    const res = await request('/admin/api/2024-01/custom_collections.json', 'POST', {
      custom_collection: {
        title: col.title,
        handle: col.handle,
        published: true
      }
    });

    if (res.error) {
      console.warn(`[WARNING] Failed to create collection "${col.title}":`, JSON.stringify(res));
    } else {
      console.log(`[SUCCESS] Created "${col.title}"!`);
    }

    // Rate limiting delay
    await new Promise(r => setTimeout(r, 400));
  }
}

async function setupNavigationMenu() {
  console.log('\n--- Setting up Dynamic Navigation Menu ---');
  // Check menus
  const query = `
    query {
      menus(first: 20) {
        nodes {
          id
          title
          handle
        }
      }
    }
  `;
  const res = await graphql(query);
  if (res.error || !res.data) {
    console.warn('Could not query menus via GraphQL:', res);
    return;
  }

  console.log('Existing menus in store:', res.data.menus.nodes.map(m => `${m.title} (${m.handle})`));
}

async function main() {
  console.log(`Target Store: ${STORE}`);
  await createCollections();
  await setupNavigationMenu();
  console.log('\nAll done! Collections are ready on your store.\n');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
