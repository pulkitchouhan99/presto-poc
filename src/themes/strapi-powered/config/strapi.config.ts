export interface StrapiConfig {
  baseUrl: string;
  apiToken: string;
  timeout: number;
}

export const defaultStrapiConfig: StrapiConfig = {
  baseUrl: 'http://localhost:1337',
  apiToken:
    'a95c6de1811fcd0d6301c52d30dbc2e29a2b02d8ae8fb9784f7c57b3a1aeab7952f7e194c8cac8cc1116a5e2131ec318819b0d951d47d3fbd99b7ca8e7932ba7046089899769a557c542cf655166c11cf579c2c0a3cf599af2a04c124fb5cd2e6b8d73ac2a6d509ac8fef294c4d879c60a727a18f868141cbe330e92964c24e0',
  timeout: 5000,
};

// Helper function to construct Strapi API URLs
export const getStrapiURL = (path: string = '') => {
  return `${defaultStrapiConfig.baseUrl}${path}`;
};

// Helper function to get media URL
export const getStrapiMedia = (url: string) => {
  if (!url) return null;

  // Return full URL if it's already absolute
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }

  // Otherwise, prepend Strapi URL
  return getStrapiURL(url);
};
