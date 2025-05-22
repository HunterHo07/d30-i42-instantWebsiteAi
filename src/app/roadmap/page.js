'use client';

import { useRef, useEffect } from 'react';
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

const phases = [
  {
    title: 'MVP (Current)',
    description: 'Our initial release focuses on the core functionality of instantWebsiteAi.',
    features: [
      'Live preview with name + icon',
      'Admin panel for simple edits',
      'GitHub template hub',
      '7-day edit request window',
      'Subdomain hosting + setup automation',
      'Multi-site user dashboard',
      'Analytics for each site (visits, clicks, uptime)',
      'Public/private access toggle',
    ],
    status: 'live',
  },
  {
    title: 'Phase 1',
    description: 'Expanding editing capabilities and integration options.',
    features: [
      'Drag-and-drop editor (optional, for advanced users)',
      'Basic form builder integration',
      'Google Sheet backend support',
      'Enhanced template customization',
      'Custom domain setup wizard',
      'SEO optimization tools',
      'Performance analytics dashboard',
    ],
    status: 'upcoming',
    eta: 'Q3 2024',
  },
  {
    title: 'Phase 2',
    description: 'Adding content management and collaboration features.',
    features: [
      'CMS-ready templates (blog, news, updates)',
      'Real-time editing with save history',
      'AI-assisted content fill (auto text/images)',
      'Team collaboration tools',
      'Advanced media management',
      'Localization and multi-language support',
      'Enhanced security features',
    ],
    status: 'planned',
    eta: 'Q4 2024',
  },
  {
    title: 'Phase 3',
    description: 'Building an ecosystem around instantWebsiteAi.',
    features: [
      'Plugin ecosystem (CRM, eCommerce, chat, analytics)',
      'Template marketplace (sell your own)',
      'White-label + agency dashboard',
      'Advanced automation workflows',
      'API access for developers',
      'Enterprise-grade features',
      'Advanced analytics and reporting',
    ],
    status: 'planned',
    eta: 'Q1 2025',
  },
];

const statusColors = {
  live: 'bg-green-500',
  upcoming: 'bg-blue-500',
  planned: 'bg-purple-500',
};

export default function RoadmapPage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate roadmap items
      gsap.from('.roadmap-item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.roadmap-timeline',
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-dark-950" ref={sectionRef}>
      <BackgroundEffect type="gradient" className="opacity-50" />

      {/* Hero Section */}
      <Section className="py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-gradient gradient-text-primary">Roadmap</span>
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8 text-shadow">
            See what we have built and what is coming next for instantWebsiteAi.
            We are constantly improving our platform based on user feedback.
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="roadmap-timeline relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 transform md:-translate-x-1/2"></div>

          {/* Phases */}
          <div className="relative z-10">
            {phases.map((phase, index) => (
              <div
                key={phase.title}
                className={`roadmap-item relative mb-16 last:mb-0 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-auto md:mr-0' : 'md:pl-12 md:ml-0 md:mr-auto'
                } md:w-1/2 pl-12 md:pl-0`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-0 md:left-auto ${
                  index % 2 === 0 ? 'md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'
                } top-0 w-6 h-6 rounded-full bg-dark-950 border-4 border-primary-500 z-20 transform -translate-x-1/2 md:translate-x-0`}></div>

                {/* Content */}
                <motion.div
                  className="glass-card rounded-xl p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{phase.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${statusColors[phase.status]}`}>
                      {phase.status === 'live' ? 'Live Now' : phase.status === 'upcoming' ? 'Coming Soon' : 'Planned'}
                    </span>
                  </div>

                  {phase.eta && (
                    <div className="mb-3 text-primary-400 font-medium">
                      Estimated: {phase.eta}
                    </div>
                  )}

                  <p className="text-gray-300 mb-4">{phase.description}</p>

                  <ul className="space-y-2">
                    {phase.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0"
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

                  {phase.status === 'live' && (
                    <div className="mt-6">
                      <Button href="/demo" size="sm">
                        Try Now
                      </Button>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Feedback Section */}
      <Section className="bg-dark-900 py-16 relative">
        <BackgroundEffect type="aurora" intensity="low" />
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Help Shape Our <span className="text-gradient gradient-text-primary">Future</span>
          </h2>
          <p className="text-xl text-gray-100 mb-8 text-shadow">
            We value your feedback and suggestions. Let us know what features you'd like to see next.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/demo" size="lg" animate>
              Try Demo Now
            </Button>
            <Button href="mailto:feedback@instantwebsite.ai" variant="outline" size="lg" animate>
              Send Feedback
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
