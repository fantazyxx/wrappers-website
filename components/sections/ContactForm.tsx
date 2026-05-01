'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';

const EU_COUNTRIES = [
  'Austria',
  'Belgium',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
  'United Kingdom',
  'Other',
];

interface FormData {
  name: string;
  company: string;
  email: string;
  country: string;
  message: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  country?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-red-400 font-medium" role="alert">
      {message}
    </p>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    country: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const inputClass = (hasError: boolean) =>
    `w-full bg-white/5 border ${
      hasError ? 'border-red-400/60' : 'border-white/15 focus:border-gold/60'
    } rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 ${
      hasError ? 'focus:ring-red-400/30' : 'focus:ring-gold/20'
    } autofill:bg-navy`;

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!formData.name.trim()) next.name = 'Full name is required.';
    if (!formData.company.trim()) next.company = 'Company name is required.';
    if (!formData.email.trim()) {
      next.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!formData.country) next.country = 'Please select your country.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    // TODO: Integrate with backend / email service.
    // Options: Resend (resend.com), SendGrid, AWS SES, Formspree, or a Next.js API route.
    // Example API route:
    //   const res = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });

    // Simulate network delay (remove when real backend is wired)
    await new Promise<void>((resolve) => setTimeout(resolve, 900));

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-navy relative overflow-hidden" aria-label="Contact form">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/3 rounded-full blur-3xl" />
      </div>

      <div className="relative container-inner">
        <div className="max-w-2xl mx-auto">
          {/* Section header */}
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-gold mb-4">
              Get Started
            </span>
            <h2 className="text-display-lg font-bold text-white mb-4 text-balance">
              Request Free Samples
            </h2>
            <p className="text-blue-100/60 text-lg leading-relaxed">
              Fill in the form below and we&apos;ll arrange delivery of physical samples to your institution — no commitment required.
            </p>
          </AnimatedSection>

          {/* Form / Success */}
          <AnimatePresence mode="wait">
            {submitted ? (
              /* Success state */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/5 border border-white/15 rounded-2xl p-10 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold mb-3">Request Received</h3>
                <p className="text-blue-100/60 text-sm leading-relaxed max-w-md mx-auto mb-8">
                  Thank you, <strong className="text-white">{formData.name}</strong>. We&apos;ve received your sample request and will be in touch within one business day to arrange delivery.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', company: '', email: '', country: '', message: '' });
                  }}
                  className="text-gold/70 hover:text-gold text-sm font-medium transition-colors"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              /* Form */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5"
                aria-label="Sample request form"
              >
                {/* Name + Company */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1.5">
                      Full Name <span className="text-gold" aria-label="required">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className={inputClass(!!errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      aria-invalid={!!errors.name}
                    />
                    <FieldError message={errors.name} />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white/70 mb-1.5">
                      Company <span className="text-gold" aria-label="required">*</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Bank AG"
                      className={inputClass(!!errors.company)}
                      aria-describedby={errors.company ? 'company-error' : undefined}
                      aria-invalid={!!errors.company}
                    />
                    <FieldError message={errors.company} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1.5">
                    Email Address <span className="text-gold" aria-label="required">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@bank.eu"
                    className={inputClass(!!errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  <FieldError message={errors.email} />
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-white/70 mb-1.5">
                    Country <span className="text-gold" aria-label="required">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className={`${inputClass(!!errors.country)} appearance-none cursor-pointer pr-10 ${
                        formData.country ? 'text-white' : 'text-white/30'
                      }`}
                      aria-describedby={errors.country ? 'country-error' : undefined}
                      aria-invalid={!!errors.country}
                    >
                      <option value="" disabled>Select your country</option>
                      {EU_COUNTRIES.map((c) => (
                        <option key={c} value={c} className="bg-navy text-white">
                          {c}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/30" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <FieldError message={errors.country} />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-1.5">
                    Message{' '}
                    <span className="text-white/30 text-xs font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your expected volumes, currencies needed, or any specific requirements..."
                    className={`${inputClass(false)} resize-none`}
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={submitting}
                    className="w-full"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Sending Request&hellip;
                      </>
                    ) : (
                      <>
                        Request Free Samples
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </>
                    )}
                  </Button>
                  <p className="text-center text-xs text-white/30 mt-3">
                    By submitting, you agree to be contacted regarding your sample request. No spam — ever.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Contact info */}
          <AnimatedSection delay={0.2} className="mt-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
              <div className="text-center mb-4">
                <p className="text-white font-semibold text-base">DCTS — CurrencyBands</p>
                <p className="text-white/50 text-sm">European export desk</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-center gap-2.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <a href="mailto:info@dcts.com.ua" className="text-white/70 hover:text-gold transition-colors">
                    info@dcts.com.ua
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <a
                    href="https://wa.me/380636770050"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-gold transition-colors"
                  >
                    WhatsApp Business: +380 63 677 00 50
                  </a>
                </div>
              </div>
              <p className="text-center text-white/30 text-xs mt-4">
                Production and sample delivery available across Europe
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
