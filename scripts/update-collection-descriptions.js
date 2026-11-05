// scripts/update-collection-descriptions.js
const { execFileSync } = require('child_process');

const STORE = 'le-velair-w6ickwvy.myshopify.com';

function runGraphql(query, variables = {}, allowMutations = false) {
  const args = ['store', 'execute', '--store', STORE, '--query', query, '--json'];
  if (variables && Object.keys(variables).length > 0) {
    args.push('--variables', JSON.stringify(variables));
  }
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

const DESCRIPTIONS = {
  'new': '<p>Discover our latest arrivals in waterproof and personalized luxury jewelry. Fresh designs handcrafted from premium 18k gold-plated stainless steel.</p>',
  'bestsellers': '<p>Explore our most-coveted, iconic bestselling jewelry pieces. Loved and worn daily by our community worldwide.</p>',
  'fingerprint-jewelry': '<p>Keep your loved ones close with custom laser-engraved fingerprint jewelry. Each piece is truly unique and completely waterproof.</p>',
  'engravable-jewelry': '<p>Personalize your story with custom initials, special dates, and meaningful names. Laser-engraved with exquisite detail on tarnish-free jewelry.</p>',
  'engravable-chains': '<p>Custom engraved chain necklaces crafted from durable waterproof stainless steel with 18k gold plating that never discolours.</p>',
  'engravable-rings': '<p>Meaningful personalized rings engraved with your custom coordinates, roman numerals, or initials.</p>',
  'engravable-bracelets': '<p>Elegant personalized bar and chain bracelets designed for everyday wear and lasting memories.</p>',
  'engravable-bangles': '<p>Sleek, minimalist bangles precision-engraved with your custom message or dates.</p>',
  'engravable-earrings': '<p>Delicate personalized drop and hoop earrings handcrafted with hypoallergenic waterproof materials.</p>',
  'keychains': '<p>Premium personalized stainless steel keychains with custom laser engraving. Designed to endure everyday life.</p>',
  'jewellery': '<p>Explore our complete jewelry collection. 100% waterproof, tarnish-free, and crafted for timeless daily elegance.</p>',
  'handchains': '<p>Exquisite waterproof hand chains designed to drape effortlessly and elevate your everyday style.</p>',
  'chains': '<p>Versatile waterproof chain necklaces, perfect for stacking or wearing as an understated standalone piece.</p>',
  'bangles': '<p>Statement and minimalist waterproof bangles made to be stacked and never taken off.</p>',
  'bracelets': '<p>Timeless waterproof bracelets designed to wear from morning to night, through showers, workouts, and swimming.</p>',
  'earrings': '<p>Hypoallergenic, tarnish-free earrings crafted from surgical stainless steel and 18k gold plating. Gentle on sensitive ears.</p>',
  'earring-sets': '<p>Expertly curated earring sets for the ultimate effortless ear stack.</p>',
  'rings': '<p>Iconic waterproof rings designed to shine without fading, tarnishing, or turning your skin green.</p>',
  'piercings': '<p>Safe, hypoallergenic waterproof piercings designed for everyday comfort and radiance.</p>',
  'belly-piercings': '<p>Premium waterproof belly bars crafted with hypoallergenic materials that never rust or fade.</p>',
  'ear-piercings': '<p>Delicate flat-back and hoop piercings designed specifically for cartilage and lobe wear.</p>',
  'nose-piercings': '<p>Comfortable, hypoallergenic nose studs and hoops made from premium surgical stainless steel.</p>',
  'men': '<p>Contemporary waterproof jewelry designed specifically for gentlemen. Bold, refined, and built to last.</p>',
  'sale': '<p>Limited-time offers on selected luxury waterproof jewelry pieces. Discover exclusive designs at special prices.</p>',
  'permanent-jewelry': '<p>Seamless permanent jewelry welded on-site without a clasp. The ultimate symbol of connection and timeless style.</p>',
  'frontpage': '<p>Discover our signature waterproof luxury collection.</p>'
};

async function main() {
  console.log('Fetching collections...');
  const res = runGraphql('query { collections(first: 50) { nodes { id title handle description } } }');
  if (!res || !res.collections) {
    console.error('Failed to fetch collections.');
    return;
  }

  const collections = res.collections.nodes;
  console.log(`Found ${collections.length} collections.`);

  const mutation = `
    mutation collectionUpdate($input: CollectionInput!) {
      collectionUpdate(input: $input) {
        collection {
          id
          title
          handle
          descriptionHtml
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  for (const col of collections) {
    const desc = DESCRIPTIONS[col.handle];
    if (desc) {
      console.log(`Updating description for [${col.title}] (${col.handle})...`);
      const updateRes = runGraphql(mutation, {
        input: {
          id: col.id,
          descriptionHtml: desc
        }
      }, true);

      if (updateRes && updateRes.collectionUpdate) {
        const errors = updateRes.collectionUpdate.userErrors;
        if (errors && errors.length > 0) {
          console.error(`  [ERROR] on ${col.title}:`, errors);
        } else {
          console.log(`  [OK] Successfully updated ${col.title}`);
        }
      } else {
        console.error(`  [FAIL] Failed to update ${col.title}`);
      }
    } else {
      console.log(`[SKIP] No description mapped for ${col.title} (${col.handle})`);
    }
  }

  console.log('\nAll collection descriptions updated successfully!');
}

main();
