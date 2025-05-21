'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    id: 1,
    title: 'Instant Website Generator',
    description: 'Upload icon + name → get a full website preview on our subdomain instantly.',
    icon: '⚡',
  },
  {
    id: 2,
    title: 'Template Library',
    description: 'Dozens of beautiful, mobile-friendly templates created by pros and AI—free to explore.',
    icon: '🎨',
  },
  {
    id: 3,
    title: 'Admin Panel',
    description: 'Edit text/images/colors via a basic dashboard—no coding or site builders.',
    icon: '⚙️',
  },
  {
    id: 4,
    title: 'One-Click Hosting',
    description: 'Host under yourname.instantweb.ai with zero setup.',
    icon: '🌐',
  },
  {
    id: 5,
    title: '7-Day Happiness Request',
    description: 'Submit design change requests for up to 7 days until you are satisfied.',
    icon: '😊',
  },
  {
    id: 6,
    title: 'Mobile Responsive',
    description: 'All templates are fully responsive and look great on any device.',
    icon: '📱',
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const featuresRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        '.features-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.features-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate features
      featuresRef.current.forEach((feature, index) => {
        gsap.fromTo(
          feature,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: feature,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section bg-white py-20 md:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 features-title">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need, Nothing You Don't
          </h2>
          <p className="text-xl text-gray-600">
            We've simplified the website creation process to focus on what matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={(el) => (featuresRef.current[index] = el)}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Feature highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12 border border-gray-100 shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                From Idea to Live Website in Seconds
              </h3>
              <p className="text-gray-700 mb-6">
                No more waiting days or weeks for your website. With instantWebsiteAi, you can go from concept to a fully functional website in just seconds.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'No technical skills required',
                  'No design experience needed',
                  'No waiting for developers',
                  'No complicated builders',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="flex items-center"
                  >
                    <span className="text-primary-500 mr-2">✓</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <a
                href="/demo"
                className="btn btn-primary inline-block"
              >
                Try It Now
              </a>
            </div>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl mr-4">
                    ⏱️
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Time Saved</h4>
                    <p className="text-gray-500">Compared to traditional methods</p>
                  </div>
                </div>
                <div className="relative h-48 mb-6">
                  {/* Chart visualization */}
                  <div className="absolute bottom-0 left-0 w-1/4 h-12 bg-gray-200 rounded-t-md"></div>
                  <div className="absolute bottom-0 left-[30%] w-1/4 h-24 bg-gray-300 rounded-t-md"></div>
                  <div className="absolute bottom-0 left-[60%] w-1/4 h-44 bg-primary-500 rounded-t-md"></div>

                  {/* Labels */}
                  <div className="absolute bottom-[-24px] left-[12%] text-xs text-gray-500">DIY</div>
                  <div className="absolute bottom-[-24px] left-[42%] text-xs text-gray-500">Agency</div>
                  <div className="absolute bottom-[-24px] left-[72%] text-xs text-gray-500 font-bold">Us</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">97% Faster</div>
                  <p className="text-gray-500">Website creation process</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-full h-full bg-primary-200 rounded-xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full blur-xl opacity-20"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


