/**
 * SEO utility functions and constants
 */

// Base metadata for the site
export const BASE_METADATA = {
  title: "instantWebsiteAi - Instant Websites, Zero Effort",
  description: "Launch a polished, functional website in seconds—no learning curve, no building, no drag-and-drop. Just enter your business name and logo, and instantly see your site on a free subdomain.",
  keywords: "website builder, instant website, AI website, no-code website, quick website",
  authors: [{ name: "instantWebsiteAi Team" }],
  creator: "instantWebsiteAi",
  publisher: "instantWebsiteAi",
  openGraph: {
    title: "instantWebsiteAi - Instant Websites, Zero Effort",
    description: "Launch a polished, functional website in seconds—no learning curve, no building, no drag-and-drop.",
    url: "https://instantwebsite.ai",
    siteName: "instantWebsiteAi",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "instantWebsiteAi",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "instantWebsiteAi - Instant Websites, Zero Effort",
    description: "Launch a polished, functional website in seconds—no learning curve, no building, no drag-and-drop.",
    images: ["/og-image.jpg"],
  },
};

/**
 * Generate metadata for a specific page
 * 
 * @param {Object} options - Metadata options
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description
 * @param {string} options.path - Page path (e.g., '/about')
 * @param {string} options.image - Page image URL
 * @returns {Object} Metadata object
 */
export const generateMetadata = ({ title, description, path = '', image }) => {
  const pageTitle = title ? `${title} | instantWebsiteAi` : BASE_METADATA.title;
  const pageDescription = description || BASE_METADATA.description;
  const pageImage = image || BASE_METADATA.openGraph.images[0].url;
  const pageUrl = `https://instantwebsite.ai${path}`;
  
  return {
    ...BASE_METADATA,
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      ...BASE_METADATA.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      images: [
        {
          ...BASE_METADATA.openGraph.images[0],
          url: pageImage,
        },
      ],
    },
    twitter: {
      ...BASE_METADATA.twitter,
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },
  };
};

/**
 * Generate structured data for a specific page
 * 
 * @param {string} type - Schema.org type (e.g., 'WebSite', 'Organization')
 * @param {Object} data - Structured data
 * @returns {string} JSON-LD string
 */
export const generateStructuredData = (type, data) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  };
  
  const structuredData = {
    ...baseData,
    ...data,
  };
  
  return JSON.stringify(structuredData);
};

/**
 * Generate website schema
 * 
 * @returns {string} JSON-LD string
 */
export const generateWebsiteSchema = () => {
  return generateStructuredData('WebSite', {
    name: 'instantWebsiteAi',
    url: 'https://instantwebsite.ai',
    description: BASE_METADATA.description,
    potentialAction: {
      '@type': 'SearchAction',
      'target': 'https://instantwebsite.ai/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  });
};

/**
 * Generate organization schema
 * 
 * @returns {string} JSON-LD string
 */
export const generateOrganizationSchema = () => {
  return generateStructuredData('Organization', {
    name: 'instantWebsiteAi',
    url: 'https://instantwebsite.ai',
    logo: 'https://instantwebsite.ai/logo.png',
    sameAs: [
      'https://twitter.com/instantWebsiteAi',
      'https://facebook.com/instantWebsiteAi',
      'https://linkedin.com/company/instantWebsiteAi',
    ],
  });
};

/**
 * Generate breadcrumb schema
 * 
 * @param {Array} items - Breadcrumb items
 * @returns {string} JSON-LD string
 */
export const generateBreadcrumbSchema = (items) => {
  return generateStructuredData('BreadcrumbList', {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://instantwebsite.ai${item.path}`,
    })),
  });
};
