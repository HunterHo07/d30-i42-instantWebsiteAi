'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem, STORAGE_KEYS } from './localStorage';
import { getBusinessInfo, saveBusinessInfo, DEFAULT_BUSINESS_INFO } from './businessInfo';
import { getTemplateById } from './templates';

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  // State for selected template
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // State for business information
  const [businessInfo, setBusinessInfo] = useState(DEFAULT_BUSINESS_INFO);
  
  // State for user preferences
  const [userPreferences, setUserPreferences] = useState({
    theme: 'light',
    viewMode: 'desktop',
  });
  
  // State for loading status
  const [isLoading, setIsLoading] = useState(false);
  
  // State for notification
  const [notification, setNotification] = useState(null);
  
  // Load data from localStorage on mount
  useEffect(() => {
    // Load selected template
    const savedTemplateId = getItem(STORAGE_KEYS.SELECTED_TEMPLATE);
    if (savedTemplateId) {
      const template = getTemplateById(savedTemplateId);
      if (template) {
        setSelectedTemplate(template);
      }
    }
    
    // Load business info
    const savedBusinessInfo = getBusinessInfo();
    if (savedBusinessInfo) {
      setBusinessInfo(savedBusinessInfo);
    }
    
    // Load user preferences
    const savedPreferences = getItem(STORAGE_KEYS.USER_PREFERENCES);
    if (savedPreferences) {
      setUserPreferences(savedPreferences);
    }
  }, []);
  
  // Save selected template to localStorage
  const saveSelectedTemplate = (template) => {
    setSelectedTemplate(template);
    setItem(STORAGE_KEYS.SELECTED_TEMPLATE, template?.id);
  };
  
  // Update business information
  const updateBusinessInfo = (updates) => {
    const updatedInfo = {
      ...businessInfo,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    setBusinessInfo(updatedInfo);
    saveBusinessInfo(updatedInfo);
    return updatedInfo;
  };
  
  // Update user preferences
  const updateUserPreferences = (updates) => {
    const updatedPreferences = {
      ...userPreferences,
      ...updates,
    };
    
    setUserPreferences(updatedPreferences);
    setItem(STORAGE_KEYS.USER_PREFERENCES, updatedPreferences);
    return updatedPreferences;
  };
  
  // Show notification
  const showNotification = (message, type = 'info', duration = 3000) => {
    setNotification({ message, type });
    
    if (duration > 0) {
      setTimeout(() => {
        setNotification(null);
      }, duration);
    }
  };
  
  // Clear notification
  const clearNotification = () => {
    setNotification(null);
  };
  
  // Generate website
  const generateWebsite = async (templateId, businessData) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would make an API call to generate the website
      // For the demo, we'll simulate a delay and return success
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update business info
      updateBusinessInfo(businessData);
      
      // Update selected template
      const template = getTemplateById(templateId);
      saveSelectedTemplate(template);
      
      showNotification('Website generated successfully!', 'success');
      return true;
    } catch (error) {
      console.error('Error generating website:', error);
      showNotification('Failed to generate website. Please try again.', 'error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Publish website
  const publishWebsite = async (domain) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would make an API call to publish the website
      // For the demo, we'll simulate a delay and return success
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update business info with domain
      if (domain) {
        updateBusinessInfo({ domain });
      }
      
      showNotification('Website published successfully!', 'success');
      return true;
    } catch (error) {
      console.error('Error publishing website:', error);
      showNotification('Failed to publish website. Please try again.', 'error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Context value
  const value = {
    selectedTemplate,
    setSelectedTemplate: saveSelectedTemplate,
    businessInfo,
    updateBusinessInfo,
    userPreferences,
    updateUserPreferences,
    isLoading,
    setIsLoading,
    notification,
    showNotification,
    clearNotification,
    generateWebsite,
    publishWebsite,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  
  return context;
};

export default AppContext;
