// scripts/push-footer-menu.js
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

function fetchFooterMenu() {
  const query = 'query { menus(first: 10) { nodes { id title handle } } }';
  const res = runGraphql(query);
  if (!res || !res.menus) return null;
  return res.menus.nodes.find(m => m.handle === 'footer');
}

async function main() {
  console.log('Fetching collections and footer menu...');
  const colMap = fetchCollectionMap();
  const footerMenu = fetchFooterMenu();

  if (!footerMenu) {
    console.error('Could not find footer menu.');
    process.exit(1);
  }

  console.log(`Found Footer Menu ID: ${footerMenu.id}`);

  const colItem = (title, handle) => {
    const col = colMap[handle];
    if (col) {
      return {
        title: title,
        type: 'COLLECTION',
        resourceId: col.id
      };
    }
    return {
      title: title,
      type: 'HTTP',
      url: `/collections/${handle}`
    };
  };

  const menuItems = [
    {
      title: 'Product Range',
      type: 'HTTP',
      url: '/collections/jewellery',
      items: [
        colItem('Engravable jewelry', 'engravable-jewelry'),
        colItem('Handchains', 'handchains'),
        colItem('Bracelets', 'bracelets'),
        colItem('Bangles', 'bangles'),
        colItem('Chains', 'chains'),
        colItem('Earrings', 'earrings'),
        colItem('The ring', 'rings')
      ]
    },
    {
      title: 'Customer service',
      type: 'HTTP',
      url: '/pages/contact',
      items: [
        {
          title: 'Contact',
          type: 'PAGE',
          resourceId: 'gid://shopify/Page/167297155151'
        },
        {
          title: 'FAQ',
          type: 'HTTP',
          url: '/pages/faq'
        },
        {
          title: 'About Us',
          type: 'HTTP',
          url: '/pages/over-ons'
        },
        {
          title: 'Shipping Policy',
          type: 'HTTP',
          url: '/pages/verzendbeleid'
        },
        {
          title: 'Returns Policy',
          type: 'HTTP',
          url: '/pages/retourbeleid'
        },
        {
          title: 'Permanent Jewelry On-Site',
          type: 'HTTP',
          url: '/pages/pae'
        }
      ]
    },
    {
      title: 'Policies',
      type: 'HTTP',
      url: '/pages/algemene-voorwaarden',
      items: [
        {
          title: 'Terms and Conditions',
          type: 'HTTP',
          url: '/pages/algemene-voorwaarden'
        },
        {
          title: 'Privacy Policy',
          type: 'HTTP',
          url: '/pages/privacy'
        },
        {
          title: 'Your Privacy Choices',
          type: 'PAGE',
          resourceId: 'gid://shopify/Page/167297187919'
        },
        {
          title: 'Search',
          type: 'HTTP',
          url: '/search'
        }
      ]
    }
  ];

  console.log('Sending menuUpdate mutation to Shopify Admin...');
  const mutation = `
    mutation UpdateFooterMenu($id: ID!, $title: String!, $handle: String!, $items: [MenuItemUpdateInput!]!) {
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
              url
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
    id: footerMenu.id,
    title: footerMenu.title,
    handle: footerMenu.handle,
    items: menuItems
  };

  const res = runGraphql(mutation, variables, true);
  if (res && res.menuUpdate) {
    const errs = res.menuUpdate.userErrors || [];
    if (errs.length > 0) {
      console.error('Failed to update menu. Errors:', JSON.stringify(errs, null, 2));
    } else {
      console.log('\n======================================================');
      console.log('SUCCESS! Footer Menu has been updated in Shopify Admin!');
      console.log('======================================================\n');
      console.log('Updated footer menu structure:');
      res.menuUpdate.menu.items.forEach(top => {
        console.log(` - ${top.title}`);
        (top.items || []).forEach(sub => {
          console.log(`    └─ ${sub.title} (${sub.url})`);
        });
      });
    }
  } else {
    console.error('Unexpected response:', JSON.stringify(res, null, 2));
  }
}

main();
