'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';
import { Check } from 'lucide-react';

type AreaId = 'face' | 'underarms' | 'arms' | 'bikini' | 'legs' | 'abdomen' | 'back';

interface HotspotConfig {
  id: AreaId;
  cx: number;
  cy: number;
}

const hotspots: HotspotConfig[] = [
  { id: 'face', cx: 100, cy: 35 },
  { id: 'underarms', cx: 72, cy: 125 },
  { id: 'arms', cx: 46, cy: 195 },
  { id: 'bikini', cx: 100, cy: 242 },
  { id: 'legs', cx: 100, cy: 335 },
  { id: 'abdomen', cx: 100, cy: 180 },
  { id: 'back', cx: 128, cy: 100 },
];

export default function BodyMapSection() {
  const { locale, dir } = useLanguageStore();
  const dict = getDictionary(locale);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selected, setSelected] = useState<AreaId | null>(null);

  const selectedArea = selected
    ? dict.bodyMap.areas.find((a) => a.id === selected) ?? null
    : null;

  return (
    <section id="body-map" className="py-20 md:py-28">
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
            {dict.bodyMap.sectionTag}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {dict.bodyMap.sectionTitle}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {dict.bodyMap.sectionSubtitle}
          </p>
        </motion.div>

        {/* Two-column layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`flex flex-col gap-8 lg:gap-12 ${dir === 'rtl' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center lg:items-start`}
        >
          {/* Left Column: SVG Body Map */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-[200px]">
              <svg
                viewBox="0 0 200 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
                aria-label="Body map for treatment area selection"
              >
                {/* Body silhouette outline */}
                <g className="text-muted-foreground/30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Head */}
                  <circle cx="100" cy="35" r="18" />
                  {/* Neck */}
                  <line x1="93" y1="53" x2="93" y2="64" />
                  <line x1="107" y1="53" x2="107" y2="64" />
                  {/* Shoulders */}
                  <path d="M 93 64 L 70 78 L 65 84" />
                  <path d="M 107 64 L 130 78 L 135 84" />
                  {/* Left arm outer */}
                  <path d="M 65 84 L 48 150 L 42 208" />
                  {/* Left arm inner */}
                  <path d="M 70 82 L 62 140 L 56 200" />
                  {/* Right arm outer */}
                  <path d="M 135 84 L 152 150 L 158 208" />
                  {/* Right arm inner */}
                  <path d="M 130 82 L 138 140 L 144 200" />
                  {/* Torso left */}
                  <path d="M 75 84 L 78 150 L 80 220 L 82 250" />
                  {/* Torso right */}
                  <path d="M 125 84 L 122 150 L 120 220 L 118 250" />
                  {/* Hip / crotch */}
                  <path d="M 82 250 L 100 260 L 118 250" />
                  {/* Left leg */}
                  <path d="M 82 250 L 80 310 L 78 370 L 76 390" />
                  <path d="M 95 258 L 94 310 L 92 370 L 90 390" />
                  {/* Right leg */}
                  <path d="M 118 250 L 120 310 L 122 370 L 124 390" />
                  <path d="M 105 258 L 106 310 L 108 370 L 110 390" />
                </g>

                {/* Hotspot circles */}
                {hotspots.map((spot) => {
                  const isSelected = selected === spot.id;
                  const areaLabel = dict.bodyMap.areas.find((a) => a.id === spot.id)?.label ?? spot.id;

                  return (
                    <g key={spot.id}>
                      {/* Pulsing ring animation (idle only) */}
                      {!isSelected && (
                        <motion.circle
                          cx={spot.cx}
                          cy={spot.cy}
                          r={14}
                          fill="none"
                          stroke="currentColor"
                          className="text-mercury-gold/40"
                          strokeWidth="1.5"
                          initial={{ scale: 1, opacity: 0.6 }}
                          animate={{ scale: 1.35, opacity: 0 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          style={{ originX: `${spot.cx}px`, originY: `${spot.cy}px` }}
                        />
                      )}

                      {/* Main hotspot circle */}
                      <motion.circle
                        cx={spot.cx}
                        cy={spot.cy}
                        r={14}
                        role="button"
                        aria-label={areaLabel}
                        tabIndex={0}
                        className="cursor-pointer"
                        fill={isSelected ? 'var(--color-mercury-gold)' : 'var(--color-background)'}
                        stroke={isSelected ? 'var(--color-mercury-gold)' : 'var(--color-mercury-gold-light)'}
                        strokeWidth={isSelected ? 0 : 1.5}
                        whileHover={{
                          scale: 1.15,
                          stroke: 'var(--color-mercury-gold)',
                          strokeWidth: 2,
                        }}
                        style={{ originX: `${spot.cx}px`, originY: `${spot.cy}px` }}
                        onClick={() => setSelected(selected === spot.id ? null : spot.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelected(selected === spot.id ? null : spot.id);
                          }
                        }}
                      />

                      {/* Checkmark for selected */}
                      {isSelected && (
                        <motion.g
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          style={{ originX: `${spot.cx}px`, originY: `${spot.cy}px` }}
                        >
                          <Check
                            x={spot.cx - 7}
                            y={spot.cy - 7}
                            width={14}
                            height={14}
                            stroke="white"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </motion.g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Right Column: Info Card */}
          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              {selectedArea ? (
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border border-border shadow-sm">
                    <CardContent className="p-6">
                      {/* Area name */}
                      <h3 className="text-lg font-semibold mb-1">{selectedArea.label}</h3>

                      {/* Area description */}
                      <p className="text-sm text-muted-foreground mb-5">{selectedArea.description}</p>

                      {/* Stats grid */}
                      <div className="grid grid-cols-3 gap-4 mb-5">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">{dict.bodyMap.intensity}</p>
                          <p className="text-sm font-semibold">{selectedArea.intensity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">{dict.bodyMap.estTime}</p>
                          <p className="text-sm font-semibold">{selectedArea.estTime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">{dict.bodyMap.passes}</p>
                          <p className="text-sm font-semibold">{selectedArea.passes}</p>
                        </div>
                      </div>

                      {/* Frequency info */}
                      <div className="rounded-lg bg-mercury-warm/50 border border-mercury-gold-light/30 px-4 py-3 mb-4">
                        <p className="text-xs text-muted-foreground mb-0.5">{dict.bodyMap.frequency}</p>
                        <p className="text-sm font-medium">{dict.bodyMap.onceWeekly}</p>
                      </div>

                      {/* Face-specific note */}
                      {selected === 'face' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 px-4 py-3 mb-4"
                        >
                          <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                            {dict.bodyMap.faceNote}
                          </p>
                        </motion.div>
                      )}

                      {/* General note */}
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {dict.bodyMap.note}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="border border-border shadow-sm">
                    <CardContent className="p-6 flex items-center justify-center min-h-[280px]">
                      <p className="text-sm text-muted-foreground text-center">
                        {dict.bodyMap.selectPrompt}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
