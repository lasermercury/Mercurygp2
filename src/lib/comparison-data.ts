import type { Confidence, VerificationStatus } from './claims-registry';

export interface ComparisonDevice {
  brand: string;
  technology: {
    value: string;
    confidence: Confidence;
    verification: VerificationStatus;
    notes?: string;
  };
  wavelength: {
    value: string;
    confidence: Confidence;
    verification: VerificationStatus;
    notes?: string;
  };
  flashSpeed: {
    value: string;
    confidence: Confidence;
    verification: VerificationStatus;
    notes?: string;
  };
  flashCapacity: {
    value: string;
    confidence: Confidence;
    verification: VerificationStatus;
    notes?: string;
  };
  intensityLevels: {
    value: string;
    confidence: Confidence;
    verification: VerificationStatus;
    notes?: string;
  };
  skinTones: {
    value: string;
    confidence: Confidence;
    verification: VerificationStatus;
    notes?: string;
  };
  cooling: {
    value: string;
    confidence: Confidence;
    verification: VerificationStatus;
    notes?: string;
  };
  power: {
    value: string;
    confidence: Confidence;
    verification: VerificationStatus;
    notes?: string;
  };
  skinSensor: {
    value: string;
    confidence: Confidence;
    verification: VerificationStatus;
    notes?: string;
  };
  treatmentWindow: {
    value: string;
    confidence: Confidence;
    verification: VerificationStatus;
    notes?: string;
  };
}

export interface ComparisonRow {
  key: keyof ComparisonDevice;
  mercuryGpValue: string;
  mercuryGpConfidence: Confidence;
  mercuryGpVerification: VerificationStatus;
  mercuryGpNotes?: string;
  competitorValue: string;
  competitorConfidence: Confidence;
  competitorVerification: VerificationStatus;
  competitorNotes?: string;
  sourceName: string;
  sourceUrl: string;
}

export interface ComparisonEntry {
  slug: string;
  competitorName: string;
  competitorNameFa: string;
  competitorBrand: string;
  data: ComparisonDevice;
  sourceDate: string;
  sourceUrl: string;
  sourceName: string;
}

/* ── Mercury GP Data ────────────────────────────────────────── */

const mercuryGpDevice: ComparisonDevice = {
  brand: 'Mercury',
  technology: {
    value: 'IPL (Intense Pulsed Light)',
    confidence: 'high',
    verification: 'verified',
  },
  wavelength: {
    value: '510–1100 nm',
    confidence: 'high',
    verification: 'verified',
  },
  flashSpeed: {
    value: '0.9 seconds per flash',
    confidence: 'high',
    verification: 'verified',
    notes: 'Stated on official product page with treatment time examples.',
  },
  flashCapacity: {
    value: 'Unlimited (personal use)',
    confidence: 'high',
    verification: 'verified',
    notes: 'Described as "unlimited flashes for personal use" with upgraded lamp tube and chip.',
  },
  intensityLevels: {
    value: '5',
    confidence: 'high',
    verification: 'verified',
  },
  skinTones: {
    value: 'Fitzpatrick I–V',
    confidence: 'high',
    verification: 'verified',
    notes: 'Explicitly stated on official website.',
  },
  cooling: {
    value: 'Integrated active cooling (ICY COOL)',
    confidence: 'high',
    verification: 'verified',
    notes: 'Referred to as "ICY COOL" cooling system on official site.',
  },
  power: {
    value: 'Corded electric',
    confidence: 'high',
    verification: 'verified',
  },
  skinSensor: {
    value: 'Built-in contact sensor (automatic flash)',
    confidence: 'high',
    verification: 'verified',
  },
  treatmentWindow: {
    value: 'Approx. 3.1 cm²',
    confidence: 'medium',
    verification: 'pending',
    notes: 'Listed on distributor site. Not yet confirmed on official site directly.',
  },
};

/* ── Competitor Devices ─────────────────────────────────────── */

