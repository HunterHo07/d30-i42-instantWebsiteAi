'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const templates = [
  {
    id: 'business',
    name: 'Business Pro',
    description: 'Perfect for small businesses and professional services.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    category: 'Business',
  },
  {
    id: 'restaurant',
    name: 'Culinary',
    description: 'Designed for restaurants, cafes, and food services.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'Restaurant',
  },
  {
    id: 'portfolio',
    name: 'Creative Portfolio',
    description: 'Showcase your work with this elegant portfolio template.',
    image: 'https://images.unsplash.com/photo-1545665277-5937489579f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'Portfolio',
  },
  {
    id: 'ecommerce',
    name: 'Shop Modern',
    description: 'Start selling online with this e-commerce template.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'E-commerce',
  },
  {
    id: 'blog',
    name: 'Content Creator',
    description: 'Share your stories with this blog-focused template.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'Blog',
  },
  {
    id: 'landing',
    name: 'Product Launch',
    description: 'Perfect for product launches and marketing campaigns.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80',
    category: 'Landing Page',
  },
];

const categories = ['All', 'Business', 'Restaurant', 'Portfolio', 'E-commerce', 'Blog', 'Landing Page'];

const TemplatesSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredTemplates, setFilteredTemplates] = useState(templates);
  const sectionRef = useRef(null);
  const templatesRef = useRef(null);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredTemplates(templates);
    } else {
      setFilteredTemplates(templates.filter(template => template.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from('.templates-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.templates-title',
          start: 'top 80%',
        },
      });

      // Animate templates
      gsap.from('.template-card', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.templates-grid',
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      id="templates"
      className="bg-dark-900 relative"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 opacity-50"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="templates-title text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gradient gradient-text-accent">Template</span> Library
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Browse our collection of professionally designed templates.
            All templates are free and open-sourced on GitHub.
          </motion.p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div 
          className="templates-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          ref={templatesRef}
        >
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              className="template-card group relative overflow-hidden rounded-xl border border-gray-800 transition-all duration-300 hover:shadow-glow hover:border-primary-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-70"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="inline-block bg-primary-500/80 text-white text-xs font-medium px-2.5 py-1 rounded mb-3">
                    {template.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{template.description}</p>
                  
                  <div className="flex gap-3">
                    <Link
                      href={`/demo?template=${template.id}`}
                      className="bg-white text-dark-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary-500 hover:text-white"
                    >
                      Preview
                    </Link>
                    <Link
                      href={`/templates/${template.id}`}
                      className="bg-dark-800/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-dark-700"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button href="/templates" variant="outline" size="lg" animate>
            View All Templates
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default TemplatesSection;
