'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FaqAccordion = ({ faqs, initialOpenIndex = -1 }) => {
  const [openIndex, setOpenIndex] = useState(initialOpenIndex);
  
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <FaqItem
          key={faq.id}
          faq={faq}
          isOpen={openIndex === index}
          onClick={() => toggleFaq(index)}
        />
      ))}
    </div>
  );
};

const FaqItem = ({ faq, isOpen, onClick }) => {
  // Animation variants
  const contentVariants = {
    hidden: { 
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: 'easeInOut' },
        opacity: { duration: 0.2 }
      }
    },
    visible: { 
      height: 'auto',
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: 'easeInOut' },
        opacity: { duration: 0.2, delay: 0.1 }
      }
    }
  };
  
  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors text-left"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
        <motion.div
          animate={isOpen ? 'open' : 'closed'}
          variants={iconVariants}
          className="flex-shrink-0 ml-4 text-gray-500"
        >
          <FaChevronDown />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaqAccordion;
