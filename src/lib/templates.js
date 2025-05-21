/**
 * Template data and utility functions
 */

// Template categories
export const TEMPLATE_CATEGORIES = {
  BUSINESS: 'business',
  PORTFOLIO: 'portfolio',
  ECOMMERCE: 'ecommerce',
  BLOG: 'blog',
  LANDING: 'landing',
  RESTAURANT: 'restaurant',
  REAL_ESTATE: 'real_estate',
  PERSONAL: 'personal',
};

// Template data
export const templates = [
  {
    id: 1,
    name: 'Business Pro',
    category: TEMPLATE_CATEGORIES.BUSINESS,
    description: 'A professional template for businesses with a modern design.',
    thumbnail: '/templates/business-pro-thumb.jpg',
    preview: '/templates/business-pro-preview.jpg',
    color: '#3B82F6',
    features: [
      'Professional design',
      'Service showcase',
      'Team section',
      'Contact form',
      'Testimonials',
    ],
    popularFor: ['Consulting', 'Law Firms', 'Financial Services'],
  },
  {
    id: 2,
    name: 'Creative Portfolio',
    category: TEMPLATE_CATEGORIES.PORTFOLIO,
    description: 'Showcase your creative work with this elegant portfolio template.',
    thumbnail: '/templates/creative-portfolio-thumb.jpg',
    preview: '/templates/creative-portfolio-preview.jpg',
    color: '#8B5CF6',
    features: [
      'Project gallery',
      'About section',
      'Skills showcase',
      'Contact form',
      'Blog section',
    ],
    popularFor: ['Designers', 'Photographers', 'Artists'],
  },
  {
    id: 3,
    name: 'E-Shop',
    category: TEMPLATE_CATEGORIES.ECOMMERCE,
    description: 'A complete e-commerce template for your online store.',
    thumbnail: '/templates/e-shop-thumb.jpg',
    preview: '/templates/e-shop-preview.jpg',
    color: '#EC4899',
    features: [
      'Product showcase',
      'Shopping cart',
      'Product categories',
      'Featured products',
      'Newsletter signup',
    ],
    popularFor: ['Online Stores', 'Digital Products', 'Handmade Goods'],
  },
  {
    id: 4,
    name: 'Minimal Blog',
    category: TEMPLATE_CATEGORIES.BLOG,
    description: 'A clean and minimal blog template for writers and content creators.',
    thumbnail: '/templates/minimal-blog-thumb.jpg',
    preview: '/templates/minimal-blog-preview.jpg',
    color: '#10B981',
    features: [
      'Clean typography',
      'Category filters',
      'Author profiles',
      'Related posts',
      'Newsletter signup',
    ],
    popularFor: ['Writers', 'Journalists', 'Content Creators'],
  },
  {
    id: 5,
    name: 'Startup Landing',
    category: TEMPLATE_CATEGORIES.LANDING,
    description: 'A high-converting landing page template for startups and products.',
    thumbnail: '/templates/startup-landing-thumb.jpg',
    preview: '/templates/startup-landing-preview.jpg',
    color: '#F59E0B',
    features: [
      'Hero section',
      'Feature showcase',
      'Pricing table',
      'Testimonials',
      'FAQ section',
    ],
    popularFor: ['SaaS', 'Mobile Apps', 'Digital Products'],
  },
  {
    id: 6,
    name: 'Restaurant Delight',
    category: TEMPLATE_CATEGORIES.RESTAURANT,
    description: 'A mouth-watering template for restaurants and food businesses.',
    thumbnail: '/templates/restaurant-delight-thumb.jpg',
    preview: '/templates/restaurant-delight-preview.jpg',
    color: '#EF4444',
    features: [
      'Menu showcase',
      'Reservation form',
      'Chef profiles',
      'Gallery',
      'Location map',
    ],
    popularFor: ['Restaurants', 'Cafes', 'Bakeries'],
  },
  {
    id: 7,
    name: 'Real Estate Pro',
    category: TEMPLATE_CATEGORIES.REAL_ESTATE,
    description: 'A professional template for real estate agents and property listings.',
    thumbnail: '/templates/real-estate-pro-thumb.jpg',
    preview: '/templates/real-estate-pro-preview.jpg',
    color: '#0EA5E9',
    features: [
      'Property listings',
      'Agent profiles',
      'Search filters',
      'Featured properties',
      'Contact form',
    ],
    popularFor: ['Real Estate Agents', 'Property Managers', 'Rental Services'],
  },
  {
    id: 8,
    name: 'Personal Brand',
    category: TEMPLATE_CATEGORIES.PERSONAL,
    description: 'A personal branding template for individuals and freelancers.',
    thumbnail: '/templates/personal-brand-thumb.jpg',
    preview: '/templates/personal-brand-preview.jpg',
    color: '#6366F1',
    features: [
      'About section',
      'Services',
      'Portfolio',
      'Testimonials',
      'Contact form',
    ],
    popularFor: ['Freelancers', 'Consultants', 'Coaches'],
  },
];

