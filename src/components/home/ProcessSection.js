'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Section from '@/components/ui/Section';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: '01',
    title: 'Enter your business name',
    description: 'Simply type your business name and optionally upload your logo.',
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    number: '02',
    title: 'Preview your website instantly',
    description: 'See your site live on a free subdomain in seconds, not days or weeks.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    number: '03',
    title: 'Customize and deploy',
    description: 'Make simple edits or let our team handle the tweaks for you.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80',
  },
];

const ProcessSection = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from('.process-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.process-title',
          start: 'top 80%',
        },
      });

      // Animate timeline line
      gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 70%',
        },
      });

      // Animate steps
      steps.forEach((_, index) => {
        gsap.from(`.step-${index}`, {
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: `.step-${index}`,
            start: 'top 75%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      id="process"
      className="bg-dark-950 relative"
      ref={sectionRef}
    >
      <div className="relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="process-title text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gradient gradient-text-secondary">3-Step</span> Process
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From idea to live website in just three simple steps. No technical skills required.
          </motion.p>
        </div>
        
        <div className="timeline relative" ref={timelineRef}>
          {/* Timeline line */}
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 h-full top-0"></div>
          
          {/* Steps */}
          <div className="relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`step-${index} relative mb-24 last:mb-0`}
              >
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}>
                  {/* Content */}
                  <motion.div 
                    className="md:w-1/2 text-center md:text-left"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="inline-block bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full px-4 py-1 text-sm font-medium mb-4">
                      Step {step.number}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </motion.div>
                  
                  {/* Image */}
                  <motion.div 
                    className="md:w-1/2"
                    initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-800 shadow-xl">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-dark-900/30"></div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-dark-950 border-4 border-primary-500 z-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProcessSection;
