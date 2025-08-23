# Quick Strapi Setup

## Option 1: Manual Setup (Recommended for beginners)

Follow the steps in STRAPI_SETUP_GUIDE.md to create content types through the Strapi admin UI.

## Option 2: Import Schemas (Advanced)

If you're familiar with Strapi's file structure, you can copy these schema files:

1. Copy component schemas to your Strapi project:
   ```bash
   cp strapi-schemas/components/* your-strapi-project/src/components/
   ```

2. Copy API schemas:
   ```bash
   cp -r strapi-schemas/api/* your-strapi-project/src/api/
   ```

3. Restart Strapi to load the new schemas

## Quick Content Type Summary

### 1. Components (Create these first):
- **navigation.link** - For menu items
- **ui.button** - For CTA buttons
- **navigation.social-link** - For social media links
- **layout.footer-section** - For footer sections

### 2. Single Types:
- **Header** - Site header with logo, nav, and CTA
- **Footer** - Site footer with sections and social links
- **Homepage Hero** - Main hero section

### 3. Collection Types:
- **Carousel Items** - Promotional slides
- **Pages** - For About, Terms, etc.

## Essential Fields by Content Type:

### Header
```
- logo: Media (image)
- navigation: Component array (navigation.link)
- ctaButton: Component (ui.button)
```

### Footer
```
- description: Text
- sections: Component array (layout.footer-section)
- socialLinks: Component array (navigation.social-link)
- copyright: Text
```

### Homepage Hero
```
- title: Text (required)
- subtitle: Text
- backgroundImage: Media
- backgroundColor: Text (#hex color)
- ctaButtons: Component array (ui.button)
- overlay: Boolean
- overlayOpacity: Number (0-1)
```

### Carousel Item
```
- title: Text (required)
- description: Text
- image: Media (required)
- link: Component (navigation.link)
- order: Number (for sorting)
- active: Boolean
```

## API Endpoints to Test:

```bash
# Replace YOUR_TOKEN with your actual API token

# Header
curl http://localhost:1337/api/header?populate=* \
  -H "Authorization: Bearer YOUR_TOKEN"

# Footer
curl http://localhost:1337/api/footer?populate=deep \
  -H "Authorization: Bearer YOUR_TOKEN"

# Homepage Hero
curl http://localhost:1337/api/homepage-hero?populate=* \
  -H "Authorization: Bearer YOUR_TOKEN"

# Carousel Items
curl http://localhost:1337/api/carousel-items?populate=*&sort=order \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Minimum Required Content:

1. Create at least one entry for each single type (Header, Footer, Homepage Hero)
2. Create 2-3 Carousel Items for the homepage carousel
3. Set all content to "Published" status
4. Generate an API token with read permissions