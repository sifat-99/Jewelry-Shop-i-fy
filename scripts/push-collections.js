// scripts/push-collections.js
const { execFileSync } = require('child_process');

const STORE = 'le-velair-w6ickwvy.myshopify.com';

const COLLECTIONS = [
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

function runGraphql(query, allowMutations = false) {
  const args = ['store', 'execute', '--store', STORE, '--query', query, '--json'];
  if (allowMutations) {
    args.push('--allow-mutations');
  }
  try {
    const stdout = execFileSync('shopify', args, { encoding: 'utf8' });
    const idx = stdout.lastIndexOf('\n{');
    if (idx !== -1) {
      return JSON.parse(stdout.slice(idx).trim());
    }
  } catch (err) {
    console.error('Command failed:', err.message);
  }
  return null;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log(`Connecting to ${STORE}...`);
  const query = 'query { collections(first: 100) { nodes { id title handle } } }';
  const existingData = runGraphql(query);
  const existingHandles = new Set();
  if (existingData && existingData.collections) {
    existingData.collections.nodes.forEach(c => {
      existingHandles.add(c.handle);
    });
    console.log(`Found ${existingHandles.size} existing collections:`, Array.from(existingHandles));
  }

  let created = 0;
  for (const col of COLLECTIONS) {
    if (existingHandles.has(col.handle)) {
      console.log(`[EXISTS] ${col.title} (${col.handle})`);
      continue;
    }
    console.log(`[CREATING] ${col.title} (${col.handle})...`);
    const mutation = `mutation { collectionCreate(input: { title: "${col.title}", handle: "${col.handle}" }) { collection { id title handle } userErrors { field message } } }`;
    const res = runGraphql(mutation, true);
    if (res && res.collectionCreate) {
      const errs = res.collectionCreate.userErrors || [];
      if (errs.length > 0) {
        console.warn(`  [WARN] Errors:`, errs);
      } else {
        const c = res.collectionCreate.collection;
        console.log(`  [SUCCESS] Created ${c.title} (${c.handle}) - ID: ${c.id}`);
        created++;
      }
    } else {
      console.error(`  [ERROR] Failed to create ${col.title}`);
    }
    await sleep(200);
  }

  console.log(`\n========================================`);
  console.log(`Done! Successfully created ${created} new collections.`);
  console.log(`========================================\n`);
}

main();
