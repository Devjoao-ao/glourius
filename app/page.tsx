'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceSection from '@/components/ServiceSection';
import BookingModal from '@/components/BookingModal';
import { Service } from '@/lib/types';

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const openBooking = (service?: Service) => {
    setSelectedService(service ?? null);
    setBookingOpen(true);
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <Navbar onBookNow={() => openBooking()} />

      <main>
        <Hero onBookNow={() => openBooking()} />
        <ServiceSection onBookService={openBooking} />
      </main>

      {/* Minimal footer */}
      <footer className="py-10 px-6 border-t border-ivory/6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-sm text-ivory/30 tracking-[0.15em] uppercase">
            Glorious Eye
          </span>
          <span className="text-[10px] tracking-[0.3em] text-ivory/18 font-sans uppercase">
            © {new Date().getFullYear()} · All Rights Reserved
          </span>
          <button
            onClick={() => openBooking()}
            className="text-[10px] tracking-[0.35em] uppercase font-sans text-gold/60 hover:text-gold transition-colors duration-300"
          >
            Book Appointment
          </button>
        </div>
      </footer>

      <BookingModal
        isOpen={bookingOpen}
        onClose={closeBooking}
        initialService={selectedService}
      />
    </>
  );
}
