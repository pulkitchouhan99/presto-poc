# Strapi Setup Guide

This guide will walk you through creating the content types in Strapi for the theme.

## Prerequisites

1. Strapi instance running (v4.x recommended)
2. Admin access to create content types

## Step 1: Create Component Schemas

First, create reusable components in Strapi Admin Panel → Content-Type Builder → Components:

### 1.1 Create "Link" Component (Category: navigation)

```
Fields:
- label (Text) - Required, Short text
- url (Text) - Required, Short text
- target (Enumeration) - Values: _self, _blank (Default: _self)
- icon (Text) - Short text
```

### 1.2 Create "Button" Component (Category: ui)

```
Fields:
- label (Text) - Required, Short text
- url (Text) - Required, Short text
- variant (Enumeration) - Values: primary, secondary, outline (Default: primary)
```

### 1.3 Create "Image" Component (Category: media)

```
Fields:
- image (Media) - Single media, Required
- alternativeText (Text) - Short text
```

### 1.4 Create "Social Link" Component (Category: navigation)

```
Fields:
- platform (Enumeration) - Required, Values: facebook, twitter, instagram, linkedin
- url (Text) - Required, Short text
```

### 1.5 Create "Footer Section" Component (Category: layout)

```
Fields:
- title (Text) - Required, Short text
- links (Component) - Repeatable, navigation.link component
```

## Step 2: Create Single Types

Go to Content-Type Builder → Create new single type:

### 2.1 Header (API ID: header)

```
Fields:
- logo (Media) - Single media
- navigation (Component) - Repeatable, navigation.link
- ctaButton (Component) - Single, ui.button
```

### 2.2 Footer (API ID: footer)

```
Fields:
- description (Text) - Long text
- sections (Component) - Repeatable, layout.footer-section
- socialLinks (Component) - Repeatable, navigation.social-link
- copyright (Text) - Short text
```

### 2.3 Homepage Hero (API ID: homepage-hero)

```
Fields:
- title (Text) - Required, Short text
- subtitle (Text) - Long text
- backgroundImage (Media) - Single media
- backgroundColor (Text) - Short text (for hex color)
- ctaButtons (Component) - Repeatable, ui.button
- overlay (Boolean) - Default: false
- overlayOpacity (Number) - Decimal, Min: 0, Max: 1, Default: 0.5
```

## Step 3: Create Collection Types

### 3.1 Carousel Items (API ID: carousel-item)

```
Fields:
- title (Text) - Required, Short text
- description (Text) - Long text
- image (Media) - Required, Single media
- link (Component) - Single, navigation.link
- order (Number) - Integer, Default: 0
- active (Boolean) - Default: true
```

### 3.2 Pages (API ID: page)

```
Fields:
- title (Text) - Required, Short text
- slug (UID) - Based on title
- hero (Component) - Single component with:
  - title (Text)
  - subtitle (Text)
  - backgroundImage (Media)
- sections (Dynamic Zone) - Allow these components:
  - Content Section:
    - title (Text)
    - content (Rich Text)
    - image (Media)
    - layout (Enumeration: text-left, text-right, centered)
  - Team Section:
    - title (Text)
    - members (Component - Repeatable):
      - name (Text)
      - role (Text)
      - bio (Text)
      - image (Media)
```

## Step 4: Configure Permissions

1. Go to Settings → Users & Permissions Plugin → Roles → Public
2. Enable the following permissions:
   - Header: find
   - Footer: find
   - Homepage-hero: find
   - Carousel-item: find, findOne
   - Page: find, findOne

## Step 5: Create API Token

1. Go to Settings → API Tokens
2. Create new API Token:
   - Name: "Theme Frontend"
   - Description: "Read-only access for theme"
   - Token duration: Unlimited
   - Token type: Read-only
3. Select these permissions:
   - Header: find
   - Footer: find
   - Homepage-hero: find
   - Carousel-item: find
   - Page: find
4. Save and copy the token

## Step 6: Add Sample Content

### Header Content:

```json
{
  "logo": Upload a logo image,
  "navigation": [
    { "label": "Shop", "url": "/shop" },
    { "label": "About", "url": "/about" },
    { "label": "Locations", "url": "/locations" },
    { "label": "Contact", "url": "/contact" }
  ],
  "ctaButton": {
    "label": "Order Now",
    "url": "/shop",
    "variant": "primary"
  }
}
```

### Footer Content:

```json
{
  "description": "Your trusted cannabis dispensary",
  "sections": [
    {
      "title": "Shop",
      "links": [
        { "label": "All Products", "url": "/shop" },
        { "label": "Flower", "url": "/shop/flower" },
        { "label": "Edibles", "url": "/shop/edibles" }
      ]
    },
    {
      "title": "Company",
      "links": [
        { "label": "About Us", "url": "/about" },
        { "label": "Careers", "url": "/careers" }
      ]
    }
  ],
  "socialLinks": [
    { "platform": "instagram", "url": "https://instagram.com/yourstore" },
    { "platform": "facebook", "url": "https://facebook.com/yourstore" }
  ],
  "copyright": "© 2024 Your Store. All rights reserved."
}
```

### Homepage Hero:

```json
{
  "title": "Welcome to Premium Cannabis",
  "subtitle": "Discover our curated selection",
  "backgroundColor": "#1a1a1a",
  "ctaButtons": [
    {
      "label": "Shop Now",
      "url": "/shop",
      "variant": "primary"
    },
    {
      "label": "Learn More",
      "url": "/about",
      "variant": "outline"
    }
  ]
}
```

### Carousel Items (Create 2-3):

```json
{
  "title": "New Arrivals",
  "description": "Check out our latest products",
  "image": Upload promotional image,
  "link": {
    "label": "Shop New",
    "url": "/shop/new"
  },
  "order": 1,
  "active": true
}
```

## Step 7: Test Your Setup

1. Use Postman or curl to test your API:

```bash
# Test header endpoint
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
  http://localhost:1337/api/header?populate=*

# Test carousel items
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
  http://localhost:1337/api/carousel-items?populate=*&sort=order
```

2. Update your `.env` file:

```
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-token-here
```

3. Run the fetch script:

```bash
npm run fetch-content
```

## Strapi Schema Export (Optional)

If you want to export/import these content types, you can use the Strapi Config Sync plugin or export the following files:

- `src/api/*/content-types/*/schema.json`
- `src/components/*/schema.json`

## Next Steps

1. Customize the content types based on your needs
2. Add more fields or components
3. Create additional pages using the Pages collection
4. Set up webhooks to trigger rebuilds when content changes
