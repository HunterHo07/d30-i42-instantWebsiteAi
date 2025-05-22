'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const buttonVariants = {
  primary: 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-glow',
  secondary: 'bg-dark-700 hover:bg-dark-600 text-white border border-dark-600',
  accent: 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-glow-orange',
  outline: 'bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-500/10',
  ghost: 'bg-transparent hover:bg-dark-800/50 text-gray-300 hover:text-white',
};

const sizeVariants = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5',
  lg: 'px-8 py-3 text-lg',
};

const Button = forwardRef(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      href,
      isExternal = false,
      disabled = false,
      fullWidth = false,
      rounded = 'full',
      animate = false,
      ...props
    },
    ref
  ) => {
    const baseClasses = `inline-flex items-center justify-center font-medium transition-all duration-300 rounded-${rounded} ${
      fullWidth ? 'w-full' : ''
    } ${buttonVariants[variant]} ${sizeVariants[size]} ${
      disabled ? 'opacity-60 cursor-not-allowed' : ''
    } ${className}`;

    const content = (
      <>
        {animate ? (
          <motion.span
            className="flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {children}
          </motion.span>
        ) : (
          children
        )}
      </>
    );

    if (href) {
      if (isExternal) {
        return (
          <a
            ref={ref}
            href={href}
            className={baseClasses}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          >
            {content}
          </a>
        );
      }
      return (
        <Link ref={ref} href={href} className={baseClasses} {...props}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={baseClasses} disabled={disabled} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
