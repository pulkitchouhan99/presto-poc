// Strapi content types for the theme
export interface StrapiImage {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface StrapiLink {
  id: number;
  label: string;
  url: string;
  target?: '_blank' | '_self';
  icon?: string;
}

export interface StrapiHeader {
  logo: StrapiImage;
  navigation: {
    links: StrapiLink[];
  };
  ctaButton?: {
    label: string;
    url: string;
    variant?: 'primary' | 'secondary';
  };
}

export interface StrapiFooter {
  logo?: StrapiImage;
  description?: string;
  sections: Array<{
    title: string;
    links: StrapiLink[];
  }>;
  socialLinks?: Array<{
    platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
    url: string;
  }>;
  copyright?: string;
}

export interface StrapiHero {
  title: string;
  subtitle?: string;
  backgroundImage?: StrapiImage;
  backgroundColor?: string;
  ctaButtons?: Array<{
    label: string;
    url: string;
    variant?: 'primary' | 'secondary' | 'outline';
  }>;
  overlay?: boolean;
  overlayOpacity?: number;
}

export interface StrapiCarouselItem {
  id: string;
  title: string;
  description?: string;
  image: StrapiImage;
  link?: {
    label: string;
    url: string;
  };
}

export interface StrapiAboutPage {
  hero: {
    title: string;
    subtitle?: string;
    backgroundImage?: StrapiImage;
  };
  sections: Array<{
    title: string;
    content: string;
    image?: StrapiImage;
    layout?: 'text-left' | 'text-right' | 'centered';
  }>;
  team?: {
    title: string;
    members: Array<{
      name: string;
      role: string;
      bio?: string;
      image?: StrapiImage;
    }>;
  };
}

// Mock data that simulates Strapi content
// In production, this would be replaced with data fetched from your Strapi API
// Example: 
// const response = await fetch('https://your-strapi-api.com/api/header?populate=*');
// const data = await response.json();
export const mockStrapiContent = {
  header: {
    logo: {
      url: '/images/logo.png',
      alternativeText: 'Company Logo',
    },
    navigation: {
      links: [
        { id: 1, label: 'Shop', url: '/shop' },
        { id: 2, label: 'About', url: '/about' },
        { id: 3, label: 'Locations', url: '/locations' },
        { id: 4, label: 'Contact', url: '/contact' },
      ],
    },
    ctaButton: {
      label: 'Order Now',
      url: '/shop',
      variant: 'primary' as const,
    },
  } as StrapiHeader,

  footer: {
    description: 'Your trusted cannabis dispensary',
    sections: [
      {
        title: 'Shop',
        links: [
          { id: 1, label: 'All Products', url: '/shop' },
          { id: 2, label: 'Flower', url: '/shop/flower' },
          { id: 3, label: 'Edibles', url: '/shop/edibles' },
          { id: 4, label: 'Concentrates', url: '/shop/concentrates' },
        ],
      },
      {
        title: 'Company',
        links: [
          { id: 5, label: 'About Us', url: '/about' },
          { id: 6, label: 'Careers', url: '/careers' },
          { id: 7, label: 'Blog', url: '/blog' },
        ],
      },
      {
        title: 'Support',
        links: [
          { id: 8, label: 'Contact', url: '/contact' },
          { id: 9, label: 'FAQ', url: '/faq' },
          { id: 10, label: 'Terms', url: '/terms' },
        ],
      },
    ],
    socialLinks: [
      { platform: 'instagram' as const, url: 'https://instagram.com' },
      { platform: 'facebook' as const, url: 'https://facebook.com' },
    ],
    copyright: '© 2024 Cannabis Store. All rights reserved.',
  } as StrapiFooter,

  hero: {
    title: 'Welcome to Premium Cannabis',
    subtitle: 'Discover our curated selection of high-quality products',
    backgroundColor: '#1a1a1a',
    ctaButtons: [
      {
        label: 'Shop Now',
        url: '/shop',
        variant: 'primary' as const,
      },
      {
        label: 'Learn More',
        url: '/about',
        variant: 'outline' as const,
      },
    ],
  } as StrapiHero,

  carousel: [
    {
      id: '1',
      title: 'New Arrivals',
      description: 'Check out our latest products',
      image: {
        url: '/images/promo-1.jpg',
        alternativeText: 'New products',
      },
      link: {
        label: 'Shop New',
        url: '/shop/new',
      },
    },
    {
      id: '2',
      title: 'Weekly Specials',
      description: 'Save on select items',
      image: {
        url: '/images/promo-2.jpg',
        alternativeText: 'Special offers',
      },
      link: {
        label: 'View Deals',
        url: '/specials',
      },
    },
  ] as StrapiCarouselItem[],
};