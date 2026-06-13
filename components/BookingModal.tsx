'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Service, BookingFormData } from '@/lib/types';
import { services, categories } from '@/lib/data';

// ─── Constants ────────────────────────────────────────────────────────────────

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM',  '2:00 PM',  '3:00 PM',  '4:00 PM',  '5:00 PM',
];

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

// Deterministic fake availability so the calendar looks real
function isSlotTaken(dateStr: string, time: string) {
  const hash = (dateStr + time)
    .split('')
    .reduce((a, c) => a + c.charCodeAt(0), 0);
  return hash % 4 === 0;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: Service | null;
}

type CalMonth = { year: number; month: number };

// ─── Slide animation ──────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 36 : -36, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -36 : 36, opacity: 0 }),
};

// ─── BookingModal ─────────────────────────────────────────────────────────────

export default function BookingModal({ isOpen, onClose, initialService }: BookingModalProps) {
  const startStep = initialService ? 3 : 1;
  const totalSteps = initialService ? 4 : 6; // relative display count

  const [step, setStep] = useState(startStep);
  const [dir, setDir] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const now = new Date();
  const [calMonth, setCalMonth] = useState<CalMonth>({
    year: now.getFullYear(),
    month: now.getMonth(),
  });

  const emptyForm = useCallback(
    (): BookingFormData => ({
      category: initialService?.category ?? null,
      service: initialService ?? null,
      date: '',
      time: '',
      name: '',
      phone: '',
      email: '',
      notes: '',
    }),
    [initialService],
  );

  const [form, setForm] = useState<BookingFormData>(emptyForm);

  const patch = (fields: Partial<BookingFormData>) =>
    setForm((f) => ({ ...f, ...fields }));

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep(startStep);
      setForm(emptyForm());
      setSubmitting(false);
      setDir(1);
      const d = new Date();
      setCalMonth({ year: d.getFullYear(), month: d.getMonth() });
    }
  }, [isOpen, emptyForm, startStep]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const next = () => { setDir(1); setStep((s) => s + 1); };
  const back = () => { setDir(-1); setStep((s) => s - 1); };

  const canProceed = () => {
    switch (step) {
      case 1: return !!form.category;
      case 2: return !!form.service;
      case 3: return !!form.date;
      case 4: return !!form.time;
      case 5: return !!(form.name.trim() && form.phone.trim() && form.email.trim());
      default: return true;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service?.name,
          date: form.date,
          time: form.time,
          deposit: form.service?.deposit,
          notes: form.notes,
        }),
      });
    } catch {
      // Webhook may not be configured yet — still show success
    } finally {
      setSubmitting(false);
      setDir(1);
      setStep(6);
    }
  };

  // Display step number relative to the flow start
  const displayStep = step - startStep + 1;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      {/* Scrim */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 bg-noir/85 backdrop-blur-sm"
        onClick={step < 6 ? onClose : undefined}
      />

      {/* Panel — slides up from bottom */}
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full md:max-w-[480px] bg-espresso border-t border-gold/15 md:border md:border-gold/12 shadow-[0_-20px_80px_rgba(0,0,0,0.6)] md:shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
        style={{ maxHeight: '93dvh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — dots progress + back + close */}
        <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-ivory/8">
          <div className="flex items-center gap-3">
            {step > startStep && step < 6 && (
              <button
                onClick={back}
                className="text-ivory/35 hover:text-ivory transition-colors p-1 -ml-1"
                aria-label="Go back"
              >
                <ChevronLeft size={16} />
              </button>
            )}
            {/* Step dots */}
            {step < 6 && (
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalSteps }).map((_, i) => {
                  const dotStep = i + 1;
                  return (
                    <div
                      key={dotStep}
                      className={`rounded-full transition-all duration-300 ${
                        dotStep < displayStep
                          ? 'w-1.5 h-1.5 bg-gold/50'
                          : dotStep === displayStep
                          ? 'w-2 h-2 bg-gold'
                          : 'w-1.5 h-1.5 bg-ivory/15'
                      }`}
                    />
                  );
                })}
              </div>
            )}
            {step === 6 && (
              <div className="w-2 h-2 rounded-full bg-gold" />
            )}
          </div>
          <button
            onClick={onClose}
            className="text-ivory/25 hover:text-ivory/60 transition-colors p-1"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable content */}
        <div
          className="overflow-y-auto overscroll-contain px-6 md:px-8 py-7"
          style={{ maxHeight: 'calc(93dvh - 128px)' }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >
              {step === 1 && (
                <StepCategory
                  selected={form.category}
                  onSelect={(cat) => patch({ category: cat, service: null })}
                />
              )}
              {step === 2 && (
                <StepService
                  category={form.category!}
                  selected={form.service}
                  onSelect={(service) => patch({ service })}
                />
              )}
              {step === 3 && (
                <StepDate
                  selected={form.date}
                  onSelect={(date) => patch({ date, time: '' })}
                  calMonth={calMonth}
                  onCalMonthChange={setCalMonth}
                />
              )}
              {step === 4 && (
                <StepTime
                  date={form.date}
                  selected={form.time}
                  onSelect={(time) => patch({ time })}
                />
              )}
              {step === 5 && (
                <StepContact
                  form={form}
                  onChange={(field, value) => patch({ [field]: value })}
                />
              )}
              {step === 6 && <StepSuccess form={form} onClose={onClose} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer CTA */}
        {step < 6 && (
          <div className="px-6 md:px-8 py-4 border-t border-ivory/8">
            <button
              onClick={step < 5 ? next : handleSubmit}
              disabled={!canProceed() || submitting}
              className="w-full py-3.5 rounded-full bg-gold text-noir font-sans text-[11px] tracking-[0.25em] uppercase font-medium transition-all duration-300 hover:bg-ivory hover:shadow-[0_0_40px_rgba(201,168,76,0.2)] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              {submitting ? (
                'Submitting…'
              ) : step < 5 ? (
                <>Continue <ChevronRight size={13} /></>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ─── Step 1 · Category ────────────────────────────────────────────────────────

function StepCategory({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (cat: 'brows' | 'lashes') => void;
}) {
  return (
    <div>
      <h2 className="font-display text-[2.4rem] text-ivory leading-tight mb-1.5">
        Choose a Category
      </h2>
      <p className="text-ivory/40 font-sans font-light text-sm mb-7">
        What would you like today?
      </p>
      <div className="space-y-3">
        {categories.map((cat) => {
          const active = selected === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`w-full text-left p-6 border transition-all duration-300 ${
                active
                  ? 'border-gold/45 bg-gold/5'
                  : 'border-ivory/10 hover:border-ivory/22 hover:bg-ivory/3'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl text-ivory mb-1">{cat.name}</h3>
                  <p className="text-ivory/38 font-sans text-xs leading-relaxed max-w-[240px]">
                    {cat.description}
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                    active ? 'border-gold bg-gold' : 'border-ivory/20'
                  }`}
                >
                  {active && <Check size={10} className="text-noir" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 2 · Service ─────────────────────────────────────────────────────────

function StepService({
  category,
  selected,
  onSelect,
}: {
  category: string;
  selected: Service | null;
  onSelect: (s: Service) => void;
}) {
  const list = services.filter((s) => s.category === category);
  return (
    <div>
      <h2 className="font-display text-[2.4rem] text-ivory leading-tight mb-1.5">
        Choose a Service
      </h2>
      <p className="text-ivory/40 font-sans font-light text-sm mb-7">
        Select the treatment you'd like.
      </p>
      <div className="space-y-2">
        {list.map((s) => {
          const active = selected?.id === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              className={`w-full text-left p-5 border transition-all duration-300 ${
                active
                  ? 'border-gold/45 bg-gold/5'
                  : 'border-ivory/10 hover:border-ivory/22 hover:bg-ivory/3'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-xl text-ivory mb-0.5">{s.name}</h4>
                  <p className="text-ivory/38 font-sans text-xs leading-relaxed">
                    {s.description}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-display text-2xl text-gold leading-none">
                    ${s.price}
                  </div>
                  <div className="text-ivory/28 text-[11px] font-sans mt-0.5">
                    touch-up ${s.touchUpPrice}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 3 · Date ────────────────────────────────────────────────────────────

function StepDate({
  selected,
  onSelect,
  calMonth,
  onCalMonthChange,
}: {
  selected: string;
  onSelect: (date: string) => void;
  calMonth: CalMonth;
  onCalMonthChange: (m: CalMonth) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 60);

  const isAvailable = (day: number) => {
    const d = new Date(calMonth.year, calMonth.month, day);
    return d >= today && d <= maxDate && d.getDay() !== 0; // No Sundays
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    calMonth.month === today.getMonth() &&
    calMonth.year === today.getFullYear();

  const toLabel = (day: number) =>
    `${MONTHS[calMonth.month]} ${day}, ${calMonth.year}`;

  const prevMonth = () =>
    onCalMonthChange(
      calMonth.month === 0
        ? { year: calMonth.year - 1, month: 11 }
        : { year: calMonth.year, month: calMonth.month - 1 },
    );

  const nextMonth = () =>
    onCalMonthChange(
      calMonth.month === 11
        ? { year: calMonth.year + 1, month: 0 }
        : { year: calMonth.year, month: calMonth.month + 1 },
    );

  const daysInMonth = getDaysInMonth(calMonth.year, calMonth.month);
  const firstDay = getFirstDayOfMonth(calMonth.year, calMonth.month);

  return (
    <div>
      <h2 className="font-display text-[2.4rem] text-ivory leading-tight mb-1.5">
        Choose a Date
      </h2>
      <p className="text-ivory/40 font-sans font-light text-sm mb-7">
        Select your preferred appointment date.
      </p>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={prevMonth}
          className="text-ivory/35 hover:text-ivory transition-colors p-1"
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="font-display text-xl text-ivory">
          {MONTHS[calMonth.month]} {calMonth.year}
        </span>
        <button
          onClick={nextMonth}
          className="text-ivory/35 hover:text-ivory transition-colors p-1"
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1.5">
        {WEEK_DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[9px] tracking-wider text-ivory/25 font-sans uppercase py-1.5"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const label = toLabel(day);
          const avail = isAvailable(day);
          const sel = selected === label;

          return (
            <button
              key={day}
              disabled={!avail}
              onClick={() => avail && onSelect(label)}
              className={`
                aspect-square flex items-center justify-center text-sm font-sans rounded-sm transition-all duration-200
                ${sel
                  ? 'bg-gold text-noir font-medium'
                  : avail
                  ? 'text-ivory/80 hover:bg-ivory/10'
                  : 'text-ivory/18 cursor-not-allowed'
                }
                ${isToday(day) && !sel ? 'ring-1 ring-gold/35' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {selected && (
        <p className="mt-5 text-center text-xs font-sans text-gold/70 tracking-wide">
          {selected}
        </p>
      )}
    </div>
  );
}

// ─── Step 4 · Time ────────────────────────────────────────────────────────────

function StepTime({
  date,
  selected,
  onSelect,
}: {
  date: string;
  selected: string;
  onSelect: (t: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-[2.4rem] text-ivory leading-tight mb-1.5">
        Choose a Time
      </h2>
      <p className="text-ivory/40 font-sans font-light text-sm mb-1">
        {date}
      </p>
      <p className="text-ivory/25 font-sans text-xs mb-7">
        Times shown in your local timezone.
      </p>

      <div className="grid grid-cols-3 gap-2">
        {TIME_SLOTS.map((t) => {
          const taken = isSlotTaken(date, t);
          const active = selected === t;
          return (
            <button
              key={t}
              disabled={taken}
              onClick={() => !taken && onSelect(t)}
              className={`py-3 text-xs font-sans border transition-all duration-200
                ${active
                  ? 'border-gold bg-gold/10 text-gold'
                  : taken
                  ? 'border-ivory/6 text-ivory/18 cursor-not-allowed line-through'
                  : 'border-ivory/14 text-ivory/70 hover:border-ivory/28 hover:bg-ivory/4'
                }
              `}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 5 · Contact ─────────────────────────────────────────────────────────

const inputCls =
  'w-full bg-[#1C1813] border border-ivory/20 px-4 py-3.5 rounded-sm text-ivory text-sm font-sans placeholder-ivory/30 focus:outline-none focus:border-gold/60 focus:bg-[#201D18] transition-colors duration-300';
const labelCls =
  'block text-[10px] tracking-[0.3em] uppercase text-ivory/55 font-sans mb-2';

function StepContact({
  form,
  onChange,
}: {
  form: BookingFormData;
  onChange: (field: keyof BookingFormData, value: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-[2.4rem] text-ivory leading-tight mb-1.5">
        Your Details
      </h2>
      <p className="text-ivory/40 font-sans font-light text-sm mb-7">
        Almost done — fill in your information below.
      </p>

      <div className="space-y-4">
        <div>
          <label className={labelCls}>Full Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Your full name"
            className={inputCls}
            autoComplete="name"
          />
        </div>
        <div>
          <label className={labelCls}>Phone Number *</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
            className={inputCls}
            autoComplete="tel"
            inputMode="tel"
          />
        </div>
        <div>
          <label className={labelCls}>Email Address *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="your@email.com"
            className={inputCls}
            autoComplete="email"
            inputMode="email"
          />
        </div>
        <div>
          <label className={labelCls}>Notes or Special Requests</label>
          <textarea
            value={form.notes}
            onChange={(e) => onChange('notes', e.target.value)}
            placeholder="Anything we should know about your appointment…"
            rows={3}
            className={`${inputCls} resize-none`}
          />
        </div>
      </div>

      {/* Summary */}
      <div className="mt-7 p-5 border border-ivory/8 bg-noir/25">
        <div className="text-[9px] tracking-[0.45em] uppercase text-gold/55 font-sans mb-3">
          Booking Summary
        </div>
        <div className="space-y-1.5 text-[13px] font-sans">
          <Row label="Service" value={form.service?.name ?? '—'} />
          <Row label="Date" value={form.date || '—'} />
          <Row label="Time" value={form.time || '—'} />
          <div className="pt-2 mt-2 border-t border-ivory/8">
            <Row label="Deposit Required" value={`$${form.service?.deposit}`} gold />
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  gold,
}: {
  label: string;
  value: string;
  gold?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-ivory/40">{label}</span>
      <span className={gold ? 'text-gold' : 'text-ivory/80'}>{value}</span>
    </div>
  );
}

// ─── Step 6 · Success ─────────────────────────────────────────────────────────

function StepSuccess({
  form,
  onClose,
}: {
  form: BookingFormData;
  onClose: () => void;
}) {
  return (
    <div className="text-center py-4">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 14 }}
        className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-7"
      >
        <Check size={24} className="text-gold" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <h2 className="font-display text-4xl text-ivory mb-2.5">
          Booking Requested
        </h2>
        <p className="text-ivory/45 font-sans font-light text-sm max-w-[240px] mx-auto mb-8 leading-relaxed">
          Thank you, {form.name}. Your request has been received and we'll confirm shortly via email.
        </p>

        <div className="bg-noir/30 border border-ivory/8 p-5 text-left mb-8 max-w-[260px] mx-auto">
          <div className="space-y-2 text-[13px] font-sans">
            <Row label="Service" value={form.service?.name ?? '—'} />
            <Row label="Date" value={form.date || '—'} />
            <Row label="Time" value={form.time || '—'} />
            <div className="pt-2 mt-2 border-t border-ivory/8">
              <Row label="Deposit" value={`$${form.service?.deposit}`} gold />
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-8 py-3 border border-ivory/18 text-ivory/55 hover:text-ivory hover:border-ivory/35 font-sans text-[10px] tracking-[0.3em] uppercase transition-all duration-300"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
