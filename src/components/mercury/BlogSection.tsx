'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useLanguageStore } from '@/stores/language-store';
import { getDictionary } from '@/lib/i18n';
import { blogPosts } from '@/lib/blog-data';

export default function BlogSection() {
  const { locale, dir } = useLanguageStore();
  const dict = getDictionary(locale);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="blog" className="py-20 md:py-28 bg-mercury-warm/20">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-20"
        >
          <Badge
            variant="secondary"
            className="mb-4 px-3 py-1 text-xs uppercase tracking-widest"
          >
            {dict.blog.sectionTag}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {dict.blog.sectionTitle}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {dict.blog.sectionSubtitle}
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogPosts.map((post, index) => {
            const title = locale === 'fa' ? post.titleFa : post.titleEn;
            const excerpt = locale === 'fa' ? post.excerptFa : post.excerptEn;
            const categoryLabel =
              locale === 'fa' ? post.categoryFa : post.categoryEn;

            const formattedDate = new Date(post.date + 'T00:00:00').toLocaleDateString(
              locale === 'fa' ? 'fa-IR' : 'en-US',
              { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }
            );

            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <Card className="h-full py-0 gap-0 group hover:shadow-md hover:border-mercury-gold-light/60 transition-all duration-300">
                  <CardContent className="p-6 flex flex-col">
                    {/* Category Badge */}
                    <Badge
                      variant="secondary"
                      className="mb-3 text-xs font-medium w-fit"
                    >
                      {categoryLabel}
                    </Badge>

                    {/* Title as Link */}
                    <a
                      href={`/blog/${post.slug}`}
                      className="block group-hover:text-mercury-gold-dark transition-colors"
                    >
                      <h3 className="text-base font-semibold leading-snug mb-2">
                        {title}
                      </h3>
                    </a>

                    {/* Excerpt - 2 lines max */}
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                      {excerpt}
                    </p>
                  </CardContent>

                  {/* Footer Row: Date + Read Time */}
                  <CardFooter
                    className={`px-6 py-4 border-t border-border/50 flex items-center gap-4 text-xs text-muted-foreground ${
                      dir === 'rtl' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3" />
                      {formattedDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3" />
                      {dict.blog.readTime.replace('{min}', String(post.readTimeMin))}
                    </span>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
