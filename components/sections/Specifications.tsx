import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import packagingImg from '@/lib/img/Gemini_Generated_Image_mwbi70mwbi70mwbi.png';

const specs = [
  {
    category: 'Packaging',
    items: [
      { label: 'Standard Batch', value: '1,000 units' },
      { label: 'Minimum Order', value: '500 units' },
      { label: 'Custom Batch', value: '2,000+ units' },
      { label: 'Packaging Format', value: 'Carton / pallet' },
    ],
  },
  {
    category: 'Printing',
    items: [
      { label: 'Print Type', value: 'Full color offset' },
      { label: 'Color Matching', value: 'Pantone & CMYK' },
      { label: 'Custom Branding', value: 'Logo, text, colors' },
      { label: 'Finish Options', value: 'Matte / gloss available' },
    ],
  },
  {
    category: 'Currencies',
    items: [
      { label: 'EUR', value: '€1K / €2K / €10K / €20K' },
      { label: 'CZK', value: '50K / 100K / 500K Kč' },
      { label: 'UAH', value: '100 / 200 / 500 / 1,000 UAH' },
      { label: 'Other', value: 'Available on request' },
    ],
  },
  {
    category: 'Commercial',
    items: [
      { label: 'Delivery', value: 'EU-wide shipping' },
      { label: 'Lead Time', value: 'Agreed per order' },
      { label: 'Samples', value: 'Free, prior to order' },
      { label: 'Payment Terms', value: 'Flexible — see contact' },
    ],
  },
];

export default function Specifications() {
  return (
    <section id="specifications" className="section-padding bg-[#F4F6FB]" aria-label="Specifications">
      <div className="container-inner">
        <SectionHeader
          eyebrow="Specifications"
          heading="Technical Details"
          subheading="Standard specifications for our currency band production. All parameters can be adjusted to meet institutional requirements."
        />

        <AnimatedSection
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {specs.map((spec, i) => (
            <AnimatedSection
              key={spec.category}
              variants={fadeInUp}
              delay={i * 0.07}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-gray-100">
                <div className="w-1 h-5 bg-gold rounded-full" aria-hidden="true" />
                <h3 className="font-bold text-navy text-sm tracking-wide uppercase">{spec.category}</h3>
              </div>

              {/* Spec rows */}
              <dl className="space-y-3.5">
                {spec.items.map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5">
                    <dt className="text-xs text-gray-400 font-medium">{item.label}</dt>
                    <dd className="text-sm font-semibold text-navy">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </AnimatedSection>
          ))}
        </AnimatedSection>

        {/* Packaging visual */}
        <AnimatedSection className="relative aspect-[21/9] rounded-xl overflow-hidden mt-10 shadow-sm ring-1 ring-navy/5">
          <Image
            src={packagingImg}
            alt="Currency bands packaged in branded shipping cartons, ready for EU-wide delivery"
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, 90vw"
            loading="lazy"
          />
        </AnimatedSection>

        {/* Fine print */}
        <AnimatedSection className="mt-8 text-center">
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            All specifications are subject to confirmation. Contact us for a precise technical data sheet tailored to your institution&apos;s requirements.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
