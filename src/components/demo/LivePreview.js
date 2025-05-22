'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Template data with different layouts
const templateData = {
  business: {
    name: 'Business Pro',
    sections: [
      {
        type: 'hero',
        title: 'Professional Solutions for Your Business',
        subtitle: 'We help businesses grow and achieve their goals with our expert services.',
        cta: 'Get Started',
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
      },
      {
        type: 'features',
        title: 'Our Services',
        items: [
          {
            title: 'Business Consulting',
            description: 'Expert advice to help your business grow.',
            icon: 'chart',
          },
          {
            title: 'Financial Planning',
            description: 'Strategic financial guidance for your company.',
            icon: 'money',
          },
          {
            title: 'Marketing Strategy',
            description: 'Effective marketing solutions to reach your audience.',
            icon: 'target',
          },
        ],
      },
      {
        type: 'about',
        title: 'About Us',
        description: 'We are a team of experienced professionals dedicated to helping businesses succeed. With our expertise and commitment to excellence, we deliver results that exceed expectations.',
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
    ],
  },
  restaurant: {
    name: 'Culinary',
    sections: [
      {
        type: 'hero',
        title: 'Experience Fine Dining',
        subtitle: 'Delicious cuisine made with fresh, locally-sourced ingredients.',
        cta: 'View Menu',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
      {
        type: 'menu',
        title: 'Our Menu',
        categories: [
          {
            name: 'Appetizers',
            items: [
              { name: 'Bruschetta', price: '$8.99' },
              { name: 'Calamari', price: '$12.99' },
            ],
          },
          {
            name: 'Main Courses',
            items: [
              { name: 'Pasta Carbonara', price: '$16.99' },
              { name: 'Grilled Salmon', price: '$22.99' },
            ],
          },
        ],
      },
      {
        type: 'testimonials',
        title: 'What Our Customers Say',
        quotes: [
          {
            text: 'The best dining experience I\'ve had in years!',
            author: 'Jane Smith',
          },
          {
            text: 'Exceptional food and service. Highly recommended!',
            author: 'John Davis',
          },
        ],
      },
    ],
  },
  portfolio: {
    name: 'Creative Portfolio',
    sections: [
      {
        type: 'hero',
        title: 'Creative Design Portfolio',
        subtitle: 'Showcasing my work and creative projects.',
        cta: 'View Projects',
        image: 'https://images.unsplash.com/photo-1545665277-5937489579f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
      {
        type: 'gallery',
        title: 'My Work',
        projects: [
          {
            title: 'Brand Identity',
            category: 'Branding',
            image: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          },
          {
            title: 'Website Redesign',
            category: 'Web Design',
            image: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
          },
          {
            title: 'Mobile App UI',
            category: 'UI/UX',
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
          },
        ],
      },
      {
        type: 'contact',
        title: 'Get In Touch',
        email: 'hello@example.com',
        phone: '+1 (555) 123-4567',
        social: ['instagram', 'dribbble', 'linkedin'],
      },
    ],
  },
  ecommerce: {
    name: 'Shop Modern',
    sections: [
      {
        type: 'hero',
        title: 'Modern Fashion Store',
        subtitle: 'Discover the latest trends in fashion.',
        cta: 'Shop Now',
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
      {
        type: 'products',
        title: 'Featured Products',
        items: [
          {
            name: 'Classic T-Shirt',
            price: '$29.99',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
          },
          {
            name: 'Denim Jacket',
            price: '$89.99',
            image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          },
          {
            name: 'Leather Bag',
            price: '$129.99',
            image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
          },
        ],
      },
      {
        type: 'categories',
        title: 'Shop by Category',
        categories: [
          { name: 'Men', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80' },
          { name: 'Women', image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
          { name: 'Accessories', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80' },
        ],
      },
    ],
  },
  blog: {
    name: 'Content Creator',
    sections: [
      {
        type: 'hero',
        title: 'Thoughts & Ideas',
        subtitle: 'A blog about creativity, technology, and life.',
        cta: 'Read Latest',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
      {
        type: 'posts',
        title: 'Latest Articles',
        posts: [
          {
            title: 'The Future of Web Design',
            excerpt: 'Exploring the latest trends and technologies in web design.',
            date: 'May 15, 2023',
            image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          },
          {
            title: 'Productivity Tips for Creatives',
            excerpt: 'How to stay productive and creative in a busy world.',
            date: 'April 28, 2023',
            image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          },
          {
            title: 'The Art of Storytelling',
            excerpt: 'Why storytelling matters in content creation.',
            date: 'April 10, 2023',
            image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80',
          },
        ],
      },
      {
        type: 'newsletter',
        title: 'Subscribe to My Newsletter',
        description: 'Get the latest articles and updates delivered to your inbox.',
        buttonText: 'Subscribe',
      },
    ],
  },
  landing: {
    name: 'Product Launch',
    sections: [
      {
        type: 'hero',
        title: 'Introducing Our New Product',
        subtitle: "The revolutionary solution you have been waiting for.",
        cta: 'Pre-order Now',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80',
      },
      {
        type: 'features',
        title: 'Key Features',
        items: [
          {
            title: 'Innovative Design',
            description: 'Sleek, modern design that stands out.',
            icon: 'design',
          },
          {
            title: 'Powerful Performance',
            description: 'Cutting-edge technology for optimal performance.',
            icon: 'performance',
          },
          {
            title: 'User-Friendly',
            description: 'Intuitive interface for seamless user experience.',
            icon: 'user',
          },
        ],
      },
      {
        type: 'pricing',
        title: 'Pricing Plans',
        plans: [
          {
            name: 'Basic',
            price: '$49',
            features: ['Feature 1', 'Feature 2', 'Feature 3'],
            cta: 'Get Started',
          },
          {
            name: 'Pro',
            price: '$99',
            features: ['All Basic features', 'Feature 4', 'Feature 5', 'Feature 6'],
            cta: 'Buy Now',
            popular: true,
          },
        ],
      },
    ],
  },
};

const LivePreview = ({
  template,
  businessName,
  logoUrl,
  customizations,
  viewMode,
  isLoading
}) => {
  const [currentTemplate, setCurrentTemplate] = useState(null);

  useEffect(() => {
    // Set the current template data
    setCurrentTemplate(templateData[template]);
  }, [template]);

  if (isLoading) {
    return (
      <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-2 border-primary-500 border-r-2 border-b-2 border-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading template preview...</p>
        </div>
      </div>
    );
  }

  if (!currentTemplate) {
    return (
      <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4 h-full flex items-center justify-center">
        <p className="text-gray-400">Template not found</p>
      </div>
    );
  }

  return (
    <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{currentTemplate.name} Preview</h2>
        <div className="flex items-center space-x-2">
          <button className="text-primary-500 hover:text-primary-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </button>
          <button className="text-primary-500 hover:text-primary-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Preview Container */}
      <div
        className={`relative bg-white rounded-lg overflow-hidden transition-all duration-300 mx-auto ${
          viewMode === 'mobile' ? 'max-w-[375px] h-[667px]' : 'w-full aspect-[16/9]'
        }`}
      >
        <div className="bg-gray-800 p-2 flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-grow text-center">
            <span className="text-xs text-gray-400">{businessName}.instantweb.ai</span>
          </div>
        </div>

        <div className="h-full overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={template}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {/* Template Preview Content */}
              <div className="relative">
                {/* Hero Section */}
                {currentTemplate.sections.map((section, index) => {
                  if (section.type === 'hero') {
                    return (
                      <div key={`${section.type}-${index}`} className="relative">
                        <div className="relative aspect-[16/9] w-full">
                          <Image
                            src={section.image}
                            alt={section.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                            {logoUrl && (
                              <div className="relative w-16 h-16 mb-4 bg-white rounded-full p-2">
                                <Image
                                  src={logoUrl}
                                  alt={businessName}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            )}
                            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{section.title.replace('Our', businessName)}</h1>
                            <p className="text-gray-200 mb-6 max-w-xl">{section.subtitle}</p>
                            <button
                              className="px-6 py-2 rounded-lg font-medium"
                              style={{ backgroundColor: customizations.colors.primary, color: 'white' }}
                            >
                              {section.cta}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Other section types would be rendered here
                  return null;
                })}

                {/* Additional sections would be rendered based on template type */}
                <div className="p-6 text-center text-gray-500">
                  <p>Additional sections would be displayed here based on the selected template.</p>
                  <p className="mt-2">Customize colors, fonts, and layout using the panel on the right.</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
