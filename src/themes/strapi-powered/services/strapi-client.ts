import { defaultStrapiConfig, getStrapiURL } from '../config/strapi.config';
import type { StrapiHeader, StrapiFooter, StrapiHero, StrapiCarouselItem } from '../data/strapi-types';

// Strapi API response wrapper
interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiAttributes<T> {
  id: number;
  attributes: T;
}

class StrapiClient {
  private config = defaultStrapiConfig;

  private async fetcher<T>(endpoint: string): Promise<T> {
    const url = getStrapiURL(`/api${endpoint}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiToken && {
          Authorization: `Bearer ${this.config.apiToken}`,
        }),
      },
      signal: AbortSignal.timeout(this.config.timeout),
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Fetch header content
  async getHeader(): Promise<StrapiHeader | null> {
    try {
      const response = await this.fetcher<StrapiResponse<StrapiAttributes<StrapiHeader>>>('/header?populate=*');
      return response.data?.attributes || null;
    } catch (error) {
      console.error('Failed to fetch header:', error);
      return null;
    }
  }

  // Fetch footer content
  async getFooter(): Promise<StrapiFooter | null> {
    try {
      const response = await this.fetcher<StrapiResponse<StrapiAttributes<StrapiFooter>>>('/footer?populate=*');
      return response.data?.attributes || null;
    } catch (error) {
      console.error('Failed to fetch footer:', error);
      return null;
    }
  }

  // Fetch homepage hero section
  async getHomepageHero(): Promise<StrapiHero | null> {
    try {
      const response = await this.fetcher<StrapiResponse<StrapiAttributes<StrapiHero>>>('/homepage-hero?populate=*');
      return response.data?.attributes || null;
    } catch (error) {
      console.error('Failed to fetch homepage hero:', error);
      return null;
    }
  }

  // Fetch carousel items
  async getCarouselItems(): Promise<StrapiCarouselItem[]> {
    try {
      const response = await this.fetcher<StrapiResponse<Array<StrapiAttributes<StrapiCarouselItem>>>>(
        '/carousel-items?populate=*&sort=order'
      );
      return (
        response.data?.map((item) => ({
          id: item.id.toString(),
          ...item.attributes,
        })) || []
      );
    } catch (error) {
      console.error('Failed to fetch carousel items:', error);
      return [];
    }
  }

  // Fetch page by ID or slug
  async getPage(idOrSlug: string): Promise<any | null> {
    try {
      const response = await this.fetcher<StrapiResponse<StrapiAttributes<any>>>(`/pages/${idOrSlug}?populate=*`);
      return response.data?.attributes || null;
    } catch (error) {
      console.error('Failed to fetch page:', error);
      return null;
    }
  }

  // Fetch all pages
  async getPages(): Promise<any[]> {
    try {
      const response = await this.fetcher<StrapiResponse<Array<StrapiAttributes<any>>>>('/pages?populate=*');
      return (
        response.data?.map((item) => ({
          id: item.id.toString(),
          ...item.attributes,
        })) || []
      );
    } catch (error) {
      console.error('Failed to fetch pages:', error);
      return [];
    }
  }

  // Fetch all content for the theme
  async getAllContent() {
    const [header, footer, hero, carousel] = await Promise.all([
      this.getHeader(),
      this.getFooter(),
      this.getHomepageHero(),
      this.getCarouselItems(),
    ]);

    return {
      header,
      footer,
      hero,
      carousel,
    };
  }
}

export const strapiClient = new StrapiClient();
