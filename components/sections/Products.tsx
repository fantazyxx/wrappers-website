'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import eurBandsImg from '@/lib/img/Nano_2.png';
import czkBandsImg from '@/lib/img/Nano_3.png';

const currencyProductImages: Record<string, StaticImageData | null> = {
  eur: eurBandsImg,
  czk: czkBandsImg,
  uah: null,
};

interface Denomination {
  value: string;
  detail: string;
  description: string;
}

interface Currency {
  id: string;
  name: string;
  symbol: string;
  flag: string;
  description: string;
  denominations: Denomination[];
}

const currencies: Currency[] = [
  {
    id: 'eur',
    name: 'Euro',
    symbol: 'EUR',
    flag: 'EU',
    description: 'EUR banknote bands for standard 100-note bundles. Available for common euro denominations from €10 to €500 notes, with custom printing and color coding.',
    denominations: [
      { value: '€1,000', detail: '100 × €10 notes', description: 'Standard 100-note bundle band' },
      { value: '€2,000', detail: '100 × €20 notes', description: 'Standard 100-note bundle band' },
      { value: '€5,000', detail: '100 × €50 notes', description: 'Standard 100-note bundle band' },
      { value: '€10,000', detail: '100 × €100 notes', description: 'Standard 100-note bundle band' },
      { value: '€20,000', detail: '100 × €200 notes', description: 'Standard 100-note bundle band' },
      { value: '€50,000', detail: '100 × €500 notes', description: 'Standard 100-note bundle band' },
    ],
  },
  {
    id: 'czk',
    name: 'Czech Koruna',
    symbol: 'CZK',
    flag: 'CZ',
    description: 'CZK banknote bands for standard 100-note bundles. Available for all current Czech koruna banknote denominations: 100, 200, 500, 1,000, 2,000 and 5,000 Kč.',
    denominations: [
      { value: '10,000 Kč', detail: '100 × 100 Kč notes', description: 'Standard 100-note bundle band' },
      { value: '20,000 Kč', detail: '100 × 200 Kč notes', description: 'Standard 100-note bundle band' },
      { value: '50,000 Kč', detail: '100 × 500 Kč notes', description: 'Standard 100-note bundle band' },
      { value: '100,000 Kč', detail: '100 × 1,000 Kč notes', description: 'Standard 100-note bundle band' },
      { value: '200,000 Kč', detail: '100 × 2,000 Kč notes', description: 'Standard 100-note bundle band' },
      { value: '500,000 Kč', detail: '100 × 5,000 Kč notes', description: 'Standard 100-note bundle band' },
    ],
  },
  {
    id: 'uah',
    name: 'Ukrainian Hryvnia',
    symbol: 'UAH',
    flag: 'UA',
    description: 'UAH banknote bands for standard 100-note bundles. Custom print, color coding and branding available for Ukrainian hryvnia cash handling.',
    denominations: [
      { value: '10,000 UAH', detail: '100 × 100 UAH notes', description: 'Standard 100-note bundle band' },
      { value: '20,000 UAH', detail: '100 × 200 UAH notes', description: 'Standard 100-note bundle band' },
      { value: '50,000 UAH', detail: '100 × 500 UAH notes', description: 'Standard 100-note bundle band' },
      { value: '100,000 UAH', detail: '100 × 1,000 UAH notes', description: 'Standard 100-note bundle band' },
    ],
  },
];

function DenominationCard({
  denomination,
  index,
  currencySymbol,
}: {
  denomination: Denomination;
  index: number;
  currencySymbol: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-xl p-6 border border-gray-100 hover:border-gold/40 hover:shadow-md transition-all duration-300 flex flex-col gap-4"
    >
      {/* Currency pill */}
      <span className="inline-flex w-fit items-center px-2.5 py-1 rounded-full text-xs font-bold bg-navy/5 text-navy tracking-wide">
        {currencySymbol}
      </span>

      {/* Denomination value */}
      <div>
        <div className="text-2xl lg:text-3xl font-bold text-navy tracking-tight leading-none mb-1">
          {denomination.value}
        </div>
        <div className="text-sm font-semibold text-gold">{denomination.detail}</div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400">{denomination.description}</p>

      {/* Hover accent bar */}
      <div
        className="absolute bottom-0 left-6 right-6 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"
        aria-hidden="true"
      />
    </motion.div>
  );
}

export default function Products() {
  const [activeTab, setActiveTab] = useState<string>('eur');
  const activeCurrency = currencies.find((c) => c.id === activeTab)!;

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

            {/* Currency product image */}
            {currencyProductImages[activeTab] && (
              <div className="mb-8 flex justify-center">
                <Image
                  src={currencyProductImages[activeTab]!}
                  alt={`${activeCurrency.name} currency bands — full denomination range`}
                  className="w-full max-w-2xl h-auto rounded-[28px] shadow-md ring-1 ring-navy/5"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
                  loading="lazy"
                />
              </div>
            )}

            {/* Denomination grid */}
            <div
              className={`grid gap-4 ${
                activeCurrency.denominations.length === 6
                  ? 'sm:grid-cols-2 lg:grid-cols-3'
                  : 'sm:grid-cols-2 lg:grid-cols-4'
              }`}
            >
              {activeCurrency.denominations.map((denom, i) => (
                <DenominationCard
                  key={denom.value}
                  denomination={denom}
                  index={i}
                  currencySymbol={activeCurrency.symbol}
                />
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
