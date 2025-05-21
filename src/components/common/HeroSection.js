'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = ({
  title,
  highlightedTitle,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  image,
  imageAlt,
  variant = 'default',
  className = '',
  ...props
}) => {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  
  // Variant classes
  const variantClasses = {
    default: 'bg-white text-gray-900',
    dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white',
    gradient: 'bg-gradient-to-br from-primary-500 to-secondary-600 text-white',
    minimal: 'bg-gray-50 text-gray-900',
  };
  
  // Common classes
  const commonClasses = `
    relative min-h-[80vh] flex items-center pt-20 overflow-hidden
    ${variantClasses[variant]}
    ${className}
  `;
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation for the hero elements
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
      
      gsap.fromTo(
        subheadingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );
      
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' }
      );
      
      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.9, y: 30 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 1, 
            delay: 0.6, 
            ease: 'power3.out',
          }
        );
        
        // Floating animation
        gsap.to(imageRef.current, {
          y: '-20px',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
        
        // Parallax effect on scroll
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          y: 100,
          ease: 'none',
        });
      }
    }, heroRef);
    
    return () => ctx.revert(); // Cleanup
  }, []);
  
  return (
    <section
      ref={heroRef}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div className="text-center lg:text-left">
            <h1 
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              {title}
              {highlightedTitle && (
                <span className={`${
                  variant === 'dark' || variant === 'gradient'
                    ? 'bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-500'
                    : 'bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600'
                }`}>
                  {highlightedTitle}
                </span>
              )}
            </h1>
            
            <p 
              ref={subheadingRef}
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {description}
            </p>
            
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {primaryButtonText && primaryButtonLink && (
                <Button
                  href={primaryButtonLink}
                  variant={variant === 'dark' || variant === 'gradient' ? 'secondary' : 'primary'}
                  size="large"
                >
                  {primaryButtonText}
                </Button>
              )}
              
              {secondaryButtonText && secondaryButtonLink && (
                <Button
                  href={secondaryButtonLink}
                  variant={variant === 'dark' || variant === 'gradient' ? 'outline' : 'secondary'}
                  size="large"
                >
                  {secondaryButtonText}
                </Button>
              )}
            </div>
          </div>
          
          {/* Hero image */}
          {image && (
            <div ref={imageRef} className="relative">
              <img
                src={image}
                alt={imageAlt || 'Hero image'}
                className="rounded-lg shadow-lg"
              />
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full blur-2xl opacity-20"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-secondary-500 to-primary-600 rounded-full blur-2xl opacity-20"></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className={`text-sm mb-2 ${
          variant === 'dark' || variant === 'gradient' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Scroll to explore
        </span>
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${
          variant === 'dark' || variant === 'gradient' ? 'border-gray-400' : 'border-gray-300'
        }`}>
          <div className={`w-1.5 h-3 rounded-full mt-2 animate-bounce ${
            variant === 'dark' || variant === 'gradient' ? 'bg-white' : 'bg-gray-500'
          }`}></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
