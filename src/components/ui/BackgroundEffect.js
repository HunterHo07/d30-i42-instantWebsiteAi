'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const BackgroundEffect = ({
  type = 'particles',
  className = '',
  intensity = 'medium',
  color = 'primary',
}) => {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  // Map intensity to actual values
  const intensityMap = {
    low: 0.3,
    medium: 0.6,
    high: 1,
  };

  // Map color to actual values
  const colorMap = {
    primary: {
      light: '#38bdf8', // primary-400
      main: '#0ea5e9', // primary-500
      dark: '#0284c7', // primary-600
    },
    secondary: {
      light: '#a78bfa', // secondary-400
      main: '#8b5cf6', // secondary-500
      dark: '#7c3aed', // secondary-600
    },
    accent: {
      light: '#fb923c', // accent-400
      main: '#f97316', // accent-500
      dark: '#ea580c', // accent-600
    },
    aurora: {
      light: 'rgba(66, 153, 225, 0.5)',
      main: 'rgba(139, 92, 246, 0.5)',
      dark: 'rgba(249, 115, 22, 0.5)',
    },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Particles effect
  useEffect(() => {
    if (!mounted || type !== 'particles' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Create particles
    const createParticles = () => {
      const particleCount = Math.floor(canvas.width * canvas.height / 10000) * intensityMap[intensity];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: colorMap[color][['light', 'main', 'dark'][Math.floor(Math.random() * 3)]],
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
    };

    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`).replace('rgb', 'rgba');
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };

    createParticles();
    drawParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, type, intensity, color]);

  if (!mounted) return null;

  // Render different background effects based on type
  switch (type) {
    case 'particles':
      return <canvas ref={canvasRef} className={`absolute inset-0 -z-10 ${className}`} />;
    
    case 'aurora':
      return (
        <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-accent-500/20 animate-aurora bg-[length:400%_400%]" />
        </div>
      );
    
    case 'gradient':
      return (
        <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
          <div className="absolute inset-0 bg-gradient-radial from-dark-800 to-dark-950" />
        </div>
      );
    
    case 'mesh':
      return (
        <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
          <div className="absolute inset-0 opacity-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              className="absolute inset-0"
            >
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
      );
    
    default:
      return null;
  }
};

export default BackgroundEffect;
