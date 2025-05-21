'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/lib/AppContext';

const LoadingSpinner = ({ fullScreen = false, message = 'Loading...' }) => {
  const { isLoading } = useApp();
  
  if (!isLoading) return null;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: 'linear'
      }
    }
  };
  
  // Full screen spinner
  if (fullScreen) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center">
          <motion.div
            animate="animate"
            variants={spinnerVariants}
            className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full mb-4"
          ></motion.div>
          <p className="text-gray-700 font-medium">{message}</p>
        </div>
      </motion.div>
    );
  }
  
  // Inline spinner
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="flex items-center justify-center p-4"
    >
      <motion.div
        animate="animate"
        variants={spinnerVariants}
        className="w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full mr-3"
      ></motion.div>
      <p className="text-gray-700">{message}</p>
    </motion.div>
  );
};

// Variant that's always visible (not controlled by context)
export const StaticLoadingSpinner = ({ size = 'medium', color = 'primary', message }) => {
  // Size classes
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };
  
  // Color classes
  const colorClasses = {
    primary: 'border-primary-200 border-t-primary-600',
    secondary: 'border-secondary-200 border-t-secondary-600',
    white: 'border-white/30 border-t-white',
    gray: 'border-gray-200 border-t-gray-600',
  };
  
  // Animation variants
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: 'linear'
      }
    }
  };
  
  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate="animate"
        variants={spinnerVariants}
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full ${message ? 'mr-3' : ''}`}
      ></motion.div>
      {message && <p className="text-gray-700">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
