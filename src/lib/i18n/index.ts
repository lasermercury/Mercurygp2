import en from './en';
import fa from './fa';
import type { Locale } from '@/stores/language-store';

const dictionaries: Record<Locale, typeof en> = { en, fa };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export type Dictionary = typeof en;
