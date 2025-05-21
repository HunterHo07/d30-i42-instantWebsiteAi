'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/common/Button';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const heroRef = useRef(null);
  const websitePreviewRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Hero animations
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

      // Website preview animation
      gsap.fromTo(
        websitePreviewRef.current,
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

      // Floating animation for the preview
      gsap.to(websitePreviewRef.current, {
        y: '-20px',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Parallax effect on scroll
      gsap.to(websitePreviewRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 100,
        ease: 'none',
      });
    }, heroRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    >
      {/* Background elements */}
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

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div className="text-center lg:text-left">
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
            >
              Instant Websites,<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-500">
                Zero Effort
              </span>
            </h1>

            <p
              ref={subheadingRef}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Launch a polished website in seconds—no learning curve, no building, no drag-and-drop. Just enter your business name and logo.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                href="/demo"
                variant="secondary"
                size="large"
              >
                Try It Now
              </Button>
              <Button
                href="#how-it-works"
                variant="outline"
                size="large"
              >
                How It Works
              </Button>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-12 flex flex-wrap justify-center lg:justify-start gap-6"
            >
              {['Free', 'Instant', 'No-Code', 'Professional'].map((tag) => (
                <motion.span
                  key={tag}
                  variants={itemVariants}
                  className="px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 text-gray-300 text-sm"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Website preview */}
          <div
            ref={websitePreviewRef}
            className="relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-full">
              {/* Browser mockup */}
              <div className="rounded-t-lg bg-gray-800 p-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 flex-1 bg-gray-700 rounded h-6 flex items-center px-3">
                    <div className="w-4 h-4 rounded-full bg-primary-500 mr-2"></div>
                    <span className="text-xs text-gray-300">yourname.instantweb.ai</span>
                  </div>
                </div>
              </div>

              {/* Website content */}
              <div className="bg-white rounded-b-lg overflow-hidden shadow-2xl">
                <div className="relative aspect-[16/9] bg-gradient-to-br from-primary-100 to-secondary-100">
                  {/* Website header */}
                  <div className="absolute top-0 left-0 right-0 bg-white shadow-sm p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded bg-primary-500"></div>
                      <span className="font-bold text-gray-800">Your Business</span>
                    </div>
                    <div className="hidden sm:flex space-x-4">
                      {['Home', 'About', 'Services', 'Contact'].map((item) => (
                        <div key={item} className="w-16 h-4 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded sm:hidden"></div>
                  </div>

                  {/* Website hero */}
                  <div className="absolute top-16 left-0 right-0 bottom-0 p-4 flex flex-col justify-center items-center text-center">
                    <div className="w-3/4 h-8 bg-gray-800 rounded mb-4"></div>
                    <div className="w-1/2 h-4 bg-gray-600 rounded mb-6"></div>
                    <div className="w-32 h-10 bg-primary-500 rounded"></div>
                  </div>
                </div>

                {/* Website content sections */}
                <div className="p-4 space-y-4">
                  {/* Features section */}
                  <div className="flex justify-between">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200 mb-2"></div>
                        <div className="w-16 h-3 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>

                  {/* Content section */}
                  <div className="flex flex-col space-y-2 pt-4">
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full blur-2xl opacity-20"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-secondary-500 to-primary-600 rounded-full blur-2xl opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}


