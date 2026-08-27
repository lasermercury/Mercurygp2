'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';
import { getBlogPost } from '@/lib/blog-data';

interface BlogPostPageProps {
  slug: string;
}

export default function BlogPostPage({ slug }: BlogPostPageProps) {
  const { locale, dir } = useLanguageStore();
  const dict = getDictionary(locale);
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {locale === 'fa' ? 'پست یافت نشد' : 'Post Not Found'}
          </h1>
          <p className="text-muted-foreground mb-6">
            {locale === 'fa'
              ? 'مقاله مورد نظر شما یافت نشد.'
              : 'The article you are looking for could not be found.'}
          </p>
          <Button asChild variant="outline">
            <a href="/#blog">{dict.blog.backToArticles}</a>
          </Button>
        </div>
      </div>
    );
  }

  const title = locale === 'fa' ? post.titleFa : post.titleEn;
  const content = locale === 'fa' ? post.contentFa : post.contentEn;
  const categoryLabel =
    locale === 'fa' ? post.categoryFa : post.categoryEn;

  const formattedDate = new Date(post.date + 'T00:00:00').toLocaleDateString(
    locale === 'fa' ? 'fa-IR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a
            href="/"
            className="text-lg font-bold tracking-tight text-foreground hover:text-mercury-gold-dark transition-colors"
          >
            {dict.nav.brand}
          </a>
          <Button asChild variant="ghost" size="sm">
            <a href="/#blog">
              <ArrowLeft
                className={`size-4 ${dir === 'rtl' ? 'rotate-180' : ''}`}
              />
              {dict.blog.backToArticles}
            </a>
          </Button>
        </div>
      </header>

      {/* Article Content */}
      <main className="flex-1">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20"
        >
          {/* Article Header */}
          <header className="mb-10">
            <Badge variant="outline" className="mb-4 text-xs font-medium">
              {categoryLabel}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              {title}
            </h1>
            <div
              className={`flex items-center gap-4 mt-4 text-sm text-muted-foreground ${
                dir === 'rtl' ? 'flex-row-reverse' : ''
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" />
                {dict.blog.readTime.replace('{min}', String(post.readTimeMin))}
              </span>
            </div>
          </header>

          <Separator className="mb-10" />

          {/* Article Body */}
          <div
            className={`space-y-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
          >
            {content.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <Separator className="my-10" />

          {/* Back to Articles */}
          <div className={`flex ${dir === 'rtl' ? 'justify-start' : 'justify-start'}`}>
            <Button asChild variant="outline" className="gap-2">
              <a href="/#blog">
                <ArrowLeft
                  className={`size-4 ${dir === 'rtl' ? 'rotate-180' : ''}`}
                />
                {dict.blog.backToArticles}
              </a>
            </Button>
          </div>
        </motion.article>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-muted-foreground/60 text-center">
            {dict.footer.copyright.replace('{year}', String(new Date().getFullYear()))}
          </p>
        </div>
      </footer>
    </div>
  );
}