/**
 * Get a template by ID
 * 
 * @param {number} id - Template ID
 * @returns {Object|null} Template object or null if not found
 */
export const getTemplateById = (id) => {
  return templates.find(template => template.id === id) || null;
};

/**
 * Get templates by category
 * 
 * @param {string} category - Template category
 * @returns {Array} Array of templates in the category
 */
export const getTemplatesByCategory = (category) => {
  return templates.filter(template => template.category === category);
};

/**
 * Get all template categories with counts
 * 
 * @returns {Array} Array of category objects with name and count
 */
export const getTemplateCategories = () => {
  const categoryCounts = templates.reduce((acc, template) => {
    acc[template.category] = (acc[template.category] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(TEMPLATE_CATEGORIES).map(([key, value]) => ({
    id: value,
    name: key.charAt(0) + key.slice(1).toLowerCase().replace('_', ' '),
    count: categoryCounts[value] || 0,
  }));
};

/**
 * Search templates by name or description
 * 
 * @param {string} query - Search query
 * @returns {Array} Array of matching templates
 */
export const searchTemplates = (query) => {
  const searchTerm = query.toLowerCase();
  
  return templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm) || 
    template.description.toLowerCase().includes(searchTerm)
  );
};

/**
 * Get recommended templates based on business type
 * 
 * @param {string} businessType - Type of business
 * @returns {Array} Array of recommended templates
 */
export const getRecommendedTemplates = (businessType) => {
  // Map business types to template categories
  const categoryMap = {
    'restaurant': TEMPLATE_CATEGORIES.RESTAURANT,
    'cafe': TEMPLATE_CATEGORIES.RESTAURANT,
    'food': TEMPLATE_CATEGORIES.RESTAURANT,
    'real estate': TEMPLATE_CATEGORIES.REAL_ESTATE,
    'property': TEMPLATE_CATEGORIES.REAL_ESTATE,
    'consultant': TEMPLATE_CATEGORIES.BUSINESS,
    'consulting': TEMPLATE_CATEGORIES.BUSINESS,
    'law': TEMPLATE_CATEGORIES.BUSINESS,
    'legal': TEMPLATE_CATEGORIES.BUSINESS,
    'designer': TEMPLATE_CATEGORIES.PORTFOLIO,
    'artist': TEMPLATE_CATEGORIES.PORTFOLIO,
    'photographer': TEMPLATE_CATEGORIES.PORTFOLIO,
    'shop': TEMPLATE_CATEGORIES.ECOMMERCE,
    'store': TEMPLATE_CATEGORIES.ECOMMERCE,
    'product': TEMPLATE_CATEGORIES.ECOMMERCE,
    'blog': TEMPLATE_CATEGORIES.BLOG,
    'writer': TEMPLATE_CATEGORIES.BLOG,
    'startup': TEMPLATE_CATEGORIES.LANDING,
    'app': TEMPLATE_CATEGORIES.LANDING,
    'freelancer': TEMPLATE_CATEGORIES.PERSONAL,
    'personal': TEMPLATE_CATEGORIES.PERSONAL,
  };
  
  // Find matching category
  let category = TEMPLATE_CATEGORIES.BUSINESS; // Default
  
  if (businessType) {
    const businessTypeLower = businessType.toLowerCase();
    
    for (const [key, value] of Object.entries(categoryMap)) {
      if (businessTypeLower.includes(key)) {
        category = value;
        break;
      }
    }
  }
  
  // Get templates in the category
  const categoryTemplates = getTemplatesByCategory(category);
  
  // If not enough templates in the category, add some from other categories
  if (categoryTemplates.length < 3) {
    const otherTemplates = templates.filter(t => t.category !== category);
    return [...categoryTemplates, ...otherTemplates.slice(0, 3 - categoryTemplates.length)];
  }
  
  return categoryTemplates;
};
