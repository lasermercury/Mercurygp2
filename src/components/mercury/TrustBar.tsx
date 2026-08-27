'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';

/** Convert Western Arabic digits to Persian (Farsi) numerals */
function toPersianDigits(num: string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
}

/** Get suffix for each stat item */
function getSuffix(index: number, locale: 'en' | 'fa'): string {
  if (index === 0 || index === 1) return '+';
  if (index === 2) return locale === 'fa' ? ' ثانیه' : 's';
  return '';
}

/** Format the displayed number with proper decimals and suffix */
function formatDisplay(
  current: number,
  finalValue: number,
  index: number,
  locale: 'en' | 'fa',
  finished: boolean
): string {
  const suffix = getSuffix(index, locale);
  const isInteger = finalValue === Math.floor(finalValue);

  let numStr: string;
  if (isInteger) {
    numStr = Math.round(current).toString();
  } else {
    numStr = current.toFixed(1);
  }

  if (finished && locale === 'fa') {
    numStr = toPersianDigits(numStr);
  }

  return numStr + suffix;
}

/** easeOutCubic timing function */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function TrustBar() {
  const { locale } = useLanguageStore();
  const dict = getDictionary(locale);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const { numericValues, items } = dict.trustBar;

  // Track current animated values for each item
  const [animatedValues, setAnimatedValues] = useState<(number | null)[]>(
    () => numericValues.map(() => null)
  );
  // Track which items have finished their animation
  const [finishedItems, setFinishedItems] = useState<boolean[]>(
    () => new Array(numericValues.length).fill(false)
  );

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500;
    const valuesSnapshot = [...numericValues];

    const animateCount = (itemIndex: number) => {
      const targetValue = valuesSnapshot[itemIndex];
      if (targetValue === null) return;

      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(rawProgress);
        const currentValue = easedProgress * targetValue;

        setAnimatedValues((prev) => {
          const next = [...prev];
          next[itemIndex] = currentValue;
          return next;
        });

        if (rawProgress < 1) {
          requestAnimationFrame(step);
        } else {
          setAnimatedValues((prev) => {
            const next = [...prev];
            next[itemIndex] = targetValue;
            return next;
          });
          setFinishedItems((prev) => {
            const next = [...prev];
            next[itemIndex] = true;
            return next;
          });
        }
      };

      requestAnimationFrame(step);
    };

    valuesSnapshot.forEach((targetValue, index) => {
      if (targetValue === null) return;
      const delay = index * 100;
      setTimeout(() => animateCount(index), delay);
    });
  }, [isInView, numericValues]);

  return (
    <div ref={ref} className="bg-mercury-warm/60 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {items.map((item, index) => {
            const numericValue = numericValues[index];
            const isInfinity = numericValue === null;
            const isFinished = finishedItems[index];
            const animatedValue = animatedValues[index];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center border-b border-border/50 pb-4"
              >
                <motion.p
                  className="text-3xl md:text-4xl font-bold text-mercury-gold-dark tracking-tight tabular-nums"
                  animate={
                    isFinished
                      ? { scale: [1, 1.02, 1] }
                      : isInfinity && isInView
                        ? { scale: [0.8, 1.05, 1] }
                        : {}
                  }
                  transition={{
                    duration: isInfinity ? 0.6 : 0.4,
                    ease: 'easeOut',
                  }}
                >
                  {isInfinity
                    ? item.value
                    : animatedValue !== null
                      ? formatDisplay(
                          animatedValue,
                          numericValue!,
                          index,
                          locale,
                          isFinished
                        )
                      : '0'}
                </motion.p>
                <p className="mt-1.5 text-sm text-muted-foreground font-medium">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
