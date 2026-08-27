import type { Metadata } from 'next';
import ComparisonPage from '@/components/mercury/ComparisonPage';

const SITE_URL = 'https://mercurygp.ir';
const SLUG = 'compare/mercury-gp-vs-ulike';

export const metadata: Metadata = {
  title: 'Mercury GP vs Ulike Air 10 — IPL Comparison',
  description:
    'A transparent, source-traced comparison of Mercury GP and Ulike Air 10 IPL hair-reduction devices. Side-by-side specifications with verification status.',
  alternates: {
    canonical: `${SITE_URL}/${SLUG}`,
  },
  openGraph: {
    title: 'Mercury GP vs Ulike Air 10 — IPL Comparison',
    description:
      'Compare Mercury GP and Ulike Air 10 IPL devices side-by-side. Specifications, features, and verification status.',
    url: `${SITE_URL}/${SLUG}`,
    siteName: 'Mercury GP',
    type: 'article',
    images: [
      {
        url: '/images/mercury-gp-hero-new.jpg',
        width: 1200,
        height: 630,
        alt: 'Mercury GP vs Ulike Air 10 Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mercury GP vs Ulike Air 10 — IPL Comparison',
    description:
      'Compare Mercury GP and Ulike Air 10 IPL devices side-by-side.',
    images: ['/images/mercury-gp-hero-new.jpg'],
  },
};

export default function Page() {
  return <ComparisonPage slug='ulike' />;
}
