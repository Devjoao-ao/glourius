'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Service, ServiceCategory } from '@/lib/types';
import { services, categories } from '@/lib/data';
import ServiceCard from './ServiceCard';

interface ServiceSectionProps {
  onBookService: (service: Service) => void;
}

export default function ServiceSection({ onBookService }: ServiceSectionProps) {
  const [active, setActive] = useState<ServiceCategory | null>(null);

  const toggle = (id: ServiceCategory) =>
    setActive((prev) => (prev === id ? null : id));

  const filtered = services.filter((s) => s.category === active);

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="block text-[9px] tracking-[0.55em] uppercase text-gold/60 font-sans mb-4"
          >
            Artisan Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl text-ivory mb-4 leading-tight"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-ivory/45 font-sans font-light text-sm md:text-base max-w-sm mx-auto"
          >
            Explore our curated collection of luxury beauty treatments
          </motion.p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          {categories.map((cat, i) => {
            const isActive = active === cat.id;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.15 }}
                onClick={() => toggle(cat.id)}
                className={`relative overflow-hidden text-left transition-all duration-400 p-10 md:p-12 min-h-[200px] md:min-h-[240px] flex flex-col justify-between
                  ${isActive
                    ? 'border border-gold/35 bg-espresso/45'
                    : 'border border-ivory/8 bg-espresso/15'
                  }
                `}
                aria-expanded={isActive}
                aria-controls={`services-${cat.id}`}
              >
                {/* Atmospheric glow — active only, no hover */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background:
                      cat.id === 'brows'
                        ? 'radial-gradient(ellipse 70% 60% at 85% 20%, rgba(201,168,76,0.08) 0%, transparent 65%)'
                        : 'radial-gradient(ellipse 70% 60% at 15% 80%, rgba(201,168,76,0.06) 0%, transparent 65%)',
                  }}
                />

                <div className="relative z-10">
                  <span
                    className={`block text-[9px] tracking-[0.45em] uppercase font-sans mb-4 transition-colors duration-300 ${
                      isActive ? 'text-gold' : 'text-ivory/28'
                    }`}
                  >
                    {isActive ? '— Selected' : cat.tagline}
                  </span>
                  <h3 className="font-display text-4xl md:text-5xl text-ivory leading-tight mb-3">
                    {cat.name}
                  </h3>
                  <p className="text-ivory/38 font-sans font-light text-sm max-w-xs leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between mt-8">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-ivory/25">
                    {services.filter((s) => s.category === cat.id).length} Services
                  </span>
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-colors duration-300 ${
                        isActive ? 'text-gold' : 'text-ivory/25'
                      }`}
                    />
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Expanded services list */}
        <AnimatePresence>
          {active && (
            <motion.div
              id={`services-${active}`}
              key={active}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="pt-3 space-y-2">
                {filtered.map((service, i) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={i}
                    onBook={onBookService}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
