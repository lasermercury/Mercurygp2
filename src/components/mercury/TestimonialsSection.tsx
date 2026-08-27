'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';

export default function TestimonialsSection() {
  const { locale } = useLanguageStore();
  const dict = getDictionary(locale);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="testimonials" className="py-20 md:py-28">
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
            {dict.testimonials.sectionTag}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {dict.testimonials.sectionTitle}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {dict.testimonials.sectionSubtitle}
          </p>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.testimonials.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full py-0 gap-0 hover:shadow-md hover:border-mercury-gold-light/60 transition-all duration-300">
                <CardContent className="p-6">
                  {/* Name + Stars Row */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-foreground">{item.name}</span>
                    <div className="flex items-center gap-0.5 shrink-0">
                      {Array.from({ length: 5 }, (_, i) =>
                        i < item.rating ? (
                          <Star
                            key={i}
                            className="size-3.5 text-mercury-gold"
                            fill="currentColor"
                          />
                        ) : (
                          <Star
                            key={i}
                            className="size-3.5 text-muted-foreground/30"
                          />
                        ),
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <p className="text-xs text-muted-foreground mt-0.5">{item.location}</p>

                  {/* Separator */}
                  <div className="border-t border-border/60 my-4" />

                  {/* Quote */}
                  <p className="font-semibold text-foreground mb-1">&ldquo;{item.title}&rdquo;</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>

                  {/* Tags Row */}
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <Badge variant="secondary" className="text-xs px-2 py-0.5">
                      {item.skinTone.replace('Fitzpatrick ', 'Fitz ')}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{item.treatmentArea}</span>
                    <span className="text-xs text-muted-foreground">{item.duration}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-10 text-xs text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {dict.testimonials.disclaimer}
        </p>
      </div>
    </section>
  );
}
