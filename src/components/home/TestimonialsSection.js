'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Freelance Designer',
    image: '/testimonials/sarah.jpg',
    content:
      'I needed a portfolio site quickly for a client meeting. instantWebsiteAi let me create and launch a professional site in literally minutes. The client was impressed, and I got the job!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Startup Founder',
    image: '/testimonials/michael.jpg',
    content:
      'As a non-technical founder, I was dreading the website process. This tool saved me thousands in development costs and weeks of back-and-forth. My MVP was live the same day I found the platform.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Small Business Owner',
    image: '/testimonials/emily.jpg',
    content:
      'I run a local bakery and needed an online presence without the hassle. instantWebsiteAi was perfect - I uploaded my logo, picked a template, and had a beautiful site in under 10 minutes.',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Marketing Consultant',
    image: '/testimonials/david.jpg',
    content:
      'I recommend this to all my clients who need a website quickly. The templates are modern, the process is seamless, and the pricing is unbeatable. It is a game-changer for small businesses.',
    rating: 4,
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Real Estate Agent',
    image: '/testimonials/lisa.jpg',
    content:
      'I needed individual property websites for my listings. Now I can create a new site for each property in seconds. My clients love the professional look, and it has helped me win more listings.',
    rating: 5,
  },
  {
    id: 6,
    name: 'James Parker',
    role: 'Freelance Developer',
    image: '/testimonials/james.jpg',
    content:
      'Even as a developer, I use this for quick client projects. Why spend days coding when I can deliver a great site instantly? It has become an essential tool in my workflow.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const testimonialsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        '.testimonials-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.testimonials-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate testimonials with stagger
      testimonialsRef.current.forEach((testimonial, index) => {
        gsap.fromTo(
          testimonial,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: testimonial,
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
      className="section bg-gradient-to-b from-gray-50 to-white py-20 md:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 testimonials-title">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of satisfied customers who have launched their websites with instantWebsiteAi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => (testimonialsRef.current[index] = el)}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative mr-4">
                  {/* Placeholder for testimonial image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-4">
                {/* Star rating */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
              <div className="text-sm text-gray-500">Verified Customer</div>
            </div>
          ))}
        </div>

        {/* Testimonial highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12 border border-gray-100 shadow-md"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-8 md:mb-0 md:pr-8">
              <div className="w-24 h-24 rounded-full bg-white shadow-md overflow-hidden mx-auto relative">
                {/* Placeholder for featured testimonial image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-3xl">
                  J
                </div>
              </div>
              <div className="text-center mt-4">
                <h4 className="font-bold text-gray-900 text-xl">John Smith</h4>
                <p className="text-gray-600">Agency Owner</p>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:w-2/3 md:border-l md:border-gray-300 md:pl-8">
              <svg
                className="w-12 h-12 text-primary-300 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-xl md:text-2xl text-gray-700 italic mb-6">
                "We have used instantWebsiteAi for over 30 client projects this year. It has cut our delivery time by 80% and increased our profit margins significantly. Our clients are happier, we are more efficient, and we can focus on strategy instead of wrestling with website builders."
              </p>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-gray-600">
                    Helped launch <span className="font-bold text-primary-700">37 websites</span> in 3 months
                  </p>
                </div>
                <a
                  href="/case-studies"
                  className="text-primary-600 font-medium hover:underline"
                >
                  Read Case Study →
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '5,000+', label: 'Websites Created' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '3 mins', label: 'Average Setup Time' },
            { value: '$2.4M', label: 'Client Time Saved' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


