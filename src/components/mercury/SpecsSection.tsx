'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';

export default function SpecsSection() {
  const { locale } = useLanguageStore();
  const dict = getDictionary(locale);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="specs" className="py-20 md:py-28 bg-mercury-warm/40">
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
            {dict.specs.sectionTag}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {dict.specs.sectionTitle}
          </h2>
        </motion.div>

        {/* Specs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="py-0 gap-0 overflow-hidden">
            <CardContent className="p-0">
              {dict.specs.items.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between px-6 py-4 text-sm ${
                    index % 2 === 0 ? 'bg-mercury-warm/50' : 'bg-card'
                  } ${index < dict.specs.items.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <span className="font-medium text-muted-foreground">
                    {item.label}
                  </span>
                  <span className={`text-sm ${index % 2 === 0 ? 'font-medium' : 'font-medium text-foreground'}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
