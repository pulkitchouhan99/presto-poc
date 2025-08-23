#!/usr/bin/env node

/**
 * Automated Strapi Content Type Setup Script
 * 
 * This script automatically creates all required content types in your Strapi instance.
 * 
 * Prerequisites:
 * 1. Strapi must be running
 * 2. You need an admin JWT token (get it from browser DevTools after logging in)
 * 
 * Usage:
 * STRAPI_URL=http://localhost:1337 ADMIN_JWT=your-admin-jwt node strapi-auto-setup.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const ADMIN_JWT = process.env.ADMIN_JWT;

if (!ADMIN_JWT) {
  console.error('❌ Please provide ADMIN_JWT environment variable');
  console.log('\nHow to get your admin JWT:');
  console.log('1. Login to Strapi admin panel');
  console.log('2. Open browser DevTools (F12)');
  console.log('3. Go to Application/Storage → Local Storage → strapi-admin-auth');
  console.log('4. Copy the token value');
  console.log('5. Run: ADMIN_JWT=your-token node strapi-auto-setup.js\n');
  process.exit(1);
}

async function createContentType(data) {
  const response = await fetch(`${STRAPI_URL}/content-type-builder/content-types`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ADMIN_JWT}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create content type: ${error}`);
  }

  return response.json();
}

async function createComponent(data) {
  const response = await fetch(`${STRAPI_URL}/content-type-builder/components`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ADMIN_JWT}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create component: ${error}`);
  }

  return response.json();
}

async function setupStrapi() {
  console.log('🚀 Starting Strapi automated setup...\n');

  try {
    // Step 1: Create Components
    console.log('📦 Creating components...');

    // navigation.link
    await createComponent({
      component: {
        category: 'navigation',
        displayName: 'Link',
        icon: 'link',
        attributes: {
          label: {
            type: 'string',
            required: true,
          },
          url: {
            type: 'string',
            required: true,
          },
          target: {
            type: 'enumeration',
            enum: ['_self', '_blank'],
            default: '_self',
          },
          icon: {
            type: 'string',
          },
        },
      },
    });
    console.log('✅ Created navigation.link component');

    // ui.button
    await createComponent({
      component: {
        category: 'ui',
        displayName: 'Button',
        icon: 'cursor',
        attributes: {
          label: {
            type: 'string',
            required: true,
          },
          url: {
            type: 'string',
            required: true,
          },
          variant: {
            type: 'enumeration',
            enum: ['primary', 'secondary', 'outline'],
            default: 'primary',
          },
        },
      },
    });
    console.log('✅ Created ui.button component');

    // navigation.social-link
    await createComponent({
      component: {
        category: 'navigation',
        displayName: 'Social Link',
        icon: 'share',
        attributes: {
          platform: {
            type: 'enumeration',
            enum: ['facebook', 'twitter', 'instagram', 'linkedin'],
            required: true,
          },
          url: {
            type: 'string',
            required: true,
          },
        },
      },
    });
    console.log('✅ Created navigation.social-link component');

    // layout.footer-section
    await createComponent({
      component: {
        category: 'layout',
        displayName: 'Footer Section',
        icon: 'layout',
        attributes: {
          title: {
            type: 'string',
            required: true,
          },
          links: {
            type: 'component',
            repeatable: true,
            component: 'navigation.link',
          },
        },
      },
    });
    console.log('✅ Created layout.footer-section component');

    // Step 2: Create Single Types
    console.log('\n📄 Creating single types...');

    // Header
    await createContentType({
      contentType: {
        kind: 'singleType',
        displayName: 'Header',
        singularName: 'header',
        pluralName: 'headers',
        attributes: {
          logo: {
            type: 'media',
            multiple: false,
            allowedTypes: ['images'],
          },
          navigation: {
            type: 'component',
            repeatable: true,
            component: 'navigation.link',
          },
          ctaButton: {
            type: 'component',
            repeatable: false,
            component: 'ui.button',
          },
        },
      },
    });
    console.log('✅ Created Header single type');

    // Footer
    await createContentType({
      contentType: {
        kind: 'singleType',
        displayName: 'Footer',
        singularName: 'footer',
        pluralName: 'footers',
        attributes: {
          description: {
            type: 'text',
          },
          sections: {
            type: 'component',
            repeatable: true,
            component: 'layout.footer-section',
          },
          socialLinks: {
            type: 'component',
            repeatable: true,
            component: 'navigation.social-link',
          },
          copyright: {
            type: 'string',
          },
        },
      },
    });
    console.log('✅ Created Footer single type');

    // Homepage Hero
    await createContentType({
      contentType: {
        kind: 'singleType',
        displayName: 'Homepage Hero',
        singularName: 'homepage-hero',
        pluralName: 'homepage-heroes',
        attributes: {
          title: {
            type: 'string',
            required: true,
          },
          subtitle: {
            type: 'text',
          },
          backgroundImage: {
            type: 'media',
            multiple: false,
            allowedTypes: ['images'],
          },
          backgroundColor: {
            type: 'string',
          },
          ctaButtons: {
            type: 'component',
            repeatable: true,
            component: 'ui.button',
          },
          overlay: {
            type: 'boolean',
            default: false,
          },
          overlayOpacity: {
            type: 'decimal',
            min: 0,
            max: 1,
            default: 0.5,
          },
        },
      },
    });
    console.log('✅ Created Homepage Hero single type');

    // Step 3: Create Collection Types
    console.log('\n📚 Creating collection types...');

    // Carousel Items
    await createContentType({
      contentType: {
        kind: 'collectionType',
        displayName: 'Carousel Item',
        singularName: 'carousel-item',
        pluralName: 'carousel-items',
        attributes: {
          title: {
            type: 'string',
            required: true,
          },
          description: {
            type: 'text',
          },
          image: {
            type: 'media',
            multiple: false,
            required: true,
            allowedTypes: ['images'],
          },
          link: {
            type: 'component',
            repeatable: false,
            component: 'navigation.link',
          },
          order: {
            type: 'integer',
            default: 0,
            min: 0,
          },
          active: {
            type: 'boolean',
            default: true,
          },
        },
      },
    });
    console.log('✅ Created Carousel Item collection type');

    console.log('\n🎉 Setup complete!');
    console.log('\nNext steps:');
    console.log('1. Go to Strapi admin panel');
    console.log('2. Add content to your new content types');
    console.log('3. Set up API permissions (Settings → Roles → Public)');
    console.log('4. Create an API token for the theme');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\nTroubleshooting:');
    console.log('- Make sure Strapi is running');
    console.log('- Check that your admin JWT is valid');
    console.log('- Some content types might already exist');
  }
}

// Run the setup
setupStrapi();