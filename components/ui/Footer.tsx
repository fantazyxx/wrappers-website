const footerLinks = [
  { label: 'Products', href: '#products' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Specifications', href: '#specifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/60" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gold rounded flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="1" y="4" width="14" height="2.5" rx="0.5" fill="#0A1628" />
                  <rect x="1" y="7.5" width="14" height="2.5" rx="0.5" fill="#0A1628" opacity="0.6" />
                  <rect x="1" y="11" width="14" height="2.5" rx="0.5" fill="#0A1628" opacity="0.3" />
                </svg>
              </div>
              <span className="font-bold text-white text-base">CurrencyBands</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Custom-printed banknote straps for banks, cash centers, and CIT companies across Europe. Direct manufacturer.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              Contact
            </h3>
            <p className="text-xs mb-3 leading-relaxed">
              DCTS — CurrencyBands<br />
              European export desk
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:info@dcts.com.ua"
                  className="hover:text-white transition-colors duration-200"
                >
                  info@dcts.com.ua
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/380636770050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  WhatsApp: +380 63 677 00 50
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>
            &copy; {new Date().getFullYear()} CurrencyBands by{' '}
            <a
              href="https://dcts.com.ua"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors"
            >
              DCTS
            </a>
            . All rights reserved.
          </p>
          <p>
            Currency bands &middot; Banknote straps &middot; Money banderoles
          </p>
        </div>
      </div>
    </footer>
  );
}
