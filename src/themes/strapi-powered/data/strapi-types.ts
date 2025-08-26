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

export interface StrapiIntroSection {
  id: number;
  documentId: string;
  title: string;
  content: Array<{
    type: 'paragraph';
    children: Array<{
      type: 'text';
      text: string;
      bold?: boolean;
    }>;
  }>;
  layout: 'images-bottom' | 'images-top' | 'images-left' | 'images-right' | 'centered' | 'no-images';
  titleStyle: 'small' | 'medium' | 'large';
  contentAlignment: 'left' | 'center' | 'right';
  backgroundColor: string;
  padding: string | null;
  images: Array<{
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    formats: any | null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>;
  ctaButton: Array<{
    id: number;
    label: string;
    url: string;
    variant: 'primary' | 'secondary' | 'outline';
  }>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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
    backgroundImage: { url: '/images/hero-bg.jpg', alternativeText: 'Hero Background' },
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
    id: 3,
    documentId: "x090fa1z0sksyc7deanqt34i",
    title: "WELCOME TO HARVEST CANNABIS, YOUR TRUSTED CANNABIS DISPENSARY OFFERING A FRIENDLY SHOPPING EXPERIENCE AND A CURATED SELECTION OF PREMIUM CANNABIS PRODUCTS.",
    content: [
      {
        type: "paragraph" as const,
        children: [
          {
            type: "text" as const,
            text: "At Harvest Cannabis",
            bold: true
          },
          {
            type: "text" as const,
            text: ", we offer a world-class cannabis retail experience tailored to meet your unique preferences and needs. Our expert team is dedicated to curating, delivering, and scaling a premium selection of flowers, edibles, and concentrates, ensuring the utmost satisfaction for our customers. We believe the truest measure of our success is the loyalty and trust our clients place in us, which is why over half of our visitors become repeat customers. Join us and experience why Harvest of Santa Monica is the preferred choice for cannabis connoisseurs."
          }
        ]
      }
    ],
    layout: "images-bottom",
    titleStyle: "small",
    contentAlignment: "left", 
    backgroundColor: "#ffffff",
    padding: null,
    createdAt: "2025-08-25T11:14:06.188Z",
    updatedAt: "2025-08-25T11:34:36.739Z",
    publishedAt: "2025-08-25T11:34:36.750Z",
    images: [
      {
        id: 14,
        documentId: "pco49bb4rax70npn3lifar6c",
        name: "6712bccf5cec05d78d86e295_Harvest-Of-Santa-Monica-Store-(4)1..2.avif",
        alternativeText: null,
        caption: null,
        width: null,
        height: null,
        formats: null,
        hash: "6712bccf5cec05d78d86e295_Harvest_Of_Santa_Monica_Store_4_1_2_91346362c9",
        ext: ".avif",
        mime: "image/avif",
        size: 25.75,
        url: "/uploads/6712bccf5cec05d78d86e295_Harvest_Of_Santa_Monica_Store_4_1_2_91346362c9.avif",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2025-08-25T11:12:13.871Z",
        updatedAt: "2025-08-25T11:12:13.871Z",
        publishedAt: "2025-08-25T11:12:13.871Z"
      },
      {
        id: 13,
        documentId: "tqaow6ddh5wflil1seyq4pn1",
        name: "6712bccf7b1e01b2371351f2_Harvest-Of-Santa-Monica-Store-(63)1.3.avif",
        alternativeText: null,
        caption: null,
        width: null,
        height: null,
        formats: null,
        hash: "6712bccf7b1e01b2371351f2_Harvest_Of_Santa_Monica_Store_63_1_3_676e67e0b0",
        ext: ".avif",
        mime: "image/avif",
        size: 20.89,
        url: "/uploads/6712bccf7b1e01b2371351f2_Harvest_Of_Santa_Monica_Store_63_1_3_676e67e0b0.avif",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2025-08-25T11:12:00.464Z",
        updatedAt: "2025-08-25T11:12:00.464Z",
        publishedAt: "2025-08-25T11:12:00.464Z"
      }
    ],
    ctaButton: [
      {
        id: 18,
        label: "KNOW MORE US →",
        url: "/about",
        variant: "outline" as const
      }
    ]
  } as StrapiIntroSection,
};
