'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Infinity, Snowflake, ScanLine, Cable, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';

const iconMap: Record<string, React.ReactNode> = {
  zap: <Zap className="size-6" />,
  infinity: <Infinity className="size-6" />,
  snowflake: <Snowflake className="size-6" />,
  scan: <ScanLine className="size-6" />,
  cable: <Cable className="size-6" />,
  sliders: <SlidersHorizontal className="size-6" />,
};

export default function FeaturesSection() {
  const { locale } = useLanguageStore();
  const dict = getDictionary(locale);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" className="py-20 md:py-28">
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
            {dict.features.sectionTag}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {dict.features.sectionTitle}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {dict.features.sectionSubtitle}
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.features.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full py-0 gap-0 group hover:shadow-md hover:border-mercury-gold-light/60 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-lg bg-mercury-warm flex items-center justify-center text-mercury-gold-dark mb-4 group-hover:bg-mercury-gold/15 transition-colors">
                    {iconMap[item.icon]}
                  </div>
                  <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
