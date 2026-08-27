'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';

export default function CTASection() {
  const { locale } = useLanguageStore();
  const dict = getDictionary(locale);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Warm background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-mercury-warm via-mercury-warm/80 to-mercury-gold-light/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-mercury-warm/60 to-transparent" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold tracking-tight"
        >
          {dict.cta.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed"
        >
          {dict.cta.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <Button
            size="lg"
            className="px-10 py-5 text-sm font-semibold bg-primary hover:bg-primary/90"
            onClick={() => scrollTo('features')}
          >
            {dict.cta.button}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
