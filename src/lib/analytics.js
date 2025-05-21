'use client';

/**
 * Analytics utility functions
 * 
 * This is a placeholder implementation that simulates analytics tracking.
 * In a real application, you would integrate with a real analytics service.
 */

import { getItem, setItem } from './localStorage';

// Constants
const ANALYTICS_STORAGE_KEY = 'instantWebsiteAi_analytics';
const SESSION_STORAGE_KEY = 'instantWebsiteAi_session';

// Initialize analytics
export const initAnalytics = () => {
  // Check if analytics is already initialized
  if (typeof window === 'undefined') return;
  
  // Get or create session ID
  const sessionId = getSessionId();
  
  // Track page view
  trackPageView();
  
  console.log('Analytics initialized with session ID:', sessionId);
  
  return sessionId;
};

// Get or create session ID
const getSessionId = () => {
  // Check if session ID exists in sessionStorage
  let sessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);
  
  // If not, create a new one
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  }
  
  return sessionId;
};

// Generate a random session ID
const generateSessionId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Track page view
export const trackPageView = (path) => {
  if (typeof window === 'undefined') return;
  
  const currentPath = path || window.location.pathname;
  const timestamp = new Date().toISOString();
  const sessionId = getSessionId();
  
  // Get existing analytics data
  const analyticsData = getItem(ANALYTICS_STORAGE_KEY, { pageViews: [] });
  
  // Add new page view
  analyticsData.pageViews.push({
    path: currentPath,
    timestamp,
    sessionId,
  });
  
  // Save updated analytics data
  setItem(ANALYTICS_STORAGE_KEY, analyticsData);
  
  console.log('Page view tracked:', currentPath);
};

// Track event
export const trackEvent = (category, action, label, value) => {
  if (typeof window === 'undefined') return;
  
  const timestamp = new Date().toISOString();
  const sessionId = getSessionId();
  
  // Get existing analytics data
  const analyticsData = getItem(ANALYTICS_STORAGE_KEY, { pageViews: [], events: [] });
  
  // Add new event
  analyticsData.events = analyticsData.events || [];
  analyticsData.events.push({
    category,
    action,
    label,
    value,
    timestamp,
    sessionId,
  });
  
  // Save updated analytics data
  setItem(ANALYTICS_STORAGE_KEY, analyticsData);
  
  console.log('Event tracked:', { category, action, label, value });
};

// Track conversion
export const trackConversion = (conversionType, value) => {
  if (typeof window === 'undefined') return;
  
  trackEvent('conversion', conversionType, '', value);
  
  console.log('Conversion tracked:', { conversionType, value });
};

// Get analytics data
export const getAnalyticsData = () => {
  if (typeof window === 'undefined') return { pageViews: [], events: [] };
  
  return getItem(ANALYTICS_STORAGE_KEY, { pageViews: [], events: [] });
};

// Clear analytics data
export const clearAnalyticsData = () => {
  if (typeof window === 'undefined') return;
  
  setItem(ANALYTICS_STORAGE_KEY, { pageViews: [], events: [] });
  
  console.log('Analytics data cleared');
};

// Get page view count
export const getPageViewCount = (path) => {
  if (typeof window === 'undefined') return 0;
  
  const analyticsData = getAnalyticsData();
  
  if (path) {
    return analyticsData.pageViews.filter((pageView) => pageView.path === path).length;
  }
  
  return analyticsData.pageViews.length;
};

// Get event count
export const getEventCount = (category, action) => {
  if (typeof window === 'undefined') return 0;
  
  const analyticsData = getAnalyticsData();
  
  if (!analyticsData.events) return 0;
  
  if (category && action) {
    return analyticsData.events.filter(
      (event) => event.category === category && event.action === action
    ).length;
  }
  
  if (category) {
    return analyticsData.events.filter((event) => event.category === category).length;
  }
  
  return analyticsData.events.length;
};

// Analytics hook for React components
export const useAnalytics = () => {
  return {
    trackPageView,
    trackEvent,
    trackConversion,
    getPageViewCount,
    getEventCount,
  };
};
