'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import { CategoryGuidelines } from '@/lib/types';

interface GuidelinesAccordionProps {
  guidelines: CategoryGuidelines;
}

type Tab = 'before' | 'after';

export default function GuidelinesAccordion({ guidelines }: GuidelinesAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('before');

  const sections = tab === 'before' ? guidelines.before : guidelines.after;

  return (
    <div className="border-t border-ivory/8 pt-6 mt-6">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 group w-full text-left"
        aria-expanded={isOpen}
      >
        <Info
          size={14}
          className={`transition-colors duration-300 flex-shrink-0 ${
            isOpen ? 'text-gold' : 'text-ivory/30 group-hover:text-ivory/50'
          }`}
        />
        <span
          className={`text-[10px] tracking-[0.35em] uppercase font-sans transition-colors duration-300 ${
            isOpen ? 'text-gold' : 'text-ivory/35 group-hover:text-ivory/55'
          }`}
        >
          Care Guidelines
        </span>
        <div className="flex-1 border-t border-ivory/8" />
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-ivory/30 text-lg leading-none font-sans font-light block w-4 h-4 flex items-center justify-center"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pt-5">
              {/* Tabs */}
              <div className="flex gap-1 mb-5">
                <button
                  onClick={() => setTab('before')}
                  className={`px-5 py-2.5 text-[10px] tracking-[0.3em] uppercase font-sans transition-all duration-250 ${
                    tab === 'before'
                      ? 'bg-gold/10 text-gold border border-gold/30'
                      : 'text-ivory/35 border border-transparent hover:text-ivory/55 hover:border-ivory/12'
                  }`}
                >
                  Before
                </button>
                <button
                  onClick={() => setTab('after')}
                  className={`px-5 py-2.5 text-[10px] tracking-[0.3em] uppercase font-sans transition-all duration-250 ${
                    tab === 'after'
                      ? 'bg-gold/10 text-gold border border-gold/30'
                      : 'text-ivory/35 border border-transparent hover:text-ivory/55 hover:border-ivory/12'
                  }`}
                >
                  After
                </button>
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  {sections.map((section, i) => (
                    <div key={i}>
                      <h4 className="font-display text-sm text-ivory/70 mb-2.5 leading-snug">
                        {section.title}
                      </h4>
                      <ul className="space-y-1.5">
                        {section.items.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-[13px] font-sans text-ivory/40 font-light leading-relaxed"
                          >
                            <span className="w-1 h-1 rounded-full bg-gold/40 mt-[7px] flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {tab === 'after' && guidelines.contraindications && (
                    <div className="pt-2">
                      <h4 className="font-display text-sm text-gold/70 mb-2.5 leading-snug">
                        Contraindications
                      </h4>
                      <ul className="space-y-1.5">
                        {guidelines.contraindications.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-[13px] font-sans text-ivory/40 font-light leading-relaxed"
                          >
                            <span className="w-1 h-1 rounded-full bg-gold/40 mt-[7px] flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
