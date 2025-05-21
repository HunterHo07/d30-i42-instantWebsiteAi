'use client';

import { motion } from 'framer-motion';

const Card = ({
  children,
  variant = 'default',
  hover = false,
  onClick,
  className = '',
  ...props
}) => {
  // Variant classes
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    primary: 'bg-primary-50 border border-primary-200',
    secondary: 'bg-secondary-50 border border-secondary-200',
    gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 border border-gray-200',
    dark: 'bg-gray-800 text-white border border-gray-700',
    transparent: 'bg-transparent',
  };
  
  // Common classes
  const commonClasses = `
    rounded-xl shadow-md overflow-hidden
    ${onClick ? 'cursor-pointer' : ''}
    ${variantClasses[variant]}
    ${className}
  `;
  
  // Animation variants
  const cardVariants = {
    hover: {
      y: -5,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { duration: 0.3 }
    },
    tap: {
      y: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      transition: { duration: 0.1 }
    }
  };
  
  return (
    <motion.div
      whileHover={hover ? 'hover' : undefined}
      whileTap={onClick ? 'tap' : undefined}
      variants={cardVariants}
      className={commonClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Card header component
export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-4 border-b border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card body component
export const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card footer component
export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-4 border-t border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
