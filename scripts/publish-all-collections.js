// scripts/publish-all-collections.js
const { execFileSync } = require('child_process');

const STORE = 'le-velair-w6ickwvy.myshopify.com';
const ONLINE_STORE_PUB_ID = 'gid://shopify/Publication/230157320271';

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

async function main() {
  console.log('Fetching all collections...');
  const query = `query {
    collections(first: 100) {
      nodes {
        id
        title
        handle
        publishedOnPublication(publicationId: "${ONLINE_STORE_PUB_ID}")
      }
    }
  }`;

  const res = runGraphql(query);
  if (!res || !res.collections) {
    console.error('Failed to fetch collections.');
    process.exit(1);
  }

  const collections = res.collections.nodes;
  console.log(`Found ${collections.length} collections.`);

  let publishedCount = 0;
  for (const col of collections) {
    if (col.publishedOnPublication) {
      console.log(`[ALREADY PUBLISHED] ${col.title} (${col.handle})`);
      continue;
    }

    console.log(`[PUBLISHING] ${col.title} (${col.handle})...`);
    const mutation = `mutation {
      publishablePublish(
        id: "${col.id}",
        input: [{ publicationId: "${ONLINE_STORE_PUB_ID}" }]
      ) {
        publishable {
          availablePublicationsCount {
            count
          }
        }
        userErrors {
          field
          message
        }
      }
    }`;

    const mutRes = runGraphql(mutation, true);
    if (mutRes && mutRes.publishablePublish) {
      const errs = mutRes.publishablePublish.userErrors || [];
      if (errs.length > 0) {
        console.warn(`  [WARN] UserErrors for ${col.title}:`, errs);
      } else {
        console.log(`  -> Successfully published "${col.title}" to Online Store!`);
        publishedCount++;
      }
    } else {
      console.error(`  [ERROR] Failed to publish ${col.title}`);
    }
  }

  console.log('\n======================================================');
  console.log(`Finished publishing! Newly published: ${publishedCount} collections.`);
  console.log('======================================================\n');
}

main();
