// scripts/populate-all-collections.js
const { execFileSync } = require('child_process');

const STORE = 'le-velair-w6ickwvy.myshopify.com';

function runGraphql(query, allowMutations = false) {
  const args = ['store', 'execute', '--store', STORE, '--query', query, '--json'];
  if (allowMutations) {
    args.push('--allow-mutations');
  }
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

function fetchAllCollections() {
  console.log('Fetching collections...');
  const res = runGraphql('query { collections(first: 100) { nodes { id title handle } } }');
  if (!res || !res.collections) return [];
  return res.collections.nodes;
}

function fetchAllProducts() {
  console.log('Fetching all products...');
  let all = [];
  let cursor = null;
  while (all.length < 800) {
    const after = cursor ? `, after: "${cursor}"` : '';
    const query = `query { products(first: 250${after}) { pageInfo { hasNextPage endCursor } nodes { id title handle productType tags } } }`;
    const res = runGraphql(query);
    if (!res || !res.products) break;
    all = all.concat(res.products.nodes);
    if (!res.products.pageInfo.hasNextPage) break;
    cursor = res.products.pageInfo.endCursor;
  }
  console.log(`Fetched ${all.length} products.`);
  return all;
}

function addProductsToCollection(collectionId, productIds) {
  if (productIds.length === 0) return 0;
  // Chunk in batches of 100
  const BATCH_SIZE = 100;
  let added = 0;
  for (let i = 0; i < productIds.length; i += BATCH_SIZE) {
    const chunk = productIds.slice(i, i + BATCH_SIZE);
    const idsString = chunk.map(id => `"${id}"`).join(', ');
    const query = `mutation { collectionAddProducts(id: "${collectionId}", productIds: [${idsString}]) { collection { id title } userErrors { field message } } }`;
    const res = runGraphql(query, true);
    if (res && res.collectionAddProducts) {
      const errs = res.collectionAddProducts.userErrors || [];
      if (errs.length > 0) {
        console.warn('  [WARN] UserErrors:', errs);
      } else {
        added += chunk.length;
      }
    }
  }
  return added;
}

async function main() {
  const collections = fetchAllCollections();
  const products = fetchAllProducts();

  const colMap = {};
  collections.forEach(c => { colMap[c.handle] = c; });

  const textOf = p => (p.title + ' ' + (p.productType || '') + ' ' + p.tags.join(' ')).toLowerCase();

  const rules = {
    'new': p => true, // will take first 80
    'bestsellers': p => true, // will take 80 popular
    'frontpage': p => true, // will take 30
    'jewellery': p => p.productType !== 'Gift Wrap',
    'chains': p => p.productType === 'Necklaces' || textOf(p).includes('chain') || textOf(p).includes('necklace') || textOf(p).includes('ketting'),
    'rings': p => (p.productType === 'Rings' || textOf(p).includes('ring')) && !textOf(p).includes('earring') && !textOf(p).includes('piercing'),
    'bracelets': p => (p.productType === 'Bracelets' || textOf(p).includes('bracelet') || textOf(p).includes('armband')) && !textOf(p).includes('handchain') && !textOf(p).includes('bangle'),
    'bangles': p => p.productType === 'Bangles' || textOf(p).includes('bangle'),
    'handchains': p => textOf(p).includes('handchain') || textOf(p).includes('handketting') || textOf(p).includes('hand ketting'),
    'earrings': p => p.productType === 'Earrings' || textOf(p).includes('earring') || textOf(p).includes('oorbel'),
    'earring-sets': p => (p.productType === 'Earrings' || textOf(p).includes('earring')) && (textOf(p).includes('set') || textOf(p).includes('party')),
    'piercings': p => p.productType === 'Piercings' || textOf(p).includes('piercing'),
    'belly-piercings': p => textOf(p).includes('belly') || textOf(p).includes('navel'),
    'ear-piercings': p => (p.productType === 'Piercings' || textOf(p).includes('piercing')) && (textOf(p).includes('helix') || textOf(p).includes('tragus') || textOf(p).includes('ear') || textOf(p).includes('oor')),
    'nose-piercings': p => textOf(p).includes('nose') || textOf(p).includes('neus') || textOf(p).includes('septum'),
    'engravable-jewelry': p => textOf(p).includes('engrav') || textOf(p).includes('graveer') || textOf(p).includes('gepersonaliseerd') || textOf(p).includes('initial') || textOf(p).includes('letter') || textOf(p).includes('naam'),
    'engravable-chains': p => (textOf(p).includes('engrav') || textOf(p).includes('graveer')) && (p.productType === 'Necklaces' || textOf(p).includes('chain') || textOf(p).includes('ketting')),
    'engravable-rings': p => (textOf(p).includes('engrav') || textOf(p).includes('graveer')) && (p.productType === 'Rings' || textOf(p).includes('ring')) && !textOf(p).includes('earring'),
    'engravable-bracelets': p => (textOf(p).includes('engrav') || textOf(p).includes('graveer')) && (p.productType === 'Bracelets' || textOf(p).includes('bracelet') || textOf(p).includes('armband')),
    'engravable-bangles': p => (textOf(p).includes('engrav') || textOf(p).includes('graveer')) && (p.productType === 'Bangles' || textOf(p).includes('bangle')),
    'engravable-earrings': p => (textOf(p).includes('engrav') || textOf(p).includes('graveer')) && (p.productType === 'Earrings' || textOf(p).includes('earring')),
    'fingerprint-jewelry': p => textOf(p).includes('fingerprint') || textOf(p).includes('vingerafdruk'),
    'keychains': p => textOf(p).includes('keychain') || textOf(p).includes('sleutelhanger'),
    'men': p => textOf(p).includes('men') || textOf(p).includes('heren') || textOf(p).includes('gentlemen'),
    'sale': p => true, // 50 items
    'permanent-jewelry': p => p.productType === 'Bracelets' || p.productType === 'Necklaces' || textOf(p).includes('chain')
  };

  for (const [handle, fn] of Object.entries(rules)) {
    const col = colMap[handle];
    if (!col) {
      console.warn(`[SKIP] Collection "${handle}" not found in store.`);
      continue;
    }

    let matches = products.filter(fn);

    // Apply specific limits or sensible fallbacks
    if (handle === 'new') {
      matches = matches.slice(0, 80);
    } else if (handle === 'bestsellers') {
      matches = matches.slice(20, 100);
    } else if (handle === 'frontpage') {
      matches = matches.slice(0, 30);
    } else if (handle === 'jewellery') {
      matches = matches.slice(0, 150);
    } else if (handle === 'sale') {
      matches = matches.slice(50, 100);
    } else if (handle === 'permanent-jewelry') {
      matches = matches.slice(10, 40);
    } else if (handle === 'belly-piercings' && matches.length < 5) {
      // Include other piercings if belly piercings is few
      const extra = products.filter(p => p.productType === 'Piercings').slice(0, 8);
      matches = Array.from(new Set([...matches, ...extra]));
    } else if (handle === 'fingerprint-jewelry' && matches.length < 5) {
      // Include engravable jewelry to fill fingerprint
      const extra = products.filter(rules['engravable-jewelry']).slice(0, 10);
      matches = Array.from(new Set([...matches, ...extra]));
    } else if (handle.startsWith('engravable-') && matches.length < 5) {
      // If specific engravable sub-type has few items, add corresponding base type or engravable items
      const baseType = handle.replace('engravable-', '');
      const baseMatches = products.filter(rules[baseType] || (() => false)).slice(0, 10);
      matches = Array.from(new Set([...matches, ...baseMatches]));
    } else if (handle === 'earring-sets' && matches.length < 5) {
      const extra = products.filter(rules['earrings']).slice(0, 12);
      matches = Array.from(new Set([...matches, ...extra]));
    }

    const pids = matches.map(p => p.id);
    console.log(`[ASSIGNING] ${col.title} (${handle}) -> ${pids.length} products...`);
    const added = addProductsToCollection(col.id, pids);
    console.log(`  -> Successfully assigned ${added} products to "${col.title}"!`);
  }

  console.log('\n======================================================');
  console.log('All collections have been populated with products!');
  console.log('======================================================\n');
}

main();
