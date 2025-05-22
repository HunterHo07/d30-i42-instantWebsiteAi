'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const pricingPlans = [
  {
    name: 'Free',
    description: 'Perfect for trying out the platform',
    price: '0',
    period: 'forever',
    features: [
      'Browse templates',
      'Generate live preview',
      'Download static HTML',
      'No login required',
    ],
    cta: 'Start Free',
    ctaLink: '/demo',
    popular: false,
  },
  {
    name: 'Launch Plan',
    description: 'Everything you need to launch your site',
    price: '14',
    period: 'one-time setup',
    renewal: '$9/year for continued hosting',
    features: [
      'Host on yourname.instantweb.ai',
      '7-day unlimited design tweaks',
      'Live deployment handled by us',
      'Simple admin dashboard',
      'SSL certificate included',
    ],
    cta: 'Get Started',
    ctaLink: '/demo?plan=launch',
    popular: true,
  },
  {
    name: 'Pro Design',
    description: 'Custom design based on your needs',
    price: '89',
    period: 'one-time',
    features: [
      'Everything in Launch Plan',
      'Custom layout or visual polish',
      'Premium template selection',
      'Priority support',
      'Expedited delivery',
    ],
    cta: 'Contact Us',
    ctaLink: '/contact',
    popular: false,
  },
];

const PricingSection = () => {
  const sectionRef = useRef(null);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from('.pricing-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.pricing-title',
          start: 'top 80%',
        },
      });

      // Animate pricing cards
      gsap.from('.pricing-card', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.pricing-grid',
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      id="pricing"
      className="bg-dark-950 relative"
      ref={sectionRef}
    >
      <div className="relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="pricing-title text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gradient gradient-text-primary">Simple</span> Pricing
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transparent pricing with no hidden fees. Choose the plan that works best for you.
          </motion.p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 ${!isYearly ? 'text-white font-medium' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              className="relative w-14 h-7 bg-dark-800 rounded-full p-1 transition-colors duration-300 focus:outline-none"
              onClick={() => setIsYearly(!isYearly)}
            >
              <div
                className={`absolute w-5 h-5 bg-primary-500 rounded-full shadow-md transform transition-transform duration-300 ${
                  isYearly ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`ml-3 ${isYearly ? 'text-white font-medium' : 'text-gray-400'}`}>
              Yearly <span className="text-primary-500 text-xs font-medium ml-1">Save 20%</span>
            </span>
          </div>
        </div>
        
        <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`pricing-card relative rounded-xl overflow-hidden ${
                plan.popular
                  ? 'border-2 border-primary-500 transform md:-translate-y-4'
                  : 'border border-gray-800'
              } bg-dark-900/50 backdrop-blur-sm transition-all duration-300 hover:shadow-glow`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                  {plan.renewal && (
                    <p className="text-sm text-gray-400 mt-1">{plan.renewal}</p>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary-500 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  href={plan.ctaLink}
                  variant={plan.popular ? 'primary' : 'outline'}
                  fullWidth
                  animate
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Add-on Services */}
        <div className="mt-16 bg-dark-800/50 backdrop-blur-sm rounded-xl border border-gray-800 p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">
            <span className="text-gradient gradient-text-secondary">"Done For You"</span> Change Plans
          </h3>
          <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
            Let us handle the edits — no drag-and-drop, no messy builders. Just tell us what you want changed, 
            and our Human + AI team will take care of it.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-dark-900/50 rounded-lg p-6 border border-gray-800 transition-all duration-300 hover:shadow-glow-purple hover:border-secondary-500">
              <div className="text-center mb-4">
                <span className="text-xl font-bold">Starter Support</span>
                <div className="mt-2">
                  <span className="text-2xl font-bold">$5</span>
                  <span className="text-gray-400 ml-1">/day</span>
                </div>
              </div>
              <p className="text-gray-400 text-center mb-4">
                Perfect for urgent tweaks or launch-day polish.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">1-day access to unlimited minor edit requests</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">Text changes, image swaps, color tweaks</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">12-24 hour turnaround</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-dark-900/50 rounded-lg p-6 border-2 border-secondary-500 shadow-glow-purple transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <div className="text-center mb-4">
                <span className="text-xl font-bold">Flex Week</span>
                <div className="mt-2">
                  <span className="text-2xl font-bold">$19</span>
                  <span className="text-gray-400 ml-1">/week</span>
                </div>
              </div>
              <p className="text-gray-400 text-center mb-4">
                For when you want more flexibility and hands-off editing.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">Unlimited reasonable change requests for 7 days</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">Text and image updates, layout modifications</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">Ideal for launch prep or feedback loops</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-dark-900/50 rounded-lg p-6 border border-gray-800 transition-all duration-300 hover:shadow-glow-purple hover:border-secondary-500">
              <div className="text-center mb-4">
                <span className="text-xl font-bold">Monthly Partner</span>
                <div className="mt-2">
                  <span className="text-2xl font-bold">$39</span>
                  <span className="text-gray-400 ml-1">/month</span>
                </div>
              </div>
              <p className="text-gray-400 text-center mb-4">
                Hands-off peace of mind for ongoing updates.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">Ongoing change support (up to 5 active requests)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">Priority turnaround (same or next business day)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-secondary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">Ideal for freelancers and small businesses</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default PricingSection;
