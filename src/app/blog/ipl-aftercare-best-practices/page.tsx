import BlogPostPage from '@/components/mercury/BlogPostPage';
import type { Metadata } from 'next';

const SITE_URL = 'https://mercurygp.ir';
const SLUG = 'ipl-aftercare-best-practices';

export const metadata: Metadata = {
  title: 'IPL Aftercare Best Practices | Mercury GP',
  description:
    'Post-treatment care is essential for comfort and optimal results. Learn about moisturizing, sun protection, managing mild redness, and scheduling follow-up sessions.',
  alternates: {
    canonical: `${SITE_URL}/blog/${SLUG}`,
  },
  openGraph: {
    title: 'IPL Aftercare Best Practices | Mercury GP',
    description:
      'Post-treatment care is essential for comfort and optimal results. Learn about moisturizing, sun protection, managing mild redness, and scheduling follow-up sessions.',
    url: `${SITE_URL}/blog/${SLUG}`,
    siteName: 'Mercury GP',
    type: 'article',
    publishedTime: '2025-07-05T00:00:00Z',
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
    title: 'IPL Aftercare Best Practices | Mercury GP',
    description:
      'Post-treatment care is essential for comfort and optimal results. Learn about moisturizing, sun protection, managing mild redness, and scheduling follow-up sessions.',
    images: ['/images/mercury-gp-hero-new.jpg'],
  },
};

export default function Page() {
  return <BlogPostPage slug="ipl-aftercare-best-practices" />;
}
