'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import BackgroundEffect from '@/components/ui/BackgroundEffect';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const competitors = [
  {
    name: 'v0.dev',
    type: 'AI → React code',
    pros: ['High-quality UI components', 'Developer-friendly'],
    cons: ['Still needs development expertise', 'No hosting solution', 'No instant preview'],
  },
  {
    name: 'Framer AI',
    type: 'AI → design builder',
    pros: ['Beautiful designs', 'Intuitive interface'],
    cons: ['Not live immediately', 'Just layout designs', 'Limited customization'],
  },
  {
    name: 'Wix/Squarespace',
    type: 'Traditional builders',
    pros: ['Established', 'Feature-rich'],
    cons: ['Learning curve', 'Time-consuming', 'Decision fatigue'],
  },
  {
    name: 'ChatGPT Plugins',
    type: 'AI prompts',
    pros: ['Flexible', 'Customizable'],
    cons: ['Needs integration work', 'No site hosting', 'Inconsistent results'],
  },
  {
    name: 'instantWebsiteAi',
    type: 'AI + Human QA',
    pros: ['Instant live preview', 'No builder needed', 'Human quality control', '7-day design guarantee'],
    cons: ['Newer platform'],
    highlight: true,
  },
];

const benefits = [
  {
    title: 'Save Time',
    description: 'Launch your website in minutes, not weeks. No more wasting time on complex builders or waiting for agencies.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Save Money',
    description: 'Get a professional website at a fraction of the cost of traditional agencies or expensive subscription services.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'No Technical Skills Required',
    description: 'Our platform is designed for non-technical users. No coding, no complex interfaces, just results.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: 'Human Quality Control',
    description: 'Unlike fully automated solutions, we have real humans reviewing and polishing your website for quality assurance.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Ongoing Support',
    description: 'Our "Done For You" change plans ensure your website stays up-to-date without any hassle on your part.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Open Source Templates',
    description: 'All our templates are open-sourced on GitHub, giving you complete freedom and transparency.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote: "I was up and running with a professional website in literally minutes. No more wasting weeks on website builders or thousands on agencies. This is exactly what small business owners need!",
    name: "Sarah Johnson",
    role: "Small Business Owner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    quote: "As a photographer, I needed a site that showcased my work beautifully without the hassle of building it myself. instantWebsiteAi delivered exactly that, and the human design assistance made all the difference.",
    name: "Michael Chen",
    role: "Freelance Photographer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    quote: "When you are launching a startup, speed is everything. instantWebsiteAi let us get our landing page up in minutes instead of days, helping us capture early users while we built our product.",
    name: "David Wilson",
    role: "Startup Founder",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
];

export default function WhyUsPage() {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate comparison table
      gsap.from('.comparison-table', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.comparison-table',
          start: 'top 80%',
        },
      });
      
      // Animate benefits
      gsap.from('.benefit-card', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.benefits-grid',
          start: 'top 70%',
        },
      });
      
      // Animate testimonials
      gsap.from('.testimonial-card', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.testimonials-grid',
          start: 'top 70%',
        },
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div className="min-h-screen pt-20 pb-16 bg-dark-950" ref={sectionRef}>
      <BackgroundEffect type="mesh" className="opacity-30" />
      
      {/* Hero Section */}
      <Section className="py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient gradient-text-primary">Why Choose</span> instantWebsiteAi
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8 text-shadow">
            While others rely 100% on AI and still require you to "build" and "fix", 
            we give you a working site, live instantly, polished by humans.
          </p>
        </div>
        
        {/* Comparison Table */}
        <div className="comparison-table max-w-5xl mx-auto mb-20 overflow-x-auto">
          <div className="glass-card rounded-xl p-6 shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-4 px-4 text-left">Platform</th>
                  <th className="py-4 px-4 text-left">Type</th>
                  <th className="py-4 px-4 text-left">Pros</th>
                  <th className="py-4 px-4 text-left">Cons</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((competitor) => (
                  <tr 
                    key={competitor.name} 
                    className={`border-b border-gray-800 ${
                      competitor.highlight ? 'bg-primary-500/10' : ''
                    }`}
                  >
                    <td className="py-4 px-4">
                      <span className={`font-medium ${competitor.highlight ? 'text-primary-400' : 'text-white'}`}>
                        {competitor.name}
                      </span>
                      {competitor.highlight && (
                        <span className="ml-2 inline-block bg-primary-500 text-white text-xs px-2 py-0.5 rounded">
                          Best Choice
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-gray-300">{competitor.type}</td>
                    <td className="py-4 px-4">
                      <ul className="space-y-1">
                        {competitor.pros.map((pro) => (
                          <li key={pro} className="flex items-start">
                            <svg
                              className={`w-4 h-4 ${competitor.highlight ? 'text-primary-400' : 'text-green-500'} mr-1.5 mt-1`}
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
                            <span className="text-gray-300 text-sm">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4 px-4">
                      <ul className="space-y-1">
                        {competitor.cons.map((con) => (
                          <li key={con} className="flex items-start">
                            <svg
                              className="w-4 h-4 text-red-500 mr-1.5 mt-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                            <span className="text-gray-300 text-sm">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-gradient gradient-text-secondary">Benefits</span> of Using instantWebsiteAi
            </h2>
            <p className="text-gray-100 max-w-3xl mx-auto text-shadow">
              Our platform offers unique advantages that make website creation faster, easier, and more effective.
            </p>
          </div>
          
          <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="benefit-card glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-glow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-primary-400 mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Testimonials Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              What Our <span className="text-gradient gradient-text-accent">Customers</span> Say
            </h2>
            <p className="text-gray-100 max-w-3xl mx-auto text-shadow">
              Don't just take our word for it. Here's what people are saying about instantWebsiteAi.
            </p>
          </div>
          
          <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-glow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primary-500">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-gray-300 italic">"{testimonial.quote}"</blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      
      {/* CTA Section */}
      <Section className="bg-dark-900 py-16 relative">
        <BackgroundEffect type="aurora" intensity="low" />
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to experience the <span className="text-gradient gradient-text-primary">difference?</span>
          </h2>
          <p className="text-xl text-gray-100 mb-8 text-shadow">
            Try instantWebsiteAi today and see how easy website creation can be.
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
