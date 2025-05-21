'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PitchDeckPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Pitch Deck
            </h1>
            <p className="text-xl text-gray-600 text-center mb-12">
              Our vision for revolutionizing website creation
            </p>
            
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
              <p className="text-gray-600 mb-4">
                We're currently preparing our investor pitch deck. Check back soon for more information about our vision, market opportunity, and growth strategy.
              </p>
              <p className="text-gray-600">
                In the meantime, you can explore our demo to see how instantWebsiteAi works.
              </p>
              
              <div className="mt-8">
                <Link
                  href="/demo"
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
                >
                  Try the Demo
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
