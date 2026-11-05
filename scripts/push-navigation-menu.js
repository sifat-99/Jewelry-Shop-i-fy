// scripts/push-navigation-menu.js
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

function fetchCollectionMap() {
  const query = 'query { collections(first: 50) { nodes { id handle title } } }';
  const res = runGraphql(query);
  const map = {};
  if (res && res.collections) {
    res.collections.nodes.forEach(c => {
      map[c.handle] = c;
    });
  }
  return map;
}

function fetchMainMenu() {
  const query = 'query { menus(first: 10) { nodes { id title handle } } }';
  const res = runGraphql(query);
  if (!res || !res.menus) return null;
  return res.menus.nodes.find(m => m.handle === 'main-menu');
}

async function main() {
  console.log('Fetching collections and main menu...');
  const colMap = fetchCollectionMap();
  const mainMenu = fetchMainMenu();

  if (!mainMenu) {
    console.error('Could not find main-menu.');
    process.exit(1);
  }

  console.log(`Found Main Menu ID: ${mainMenu.id}`);

  const item = (title, handle, children = []) => {
    const col = colMap[handle];
    if (col) {
      return {
        title: title,
        type: 'COLLECTION',
        resourceId: col.id,
        items: children
      };
    }
    return {
      title: title,
      type: 'HTTP',
      url: `/collections/${handle}`,
      items: children
    };
  };

  const menuItems = [
    item('NEW', 'new'),
    item('BESTSELLERS', 'bestsellers', [
      item('CHAIN', 'chains'),
      item('RING', 'rings'),
      item('EARRINGS', 'earrings'),
      item('BRACELETS', 'bracelets')
    ]),
    item('FINGERPRINT JEWELRY', 'fingerprint-jewelry'),
    item('ENGRAVABLE JEWELRY', 'engravable-jewelry', [
      item('CHAIN', 'engravable-chains'),
      item('RING', 'engravable-rings'),
      item('BRACELETS', 'engravable-bracelets'),
      item('BANGLE', 'engravable-bangles'),
      item('EARRING', 'engravable-earrings'),
      item('KEYCHAINS', 'keychains')
    ]),
    item('JEWELLERY', 'jewellery', [
      item('HANDCHAINS', 'handchains'),
      item('CHAINS', 'chains'),
      item('BANGLES', 'bangles'),
      item('BRACELETS', 'bracelets'),
      item('EARRINGS', 'earrings'),
      item('EARRING SETS', 'earring-sets'),
      item('THE RING', 'rings'),
      item('PIERCINGS', 'piercings', [
        item('BELLY PIERCINGS', 'belly-piercings'),
        item('EAR PIERCING', 'ear-piercings'),
        item('NOSE PIERCINGS', 'nose-piercings')
      ])
    ]),
    item('GENTLEMEN', 'men'),
    item('OUTLET', 'sale'),
    item('PERMANENT JEWELRY', 'permanent-jewelry')
  ];

  console.log(`Pushing ${menuItems.length} top-level items with nested submenus to Main menu...`);

  const mutation = `
    mutation menuUpdate($id: ID!, $title: String!, $handle: String!, $items: [MenuItemUpdateInput!]!) {
      menuUpdate(id: $id, title: $title, handle: $handle, items: $items) {
        menu {
          id
          title
          handle
          items {
            id
            title
            items {
              id
              title
              items {
                id
                title
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    id: mainMenu.id,
    title: mainMenu.title,
    handle: mainMenu.handle,
    items: menuItems
  };

  const res = runGraphql(mutation, variables, true);
  if (res && res.menuUpdate) {
    const errs = res.menuUpdate.userErrors || [];
    if (errs.length > 0) {
      console.error('Failed to update menu. Errors:', JSON.stringify(errs, null, 2));
    } else {
      console.log('\n======================================================');
      console.log('SUCCESS! Main Menu has been updated in Shopify Admin!');
      console.log('======================================================\n');
      console.log('Updated menu structure:');
      res.menuUpdate.menu.items.forEach(top => {
        console.log(` - ${top.title}`);
        (top.items || []).forEach(sub => {
          console.log(`    └─ ${sub.title}`);
          (sub.items || []).forEach(grand => {
            console.log(`        └─ ${grand.title}`);
          });
        });
      });
    }
  } else {
    console.error('Unexpected response:', JSON.stringify(res, null, 2));
  }
}

main();
