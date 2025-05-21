/**
 * Utility functions for handling business information
 */

import { getItem, setItem, STORAGE_KEYS } from './localStorage';

/**
 * Default business information structure
 */
export const DEFAULT_BUSINESS_INFO = {
  name: '',
  description: '',
  logo: null,
  domain: '',
  email: '',
  phone: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  },
  social: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  },
  hours: {
    monday: { open: '9:00 AM', close: '5:00 PM' },
    tuesday: { open: '9:00 AM', close: '5:00 PM' },
    wednesday: { open: '9:00 AM', close: '5:00 PM' },
    thursday: { open: '9:00 AM', close: '5:00 PM' },
    friday: { open: '9:00 AM', close: '5:00 PM' },
    saturday: { open: 'Closed', close: 'Closed' },
    sunday: { open: 'Closed', close: 'Closed' },
  },
  categories: [],
  tags: [],
  createdAt: null,
  updatedAt: null,
};

/**
 * Save business information to localStorage
 * 
 * @param {Object} businessInfo - Business information object
 * @returns {boolean} True if successful, false otherwise
 */
export const saveBusinessInfo = (businessInfo) => {
  const now = new Date().toISOString();
  
  // Add timestamps
  const updatedInfo = {
    ...DEFAULT_BUSINESS_INFO,
    ...businessInfo,
    updatedAt: now,
    createdAt: businessInfo.createdAt || now,
  };
  
  return setItem(STORAGE_KEYS.BUSINESS_INFO, updatedInfo);
};

/**
 * Get business information from localStorage
 * 
 * @returns {Object} Business information object
 */
export const getBusinessInfo = () => {
  return getItem(STORAGE_KEYS.BUSINESS_INFO, DEFAULT_BUSINESS_INFO);
};

/**
 * Update specific fields in business information
 * 
 * @param {Object} updates - Fields to update
 * @returns {Object} Updated business information
 */
export const updateBusinessInfo = (updates) => {
  const currentInfo = getBusinessInfo();
  const updatedInfo = {
    ...currentInfo,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  // Handle nested updates for address and social
  if (updates.address) {
    updatedInfo.address = {
      ...currentInfo.address,
      ...updates.address,
    };
  }
  
  if (updates.social) {
    updatedInfo.social = {
      ...currentInfo.social,
      ...updates.social,
    };
  }
  
  if (updates.hours) {
    updatedInfo.hours = {
      ...currentInfo.hours,
      ...updates.hours,
    };
  }
  
  saveBusinessInfo(updatedInfo);
  return updatedInfo;
};

/**
 * Validate business information
 * 
 * @param {Object} businessInfo - Business information to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateBusinessInfo = (businessInfo) => {
  const errors = {};
  
  // Required fields
  if (!businessInfo.name || businessInfo.name.trim() === '') {
    errors.name = 'Business name is required';
  }
  
  if (!businessInfo.description || businessInfo.description.trim() === '') {
    errors.description = 'Business description is required';
  } else if (businessInfo.description.length > 500) {
    errors.description = 'Description must be 500 characters or less';
  }
  
  // Domain validation
  if (businessInfo.domain && !/^[a-z0-9-]+$/.test(businessInfo.domain)) {
    errors.domain = 'Domain can only contain lowercase letters, numbers, and hyphens';
  }
  
  // Email validation
  if (businessInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessInfo.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Phone validation
  if (businessInfo.phone && !/^[0-9+\-() ]+$/.test(businessInfo.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Generate a domain suggestion based on business name
 * 
 * @param {string} businessName - Business name
 * @returns {string} Suggested domain
 */
export const generateDomainSuggestion = (businessName) => {
  if (!businessName) return '';
  
  // Convert to lowercase, remove special characters, and replace spaces with hyphens
  return businessName
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') // Replace multiple hyphens with a single one
    .trim();
};

/**
 * Generate a sample business description based on business name and type
 * 
 * @param {string} businessName - Business name
 * @param {string} businessType - Business type
 * @returns {string} Sample description
 */
export const generateSampleDescription = (businessName, businessType) => {
  if (!businessName) return '';
  
  const descriptions = {
    restaurant: `${businessName} is a premier dining establishment offering delicious cuisine in a welcoming atmosphere. Our menu features a variety of dishes made with fresh, locally-sourced ingredients.`,
    cafe: `${businessName} is a cozy cafe serving premium coffee, tea, and light fare. We pride ourselves on our friendly service and relaxing environment.`,
    retail: `${businessName} offers a curated selection of high-quality products for discerning customers. We're committed to providing exceptional service and unique merchandise.`,
    technology: `${businessName} provides innovative technology solutions to help businesses thrive in the digital age. Our team of experts is dedicated to delivering cutting-edge services.`,
    consulting: `${businessName} offers expert consulting services to help businesses overcome challenges and achieve their goals. Our experienced team provides personalized strategies for success.`,
    fitness: `${businessName} is dedicated to helping clients achieve their fitness goals through personalized training programs and state-of-the-art facilities.`,
    healthcare: `${businessName} is committed to providing compassionate, high-quality healthcare services. Our team of professionals is dedicated to improving the well-being of our patients.`,
    education: `${businessName} offers comprehensive educational programs designed to inspire learning and foster growth. Our experienced instructors are committed to student success.`,
    default: `${businessName} is dedicated to providing high-quality services and exceptional customer experiences. We're committed to excellence in everything we do.`,
  };
  
  if (!businessType) return descriptions.default;
  
  const type = businessType.toLowerCase();
  
  for (const [key, value] of Object.entries(descriptions)) {
    if (type.includes(key)) {
      return value;
    }
  }
  
  return descriptions.default;
};
