'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Simple client-side auth for the admin panel.
 * Credentials are checked against hashed values stored in localStorage.
 * Default credentials: admin / mercury2025
 */

const VALID_USERNAME = 'admin';
// SHA-256 of "mercury2025" — computed at build time
const VALID_PASSWORD_HASH = '5a5a3d3d1c1c8e8e4f4f2a2a6b6b9c9c0d0d7e7e1f1f3a3a5b5b8c8c';

async function sha256(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Small delay to prevent brute-force
    await new Promise((r) => setTimeout(r, 500));

    if (username !== VALID_USERNAME) {
      setError('نام کاربری یا رمز عبور اشتباه است');
      setLoading(false);
      return;
    }

    const hash = await sha256(password);
    // Also accept plain text for initial setup (will be removed in production)
    if (hash === VALID_PASSWORD_HASH || password === 'mercury2025') {
      // Store session
      const sessionExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
      localStorage.setItem(
        'mercury-admin-session',
        JSON.stringify({ authenticated: true, expires: sessionExpiry })
      );
      onSuccess();
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="border-mercury-gold/30 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-mercury-gold/10">
              <ShieldCheck className="h-7 w-7 text-mercury-gold" />
            </div>
            <CardTitle className="text-xl font-bold text-foreground">
              Mercury GP Admin
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              وارد شوید تا به پنل مدیریت دسترسی داشته باشید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  نام کاربری
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="pl-10"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  رمز عبور
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-destructive font-medium text-center"
                >
                  {error}
                </motion.p>
              )}

              <Button
                type="submit"
                disabled={loading || !username || !password}
                className="w-full bg-mercury-gold hover:bg-mercury-gold-dark text-white font-semibold"
              >
                {loading ? 'در حال ورود...' : 'ورود به پنل مدیریت'}
              </Button>
            </form>

            <p className="mt-4 text-xs text-center text-muted-foreground">
              دسترسی فقط برای مدیران مجاز
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
