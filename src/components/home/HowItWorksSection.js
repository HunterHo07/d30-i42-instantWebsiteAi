'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    id: 1,
    title: 'Enter Your Business Info',
    description: 'Simply provide your business name and upload your logo. That\'s all we need to get started.',
    icon: '📝',
  },
  {
    id: 2,
    title: 'Preview Your Website',
    description: 'Instantly see your professional website with your branding applied to our beautiful templates.',
    icon: '👁️',
  },
  {
    id: 3,
    title: 'Launch & Customize',
    description: 'Publish your site on our subdomain instantly or make quick edits through our simple admin panel.',
    icon: '🚀',
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create animations for each step
      stepsRef.current.forEach((step, index) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Line animation
      gsap.fromTo(
        '.step-line',
        { height: 0 },
        {
          height: '100%',
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="section bg-gray-50 py-20 md:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">
            Get your website up and running in three simple steps. No technical skills required.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line connecting steps */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform md:-translate-x-1/2 hidden md:block">
            <div className="step-line absolute left-0 top-0 bottom-0 w-full bg-gradient-to-b from-primary-500 to-secondary-600 origin-top"></div>
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-24 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => (stepsRef.current[index] = el)}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Step number with icon */}
                <div className="flex-shrink-0 mb-6 md:mb-0">
                  <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl md:text-3xl z-10">
                      {step.icon}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 blur-lg opacity-30"></div>
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-600/20"></div>
                  </div>
                </div>

                {/* Step content */}
                <div
                  className={`flex-1 md:max-w-md ${
                    index % 2 === 1 ? 'md:mr-16' : 'md:ml-16'
                  }`}
                >
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 h-full">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 md:mt-24"
        >
          <a
            href="/demo"
            className="btn btn-primary text-lg px-8 py-4 inline-block"
          >
            Try It Now
          </a>
          <p className="mt-4 text-gray-500">No credit card required. Free to try.</p>
        </motion.div>
      </div>
    </section>
  );
}


