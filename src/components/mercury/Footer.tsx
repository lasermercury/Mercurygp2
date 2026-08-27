'use client';

import { Separator } from '@/components/ui/separator';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';

export default function Footer() {
  const { locale, dir } = useLanguageStore();
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const productLinks = [
    { label: dict.footer.links.features, id: 'features' },
    { label: dict.footer.links.technology, id: 'technology' },
    { label: dict.footer.links.specifications, id: 'specs' },
    { label: dict.footer.links.blog, id: 'blog' },
  ];

  const supportLinks = [
    { label: dict.footer.links.howToUse, id: 'how-to-use' },
    { label: dict.footer.links.faq, id: 'faq' },
    { label: dict.footer.links.safety, id: 'suitability' },
    { label: dict.footer.links.skinTone, id: 'skin-tone-guide' },
    { label: dict.footer.links.bodyMap, id: 'body-map' },
    { label: dict.footer.links.claims, id: 'claims' },
    { label: dict.footer.links.contact, id: 'contact' },
    { label: dict.footer.links.testimonials, id: 'testimonials' },
  ];

  const compareLinks = [
    { label: dict.footer.links.comparePhilips, href: '/compare/mercury-gp-vs-philips-lumea' },
    { label: dict.footer.links.compareBraun, href: '/compare/mercury-gp-vs-braun-silk-expert-pro-5' },
    { label: dict.footer.links.compareUlike, href: '/compare/mercury-gp-vs-ulike' },
    { label: dict.footer.links.compareDeess, href: '/compare/mercury-gp-vs-deess' },
    { label: dict.footer.links.compareSilkn, href: '/compare/mercury-gp-vs-silkn' },
  ];

  return (
    <footer role="contentinfo" aria-label="Site footer" className="bg-foreground/[0.03] border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold tracking-tight">{dict.footer.brand}</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed max-w-xs">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              {dict.footer.navigation.product}
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Compare Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              {dict.footer.links.compare}
            </h4>
            <ul className="space-y-2.5">
              {compareLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              {dict.footer.navigation.support}
            </h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              {dict.footer.navigation.legal}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {dict.footer.disclaimer}
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-xs text-muted-foreground/60 text-center">
          {dict.footer.copyright.replace('{year}', String(year))}
        </p>
      </div>
    </footer>
  );
}
