'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDesktop, FaMobileAlt, FaTabletAlt, FaPencilAlt, FaImage, FaFont, FaPalette } from 'react-icons/fa';

const TemplatePreview = ({ selectedTemplate, businessInfo }) => {
  const [viewMode, setViewMode] = useState('desktop');
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState('text'); // text, image, font, color
  
  const templateColors = {
    1: {
      primary: '#3B82F6',
      secondary: '#60A5FA',
      accent: '#2563EB',
      text: '#1E3A8A',
      background: '#F0F9FF',
    },
    2: {
      primary: '#8B5CF6',
      secondary: '#A78BFA',
      accent: '#7C3AED',
      text: '#4C1D95',
      background: '#F5F3FF',
    },
    3: {
      primary: '#EC4899',
      secondary: '#F472B6',
      accent: '#DB2777',
      text: '#831843',
      background: '#FDF2F8',
    },
    4: {
      primary: '#10B981',
      secondary: '#34D399',
      accent: '#059669',
      text: '#064E3B',
      background: '#ECFDF5',
    },
  };
  
  const colors = selectedTemplate ? templateColors[selectedTemplate.id] : templateColors[1];
  
  const getContainerClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'w-[320px] h-[568px]';
      case 'tablet':
        return 'w-[768px] h-[1024px]';
      case 'desktop':
      default:
        return 'w-full max-w-4xl h-[600px]';
    }
  };
  
  return (
    <div className="w-full">
      {/* View mode toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-2 rounded-md ${
              viewMode === 'desktop' ? 'bg-gray-200' : 'bg-gray-100'
            }`}
            aria-label="Desktop view"
          >
            <FaDesktop className={viewMode === 'desktop' ? 'text-gray-800' : 'text-gray-400'} />
          </button>
          <button
            onClick={() => setViewMode('tablet')}
            className={`p-2 rounded-md ${
              viewMode === 'tablet' ? 'bg-gray-200' : 'bg-gray-100'
            }`}
            aria-label="Tablet view"
          >
            <FaTabletAlt className={viewMode === 'tablet' ? 'text-gray-800' : 'text-gray-400'} />
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-2 rounded-md ${
              viewMode === 'mobile' ? 'bg-gray-200' : 'bg-gray-100'
            }`}
            aria-label="Mobile view"
          >
            <FaMobileAlt className={viewMode === 'mobile' ? 'text-gray-800' : 'text-gray-400'} />
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setEditMode('text');
            }}
            className={`p-2 rounded-md ${
              isEditing && editMode === 'text' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'
            }`}
            aria-label="Edit text"
          >
            <FaPencilAlt />
          </button>
          <button
            onClick={() => {
              setIsEditing(true);
              setEditMode('image');
            }}
            className={`p-2 rounded-md ${
              isEditing && editMode === 'image' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'
            }`}
            aria-label="Edit images"
          >
            <FaImage />
          </button>
          <button
            onClick={() => {
              setIsEditing(true);
              setEditMode('font');
            }}
            className={`p-2 rounded-md ${
              isEditing && editMode === 'font' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'
            }`}
            aria-label="Edit fonts"
          >
            <FaFont />
          </button>
          <button
            onClick={() => {
              setIsEditing(true);
              setEditMode('color');
            }}
            className={`p-2 rounded-md ${
              isEditing && editMode === 'color' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'
            }`}
            aria-label="Edit colors"
          >
            <FaPalette />
          </button>
        </div>
      </div>
      
      {/* Template preview */}
      <div className="flex justify-center">
        <div className={`${getContainerClass()} bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 transition-all duration-300`}>
          {/* Browser chrome for desktop view */}
          {viewMode === 'desktop' && (
            <div className="h-8 bg-gray-200 flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-auto bg-white rounded-md px-4 py-1 text-xs text-gray-500">
                {businessInfo?.domain || 'yourbusiness.instantweb.ai'}
              </div>
            </div>
          )}
          
          {/* Website content */}
          <div 
            className="h-full overflow-y-auto"
            style={{ backgroundColor: colors.background }}
          >
            {/* Header */}
            <header 
              className="sticky top-0 z-10 w-full p-4 flex justify-between items-center"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              <div className="flex items-center space-x-3">
                {businessInfo?.logo ? (
                  <img 
                    src={businessInfo.logo} 
                    alt={`${businessInfo.name} logo`} 
                    className="w-10 h-10 rounded-md object-contain bg-white p-1"
                  />
                ) : (
                  <div 
                    className="w-10 h-10 rounded-md flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: colors.accent }}
                  >
                    {businessInfo?.name?.charAt(0) || 'B'}
                  </div>
                )}
                <h1 className="text-lg font-bold">{businessInfo?.name || 'Your Business'}</h1>
              </div>
              
              <nav className="hidden md:flex space-x-6">
                {['Home', 'About', 'Services', 'Contact'].map((item) => (
                  <a key={item} href="#" className="hover:underline">
                    {item}
                  </a>
                ))}
              </nav>
              
              <button className="md:hidden text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </header>
            
            {/* Hero section */}
            <section 
              className="relative py-16 px-4 text-center"
              style={{ backgroundColor: colors.secondary, color: 'white' }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to {businessInfo?.name || 'Your Business'}</h2>
              <p className="text-lg max-w-2xl mx-auto mb-8">
                {businessInfo?.description || 'We provide high-quality services to meet all your needs. Discover how we can help you today.'}
              </p>
              <button 
                className="px-6 py-3 rounded-md font-medium text-white"
                style={{ backgroundColor: colors.accent }}
              >
                Get Started
              </button>
            </section>
            
            {/* Features section */}
            <section className="py-16 px-4">
              <h2 
                className="text-2xl md:text-3xl font-bold mb-12 text-center"
                style={{ color: colors.text }}
              >
                Our Services
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  { title: 'Service 1', description: 'Description of your amazing service.' },
                  { title: 'Service 2', description: 'Description of your amazing service.' },
                  { title: 'Service 3', description: 'Description of your amazing service.' },
                ].map((service, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <div 
                      className="w-12 h-12 rounded-full mb-4 flex items-center justify-center"
                      style={{ backgroundColor: colors.primary, color: 'white' }}
                    >
                      {index + 1}
                    </div>
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{ color: colors.text }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* CTA section */}
            <section 
              className="py-16 px-4 text-center"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-lg max-w-2xl mx-auto mb-8">
                Contact us today to learn more about our services and how we can help you.
              </p>
              <button 
                className="px-6 py-3 rounded-md font-medium text-white"
                style={{ backgroundColor: colors.accent }}
              >
                Contact Us
              </button>
            </section>
            
            {/* Footer */}
            <footer className="py-8 px-4 bg-gray-800 text-white">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">{businessInfo?.name || 'Your Business'}</h3>
                  <p className="text-gray-300">
                    {businessInfo?.description || 'A short description of your business and what you do.'}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    {['Home', 'About', 'Services', 'Contact'].map((item) => (
                      <li key={item}>
                        <a href="#" className="text-gray-300 hover:text-white">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Contact</h3>
                  <address className="text-gray-300 not-italic">
                    <p>123 Main Street</p>
                    <p>City, State 12345</p>
                    <p>Email: info@yourbusiness.com</p>
                    <p>Phone: (123) 456-7890</p>
                  </address>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                      <a key={social} href="#" className="text-gray-300 hover:text-white">
                        {social.charAt(0)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} {businessInfo?.name || 'Your Business'}. All rights reserved.</p>
                <p className="text-sm mt-2">Powered by instantWebsiteAi</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
      
      {/* Editing panel */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-200"
        >
          <h3 className="text-lg font-bold mb-4">
            {editMode === 'text' && 'Edit Text'}
            {editMode === 'image' && 'Edit Images'}
            {editMode === 'font' && 'Edit Fonts'}
            {editMode === 'color' && 'Edit Colors'}
          </h3>
          
          {editMode === 'text' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={businessInfo?.name || 'Your Business'}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  value={businessInfo?.description || 'We provide high-quality services to meet all your needs. Discover how we can help you today.'}
                  readOnly
                ></textarea>
              </div>
              <p className="text-sm text-gray-500">
                In the full version, you would be able to edit all text content on your website.
              </p>
            </div>
          )}
          
          {editMode === 'image' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                    {businessInfo?.logo ? (
                      <img 
                        src={businessInfo.logo} 
                        alt="Logo" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400">Logo</span>
                    )}
                  </div>
                  <button className="px-4 py-2 bg-gray-100 rounded-md text-gray-700">
                    Change Logo
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                In the full version, you would be able to upload and manage all images on your website.
              </p>
            </div>
          )}
          
          {editMode === 'font' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heading Font</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Poppins</option>
                  <option>Roboto</option>
                  <option>Open Sans</option>
                  <option>Montserrat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Body Font</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Inter</option>
                  <option>Roboto</option>
                  <option>Open Sans</option>
                  <option>Lato</option>
                </select>
              </div>
              <p className="text-sm text-gray-500">
                In the full version, you would be able to customize all fonts and typography on your website.
              </p>
            </div>
          )}
          
          {editMode === 'color' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(colors).map(([name, color]) => (
                  <div key={name} className="text-center">
                    <div 
                      className="w-full h-12 rounded-md mb-2"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-sm text-gray-700 capitalize">{name}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                In the full version, you would be able to customize all colors on your website.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default TemplatePreview;
