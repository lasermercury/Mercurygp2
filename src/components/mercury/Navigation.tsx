'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, Globe, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';
import { useTheme } from 'next-themes';

type NavSection = 'features' | 'technology' | 'howToUse' | 'specs' | 'faq' | 'claims' | 'contact' | 'skinTone' | 'bodyMap' | 'blog' | 'testimonials';
type CompareLink = { key: 'compare'; href: string };

export default function Navigation() {
  const { locale, dir, setLocale } = useLanguageStore();
  const dict = getDictionary(locale);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
    if (latest > prev && latest > 300) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const SECTION_ID_MAP: Record<NavSection, string> = {
    features: 'features',
    technology: 'technology',
    howToUse: 'how-to-use',
    specs: 'specs',
    faq: 'faq',
    claims: 'claims',
    contact: 'contact',
    skinTone: 'skin-tone-guide',
    bodyMap: 'body-map',
    blog: 'blog',
    testimonials: 'testimonials',
  };

  const scrollTo = (id: NavSection) => {
    const el = document.getElementById(SECTION_ID_MAP[id]);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'fa' : 'en');
  };

  const navLinks: ({ key: NavSection; label: string } | CompareLink)[] = [
    { key: 'features', label: dict.nav.links.features },
    { key: 'technology', label: dict.nav.links.technology },
    { key: 'howToUse', label: dict.nav.links.howToUse },
    { key: 'specs', label: dict.nav.links.specs },
    { key: 'faq', label: dict.nav.links.faq },
    { key: 'claims', label: dict.nav.links.claims },
    { key: 'contact', label: dict.nav.links.contact },
    { key: 'skinTone', label: dict.nav.links.skinTone },
    { key: 'bodyMap', label: dict.nav.links.bodyMap },
    { key: 'blog', label: dict.nav.links.blog },
    { key: 'testimonials', label: dict.nav.links.testimonials },
    { key: 'compare', href: '/compare/mercury-gp-vs-philips-lumea' },
  ];

  const isCompareLink = (link: { key: NavSection } | CompareLink): link is CompareLink => link.key === 'compare';

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-mercury-gold focus:px-4 focus:py-2 focus:text-white focus:outline-none"
          >
            {locale === 'en' ? 'Skip to main content' : 'رفتن به محتوای اصلی'}
          </a>
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xl md:text-2xl font-bold tracking-tight text-foreground hover:text-mercury-gold-dark transition-colors"
            >
              {dict.nav.brand}
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) =>
                isCompareLink(link) ? (
                  <a
                    key={link.key}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-mercury-gold-dark hover:text-foreground transition-colors rounded-md hover:bg-accent"
                  >
                    {dict.nav.links.compare}
                  </a>
                ) : (
                  <button
                    key={link.key}
                    onClick={() => scrollTo(link.key)}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                  >
                    {link.label}
                  </button>
                ),
              )}
            </div>

            {/* Right side: Theme Toggle + Language Switcher + Mobile Menu */}
            <div className="flex items-center gap-1">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
                  <span className="sr-only">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLocale}
                className="gap-1.5 text-sm font-medium"
              >
                <Globe className="size-4" />
                <span>{locale === 'en' ? 'FA' : 'EN'}</span>
              </Button>

              {/* Mobile Hamburger */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="size-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side={dir === 'rtl' ? 'left' : 'right'} className="w-72 pt-12">
                  <SheetHeader>
                    <SheetTitle className={`text-lg font-bold ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      {dict.nav.brand}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-1 mt-4">
                    {navLinks.map((link) =>
                      isCompareLink(link) ? (
                        <SheetClose asChild key={link.key}>
                          <a
                            href={link.href}
                            className={`px-3 py-3 text-sm font-medium text-mercury-gold-dark hover:text-foreground hover:bg-accent rounded-md transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                          >
                            {dict.nav.links.compare}
                          </a>
                        </SheetClose>
                      ) : (
                        <SheetClose asChild key={link.key}>
                          <button
                            onClick={() => scrollTo(link.key)}
                            className={`px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                          >
                            {link.label}
                          </button>
                        </SheetClose>
                      ),
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </motion.header>
    </AnimatePresence>
  );
}
