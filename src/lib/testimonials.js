/**
 * Testimonial data and utility functions
 */

// Testimonial data
export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Freelance Designer',
    image: '/testimonials/sarah.jpg',
    content:
      'I needed a portfolio site quickly for a client meeting. instantWebsiteAi let me create and launch a professional site in literally minutes. The client was impressed, and I got the job!',
    rating: 5,
    featured: false,
    industry: 'design',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Startup Founder',
    image: '/testimonials/michael.jpg',
    content:
      'As a non-technical founder, I was dreading the website process. This tool saved me thousands in development costs and weeks of back-and-forth. My MVP was live the same day I found the platform.',
    rating: 5,
    featured: true,
    industry: 'technology',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Small Business Owner',
    image: '/testimonials/emily.jpg',
    content:
      'I run a local bakery and needed an online presence without the hassle. instantWebsiteAi was perfect - I uploaded my logo, picked a template, and had a beautiful site in under 10 minutes.',
    rating: 5,
    featured: false,
    industry: 'food',
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Marketing Consultant',
    image: '/testimonials/david.jpg',
    content:
      'I recommend this to all my clients who need a website quickly. The templates are modern, the process is seamless, and the pricing is unbeatable. It's a game-changer for small businesses.',
    rating: 4,
    featured: false,
    industry: 'marketing',
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Real Estate Agent',
    image: '/testimonials/lisa.jpg',
    content:
      'I needed individual property websites for my listings. Now I can create a new site for each property in seconds. My clients love the professional look, and it's helped me win more listings.',
    rating: 5,
    featured: false,
    industry: 'real_estate',
  },
  {
    id: 6,
    name: 'James Parker',
    role: 'Freelance Developer',
    image: '/testimonials/james.jpg',
    content:
      'Even as a developer, I use this for quick client projects. Why spend days coding when I can deliver a great site instantly? It's become an essential tool in my workflow.',
    rating: 5,
    featured: false,
    industry: 'development',
  },
  {
    id: 7,
    name: 'John Smith',
    role: 'Agency Owner',
    image: '/testimonials/john.jpg',
    content:
      'We've used instantWebsiteAi for over 30 client projects this year. It's cut our delivery time by 80% and increased our profit margins significantly. Our clients are happier, we're more efficient, and we can focus on strategy instead of wrestling with website builders.',
    rating: 5,
    featured: true,
    industry: 'agency',
    stats: {
      websitesLaunched: 37,
      timeframe: '3 months',
      timeSaved: '450 hours',
    },
  },
  {
    id: 8,
    name: 'Amanda Lee',
    role: 'Photographer',
    image: '/testimonials/amanda.jpg',
    content:
      'As a photographer, I needed a site that would showcase my work beautifully. instantWebsiteAi delivered exactly what I needed without the complexity of other platforms. My portfolio looks stunning!',
    rating: 5,
    featured: false,
    industry: 'photography',
  },
  {
    id: 9,
    name: 'Robert Garcia',
    role: 'Restaurant Owner',
    image: '/testimonials/robert.jpg',
    content:
      'Our restaurant needed a website with our menu, location, and hours. We had it up and running in less than an hour. The template was perfect for our needs, and customers love how easy it is to navigate.',
    rating: 4,
    featured: false,
    industry: 'restaurant',
  },
  {
    id: 10,
    name: 'Jennifer Kim',
    role: 'Fitness Instructor',
    image: '/testimonials/jennifer.jpg',
    content:
      'I was able to create a professional website for my fitness classes without any technical knowledge. The process was incredibly simple, and I started getting new clients within days of launching.',
    rating: 5,
    featured: false,
    industry: 'fitness',
  },
];

/**
 * Get featured testimonials
 * 
 * @returns {Array} Featured testimonials
 */
export const getFeaturedTestimonials = () => {
  return testimonials.filter(testimonial => testimonial.featured);
};

/**
 * Get testimonials by industry
 * 
 * @param {string} industry - Industry to filter by
 * @returns {Array} Filtered testimonials
 */
export const getTestimonialsByIndustry = (industry) => {
  return testimonials.filter(testimonial => testimonial.industry === industry);
};

/**
 * Get testimonials by rating
 * 
 * @param {number} rating - Minimum rating to filter by
 * @returns {Array} Filtered testimonials
 */
export const getTestimonialsByRating = (rating) => {
  return testimonials.filter(testimonial => testimonial.rating >= rating);
};

/**
 * Get random testimonials
 * 
 * @param {number} count - Number of testimonials to return
 * @returns {Array} Random testimonials
 */
export const getRandomTestimonials = (count = 3) => {
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

/**
 * Get testimonial by ID
 * 
 * @param {number} id - Testimonial ID
 * @returns {Object|null} Testimonial object or null if not found
 */
export const getTestimonialById = (id) => {
  return testimonials.find(testimonial => testimonial.id === id) || null;
};

/**
 * Get testimonial statistics
 * 
 * @returns {Object} Testimonial statistics
 */
export const getTestimonialStats = () => {
  const totalTestimonials = testimonials.length;
  const averageRating = testimonials.reduce((acc, testimonial) => acc + testimonial.rating, 0) / totalTestimonials;
  const fiveStarCount = testimonials.filter(testimonial => testimonial.rating === 5).length;
  const fiveStarPercentage = (fiveStarCount / totalTestimonials) * 100;
  
  return {
    totalTestimonials,
    averageRating,
    fiveStarCount,
    fiveStarPercentage,
  };
};
