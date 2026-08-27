import { blogPosts } from '@/lib/blog-data';

const SITE_URL = 'https://mercurygp.ir';
const SITE_NAME = 'Mercury GP';

/* ───────────────────────────────────────────
   1. Organization Schema
   ─────────────────────────────────────────── */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Mercury',
  url: SITE_URL,
  logo: `${SITE_URL}/images/mercury-gp-hero-new.jpg`,
  description:
    'Mercury designs premium home-use IPL hair-reduction devices with advanced technology for at-home beauty treatments.',
  sameAs: [
    'https://www.instagram.com/mercurygp',
    'https://t.me/mercurygp',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: ['English', 'Persian'],
  },
};

/* ───────────────────────────────────────────
   2. WebSite Schema with SearchAction
   ─────────────────────────────────────────── */
const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ['en-US', 'fa-IR'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

/* ───────────────────────────────────────────
   3. Product Schema (enhanced)
   ─────────────────────────────────────────── */
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Mercury GP IPL Hair-Reduction Device',
  description:
    'Premium home-use IPL hair-reduction device with unlimited flashes, advanced cooling system, and smart skin-sensor technology. Suitable for Fitzpatrick skin tones I–V.',
  brand: {
    '@type': 'Brand',
    name: 'Mercury',
    url: SITE_URL,
  },
  image: [
    `${SITE_URL}/images/mercury-gp-hero-new.jpg`,
  ],
  sku: 'MGP-2025',
  mpn: 'MGP-001',
  category: 'IPL Hair-Reduction Device',
  manufacturer: {
    '@type': 'Organization',
    name: 'Mercury',
  },
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Technology',
      value: 'Intense Pulsed Light (IPL)',
    },
    {
      '@type': 'PropertyValue',
      name: 'Flash Type',
      value: 'Unlimited Flashes',
    },
    {
      '@type': 'PropertyValue',
      name: 'Wavelength Range',
      value: '510–1100 nm',
    },
    {
      '@type': 'PropertyValue',
      name: 'Cooling System',
      value: 'Integrated Contact Cooling',
    },
    {
      '@type': 'PropertyValue',
      name: 'Skin Sensor',
      value: 'Smart Skin-Sensor Technology',
    },
    {
      '@type': 'PropertyValue',
      name: 'Suitable Skin Tones',
      value: 'Fitzpatrick I–V',
    },
    {
      '@type': 'PropertyValue',
      name: 'Flash Speed',
      value: '0.9 seconds',
    },
    {
      '@type': 'PropertyValue',
      name: 'Power',
      value: 'Corded Electric',
    },
    {
      '@type': 'PropertyValue',
      name: 'Intensity Levels',
      value: '5',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '1284',
    reviewCount: '6',
  },
  hasEnergyConsumptionDetails: {
    '@type': 'EnergyConsumptionDetails',
    energyEfficiencyScaleMin: 'A',
    energyEfficiencyScaleMax: 'G',
  },
};

/* ───────────────────────────────────────────
   4. Review Schemas
   ─────────────────────────────────────────── */
const reviews = [
  {
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    author: { '@type': 'Person', name: 'Sarah M.' },
    reviewBody:
      'After 8 weeks of consistent use, I noticed a significant reduction in hair density on my legs and underarms. The cooling feature makes it very comfortable.',
    datePublished: '2025-06-10',
  },
  {
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    author: { '@type': 'Person', name: 'Mina K.' },
    reviewBody:
      'I have been using Mercury GP for 3 months now. The unlimited flashes are a huge advantage — no need to worry about running out.',
    datePublished: '2025-06-18',
  },
  {
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: '4', bestRating: '5' },
    author: { '@type': 'Person', name: 'Leila R.' },
    reviewBody:
      'Good device with a solid build. The skin sensor gives me confidence that the treatment is safe. Results are gradually improving.',
    datePublished: '2025-05-28',
  },
  {
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    author: { '@type': 'Person', name: 'Neda A.' },
    reviewBody:
      'Fast flash speed means I can treat larger areas quickly. Full body session takes about 20 minutes. Very happy with the results after 12 weeks.',
    datePublished: '2025-06-22',
  },
  {
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    author: { '@type': 'Person', name: 'Yasaman H.' },
    reviewBody:
      'The build quality is premium and the device feels sturdy. IPL technology is clearly explained in the guide. My skin tone is type III and it works well for me.',
    datePublished: '2025-07-01',
  },
  {
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: '4', bestRating: '5' },
    author: { '@type': 'Person', name: 'Fatemeh T.' },
    reviewBody:
      'Comfortable to use with the cooling system. I started seeing visible results around week 6. The skin sensor is a thoughtful safety feature.',
    datePublished: '2025-07-05',
  },
];

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Mercury GP IPL Hair-Reduction Device',
  review: reviews,
};

/* ───────────────────────────────────────────
   5. FAQ Schema
   ─────────────────────────────────────────── */
