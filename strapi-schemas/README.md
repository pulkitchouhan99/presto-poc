# Strapi Schemas for Intro Section

This directory contains the schema definitions and sample data for the Intro Section content type in Strapi.

## Files Structure

```
strapi-schemas/
├── intro-section.json              # Main collection type schema
├── components/
│   ├── shared.cta-button.json      # CTA Button component
│   └── shared.seo.json             # SEO component  
├── sample-data.json                # Sample content data
└── README.md                       # This file
```

## Installation Methods

### Method 1: Manual Creation in Strapi Admin

1. **Create Components First:**
   - Go to Content-Types Builder → Components
   - Create `shared.cta-button` using the JSON structure
   - Create `shared.seo` using the JSON structure

2. **Create Collection Type:**
   - Go to Content-Types Builder → Collection Types
   - Create "Intro Section" using the JSON structure
   - Link the components created in step 1

### Method 2: File System Import (Advanced)

If you have access to your Strapi project files:

1. **Copy schema files to Strapi:**
   ```bash
   # In your Strapi project directory
   mkdir -p src/api/intro-section/content-types/intro-section/
   cp intro-section.json src/api/intro-section/content-types/intro-section/schema.json
   
   # Copy components
   mkdir -p src/components/shared/
   cp components/shared.cta-button.json src/components/shared/cta-button.json
   cp components/shared.seo.json src/components/shared/seo.json
   ```

2. **Restart Strapi:**
   ```bash
   npm run develop
   ```

### Method 3: Import via Strapi CLI (if available)

```bash
# Import content types
strapi import --content-types intro-section.json

# Import components  
strapi import --components shared.cta-button.json shared.seo.json
```

## Field Descriptions

### Intro Section Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | Yes | Main heading text (max 255 chars) |
| `content` | Rich Text | Yes | Main content with markdown support |
| `layout` | Enum | Yes | Layout style: centered, left-aligned, right-aligned |
| `order` | Integer | No | Display order (default: 0) |
| `backgroundImage` | Media | No | Background image (images only) |
| `ctaButtons` | Component | No | Repeatable CTA button components |
| `isActive` | Boolean | Yes | Whether section is active (default: true) |
| `slug` | UID | No | Auto-generated from title |
| `seo` | Component | No | SEO metadata component |

### CTA Button Component Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | String | Yes | Button text (max 100 chars) |
| `url` | String | Yes | Link URL (max 500 chars) |
| `variant` | Enum | Yes | Style: primary, secondary, outline, ghost |
| `icon` | String | No | Icon name (max 50 chars) |
| `openInNewTab` | Boolean | No | Open link in new tab (default: false) |
| `size` | Enum | No | Button size: small, medium, large |
| `isDisabled` | Boolean | No | Disable button (default: false) |

### SEO Component Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `metaTitle` | String | No | SEO title (max 60 chars) |
| `metaDescription` | Text | No | SEO description (max 160 chars) |
| `keywords` | String | No | SEO keywords (max 255 chars) |
| `metaImage` | Media | No | Social media image |
| `canonicalURL` | String | No | Canonical URL (max 500 chars) |
| `noIndex` | Boolean | No | Prevent search indexing (default: false) |
| `structuredData` | JSON | No | Schema.org structured data |

## API Endpoints

After creating the content type, these endpoints will be available:

- `GET /api/intro-sections` - Get all intro sections
- `GET /api/intro-sections/:id` - Get specific intro section  
- `GET /api/intro-sections?populate=*` - Get with populated relations
- `GET /api/intro-sections?sort=order:asc` - Get sorted by order
- `GET /api/intro-sections?filters[isActive][$eq]=true` - Get active sections only

## Sample API Response

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "WELCOME TO HARVEST CANNABIS",
        "content": "**YOUR TRUSTED CANNABIS DISPENSARY**...",
        "layout": "centered",
        "order": 1,
        "isActive": true,
        "slug": "welcome-to-harvest-cannabis",
        "createdAt": "2024-01-15T10:00:00.000Z",
        "updatedAt": "2024-01-15T10:00:00.000Z",
        "publishedAt": "2024-01-15T10:00:00.000Z",
        "backgroundImage": {
          "data": {
            "attributes": {
              "url": "/uploads/intro_bg.jpg",
              "alternativeText": "Harvest Cannabis Store"
            }
          }
        },
        "ctaButtons": [
          {
            "id": 1,
            "label": "Shop Now",
            "url": "/shop",
            "variant": "primary",
            "size": "large"
          }
        ],
        "seo": {
          "id": 1,
          "metaTitle": "Welcome to Harvest Cannabis",
          "metaDescription": "Experience world-class cannabis retail..."
        }
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

## Permissions Setup

After creating the content type, set API permissions:

1. Go to Settings → Users & Permissions → Roles
2. Edit **Public** role
3. Under **Intro-section**, enable:
   - ✅ `find` (get all)
   - ✅ `findOne` (get by ID)
4. Save permissions

## Frontend Integration

Your React component is already configured to use this content type:

```typescript
// Hook is already set up in useStrapiContent.ts
export const useStrapiIntroSection = () => 
  useStrapiContent<StrapiIntroSection>('/intro-sections?populate=*');

// Component usage in intro-interstitial.tsx
const { data: strapiData, loading, error } = useStrapiIntroSection();
const introData = strapiData?.[0] || mockStrapiContent.introSection;
```

## Testing

1. **Create content** using the sample data provided
2. **Test API endpoint:**
   ```bash
   curl "http://localhost:1337/api/intro-sections?populate=*" \
     -H "Authorization: Bearer YOUR_API_TOKEN"
   ```
3. **Check frontend** - reload and verify content appears
4. **Test runtime updates** - edit content in Strapi and refresh frontend

## Next Steps

1. Import these schemas into your Strapi instance
2. Create sample content using the provided data
3. Set up API permissions for public access
4. Test the API endpoints
5. Verify frontend integration works
6. Customize content as needed

Your intro section will be fully dynamic and editable through Strapi! 🚀