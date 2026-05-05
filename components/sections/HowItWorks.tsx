'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import sampleSelectionImg from '@/lib/img/5.png';

const steps = [
  {
    number: '01',
    title: 'Send Your Artwork',
    description:
      'Share your design files — logo, denomination values, custom colors, and any branding guidelines. Our team reviews and confirms technical requirements.',
  },
  {
    number: '02',
    title: 'Tooling Preparation',
    description:
      'Our production team prepares printing plates and tooling for your specific design. This ensures every band is printed to the exact same specification.',
  },
  {
    number: '03',
    title: 'Sample Printing',
    description:
      'A small initial run is produced using your finalized artwork and production settings. Samples are reviewed against your specifications before shipping.',
  },
  {
    number: '04',
    title: 'Sample Delivery',
    description:
      'Physical samples are shipped to your location for hands-on testing. Evaluate print quality, paper stock, adhesive strength, and band fit on your own notes.',
  },
  {
    number: '05',
    title: 'Revisions if Needed',
    description:
      'If adjustments are required — color calibration, sizing, or text changes — we revise and produce an updated sample set at no additional cost.',
  },
  {
    number: '06',
    title: 'Final Approval',
    description:
      'Once you confirm the sample meets your standards, you sign off on the specification sheet. Your production run is locked in and scheduled.',
  },
  {
    number: '07',
    title: 'Production & EU Delivery',
    description:
      'Your full order enters production. Completed currency bands are quality-checked, packaged, and shipped directly to your facility across Europe.',
  },
];

function Step({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative flex gap-6 lg:gap-8">
      {/* Step indicator column */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: prefersReducedMotion ? 1 : 0.5, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="w-12 h-12 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center flex-shrink-0 z-10 relative"
          aria-hidden="true"
        >
          <span className="text-sm font-bold text-gold">{step.number}</span>
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: prefersReducedMotion ? 1 : 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 + 0.2, ease: 'easeInOut' }}
            style={{ originY: 0 }}
            className="w-px flex-1 mt-2 bg-gradient-to-b from-gold/30 to-gray-100 min-h-[3rem]"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 16 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08 + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`pb-10 ${isLast ? 'pb-0' : ''}`}
      >
        <h3 className="text-navy font-semibold text-lg mb-2 leading-snug">{step.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-lg">{step.description}</p>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-white" aria-label="How it works">
      <div className="container-inner">
        <SectionHeader
          eyebrow="The Process"
          heading="From Artwork to Delivery"
          subheading="A transparent, collaborative production process designed around your quality requirements and timeline."
        />

        <div className="grid lg:grid-cols-2 gap-0 lg:gap-16 xl:gap-24 items-start max-w-5xl mx-auto">
          {/* Steps 1–4 */}
          <div>
            {steps.slice(0, 4).map((step, i) => (
              <Step key={step.number} step={step} index={i} isLast={i === 3} />
            ))}
          </div>
          {/* Steps 5–7 — visible on all sizes, stacks below on mobile */}
          <div>
            {steps.slice(4).map((step, i) => (
              <Step
                key={step.number}
                step={step}
                index={i + 4}
                isLast={i === steps.slice(4).length - 1}
              />
            ))}

            {/* Sample selection visual — fills the natural height gap below steps 05–07.
                On mobile it flows after the last step, before the CTA. */}
            <AnimatedSection delay={0.35} className="mt-10">
              <figure className="relative">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl shadow-navy/15 ring-1 ring-gold/15">
                  <Image
                    src={sampleSelectionImg}
                    alt="Reviewing currency band samples and color options before approving a production run"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-navy/15 via-transparent to-gold/5" />
                </div>
                <figcaption className="mt-3 flex items-center gap-2 text-xs text-gray-400 font-medium tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
                  Sample inspection &middot; color &amp; finish review before sign-off
                </figcaption>
              </figure>
            </AnimatedSection>
          </div>
        </div>

        {/* CTA */}
        <AnimatedSection className="text-center mt-14">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-[#F4F6FB] border border-gray-100">
            <div className="text-left">
              <p className="font-semibold text-navy text-sm">Ready to start?</p>
              <p className="text-gray-500 text-sm">Request free samples and begin the process today.</p>
            </div>
            <Button variant="primary" size="md" href="#contact" className="whitespace-nowrap flex-shrink-0">
              Request Free Samples
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
