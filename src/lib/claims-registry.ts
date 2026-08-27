export type VerificationStatus =
  | 'verified'
  | 'pending'
  | 'unverified'
  | 'conflicting'
  | 'outdated';

export type Confidence = 'high' | 'medium' | 'low';

export type SourceType =
  | 'manufacturer'
  | 'manual'
  | 'authorized-distributor'
  | 'certification-database'
  | 'internal-approved-source';

export interface ProductClaim {
  id: string;
  labelEn: string;
  labelFa: string;
  value?: string | number | boolean;
  sourceName: string;
  sourceUrl: string;
  sourceType: SourceType;
  verifiedAt: string;
  verificationStatus: VerificationStatus;
  confidence: Confidence;
  notes?: string;
}

export const claimsRegistry: ProductClaim[] = [
  {
    id: 'tech-ipl',
    labelEn: 'Technology',
    labelFa: 'فناوری',
    value: 'IPL (Intense Pulsed Light)',
    sourceName: 'Official Website (mercurygp.ir)',
    sourceUrl: 'https://mercurygp.ir',
    sourceType: 'manufacturer',
    verifiedAt: '2025-07-09',
    verificationStatus: 'verified',
    confidence: 'high',
    notes: 'Official website describes the device as a Pulsed Light system emitting IPL at 510-1100nm.',
  },
  {
    id: 'wavelength',
    labelEn: 'Wavelength Range',
    labelFa: 'محدوده طول موج',
    value: '510–1100 nm',
    sourceName: 'Official Website (mercurygp.ir)',
    sourceUrl: 'https://mercurygp.ir',
    sourceType: 'manufacturer',
    verifiedAt: '2025-07-09',
    verificationStatus: 'verified',
    confidence: 'high',
  },
  {
    id: 'flash-speed',
    labelEn: 'Flash Speed',
    labelFa: 'سرعت فلش',
    value: '0.9 seconds per flash',
    sourceName: 'Official Website (mercurygp.ir)',
    sourceUrl: 'https://mercurygp.ir',
    sourceType: 'manufacturer',
    verifiedAt: '2025-07-09',
    verificationStatus: 'verified',
    confidence: 'high',
    notes: 'Stated on official product page with treatment time examples.',
  },
  {
    id: 'unlimited-flashes',
    labelEn: 'Unlimited Flashes',
    labelFa: 'فلش نامحدود',
    value: true,
    sourceName: 'Official Website (mercurygp.ir)',
    sourceUrl: 'https://mercurygp.ir',
    sourceType: 'manufacturer',
    verifiedAt: '2025-07-09',
    verificationStatus: 'verified',
    confidence: 'high',
    notes: 'Described as "unlimited flashes for personal use" with upgraded lamp tube and chip.',
  },
  {
    id: 'cooling',
    labelEn: 'Integrated Cooling System',
    labelFa: 'سیستم خنک‌کننده یکپارچه',
    value: true,
    sourceName: 'Official Website (mercurygp.ir)',
    sourceUrl: 'https://mercurygp.ir',
    sourceType: 'manufacturer',
    verifiedAt: '2025-07-09',
    verificationStatus: 'verified',
    confidence: 'high',
    notes: 'Referred to as "ICY COOL" cooling system on official site.',
  },
  {
    id: 'skin-sensor',
    labelEn: 'Smart Skin Sensor (Automatic Flash)',
    labelFa: 'سنسور هوشمند پوست (فلش اتوماتیک)',
    value: true,
    sourceName: 'Official Website (mercurygp.ir)',
    sourceUrl: 'https://mercurygp.ir',
    sourceType: 'manufacturer',
    verifiedAt: '2025-07-09',
    verificationStatus: 'verified',
    confidence: 'high',
    notes: 'Built-in skin sensor for automatic flash mode.',
  },
  {
    id: 'intensity-levels',
    labelEn: 'Intensity Levels',
    labelFa: 'سطوح شدت',
    value: 5,
    sourceName: 'Official Website (mercurygp.ir)',
    sourceUrl: 'https://mercurygp.ir',
    sourceType: 'manufacturer',
    verifiedAt: '2025-07-09',
    verificationStatus: 'verified',
    confidence: 'high',
  },
  {
    id: 'corded',
    labelEn: 'Corded Electric Operation',
    labelFa: 'کارکرد برقی با سیم',
    value: true,
    sourceName: 'Official Website (mercurygp.ir)',
    sourceUrl: 'https://mercurygp.ir',
    sourceType: 'manufacturer',
    verifiedAt: '2025-07-09',
    verificationStatus: 'verified',
    confidence: 'high',
    notes: 'No battery or charging mentioned; consistent with corded operation.',
  },
  {
    id: 'years-expertise',
    labelEn: 'Brand Experience',
    labelFa: 'سابقه برند',
    value: '17+ years',
    sourceName: 'Official Website (mercurygp.ir)',
    sourceUrl: 'https://mercurygp.ir',
    sourceType: 'manufacturer',
    verifiedAt: '2025-07-09',
    verificationStatus: 'verified',
    confidence: 'medium',
    notes: 'Stated on official website. Exact founding year not independently confirmed.',
  },
  {
    id: 'countries',
    labelEn: 'Countries Served',
    labelFa: 'کشورهای تحت پوشش',
    value: '120+',
    sourceName: 'Official Website (mercurygp.ir)',
    sourceUrl: 'https://mercurygp.ir',
    sourceType: 'manufacturer',
    verifiedAt: '2025-07-09',
    verificationStatus: 'pending',
    confidence: 'medium',
    notes: 'Claimed on official site. Independent verification of exact country count not yet completed.',
  },
  {
    id: 'treatment-window',
    labelEn: 'Treatment Window Size',
    labelFa: 'اندازه پنجره درمان',
    value: 'Approx. 3.1 cm²',
    sourceName: 'Authorized Distributor (honamtajhiz.com)',
    sourceUrl: 'https://www.honamtajhiz.com',
    sourceType: 'authorized-distributor',
    verifiedAt: '2025-07-09',
    verificationStatus: 'pending',
    confidence: 'medium',
    notes: 'Listed on distributor site for a Mercury device. Not yet confirmed on official site directly.',
  },
  {
    id: 'skin-tones',
    labelEn: 'Suitable Skin Tones',
    labelFa: 'تناژ پوست مناسب',
    value: 'Fitzpatrick I–V',
    sourceName: 'Official Website (mercurygp.ir)',
    sourceUrl: 'https://mercurygp.ir',
    sourceType: 'manufacturer',
    verifiedAt: '2025-07-09',
    verificationStatus: 'verified',
    confidence: 'high',
    notes: 'Explicitly stated on official website.',
  },
  {
    id: 'not-effective-light',
    labelEn: 'Not Effective on Light Hair',
    labelFa: 'مؤثر نیست روی موهای روشن',
    value: 'White, gray, red hair',
    sourceName: 'Official Website (mercurygp.ir)',
    sourceUrl: 'https://mercurygp.ir',
    sourceType: 'manufacturer',
    verifiedAt: '2025-07-09',
    verificationStatus: 'verified',
    confidence: 'high',
    notes: 'Consistent with IPL technology limitations due to melanin dependence.',
  },
  {
    id: 'treatment-areas',
    labelEn: 'Treatment Areas',
    labelFa: 'نواحی درمان',
    value: 'Face, underarms, arms, legs, bikini, abdomen',
    sourceName: 'Official Website (mercurygp.ir)',
    sourceUrl: 'https://mercurygp.ir',
    sourceType: 'manufacturer',
    verifiedAt: '2025-07-09',
    verificationStatus: 'verified',
    confidence: 'high',
  },
  {
    id: 'treatment-schedule',
    labelEn: 'Recommended Treatment Schedule',
    labelFa: 'برنامه درمان پیشنهادی',
    value: '1x/week for 6–12 weeks, then monthly',
    sourceName: 'Official Website (mercurygp.ir)',
    sourceUrl: 'https://mercurygp.ir',
    sourceType: 'manufacturer',
    verifiedAt: '2025-07-09',
    verificationStatus: 'verified',
    confidence: 'high',
  },
];
