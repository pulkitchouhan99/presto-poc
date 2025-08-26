// Strapi Authentication Service
const STRAPI_URL = 'http://localhost:1337';

interface StrapiAuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    confirmed: boolean;
  };
}

export const strapiAuth = {
  // Email/Password login
  async login(email: string, password: string): Promise<StrapiAuthResponse> {
    const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    
    // Store JWT token in localStorage
    localStorage.setItem('strapi-jwt', data.jwt);
    localStorage.setItem('strapi-user', JSON.stringify(data.user));
    
    return data;
  },

  // Register new user
  async register(email: string, password: string, username: string): Promise<StrapiAuthResponse> {
    const response = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    
    // Store JWT token
    localStorage.setItem('strapi-jwt', data.jwt);
    localStorage.setItem('strapi-user', JSON.stringify(data.user));
    
    return data;
  },

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem('strapi-user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get JWT token
  getToken() {
    return localStorage.getItem('strapi-jwt');
  },

  // Check if user is logged in
  isAuthenticated() {
    return !!this.getToken();
  },

  // Logout
  logout() {
    localStorage.removeItem('strapi-jwt');
    localStorage.removeItem('strapi-user');
  },

  // Setup OAuth redirect URLs
  getOAuthUrls() {
    const redirectUrl = encodeURIComponent(window.location.origin + '/auth/callback');
    
    return {
      google: `${STRAPI_URL}/api/connect/google?callback=${redirectUrl}`,
      apple: `${STRAPI_URL}/api/connect/apple?callback=${redirectUrl}`,
      facebook: `${STRAPI_URL}/api/connect/facebook?callback=${redirectUrl}`,
    };
  },

  // Handle OAuth callback
  async handleOAuthCallback(provider: string, access_token: string) {
    const response = await fetch(`${STRAPI_URL}/api/auth/${provider}/callback?access_token=${access_token}`);
    
    if (!response.ok) {
      throw new Error('OAuth callback failed');
    }

    const data = await response.json();
    
    // Store JWT token
    localStorage.setItem('strapi-jwt', data.jwt);
    localStorage.setItem('strapi-user', JSON.stringify(data.user));
    
    return data;
  }
};