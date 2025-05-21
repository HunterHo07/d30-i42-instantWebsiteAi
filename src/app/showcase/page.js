'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaSearch, FaExternalLinkAlt } from 'react-icons/fa';

export default function ShowcasePage() {
  const [filter, setFilter] = useState('all');
  
  const showcaseItems = [
    {
      id: 1,
      title: 'Coastal Cafe',
      category: 'restaurant',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      description: 'A beachside cafe with a modern, minimalist design.',
      link: '#',
    },
    {
      id: 2,
      title: 'Mountain Retreat',
      category: 'travel',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      description: 'A luxury mountain resort with stunning views.',
      link: '#',
    },
    {
      id: 3,
      title: 'Tech Solutions',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      description: 'A modern IT consulting firm specializing in cloud solutions.',
      link: '#',
    },
    {
      id: 4,
      title: 'Fitness First',
      category: 'fitness',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      description: 'A state-of-the-art fitness center with personal training.',
      link: '#',
    },
    {
      id: 5,
      title: 'Green Thumb',
      category: 'retail',
      image: 'https://images.unsplash.com/photo-1558350315-8aa00e8e4590?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnQlMjBzaG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      description: 'A boutique plant shop with a wide variety of indoor plants.',
      link: '#',
    },
    {
      id: 6,
      title: 'Legal Eagles',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGF3fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      description: 'A professional law firm specializing in corporate law.',
      link: '#',
    },
  ];
  
  const filteredItems = filter === 'all' 
    ? showcaseItems 
    : showcaseItems.filter(item => item.category === filter);
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'business', name: 'Business' },
    { id: 'restaurant', name: 'Restaurant' },
    { id: 'retail', name: 'Retail' },
    { id: 'travel', name: 'Travel' },
    { id: 'fitness', name: 'Fitness' },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Website Showcase
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Explore websites created with instantWebsiteAi
          </p>
          
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search showcase..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          {/* Showcase Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-2 py-1">
                    {categories.find(cat => cat.id === item.category)?.name}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <a
                    href={item.link}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700"
                  >
                    Visit Website <FaExternalLinkAlt className="ml-2" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to create your own website?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of businesses who have simplified their web presence with instantWebsiteAi.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
            >
              Try It Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
