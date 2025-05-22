'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import BackgroundEffect from '@/components/ui/BackgroundEffect';

const templates = [
  {
    id: 'business',
    name: 'Business Pro',
    description: 'Perfect for small businesses and professional services.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    category: 'Business',
    features: [
      'Professional design',
      'Service showcase',
      'Team profiles',
      'Contact form',
      'Testimonials section'
    ]
  },
  {
    id: 'restaurant',
    name: 'Culinary',
    description: 'Designed for restaurants, cafes, and food services.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'Restaurant',
    features: [
      'Menu display',
      'Reservation system',
      'Gallery',
      'Location map',
      'Opening hours'
    ]
  },
  {
    id: 'portfolio',
    name: 'Creative Portfolio',
    description: 'Showcase your work with this elegant portfolio template.',
    image: 'https://images.unsplash.com/photo-1545665277-5937489579f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'Portfolio',
    features: [
      'Project showcase',
      'Filterable gallery',
      'About section',
      'Skills display',
      'Contact form'
    ]
  },
  {
    id: 'ecommerce',
    name: 'Shop Modern',
    description: 'Start selling online with this e-commerce template.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'E-commerce',
    features: [
      'Product catalog',
      'Shopping cart',
      'Product details',
      'Categories',
      'Featured products'
    ]
  },
  {
    id: 'blog',
    name: 'Content Creator',
    description: 'Share your stories with this blog-focused template.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'Blog',
    features: [
      'Article layout',
      'Categories',
      'Author profiles',
      'Comments section',
      'Newsletter signup'
    ]
  },
  {
    id: 'landing',
    name: 'Product Launch',
    description: 'Perfect for product launches and marketing campaigns.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80',
    category: 'Landing Page',
    features: [
      'Hero section',
      'Feature highlights',
      'Pricing plans',
      'FAQ section',
      'Call-to-action'
    ]
  },
  {
    id: 'agency',
    name: 'Agency Pro',
    description: 'Showcase your agency services with this professional template.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'Business',
    features: [
      'Service showcase',
      'Case studies',
      'Team profiles',
      'Client logos',
      'Process explanation'
    ]
  },
  {
    id: 'fitness',
    name: 'Fitness Studio',
    description: 'Perfect for gyms, yoga studios, and personal trainers.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    category: 'Health',
    features: [
      'Class schedule',
      'Trainer profiles',
      'Membership plans',
      'Testimonials',
      'Contact information'
    ]
  },
  {
    id: 'realestate',
    name: 'Property Listings',
    description: 'Showcase properties with this real estate template.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80',
    category: 'Real Estate',
    features: [
      'Property listings',
      'Property details',
      'Agent profiles',
      'Search functionality',
      'Contact form'
    ]
  },
];

const categories = ['All', 'Business', 'Restaurant', 'Portfolio', 'E-commerce', 'Blog', 'Landing Page', 'Health', 'Real Estate'];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState(templates);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Filter templates based on category and search query
  useEffect(() => {
    const filtered = templates.filter(template => {
      const matchesCategory = activeCategory === 'All' || template.category === activeCategory;
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            template.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredTemplates(filtered);
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-dark-950">
      <BackgroundEffect type="mesh" className="opacity-30" />
      
      {/* Hero Section */}
      <Section className="py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient gradient-text-primary">Template</span> Library
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8 text-shadow">
            Browse our collection of professionally designed templates.
            All templates are free and open-sourced on GitHub.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full bg-dark-800/80 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-primary-500 shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            <Button variant="primary" size="md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              Sort by: Newest
            </Button>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow'
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                className="group relative overflow-hidden rounded-xl border border-gray-800 transition-all duration-300 hover:shadow-glow hover:border-primary-500 bg-dark-900/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setSelectedTemplate(template)}
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
                    <span className="inline-block bg-primary-500/80 text-white text-xs font-medium px-2.5 py-1 rounded mb-3 text-shadow">
                      {template.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2 text-shadow-lg">{template.name}</h3>
                    <p className="text-gray-100 text-sm mb-4 text-shadow">{template.description}</p>
                    
                    <div className="flex gap-3">
                      <Link
                        href={`/demo?template=${template.id}`}
                        className="bg-white text-dark-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary-500 hover:text-white shadow-md"
                      >
                        Preview
                      </Link>
                      <Link
                        href={`/templates/${template.id}`}
                        className="bg-dark-800/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-dark-700 text-shadow"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg mb-4">No templates found matching your criteria.</p>
              <Button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </Section>
      
      {/* CTA Section */}
      <Section className="bg-dark-900 py-16 relative">
        <BackgroundEffect type="aurora" intensity="low" />
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to create your <span className="text-gradient gradient-text-primary">website?</span>
          </h2>
          <p className="text-xl text-gray-100 mb-8 text-shadow">
            Choose a template and customize it with your brand in minutes.
            No coding required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/demo" size="lg" animate>
              Try Demo Now
            </Button>
            <Button href="/" variant="outline" size="lg" animate>
              Learn More
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
