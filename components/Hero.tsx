'use client';

import { motion } from 'framer-motion';

interface HeroProps {
  onBookNow: () => void;
}

export default function Hero({ onBookNow }: HeroProps) {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden grain-overlay">
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-noir pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 70% 30%, rgba(201,168,76,0.07) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 15% 75%, rgba(138,112,64,0.05) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(13,13,13,0.7) 100%)',
          }}
        />
      </div>

      {/* Large decorative watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-display text-[28vw] leading-none text-gold/[0.028] tracking-tighter select-none">
          GE
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Pre-label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="mb-10"
        >
          <span className="text-[9px] md:text-[10px] tracking-[0.55em] uppercase text-gold/60 font-sans">
            Luxury Beauty Studio
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: 'easeOut' }}
          className="font-display font-light text-[13vw] sm:text-[10vw] md:text-[7.5vw] lg:text-[6.5rem] text-ivory leading-[0.88] tracking-tight mb-8"
        >
          Where Precision
          <br />
          <em className="text-gold italic">Meets Artistry</em>
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.75, ease: 'easeOut' }}
          className="w-14 h-px bg-gold mx-auto mb-8 origin-center"
        />

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: 'easeOut' }}
          className="text-ivory/55 font-sans font-light text-sm md:text-base tracking-wide mb-12 max-w-xs sm:max-w-md mx-auto leading-relaxed"
        >
          Luxury Lash Extensions &amp; Brow Micropigmentation
          <br className="hidden sm:block" /> Crafted For You.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <button
            onClick={onBookNow}
            className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-gold text-noir font-sans text-[11px] tracking-[0.25em] uppercase font-medium transition-all duration-300 hover:bg-ivory hover:shadow-[0_0_50px_rgba(201,168,76,0.25)] active:scale-[0.98]"
          >
            Book Your Appointment
          </button>
          <a
            href="#services"
            className="w-full sm:w-auto px-10 py-3.5 rounded-full border border-ivory/20 text-ivory/60 hover:text-ivory hover:border-ivory/35 font-sans text-[11px] tracking-[0.25em] uppercase transition-all duration-300 text-center"
          >
            Explore Services
          </a>
        </motion.div>
      </div>

      {/* Scroll line indicator — no text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-gold/35 to-transparent mx-auto"
        />
      </motion.div>
    </section>
  );
}
