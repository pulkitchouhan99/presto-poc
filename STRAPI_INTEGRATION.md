# Strapi Integration Guide

This guide explains how to connect the Strapi-powered theme with your Strapi CMS.

## Current Implementation

The theme uses **mock data** located in `src/themes/strapi-powered/data/strapi-types.ts`. This simulates the structure of Strapi content but doesn't actually connect to a Strapi instance.

## Integration Options

### Option 1: Build-Time Integration (Recommended)

Create a build script that fetches content from Strapi before building:

```javascript
// scripts/fetch-strapi-content.js
const fs = require('fs');
const fetch = require('node-fetch');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

async function fetchStrapiContent() {
  const headers = {
    'Authorization': `Bearer ${STRAPI_TOKEN}`
  };

  // Fetch header content
  const headerRes = await fetch(`${STRAPI_URL}/api/header?populate=*`, { headers });
  const headerData = await headerRes.json();

  // Fetch footer content
  const footerRes = await fetch(`${STRAPI_URL}/api/footer?populate=deep`, { headers });
  const footerData = await footerRes.json();

  // Fetch other content...

  // Transform Strapi response to match our types
  const content = {
    header: transformHeader(headerData.data),
    footer: transformFooter(footerData.data),
    // ... other content
  };

  // Write to the mock data file
  const output = `
    import { StrapiHeader, StrapiFooter, ... } from './strapi-types';
    
    export const mockStrapiContent = ${JSON.stringify(content, null, 2)};
  `;

  fs.writeFileSync('./src/themes/strapi-powered/data/strapi-content.ts', output);
}

fetchStrapiContent();
```

Then update your package.json:
```json
{
  "scripts": {
    "fetch-content": "node scripts/fetch-strapi-content.js",
    "build": "npm run fetch-content && rsbuild build"
  }
}
```

### Option 2: Environment Variables

Use environment variables for Strapi content IDs:

```javascript
// In your components
const contentId = process.env.REACT_APP_HEADER_CONTENT_ID;
// The platform would need to fetch this content server-side
```

### Option 3: Integration Values

Use the SDK's `integrationValue` loader:

```javascript
const { dataLoaders } = useDataBridge();
const { data: strapiConfig } = useAsyncLoader(() => 
  dataLoaders.integrationValue('strapi_config')
);
```

## Strapi Content Structure

Create these content types in Strapi:

### 1. Header (Single Type)
```
- logo: Media
- navigation: Component
  - links: Component (Repeatable)
    - label: Text
    - url: Text
    - target: Enumeration ['_self', '_blank']
- ctaButton: Component
  - label: Text
  - url: Text
  - variant: Enumeration ['primary', 'secondary']
```

### 2. Footer (Single Type)
```
- description: Text
- sections: Dynamic Zone
  - FooterSection: Component
    - title: Text
    - links: Component (Repeatable)
- socialLinks: Component (Repeatable)
  - platform: Enumeration ['facebook', 'twitter', 'instagram', 'linkedin']
  - url: Text
- copyright: Text
```

### 3. Hero Sections (Collection Type)
```
- title: Text (Required)
- subtitle: Text
- backgroundImage: Media
- backgroundColor: Text
- ctaButtons: Component (Repeatable)
  - label: Text
  - url: Text
  - variant: Enumeration
- overlay: Boolean
- overlayOpacity: Number
```

### 4. Carousel Items (Collection Type)
```
- title: Text (Required)
- description: Text
- image: Media (Required)
- link: Component
  - label: Text
  - url: Text
- order: Number
```

## Testing the Integration

1. Set up your Strapi instance with the content types above
2. Add sample content
3. Run the fetch script to pull content
4. Build and preview your theme

## Important Notes

- The SDK doesn't allow themes to make direct HTTP requests
- All external data must be fetched at build time or provided by the platform
- The `integrationValue` loader is the only runtime data fetching option
- Consider caching strategies for build-time fetching