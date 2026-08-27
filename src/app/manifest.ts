import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mercury GP — Premium IPL Hair-Reduction Device',
    short_name: 'Mercury GP',
    description:
      'Premium home-use IPL hair-reduction device with unlimited flashes, advanced cooling, and smart skin-sensor technology.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF8',
    theme_color: '#B8A48E',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/images/mercury-gp-hero-new.jpg',
        sizes: 'any',
        type: 'image/jpeg',
        purpose: 'any maskable',
      },
    ],
    categories: ['beauty', 'health'],
    lang: 'en-US',
    dir: 'ltr',
  };
}
