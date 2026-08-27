'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';

const SKIN_COLORS = [
  '#FDEBD0', // Type I — Very Light
  '#F5CBA7', // Type II — Light
  '#E6B89C', // Type III — Medium-Light
  '#D4A76A', // Type IV — Medium
  '#A0785A', // Type V — Medium-Dark
] as const;

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V'] as const;

export default function SkinToneGuideSection() {
  const { locale } = useLanguageStore();
  const dict = getDictionary(locale);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedType, setSelectedType] = useState<number | null>(null);

  return (
    <section id="skin-tone-guide" className="py-20 md:py-28 bg-mercury-warm/20">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <Badge
            variant="secondary"
            className="mb-4 px-3 py-1 text-xs uppercase tracking-widest"
          >
            {dict.skinTone.sectionTag}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {dict.skinTone.sectionTitle}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {dict.skinTone.sectionSubtitle}
          </p>
        </motion.div>

        {/* Skin Tone Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dict.skinTone.types.map((skinType, index) => {
            const isSelected = selectedType === skinType.type;
            return (
              <motion.div
                key={skinType.type}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <button
                  onClick={() =>
                    setSelectedType(isSelected ? null : skinType.type)
                  }
                  className={`w-full text-center transition-all duration-200 rounded-xl border-2 p-5 sm:p-6 cursor-pointer group bg-background ${
                    isSelected
                      ? 'border-mercury-gold shadow-sm ring-1 ring-mercury-gold/20'
                      : 'border-border hover:border-mercury-gold-light'
                  }`}
                >
                  {/* Color Circle */}
                  <div className="flex justify-center mb-3">
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all duration-200"
                      style={{
                        backgroundColor: SKIN_COLORS[index],
                        ringColor: isSelected
                          ? 'var(--mercury-gold)'
                          : 'transparent',
                      }}
                    />
                  </div>

                  {/* Type Label */}
                  <span className="block text-sm font-semibold text-mercury-gold-dark">
                    Type {ROMAN_NUMERALS[index]}
                  </span>

                  {/* Name */}
                  <span className="block text-base font-medium mt-1">
                    {skinType.name}
                  </span>

                  {/* Description */}
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {skinType.description}
                  </p>

                  {/* Selected Checkmark */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex justify-center mt-3"
                      >
                        <CheckCircle2 className="size-5 text-emerald-600" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Result Card */}
        <AnimatePresence>
          {selectedType !== null && (
            <motion.div
              initial={{ opacity: 0, y: 16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 16, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mt-8 overflow-hidden"
            >
              <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div
                      className={`flex-1 ${
                        locale === 'fa' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <h3 className="font-semibold text-foreground mb-2">
                        {dict.skinTone.resultTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {dict.skinTone.resultDescription}
                      </p>
                      <div className="mt-3 flex items-start gap-2 bg-background/60 rounded-lg p-3">
                        <Info className="size-4 text-mercury-gold-dark mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {dict.skinTone.hairNote}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 text-xs text-muted-foreground/70 text-center leading-relaxed max-w-2xl mx-auto"
        >
          {dict.skinTone.disclaimer}
        </motion.p>
      </div>
    </section>
  );
}
