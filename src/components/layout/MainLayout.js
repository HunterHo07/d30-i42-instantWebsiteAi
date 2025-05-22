'use client';

import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <Header />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
