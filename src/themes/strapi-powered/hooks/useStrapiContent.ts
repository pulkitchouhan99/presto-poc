import { useState, useEffect } from 'react';

interface StrapiContentHook<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Runtime Strapi content fetcher - updates without rebuilds!
export function useStrapiContent<T>(endpoint: string, fallbackData?: T): StrapiContentHook<T> {
  const [data, setData] = useState<T | null>(fallbackData || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use environment variable or fallback to localhost
        // In browser, process.env doesn't work - need to use window location or hardcode
        const strapiUrl = 'http://localhost:1337';
        const strapiToken =
          'ea09a8a831de8d4b8dbeac67cce8c263289accb11bd647fd9d9d89ca14d788078eba62ea7d5dd1234e1943f11401e775106ac1c952292cfdc652b25c7d8b3f77ee18f78b6072ee4d516839c7cd4bde40a3745c0727be8ab1518e0430a6057622efedd008d2c6bb350f2f779eba11c52ffd12dc40dc0418a116f3ed6dde96b8a1';

        const response = await fetch(`${strapiUrl}/api${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${strapiToken}`,
          },
          mode: 'cors', // Enable CORS
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result.data);
      } catch (err) {
        console.error('Strapi fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');

        // Use fallback data if fetch fails
        if (fallbackData) {
          setData(fallbackData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [endpoint, fallbackData]);

  return { data, loading, error };
}

// Import types
import {
  StrapiHeader,
  StrapiHero,
  StrapiIntroSection,
  StrapiCarouselItem,
  StrapiFooter,
  StrapiProduct,
} from '../data/strapi-types';

// Specialized hooks for different content types
export const useStrapiHeader = () => useStrapiContent<StrapiHeader>('/header?populate=*');
export const useStrapiHero = () => useStrapiContent<StrapiHero>('/homepage-hero?populate=*');
export const useStrapiIntroSection = () => useStrapiContent<StrapiIntroSection>('/intro-sections?populate=*');
export const useStrapiCarousel = () => useStrapiContent<StrapiCarouselItem[]>('/carousel-items?populate=*&sort=order');
export const useStrapiFooter = () => useStrapiContent<StrapiFooter>('/footer?populate=*');
export const useStrapiProducts = () =>
  useStrapiContent<StrapiProduct[]>('/products?populate=*&filters[featured][$eq]=true&sort=order');
