'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';

const indicatorColors = [
  'bg-gray-200',
  'bg-amber-200',
  'bg-amber-300',
  'bg-amber-400',
  'bg-emerald-400',
];

const indicatorFills = [
  'bg-gray-300',
  'bg-amber-400',
  'bg-amber-500',
  'bg-amber-600',
  'bg-emerald-500',
];

export default function TreatmentJourneySection() {
  const { locale } = useLanguageStore();
  const dict = getDictionary(locale);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 md:py-28 bg-mercury-warm/40">
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
            {dict.treatmentJourney.sectionTag}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {dict.treatmentJourney.sectionTitle}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {dict.treatmentJourney.sectionSubtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-0 bottom-0 start-6 md:start-8 w-px bg-border" />

          <div className="space-y-8 md:space-y-12">
            {dict.treatmentJourney.phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: locale === 'fa' ? 20 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex gap-5 md:gap-8 ${locale === 'fa' ? 'flex-row-reverse' : ''}`}
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${indicatorColors[phase.indicator - 1]} flex items-center justify-center`}
                  >
                    <div
                      className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${indicatorFills[phase.indicator - 1]} flex items-center justify-center text-white font-bold text-xs md:text-sm`}
                    >
                      {phase.indicator}
                    </div>
                  </div>
                </div>

                {/* Content card */}
                <div className={`flex-1 pt-1 md:pt-3 ${locale === 'fa' ? 'text-right' : ''}`}>
                  <div className="p-5 md:p-6 bg-card rounded-xl border shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold text-mercury-gold-dark uppercase tracking-wider">
                        {phase.weekRange}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold mb-2">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-14 md:mt-20 max-w-3xl mx-auto p-4 md:p-5 bg-mercury-warm rounded-xl border border-mercury-gold-light/40"
        >
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">*</span>{' '}
            {dict.treatmentJourney.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
