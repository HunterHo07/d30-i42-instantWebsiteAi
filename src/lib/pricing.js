/**
 * Pricing utility functions and constants
 */

// Pricing plans
export const PRICING_PLANS = {
  FREE: 'free',
  LAUNCH: 'launch',
  PRO_DESIGN: 'pro_design',
  CUSTOM: 'custom',
};

// Domain options
export const DOMAIN_OPTIONS = {
  SUBDOMAIN: 'subdomain',
  MANAGED: 'managed',
  SELF_OWNED: 'self_owned',
};

// Pricing data
export const pricingData = {
  [PRICING_PLANS.FREE]: {
    name: 'Free',
    description: 'Perfect for trying out the platform',
    price: {
      monthly: 0,
      annual: 0,
    },
    setupFee: 0,
    features: [
      'Browse and preview templates',
      'Generate instant website preview',
      'Download static HTML',
      'No signup required',
    ],
    limitations: [
      'No hosting',
      'No custom domain',
      'No edit requests',
      'No support',
    ],
    popularFor: ['Students', 'Hobbyists', 'DIY enthusiasts'],
    cta: 'Start Free',
    ctaLink: '/demo',
  },
  [PRICING_PLANS.LAUNCH]: {
    name: 'Launch',
    description: 'Everything you need to launch your site',
    price: {
      monthly: 14,
      annual: 9,
    },
    setupFee: 14,
    features: [
      'All Free features',
      'Hosting on yourname.instantweb.ai',
      '7-day unlimited edit requests',
      'Basic analytics',
      'Email support',
    ],
    limitations: [
      'Limited customization options',
      'No advanced features',
    ],
    popularFor: ['Small businesses', 'Freelancers', 'Startups'],
    cta: 'Get Started',
    ctaLink: '/demo',
    popular: true,
  },
  [PRICING_PLANS.PRO_DESIGN]: {
    name: 'Pro Design',
    description: 'Custom design tweaks and branding',
    price: {
      monthly: 89,
      annual: 89,
    },
    oneTime: true,
    features: [
      'All Launch features',
      'Custom layout and design tweaks',
      'Color scheme customization',
      'Typography adjustments',
      'Priority support',
    ],
    limitations: [
      'No advanced features',
    ],
    popularFor: ['Established businesses', 'Professionals', 'Agencies'],
    cta: 'Upgrade',
    ctaLink: '/demo',
  },
  [PRICING_PLANS.CUSTOM]: {
    name: 'Custom',
    description: 'Tailored solutions for your specific needs',
    price: {
      monthly: 149,
      annual: 149,
    },
    startingAt: true,
    features: [
      'All Pro Design features',
      'Custom functionality',
      'CMS integration',
      'E-commerce capabilities',
      'Dedicated support',
    ],
    limitations: [],
    popularFor: ['E-commerce businesses', 'Large organizations', 'Complex projects'],
    cta: 'Contact Us',
    ctaLink: '/contact',
  },
};

// Domain pricing
export const domainPricing = {
  [DOMAIN_OPTIONS.SUBDOMAIN]: {
    name: 'Subdomain',
    description: 'Use our subdomain for your website',
    price: 0,
    example: 'yourbusiness.instantweb.ai',
    features: [
      'Free with any paid plan',
      'No setup required',
      'Instant availability',
    ],
  },
  [DOMAIN_OPTIONS.MANAGED]: {
    name: 'Managed Domain',
    description: 'We purchase and manage your domain',
    price: 19,
    perYear: true,
    example: 'yourbusiness.com',
    features: [
      'We purchase the domain for you',
      'Automatic renewal handling',
      'DNS management included',
      'Recommended for non-technical users',
    ],
  },
  [DOMAIN_OPTIONS.SELF_OWNED]: {
    name: 'Self-Owned Domain',
    description: 'Use your existing domain',
    price: 0,
    example: 'yourbusiness.com',
    features: [
      'Use your existing domain',
      'We provide DNS instructions',
      'You maintain full ownership',
      'Best for those who already have domains',
    ],
  },
};

/**
 * Calculate the total price for a plan
 * 
 * @param {string} planId - Plan ID
 * @param {string} billingCycle - Billing cycle ('monthly' or 'annual')
 * @param {string} domainOption - Domain option
 * @returns {Object} Price details
 */
export const calculatePrice = (planId, billingCycle = 'annual', domainOption = DOMAIN_OPTIONS.SUBDOMAIN) => {
  const plan = pricingData[planId];
  const domain = domainPricing[domainOption];
  
  if (!plan || !domain) {
    return {
      subtotal: 0,
      setupFee: 0,
      domainFee: 0,
      total: 0,
      recurring: false,
    };
  }
  
  const planPrice = plan.price[billingCycle];
  const setupFee = plan.setupFee || 0;
  const domainFee = domain.price || 0;
  
  // Calculate total
  let total = 0;
  
  // Add setup fee (one-time)
  total += setupFee;
  
  // Add plan price
  if (plan.oneTime) {
    total += planPrice;
  } else if (billingCycle === 'annual') {
    total += planPrice;
  } else {
    // For monthly billing, we don't add the plan price to the initial payment
    // It will be charged monthly
  }
  
  // Add domain fee (annual)
  if (domainOption !== DOMAIN_OPTIONS.SUBDOMAIN) {
    total += domainFee;
  }
  
  return {
    subtotal: planPrice,
    setupFee,
    domainFee,
    total,
    recurring: !plan.oneTime,
    recurringAmount: plan.oneTime ? 0 : planPrice,
    recurringCycle: billingCycle,
  };
};

/**
 * Format price as currency
 * 
 * @param {number} price - Price to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted price
 */
export const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Get recommended plan based on business needs
 * 
 * @param {Object} businessNeeds - Business needs
 * @returns {string} Recommended plan ID
 */
export const getRecommendedPlan = (businessNeeds) => {
  // Default to Launch plan
  let recommendedPlan = PRICING_PLANS.LAUNCH;
  
  // If business needs custom design
  if (businessNeeds.customDesign) {
    recommendedPlan = PRICING_PLANS.PRO_DESIGN;
  }
  
  // If business needs advanced features
  if (businessNeeds.advancedFeatures) {
    recommendedPlan = PRICING_PLANS.CUSTOM;
  }
  
  return recommendedPlan;
};