const faqItems = [
  {
    question: 'Is Mercury GP a laser device?',
    answer:
      'No. Mercury GP uses IPL (Intense Pulsed Light) technology, which emits a broad spectrum of light rather than a single focused laser beam. It is classified as a home-use IPL hair-reduction device.',
  },
  {
    question: 'How long does each treatment session take?',
    answer:
      'Treatment times vary by area. The 0.9-second flash speed allows efficient sessions: approximately 1 minute for the upper lip or bikini line, 2 minutes for underarms, and about 4 minutes for the lower leg. Full-body treatment is achievable in roughly 20 minutes.',
  },
  {
    question: 'Do I need to replace any cartridges or lamps?',
    answer:
      'No. Mercury GP is designed with an upgraded lamp and chipset to deliver unlimited flashes for personal use. There are no cartridges, lamps, or consumables to purchase separately.',
  },
  {
    question: 'Is the treatment painful?',
    answer:
      'Sensation levels vary by individual and intensity setting. Many users describe the feeling as a warm snap or mild tingling. Mercury GP includes an integrated cooling system designed to enhance comfort during use. We recommend starting at the lowest intensity level.',
  },
  {
    question: 'When will I see results?',
    answer:
      'Hair reduction is a gradual process that depends on the hair-growth cycle. Many users begin noticing reduced hair density after 4–8 weeks of consistent weekly treatments. Optimal results are typically observed after 12 weeks. Individual results vary.',
  },
  {
    question: 'Can I use Mercury GP on my face?',
    answer:
      'Yes, Mercury GP can be used on facial areas including the upper lip, chin, and sideburns. Avoid use directly on the upper eyelid, lips, and mucous membranes. Use lower intensity levels for facial treatment.',
  },
  {
    question: 'Does Mercury GP work on all skin tones and hair colors?',
    answer:
      'Mercury GP is designed for Fitzpatrick skin tones I–V and works best on darker hair colors (brown to black). IPL technology relies on melanin absorption, so it is not effective on white, gray, or light-red hair.',
  },
  {
    question: 'Is Mercury GP cordless?',
    answer:
      'No. Mercury GP operates on corded electric power. This ensures consistent energy output throughout every session without battery depletion or charging downtime.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

/* ───────────────────────────────────────────
   6. BreadcrumbList Schema
   ─────────────────────────────────────────── */
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL + '/',
    },
  ],
};

/* ───────────────────────────────────────────
   7. HowTo Schema — IPL Treatment Guide
   ─────────────────────────────────────────── */
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use Mercury GP IPL Hair-Reduction Device',
  description:
    'Step-by-step guide for using the Mercury GP IPL device for at-home hair reduction treatment.',
  totalTime: 'PT30M',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'USD',
    value: '0',
  },
  tool: [
    {
      '@type': 'HowToTool',
      name: 'Mercury GP IPL Device',
    },
    {
      '@type': 'HowToTool',
      name: 'Electric shaver or razor',
    },
  ],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Prepare your skin',
      text: 'Shave the treatment area 24 hours before your session. On the day of treatment, ensure skin is clean, dry, and free of lotions or makeup.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Perform a patch test',
      text: 'For first-time use, test one flash on a small discreet area at the lowest intensity. Wait 24-48 hours to check for any adverse reaction before full treatment.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Select intensity level',
      text: 'Begin at the lowest intensity level. After a few comfortable sessions, you may gradually increase to the highest comfortable setting.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Apply flashes to treatment area',
      text: 'Place the device firmly against the skin ensuring full contact. The skin sensor will activate automatically. Press the flash button and glide to the next position with slight overlap.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Post-treatment care',
      text: 'Apply a gentle fragrance-free moisturizer after treatment. Avoid sun exposure on treated areas for 48 hours and apply SPF 30+ sunscreen when outdoors.',
    },
    {
      '@type': 'HowToStep',
      position: 6,
      name: 'Maintain treatment schedule',
      text: 'Treat each area once per week for the initial phase. After 12 weeks, transition to maintenance sessions once per month or as needed.',
    },
  ],
};

/* ───────────────────────────────────────────
   8. ImageObject Schemas
   ─────────────────────────────────────────── */
const imageObjectSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: `${SITE_URL}/images/mercury-gp-hero-new.jpg`,
    name: 'Mercury GP IPL Hair-Reduction Device',
    description:
      'Product image of the Mercury GP home-use IPL hair-reduction device showing the device design and form factor.',
    creditText: 'Mercury',
  },
];

/* ───────────────────────────────────────────
   9. Article Schemas — generated from blog data
   ─────────────────────────────────────────── */
const articleSchemas = blogPosts.map((post) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.titleEn,
  description: post.excerptEn,
  datePublished: post.date,
  dateModified: post.date,
  author: {
    '@type': 'Organization',
    name: 'Mercury',
    url: SITE_URL,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Mercury',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/mercury-gp-hero-new.jpg`,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/blog/${post.slug}`,
  },
  image: `${SITE_URL}/images/mercury-gp-hero-new.jpg`,
  inLanguage: 'en-US',
}));

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {imageObjectSchemas.map((schema, i) => (
        <script
          key={`img-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {articleSchemas.map((schema, i) => (
        <script
          key={`article-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
