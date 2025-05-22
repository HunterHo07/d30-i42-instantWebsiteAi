'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import BackgroundEffect from '@/components/ui/BackgroundEffect';

const HeroSection = () => {
  const [businessName, setBusinessName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [isPreviewReady, setIsPreviewReady] = useState(false);
  const previewRef = useRef(null);
  const heroRef = useRef(null);

  // Animation timeline
  useEffect(() => {
    // Wait for DOM to be fully loaded
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: 'power2.out' },
          onStart: () => {
            // Make sure elements are visible before animation
            document.querySelectorAll('.hero-title, .hero-subtitle, .hero-form, .hero-cta')
              .forEach(el => {
                if (el) el.style.opacity = '0';
              });
          }
        });

        tl.to('.hero-title', {
          y: 0,
          opacity: 1,
          duration: 0.8,
          clearProps: 'all' // Clear properties after animation to prevent issues
        })
        .to('.hero-subtitle', {
          y: 0,
          opacity: 1,
          duration: 0.8,
          clearProps: 'all'
        }, '-=0.4')
        .to('.hero-form', {
          y: 0,
          opacity: 1,
          duration: 0.8,
          clearProps: 'all'
        }, '-=0.4')
        .to('.hero-cta', {
          y: 0,
          opacity: 1,
          duration: 0.8,
          clearProps: 'all'
        }, '-=0.4');
      }, heroRef);

      return () => {
        ctx.revert();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Preview animation
  useEffect(() => {
    if (isPreviewReady && previewRef.current) {
      gsap.fromTo(
        previewRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        }
      );
    }
  }, [isPreviewReady]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (businessName.trim()) {
      // Simulate loading
      setTimeout(() => {
        setIsPreviewReady(true);
      }, 1000);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen pt-20 pb-16 flex items-center overflow-hidden bg-dark-950">
      {/* Background Effects */}
      <BackgroundEffect type="particles" intensity="low" color="primary" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950 z-0"></div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block">From name to website</span>
              <span className="text-gradient gradient-text-primary">in 30 seconds.</span>
            </h1>

            <p className="hero-subtitle text-xl text-gray-100 mb-8 text-shadow">
              No builders. No code. No drag-and-drop.
              <span className="block mt-2">
                Just enter your business name, upload a logo, and see your site live instantly.
              </span>
            </p>

            <form
              className="hero-form space-y-4 mb-8"
              onSubmit={handleSubmit}
            >
              <div className="glass-card p-1 rounded-lg flex items-center shadow-lg">
                <input
                  type="text"
                  placeholder="Enter your business name"
                  className="flex-grow bg-dark-800/80 px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-l-lg"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-r-lg font-medium transition-all duration-300 hover:shadow-glow text-shadow"
                >
                  Generate
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg bg-dark-800/90 px-4 py-2 border border-gray-600 hover:border-primary-500 hover:bg-dark-700/90 transition-colors shadow-md">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                    <span className="flex items-center text-sm text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {logoUrl ? 'Logo uploaded' : 'Upload logo (optional)'}
                    </span>
                  </div>
                </label>

                {logoUrl && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary-500 bg-white shadow-glow">
                    <Image
                      src={logoUrl}
                      alt="Uploaded logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </form>

            <div className="hero-cta flex flex-wrap gap-4">
              <Button href="/demo" size="lg" animate>
                Try Full Demo
              </Button>
              <Button href="/templates" variant="outline" size="lg" animate>
                Browse Templates
              </Button>
            </div>
          </div>

          <div className="relative">
            {isPreviewReady ? (
              <div
                ref={previewRef}
                className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700 bg-white"
              >
                <div className="bg-dark-800 p-2 flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-grow text-center">
                    <span className="text-xs text-gray-300 font-medium">{businessName}.instantweb.ai</span>
                  </div>
                </div>
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                    alt="Website Preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex items-center mb-4">
                        {logoUrl && (
                          <div className="relative w-12 h-12 mr-3 rounded-full overflow-hidden bg-white p-1 shadow-md">
                            <Image
                              src={logoUrl}
                              alt={`${businessName} logo`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <h2 className="text-2xl font-bold text-white text-shadow-lg">{businessName}</h2>
                      </div>
                      <p className="text-gray-100 mb-4 text-shadow">
                        Welcome to {businessName}, your trusted partner for quality services.
                      </p>
                      <button className="bg-white text-dark-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-md">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700 bg-dark-800/80 aspect-[16/9] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 border-t-2 border-primary-500 border-r-2 border-b-2 border-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-200 text-shadow">
                    {businessName ? 'Generating preview...' : 'Enter your business name to see a live preview'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
