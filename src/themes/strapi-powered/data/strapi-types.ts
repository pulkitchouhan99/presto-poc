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
  navigation: StrapiLink[];

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
  eyebrow?: string;
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
      alternativeText: 'HARVEST Cannabis',
    },
    navigation: [
      { id: 1, label: 'ORDER ONLINE', url: '/order-online' },
      { id: 2, label: 'ABOUT US', url: '/about-us' },
      { id: 3, label: 'BLOGS', url: '/blogs' },
      { id: 4, label: 'LATEST UPDATES', url: '/latest-updates' },
      { id: 5, label: 'CONTACT US', url: '/contact-us' },
    ],

    ctaButton: null,
  },

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
    title: 'WELCOME TO\nPREMIUM\nCANNABIS',
    subtitle:
      "Welcome to Harvest Cannabis, your go-to source for premium cannabis in Santa Monica. Whether you're experienced or new to cannabis, we offer top-quality products and friendly service.",
    eyebrow: 'Premium Cannabis Retailer',
    backgroundColor: '#fafafa',
    ctaButtons: [
      {
        label: 'SHOP NOW',
        url: '/shop',
        variant: 'primary' as const,
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

  // Intro/Welcome Section
  introSection: {
    type: 'intro',
    title: 'WELCOME TO HARVEST CANNABIS, YOUR TRUSTED CANNABIS DISPENSARY OFFERING A FRIENDLY SHOPPING EXPERIENCE AND A CURATED SELECTION OF PREMIUM CANNABIS PRODUCTS.',
    content: `At Harvest Cannabis, we offer a world-class cannabis retail experience tailored to meet your unique preferences and needs. Our expert team is dedicated to creating options, and crafting a premium selection of flowers, edibles, concentrates and wellness solutions to enhance your lifestyle. One of the key measures of our success is the loyalty and trust our clients place in us, which is why your staff of our certified licensed cannabis consultants. Santa Monica is the preferred choice for cannabis connoisseurs.`,
    images: [
      {
        url: '/images/products-1.jpg',
        alternativeText: 'Cannabis products display',
      },
      {
        url: '/images/products-2.jpg', 
        alternativeText: 'Premium cannabis selection',
      },
    ],
    ctaButton: {
      label: 'KNOW MORE US →',
      url: '/about',
      variant: 'outline',
    },
    layout: 'images-bottom',
    titleStyle: 'large',
    contentAlignment: 'left',
    backgroundColor: '#ffffff',
    padding: 'large',
  },
};
