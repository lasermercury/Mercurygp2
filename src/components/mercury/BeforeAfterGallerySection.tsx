'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';

const BEFORE_IMAGES = [
  '/images/progress/before-1.jpg',
  '/images/progress/before-2.jpg',
  '/images/progress/before-3.jpg',
  '/images/progress/before-4.jpg',
];

const AFTER_IMAGES = [
  '/images/progress/after-1.jpg',
  '/images/progress/after-2.jpg',
  '/images/progress/after-3.jpg',
  '/images/progress/after-4.jpg',
];

export default function BeforeAfterGallerySection() {
  const { locale, dir } = useLanguageStore();
  const dict = getDictionary(locale);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [selectedStage, setSelectedStage] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);
  const isPointerDown = useRef(false);

  const isRtl = dir === 'rtl';
  const stage = dict.beforeAfter.stages[selectedStage];

  const updateSliderPosition = useCallback(
    (clientX: number) => {
      const container = sliderContainerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      let percent: number;
      if (isRtl) {
        percent = ((rect.right - clientX) / rect.width) * 100;
      } else {
        percent = ((clientX - rect.left) / rect.width) * 100;
      }
      const clamped = Math.min(100, Math.max(0, Math.round(percent)));
      setSliderPosition(clamped);
    },
    [isRtl]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      isPointerDown.current = true;
      setHasInteracted(true);
      updateSliderPosition(e.clientX);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [updateSliderPosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isPointerDown.current) return;
      updateSliderPosition(e.clientX);
    },
    [updateSliderPosition]
  );

  const handlePointerUp = useCallback(() => {
    isPointerDown.current = false;
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = 5;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSliderPosition((prev) =>
          Math.min(100, Math.max(0, isRtl ? prev - step : prev + step))
        );
        setHasInteracted(true);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSliderPosition((prev) =>
          Math.min(100, Math.max(0, isRtl ? prev + step : prev - step))
        );
        setHasInteracted(true);
      }
    },
    [isRtl]
  );

  return (
    <section id="before-after" className="py-20 md:py-28">
      <div ref={sectionRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {dict.beforeAfter.sectionTag}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {dict.beforeAfter.sectionTitle}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {dict.beforeAfter.sectionSubtitle}
          </p>
        </motion.div>

        {/* Stage Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {dict.beforeAfter.stages.map((s, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setSelectedStage(index);
                setSliderPosition(50);
                setHasInteracted(false);
              }}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mercury-gold/60 focus-visible:ring-offset-2 rounded-md"
            >
              <Badge
                className={
                  selectedStage === index
                    ? 'bg-mercury-gold text-white hover:bg-mercury-gold/90 border-mercury-gold cursor-pointer px-4 py-1.5 text-sm'
                    : 'bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground border-border/60 cursor-pointer px-4 py-1.5 text-sm'
                }
              >
                {s.week}
              </Badge>
            </button>
          ))}
        </motion.div>

        {/* Interactive Comparison Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                ref={sliderContainerRef}
                role="slider"
                aria-label={dict.beforeAfter.sliderAlt}
                aria-valuenow={sliderPosition}
                aria-valuemin={0}
                aria-valuemax={100}
                className={
                  'relative overflow-hidden rounded-2xl select-none touch-none ' +
                  'aspect-[3/2] md:aspect-[7/4] w-full ' +
                  'shadow-lg border border-border/40'
                }
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                {/* After image (full background layer) */}
                <div
                  className="absolute inset-0"
                  aria-hidden="true"
                >
                  <Image
                    src={AFTER_IMAGES[selectedStage]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                    loading="lazy"
                  />
                </div>

                {/* Before image (clipped layer) */}
                <div
                  className="absolute inset-0"
                  aria-hidden="true"
                  style={{
                    clipPath: isRtl
                      ? `inset(0 ${100 - sliderPosition}% 0 0)`
                      : `inset(0 ${100 - sliderPosition}% 0 0)`,
                  }}
                >
                  <Image
                    src={BEFORE_IMAGES[selectedStage]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                    loading="lazy"
                  />
                </div>

                {/* Subtle tint overlays for visual distinction */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: isRtl
                      ? `inset(0 ${100 - sliderPosition}% 0 0)`
                      : `inset(0 ${100 - sliderPosition}% 0 0)`,
                  }}
                >
                  <div className="absolute inset-0 bg-mercury-warm/10" />
                </div>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: isRtl
                      ? `inset(0 0 0 ${100 - sliderPosition}%)`
                      : `inset(0 0 0 ${100 - sliderPosition}%)`,
                  }}
                >
                  <div className="absolute inset-0 bg-emerald-900/5" />
                </div>

                {/* Slider line */}
                <div
                  className={
                    'absolute top-0 bottom-0 w-0.5 bg-white/90 z-10 ' +
                    'pointer-events-none shadow-sm'
                  }
                  style={{
                    [isRtl ? 'right' : 'left']: `${sliderPosition}%`,
                    transform: 'translateX(-50%)',
                  }}
                />

                {/* Drag handle */}
                <div
                  role="sliderthumb"
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                  className={
                    'absolute top-1/2 z-20 w-11 h-11 rounded-full ' +
                    'bg-white shadow-lg border-2 border-mercury-gold/50 ' +
                    'flex items-center justify-center cursor-grab ' +
                    'active:cursor-grabbing transition-shadow duration-150 ' +
                    'hover:shadow-xl focus-visible:outline-none ' +
                    'focus-visible:ring-2 focus-visible:ring-mercury-gold/60'
                  }
                  style={{
                    [isRtl ? 'right' : 'left']: `${sliderPosition}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  aria-label={dict.beforeAfter.sliderAlt}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-mercury-gold"
                  >
                    <path
                      d="M7 4L3 10L7 16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 4L17 10L13 16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Before label */}
                <div
                  className={
                    'absolute top-4 z-10 ' +
                    (isRtl ? 'left-4' : 'left-4')
                  }
                >
                  <Badge
                    variant="secondary"
                    className="bg-black/40 text-white backdrop-blur-md border-0 text-xs font-medium px-3 py-1"
                  >
                    {isRtl
                      ? dict.beforeAfter.after
                      : dict.beforeAfter.before}
                  </Badge>
                </div>

                {/* After label */}
                <div
                  className={
                    'absolute top-4 z-10 ' +
                    (isRtl ? 'right-4' : 'right-4')
                  }
                >
                  <Badge
                    variant="secondary"
                    className="bg-black/40 text-white backdrop-blur-md border-0 text-xs font-medium px-3 py-1"
                  >
                    {isRtl
                      ? dict.beforeAfter.before
                      : dict.beforeAfter.after}
                  </Badge>
                </div>

                {/* Week badge - bottom corner */}
                <div
                  className={
                    'absolute bottom-4 z-10 ' +
                    (isRtl ? 'left-4' : 'right-4')
                  }
                >
                  <Badge
                    className="bg-mercury-gold/90 text-white backdrop-blur-sm border-0 text-xs font-semibold px-3 py-1"
                  >
                    {stage.week}
                  </Badge>
                </div>

                {/* Drag hint overlay - fades after first interaction */}
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={hasInteracted ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={
                    'absolute inset-0 z-30 flex items-center justify-center ' +
                    'pointer-events-none bg-black/10'
                  }
                >
                  <div className="bg-black/50 text-white text-sm font-medium px-5 py-2.5 rounded-full backdrop-blur-md flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="animate-pulse">
                      <path d="M7 4L3 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13 4L17 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {dict.beforeAfter.dragHint}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Description Cards Below Slider */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
            >
              {/* Before Description Card */}
              <div
                className={
                  'rounded-xl border border-border/50 bg-muted/30 p-5 ' +
                  (isRtl ? 'order-2' : 'order-1')
                }
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-mercury-gold mb-2">
                  {dict.beforeAfter.before}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stage.beforeDesc}
                </p>
              </div>

              {/* After Description Card */}
              <div
                className={
                  'rounded-xl border border-border/50 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 ' +
                  (isRtl ? 'order-1' : 'order-2')
                }
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
                  {dict.beforeAfter.after}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stage.afterDesc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-xs text-muted-foreground/70 text-center leading-relaxed max-w-2xl mx-auto"
        >
          {dict.beforeAfter.disclaimer}
        </motion.p>
      </div>
    </section>
  );
}
