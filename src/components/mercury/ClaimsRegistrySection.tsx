'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ExternalLink, Shield, AlertTriangle, Clock, XCircle, HelpCircle } from 'lucide-react';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';
import { claimsRegistry } from '@/lib/claims-registry';
import type { VerificationStatus, Confidence } from '@/lib/claims-registry';

const statusConfig: Record<
  VerificationStatus,
  { icon: React.ReactNode; className: string }
> = {
  verified: {
    icon: <Shield className="size-3.5" />,
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  pending: {
    icon: <Clock className="size-3.5" />,
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  unverified: {
    icon: <HelpCircle className="size-3.5" />,
    className: 'bg-gray-50 text-gray-600 border-gray-200',
  },
  conflicting: {
    icon: <AlertTriangle className="size-3.5" />,
    className: 'bg-red-50 text-red-600 border-red-200',
  },
  outdated: {
    icon: <XCircle className="size-3.5" />,
    className: 'bg-orange-50 text-orange-600 border-orange-200',
  },
};

const confidenceConfig: Record<
  Confidence,
  { className: string }
> = {
  high: { className: 'text-emerald-600' },
  medium: { className: 'text-amber-600' },
  low: { className: 'text-red-500' },
};

export default function ClaimsRegistrySection() {
  const { locale } = useLanguageStore();
  const dict = getDictionary(locale);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const labelKey = locale === 'fa' ? 'labelFa' : 'labelEn';

  return (
    <section id="claims" className="py-20 md:py-28">
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
            {dict.claims.sectionTag}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {dict.claims.sectionTitle}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {dict.claims.sectionSubtitle}
          </p>
        </motion.div>

        {/* Claims Table - Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block"
        >
          <Card className="py-0 gap-0 overflow-hidden">
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-mercury-warm/80 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                <div className="col-span-3">{dict.claims.tableHeaders.claim}</div>
                <div className="col-span-2">{dict.claims.tableHeaders.value}</div>
                <div className="col-span-2">{dict.claims.tableHeaders.status}</div>
                <div className="col-span-2">{dict.claims.tableHeaders.confidence}</div>
                <div className="col-span-3">{dict.claims.tableHeaders.source}</div>
              </div>

              {/* Table Rows */}
              {claimsRegistry.map((claim, index) => {
                const status = statusConfig[claim.verificationStatus];
                const conf = confidenceConfig[claim.confidence];
                const isExpanded = expandedId === claim.id;

                return (
                  <div key={claim.id}>
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : claim.id)
                      }
                      className={`w-full grid grid-cols-12 gap-4 px-6 py-3.5 text-sm text-start items-center transition-colors hover:bg-accent/50 ${
                        index % 2 === 0 ? 'bg-card' : 'bg-mercury-warm/30'
                      }`}
                    >
                      <div className="col-span-3 font-medium text-foreground">
                        {claim[labelKey]}
                      </div>
                      <div className="col-span-2 text-muted-foreground">
                        {claim.value !== undefined
                          ? String(claim.value)
                          : '—'}
                      </div>
                      <div className="col-span-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.className}`}
                        >
                          {status.icon}
                          {dict.claims.statusLabels[claim.verificationStatus]}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span
                          className={`text-xs font-semibold uppercase tracking-wide ${conf.className}`}
                        >
                          {dict.claims.confidenceLabels[claim.confidence]}
                        </span>
                      </div>
                      <div className="col-span-3">
                        <a
                          href={claim.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs text-mercury-gold-dark hover:text-mercury-gold transition-colors"
                        >
                          <span className="truncate max-w-[180px]">
                            {claim.sourceName}
                          </span>
                          <ExternalLink className="size-3 flex-shrink-0" />
                        </a>
                      </div>
                    </button>

                    {/* Expanded Notes */}
                    <AnimatePresence>
                      {isExpanded && claim.notes && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 py-3 bg-mercury-warm/50 border-b border-border">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              <span className="font-semibold text-foreground">
                                {dict.claims.notesLabel}:
                              </span>{' '}
                              {claim.notes}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Claims Cards - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:hidden space-y-3"
        >
          {claimsRegistry.map((claim, index) => {
            const status = statusConfig[claim.verificationStatus];
            const conf = confidenceConfig[claim.confidence];
            const isExpanded = expandedId === claim.id;

            return (
              <motion.div
                key={claim.id}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className="py-0 gap-0 cursor-pointer hover:shadow-sm transition-shadow"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : claim.id)
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold">
                          {claim[labelKey]}
                        </h3>
                        {claim.value !== undefined && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {String(claim.value)}
                          </p>
                        )}
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border flex-shrink-0 ${status.className}`}
                      >
                        {status.icon}
                        {dict.claims.statusLabels[claim.verificationStatus]}
                      </span>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 pt-3 border-t border-border space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                                {dict.claims.tableHeaders.confidence}
                              </span>
                              <span
                                className={`text-xs font-semibold ${conf.className}`}
                              >
                                {dict.claims.confidenceLabels[claim.confidence]}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                                {dict.claims.tableHeaders.source}
                              </span>
                              <a
                                href={claim.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="block text-xs text-mercury-gold-dark hover:text-mercury-gold transition-colors mt-0.5"
                              >
                                {claim.sourceName}
                              </a>
                            </div>
                            {claim.notes && (
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                <span className="font-semibold text-foreground">
                                  {dict.claims.notesLabel}:
                                </span>{' '}
                                {claim.notes}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
