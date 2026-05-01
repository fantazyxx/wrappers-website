import Image from 'next/image';
import printingPressImg from '@/lib/img/Gemini_Generated_Image_dhiwgydhiwgydhiw.png';
// Candidate: lib/img/5.png — person selecting band samples at desk (good for "Custom Production" or "Free Samples" feature)
// Candidate: lib/img/Gemini_Generated_Image_rgu8wnrgu8wnrgu8.png — gloved hands holding €10K band (quality inspection)
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const advantages = [
  {
    title: 'Flexible Production Batches',
    description:
      'Whether you need 500 units for a trial or 50,000 for a national rollout, we scale production to match your actual demand — not a rigid minimum order model.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: 'Faster Communication',
    description:
      'Direct access to the production team means design questions, spec changes, and delivery updates are resolved in hours — not through a chain of intermediaries.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Better Pricing for Custom Orders',
    description:
      'Custom branding, non-standard formats, or bulk orders are priced competitively because we control every step of production. No middleman markup.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    title: 'Direct Production Control',
    description:
      'Every band is manufactured in our own facility. We own the equipment, the process, and the quality control — giving you full traceability from order to delivery.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function CompetitiveEdge() {
  return (
    <section className="section-padding bg-white" aria-label="Competitive advantages">
      <div className="container-inner">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: Image */}
          <AnimatedSection
            variants={{
              hidden: { opacity: 0, x: -32 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="relative"
          >
            <div className="relative aspect-[5/4] rounded-2xl overflow-hidden shadow-xl shadow-navy/10 ring-1 ring-navy/5">
              <Image
                src={printingPressImg}
                alt="Offset printing press producing custom-branded currency bands in our manufacturing facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-navy/20 to-transparent" />
            </div>

            {/* Floating proof point */}
            <div className="absolute bottom-6 right-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100 max-w-[180px]">
              <div className="text-3xl font-bold text-navy leading-none mb-1">100%</div>
              <div className="text-xs text-gray-400 font-medium leading-tight">
                Direct manufacturer — zero intermediaries
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Content */}
          <div>
            <AnimatedSection>
              <span className="inline-block text-sm font-semibold tracking-widest uppercase text-gold mb-4">
                Competitive Edge
              </span>
            </AnimatedSection>
            <AnimatedSection delay={0.05}>
              <h2 className="text-display-md font-bold text-navy mb-6 text-balance">
                What Sets Us Apart from Catalog Suppliers
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <p className="text-gray-500 mb-10 leading-relaxed">
                Most currency band suppliers are distributors. We&apos;re the manufacturer. That difference
                compounds across every interaction — faster turnaround, better prices, and direct accountability.
              </p>
            </AnimatedSection>

            <AnimatedSection variants={staggerContainer} className="space-y-6">
              {advantages.map((adv, i) => (
                <AnimatedSection
                  key={adv.title}
                  variants={fadeInUp}
                  delay={i * 0.07}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-gold">
                    {adv.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1 text-base">{adv.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{adv.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </AnimatedSection>

            <AnimatedSection delay={0.3} className="mt-10">
              <Button variant="primary" size="lg" href="#contact">
                Get Started Today
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
