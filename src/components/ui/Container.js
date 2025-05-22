'use client';

const Container = ({ 
  children, 
  className = '', 
  as: Component = 'div',
  maxWidth = '7xl',
  padding = 'px-4 sm:px-6 lg:px-8',
}) => {
  return (
    <Component className={`mx-auto max-w-${maxWidth} ${padding} ${className}`}>
      {children}
    </Component>
  );
};

export default Container;
