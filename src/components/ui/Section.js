'use client';

import { motion } from 'framer-motion';
import Container from './Container';

const Section = ({
  children,
  className = '',
  id,
  animate = false,
  initial = { opacity: 0, y: 20 },
  whileInView = { opacity: 1, y: 0 },
  viewport = { once: true, margin: '-100px' },
  transition = { duration: 0.5 },
  as: Component = 'section',
  containerClassName = '',
  fullWidth = false,
}) => {
  const content = fullWidth ? (
    children
  ) : (
    <Container className={containerClassName}>{children}</Container>
  );

  if (animate) {
    return (
      <Component id={id} className={`py-12 md:py-20 ${className}`}>
        <motion.div
          initial={initial}
          whileInView={whileInView}
          viewport={viewport}
          transition={transition}
        >
          {content}
        </motion.div>
      </Component>
    );
  }

  return (
    <Component id={id} className={`py-12 md:py-20 ${className}`}>
      {content}
    </Component>
  );
};

export default Section;
