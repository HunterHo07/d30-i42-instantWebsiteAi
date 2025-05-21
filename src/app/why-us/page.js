'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCheck, FaRocket, FaClock, FaMoneyBillWave, FaTools } from 'react-icons/fa';

export default function WhyUsPage() {
  const reasons = [
    {
      icon: <FaRocket className="text-primary-500 text-3xl" />,
      title: 'Instant Website Generation',
      description: 'Get a fully functional website in seconds, not days or weeks. Just enter your business name and logo, and we'll do the rest.',
    },
    {
      icon: <FaClock className="text-primary-500 text-3xl" />,
      title: 'No Learning Curve',
      description: 'No need to learn complex website builders or coding. Our platform is designed to be intuitive and easy to use for everyone.',
    },
    {
      icon: <FaMoneyBillWave className="text-primary-500 text-3xl" />,
      title: 'Affordable Pricing',
      description: 'Get a professional website at a fraction of the cost of traditional web development or other website builders.',
    },
    {
      icon: <FaTools className="text-primary-500 text-3xl" />,
      title: 'Simple Customization',
      description: 'Easily customize your website through our simple admin panel. No coding or design skills required.',
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
            Why Choose instantWebsiteAi?
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            We're revolutionizing how websites are created
          </p>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
              >
                <div className="mb-4">{reason.icon}</div>
                <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">How We Compare</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">instantWebsiteAi</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Traditional Web Developers</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DIY Website Builders</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Time to Launch</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Seconds</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Weeks to Months</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Hours to Days</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Technical Skills Required</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">None</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">High</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Medium</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cost</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$9-19/year</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,000-10,000+</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$120-300/year</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Maintenance</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Included</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Additional Cost</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">DIY</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Design Quality</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Professional</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Custom</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Template-Based</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gradient-to-r from-primary-500 to-secondary-600 rounded-xl shadow-lg p-8 text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6">
              Experience the fastest way to create a professional website for your business.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center px-6 py-3 border border-white rounded-md shadow-sm text-base font-medium text-primary-600 bg-white hover:bg-gray-100"
            >
              Try the Demo
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
