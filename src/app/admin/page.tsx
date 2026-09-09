import AdminPanel from '@/components/admin/AdminPanel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel — SEO, Geo & AI Optimization',
  description: 'Mercury GP admin dashboard for managing SEO, geographic targeting, AI optimization, Google integrations, and structured data.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminPanel />;
}
