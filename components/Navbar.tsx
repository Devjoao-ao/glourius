'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onBookNow: () => void;
}

export default function Navbar({ onBookNow }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-noir/90 backdrop-blur-md border-b border-gold/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between relative">
        {/* Left */}
        <a
          href="#services"
          className="hidden md:block text-ivory/40 hover:text-ivory/80 text-[10px] tracking-[0.35em] uppercase font-sans transition-colors duration-300"
        >
          Services
        </a>

        {/* Center logo */}
        <a
          href="/"
          className="absolute left-1/2 -translate-x-1/2 group"
          aria-label="Glorious Eye — Home"
        >
          <span className="font-display text-xl text-ivory tracking-[0.25em] uppercase group-hover:text-gold/90 transition-colors duration-400">
            Glorious Eye
          </span>
        </a>

        {/* Right */}
        <button
          onClick={onBookNow}
          className="ml-auto px-5 py-2 rounded-full border border-gold/40 text-[10px] tracking-[0.3em] uppercase font-sans text-gold hover:bg-gold hover:text-noir transition-all duration-300"
          aria-label="Open booking"
        >
          Book Now
        </button>
      </div>
    </motion.nav>
  );
}
