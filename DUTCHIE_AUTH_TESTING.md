# Dutchie Authentication Testing Guide

## Common OAuth URL Patterns to Test

Based on industry standards and common e-commerce platforms, here are the most likely Dutchie authentication endpoints:

### **Google OAuth URLs (in order of likelihood):**
1. `/auth/google` ⭐ Most common
2. `/login/google` 
3. `/oauth/google`
4. `/api/auth/google`
5. `/connect/google`
6. `/auth/social/google`

### **Apple OAuth URLs:**
1. `/auth/apple`
2. `/login/apple`
3. `/oauth/apple`
4. `/api/auth/apple`

### **General Login URLs:**
1. `/login` ⭐ Most likely
2. `/auth/login`
3. `/account/login`
4. `/user/login`

## Testing Strategy

### **Phase 1: Development Testing**
Currently using Strapi OAuth for development:
```javascript
// Works in development
window.location.href = 'http://localhost:1337/api/connect/google';
```

### **Phase 2: Production URL Testing**
Test these URLs in production Dutchie environment:

```javascript
// Method 1: Direct OAuth (preferred)
window.location.href = '/auth/google';

// Method 2: Dutchie SDK method
actions.goToLogin();

// Method 3: With parameters (if supported)
actions.goToLogin({ provider: 'google' });
```

## What to Look For

### **Success Indicators:**
- ✅ Redirects to Google OAuth consent screen
- ✅ After Google auth, returns to Dutchie with user logged in
- ✅ User appears in Dutchie's user system (not separate auth)

### **Failure Indicators:**
- ❌ 404 Not Found error
- ❌ Redirects to generic Dutchie login instead of Google
- ❌ Creates separate user account (not Dutchie integration)

## Expected Flow

### **Ideal Flow:**
1. User clicks "Continue with Google" in custom modal
2. Redirects to `/auth/google` (or similar)
3. Dutchie redirects to Google OAuth
4. User authorizes with Google
5. Google redirects back to Dutchie
6. User is logged into Dutchie platform
7. Returns to your site with Dutchie authentication

### **Fallback Flow:**
1. User clicks "Continue with Google"
2. Use `actions.goToLogin()`
3. Shows Dutchie's login page
4. User clicks Google on Dutchie's page
5. Same OAuth flow as above

## Testing Checklist

### **Before Testing:**
- [ ] Deploy theme to Dutchie staging/production
- [ ] Verify `actions.goToLogin()` works (fallback)
- [ ] Have test Google account ready

### **During Testing:**
- [ ] Test `/auth/google` direct URL
- [ ] Test `actions.goToLogin()` fallback
- [ ] Verify user authentication persists
- [ ] Check if user appears in Dutchie admin

### **After Testing:**
- [ ] Document working authentication method
- [ ] Update code to use correct approach
- [ ] Test on multiple browsers/devices

## Code Implementation

### **Current Flexible Approach:**
```javascript
const handleGoogleLogin = () => {
  if (isDevelopment) {
    // Use Strapi for testing
    window.location.href = 'http://localhost:1337/api/connect/google';
  } else {
    // Try most likely Dutchie pattern
    window.location.href = '/auth/google';
    
    // Fallback if direct OAuth doesn't work:
    // actions.goToLogin();
  }
};
```

### **After Confirmation:**
Once we know the correct method, we'll update to:
```javascript
const handleGoogleLogin = () => {
  // Use confirmed Dutchie method
  window.location.href = '/confirmed/oauth/url';
};
```

## Next Steps

1. **Deploy and test** `/auth/google` in production
2. **Contact Serafín** for Dutchie Slack channel insights
3. **Document results** and update authentication code
4. **Implement Apple login** using same pattern

## Support Article Research

The Dutchie support article you found (https://support.dutchie.com/hc/en-us/articles/27169296812307) is behind a login wall, but it likely contains:
- Official login procedures
- Supported OAuth providers
- Developer integration guidelines
- Correct authentication URLs

**Recommendation:** Have someone with Dutchie access check this article for official authentication endpoints.