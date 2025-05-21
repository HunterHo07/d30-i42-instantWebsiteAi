# Development Guide for instantWebsiteAi

## Tech Stack

### Frontend
- **Framework**: Next.js 15.3.2+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: 
  - GSAP (for Home Page animations)
  - Three.js/Phaser 3 (for Demo Page)
  - Framer Motion (for UI animations)
  - Lottie (for loading animations)
- **State Management**: React Context API + localStorage
- **Icons**: Heroicons, FontAwesome
- **UI Components**: Custom components (no component libraries)

### Data Storage
- **Local Storage**: For saving user preferences and template selections
- **JSON**: Static data for templates and dummy content

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.js             # Home page
│   ├── demo/               # Demo page
│   ├── pitch-deck/         # Pitch deck page
│   ├── why-us/             # Why us page
│   ├── showcase/           # Showcase page
│   ├── roadmap/            # Roadmap page
│   └── layout.js           # Root layout
├── components/             # Reusable components
│   ├── common/             # Common UI components
│   ├── home/               # Home page specific components
│   ├── demo/               # Demo page specific components
│   └── layouts/            # Layout components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── styles/                 # Global styles
└── assets/                 # Static assets
    ├── images/             # Images
    ├── icons/              # Icons
    ├── animations/         # Animation files
    └── templates/          # Website templates
```

## Development Roadmap

### Phase 1: MVP (Current)
- Template preview system
- Hosting with subdomain simulation
- Admin panel for editing
- Template library
- 7-day request system simulation

### Phase 2: Enhanced Features
- Multi-site user dashboard
- Basic analytics (visits, edits)
- Access control (public/private)

### Phase 3: Advanced Editing
- Drag-and-drop editor (optional, for advanced users)
- Team collaboration support

### Phase 4: CMS Integration
- Full CMS integration
- Marketplace of premium templates

### Phase 5: Ecosystem Expansion
- Plugin ecosystem (forms, chat, analytics)
- AI-powered content population
- White-label plans for resellers & agencies

## Development Guidelines

### Code Style
- Use functional components with hooks
- Implement responsive design for all components
- Follow the BEM naming convention for custom CSS
- Use Tailwind's utility classes whenever possible
- Implement proper error handling and loading states

### Performance Optimization
- Lazy load images and components
- Optimize animations for performance
- Use Next.js Image component for optimized images
- Implement code splitting for large components
- Minimize third-party dependencies

### Accessibility
- Ensure proper contrast ratios for text
- Use semantic HTML elements
- Implement keyboard navigation
- Add proper ARIA attributes
- Test with screen readers

### Browser Compatibility
- Support latest versions of Chrome, Firefox, Safari, and Edge
- Ensure mobile responsiveness on iOS and Android devices

## Local Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build and Deployment

### Build Process
```bash
npm run build
```

### Vercel Deployment
The project is configured for seamless deployment on Vercel:
1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy with default settings

## Testing

### Manual Testing Checklist
- Verify all pages load without errors
- Test responsive design on various screen sizes
- Ensure all animations work correctly
- Validate form submissions and error handling
- Test localStorage functionality
- Verify template previews work correctly

### Performance Testing
- Run Lighthouse audits for performance, accessibility, SEO, and best practices
- Test loading times on various network conditions
- Verify animations don't cause performance issues on mobile devices
