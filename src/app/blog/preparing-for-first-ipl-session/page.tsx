import BlogPostPage from '@/components/mercury/BlogPostPage';
import type { Metadata } from 'next';

const SITE_URL = 'https://mercurygp.ir';
const SLUG = 'preparing-for-first-ipl-session';

export const metadata: Metadata = {
  title: 'Preparing for Your First IPL Session | Mercury GP',
  description:
    'A step-by-step preparation guide for your first at-home IPL treatment. Learn about shaving, skin preparation, patch testing, and selecting the right intensity level.',
  alternates: {
    canonical: `${SITE_URL}/blog/${SLUG}`,
  },
  openGraph: {
    title: 'Preparing for Your First IPL Session | Mercury GP',
    description:
      'A step-by-step preparation guide for your first at-home IPL treatment. Learn about shaving, skin preparation, patch testing, and selecting the right intensity level.',
    url: `${SITE_URL}/blog/${SLUG}`,
    siteName: 'Mercury GP',
    type: 'article',
    publishedTime: '2025-07-03T00:00:00Z',
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
    title: 'Preparing for Your First IPL Session | Mercury GP',
    description:
      'A step-by-step preparation guide for your first at-home IPL treatment. Learn about shaving, skin preparation, patch testing, and selecting the right intensity level.',
    images: ['/images/mercury-gp-hero-new.jpg'],
  },
};

export default function Page() {
  return <BlogPostPage slug="preparing-for-first-ipl-session" />;
}
