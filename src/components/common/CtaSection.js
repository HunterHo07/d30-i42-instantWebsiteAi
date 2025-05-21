'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Button from './Button';

const CtaSection = ({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  variant = 'default',
  className = '',
  ...props
}) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  // Variant classes
  const variantClasses = {
    default: 'bg-gradient-to-br from-primary-500 to-secondary-600 text-white',
    light: 'bg-gradient-to-br from-primary-50 to-secondary-50 text-gray-900',
    dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white',
    minimal: 'bg-white border border-gray-200 text-gray-900',
  };
  
  // Common classes
  const commonClasses = `
    py-16 md:py-24 relative overflow-hidden rounded-2xl
    ${variantClasses[variant]}
    ${className}
  `;
  
  useEffect(() => {
    if (variant === 'dark') {
      const ctx = gsap.context(() => {
        // Animate the background gradient
        gsap.to(sectionRef.current, {
          backgroundPosition: '100% 100%',
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
        
        // Subtle floating animation for the content
        gsap.to(contentRef.current, {
          y: '-10px',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }, sectionRef);
      
      return () => ctx.revert(); // Cleanup
    }
  }, [variant]);
  
  return (
    <section
      ref={sectionRef}
      className={commonClasses}
      {...props}
    >
      {/* Background elements for dark variant */}
      {variant === 'dark' && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary-900/20 via-transparent to-transparent"></div>
          
          {/* Animated gradient lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent animate-gradient-x"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-500 to-transparent animate-gradient-x"></div>
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-primary-500 to-transparent animate-gradient-y"></div>
            <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-secondary-500 to-transparent animate-gradient-y"></div>
          </div>
          
          {/* Particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  opacity: Math.random() * 0.5 + 0.2,
                  animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div 
          ref={contentRef}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            {title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl mb-10 max-w-3xl mx-auto"
          >
            {description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {primaryButtonText && primaryButtonLink && (
              <Button
                href={primaryButtonLink}
                variant={variant === 'light' || variant === 'minimal' ? 'primary' : 'secondary'}
                size="large"
              >
                {primaryButtonText}
              </Button>
            )}
            
            {secondaryButtonText && secondaryButtonLink && (
              <Button
                href={secondaryButtonLink}
                variant={variant === 'light' || variant === 'minimal' ? 'secondary' : 'outline'}
                size="large"
              >
                {secondaryButtonText}
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Simple CTA component
export const SimpleCta = ({
  title,
  buttonText,
  buttonLink,
  className = '',
  ...props
}) => {
  return (
    <div className={`bg-primary-50 rounded-lg p-6 text-center ${className}`} {...props}>
      <h3 className="text-xl font-bold mb-4 text-gray-900">{title}</h3>
      <Button href={buttonLink} variant="primary">
        {buttonText}
      </Button>
    </div>
  );
};

// Newsletter CTA component
export const NewsletterCta = ({
  title = 'Subscribe to our newsletter',
  description = 'Get the latest updates and news delivered to your inbox.',
  buttonText = 'Subscribe',
  placeholder = 'Your email',
  className = '',
  ...props
}) => {
  return (
    <div className={`bg-gray-50 rounded-lg p-8 ${className}`} {...props}>
      <div className="text-center max-w-md mx-auto">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <form className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder={placeholder}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
          <Button type="submit" variant="primary">
            {buttonText}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CtaSection;
