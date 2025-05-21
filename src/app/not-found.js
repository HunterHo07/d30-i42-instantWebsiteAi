'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHome, FaArrowRight } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 relative">
              <h1 className="text-9xl font-bold text-gray-200">404</h1>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-primary-500 text-white p-4 rounded-full">
                  <FaArrowRight className="text-2xl" />
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Page Not Found
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
              >
                <FaHome className="mr-2" />
                Back to Home
              </Link>
              
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Try the Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
