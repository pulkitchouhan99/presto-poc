# Dutchie Runtime CMS Deployment Checklist

## Pre-Deployment Steps

### ✅ Code Ready
- [x] All components fetch Strapi content at runtime
- [x] Proper fallbacks to mock data when Strapi unavailable
- [x] Error handling implemented
- [x] TypeScript errors fixed
- [x] Build passes

### 🔧 Strapi Configuration Required

1. **CORS Settings** - Update `config/middlewares.js`:
   ```js
   origin: [
     'http://localhost:3000',
     'https://yourdutchiedomain.com', // Add actual Dutchie domain
     'https://*.dutchie.com' // Allow all Dutchie subdomains
   ]
   ```

2. **API Token** - Replace hardcoded token in `useStrapiContent.ts` with environment variable

3. **Production URL** - Update Strapi URL from localhost to production

## Deployment Testing Plan

### Phase 1: Basic Runtime Fetching
1. Deploy theme to Dutchie staging/production
2. Check browser console for fetch requests
3. Verify components load with Strapi data
4. Test fallback behavior when Strapi is down

### Phase 2: CMS Updates
1. Update content in Strapi admin
2. Refresh Dutchie storefront
3. Confirm changes appear immediately (no rebuild needed)
4. Test all component types (header, hero, footer, etc.)

### Phase 3: Authentication
1. Test OAuth login flow
2. Verify email login/registration
3. Check JWT token storage and validation

## Production Environment Variables

```bash
# Replace in useStrapiContent.ts
STRAPI_URL=https://your-production-strapi.com
STRAPI_TOKEN=your_production_api_token
```

## Troubleshooting

### If Runtime Fetching Fails:
1. **Check CORS** - Browser console will show CORS errors
2. **Network tab** - Look for blocked requests
3. **Fallback data** - Should still show mock content
4. **API access** - Verify Strapi is accessible from Dutchie's servers

### If Authentication Fails:
1. **OAuth redirect URLs** - Must match Dutchie's domain
2. **Callback handling** - Check auth-callback.tsx works
3. **JWT storage** - Verify localStorage access

## Success Criteria

✅ **Runtime Success:**
- Components load Strapi content without rebuild
- Updates in Strapi appear immediately on refresh
- Fallbacks work when Strapi unavailable

✅ **Authentication Success:**
- Social login redirects work
- Email login/registration functional
- User sessions persist across page loads

## Next Steps After Testing

If runtime fetching works:
1. Replace all mock data with Strapi content
2. Add more content types as needed
3. Implement user-specific content
4. Add admin interface for content management

If runtime fetching doesn't work:
1. Fall back to build-time fetching
2. Set up webhook-triggered rebuilds
3. Consider server-side proxy approach