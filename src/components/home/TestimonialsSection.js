'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Section from '@/components/ui/Section';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Small Business Owner',
    company: 'Bloom Boutique',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    quote: 'I was up and running with a professional website in literally minutes. No more wasting weeks on website builders or thousands on agencies. This is exactly what small business owners need!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Freelance Photographer',
    company: 'Chen Visuals',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    quote: 'As a photographer, I needed a site that showcased my work beautifully without the hassle of building it myself. instantWebsiteAi delivered exactly that, and the human design assistance made all the difference.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Restaurant Owner',
    company: 'Coastal Kitchen',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80',
    quote: 'Our restaurant needed an online presence fast. With instantWebsiteAi, we had a beautiful site up in an afternoon, complete with our menu and reservation system. The 7-day design support was invaluable.',
    rating: 4,
  },
  {
    name: 'David Wilson',
    role: 'Startup Founder',
    company: 'TechLaunch',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    quote: "When you are launching a startup, speed is everything. instantWebsiteAi let us get our landing page up in minutes instead of days, helping us capture early users while we built our product.",
    rating: 5,
  },
  {
    name: 'Jessica Kim',
    role: 'Yoga Instructor',
    company: 'Serene Yoga Studio',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    quote: "I am not tech-savvy at all, but I was able to create a beautiful website for my yoga studio in minutes. The templates are gorgeous and the support team helped me customize everything perfectly.",
    rating: 5,
  },
  {
    name: 'Robert Taylor',
    role: 'Consultant',
    company: 'Taylor Consulting',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    quote: 'As a consultant, my website is my storefront. instantWebsiteAi gave me a professional online presence without the professional price tag. The human quality control really sets it apart.',
    rating: 4,
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const testimonialsRef = useRef(null);
  const intervalRef = useRef(null);

  // Auto-rotate testimonials
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Pause rotation on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from('.testimonials-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.testimonials-title',
          start: 'top 80%',
        },
      });

      // Animate testimonials container
      gsap.from('.testimonials-container', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.testimonials-container',
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      id="testimonials"
      className="bg-dark-900 relative"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 opacity-50"></div>

      <div className="relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="testimonials-title text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our <span className="text-gradient gradient-text-secondary">Customers</span> Say
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Don't just take our word for it. Here's what people are saying about instantWebsiteAi.
          </motion.p>
        </div>

        <div
          className="testimonials-container max-w-4xl mx-auto"
          ref={testimonialsRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Testimonial */}
          <motion.div
            className="glass-card rounded-xl p-8 mb-8"
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary-500">
                  <Image
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[activeIndex].rating ? 'text-yellow-400' : 'text-gray-600'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-xl italic text-gray-200 mb-4">
                  "{testimonials[activeIndex].quote}"
                </blockquote>

                <div>
                  <p className="font-semibold text-white">{testimonials[activeIndex].name}</p>
                  <p className="text-gray-400">
                    {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial Navigation */}
          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-primary-500 w-6' : 'bg-gray-600 hover:bg-gray-500'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Avatars */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              className={`relative w-12 h-12 rounded-full overflow-hidden transition-all duration-300 ${
                index === activeIndex
                  ? 'border-2 border-primary-500 scale-110'
                  : 'border border-gray-700 opacity-70 hover:opacity-100'
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TestimonialsSection;
