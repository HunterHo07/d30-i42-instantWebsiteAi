'use client';

import { motion } from 'framer-motion';

const FeatureCard = ({
  icon,
  title,
  description,
  variant = 'default',
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
    minimal: 'bg-transparent border-none shadow-none',
  };
  
  // Common classes
  const commonClasses = `
    rounded-xl p-6 ${variant !== 'minimal' ? 'shadow-md' : ''}
    ${variantClasses[variant]}
    ${className}
  `;
  
  // Animation variants
  const cardVariants = {
    hover: {
      y: -5,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <motion.div
      whileHover={variant !== 'minimal' ? 'hover' : undefined}
      variants={cardVariants}
      className={commonClasses}
      {...props}
    >
      {icon && (
        <div className="mb-4 text-4xl">
          {icon}
        </div>
      )}
      
      <h3 className={`text-xl font-bold mb-2 ${
        variant === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h3>
      
      <p className={
        variant === 'dark' ? 'text-gray-300' : 'text-gray-600'
      }>
        {description}
      </p>
    </motion.div>
  );
};

// Feature grid component
export const FeatureGrid = ({ features, columns = 3, variant = 'default' }) => {
  // Column classes
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };
  
  return (
    <div className={`grid ${columnClasses[columns]} gap-8`}>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          variant={variant}
        />
      ))}
    </div>
  );
};

// Feature with image component
export const FeatureWithImage = ({
  title,
  description,
  image,
  imageAlt,
  imagePosition = 'right',
  bulletPoints = [],
  ctaText,
  ctaLink,
  className = '',
  ...props
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${className}`} {...props}>
      {/* Content */}
      <div className={imagePosition === 'left' ? 'md:order-2' : 'md:order-1'}>
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
          {title}
        </h3>
        
        <p className="text-gray-700 mb-6">
          {description}
        </p>
        
        {bulletPoints.length > 0 && (
          <ul className="space-y-3 mb-8">
            {bulletPoints.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-center"
              >
                <span className="text-primary-500 mr-2">✓</span>
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>
        )}
        
        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
          >
            {ctaText}
          </a>
        )}
      </div>
      
      {/* Image */}
      <div className={imagePosition === 'left' ? 'md:order-1' : 'md:order-2'}>
        <div className="relative">
          {image && (
            <img
              src={image}
              alt={imageAlt || title}
              className="rounded-xl shadow-lg"
            />
          )}
          
          {/* If no image is provided, show a placeholder */}
          {!image && (
            <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-gray-400">Image Placeholder</span>
            </div>
          )}
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full blur-2xl opacity-20"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-secondary-500 to-primary-600 rounded-full blur-2xl opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
