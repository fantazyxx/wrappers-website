'use client';

import { Fragment, useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import eurAll from '@/lib/img/Wrapper_EURO/All.webp';
import eur500 from '@/lib/img/Wrapper_EURO/500.webp';
import eur1000 from '@/lib/img/Wrapper_EURO/1000.webp';
import eur2000 from '@/lib/img/Wrapper_EURO/2000.webp';
import eur5000 from '@/lib/img/Wrapper_EURO/5000.webp';
import eur10000 from '@/lib/img/Wrapper_EURO/10000.webp';
import eur20000 from '@/lib/img/Wrapper_EURO/20000.webp';
import eur50000 from '@/lib/img/Wrapper_EURO/50000.webp';
import czkAll from '@/lib/img/CZ/MAIN.webp';
import czk10000 from '@/lib/img/CZ/10000.webp';
import czk20000 from '@/lib/img/CZ/20000.webp';
import czk50000 from '@/lib/img/CZ/50000.webp';
import czk100000 from '@/lib/img/CZ/100000.webp';
import czk200000 from '@/lib/img/CZ/200000.webp';
import czk500000 from '@/lib/img/CZ/500000.webp';
import uahMain from '@/lib/img/UAH/Main.webp';
import customAll from '@/lib/img/CUSTOM_EUR/All.webp';
import custom1000 from '@/lib/img/CUSTOM_EUR/1000.webp';
import custom2000 from '@/lib/img/CUSTOM_EUR/2000.webp';
import custom5000 from '@/lib/img/CUSTOM_EUR/5000.webp';
import custom10000 from '@/lib/img/CUSTOM_EUR/10000.webp';
import custom20000 from '@/lib/img/CUSTOM_EUR/20000.webp';
import custom50000 from '@/lib/img/CUSTOM_EUR/50000.webp';

interface Specs {
  /** Band length when laid flat, mm. Wraps around the bundle. */
  widthMm: number;
  /** Band height (strap thickness), mm. */
  heightMm: number;
  /** Paper material(s) we offer. */
  paper: string;
  /** ECB-coded printed band color for this denomination. */
  bandColor: string;
  /** Hex value for the small color dot in the UI. */
  bandColorHex: string;
  /** Production style — 'Standard' for stock items, 'Custom' for branded runs. */
  style?: string;
  /** True if the value was confirmed against an external spec sheet. */
  confirmed?: boolean;
}

interface Denomination {
  id: string;
  value: string;
  detail: string;
  description: string;
  image?: StaticImageData;
  specs?: Specs;
}

interface Currency {
  id: string;
  name: string;
  symbol: string;
  flag: string;
  description: string;
  heroImage?: StaticImageData;
  denominations: Denomination[];
}

const eurDenominations: Denomination[] = [
  {
    id: 'eur-500',
    value: '€500',
    detail: '100 × €5 notes',
    description: 'Standard 100-note bundle band',
    image: eur500,
    specs: {
      widthMm: 75,
      heightMm: 40,
      paper: 'Offset / Kraft',
      bandColor: 'Grey',
      bandColorHex: '#9CA3AF',
      confirmed: true,
    },
  },
  {
    id: 'eur-1000',
    value: '€1,000',
    detail: '100 × €10 notes',
    description: 'Standard 100-note bundle band',
    image: eur1000,
    specs: {
      widthMm: 80,
      heightMm: 40,
      paper: 'Offset / Kraft',
      bandColor: 'Red',
      bandColorHex: '#D33B3B',
      confirmed: true,
    },
  },
  {
    id: 'eur-2000',
    value: '€2,000',
    detail: '100 × €20 notes',
    description: 'Standard 100-note bundle band',
    image: eur2000,
    specs: {
      widthMm: 85,
      heightMm: 40,
      paper: 'Offset / Kraft',
      bandColor: 'Blue',
      bandColorHex: '#2F6FB6',
      confirmed: true,
    },
  },
  {
    id: 'eur-5000',
    value: '€5,000',
    detail: '100 × €50 notes',
    description: 'Standard 100-note bundle band',
    image: eur5000,
    specs: {
      widthMm: 90,
      heightMm: 40,
      paper: 'Offset / Kraft',
      bandColor: 'Orange',
      bandColorHex: '#E18A2B',
      confirmed: true,
    },
  },
  {
    id: 'eur-10000',
    value: '€10,000',
    detail: '100 × €100 notes',
    description: 'Standard 100-note bundle band',
    image: eur10000,
    specs: {
      widthMm: 90,
      heightMm: 40,
      paper: 'Offset / Kraft',
      bandColor: 'Green',
      bandColorHex: '#3F8F4E',
      confirmed: true,
    },
  },
  {
    id: 'eur-20000',
    value: '€20,000',
    detail: '100 × €200 notes',
    description: 'Standard 100-note bundle band',
    image: eur20000,
    specs: {
      widthMm: 91,
      heightMm: 40,
      paper: 'Offset / Kraft',
      bandColor: 'Yellow',
      bandColorHex: '#D9B23A',
      confirmed: true,
    },
  },
  {
    id: 'eur-50000',
    value: '€50,000',
    detail: '100 × €500 notes',
    description: 'Standard 100-note bundle band',
    image: eur50000,
    specs: {
      widthMm: 94,
      heightMm: 40,
      paper: 'Offset / Kraft',
      bandColor: 'Violet',
      bandColorHex: '#7E5BB8',
      confirmed: true,
    },
  },
];

const currencies: Currency[] = [
  {
    id: 'eur',
    name: 'Euro',
    symbol: 'EUR',
    flag: 'EU',
    description:
      'EUR banknote bands for standard 100-note bundles. Available for all common euro denominations from €5 to €500 notes, with custom printing and ECB-style color coding.',
    heroImage: eurAll,
    denominations: eurDenominations,
  },
  {
    id: 'czk',
    name: 'Czech Koruna',
    symbol: 'CZK',
    flag: 'CZ',
    description:
      'CZK banknote bands for standard 100-note bundles. Available for all current Czech koruna banknote denominations: 100, 200, 500, 1,000, 2,000 and 5,000 Kč.',
    heroImage: czkAll,
    denominations: [
      {
        id: 'czk-10000',
        value: '10,000 Kč',
        detail: '100 × 100 Kč notes',
        description: 'Standard 100-note bundle band',
        image: czk10000,
        specs: {
          widthMm: 84,
          heightMm: 40,
          paper: 'Offset / Kraft',
          bandColor: 'Blue',
          bandColorHex: '#2F6FB6',
          confirmed: true,
        },
      },
      {
        id: 'czk-20000',
        value: '20,000 Kč',
        detail: '100 × 200 Kč notes',
        description: 'Standard 100-note bundle band',
        image: czk20000,
        specs: {
          widthMm: 84,
          heightMm: 40,
          paper: 'Offset / Kraft',
          bandColor: 'Yellow',
          bandColorHex: '#D9B23A',
          confirmed: true,
        },
      },
      {
        id: 'czk-50000',
        value: '50,000 Kč',
        detail: '100 × 500 Kč notes',
        description: 'Standard 100-note bundle band',
        image: czk50000,
        specs: {
          widthMm: 84,
          heightMm: 40,
          paper: 'Offset / Kraft',
          bandColor: 'Black',
          bandColorHex: '#1F2330',
          confirmed: true,
        },
      },
      {
        id: 'czk-100000',
        value: '100,000 Kč',
        detail: '100 × 1,000 Kč notes',
        description: 'Standard 100-note bundle band',
        image: czk100000,
        specs: {
          widthMm: 88,
          heightMm: 40,
          paper: 'Offset / Kraft',
          bandColor: 'Orange',
          bandColorHex: '#E18A2B',
          confirmed: true,
        },
      },
      {
        id: 'czk-200000',
        value: '200,000 Kč',
        detail: '100 × 2,000 Kč notes',
        description: 'Standard 100-note bundle band',
        image: czk200000,
        specs: {
          widthMm: 88,
          heightMm: 40,
          paper: 'Offset / Kraft',
          bandColor: 'Brown',
          bandColorHex: '#8B5A2B',
          confirmed: true,
        },
      },
      {
        id: 'czk-500000',
        value: '500,000 Kč',
        detail: '100 × 5,000 Kč notes',
        description: 'Standard 100-note bundle band',
        image: czk500000,
        specs: {
          widthMm: 88,
          heightMm: 40,
          paper: 'Offset / Kraft',
          bandColor: 'Violet',
          bandColorHex: '#7E5BB8',
          confirmed: true,
        },
      },
    ],
  },
  {
    id: 'uah',
    name: 'Ukrainian Hryvnia',
    symbol: 'UAH',
    flag: 'UA',
    description:
      'UAH banknote bands for standard 100-note bundles. Custom print, color coding and branding available for Ukrainian hryvnia cash handling.',
    heroImage: uahMain,
    denominations: [
      { id: 'uah-10000', value: '10,000 UAH', detail: '100 × 100 UAH notes', description: 'Standard 100-note bundle band' },
      { id: 'uah-20000', value: '20,000 UAH', detail: '100 × 200 UAH notes', description: 'Standard 100-note bundle band' },
      { id: 'uah-50000', value: '50,000 UAH', detail: '100 × 500 UAH notes', description: 'Standard 100-note bundle band' },
      { id: 'uah-100000', value: '100,000 UAH', detail: '100 × 1,000 UAH notes', description: 'Standard 100-note bundle band' },
    ],
  },
  {
    id: 'custom',
    name: 'Custom EUR',
    symbol: 'CUSTOM',
    flag: 'EU',
    description:
      'Custom-branded EUR banknote bands for standard 100-note bundles. Same denominations as our stock EUR range, fully tailored to your corporate identity — logo, colors and typography to match your brand.',
    heroImage: customAll,
    denominations: [
      {
        id: 'custom-1000',
        value: '€1,000',
        detail: '100 × €10 notes',
        description: 'Custom-branded 100-note bundle band',
        image: custom1000,
        specs: {
          widthMm: 80,
          heightMm: 40,
          paper: 'Offset / Kraft',
          bandColor: 'Red',
          bandColorHex: '#D33B3B',
          style: 'Custom',
          confirmed: true,
        },
      },
      {
        id: 'custom-2000',
        value: '€2,000',
        detail: '100 × €20 notes',
        description: 'Custom-branded 100-note bundle band',
        image: custom2000,
        specs: {
          widthMm: 85,
          heightMm: 40,
          paper: 'Offset / Kraft',
          bandColor: 'Blue',
          bandColorHex: '#2F6FB6',
          style: 'Custom',
          confirmed: true,
        },
      },
      {
        id: 'custom-5000',
        value: '€5,000',
        detail: '100 × €50 notes',
        description: 'Custom-branded 100-note bundle band',
        image: custom5000,
        specs: {
          widthMm: 90,
          heightMm: 40,
          paper: 'Offset / Kraft',
          bandColor: 'Orange',
          bandColorHex: '#E18A2B',
          style: 'Custom',
          confirmed: true,
        },
      },
      {
        id: 'custom-10000',
        value: '€10,000',
        detail: '100 × €100 notes',
        description: 'Custom-branded 100-note bundle band',
        image: custom10000,
        specs: {
          widthMm: 90,
          heightMm: 40,
          paper: 'Offset / Kraft',
          bandColor: 'Green',
          bandColorHex: '#3F8F4E',
          style: 'Custom',
          confirmed: true,
        },
      },
      {
        id: 'custom-20000',
        value: '€20,000',
        detail: '100 × €200 notes',
        description: 'Custom-branded 100-note bundle band',
        image: custom20000,
        specs: {
          widthMm: 91,
          heightMm: 40,
          paper: 'Offset / Kraft',
          bandColor: 'Yellow',
          bandColorHex: '#D9B23A',
          style: 'Custom',
          confirmed: true,
        },
      },
      {
        id: 'custom-50000',
        value: '€50,000',
        detail: '100 × €500 notes',
        description: 'Custom-branded 100-note bundle band',
        image: custom50000,
        specs: {
          widthMm: 94,
          heightMm: 40,
          paper: 'Offset / Kraft',
          bandColor: 'Violet',
          bandColorHex: '#7E5BB8',
          style: 'Custom',
          confirmed: true,
        },
      },
    ],
  },
];

/**
 * Track how many columns the responsive grid is currently rendering with.
 * Tailwind breakpoints: default → sm (640px) → lg (1024px) → xl (1280px).
 */
function useGridColumns(itemCount: number) {
  const [cols, setCols] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update = () => {
      const w = window.innerWidth;
      if (itemCount >= 7) {
        if (w >= 1280) setCols(4);
        else if (w >= 1024) setCols(3);
        else if (w >= 640) setCols(2);
        else setCols(1);
      } else if (itemCount === 6) {
        if (w >= 1024) setCols(3);
        else if (w >= 640) setCols(2);
        else setCols(1);
      } else {
        if (w >= 1024) setCols(4);
        else if (w >= 640) setCols(2);
        else setCols(1);
      }
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [itemCount]);

  return cols;
}

function DenominationCard({
  denomination,
  index,
  currencySymbol,
  isActive,
  onSelect,
}: {
  denomination: Denomination;
  index: number;
  currencySymbol: string;
  isActive: boolean;
  onSelect: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isInteractive = !!denomination.specs;

  return (
    <motion.button
      type="button"
      onClick={isInteractive ? onSelect : undefined}
      aria-pressed={isInteractive ? isActive : undefined}
      disabled={!isInteractive}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: prefersReducedMotion ? 0 : index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative bg-white rounded-xl p-6 border text-left flex flex-col gap-4 transition-all duration-300 ${
        isInteractive
          ? 'cursor-pointer hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2'
          : 'cursor-default'
      } ${
        isActive
          ? 'border-gold shadow-md ring-1 ring-gold/30 -translate-y-0.5'
          : 'border-gray-100 hover:border-gold/40'
      }`}
    >
      {/* Top row: currency pill + optional band color dot */}
      <div className="flex items-center justify-between">
        <span className="inline-flex w-fit items-center px-2.5 py-1 rounded-full text-xs font-bold bg-navy/5 text-navy tracking-wide">
          {currencySymbol}
        </span>
        {denomination.specs && (
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-500"
            title={`Band color: ${denomination.specs.bandColor}`}
          >
            <span
              className="h-2.5 w-2.5 rounded-full ring-1 ring-black/10"
              style={{ backgroundColor: denomination.specs.bandColorHex }}
              aria-hidden="true"
            />
            {denomination.specs.bandColor}
          </span>
        )}
      </div>

      {/* Denomination value */}
      <div>
        <div className="text-2xl lg:text-3xl font-bold text-navy tracking-tight leading-none mb-1">
          {denomination.value}
        </div>
        <div className="text-sm font-semibold text-gold">{denomination.detail}</div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400">{denomination.description}</p>

      {/* Footer row: hint */}
      {isInteractive && (
        <div
          className={`flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase transition-colors ${
            isActive ? 'text-gold' : 'text-gray-300 group-hover:text-gold/70'
          }`}
        >
          {isActive ? 'Selected' : 'View details'}
          <svg
            className={`h-3 w-3 transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`}
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 2.5L7.5 6L4 9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Active accent bar */}
      <div
        className={`absolute bottom-0 left-6 right-6 h-0.5 bg-gold rounded-full transition-transform duration-300 ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
        aria-hidden="true"
      />
    </motion.button>
  );
}

function SpecsPanel({
  denomination,
  currencySymbol,
  onClose,
  arrowOffsetPercent,
  cols,
}: {
  denomination: Denomination;
  currencySymbol: string;
  onClose: () => void;
  /** Horizontal position (0–100%) along the panel where the connector arrow sits. */
  arrowOffsetPercent: number;
  cols: number;
}) {
  if (!denomination.specs) return null;
  const s = denomination.specs;
  const beschreibung = `Band ${denomination.detail.replace(' notes', '')}`;

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: 'Description', value: beschreibung },
    { label: 'Bundle value', value: denomination.value },
    { label: 'Width', value: `${s.widthMm} mm` },
    { label: 'Height', value: `${s.heightMm} mm` },
    {
      label: 'Band color',
      value: (
        <span className="inline-flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full ring-1 ring-black/10"
            style={{ backgroundColor: s.bandColorHex }}
            aria-hidden="true"
          />
          {s.bandColor}
        </span>
      ),
    },
    { label: 'Paper color', value: 'White' },
    { label: 'Paper type', value: s.paper },
    { label: 'Style', value: s.style ?? 'Standard' },
  ];

  return (
    <motion.div
      key={denomination.id}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="col-span-full overflow-hidden"
    >
      <div className="relative mt-4 rounded-2xl shadow-md ring-1 ring-navy/10 overflow-hidden">
        {/* Connector arrow pointing up to the active card (matches the navy header) */}
        {cols > 1 && (
          <div
            className="absolute -top-[7px] h-3 w-3 rotate-45 bg-navy"
            style={{ left: `calc(${arrowOffsetPercent}% - 6px)` }}
            aria-hidden="true"
          />
        )}

        {/* Vertical band-color stripe on the left — instant visual ID for the
            selected denomination (Red, Blue, Orange…) */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5"
          style={{ backgroundColor: s.bandColorHex }}
          aria-hidden="true"
        />

        {/* Navy header */}
        <div className="relative flex items-start justify-between gap-4 px-5 sm:px-6 py-4 bg-navy text-white">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/10 text-gold tracking-widest ring-1 ring-white/15">
              {currencySymbol}
            </span>
            <div>
              <div className="text-lg font-bold leading-none">{denomination.value}</div>
              <div className="text-xs font-semibold text-gold-light mt-1.5 flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full ring-1 ring-white/30"
                  style={{ backgroundColor: s.bandColorHex }}
                  aria-hidden="true"
                />
                {denomination.detail}
                <span className="text-white/40">·</span>
                <span className="text-white/70 font-medium">{s.bandColor} band</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close specifications"
            className="text-white/50 hover:text-white transition-colors p-1 -m-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3.5 3.5l9 9M12.5 3.5l-9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body — soft cream/blue tint contrasts with white badges above */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 bg-[#F6F7FB] sm:divide-x sm:divide-navy/5">
          {rows.map((row, i) => {
            const half = Math.ceil(rows.length / 2);
            const isLeftCol = i < half;
            const isLastInLeft = i === half - 1;
            const isLastInRight = i === rows.length - 1;
            return (
              <div
                key={row.label}
                className={`flex items-center justify-between gap-4 px-5 sm:px-6 py-2.5 text-sm ${
                  isLeftCol
                    ? `border-b border-navy/5 ${isLastInLeft ? 'sm:border-b-0' : ''}`
                    : `border-b border-navy/5 ${isLastInRight ? 'border-b-0' : ''}`
                }`}
              >
                <dt className="text-gray-500">{row.label}</dt>
                <dd className="font-semibold text-navy text-right">{row.value}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const [activeTab, setActiveTab] = useState<string>('eur');
  const [selectedById, setSelectedById] = useState<Record<string, string | null>>({});

  const activeCurrency = currencies.find((c) => c.id === activeTab)!;
  const selectedDenomId = selectedById[activeTab] ?? null;
  const selectedDenom = activeCurrency.denominations.find((d) => d.id === selectedDenomId) ?? null;

  const cols = useGridColumns(activeCurrency.denominations.length);

  // Index of the active badge and the last index in its row — that's where we
  // splice the spec panel (full-width col-span) so the next row gets pushed down.
  const activeIndex = selectedDenomId
    ? activeCurrency.denominations.findIndex((d) => d.id === selectedDenomId)
    : -1;
  const rowOfActive = activeIndex >= 0 ? Math.floor(activeIndex / cols) : -1;
  const lastIndexInActiveRow =
    rowOfActive >= 0
      ? Math.min((rowOfActive + 1) * cols - 1, activeCurrency.denominations.length - 1)
      : -1;
  const colOfActive = activeIndex >= 0 ? activeIndex % cols : 0;
  const itemsInActiveRow = lastIndexInActiveRow - rowOfActive * cols + 1;
  // % position of the active card's center within the active row (used for the
  // connector arrow). Clamp to the actual rendered cells so the arrow lines up
  // even on the last partial row.
  const arrowOffsetPercent =
    itemsInActiveRow > 0 ? ((colOfActive + 0.5) / itemsInActiveRow) * 100 : 50;

  const heroImage = selectedDenom?.image ?? activeCurrency.heroImage ?? null;
  const heroAlt = selectedDenom
    ? `${activeCurrency.name} band — ${selectedDenom.value} (${selectedDenom.detail})`
    : `${activeCurrency.name} currency bands — full denomination range`;

  const handleSelect = (denomId: string) => {
    setSelectedById((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab] === denomId ? null : denomId,
    }));
  };

  const handleClose = () => {
    setSelectedById((prev) => ({ ...prev, [activeTab]: null }));
  };

  return (
    <section id="products" className="section-padding bg-white">
      <div className="container-inner">
        <SectionHeader
          eyebrow="Product Range"
          heading="Currency Bands for Every Denomination"
          subheading="Precision-printed banknote straps for major European currencies. Custom specifications available on request."
        />

        {/* Currency tabs */}
        <AnimatedSection className="flex justify-center mb-10">
          <div
            className="inline-flex p-1 bg-gray-100 rounded-xl gap-1"
            role="tablist"
            aria-label="Currency selection"
          >
            {currencies.map((currency) => (
              <button
                key={currency.id}
                role="tab"
                aria-selected={activeTab === currency.id}
                aria-controls={`tabpanel-${currency.id}`}
                onClick={() => setActiveTab(currency.id)}
                className={`relative px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === currency.id
                    ? 'bg-white text-navy shadow-sm ring-1 ring-gray-200/50'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className="text-xs tracking-widest font-bold">{currency.flag}</span>
                <span className="ml-2">{currency.symbol}</span>
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-label={`${activeCurrency.name} currency bands`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Currency description */}
            <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
              {activeCurrency.description}
            </p>

            {/* Hero image — switches between "All" and the selected denomination */}
            {heroImage && (
              <div className="mb-8 flex justify-center">
                <div className="relative w-full max-w-2xl rounded-[28px] overflow-hidden shadow-md ring-1 ring-navy/5 bg-[#F6F4EE]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedDenom?.id ?? `${activeTab}-all`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={heroImage}
                        alt={heroAlt}
                        className="w-full h-auto"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
                        priority={false}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {selectedDenom && (
                    <div className="absolute top-3 left-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm ring-1 ring-black/5 text-xs font-semibold text-navy">
                      <span className="text-gold tracking-wide">{activeCurrency.symbol}</span>
                      <span>{selectedDenom.value}</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-500 font-medium">{selectedDenom.detail}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Denomination grid — spec panel is spliced inline after the active row */}
            <div
              className={`grid gap-4 ${
                activeCurrency.denominations.length >= 7
                  ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : activeCurrency.denominations.length === 6
                  ? 'sm:grid-cols-2 lg:grid-cols-3'
                  : 'sm:grid-cols-2 lg:grid-cols-4'
              }`}
            >
              {activeCurrency.denominations.map((denom, i) => (
                <Fragment key={denom.id}>
                  <DenominationCard
                    denomination={denom}
                    index={i}
                    currencySymbol={activeCurrency.symbol}
                    isActive={selectedDenomId === denom.id}
                    onSelect={() => handleSelect(denom.id)}
                  />
                  {/* Spec panel inserted after the last card of the active row */}
                  {i === lastIndexInActiveRow && (
                    <AnimatePresence initial={false} mode="wait">
                      {selectedDenom && selectedDenom.specs && (
                        <SpecsPanel
                          denomination={selectedDenom}
                          currencySymbol={activeCurrency.symbol}
                          onClose={handleClose}
                          arrowOffsetPercent={arrowOffsetPercent}
                          cols={cols}
                        />
                      )}
                    </AnimatePresence>
                  )}
                </Fragment>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <AnimatedSection className="text-center mt-12">
          <p className="text-sm text-gray-400 mb-4">
            Need a different currency or custom denomination? We can accommodate.
          </p>
          <Button variant="secondary" size="md" href="#contact">
            Request Custom Quote
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
