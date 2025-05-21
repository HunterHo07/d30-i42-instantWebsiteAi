'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for trying out the platform',
      price: {
        monthly: 0,
        annual: 0,
      },
      features: [
        'Browse and preview templates',
        'Generate instant website preview',
        'Download static HTML',
        'No signup required',
      ],
      cta: 'Start Free',
      popular: false,
      ctaLink: '/demo',
    },
    {
      name: 'Launch',
      description: 'Everything you need to launch your site',
      price: {
        monthly: 14,
        annual: 9,
      },
      setupFee: 14,
      features: [
        'All Free features',
        'Hosting on yourname.instantweb.ai',
        '7-day unlimited edit requests',
        'Basic analytics',
        'Email support',
      ],
      cta: 'Get Started',
      popular: true,
      ctaLink: '/demo',
    },
    {
      name: 'Pro Design',
      description: 'Custom design tweaks and branding',
      price: {
        monthly: 89,
        annual: 89,
      },
      oneTime: true,
      features: [
        'All Launch features',
        'Custom layout and design tweaks',
        'Color scheme customization',
        'Typography adjustments',
        'Priority support',
      ],
      cta: 'Upgrade',
      popular: false,
      ctaLink: '/demo',
    },
  ];

  // Animation variants
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
    <section id="pricing" className="section bg-white py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">
            Choose the plan that works best for you. No hidden fees, no surprises.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center mt-8">
            <span className={`text-sm ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
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
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={`rounded-2xl overflow-hidden border ${
                plan.popular
                  ? 'border-primary-500 shadow-xl relative'
                  : 'border-gray-200 shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.oneTime ? plan.price.monthly : (isAnnual ? plan.price.annual : plan.price.monthly)}
                    </span>
                    {!plan.oneTime && (
                      <span className="text-gray-600 ml-2 pb-1">
                        {isAnnual ? '/year' : '/month'}
                      </span>
                    )}
                    {plan.oneTime && (
                      <span className="text-gray-600 ml-2 pb-1">one-time</span>
                    )}
                  </div>
                  {plan.setupFee && (
                    <div className="text-sm text-gray-600 mt-1">
                      + ${plan.setupFee} one-time setup
                    </div>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheck className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.ctaLink}
                  className={`w-full text-center py-3 rounded-lg font-medium transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-600 text-white hover:shadow-lg'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Custom domain options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Custom Domain Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h4 className="text-xl font-bold mb-4">We Manage Your Domain</h4>
              <p className="text-gray-600 mb-4">We purchase and manage your domain (e.g., yourbiz.com)</p>
              <div className="mb-6">
                <span className="text-2xl font-bold text-gray-900">$19</span>
                <span className="text-gray-600 ml-1">/year</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <FaCheck className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">We purchase the domain for you</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Automatic renewal handling</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">DNS management included</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Recommended for non-technical users</span>
                </li>
              </ul>
              <a
                href="/demo"
                className="w-full text-center py-3 rounded-lg font-medium transition-all bg-gray-100 text-gray-800 hover:bg-gray-200 block"
              >
                Select
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h4 className="text-xl font-bold mb-4">You Provide Your Domain</h4>
              <p className="text-gray-600 mb-4">Point your existing domain to our servers</p>
              <div className="mb-6">
                <span className="text-2xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600 ml-1">/year</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <FaCheck className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Use your existing domain</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">We provide DNS instructions</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">You maintain full ownership</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Best for those who already have domains</span>
                </li>
              </ul>
              <a
                href="/demo"
                className="w-full text-center py-3 rounded-lg font-medium transition-all bg-gray-100 text-gray-800 hover:bg-gray-200 block"
              >
                Select
              </a>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Have questions about our pricing? Check out our{' '}
            <a href="#" className="text-primary-600 hover:underline">
              FAQ
            </a>{' '}
            or{' '}
            <a href="#" className="text-primary-600 hover:underline">
              contact us
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}


