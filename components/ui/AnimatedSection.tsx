'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { reducedMotionVariants } from '@/lib/animations';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  threshold?: number;
  as?: keyof JSX.IntrinsicElements;
}

export default function AnimatedSection({
  children,
  className,
  variants,
  delay = 0,
  threshold = 0.1,
  as: Tag = 'div',
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: threshold });

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const activeVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3, delay } },
      }
    : variants ?? defaultVariants;

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={activeVariants}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
