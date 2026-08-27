'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';

export default function HeroSection() {
  const { locale, dir } = useLanguageStore();
  const dict = getDictionary(locale);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 md:pt-0 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-20">
        <div className={`flex flex-col ${dir === 'rtl' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-16 lg:gap-20`}>
          {/* Text Content */}
          <div className="flex-1 text-center md:text-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Badge
                variant="outline"
                className="mb-6 px-4 py-1.5 text-xs uppercase tracking-widest border-mercury-gold-light text-mercury-gold-dark"
              >
                {dict.hero.tagline}
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            >
              {dict.hero.headline}
              <br />
              <span className="text-mercury-gold">{dict.hero.headlineAccent}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto md:mx-0"
            >
              {dict.hero.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`mt-8 flex flex-col sm:flex-row gap-3 ${dir === 'rtl' ? 'sm:flex-row-reverse' : ''} justify-center md:justify-start`}
            >
              <Button
                size="lg"
                className="px-8 py-5 text-sm font-semibold bg-primary hover:bg-primary/90"
                onClick={() => scrollTo('features')}
              >
                {dict.hero.cta}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-5 text-sm font-semibold"
                onClick={() => scrollTo('technology')}
              >
                {dict.hero.ctaSecondary}
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 text-xs text-muted-foreground/70"
            >
              {dict.hero.trustNote}
            </motion.p>
          </div>

          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]"
            >
              <Image
                src="/images/mercury-gp-hero-new.jpg"
                alt="Mercury GP IPL Hair-Reduction Device"
                fill
                className="object-contain relative z-10"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
