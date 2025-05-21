'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const competitors = [
  {
    name: 'v0.dev',
    type: 'AI-to-code builder',
    weakness: 'Still needs dev to deploy',
    features: {
      instant: false,
      hosting: false,
      noSetup: false,
      cheap: false,
      support: false,
    },
  },
  {
    name: 'Framer AI',
    type: 'Design-focused',
    weakness: 'Mostly prototype, not live site',
    features: {
      instant: true,
      hosting: true,
      noSetup: false,
      cheap: false,
      support: false,
    },
  },
  {
    name: 'Bolt',
    type: 'Custom AI + dev agency',
    weakness: 'Expensive & limited automation',
    features: {
      instant: false,
      hosting: true,
      noSetup: true,
      cheap: false,
      support: true,
    },
  },
  {
    name: 'Wix/Squarespace',
    type: 'Drag-n-drop builder',
    weakness: 'Time-consuming, clunky for edits',
    features: {
      instant: false,
      hosting: true,
      noSetup: false,
      cheap: false,
      support: true,
    },
  },
  {
    name: 'Builder.ai',
    type: 'Human-assisted builder',
    weakness: 'Agency-style delays, higher cost',
    features: {
      instant: false,
      hosting: true,
      noSetup: false,
      cheap: false,
      support: true,
    },
  },
];

export default function ComparisonSection() {
  const sectionRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        '.comparison-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.comparison-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate table
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate rows
      gsap.utils.toArray('.comparison-row').forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: 0.1 * i,
            scrollTrigger: {
              trigger: tableRef.current,
              start: 'top 80%',
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
      className="section bg-gray-50 py-20 md:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 comparison-title">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How We Compare
          </h2>
          <p className="text-xl text-gray-600">
            See why instantWebsiteAi is the fastest and easiest way to get your website online.
          </p>
        </div>

        <div className="overflow-x-auto" ref={tableRef}>
          <table className="w-full min-w-[800px] bg-white rounded-xl shadow-md">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-4 px-6 text-left rounded-tl-xl">Platform</th>
                <th className="py-4 px-6 text-left">Type</th>
                <th className="py-4 px-6 text-left">Main Weakness</th>
                <th className="py-4 px-6 text-center">Instant</th>
                <th className="py-4 px-6 text-center">Hosting</th>
                <th className="py-4 px-6 text-center">No Setup</th>
                <th className="py-4 px-6 text-center">Affordable</th>
                <th className="py-4 px-6 text-center rounded-tr-xl">Support</th>
              </tr>
            </thead>
            <tbody>
              {/* instantWebsiteAi row */}
              <tr className="bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-gray-200 comparison-row">
                <td className="py-4 px-6 font-bold text-primary-700">instantWebsiteAi</td>
                <td className="py-4 px-6">Instant generator</td>
                <td className="py-4 px-6">New platform</td>
                <td className="py-4 px-6 text-center text-green-600">✓</td>
                <td className="py-4 px-6 text-center text-green-600">✓</td>
                <td className="py-4 px-6 text-center text-green-600">✓</td>
                <td className="py-4 px-6 text-center text-green-600">✓</td>
                <td className="py-4 px-6 text-center text-green-600">✓</td>
              </tr>

              {/* Competitor rows */}
              {competitors.map((competitor, index) => (
                <tr key={competitor.name} className="border-b border-gray-200 hover:bg-gray-50 transition-colors comparison-row">
                  <td className="py-4 px-6 font-medium">{competitor.name}</td>
                  <td className="py-4 px-6">{competitor.type}</td>
                  <td className="py-4 px-6 text-red-600">{competitor.weakness}</td>
                  <td className="py-4 px-6 text-center">
                    {competitor.features.instant ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-red-600">✗</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {competitor.features.hosting ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-red-600">✗</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {competitor.features.noSetup ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-red-600">✗</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {competitor.features.cheap ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-red-600">✗</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {competitor.features.support ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-red-600">✗</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
            instantWebsiteAi is the only platform that combines instant generation, free hosting, and a no-setup experience at an affordable price.
          </p>
          <a
            href="/demo"
            className="btn btn-primary inline-block"
          >
            Try It Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}


