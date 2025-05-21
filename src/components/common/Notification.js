'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useApp } from '@/lib/AppContext';

const Notification = () => {
  const { notification, clearNotification } = useApp();
  
  // Auto-dismiss notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);
  
  // Get icon based on notification type
  const getIcon = () => {
    switch (notification?.type) {
      case 'success':
        return <FaCheckCircle className="text-green-500 text-xl" />;
      case 'error':
        return <FaExclamationCircle className="text-red-500 text-xl" />;
      case 'warning':
        return <FaExclamationCircle className="text-yellow-500 text-xl" />;
      case 'info':
      default:
        return <FaInfoCircle className="text-blue-500 text-xl" />;
    }
  };
  
  // Get background color based on notification type
  const getBackgroundColor = () => {
    switch (notification?.type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };
  
  // Animation variants
  const notificationVariants = {
    hidden: { 
      opacity: 0,
      y: -50,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };
  
  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <AnimatePresence>
        {notification && (
          <motion.div
            key="notification"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={notificationVariants}
            className={`${getBackgroundColor()} border rounded-lg shadow-lg p-4 flex items-start`}
          >
            <div className="flex-shrink-0 mr-3">
              {getIcon()}
            </div>
            <div className="flex-1 mr-2">
              <p className="text-gray-800">{notification.message}</p>
            </div>
            <button
              onClick={clearNotification}
              className="flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close notification"
            >
              <FaTimes />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
