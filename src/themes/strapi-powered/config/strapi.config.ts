export interface StrapiConfig {
  baseUrl: string;
  apiToken: string;
  timeout: number;
}

export const defaultStrapiConfig: StrapiConfig = {
  baseUrl: 'http://localhost:1337',
  apiToken:
    'ea09a8a831de8d4b8dbeac67cce8c263289accb11bd647fd9d9d89ca14d788078eba62ea7d5dd1234e1943f11401e775106ac1c952292cfdc652b25c7d8b3f77ee18f78b6072ee4d516839c7cd4bde40a3745c0727be8ab1518e0430a6057622efedd008d2c6bb350f2f779eba11c52ffd12dc40dc0418a116f3ed6dde96b8a1',
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
