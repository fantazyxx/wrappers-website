'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import heroProductImg from '@/lib/img/1.png';
import { fadeInUp, fadeInRight, staggerContainer } from '@/lib/animations';
import Button from '@/components/ui/Button';

const trustBadges = [
  {
    label: 'Direct Manufacturer',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    label: 'Custom Branding',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    label: 'Free Samples',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'EU Shipping',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : staggerContainer;

  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : fadeInUp;

  const imageVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : fadeInRight;

  return (
    <section
      className="relative min-h-screen flex items-center bg-[#F4F6FB] overflow-hidden pt-16 md:pt-20"
      aria-label="Hero"
    >
      {/* Ambient background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full bg-navy/5 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-gold/3 blur-2xl" />
      </div>

      <div className="relative container-inner py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left: Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow tag */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-gold/10 text-gold border border-gold/20 rounded-full px-4 py-1.5 text-sm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-slow flex-shrink-0" aria-hidden="true" />
                Direct Manufacturer &middot; EU Delivery
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-display-xl font-bold text-navy leading-none mb-6 text-balance"
            >
              Precision{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Currency Bands</span>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-3 bg-gold/20 -skew-x-2"
                  aria-hidden="true"
                />
              </span>{' '}
              for Banks and Cash Centers
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-gray-500 leading-relaxed mb-9 max-w-xl"
            >
              Custom-printed banknote bands for banks, exchange offices, CIT companies and cash processing centers across Europe.{' '}
              <strong className="text-navy font-semibold">Free samples.</strong>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button variant="primary" size="lg" href="#contact">
                Request Free Samples
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Button>
              <Button variant="secondary" size="lg" href="#products">
                View Products
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={containerVariants}
              className="flex flex-wrap gap-3"
            >
              {trustBadges.map((badge) => (
                <motion.div
                  key={badge.label}
                  variants={itemVariants}
                  className="flex items-center gap-2.5 bg-white rounded-lg px-4 py-2.5 shadow-sm border border-gray-100 hover:border-gold/30 transition-colors duration-200"
                >
                  <span className="text-gold">{badge.icon}</span>
                  <span className="text-sm font-semibold text-navy whitespace-nowrap">{badge.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-navy/20 ring-1 ring-navy/5">
              <Image
                src={heroProductImg}
                alt="Custom-printed currency bands for banknote bundles"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 0px, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy/5 to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.9, duration: 0.5 }}
              className="absolute -bottom-6 -left-8 bg-white rounded-xl p-4 shadow-xl border border-gray-100 flex items-center gap-3"
              aria-label="10 million+ annual production capacity"
            >
              <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-navy leading-none">10M+</div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">Annual production capacity</div>
              </div>
            </motion.div>

            {/* Floating currency badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 1.1, duration: 0.5 }}
              className="absolute -top-5 -right-5 bg-gold rounded-xl px-4 py-3 shadow-lg"
              aria-label="Available for EUR, CZK, and UAH currencies"
            >
              <div className="text-navy text-center">
                <div className="text-sm font-bold leading-none">EUR &bull; CZK</div>
                <div className="text-xs font-semibold opacity-70 mt-1">UAH &bull; More</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent" />
      </motion.div>
    </section>
  );
}
