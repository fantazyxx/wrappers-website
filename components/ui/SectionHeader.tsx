import AnimatedSection from './AnimatedSection';
import { clsx } from 'clsx';

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = 'center',
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        'mb-14 lg:mb-20',
        align === 'center' && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <AnimatedSection delay={0}>
          <span
            className={clsx(
              'inline-block text-sm font-semibold tracking-widest uppercase mb-4',
              light ? 'text-gold' : 'text-gold'
            )}
          >
            {eyebrow}
          </span>
        </AnimatedSection>
      )}
      <AnimatedSection delay={0.05}>
        <h2
          className={clsx(
            'text-display-lg font-bold text-balance',
            light ? 'text-white' : 'text-navy',
            align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-2xl'
          )}
        >
          {heading}
        </h2>
      </AnimatedSection>
      {subheading && (
        <AnimatedSection delay={0.1}>
          <p
            className={clsx(
              'mt-5 text-lg leading-relaxed',
              light ? 'text-blue-100' : 'text-gray-500',
              align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-xl'
            )}
          >
            {subheading}
          </p>
        </AnimatedSection>
      )}
    </div>
  );
}
