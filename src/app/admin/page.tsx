import AdminPageClient from './AdminPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel — Mercury GP',
  description: 'Admin dashboard for managing SEO, Geo, AI optimization, and integrations.',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminPageClient />;
}
