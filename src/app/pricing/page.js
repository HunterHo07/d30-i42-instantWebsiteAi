'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import BackgroundEffect from '@/components/ui/BackgroundEffect';

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

const changePlans = [
  {
    name: 'Starter Support',
    price: '5',
    period: 'day',
    description: 'Perfect for urgent tweaks or launch-day polish.',
    features: [
      '1-day access to unlimited minor edit requests',
      'Text changes, image swaps, color tweaks',
      '12-24 hour turnaround',
    ],
    popular: false,
  },
  {
    name: 'Flex Week',
    price: '19',
    period: 'week',
    description: 'For when you want more flexibility and hands-off editing.',
    features: [
      'Unlimited reasonable change requests for 7 days',
      'Text and image updates, layout modifications',
      'Ideal for launch prep or feedback loops',
    ],
    popular: true,
  },
  {
    name: 'Monthly Partner',
    price: '39',
    period: 'month',
    description: 'Hands-off peace of mind for ongoing updates.',
    features: [
      'Ongoing change support (up to 5 active requests)',
      'Priority turnaround (same or next business day)',
      'Ideal for freelancers and small businesses',
    ],
    popular: false,
  },
];

const domainOptions = [
  {
    name: 'We Manage Your Domain',
    price: '19',
    period: 'year',
    description: 'We handle everything for you.',
    features: [
      'We register and manage your domain',
      'DNS configuration handled by us',
      'Automatic renewal management',
      'No technical knowledge required',
    ],
  },
  {
    name: 'You Own Your Domain',
    price: '0',
    period: 'additional',
    description: 'Use a domain you already own.',
    features: [
      'Point your existing domain to our servers',
      'Full ownership and control',
      'Detailed setup instructions provided',
      'Support available if needed',
    ],
  },
];

const faqs = [
  {
    question: 'How does the 7-day design request guarantee work?',
    answer: 'After you purchase the Launch Plan, you have 7 days to request unlimited design tweaks to your website. Our team will implement your requested changes until you're satisfied with the result. This ensures your website looks exactly how you want it before going live.',
  },
  {
    question: 'Can I switch templates after I've launched my site?',
    answer: 'Yes, you can switch templates at any time. If you're on the Launch Plan or higher, we'll help you transfer your content to the new template. For significant redesigns, we recommend the Pro Design add-on for the best results.',
  },
  {
    question: 'What happens after my 7-day design request period ends?',
    answer: 'After the initial 7-day period, you can still make changes to your site through our admin panel. For more extensive changes, you can purchase one of our "Done For You" change plans, starting at just $5/day for unlimited minor edits.',
  },
  {
    question: 'Do I need technical skills to use instantWebsiteAi?',
    answer: 'Not at all! Our platform is designed for non-technical users. Simply enter your business name, upload a logo, and we handle the rest. Our admin panel makes it easy to update content without any coding knowledge.',
  },
  {
    question: 'Can I download my website and host it elsewhere?',
    answer: 'Yes, our Free plan allows you to download the static HTML of your generated website. You can then host it on any web hosting service of your choice. However, you won't have access to our admin panel or "Done For You" services unless you're on a paid plan.',
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-dark-950">
      <BackgroundEffect type="gradient" className="opacity-50" />
      
      {/* Hero Section */}
      <Section className="py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient gradient-text-primary">Simple</span> Pricing
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8 text-shadow">
            Transparent pricing with no hidden fees. Choose the plan that works best for you.
          </p>
          
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
        
        {/* Main Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-xl overflow-hidden ${
                plan.popular
                  ? 'border-2 border-primary-500 transform md:-translate-y-4 shadow-glow'
                  : 'border border-gray-800'
              } bg-dark-900/50 backdrop-blur-sm transition-all duration-300 hover:shadow-glow`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
        
        {/* "Done For You" Change Plans */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-gradient gradient-text-secondary">"Done For You"</span> Change Plans
            </h2>
            <p className="text-gray-100 max-w-3xl mx-auto text-shadow">
              Let us handle the edits — no drag-and-drop, no messy builders. Just tell us what you want changed, 
              and our Human + AI team will take care of it.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {changePlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`bg-dark-900/50 rounded-lg p-6 ${
                  plan.popular
                    ? 'border-2 border-secondary-500 shadow-glow-purple transform md:-translate-y-4'
                    : 'border border-gray-800 hover:shadow-glow-purple hover:border-secondary-500'
                } transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAR
                  </div>
                )}
                <div className="text-center mb-4">
                  <span className="text-xl font-bold">{plan.name}</span>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">${plan.price}</span>
                    <span className="text-gray-400 ml-1">/{plan.period}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-center mb-4">
                  {plan.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg className="w-5 h-5 text-secondary-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? 'secondary' : 'outline'}
                  fullWidth
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Domain Options */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-gradient gradient-text-accent">Domain</span> Options
            </h2>
            <p className="text-gray-100 max-w-3xl mx-auto text-shadow">
              Choose how you want to handle your domain name. We offer flexible options to suit your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {domainOptions.map((option, index) => (
              <motion.div
                key={option.name}
                className="bg-dark-900/50 rounded-lg p-6 border border-gray-800 hover:border-accent-500 hover:shadow-glow-orange transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{option.name}</h3>
                    <p className="text-gray-400">{option.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold">${option.price}</span>
                    <span className="text-gray-400 ml-1">/{option.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg className="w-5 h-5 text-accent-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant="accent"
                  fullWidth
                >
                  Select Option
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* FAQ Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked <span className="text-gradient gradient-text-primary">Questions</span>
            </h2>
            <p className="text-gray-100 max-w-3xl mx-auto text-shadow">
              Still have questions? Contact us at support@instantwebsite.ai
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="mb-4 border border-gray-800 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-4 bg-dark-900/70 text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transform transition-transform ${
                      activeFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {activeFaq === index && (
                  <div className="p-4 bg-dark-800/50">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
      
      {/* CTA Section */}
      <Section className="bg-dark-900 py-16 relative">
        <BackgroundEffect type="aurora" intensity="low" />
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to launch your <span className="text-gradient gradient-text-primary">website?</span>
          </h2>
          <p className="text-xl text-gray-100 mb-8 text-shadow">
            Get started today with our free plan. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/demo" size="lg" animate>
              Try Demo Now
            </Button>
            <Button href="/templates" variant="outline" size="lg" animate>
              Browse Templates
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
