'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';

export default function TechnologySection() {
  const { locale, dir } = useLanguageStore();
  const dict = getDictionary(locale);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="technology" className="py-20 md:py-28 bg-mercury-warm/40">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-20"
        >
          <Badge
            variant="secondary"
            className="mb-4 px-3 py-1 text-xs uppercase tracking-widest"
          >
            {dict.technology.sectionTag}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {dict.technology.sectionTitle}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {dict.technology.sectionSubtitle}
          </p>
        </motion.div>

        {/* Steps + Image */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${dir === 'rtl' ? 'lg:[direction:rtl]' : ''}`}>
          {/* 4 Steps - 2x2 grid on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {dict.technology.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative p-5 bg-card rounded-xl border shadow-sm"
              >
                <span className="text-3xl font-bold text-mercury-gold/30 absolute top-3 end-3 leading-none">
                  {step.step}
                </span>
                <h3 className="text-sm font-semibold mb-1.5 pr-10 rtl:pl-10 rtl:pr-0">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Technology Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-mercury-gold/8 rounded-3xl blur-2xl" />
              <Image
                src="/images/ipl-technology.png"
                alt="IPL Technology Diagram"
                fill
                className="object-contain relative z-10"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        {/* Note Callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 p-4 md:p-5 bg-mercury-warm rounded-xl border border-mercury-gold-light/40"
        >
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">*</span>{' '}
            {dict.technology.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
