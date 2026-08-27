import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ThemeProvider from '@/components/ThemeProvider';
import StructuredData from '@/components/StructuredData';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const SITE_URL = 'https://mercurygp.ir';
const SITE_NAME = 'Mercury GP';
const SITE_TITLE = 'Mercury GP | Premium Home-Use IPL Hair-Reduction Device';
const SITE_DESCRIPTION =
  'Discover Mercury GP, a premium home-use IPL hair-reduction device with unlimited flashes, advanced cooling, and smart skin-sensor technology. Designed for effective at-home hair reduction on Fitzpatrick skin tones I–V.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Mercury GP',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Mercury GP',
    'Mercury GP IPL',
    'IPL hair reduction',
    'home-use IPL',
    'IPL device',
    'hair reduction device',
    'Intense Pulsed Light',
    'at-home hair reduction',
    'IPL hair removal',
    'home IPL device',
    'unlimited flashes IPL',
    'IPL skin sensor',
    'IPL cooling system',
    'Fitzpatrick I-V IPL',
    'beauty device',
    'personal care device',
  ],
  authors: [{ name: 'Mercury', url: SITE_URL }],
  creator: 'Mercury',
  publisher: 'Mercury',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/images/mercury-gp-hero-new.jpg',
    apple: '/images/mercury-gp-hero-new.jpg',
  },
  classification: 'Beauty & Personal Care',
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'fa-IR': '/?lang=fa',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/images/mercury-gp-hero-new.jpg',
        width: 1200,
        height: 630,
        alt: 'Mercury GP IPL Hair-Reduction Device',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/images/mercury-gp-hero-new.jpg'],
    creator: '@mercurygp_ir',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#FAFAF8" />
        <meta name="geo.region" content="IR-22" />
        <meta name="geo.placename" content="Tehran" />
        <meta name="geo.position" content="35.6892;51.3890" />
        <meta name="ICBM" content="35.6892, 51.3890" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <StructuredData />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
