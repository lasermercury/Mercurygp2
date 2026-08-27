import BlogPostPage from '@/components/mercury/BlogPostPage';
import type { Metadata } from 'next';

const SITE_URL = 'https://mercurygp.ir';
const SLUG = 'understanding-ipl-technology';

export const metadata: Metadata = {
  title: 'Understanding IPL Technology | Mercury GP',
  description:
    'Learn about Intense Pulsed Light (IPL) technology, how it works for hair reduction, melanin absorption, and wavelength ranges.',
  alternates: {
    canonical: `${SITE_URL}/blog/${SLUG}`,
  },
  openGraph: {
    title: 'Understanding IPL Technology | Mercury GP',
    description:
      'Learn about Intense Pulsed Light (IPL) technology, how it works for hair reduction, melanin absorption, and wavelength ranges.',
    url: `${SITE_URL}/blog/${SLUG}`,
    siteName: 'Mercury GP',
    type: 'article',
    publishedTime: '2025-07-01T00:00:00Z',
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
    title: 'Understanding IPL Technology | Mercury GP',
    description:
      'Learn about Intense Pulsed Light (IPL) technology, how it works for hair reduction, melanin absorption, and wavelength ranges.',
    images: ['/images/mercury-gp-hero-new.jpg'],
  },
};

export default function Page() {
  return <BlogPostPage slug="understanding-ipl-technology" />;
}
