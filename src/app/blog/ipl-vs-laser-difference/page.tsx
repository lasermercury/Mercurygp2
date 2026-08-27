import BlogPostPage from '@/components/mercury/BlogPostPage';
import type { Metadata } from 'next';

const SITE_URL = 'https://mercurygp.ir';
const SLUG = 'ipl-vs-laser-difference';

export const metadata: Metadata = {
  title: 'IPL vs Laser: What’s the Difference? | Mercury GP',
  description:
    'Understanding the key differences between IPL and laser hair-reduction technologies. Compare wavelength, cost, convenience, and suitability to make an informed choice.',
  alternates: {
    canonical: `${SITE_URL}/blog/${SLUG}`,
  },
  openGraph: {
    title: 'IPL vs Laser: What’s the Difference? | Mercury GP',
    description:
      'Understanding the key differences between IPL and laser hair-reduction technologies. Compare wavelength, cost, convenience, and suitability.',
    url: `${SITE_URL}/blog/${SLUG}`,
    siteName: 'Mercury GP',
    type: 'article',
    publishedTime: '2025-07-07T00:00:00Z',
    authors: ['Mercury'],
    images: [
      {
        url: '/images/mercury-gp-hero-new.jpg',
        width: 1200,
        height: 630,
        alt: 'Mercury GP IPL Hair-Reduction Device',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPL vs Laser: What’s the Difference? | Mercury GP',
    description:
      'Understanding the key differences between IPL and laser hair-reduction technologies. Compare wavelength, cost, convenience, and suitability.',
    images: ['/images/mercury-gp-hero-new.jpg'],
  },
};

export default function Page() {
  return <BlogPostPage slug='ipl-vs-laser-difference' />;
}
