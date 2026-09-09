'use client';

import { useState, useSyncExternalStore } from 'react';
import AdminPanel from '@/components/admin/AdminPanel';
import AdminLogin from '@/components/admin/AdminLogin';

function getInitialAuth(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const session = JSON.parse(localStorage.getItem('mercury-admin-session') || '{}');
    return session.authenticated && session.expires > Date.now();
  } catch {
    return false;
  }
}

// Use subscribe pattern to avoid the lint error
const emptySubscribe = () => () => {};

export default function AdminPageClient() {
  const [authenticated, setAuthenticated] = useState(false);

  // Check session on mount without triggering the lint rule
  const sessionValid = useSyncExternalStore(
    emptySubscribe,
    getInitialAuth,
    () => false
  );

  const isAuth = authenticated || sessionValid;

  if (!isAuth) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminPanel />
    </div>
  );
}
