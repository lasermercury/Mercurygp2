import { create } from 'zustand';
import type en from '@/lib/i18n/en';
import type fa from '@/lib/i18n/fa';

export type Locale = 'en' | 'fa';
export type Dictionary = typeof en;

interface LanguageState {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  setLocale: (locale: Locale) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  locale: 'en',
  dir: 'ltr',
  setLocale: (locale) =>
    set({
      locale,
      dir: locale === 'fa' ? 'rtl' : 'ltr',
    }),
}));
