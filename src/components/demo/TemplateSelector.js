'use client';

import { useState } from 'react';
import Image from 'next/image';

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

const TemplateSelector = ({ selectedTemplate, onTemplateChange }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter templates based on category and search query
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = activeCategory === 'All' || template.category === activeCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4">
      <h2 className="text-xl font-bold mb-4">Templates</h2>
      
      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search templates..."
          className="w-full bg-dark-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
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
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-primary-500 text-white'
                : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Templates List */}
      <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`group cursor-pointer rounded-lg overflow-hidden border transition-all duration-300 ${
                selectedTemplate === template.id
                  ? 'border-primary-500 shadow-glow'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
              onClick={() => onTemplateChange(template.id)}
            >
              <div className="relative aspect-video">
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-70"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="inline-block bg-primary-500/80 text-white text-xs font-medium px-2 py-0.5 rounded mb-1">
                    {template.category}
                  </span>
                  <h3 className="text-sm font-bold text-white">{template.name}</h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No templates found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelector;
