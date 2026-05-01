'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const navLinks = [
  { label: 'Products', href: '#products' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Specifications', href: '#specifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Currency Bands — Home"
          >
            <div className="w-8 h-8 bg-navy rounded flex items-center justify-center group-hover:bg-gold transition-colors duration-300 flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="4" width="14" height="2.5" rx="0.5" fill="white" />
                <rect x="1" y="7.5" width="14" height="2.5" rx="0.5" fill="white" opacity="0.6" />
                <rect x="1" y="11" width="14" height="2.5" rx="0.5" fill="white" opacity="0.3" />
              </svg>
            </div>
            <span
              className={`font-bold text-base tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-navy' : 'text-navy'
              }`}
            >
              CurrencyBands
            </span>
          </a>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-navy transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button variant="primary" size="sm" href="#contact">
              Request Samples
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 rounded-md text-navy hover:bg-gray-100 transition-colors"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">{menuOpen ? 'Close' : 'Menu'}</span>
            <div className="w-6 h-5 flex flex-col justify-between" aria-hidden="true">
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-[9px]' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                  menuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-[9px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="px-4 pt-4 pb-6 flex flex-col gap-1"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 px-3 text-base font-medium text-gray-700 hover:text-navy hover:bg-gray-50 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button
                  variant="primary"
                  size="md"
                  href="#contact"
                  className="w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Request Free Samples
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
