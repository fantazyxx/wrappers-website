import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const features = [
  {
    title: 'Free Sample Delivery',
    description:
      'Receive physical samples before committing to any order. Test print quality, paper stock, and custom branding on your premises.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: 'Competitive European Pricing',
    description:
      'Direct-from-manufacturer pricing eliminates intermediary markups. Transparent quotes, no hidden fees, flexible payment terms.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Flexible Quantities',
    description:
      'Standard runs of 1,000 units. Minimum orders from 500 units. Larger batches of 2,000+ available with optimized per-unit pricing.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <line x1="8" y1="21" x2="16" y2="21" />
      </svg>
    ),
  },
  {
    title: 'Flexible Payment Terms',
    description:
      'We work with your accounts payable cycle. Structured terms for repeat clients and institutions, including net-30 and net-60 options.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Direct Manufacturer',
    description:
      'No resellers, no brokers, no intermediaries. You communicate directly with production. Faster decisions, better pricing, full transparency.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-navy relative overflow-hidden" aria-label="Why choose us">
      {/* Background texture */}
      <div className="absolute inset-0 bg-grid-navy opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/3 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative container-inner">
        <SectionHeader
          eyebrow="Why Choose Us"
          heading="Built for Banks. Backed by Manufacturing."
          subheading="Every detail of our process is designed to meet the operational demands of professional financial institutions."
          light
        />

        <AnimatedSection
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {features.map((feature, i) => (
            <AnimatedSection
              key={feature.title}
              variants={fadeInUp}
              delay={i * 0.08}
              className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 rounded-xl p-7 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-white font-semibold text-lg mb-3 leading-snug">{feature.title}</h3>
              <p className="text-blue-100/60 text-sm leading-relaxed">{feature.description}</p>

              {/* Hover accent */}
              <div
                className="absolute top-7 right-7 w-1.5 h-1.5 rounded-full bg-gold/0 group-hover:bg-gold/60 transition-colors duration-300"
                aria-hidden="true"
              />
            </AnimatedSection>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
