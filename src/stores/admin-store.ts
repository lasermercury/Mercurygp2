'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SEOSettings {
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
  canonicalUrl: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  maxSnippet: number;
  maxImagePreview: 'none' | 'standard' | 'large';
  maxVideoPreview: number;
  googleVerification: string;
}

export interface GeoSettings {
  country: string;
  region: string;
  placeName: string;
  latitude: string;
  longitude: string;
  targetLanguages: { code: string; href: string }[];
}

export interface AIOSettings {
  allowGPTBot: boolean;
  allowChatGPTUser: boolean;
  allowCCBot: boolean;
  allowGoogleExtended: boolean;
  allowApplebot: boolean;
  allowClaudeBot: boolean;
  chatbotSystemPrompt: string;
  enableStructuredData: boolean;
  enableFAQSchema: boolean;
  enableHowToSchema: boolean;
  enableProductSchema: boolean;
  enableOrganizationSchema: boolean;
}

export interface GoogleIntegration {
  gaMeasurementId: string;
  gtmContainerId: string;
  searchConsoleVerification: string;
  adsConversionId: string;
  mapsApiKey: string;
}

export interface SocialSettings {
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  ogImageWidth: number;
  ogImageHeight: number;
  twitterCard: 'summary' | 'summary_large_image';
  twitterSite: string;
  twitterCreator: string;
}

export interface SchemaSettings {
  productName: string;
  productSku: string;
  productMpn: string;
  aggregateRatingValue: string;
  aggregateRatingCount: string;
  reviewCount: string;
  brandName: string;
  organizationName: string;
  organizationUrl: string;
  priceCurrency: string;
  priceValue: string;
}

export interface AdminSettings {
  seo: SEOSettings;
  geo: GeoSettings;
  aio: AIOSettings;
  google: GoogleIntegration;
  social: SocialSettings;
  schema: SchemaSettings;
}

const defaultSettings: AdminSettings = {
  seo: {
    siteTitle: 'Mercury GP | Premium Home-Use IPL Hair-Reduction Device',
    siteDescription:
      'Discover Mercury GP, a premium home-use IPL hair-reduction device with unlimited flashes, advanced cooling, and smart skin-sensor technology. Designed for effective at-home hair reduction on Fitzpatrick skin tones I–V.',
    keywords: [
      'Mercury GP',
      'IPL hair reduction',
      'home-use IPL',
      'hair reduction device',
      'Intense Pulsed Light',
      'at-home hair reduction',
      'unlimited flashes IPL',
      'Fitzpatrick I-V IPL',
      'beauty device',
    ],
    canonicalUrl: 'https://mercurygp.ir',
    robotsIndex: true,
    robotsFollow: true,
    maxSnippet: -1,
    maxImagePreview: 'large',
    maxVideoPreview: -1,
    googleVerification: '',
  },
  geo: {
    country: 'IR',
    region: 'IR-22',
    placeName: 'Tehran',
    latitude: '35.6892',
    longitude: '51.3890',
    targetLanguages: [
      { code: 'en-US', href: 'https://mercurygp.ir' },
      { code: 'fa-IR', href: 'https://mercurygp.ir/?lang=fa' },
    ],
  },
  aio: {
    allowGPTBot: false,
    allowChatGPTUser: false,
    allowCCBot: false,
    allowGoogleExtended: true,
    allowApplebot: true,
    allowClaudeBot: false,
    chatbotSystemPrompt: `You are the Mercury GP Product Advisor, a knowledgeable and helpful assistant for a premium home-use IPL hair-reduction device called "Mercury GP."`,
    enableStructuredData: true,
    enableFAQSchema: true,
    enableHowToSchema: true,
    enableProductSchema: true,
    enableOrganizationSchema: true,
  },
  google: {
    gaMeasurementId: '',
    gtmContainerId: '',
    searchConsoleVerification: '',
    adsConversionId: '',
    mapsApiKey: '',
  },
  social: {
    ogTitle: 'Mercury GP | Premium Home-Use IPL Hair-Reduction Device',
    ogDescription:
      'Premium home-use IPL hair-reduction device with unlimited flashes, advanced cooling, and smart skin-sensor technology.',
    ogImageUrl: '/images/mercury-gp-hero-new.jpg',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterCard: 'summary_large_image',
    twitterSite: '@mercurygp_ir',
    twitterCreator: '@mercurygp_ir',
  },
  schema: {
    productName: 'Mercury GP IPL Hair-Reduction Device',
    productSku: 'MGP-2025',
    productMpn: 'MGP-001',
    aggregateRatingValue: '4.7',
    aggregateRatingCount: '1284',
    reviewCount: '6',
    brandName: 'Mercury',
    organizationName: 'Mercury',
    organizationUrl: 'https://mercurygp.ir',
    priceCurrency: 'IRR',
    priceValue: '0',
  },
};

interface AdminStore extends AdminSettings {
  updateSEO: (data: Partial<SEOSettings>) => void;
  updateGeo: (data: Partial<GeoSettings>) => void;
  updateAIO: (data: Partial<AIOSettings>) => void;
  updateGoogle: (data: Partial<GoogleIntegration>) => void;
  updateSocial: (data: Partial<SocialSettings>) => void;
  updateSchema: (data: Partial<SchemaSettings>) => void;
  resetAll: () => void;
  exportSettings: () => string;
  importSettings: (json: string) => boolean;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      ...defaultSettings,
      updateSEO: (data) => set((s) => ({ seo: { ...s.seo, ...data } })),
      updateGeo: (data) => set((s) => ({ geo: { ...s.geo, ...data } })),
      updateAIO: (data) => set((s) => ({ aio: { ...s.aio, ...data } })),
      updateGoogle: (data) => set((s) => ({ google: { ...s.google, ...data } })),
      updateSocial: (data) => set((s) => ({ social: { ...s.social, ...data } })),
      updateSchema: (data) => set((s) => ({ schema: { ...s.schema, ...data } })),
      resetAll: () => set(defaultSettings),
      exportSettings: () => JSON.stringify(get(), null, 2),
      importSettings: (json: string) => {
        try {
          const parsed = JSON.parse(json);
          set(parsed);
          return true;
        } catch {
          return false;
        }
      },
    }),
    { name: 'mercury-admin-settings' }
  )
);
