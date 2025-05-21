/**
 * FAQ data and utility functions
 */

// FAQ categories
export const FAQ_CATEGORIES = {
  GENERAL: 'general',
  PRICING: 'pricing',
  TEMPLATES: 'templates',
  CUSTOMIZATION: 'customization',
  DOMAINS: 'domains',
  TECHNICAL: 'technical',
  SUPPORT: 'support',
};

// FAQ data
export const faqData = [
  {
    id: 1,
    question: 'What is instantWebsiteAi?',
    answer: 'instantWebsiteAi is a platform that allows you to create a professional website in seconds. Just enter your business name and logo, and we'll generate a complete website for you. No coding, no design skills, and no complicated builders required.',
    category: FAQ_CATEGORIES.GENERAL,
  },
  {
    id: 2,
    question: 'How does it work?',
    answer: 'Our platform uses AI to generate a website based on your business information. Simply select a template, enter your business details, and we'll create a website for you instantly. You can then customize it further if needed.',
    category: FAQ_CATEGORIES.GENERAL,
  },
  {
    id: 3,
    question: 'Do I need technical skills to use instantWebsiteAi?',
    answer: 'Not at all! instantWebsiteAi is designed for non-technical users. The entire process is simple and intuitive, with no coding or design skills required.',
    category: FAQ_CATEGORIES.GENERAL,
  },
  {
    id: 4,
    question: 'How much does it cost?',
    answer: 'We offer a free plan that allows you to preview and download your website. Our paid plans start at $14 one-time setup fee + $9/year for hosting on our subdomain. Check our pricing page for more details.',
    category: FAQ_CATEGORIES.PRICING,
  },
  {
    id: 5,
    question: 'Is there a free trial?',
    answer: 'Yes! You can try instantWebsiteAi for free. Our free plan allows you to generate a website preview and download the static HTML files. No credit card required.',
    category: FAQ_CATEGORIES.PRICING,
  },
  {
    id: 6,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.',
    category: FAQ_CATEGORIES.PRICING,
  },
  {
    id: 7,
    question: 'How many templates do you offer?',
    answer: 'We currently offer dozens of professionally designed templates across various industries. We regularly add new templates to our library.',
    category: FAQ_CATEGORIES.TEMPLATES,
  },
  {
    id: 8,
    question: 'Can I switch templates after creating my website?',
    answer: 'Yes, you can switch templates at any time. Your content will be automatically transferred to the new template.',
    category: FAQ_CATEGORIES.TEMPLATES,
  },
  {
    id: 9,
    question: 'Can I customize my website?',
    answer: 'Yes, you can customize your website through our simple admin panel. You can edit text, images, colors, and fonts without any coding knowledge.',
    category: FAQ_CATEGORIES.CUSTOMIZATION,
  },
  {
    id: 10,
    question: 'Can I add my own domain?',
    answer: 'Yes, you can use your own domain with instantWebsiteAi. We offer two options: we can manage your domain for you ($19/year), or you can point your existing domain to our servers (free).',
    category: FAQ_CATEGORIES.DOMAINS,
  },
  {
    id: 11,
    question: 'How do I connect my domain?',
    answer: 'If you choose to use your own domain, we'll provide you with DNS instructions to point your domain to our servers. If you prefer, we can also manage your domain for you.',
    category: FAQ_CATEGORIES.DOMAINS,
  },
  {
    id: 12,
    question: 'Is hosting included?',
    answer: 'Yes, hosting is included with all paid plans. Your website will be hosted on our fast, reliable servers with a 99.9% uptime guarantee.',
    category: FAQ_CATEGORIES.TECHNICAL,
  },
  {
    id: 13,
    question: 'Is my website mobile-friendly?',
    answer: 'Absolutely! All our templates are fully responsive and look great on all devices, including desktops, tablets, and smartphones.',
    category: FAQ_CATEGORIES.TECHNICAL,
  },
  {
    id: 14,
    question: 'Can I add forms to my website?',
    answer: 'Yes, you can add contact forms to your website. Form submissions will be sent directly to your email address.',
    category: FAQ_CATEGORIES.CUSTOMIZATION,
  },
  {
    id: 15,
    question: 'Do you offer e-commerce functionality?',
    answer: 'Basic e-commerce functionality is available on our Custom plan. For more advanced e-commerce needs, please contact us for a custom solution.',
    category: FAQ_CATEGORIES.CUSTOMIZATION,
  },
  {
    id: 16,
    question: 'What is the 7-day edit request system?',
    answer: 'With our Launch plan, you get unlimited content and design change requests for 7 days after your website goes live. This ensures your website is exactly how you want it.',
    category: FAQ_CATEGORIES.SUPPORT,
  },
  {
    id: 17,
    question: 'How do I get support?',
    answer: 'We offer email support for all paid plans. You can contact us at support@instantwebsite.ai, and we'll get back to you within 24 hours.',
    category: FAQ_CATEGORIES.SUPPORT,
  },
  {
    id: 18,
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time. If you cancel, your website will remain active until the end of your billing period.',
    category: FAQ_CATEGORIES.PRICING,
  },
  {
    id: 19,
    question: 'Do you offer refunds?',
    answer: 'We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with our service, contact us within 14 days of your purchase for a full refund.',
    category: FAQ_CATEGORIES.PRICING,
  },
  {
    id: 20,
    question: 'Can I export my website?',
    answer: 'Yes, you can export your website as static HTML files with our free plan. This allows you to host your website anywhere you want.',
    category: FAQ_CATEGORIES.TECHNICAL,
  },
];

/**
 * Get all FAQ categories with counts
 * 
 * @returns {Array} Array of category objects with name and count
 */
export const getFaqCategories = () => {
  const categoryCounts = faqData.reduce((acc, faq) => {
    acc[faq.category] = (acc[faq.category] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(FAQ_CATEGORIES).map(([key, value]) => ({
    id: value,
    name: key.charAt(0) + key.slice(1).toLowerCase(),
    count: categoryCounts[value] || 0,
  }));
};

/**
 * Get FAQs by category
 * 
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered FAQs
 */
export const getFaqsByCategory = (category) => {
  return faqData.filter(faq => faq.category === category);
};

/**
 * Search FAQs by query
 * 
 * @param {string} query - Search query
 * @returns {Array} Filtered FAQs
 */
export const searchFaqs = (query) => {
  const searchTerm = query.toLowerCase();
  
  return faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm) || 
    faq.answer.toLowerCase().includes(searchTerm)
  );
};

/**
 * Get FAQ by ID
 * 
 * @param {number} id - FAQ ID
 * @returns {Object|null} FAQ object or null if not found
 */
export const getFaqById = (id) => {
  return faqData.find(faq => faq.id === id) || null;
};

/**
 * Get popular FAQs
 * 
 * @param {number} count - Number of FAQs to return
 * @returns {Array} Popular FAQs
 */
export const getPopularFaqs = (count = 5) => {
  // In a real app, this would be based on analytics data
  // For now, we'll just return the first few FAQs
  return faqData.slice(0, count);
};
