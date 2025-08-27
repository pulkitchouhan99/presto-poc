# Questions for Dutchie Support About Authentication

## Context
We're building a custom UI for social login (Google, Apple) but need to authenticate users with Dutchie's system, not a separate authentication service.

## Key Questions:

### 1. **Direct OAuth Endpoints**
Does Dutchie provide direct OAuth URLs we can use?
- Example: `/auth/google`, `/auth/apple`
- Or: `https://api.dutchie.com/oauth/google`

### 2. **OAuth Integration Options**
Can we:
- **Option A**: Keep our custom social login UI and redirect to Dutchie OAuth endpoints?
- **Option B**: Must we use Dutchie's built-in login modal/page?

### 3. **Authentication Flow**
What's the correct flow for custom UI social login?
```
User clicks "Continue with Google" in our custom modal
→ Redirect to ??? (Dutchie OAuth URL)
→ Google authentication
→ Callback to our site
→ User is logged into Dutchie
```

### 4. **Development Testing**
- How can we test Dutchie authentication in development?
- Do you provide test/sandbox OAuth endpoints?
- Can we simulate Dutchie login locally?

### 5. **API Documentation**
Where can we find:
- OAuth endpoint documentation
- Authentication flow examples
- Social login integration guide

## What We're Trying to Achieve:

1. **Custom UI**: Beautiful social login modal (already built)
2. **Dutchie Auth**: Users authenticate with Dutchie platform
3. **Seamless Flow**: Direct OAuth without showing Dutchie's login page first

## Current Implementation:

```javascript
// We have this custom UI:
<SocialButton onClick={handleGoogleLogin}>
  <GoogleIcon />
  Continue with Google
</SocialButton>

// Need to know the correct Dutchie OAuth URL:
const handleGoogleLogin = () => {
  window.location.href = '???'; // What's the Dutchie Google OAuth URL?
};
```

## Fallback Option:

If direct OAuth isn't supported, can we:
1. Use `actions.goToLogin()` to show Dutchie's login page
2. Pass parameters to pre-select Google/Apple login?
3. Example: `actions.goToLogin({ provider: 'google' })`

Please provide guidance on the best approach for integrating social login with Dutchie while maintaining our custom UI.