const comparisons: Record<string, ComparisonEntry> = {
  'philips-lumea': {
    slug: 'philips-lumea',
    competitorName: 'Philips Lumea (9000/9900 Series)',
    competitorNameFa: 'فیلیپس لومیا (سری ۹۰۰۰/۹۹۰۰)',
    competitorBrand: 'Philips',
    data: {
      brand: 'Philips',
      technology: {
        value: 'IPL',
        confidence: 'high',
        verification: 'verified',
      },
      wavelength: {
        value: 'Not publicly disclosed (general IPL ~500–1200 nm; UV filtered)',
        confidence: 'low',
        verification: 'pending',
        notes: 'Official Philips website does not state the exact wavelength range. General IPL range cited from third-party sources.',
      },
      flashSpeed: {
        value: 'Not publicly stated',
        confidence: 'low',
        verification: 'pending',
        notes: 'No per-flash timing found on official Philips product page as of July 2025.',
      },
      flashCapacity: {
        value: '450,000',
        confidence: 'high',
        verification: 'verified',
      },
      intensityLevels: {
        value: '5',
        confidence: 'high',
        verification: 'verified',
      },
      skinTones: {
        value: 'Fitzpatrick I–V',
        confidence: 'high',
        verification: 'verified',
      },
      cooling: {
        value: 'Not specified',
        confidence: 'low',
        verification: 'pending',
        notes: 'Philips does not prominently feature a cooling system on the product page.',
      },
      power: {
        value: 'Cordless (rechargeable battery, ~130 flashes at level 5 per charge)',
        confidence: 'high',
        verification: 'verified',
      },
      skinSensor: {
        value: 'SenseIQ (SmartSkin)',
        confidence: 'high',
        verification: 'verified',
      },
      treatmentWindow: {
        value: 'Not stated on official page',
        confidence: 'low',
        verification: 'pending',
      },
    },
    sourceDate: '2025-07-09',
    sourceUrl: 'https://www.philips.com',
    sourceName: 'philips.com',
  },

  'braun-silk-expert-pro-5': {
    slug: 'braun-silk-expert-pro-5',
    competitorName: 'Braun Silk-expert Pro 5 (PL5347)',
    competitorNameFa: 'براون سیلک-اکسپرت پرو ۵ (PL5347)',
    competitorBrand: 'Braun',
    data: {
      brand: 'Braun',
      technology: {
        value: 'IPL',
        confidence: 'high',
        verification: 'verified',
      },
      wavelength: {
        value: '510–1100 nm',
        confidence: 'medium',
        verification: 'pending',
        notes: 'Per review sites. Official Braun website does not state the exact wavelength range.',
      },
      flashSpeed: {
        value: '0.5–0.9s (up to ~2 flashes/sec glide mode)',
        confidence: 'medium',
        verification: 'verified',
        notes: 'Flash speed varies by review source. Official site describes "fast gliding" without precise timing.',
      },
      flashCapacity: {
        value: '400,000',
        confidence: 'high',
        verification: 'verified',
      },
      intensityLevels: {
        value: '10',
        confidence: 'high',
        verification: 'verified',
      },
      skinTones: {
        value: 'Fitzpatrick I–V',
        confidence: 'high',
        verification: 'verified',
      },
      cooling: {
        value: 'Not specified',
        confidence: 'low',
        verification: 'pending',
      },
      power: {
        value: 'Cordless (rechargeable)',
        confidence: 'high',
        verification: 'verified',
      },
      skinSensor: {
        value: 'SensoAdapt (continuous skin tone reading)',
        confidence: 'high',
        verification: 'verified',
      },
      treatmentWindow: {
        value: 'Not stated (3 treatment modes: normal, sensitive, extra sensitive)',
        confidence: 'medium',
        verification: 'verified',
      },
    },
    sourceDate: '2025-07-09',
    sourceUrl: 'https://www.braun.com',
    sourceName: 'braun.com, healthybeautiful.com',
  },

  'ulike': {
    slug: 'ulike',
    competitorName: 'Ulike Air 10',
    competitorNameFa: 'یولایک ایر ۱۰',
    competitorBrand: 'Ulike',
    data: {
      brand: 'Ulike',
      technology: {
        value: 'IPL',
        confidence: 'high',
        verification: 'verified',
      },
      wavelength: {
        value: '560–1200 nm',
        confidence: 'high',
        verification: 'verified',
        notes: 'Stated in official FAQ on ulike.com.',
      },
      flashSpeed: {
        value: 'Not publicly stated on product page',
        confidence: 'medium',
        verification: 'pending',
        notes: 'No per-flash timing found on the official Ulike product page as of July 2025.',
      },
      flashCapacity: {
        value: '1,000,000 (claimed)',
        confidence: 'medium',
        verification: 'pending',
        notes: 'Claimed on official website. Independent verification not available.',
      },
      intensityLevels: {
        value: '5',
        confidence: 'high',
        verification: 'verified',
      },
      skinTones: {
        value: 'Fitzpatrick I–V',
        confidence: 'high',
        verification: 'verified',
      },
      cooling: {
        value: 'Sapphire cooling (~65°F / 18°C contact temperature)',
        confidence: 'high',
        verification: 'verified',
      },
      power: {
        value: 'Cordless (rechargeable)',
        confidence: 'high',
        verification: 'verified',
      },
      skinSensor: {
        value: 'Not specified',
        confidence: 'low',
        verification: 'pending',
      },
      treatmentWindow: {
        value: 'Not stated on official page',
        confidence: 'low',
        verification: 'pending',
      },
    },
    sourceDate: '2025-07-09',
    sourceUrl: 'https://www.ulike.com',
    sourceName: 'ulike.com',
  },

  'deess': {
    slug: 'deess',
    competitorName: 'DEESS IPL (GOAOTE)',
    competitorNameFa: 'دیس IPL (GOAOTE)',
    competitorBrand: 'DEESS',
    data: {
      brand: 'DEESS',
      technology: {
        value: 'IPL',
        confidence: 'high',
        verification: 'verified',
      },
      wavelength: {
        value: '500–1200 nm',
        confidence: 'medium',
        verification: 'pending',
        notes: 'Per Amazon listings. Not confirmed on official deess.com product page.',
      },
      flashSpeed: {
        value: 'Not precisely stated (claims ~10 min full body)',
        confidence: 'low',
        verification: 'pending',
        notes: 'Exact per-flash timing not available. Full-body time claim found on Amazon listings.',
      },
      flashCapacity: {
        value: 'Unlimited (per a specific DEESS model listing on Amazon)',
        confidence: 'medium',
        verification: 'pending',
        notes: 'Claimed on Amazon listing for a specific model. Not confirmed on official site.',
      },
      intensityLevels: {
        value: '5',
        confidence: 'high',
        verification: 'verified',
      },
      skinTones: {
        value: 'Not explicitly stated',
        confidence: 'low',
        verification: 'pending',
      },
      cooling: {
        value: 'Ice cool technology',
        confidence: 'medium',
        verification: 'pending',
        notes: 'Mentioned in product marketing. Exact specifications not detailed.',
      },
      power: {
        value: 'Corded',
        confidence: 'high',
        verification: 'verified',
      },
      skinSensor: {
        value: 'Not specified',
        confidence: 'low',
        verification: 'pending',
      },
      treatmentWindow: {
        value: 'Not stated',
        confidence: 'low',
        verification: 'pending',
      },
    },
    sourceDate: '2025-07-09',
    sourceUrl: 'https://www.amazon.com',
    sourceName: 'amazon.com, deess.com',
  },

  'silkn': {
    slug: 'silkn',
    competitorName: "Silk'n 7 Gold",
    competitorNameFa: 'سیلک ان ۷ گلد',
    competitorBrand: "Silk'n",
    data: {
      brand: "Silk'n",
      technology: {
        value: 'IPL (HPL – Home Pulsed Light)',
        confidence: 'high',
        verification: 'verified',
      },
      wavelength: {
        value: '800–1200 nm',
        confidence: 'medium',
        verification: 'pending',
        notes: 'Per search results and product descriptions. Not confirmed on the official silkn.com product page.',
      },
      flashSpeed: {
        value: 'Fast (claims ~7 min for both legs; exact per-flash timing not stated)',
        confidence: 'medium',
        verification: 'pending',
        notes: 'Treatment time claim found on product page. Exact per-flash interval not disclosed.',
      },
      flashCapacity: {
        value: '400,000',
        confidence: 'high',
        verification: 'verified',
      },
      intensityLevels: {
        value: '5',
        confidence: 'high',
        verification: 'verified',
      },
      skinTones: {
        value: 'Fitzpatrick I–V',
        confidence: 'high',
        verification: 'verified',
      },
      cooling: {
        value: 'None (no ice cooling needed per marketing)',
        confidence: 'medium',
        verification: 'verified',
      },
      power: {
        value: 'Corded',
        confidence: 'high',
        verification: 'verified',
      },
      skinSensor: {
        value: 'Not specified',
        confidence: 'low',
        verification: 'pending',
      },
      treatmentWindow: {
        value: '5.1 cm²',
        confidence: 'medium',
        verification: 'verified',
        notes: '360° rotating head with 3 precision attachments.',
      },
    },
    sourceDate: '2025-07-09',
    sourceUrl: 'https://www.silkn.com',
    sourceName: 'silkn.com',
  },
};

export const comparisonSlugs = Object.keys(comparisons);

export function getComparisonBySlug(slug: string): ComparisonEntry | undefined {
  return comparisons[slug];
}

export { mercuryGpDevice };
export default comparisons;
