'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { StaticLoadingSpinner } from './LoadingSpinner';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  href,
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-secondary-600 text-white hover:shadow-lg hover:from-primary-600 hover:to-secondary-700',
    secondary: 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50',
    outline: 'bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
  };
  
  // Size classes
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };
  
  // Common classes
  const commonClasses = `
    inline-flex items-center justify-center
    rounded-md font-medium transition-all duration-300
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${fullWidth ? 'w-full' : ''}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;
  
  // Animation variants
  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };
  
  // Render icon
  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <span className={`${iconPosition === 'left' ? 'mr-2' : 'ml-2'}`}>
        {icon}
      </span>
    );
  };
  
  // Render content
  const renderContent = () => (
    <>
      {loading ? (
        <StaticLoadingSpinner size="small" color={variant === 'primary' ? 'white' : 'primary'} />
      ) : (
        <>
          {iconPosition === 'left' && renderIcon()}
          {children}
          {iconPosition === 'right' && renderIcon()}
        </>
      )}
    </>
  );
  
  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={commonClasses} {...props}>
        {renderContent()}
      </Link>
    );
  }
  
  // Otherwise, render as button
  return (
    <motion.button
      whileHover={!disabled && !loading ? 'hover' : undefined}
      whileTap={!disabled && !loading ? 'tap' : undefined}
      variants={buttonVariants}
      className={commonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </motion.button>
  );
};

export default Button;
