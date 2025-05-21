'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCheck, FaClock, FaRocket } from 'react-icons/fa';

export default function RoadmapPage() {
  const phases = [
    {
      id: 'mvp',
      title: 'MVP (Current)',
      status: 'active',
      description: 'The initial release of instantWebsiteAi with core functionality.',
      features: [
        { name: 'Template preview system', completed: true },
        { name: 'Hosting with subdomain', completed: true },
        { name: 'Admin panel for editing', completed: true },
        { name: 'Template library', completed: true },
        { name: '7-day request system', completed: true },
      ],
    },
    {
      id: 'phase1',
      title: 'Phase 1',
      status: 'upcoming',
      description: 'Enhancing the user experience with additional features.',
      features: [
        { name: 'Multi-site user dashboard', completed: false },
        { name: 'Basic analytics (visits, edits)', completed: false },
        { name: 'Access control (public/private)', completed: false },
        { name: 'User accounts and authentication', completed: false },
        { name: 'Improved template selection', completed: false },
      ],
    },
    {
      id: 'phase2',
      title: 'Phase 2',
      status: 'planned',
      description: 'Adding advanced editing capabilities for more customization.',
      features: [
        { name: 'Drag-and-drop editor', completed: false },
        { name: 'Team collaboration support', completed: false },
        { name: 'Advanced image editing', completed: false },
        { name: 'Custom CSS options', completed: false },
        { name: 'Mobile app for management', completed: false },
      ],
    },
    {
      id: 'phase3',
      title: 'Phase 3',
      status: 'planned',
      description: 'Integrating content management capabilities.',
      features: [
        { name: 'Full CMS integration', completed: false },
        { name: 'Marketplace of premium templates', completed: false },
        { name: 'Blog functionality', completed: false },
        { name: 'E-commerce capabilities', completed: false },
        { name: 'SEO optimization tools', completed: false },
      ],
    },
    {
      id: 'phase4',
      title: 'Phase 4',
      status: 'planned',
      description: 'Expanding the ecosystem with plugins and AI features.',
      features: [
        { name: 'Plugin ecosystem', completed: false },
        { name: 'AI-powered content population', completed: false },
        { name: 'White-label plans for resellers', completed: false },
        { name: 'API for third-party integrations', completed: false },
        { name: 'Advanced analytics and reporting', completed: false },
      ],
    },
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
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Product Roadmap
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Our vision and development plan for instantWebsiteAi
          </p>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform md:-translate-x-1/2"></div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  variants={itemVariants}
                  className={`mb-12 md:mb-24 flex flex-col md:flex-row ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center z-20">
                    {phase.status === 'active' ? (
                      <div className="w-full h-full rounded-full bg-primary-500 animate-pulse"></div>
                    ) : phase.status === 'completed' ? (
                      <div className="w-full h-full rounded-full bg-green-500"></div>
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-300"></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 1 ? 'md:pr-12' : 'md:pl-12'
                  }`}>
                    <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
                      phase.status === 'active' 
                        ? 'border-primary-500' 
                        : phase.status === 'completed'
                          ? 'border-green-500'
                          : 'border-gray-300'
                    }`}>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                        phase.status === 'active' 
                          ? 'bg-primary-100 text-primary-800' 
                          : phase.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {phase.status === 'active' 
                          ? 'Current' 
                          : phase.status === 'completed'
                            ? 'Completed'
                            : 'Upcoming'}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                      <p className="text-gray-600 mb-4">{phase.description}</p>
                      
                      <ul className="space-y-2">
                        {phase.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            {feature.completed ? (
                              <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            ) : (
                              <FaClock className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                            )}
                            <span className={feature.completed ? 'text-gray-900' : 'text-gray-600'}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gradient-to-r from-primary-500 to-secondary-600 rounded-xl shadow-lg p-8 text-white mt-12"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-bold mb-4">Help Shape Our Future</h2>
                <p className="text-lg">
                  We're constantly improving instantWebsiteAi based on user feedback. Have a feature request or suggestion? We'd love to hear from you!
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <Link
                  href="/demo"
                  className="inline-flex items-center px-6 py-3 border border-white rounded-md shadow-sm text-base font-medium text-primary-600 bg-white hover:bg-gray-100"
                >
                  <FaRocket className="mr-2" />
                  Try the Demo
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
