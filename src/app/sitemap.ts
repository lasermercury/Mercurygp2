import type { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';

const SITE_URL = 'https://mercurygp.ir';

const competitors = [
  'philips-lumea',
  'braun-silk-expert-pro-5',
  'ulike',
  'silkn',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Home page — highest priority
  const home: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
  };

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date + 'T00:00:00Z'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Comparison pages
  const comparePages: MetadataRoute.Sitemap = competitors.map((slug) => ({
    url: `${SITE_URL}/compare/mercury-gp-vs-${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [home, ...blogPages, ...comparePages];
}
