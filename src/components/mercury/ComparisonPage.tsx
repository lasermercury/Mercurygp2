'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ExternalLink, Globe, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';
import { getComparisonBySlug, mercuryGpDevice } from '@/lib/comparison-data';
import type { Confidence, VerificationStatus } from '@/lib/claims-registry';

const specKeys = [
  'technology',
  'wavelength',
  'flashSpeed',
  'flashCapacity',
  'intensityLevels',
  'skinTones',
  'cooling',
  'power',
  'skinSensor',
  'treatmentWindow',
] as const;

type SpecKey = (typeof specKeys)[number];

function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  const { locale } = useLanguageStore();
  const dict = getDictionary(locale);
  const label = dict.comparison.confidenceLabels[confidence];

  const colorMap: Record<Confidence, string> = {
    high: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800',
    medium: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800',
    low: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800',
  };

  return (
    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-medium ${colorMap[confidence]}`}>
      {label}
    </Badge>
  );
}

function VerificationBadge({ verification }: { verification: VerificationStatus }) {
  const { locale } = useLanguageStore();
  const dict = getDictionary(locale);
  const label = dict.comparison.verificationLabels[verification];

  if (verification === 'verified') {
    return (
      <Badge
        variant="outline"
        className="text-[10px] px-1.5 py-0 font-medium gap-0.5 bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
      >
        <ShieldCheck className="size-3" />
        {label}
      </Badge>
    );
  }

  if (verification === 'pending') {
    return (
      <Badge
        variant="outline"
        className="text-[10px] px-1.5 py-0 font-medium gap-0.5 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"
      >
        <ShieldAlert className="size-3" />
        {label}
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="text-[10px] px-1.5 py-0 font-medium gap-0.5 bg-muted text-muted-foreground"
    >
      {label}
    </Badge>
  );
}

function ValueCell({
  value,
  confidence,
  verification,
}: {
  value: string;
  confidence: Confidence;
  verification: VerificationStatus;
}) {
  const isPending = verification === 'pending';

  return (
    <div className="space-y-1">
      <p className={`text-sm leading-relaxed ${isPending ? 'text-muted-foreground italic' : 'text-foreground'}`}>
        {value}
      </p>
      <div className="flex items-center gap-1.5 flex-wrap">
        <ConfidenceBadge confidence={confidence} />
        <VerificationBadge verification={verification} />
      </div>
    </div>
  );
}

function SpecRow({
  specKey,
  label,
  mercuryData,
  competitorData,
  sourceName,
  sourceUrl,
}: {
  specKey: SpecKey;
  label: string;
  mercuryData: { value: string; confidence: Confidence; verification: VerificationStatus; notes?: string };
  competitorData: { value: string; confidence: Confidence; verification: VerificationStatus; notes?: string };
  sourceName: string;
  sourceUrl: string;
}) {
  const { locale } = useLanguageStore();
  const dict = getDictionary(locale);
  const [notesOpen, setNotesOpen] = useState(false);
  const hasNotes = !!(mercuryData.notes || competitorData.notes);

  return (
    <Collapsible open={notesOpen} onOpenChange={setNotesOpen}>
      <div
        className={`
          grid grid-cols-1 md:grid-cols-[180px_1fr_1fr_140px] gap-4 p-4
          ${specKeys.indexOf(specKey) % 2 === 0 ? 'bg-mercury-warm-light' : 'bg-background'}
          transition-colors
        `}
      >
        {/* Spec Label */}
        <div className="flex items-center">
          <span className="text-sm font-semibold text-foreground">{label}</span>
        </div>

        {/* Mercury GP Value */}
        <div className="space-y-1">
          <ValueCell
            value={mercuryData.value}
            confidence={mercuryData.confidence}
            verification={mercuryData.verification}
          />
        </div>

        {/* Competitor Value */}
        <div className="space-y-1">
          <ValueCell
            value={competitorData.value}
            confidence={competitorData.confidence}
            verification={competitorData.verification}
          />
        </div>

        {/* Source Column */}
        <div className="flex items-start md:items-center gap-1">
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-mercury-gold-dark hover:text-mercury-gold transition-colors shrink-0"
            >
              <ExternalLink className="size-3" />
              <span className="truncate max-w-[100px]">{sourceName}</span>
            </a>
          )}
        </div>
      </div>

      {/* Expandable Notes */}
      {hasNotes && (
        <CollapsibleTrigger asChild>
          <button
            className={`
              w-full flex items-center justify-center gap-1 py-1.5 text-xs font-medium
              text-muted-foreground hover:text-foreground transition-colors
              ${notesOpen ? 'border-b' : 'border-t border-border'}
            `}
          >
            <ChevronDown
              className={`size-3 transition-transform duration-200 ${notesOpen ? 'rotate-180' : ''}`}
            />
            {dict.comparison.notesLabel}
          </button>
        </CollapsibleTrigger>
      )}
      <CollapsibleContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-3 bg-muted/50">
          {mercuryData.notes && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-mercury-gold-dark">Mercury GP</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{mercuryData.notes}</p>
            </div>
          )}
          {competitorData.notes && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-foreground">{dict.comparison.tableHeaders.competitor}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{competitorData.notes}</p>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function SpecCard({
  specKey,
  label,
  mercuryData,
  competitorData,
  sourceName,
  sourceUrl,
  competitorName,
}: {
  specKey: SpecKey;
  label: string;
  mercuryData: { value: string; confidence: Confidence; verification: VerificationStatus; notes?: string };
  competitorData: { value: string; confidence: Confidence; verification: VerificationStatus; notes?: string };
  sourceName: string;
  sourceUrl: string;
  competitorName: string;
}) {
  const { locale } = useLanguageStore();
  const dict = getDictionary(locale);
  const [notesOpen, setNotesOpen] = useState(false);
  const hasNotes = !!(mercuryData.notes || competitorData.notes);

  return (
    <Collapsible open={notesOpen} onOpenChange={setNotesOpen}>
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-mercury-gold-dark">{label}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mercury GP */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-mercury-gold-dark uppercase tracking-wider">
              Mercury GP
            </p>
            <ValueCell
              value={mercuryData.value}
              confidence={mercuryData.confidence}
              verification={mercuryData.verification}
            />
          </div>

          <Separator />

          {/* Competitor */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
              {competitorName}
            </p>
            <ValueCell
              value={competitorData.value}
              confidence={competitorData.confidence}
              verification={competitorData.verification}
            />
          </div>

          {/* Source */}
          {sourceUrl && (
            <div className="pt-1">
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-mercury-gold-dark hover:text-mercury-gold transition-colors"
              >
                <Globe className="size-3" />
                {sourceName}
                <ExternalLink className="size-2.5" />
              </a>
            </div>
          )}

          {/* Notes */}
          {hasNotes && (
            <>
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-center gap-1 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors border-t border-border">
                  <ChevronDown
                    className={`size-3 transition-transform duration-200 ${notesOpen ? 'rotate-180' : ''}`}
                  />
                  {dict.comparison.notesLabel}
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-2 pt-2 border-t border-border">
                  {mercuryData.notes && (
                    <div className="bg-mercury-warm-light rounded-lg p-3">
                      <p className="text-xs font-semibold text-mercury-gold-dark mb-1">Mercury GP</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{mercuryData.notes}</p>
                    </div>
                  )}
                  {competitorData.notes && (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-foreground mb-1">{competitorName}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{competitorData.notes}</p>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </>
          )}
        </CardContent>
      </Card>
    </Collapsible>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ComparisonPage({ slug }: { slug: string }) {
  const { locale, dir } = useLanguageStore();
  const dict = getDictionary(locale);
  const comparison = getComparisonBySlug(slug);

  if (!comparison) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Comparison not found.</p>
      </div>
    );
  }

  const { competitorName, competitorNameFa, data, sourceDate, sourceName, sourceUrl } = comparison;
  const displayName = locale === 'fa' ? competitorNameFa : competitorName;
  const pageTitle = dict.comparison.pageTitle.replace('{competitor}', displayName);
  const disclaimerText = dict.comparison.disclaimer.replace('{date}', sourceDate);

  const competitorHeader = dict.comparison.tableHeaders.competitor.replace('{name}', displayName);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Sticky Nav Bar */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => (window.location.href = '/')}
              className="text-xl md:text-2xl font-bold tracking-tight text-foreground hover:text-mercury-gold-dark transition-colors"
            >
              {locale === 'fa' ? 'مرکوری' : 'Mercury'}
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (window.location.href = '/')}
              className="gap-1.5 text-sm font-medium"
            >
              <ArrowLeft className={`size-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              {dict.comparison.backToHome}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <Badge
                variant="outline"
                className="mb-4 text-mercury-gold-dark border-mercury-gold/30 bg-mercury-warm/50"
              >
                {dict.comparison.sectionTag}
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
                {pageTitle}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {dict.comparison.pageSubtitle}
              </p>
            </motion.div>

            {/* Desktop: Table Layout */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden md:block"
            >
              {/* Table Header */}
              <div className="grid grid-cols-[180px_1fr_1fr_140px] gap-4 p-4 bg-foreground/[0.04] rounded-t-xl border border-border border-b-0">
                <div className="flex items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {dict.comparison.tableHeaders.spec}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-mercury-gold-dark">
                    {dict.comparison.tableHeaders.mercuryGp}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    {competitorHeader}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {dict.comparison.tableHeaders.source}
                  </span>
                </div>
              </div>

              {/* Table Body */}
              <div className="border border-border border-t-0 rounded-b-xl overflow-hidden">
                {specKeys.map((key) => (
                  <SpecRow
                    key={key}
                    specKey={key}
                    label={dict.comparison.specLabels[key]}
                    mercuryData={mercuryGpDevice[key]}
                    competitorData={data[key]}
                    sourceName={sourceName}
                    sourceUrl={sourceUrl}
                  />
                ))}
              </div>
            </motion.div>

            {/* Mobile: Card Layout */}
            <div className="md:hidden space-y-4">
              {specKeys.map((key, index) => (
                <motion.div
                  key={key}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeInUp}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <SpecCard
                    specKey={key}
                    label={dict.comparison.specLabels[key]}
                    mercuryData={mercuryGpDevice[key]}
                    competitorData={data[key]}
                    sourceName={sourceName}
                    sourceUrl={sourceUrl}
                    competitorName={displayName}
                  />
                </motion.div>
              ))}
            </div>

            {/* Disclaimer */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 md:mt-16"
            >
              <div className="bg-muted/50 border border-border rounded-xl p-6">
                <p className="text-xs text-muted-foreground leading-relaxed">{disclaimerText}</p>
              </div>
            </motion.div>

            {/* Back to Home Button */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeInUp}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-8 text-center"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = '/')}
                className="gap-2 border-mercury-gold/30 text-mercury-gold-dark hover:bg-mercury-warm"
              >
                <ArrowLeft className={`size-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                {dict.comparison.backToHome}
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground/60 text-center">
            &copy; {new Date().getFullYear()} {locale === 'fa' ? '\u0645\u0631\u06a9\u0648\u0631\u06cc' : 'Mercury'}. {locale === 'fa' ? '\u062a\u0645\u0627\u0645\u06cc \u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638 \u0627\u0633\u062a.' : 'All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
