/**
 * Utility functions for working with localStorage
 * with safety checks for server-side rendering and browser compatibility
 */

// Check if window is defined (browser environment)
const isClient = typeof window !== 'undefined';

/**
 * Get an item from localStorage
 * 
 * @param {string} key - The key to retrieve
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} The stored value or defaultValue
 */
export const getItem = (key, defaultValue = null) => {
  if (!isClient) return defaultValue;
  
  try {
    const item = window.localStorage.getItem(key);
    
    // Return defaultValue if item doesn't exist
    if (item === null) return defaultValue;
    
    // Parse stored json or return as is
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Set an item in localStorage
 * 
 * @param {string} key - The key to set
 * @param {any} value - The value to store
 * @returns {boolean} True if successful, false otherwise
 */
export const setItem = (key, value) => {
  if (!isClient) return false;
  
  try {
    // Convert non-string values to JSON string
    const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
    
    window.localStorage.setItem(key, valueToStore);
    return true;
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
    return false;
  }
};

/**
 * Remove an item from localStorage
 * 
 * @param {string} key - The key to remove
 * @returns {boolean} True if successful, false otherwise
 */
export const removeItem = (key) => {
  if (!isClient) return false;
  
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
    return false;
  }
};

/**
 * Clear all items from localStorage
 * 
 * @returns {boolean} True if successful, false otherwise
 */
export const clearAll = () => {
  if (!isClient) return false;
  
  try {
    window.localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Check if localStorage is available
 * 
 * @returns {boolean} True if localStorage is available
 */
export const isLocalStorageAvailable = () => {
  if (!isClient) return false;
  
  try {
    const testKey = '__test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Get all keys in localStorage
 * 
 * @returns {string[]} Array of keys
 */
export const getAllKeys = () => {
  if (!isClient) return [];
  
  try {
    return Object.keys(window.localStorage);
  } catch (error) {
    console.error('Error getting all keys from localStorage:', error);
    return [];
  }
};

/**
 * Get multiple items from localStorage
 * 
 * @param {string[]} keys - Array of keys to retrieve
 * @returns {Object} Object with key-value pairs
 */
export const getMultipleItems = (keys) => {
  if (!isClient) return {};
  
  try {
    return keys.reduce((acc, key) => {
      acc[key] = getItem(key);
      return acc;
    }, {});
  } catch (error) {
    console.error('Error getting multiple items from localStorage:', error);
    return {};
  }
};

/**
 * Set multiple items in localStorage
 * 
 * @param {Object} items - Object with key-value pairs
 * @returns {boolean} True if all successful, false otherwise
 */
export const setMultipleItems = (items) => {
  if (!isClient) return false;
  
  try {
    Object.entries(items).forEach(([key, value]) => {
      setItem(key, value);
    });
    return true;
  } catch (error) {
    console.error('Error setting multiple items in localStorage:', error);
    return false;
  }
};

// Constants for our application
export const STORAGE_KEYS = {
  SELECTED_TEMPLATE: 'instantWebsiteAi_selectedTemplate',
  BUSINESS_INFO: 'instantWebsiteAi_businessInfo',
  USER_PREFERENCES: 'instantWebsiteAi_userPreferences',
  VISITED_PAGES: 'instantWebsiteAi_visitedPages',
};
