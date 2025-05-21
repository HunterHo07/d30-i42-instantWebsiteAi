'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook for creating scroll-based animations with GSAP
 * 
 * @param {Object} options - Animation options
 * @param {string} options.trigger - CSS selector for the trigger element
 * @param {string} options.target - CSS selector for the target element(s) to animate
 * @param {Object} options.animation - GSAP animation properties
 * @param {Object} options.scrollConfig - ScrollTrigger configuration
 * @param {Array} dependencies - Dependencies array for the useEffect hook
 * @returns {Object} - Refs for the container and animation elements
 */
const useScrollAnimation = (options, dependencies = []) => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const {
      trigger = containerRef.current,
      target,
      animation = { opacity: 0, y: 50 },
      scrollConfig = {
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    } = options;
    
    const ctx = gsap.context(() => {
      // Get target elements
      const targetElements = target 
        ? containerRef.current.querySelectorAll(target) 
        : [containerRef.current];
      
      // Create animation
      animationRef.current = gsap.fromTo(
        targetElements,
        animation,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trigger === containerRef.current ? trigger : containerRef.current.querySelector(trigger),
            ...scrollConfig,
          }
        }
      );
    }, containerRef);
    
    return () => {
      // Clean up animation
      if (animationRef.current) {
        animationRef.current.kill();
      }
      ctx.revert();
    };
  }, [options, ...dependencies]);
  
  return { containerRef, animationRef };
};

/**
 * Custom hook for creating a fade-in animation on scroll
 * 
 * @param {Object} options - Animation options
 * @param {Array} dependencies - Dependencies array for the useEffect hook
 * @returns {Object} - Ref for the container element
 */
export const useFadeInOnScroll = (options = {}, dependencies = []) => {
  const { containerRef } = useScrollAnimation(
    {
      animation: { opacity: 0, y: 30 },
      scrollConfig: {
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    },
    dependencies
  );
  
  return containerRef;
};

/**
 * Custom hook for creating a fade-in-left animation on scroll
 * 
 * @param {Object} options - Animation options
 * @param {Array} dependencies - Dependencies array for the useEffect hook
 * @returns {Object} - Ref for the container element
 */
export const useFadeInLeftOnScroll = (options = {}, dependencies = []) => {
  const { containerRef } = useScrollAnimation(
    {
      animation: { opacity: 0, x: -50 },
      scrollConfig: {
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    },
    dependencies
  );
  
  return containerRef;
};

/**
 * Custom hook for creating a fade-in-right animation on scroll
 * 
 * @param {Object} options - Animation options
 * @param {Array} dependencies - Dependencies array for the useEffect hook
 * @returns {Object} - Ref for the container element
 */
export const useFadeInRightOnScroll = (options = {}, dependencies = []) => {
  const { containerRef } = useScrollAnimation(
    {
      animation: { opacity: 0, x: 50 },
      scrollConfig: {
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    },
    dependencies
  );
  
  return containerRef;
};

/**
 * Custom hook for creating a staggered animation on scroll
 * 
 * @param {Object} options - Animation options
 * @param {Array} dependencies - Dependencies array for the useEffect hook
 * @returns {Object} - Ref for the container element
 */
export const useStaggerOnScroll = (options = {}, dependencies = []) => {
  const { containerRef } = useScrollAnimation(
    {
      target: options.target || '.stagger-item',
      animation: { opacity: 0, y: 30 },
      scrollConfig: {
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    },
    dependencies
  );
  
  return containerRef;
};

export default useScrollAnimation;
