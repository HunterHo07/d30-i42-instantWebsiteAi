'use client';

import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const TestimonialCard = ({
  testimonial,
  variant = 'default',
  className = '',
  ...props
}) => {
  // Variant classes
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    primary: 'bg-primary-50 border border-primary-200',
    gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 border border-gray-200',
    dark: 'bg-gray-800 text-white border border-gray-700',
  };
  
  // Common classes
  const commonClasses = `
    rounded-xl shadow-md overflow-hidden
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
  
  // Render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
      />
    ));
  };
  
  return (
    <motion.div
      whileHover="hover"
      variants={cardVariants}
      className={commonClasses}
      {...props}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative mr-4">
            {testimonial.image ? (
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl">
                {testimonial.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h4 className={`font-bold ${variant === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {testimonial.name}
            </h4>
            <p className={variant === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              {testimonial.role}
            </p>
          </div>
        </div>
        
        <div className="mb-4 flex">
          {renderStars(testimonial.rating)}
        </div>
        
        <div className="relative">
          <FaQuoteLeft className={`absolute top-0 left-0 text-2xl opacity-10 ${
            variant === 'dark' ? 'text-white' : 'text-gray-400'
          }`} />
          
          <p className={`italic pl-8 ${variant === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            "{testimonial.content}"
          </p>
        </div>
        
        {testimonial.stats && (
          <div className={`mt-4 pt-4 border-t ${
            variant === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex flex-wrap gap-4">
              {testimonial.stats.websitesLaunched && (
                <div>
                  <span className={`font-bold text-lg ${
                    variant === 'dark' ? 'text-primary-300' : 'text-primary-600'
                  }`}>
                    {testimonial.stats.websitesLaunched}
                  </span>
                  <span className={variant === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {' '}websites launched
                  </span>
                </div>
              )}
              
              {testimonial.stats.timeframe && (
                <div>
                  <span className={`font-bold ${
                    variant === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    in {testimonial.stats.timeframe}
                  </span>
                </div>
              )}
              
              {testimonial.stats.timeSaved && (
                <div>
                  <span className={`font-bold text-lg ${
                    variant === 'dark' ? 'text-primary-300' : 'text-primary-600'
                  }`}>
                    {testimonial.stats.timeSaved}
                  </span>
                  <span className={variant === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {' '}saved
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Featured testimonial component with larger layout
export const FeaturedTestimonial = ({ testimonial }) => {
  // Render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
      />
    ));
  };
  
  return (
    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12 border border-gray-100 shadow-md">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/3 mb-8 md:mb-0 md:pr-8">
          <div className="w-24 h-24 rounded-full bg-white shadow-md overflow-hidden mx-auto relative">
            {testimonial.image ? (
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-3xl">
                {testimonial.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="text-center mt-4">
            <h4 className="font-bold text-gray-900 text-xl">{testimonial.name}</h4>
            <p className="text-gray-600">{testimonial.role}</p>
            <div className="flex justify-center mt-2">
              {renderStars(testimonial.rating)}
            </div>
          </div>
        </div>
        <div className="md:w-2/3 md:border-l md:border-gray-300 md:pl-8">
          <FaQuoteLeft className="w-12 h-12 text-primary-300 mb-4" />
          <p className="text-xl md:text-2xl text-gray-700 italic mb-6">
            "{testimonial.content}"
          </p>
          
          {testimonial.stats && (
            <div className="flex items-center">
              <div className="flex-1">
                {testimonial.stats.websitesLaunched && (
                  <p className="text-gray-600">
                    Helped launch{' '}
                    <span className="font-bold text-primary-700">
                      {testimonial.stats.websitesLaunched} websites
                    </span>
                    {' '}in {testimonial.stats.timeframe}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Testimonial grid component
export const TestimonialGrid = ({ testimonials, columns = 3 }) => {
  // Column classes
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };
  
  return (
    <div className={`grid ${columnClasses[columns]} gap-8`}>
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
};

export default TestimonialCard;
