'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Service } from '@/lib/types';

interface ServiceCardProps {
  service: Service;
  index: number;
  onBook: (service: Service) => void;
}

export default function ServiceCard({ service, index, onBook }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      className="group border border-ivory/8 bg-espresso/15 hover:border-gold/25 hover:bg-espresso/28 transition-all duration-400 px-5 py-4 md:px-6 md:py-5"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: name + description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-3 h-px bg-gold/40 group-hover:bg-gold/65 transition-colors duration-300 flex-shrink-0" />
            <h3 className="font-display text-xl md:text-2xl text-ivory leading-tight">
              {service.name}
            </h3>
          </div>
          <p className="text-ivory/40 font-sans font-light text-xs leading-relaxed pl-5.5 max-w-xs">
            {service.description}
          </p>
        </div>

        {/* Right: price + CTA */}
        <div className="flex flex-col items-end gap-3 flex-shrink-0">
          <div className="text-right">
            <div className="flex items-baseline gap-1.5 justify-end">
              <span className="text-[9px] tracking-[0.25em] uppercase text-ivory/28 font-sans leading-none">
                from
              </span>
              <span className="font-display text-2xl text-gold leading-none">
                ${service.price}
              </span>
            </div>
            <div className="text-[10px] text-ivory/30 font-sans mt-0.5">
              {service.hasTouchUp && (
                <>Touch-up ${service.touchUpPrice} ·{' '}</>
              )}
              Deposit ${service.deposit}
            </div>
          </div>

          <button
            onClick={() => onBook(service)}
            className="group/btn flex items-center gap-1.5 text-[10px] tracking-[0.28em] uppercase text-gold hover:text-ivory font-sans transition-colors duration-300"
            aria-label={`Book ${service.name}`}
          >
            Book
            <ArrowRight
              size={10}
              className="group-hover/btn:translate-x-0.5 transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
