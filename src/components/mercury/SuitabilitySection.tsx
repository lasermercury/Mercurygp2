'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';

export default function SuitabilitySection() {
  const { locale, dir } = useLanguageStore();
  const dict = getDictionary(locale);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="suitability" className="py-20 md:py-28">
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
            {dict.suitability.sectionTag}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {dict.suitability.sectionTitle}
          </h2>
        </motion.div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Suitable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 bg-card rounded-xl border"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="size-4" />
              </div>
              <h3 className="text-base font-semibold">{dict.suitability.suitableTitle}</h3>
            </div>
            <ul className="space-y-3">
              {dict.suitability.suitableItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                  <CheckCircle className="size-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not Suitable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="p-6 bg-card rounded-xl border"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                <XCircle className="size-4" />
              </div>
              <h3 className="text-base font-semibold">{dict.suitability.notSuitableTitle}</h3>
            </div>
            <ul className="space-y-3">
              {dict.suitability.notSuitableItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                  <XCircle className="size-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Legal Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 p-4 bg-mercury-warm rounded-xl border border-mercury-gold-light/40"
        >
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-semibold">**</span>{' '}
            {locale === 'en'
              ? 'This information is for general guidance only and does not constitute medical advice. Always consult a healthcare professional if you have any medical concerns before using this device.'
              : 'این اطلاعات صرفاً برای راهنمایی کلی است و توصیه پزشکی محسوب نمی‌شود. در صورت داشتن هرگونه نگرانی پزشکی، قبل از استفاده از این دستگاه با یک متخصص بهداشت مشورت کنید.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
