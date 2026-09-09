'use client';

import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useAdminStore } from '@/stores/admin-store';
import type {
  SEOSettings,
  GeoSettings,
  AIOSettings,
  GoogleIntegration,
  SocialSettings,
  SchemaSettings,
} from '@/stores/admin-store';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  Search,
  Globe,
  Bot,
  BarChart3,
  Smartphone,
  FileCode2,
  Download,
  Upload,
  RotateCcw,
  Copy,
  Check,
  Plus,
  X,
  Eye,
  AlertTriangle,
  Info,
  ExternalLink,
  MapPin,
  Code,
  Save,
  Clock,
  CheckCircle2,
  Tag,
  Trash2,
} from 'lucide-react';

/* ──────────────── helpers ──────────────── */

function CharCount({ current, max, warn }: { current: number; max: number; warn?: number }) {
  const isWarn = warn ? current > warn : current > max;
  return (
    <span
      className={`text-xs ml-auto tabular-nums ${
        isWarn ? 'text-red-500 font-semibold' : 'text-muted-foreground'
      }`}
    >
      {current}/{max}
    </span>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-muted-foreground mt-1 flex items-start gap-1">
      <Info className="size-3 shrink-0 mt-0.5" />
      {children}
    </p>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);
  return (
    <Button variant="ghost" size="icon" className="size-8 shrink-0" onClick={handleCopy}>
      {copied ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
    </Button>
  );
}

function TestButton({ label, validate }: { label: string; validate: () => boolean }) {
  const [status, setStatus] = useState<'idle' | 'pass' | 'fail'>('idle');
  const handleTest = useCallback(() => {
    setStatus(validate() ? 'pass' : 'fail');
    setTimeout(() => setStatus('idle'), 3000);
  }, [validate]);
  return (
    <Button
      variant="outline"
      size="sm"
      className="text-xs h-7"
      onClick={handleTest}
    >
      {status === 'pass' ? (
        <CheckCircle2 className="size-3.5 text-green-500 mr-1" />
      ) : status === 'fail' ? (
        <AlertTriangle className="size-3.5 text-red-500 mr-1" />
      ) : null}
      {status === 'pass' ? 'Valid' : status === 'fail' ? 'Invalid' : `Test ${label}`}
    </Button>
  );
}

/* ──────────────── Tag Input ──────────────── */

function TagInput({
  tags,
  onAdd,
  onRemove,
}: {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (idx: number) => void;
}) {
  const [value, setValue] = useState('');
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && value.trim()) {
      e.preventDefault();
      onAdd(value.trim());
      setValue('');
    }
  };
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5 min-h-[28px]">
        {tags.map((tag, i) => (
          <Badge key={i} variant="secondary" className="gap-1 pr-1">
            <Tag className="size-3" />
            {tag}
            <button
              onClick={() => onRemove(i)}
              className="ml-0.5 hover:text-red-500 transition-colors"
              aria-label={`Remove ${tag}`}
            >
              <X className="size-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter to add…"
        className="h-8 text-sm"
      />
    </div>
  );
}

/* ──────────────── Language Pair Input ──────────────── */

function LanguagePairsInput({
  pairs,
  onChange,
}: {
  pairs: { code: string; href: string }[];
  onChange: (pairs: { code: string; href: string }[]) => void;
}) {
  const addPair = () => onChange([...pairs, { code: '', href: '' }]);
  const removePair = (idx: number) => onChange(pairs.filter((_, i) => i !== idx));
  const updatePair = (idx: number, field: 'code' | 'href', val: string) => {
    const next = [...pairs];
    next[idx] = { ...next[idx], [field]: val };
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {pairs.map((pair, i) => (
        <div key={i} className="flex gap-2 items-center">
          <Input
            value={pair.code}
            onChange={(e) => updatePair(i, 'code', e.target.value)}
            placeholder="en-US"
            className="h-8 text-sm w-24"
          />
          <Input
            value={pair.href}
            onChange={(e) => updatePair(i, 'href', e.target.value)}
            placeholder="https://example.com"
            className="h-8 text-sm flex-1"
          />
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            onClick={() => removePair(i)}
            aria-label="Remove language"
          >
            <Trash2 className="size-3.5 text-red-500" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addPair} className="h-7 text-xs">
        <Plus className="size-3.5 mr-1" /> Add Language
      </Button>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════ */

export default function AdminPanel() {
  const store = useAdminStore();
  const { seo, geo, aio, google, social, schema } = store;
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ─── Export / Import ─── */
  const handleExport = useCallback(() => {
    const json = store.exportSettings();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mercury-admin-settings-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setLastSaved(new Date());
  }, [store]);

  const handleImport = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        store.importSettings(text);
        setLastSaved(new Date());
      };
      reader.readAsText(file);
      e.target.value = '';
    },
    [store]
  );

  const handleReset = useCallback(() => {
    store.resetAll();
    setLastSaved(new Date());
  }, [store]);

  /* ─── JSON-LD Preview ─── */
  const jsonLdPreview = useMemo(() => {
    return JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: schema.productName,
        sku: schema.productSku,
        mpn: schema.productMpn,
        brand: {
          '@type': 'Brand',
          name: schema.brandName,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: schema.aggregateRatingValue,
          ratingCount: schema.aggregateRatingCount,
          reviewCount: schema.reviewCount,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: schema.priceCurrency,
          price: schema.priceValue,
          seller: {
            '@type': 'Organization',
            name: schema.organizationName,
            url: schema.organizationUrl,
          },
        },
      },
      null,
      2
    );
  }, [schema]);

  /* ─── robots.txt Preview ─── */
  const robotsPreview = useMemo(() => {
    const lines: string[] = ['User-agent: *'];
    if (seo.robotsIndex) lines.push('Allow: /');
    else lines.push('Disallow: /');
    lines.push('');
    if (!aio.allowGPTBot) { lines.push('User-agent: GPTBot'); lines.push('Disallow: /'); lines.push(''); }
    if (!aio.allowChatGPTUser) { lines.push('User-agent: ChatGPT-User'); lines.push('Disallow: /'); lines.push(''); }
    if (!aio.allowCCBot) { lines.push('User-agent: CCBot'); lines.push('Disallow: /'); lines.push(''); }
    if (!aio.allowGoogleExtended) { lines.push('User-agent: Google-Extended'); lines.push('Disallow: /'); lines.push(''); }
    if (!aio.allowApplebot) { lines.push('User-agent: Applebot'); lines.push('Disallow: /'); lines.push(''); }
    if (!aio.allowClaudeBot) { lines.push('User-agent: ClaudeBot'); lines.push('Disallow: /'); lines.push(''); }
    return lines.join('\n');
  }, [seo.robotsIndex, aio.allowGPTBot, aio.allowChatGPTUser, aio.allowCCBot, aio.allowGoogleExtended, aio.allowApplebot, aio.allowClaudeBot]);

  /* ─── Validation helpers ─── */
  const validateGA = useCallback(() => /^G-[A-Z0-9]{10}$/.test(google.gaMeasurementId), [google.gaMeasurementId]);
  const validateGTM = useCallback(() => /^GTM-[A-Z0-9]{7}$/.test(google.gtmContainerId), [google.gtmContainerId]);
  const validateAds = useCallback(() => /^AW-[A-Z0-9]+\/[A-Z0-9]+$/.test(google.adsConversionId) || google.adsConversionId === '', [google.adsConversionId]);

  /* ══════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════ */

  return (
    <div className="w-full max-w-5xl mx-auto" style={{ background: '#FAFAF8' }}>
      {/* Header */}
      <div className="mb-6">
        <h1
          className="text-2xl sm:text-3xl font-bold tracking-tight"
          style={{ color: '#B8A48E' }}
        >
          Mercury GP Admin Panel
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          SEO, Geo, AIO &amp; Social management dashboard
        </p>
      </div>

      <Tabs defaultValue="seo" className="w-full">
        {/* ── Tab List ── */}
        <TabsList className="w-full flex-wrap h-auto gap-1 p-1 mb-4">
          <TabsTrigger value="seo" className="gap-1.5 text-xs sm:text-sm">
            <Search className="size-4" /> SEO
          </TabsTrigger>
          <TabsTrigger value="geo" className="gap-1.5 text-xs sm:text-sm">
            <Globe className="size-4" /> Geo
          </TabsTrigger>
          <TabsTrigger value="aio" className="gap-1.5 text-xs sm:text-sm">
            <Bot className="size-4" /> AIO
          </TabsTrigger>
          <TabsTrigger value="google" className="gap-1.5 text-xs sm:text-sm">
            <BarChart3 className="size-4" /> Google
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-1.5 text-xs sm:text-sm">
            <Smartphone className="size-4" /> Social
          </TabsTrigger>
          <TabsTrigger value="schema" className="gap-1.5 text-xs sm:text-sm">
            <FileCode2 className="size-4" /> Schema
          </TabsTrigger>
        </TabsList>

        {/* ════════════════════════════════════
            TAB 1 — SEO
            ════════════════════════════════════ */}
        <TabsContent value="seo">
          <div className="grid gap-4">
            {/* Site Title */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Search className="size-4" style={{ color: '#B8A48E' }} /> Basic SEO Settings
                </CardTitle>
                <CardDescription>Configure core search engine optimization meta tags</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Site Title */}
                <div className="space-y-1.5">
                  <Label htmlFor="seo-title">Site Title</Label>
                  <Input
                    id="seo-title"
                    value={seo.siteTitle}
                    onChange={(e) => store.updateSEO({ siteTitle: e.target.value })}
                    placeholder="Mercury GP | Premium IPL Device"
                  />
                  <Hint>The title tag appears in search engine results and browser tabs. Keep under 60 characters for best display.</Hint>
                </div>

                {/* Site Description */}
                <div className="space-y-1.5">
                  <div className="flex items-center">
                    <Label htmlFor="seo-desc">Site Description</Label>
                    <CharCount current={seo.siteDescription.length} max={300} warn={160} />
                  </div>
                  <Textarea
                    id="seo-desc"
                    value={seo.siteDescription}
                    onChange={(e) => store.updateSEO({ siteDescription: e.target.value })}
                    placeholder="Describe your site…"
                    rows={3}
                    className={seo.siteDescription.length > 160 ? 'border-red-300 focus-visible:border-red-500' : ''}
                  />
                  {seo.siteDescription.length > 160 && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertTriangle className="size-3" /> Exceeds 160 characters — may be truncated in search results
                    </p>
                  )}
                  <Hint>Optimal length is 150–160 characters for Google search snippets.</Hint>
                </div>

                {/* Keywords */}
                <div className="space-y-1.5">
                  <Label>Keywords</Label>
                  <TagInput
                    tags={seo.keywords}
                    onAdd={(tag) => store.updateSEO({ keywords: [...seo.keywords, tag] })}
                    onRemove={(idx) =>
                      store.updateSEO({ keywords: seo.keywords.filter((_, i) => i !== idx) })
                    }
                  />
                  <Hint>While meta keywords have limited SEO impact, they help define content focus for internal tooling.</Hint>
                </div>

                {/* Canonical URL */}
                <div className="space-y-1.5">
                  <Label htmlFor="seo-canonical">Canonical URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="seo-canonical"
                      value={seo.canonicalUrl}
                      onChange={(e) => store.updateSEO({ canonicalUrl: e.target.value })}
                      placeholder="https://mercurygp.ir"
                      className="flex-1"
                    />
                    <CopyButton text={seo.canonicalUrl} />
                  </div>
                  <Hint>Set the preferred URL to avoid duplicate content issues.</Hint>
                </div>
              </CardContent>
            </Card>

            {/* Robots Directives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Bot className="size-4" style={{ color: '#B8A48E' }} /> Robots Directives
                </CardTitle>
                <CardDescription>Control how search engine crawlers index your site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={seo.robotsIndex}
                      onCheckedChange={(v) => store.updateSEO({ robotsIndex: v })}
                      id="robots-index"
                    />
                    <Label htmlFor="robots-index" className="cursor-pointer">
                      Allow Indexing
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={seo.robotsFollow}
                      onCheckedChange={(v) => store.updateSEO({ robotsFollow: v })}
                      id="robots-follow"
                    />
                    <Label htmlFor="robots-follow" className="cursor-pointer">
                      Allow Following
                    </Label>
                  </div>
                </div>

                <Separator />

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="max-snippet">Max Snippet</Label>
                    <Input
                      id="max-snippet"
                      type="number"
                      value={seo.maxSnippet}
                      onChange={(e) => store.updateSEO({ maxSnippet: Number(e.target.value) })}
                    />
                    <Hint>-1 = no limit</Hint>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Max Image Preview</Label>
                    <Select
                      value={seo.maxImagePreview}
                      onValueChange={(v: SEOSettings['maxImagePreview']) =>
                        store.updateSEO({ maxImagePreview: v })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="max-video">Max Video Preview</Label>
                    <Input
                      id="max-video"
                      type="number"
                      value={seo.maxVideoPreview}
                      onChange={(e) => store.updateSEO({ maxVideoPreview: Number(e.target.value) })}
                    />
                    <Hint>Seconds (-1 = no limit)</Hint>
                  </div>
                </div>

                <Separator />

                {/* Google Site Verification */}
                <div className="space-y-1.5">
                  <Label htmlFor="google-verify">Google Site Verification</Label>
                  <div className="flex gap-2">
                    <Input
                      id="google-verify"
                      value={seo.googleVerification}
                      onChange={(e) => store.updateSEO({ googleVerification: e.target.value })}
                      placeholder="e.g. abc123xyz456"
                      className="flex-1"
                    />
                    <CopyButton text={seo.googleVerification} />
                  </div>
                  <Hint>Obtain from Google Search Console &gt; Settings &gt; Ownership verification.</Hint>
                </div>
              </CardContent>
            </Card>

            {/* Save SEO */}
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  store.updateSEO({});
                  setLastSaved(new Date());
                }}
                style={{ background: '#B8A48E', color: '#fff' }}
                className="hover:opacity-90"
              >
                <Save className="size-4 mr-2" /> Save SEO Settings
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* ════════════════════════════════════
            TAB 2 — GEO
            ════════════════════════════════════ */}
        <TabsContent value="geo">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Globe className="size-4" style={{ color: '#B8A48E' }} /> Geographic Targeting
                </CardTitle>
                <CardDescription>Set geo-meta tags for regional search targeting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="geo-country">Country Code</Label>
                    <Input
                      id="geo-country"
                      value={geo.country}
                      onChange={(e) => store.updateGeo({ country: e.target.value.toUpperCase().slice(0, 2) })}
                      placeholder="IR"
                      maxLength={2}
                    />
                    <Hint>2-letter ISO 3166-1 country code</Hint>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="geo-region">Region Code</Label>
                    <Input
                      id="geo-region"
                      value={geo.region}
                      onChange={(e) => store.updateGeo({ region: e.target.value })}
                      placeholder="IR-22"
                    />
                    <Hint>ISO 3166-2 region code</Hint>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="geo-place">Place Name</Label>
                  <Input
                    id="geo-place"
                    value={geo.placeName}
                    onChange={(e) => store.updateGeo({ placeName: e.target.value })}
                    placeholder="Tehran"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="geo-lat">Latitude</Label>
                    <Input
                      id="geo-lat"
                      value={geo.latitude}
                      onChange={(e) => store.updateGeo({ latitude: e.target.value })}
                      placeholder="35.6892"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="geo-lng">Longitude</Label>
                    <Input
                      id="geo-lng"
                      value={geo.longitude}
                      onChange={(e) => store.updateGeo({ longitude: e.target.value })}
                      placeholder="51.3890"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <Label>Target Languages (hreflang)</Label>
                  <LanguagePairsInput
                    pairs={geo.targetLanguages}
                    onChange={(v) => store.updateGeo({ targetLanguages: v })}
                  />
                  <Hint>Add language-region pairs for international SEO with alternate page URLs.</Hint>
                </div>
              </CardContent>
            </Card>

            {/* Meta Tag Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Eye className="size-4" style={{ color: '#B8A48E' }} /> Meta Tag Preview
                </CardTitle>
                <CardDescription>Resulting geo-meta tags from current settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4 font-mono text-xs space-y-1.5 overflow-x-auto max-h-64 overflow-y-auto">
                  {geo.region && (
                    <div>
                      <span className="text-muted-foreground">{'<meta '}</span>
                      name=<span className="text-green-600">&quot;geo.region&quot;</span>{' '}
                      content=<span className="text-blue-600">&quot;{geo.region}&quot;</span>
                      <span className="text-muted-foreground">{' />'}</span>
                    </div>
                  )}
                  {geo.placeName && (
                    <div>
                      <span className="text-muted-foreground">{'<meta '}</span>
                      name=<span className="text-green-600">&quot;geo.placename&quot;</span>{' '}
                      content=<span className="text-blue-600">&quot;{geo.placeName}&quot;</span>
                      <span className="text-muted-foreground">{' />'}</span>
                    </div>
                  )}
                  {geo.latitude && geo.longitude && (
                    <>
                      <div>
                        <span className="text-muted-foreground">{'<meta '}</span>
                        name=<span className="text-green-600">&quot;geo.position&quot;</span>{' '}
                        content=<span className="text-blue-600">&quot;{geo.latitude};{geo.longitude}&quot;</span>
                        <span className="text-muted-foreground">{' />'}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{'<meta '}</span>
                        name=<span className="text-green-600">&quot;ICBM&quot;</span>{' '}
                        content=<span className="text-blue-600">&quot;{geo.latitude}, {geo.longitude}&quot;</span>
                        <span className="text-muted-foreground">{' />'}</span>
                      </div>
                    </>
                  )}
                  {geo.targetLanguages.map((lang, i) => (
                    <div key={i}>
                      <span className="text-muted-foreground">{'<link '}</span>
                      rel=<span className="text-green-600">&quot;alternate&quot;</span>{' '}
                      hreflang=<span className="text-green-600">&quot;{lang.code}&quot;</span>{' '}
                      href=<span className="text-blue-600">&quot;{lang.href}&quot;</span>
                      <span className="text-muted-foreground">{' />'}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                onClick={() => {
                  store.updateGeo({});
                  setLastSaved(new Date());
                }}
                style={{ background: '#B8A48E', color: '#fff' }}
                className="hover:opacity-90"
              >
                <Save className="size-4 mr-2" /> Save Geo Settings
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* ════════════════════════════════════
            TAB 3 — AIO
            ════════════════════════════════════ */}
        <TabsContent value="aio">
          <div className="grid gap-4">
            {/* AI Crawler Rules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Bot className="size-4" style={{ color: '#B8A48E' }} /> AI Crawler Rules
                </CardTitle>
                <CardDescription>Control which AI bots may crawl your content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {([
                  ['allowGPTBot', 'GPTBot', 'OpenAI\'s GPT crawler'],
                  ['allowChatGPTUser', 'ChatGPT-User', 'ChatGPT user-facing requests'],
                  ['allowCCBot', 'CCBot', 'Common Crawl bot'],
                  ['allowGoogleExtended', 'Google-Extended', 'Google\'s AI training data opt-out'],
                  ['allowApplebot', 'Applebot', 'Apple\'s web crawler (Siri, Spotlight)'],
                  ['allowClaudeBot', 'ClaudeBot', 'Anthropic\'s Claude crawler'],
                ] as const).map(([key, label, desc]) => (
                  <div key={key} className="flex items-center justify-between gap-4 py-1">
                    <div className="space-y-0.5">
                      <Label htmlFor={key} className="cursor-pointer font-medium">
                        {label}
                      </Label>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={aio[key] ? 'default' : 'outline'} className="text-[10px]">
                        {aio[key] ? 'Allow' : 'Block'}
                      </Badge>
                      <Switch
                        id={key}
                        checked={aio[key] as boolean}
                        onCheckedChange={(v) => store.updateAIO({ [key]: v })}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chatbot System Prompt */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Code className="size-4" style={{ color: '#B8A48E' }} /> Chatbot System Prompt
                </CardTitle>
                <CardDescription>Default instructions for the AI chatbot assistant</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="aio-prompt">System Prompt</Label>
                  <CharCount current={aio.chatbotSystemPrompt.length} max={2000} />
                </div>
                <Textarea
                  id="aio-prompt"
                  value={aio.chatbotSystemPrompt}
                  onChange={(e) => store.updateAIO({ chatbotSystemPrompt: e.target.value })}
                  rows={5}
                />
              </CardContent>
            </Card>

            {/* Structured Data Schemas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileCode2 className="size-4" style={{ color: '#B8A48E' }} /> Structured Data Schemas
                </CardTitle>
                <CardDescription>Enable/disable structured data types for AI comprehension</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {([
                  ['enableStructuredData', 'All Schemas', 'Master toggle for all structured data'],
                  ['enableProductSchema', 'Product', 'Product pricing & availability schema'],
                  ['enableFAQSchema', 'FAQ', 'Frequently asked questions schema'],
                  ['enableHowToSchema', 'HowTo', 'Step-by-step guide schema'],
                  ['enableOrganizationSchema', 'Organization', 'Business/organization details schema'],
                ] as const).map(([key, label, desc]) => (
                  <div key={key} className="flex items-center justify-between gap-4 py-1">
                    <div className="space-y-0.5">
                      <Label htmlFor={key} className="cursor-pointer font-medium">
                        {label}
                      </Label>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <Switch
                      id={key}
                      checked={aio[key] as boolean}
                      onCheckedChange={(v) => store.updateAIO({ [key]: v })}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* robots.txt Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Eye className="size-4" style={{ color: '#B8A48E' }} /> robots.txt Preview
                </CardTitle>
                <CardDescription>Generated rules based on current crawler settings</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted/50 rounded-lg p-4 font-mono text-xs overflow-x-auto whitespace-pre">
                  {robotsPreview}
                </pre>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                onClick={() => {
                  store.updateAIO({});
                  setLastSaved(new Date());
                }}
                style={{ background: '#B8A48E', color: '#fff' }}
                className="hover:opacity-90"
              >
                <Save className="size-4 mr-2" /> Save AIO Settings
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* ════════════════════════════════════
            TAB 4 — GOOGLE INTEGRATION
            ════════════════════════════════════ */}
        <TabsContent value="google">
          <div className="grid gap-4">
            {/* Google Analytics 4 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="size-4" style={{ color: '#B8A48E' }} /> Google Analytics 4
                </CardTitle>
                <CardDescription>Configure GA4 measurement tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="ga-id">Measurement ID</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="ga-id"
                      value={google.gaMeasurementId}
                      onChange={(e) => store.updateGoogle({ gaMeasurementId: e.target.value })}
                      placeholder="G-XXXXXXXXXX"
                      className="flex-1"
                    />
                    <TestButton label="Format" validate={validateGA} />
                  </div>
                  <Hint>Format: G-XXXXXXXXXX (10 alphanumeric characters after G-)</Hint>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-xs font-mono">
                  <span className="text-muted-foreground">{'<!-- Google Analytics 4 -->'}</span>
                  <br />
                  {'<script async src="https://www.googletagmanager.com/gtag/js?id='}
                  <span className="text-blue-600">{google.gaMeasurementId || 'G-XXXXXXXXXX'}</span>
                  {'"></script>'}
                </div>
              </CardContent>
            </Card>

            {/* Google Tag Manager */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Code className="size-4" style={{ color: '#B8A48E' }} /> Google Tag Manager
                </CardTitle>
                <CardDescription>Configure GTM container for tag management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="gtm-id">Container ID</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="gtm-id"
                      value={google.gtmContainerId}
                      onChange={(e) => store.updateGoogle({ gtmContainerId: e.target.value })}
                      placeholder="GTM-XXXXXXX"
                      className="flex-1"
                    />
                    <TestButton label="Format" validate={validateGTM} />
                  </div>
                  <Hint>Format: GTM-XXXXXXX (7 alphanumeric characters after GTM-)</Hint>
                </div>
              </CardContent>
            </Card>

            {/* Search Console */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Search className="size-4" style={{ color: '#B8A48E' }} /> Search Console
                </CardTitle>
                <CardDescription>Link Google Search Console for site verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="sc-verify">Verification Code</Label>
                  <Input
                    id="sc-verify"
                    value={google.searchConsoleVerification}
                    onChange={(e) => {
                      store.updateGoogle({ searchConsoleVerification: e.target.value });
                      store.updateSEO({ googleVerification: e.target.value });
                    }}
                    placeholder="Enter verification meta tag content"
                  />
                  <Hint>Automatically syncs to SEO &gt; Google Site Verification field.</Hint>
                </div>
              </CardContent>
            </Card>

            {/* Google Ads */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="size-4" style={{ color: '#B8A48E' }} /> Google Ads
                </CardTitle>
                <CardDescription>Conversion tracking configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="ads-id">Conversion ID</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="ads-id"
                      value={google.adsConversionId}
                      onChange={(e) => store.updateGoogle({ adsConversionId: e.target.value })}
                      placeholder="AW-XXXXXXXXX/XXXXXXXXXX"
                      className="flex-1"
                    />
                    <TestButton label="Format" validate={validateAds} />
                  </div>
                  <Hint>Format: AW-XXXXXXXXX/XXXXXXXXXX</Hint>
                </div>
              </CardContent>
            </Card>

            {/* Google Maps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="size-4" style={{ color: '#B8A48E' }} /> Google Maps
                </CardTitle>
                <CardDescription>Maps embed API key for store locator / geo features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="maps-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="maps-key"
                      type="password"
                      value={google.mapsApiKey}
                      onChange={(e) => store.updateGoogle({ mapsApiKey: e.target.value })}
                      placeholder="AIza…"
                      className="flex-1"
                    />
                    <CopyButton text={google.mapsApiKey} />
                  </div>
                  <Hint>Restrict this key to your domain in Google Cloud Console for security.</Hint>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                onClick={() => {
                  store.updateGoogle({});
                  setLastSaved(new Date());
                }}
                style={{ background: '#B8A48E', color: '#fff' }}
                className="hover:opacity-90"
              >
                <Save className="size-4 mr-2" /> Save Google Settings
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* ════════════════════════════════════
            TAB 5 — SOCIAL / OG
            ════════════════════════════════════ */}
        <TabsContent value="social">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Smartphone className="size-4" style={{ color: '#B8A48E' }} /> Open Graph Settings
                </CardTitle>
                <CardDescription>Configure how your site appears when shared on social platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* OG Title */}
                <div className="space-y-1.5">
                  <div className="flex items-center">
                    <Label htmlFor="og-title">OG Title</Label>
                    <CharCount current={social.ogTitle.length} max={95} />
                  </div>
                  <Input
                    id="og-title"
                    value={social.ogTitle}
                    onChange={(e) => store.updateSocial({ ogTitle: e.target.value })}
                    placeholder="Title for social sharing"
                  />
                  <Hint>Recommended: under 60 characters. Facebook displays up to ~95.</Hint>
                </div>

                {/* OG Description */}
                <div className="space-y-1.5">
                  <div className="flex items-center">
                    <Label htmlFor="og-desc">OG Description</Label>
                    <CharCount current={social.ogDescription.length} max={300} warn={200} />
                  </div>
                  <Textarea
                    id="og-desc"
                    value={social.ogDescription}
                    onChange={(e) => store.updateSocial({ ogDescription: e.target.value })}
                    rows={3}
                    className={social.ogDescription.length > 200 ? 'border-red-300 focus-visible:border-red-500' : ''}
                  />
                  {social.ogDescription.length > 200 && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertTriangle className="size-3" /> May be truncated on some platforms (optimal ≤ 200 chars)
                    </p>
                  )}
                </div>

                {/* OG Image */}
                <div className="space-y-1.5">
                  <Label htmlFor="og-image">OG Image URL</Label>
                  <Input
                    id="og-image"
                    value={social.ogImageUrl}
                    onChange={(e) => store.updateSocial({ ogImageUrl: e.target.value })}
                    placeholder="/images/og-image.jpg"
                  />
                  {social.ogImageUrl && (
                    <div className="mt-2 rounded-lg overflow-hidden border bg-muted/30 max-w-xs">
                      <img
                        src={social.ogImageUrl}
                        alt="OG preview"
                        className="w-full h-auto max-h-40 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* OG Image Dimensions */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="og-width">Image Width (px)</Label>
                    <Input
                      id="og-width"
                      type="number"
                      value={social.ogImageWidth}
                      onChange={(e) => store.updateSocial({ ogImageWidth: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="og-height">Image Height (px)</Label>
                    <Input
                      id="og-height"
                      type="number"
                      value={social.ogImageHeight}
                      onChange={(e) => store.updateSocial({ ogImageHeight: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <Separator />

                {/* Twitter Card */}
                <div className="space-y-1.5">
                  <Label>Twitter Card Type</Label>
                  <Select
                    value={social.twitterCard}
                    onValueChange={(v: SocialSettings['twitterCard']) =>
                      store.updateSocial({ twitterCard: v })
                    }
                  >
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">summary</SelectItem>
                      <SelectItem value="summary_large_image">summary_large_image</SelectItem>
                    </SelectContent>
                  </Select>
                  <Hint>Use summary_large_image for a prominent image card.</Hint>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="tw-site">Twitter Site Handle</Label>
                    <Input
                      id="tw-site"
                      value={social.twitterSite}
                      onChange={(e) => store.updateSocial({ twitterSite: e.target.value })}
                      placeholder="@mercurygp_ir"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="tw-creator">Twitter Creator Handle</Label>
                    <Input
                      id="tw-creator"
                      value={social.twitterCreator}
                      onChange={(e) => store.updateSocial({ twitterCreator: e.target.value })}
                      placeholder="@mercurygp_ir"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Preview Cards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Eye className="size-4" style={{ color: '#B8A48E' }} /> Live Preview
                </CardTitle>
                <CardDescription>How your page appears when shared</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Facebook/LinkedIn Card */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                    <ExternalLink className="size-3" /> Facebook / LinkedIn Preview
                  </p>
                  <div className="border rounded-lg overflow-hidden max-w-md bg-white">
                    <div className="bg-muted/50 h-40 flex items-center justify-center overflow-hidden">
                      {social.ogImageUrl ? (
<img
                          src={social.ogImageUrl}
                          alt="OG preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-muted-foreground text-xs">No image set</span>
                      )}
                    </div>
                    <div className="p-3 space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        {seo.canonicalUrl || 'example.com'}
                      </p>
                      <p className="text-sm font-semibold text-foreground line-clamp-2">
                        {social.ogTitle || 'Untitled'}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {social.ogDescription || 'No description'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Twitter Card */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                    <ExternalLink className="size-3" /> Twitter Preview
                  </p>
                  <div className="border rounded-lg overflow-hidden max-w-md bg-white flex">
                    {social.twitterCard === 'summary_large_image' ? (
                      <div className="w-full">
                        <div className="bg-muted/50 h-40 flex items-center justify-center overflow-hidden">
                          {social.ogImageUrl ? (
                            <img
                              src={social.ogImageUrl}
                              alt="Twitter preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <span className="text-muted-foreground text-xs">No image</span>
                          )}
                        </div>
                        <div className="p-3 space-y-1">
                          <p className="text-sm font-semibold text-foreground line-clamp-1">
                            {social.ogTitle || 'Untitled'}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {social.ogDescription || 'No description'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {seo.canonicalUrl || 'example.com'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="bg-muted/50 w-28 h-28 shrink-0 flex items-center justify-center overflow-hidden">
                          {social.ogImageUrl ? (
                            <img
                              src={social.ogImageUrl}
                              alt="Twitter preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <span className="text-muted-foreground text-[10px]">No img</span>
                          )}
                        </div>
                        <div className="p-3 space-y-1 flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground line-clamp-1">
                            {social.ogTitle || 'Untitled'}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {social.ogDescription || 'No description'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {seo.canonicalUrl || 'example.com'}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                onClick={() => {
                  store.updateSocial({});
                  setLastSaved(new Date());
                }}
                style={{ background: '#B8A48E', color: '#fff' }}
                className="hover:opacity-90"
              >
                <Save className="size-4 mr-2" /> Save Social Settings
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* ═══════════*═══════════════════════
            TAB 6 — SCHEMA
            ════════════════════════════════════ */}
        <TabsContent value="schema">
          <div className="grid gap-4">
            {/* Product Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileCode2 className="size-4" style={{ color: '#B8A48E' }} /> Product Schema
                </CardTitle>
                <CardDescription>Configure structured data for the Product type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="s-name">Product Name</Label>
                    <Input
                      id="s-name"
                      value={schema.productName}
                      onChange={(e) => store.updateSchema({ productName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="s-sku">SKU</Label>
                    <Input
                      id="s-sku"
                      value={schema.productSku}
                      onChange={(e) => store.updateSchema({ productSku: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="s-mpn">MPN</Label>
                    <Input
                      id="s-mpn"
                      value={schema.productMpn}
                      onChange={(e) => store.updateSchema({ productMpn: e.target.value })}
                    />
                  </div>
                </div>

                <Separator />

                {/* Ratings */}
                <div>
                  <p className="text-sm font-medium mb-3">Aggregate Rating</p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="s-rating-val">Rating Value</Label>
                      <Input
                        id="s-rating-val"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={schema.aggregateRatingValue}
                        onChange={(e) => store.updateSchema({ aggregateRatingValue: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="s-rating-count">Rating Count</Label>
                      <Input
                        id="s-rating-count"
                        type="number"
                        min="0"
                        value={schema.aggregateRatingCount}
                        onChange={(e) => store.updateSchema({ aggregateRatingCount: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="s-review-count">Review Count</Label>
                      <Input
                        id="s-review-count"
                        type="number"
                        min="0"
                        value={schema.reviewCount}
                        onChange={(e) => store.updateSchema({ reviewCount: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Brand & Organization */}
                <div>
                  <p className="text-sm font-medium mb-3">Brand &amp; Organization</p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="s-brand">Brand Name</Label>
                      <Input
                        id="s-brand"
                        value={schema.brandName}
                        onChange={(e) => store.updateSchema({ brandName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="s-org-name">Organization Name</Label>
                      <Input
                        id="s-org-name"
                        value={schema.organizationName}
                        onChange={(e) => store.updateSchema({ organizationName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="s-org-url">Organization URL</Label>
                      <Input
                        id="s-org-url"
                        value={schema.organizationUrl}
                        onChange={(e) => store.updateSchema({ organizationUrl: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Pricing */}
                <div>
                  <p className="text-sm font-medium mb-3">Pricing</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="s-currency">Currency</Label>
                      <Input
                        id="s-currency"
                        value={schema.priceCurrency}
                        onChange={(e) => store.updateSchema({ priceCurrency: e.target.value.toUpperCase() })}
                        placeholder="IRR"
                        maxLength={3}
                      />
                      <Hint>3-letter ISO 4217 currency code</Hint>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="s-price">Price Value</Label>
                      <Input
                        id="s-price"
                        value={schema.priceValue}
                        onChange={(e) => store.updateSchema({ priceValue: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* JSON-LD Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Eye className="size-4" style={{ color: '#B8A48E' }} /> JSON-LD Preview
                </CardTitle>
                <CardDescription>Generated Product schema structured data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <pre className="bg-muted/50 rounded-lg p-4 font-mono text-xs overflow-x-auto whitespace-pre max-h-80 overflow-y-auto">
                  {jsonLdPreview}
                </pre>
                <div className="flex gap-2">
                  <CopyButton text={jsonLdPreview} />
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => {
                      try {
                        JSON.parse(jsonLdPreview);
                        alert('Valid JSON-LD');
                      } catch {
                        alert('Invalid JSON-LD');
                      }
                    }}
                  >
                    <Check className="size-3.5 mr-1" /> Validate JSON
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                onClick={() => {
                  store.updateSchema({});
                  setLastSaved(new Date());
                }}
                style={{ background: '#B8A48E', color: '#fff' }}
                className="hover:opacity-90"
              >
                <Save className="size-4 mr-2" /> Save Schema Settings
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* ════════════════════════════════════
          BOTTOM BAR
          ════════════════════════════════════ */}
      <Separator className="my-6" />

      <div className="flex flex-wrap items-center gap-3 pb-4">
        <Button
          variant="outline"
          onClick={handleExport}
          className="gap-2"
        >
          <Download className="size-4" /> Export Settings
        </Button>

        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="gap-2"
        >
          <Upload className="size-4" /> Import Settings
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />

        <Button
          variant="outline"
          onClick={handleReset}
          className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <RotateCcw className="size-4" /> Reset to Defaults
        </Button>

        {lastSaved && (
          <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
            <Clock className="size-3" />
            Last saved: {lastSaved.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
}
