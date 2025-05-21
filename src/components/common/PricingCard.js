'use client';

import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Button from './Button';
import { formatPrice } from '@/lib/pricing';

const PricingCard = ({
  plan,
  isAnnual = true,
  className = '',
  ...props
}) => {
  const {
    name,
    description,
    price,
    setupFee,
    oneTime,
    startingAt,
    features,
    limitations,
    cta,
    ctaLink,
    popular,
  } = plan;
  
  // Common classes
  const commonClasses = `
    rounded-2xl overflow-hidden border
    ${popular ? 'border-primary-500 shadow-xl relative' : 'border-gray-200 shadow-md'}
    ${className}
  `;
  
  // Animation variants
  const cardVariants = {
    hover: {
      y: -5,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <motion.div
      whileHover="hover"
      variants={cardVariants}
      className={commonClasses}
      {...props}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          MOST POPULAR
        </div>
      )}
      
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="mb-6">
          <div className="flex items-end">
            {startingAt && (
              <span className="text-gray-500 mr-1">From</span>
            )}
            <span className="text-4xl font-bold text-gray-900">
              {formatPrice(oneTime ? price.monthly : (isAnnual ? price.annual : price.monthly))}
            </span>
            {!oneTime && (
              <span className="text-gray-600 ml-2 pb-1">
                {isAnnual ? '/year' : '/month'}
              </span>
            )}
            {oneTime && (
              <span className="text-gray-600 ml-2 pb-1">one-time</span>
            )}
          </div>
          
          {setupFee > 0 && (
            <div className="text-sm text-gray-600 mt-1">
              + {formatPrice(setupFee)} one-time setup
            </div>
          )}
        </div>
        
        {features && features.length > 0 && (
          <div className="mb-6">
            <p className="font-medium text-gray-700 mb-2">What's included:</p>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <FaCheck className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {limitations && limitations.length > 0 && (
          <div className="mb-6">
            <p className="font-medium text-gray-700 mb-2">Limitations:</p>
            <ul className="space-y-2">
              {limitations.map((limitation, i) => (
                <li key={i} className="flex items-start">
                  <FaTimes className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-500">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <Button
          href={ctaLink}
          variant={popular ? 'primary' : 'secondary'}
          fullWidth
          className="mt-4"
        >
          {cta}
        </Button>
      </div>
    </motion.div>
  );
};

// Pricing toggle component
export const PricingToggle = ({ isAnnual, onChange }) => {
  return (
    <div className="flex items-center justify-center">
      <span className={`text-sm ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
        Monthly
      </span>
      <button
        onClick={() => onChange(!isAnnual)}
        className="relative mx-4 w-14 h-7 bg-gray-200 rounded-full p-1 transition duration-300 focus:outline-none"
      >
        <div
          className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isAnnual ? 'translate-x-7' : 'translate-x-0'
          }`}
        ></div>
      </button>
      <span className={`text-sm ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
        Annual <span className="text-primary-600 font-medium ml-1">Save 35%</span>
      </span>
    </div>
  );
};

// Pricing grid component
export const PricingGrid = ({ plans, isAnnual = true }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <PricingCard
          key={plan.name}
          plan={plan}
          isAnnual={isAnnual}
        />
      ))}
    </div>
  );
};

// Domain option card component
export const DomainOptionCard = ({ option }) => {
  const {
    name,
    description,
    price,
    perYear,
    example,
    features,
  } = option;
  
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <h4 className="text-xl font-bold mb-4">{name}</h4>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="mb-6">
        <span className="text-2xl font-bold text-gray-900">{formatPrice(price)}</span>
        {perYear && <span className="text-gray-600 ml-1">/year</span>}
      </div>
      
      {example && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">Example:</p>
          <p className="font-mono text-primary-600">{example}</p>
        </div>
      )}
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <FaCheck className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button
        href="/demo"
        variant="secondary"
        fullWidth
      >
        Select
      </Button>
    </div>
  );
};

export default PricingCard;
