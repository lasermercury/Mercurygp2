'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';

export default function HowToUseSection() {
  const { locale, dir } = useLanguageStore();
  const dict = getDictionary(locale);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-to-use" className="py-20 md:py-28">
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
            {dict.howToUse.sectionTag}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {dict.howToUse.sectionTitle}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {dict.howToUse.sectionSubtitle}
          </p>
        </motion.div>

        {/* 4 Steps */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${dir === 'rtl' ? '[direction:rtl]' : ''}`}>
          {dict.howToUse.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-mercury-gold/10 text-mercury-gold-dark flex items-center justify-center text-sm font-bold">
                  {step.step}
                </span>
                <div className="pt-1">
                  <h3 className="text-sm font-semibold mb-1.5">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              {/* Connector line (not on last item) */}
              {index < dict.howToUse.steps.length - 1 && (
                <div className="hidden sm:block absolute top-5 start-10 w-full h-px bg-border" style={{
                  insetInlineStart: '2.5rem',
                  width: 'calc(100% - 2.5rem)',
                }} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Timeline Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 md:mt-20"
        >
          <Card className="py-0 gap-0 overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-base font-semibold mb-6">{dict.howToUse.timelineTitle}</h3>
              <div className="space-y-4">
                {dict.howToUse.timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-4 rounded-lg ${index % 2 === 0 ? 'bg-mercury-warm/60' : 'bg-transparent'}`}
                  >
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-mercury-gold mt-2" />
                    <div>
                      <p className="text-sm font-semibold">{item.phase}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
