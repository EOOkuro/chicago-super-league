import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, ChevronDown, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useSubstackFeed } from '../hooks/useSubstackFeed.js';

function NewsPage() {
  const { news, loading, error } = useSubstackFeed();
  const [visibleNews, setVisibleNews] = useState(6);

  const handleLoadMore = () => {
    setVisibleNews(prev => Math.min(prev + 6, news.length));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Latest News | Chicago Super League</title>
        <meta name="description" content="Read the latest news, updates, and articles from the Chicago Super League." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[hsl(var(--black))] text-[hsl(var(--true-white))] border-b-4 border-[hsl(var(--primary))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <span className="label-text text-[hsl(var(--primary-light))] font-bold tracking-widest mb-4 block flex items-center justify-center md:justify-start gap-2">
            <Rss className="w-4 h-4" /> Official Updates
          </span>
          <h1 className="text-6xl md:text-8xl text-[hsl(var(--true-white))] mb-4">LATEST NEWS</h1>
          <p className="text-xl text-[hsl(var(--gray))] max-w-2xl">
            Stay up to date with league announcements, match reports, and club stories.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden border-none shadow-sm">
                <Skeleton className="h-48 w-full rounded-none" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-4" />
                  <Skeleton className="h-8 w-full mb-2" />
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error && news.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-[hsl(var(--destructive))]">Unable to load news feed at this time.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.slice(0, visibleNews).map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col bg-[hsl(var(--true-white))] border-[hsl(var(--white))] shadow-sm hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-4 text-xs font-bold text-[hsl(var(--gray))] uppercase tracking-widest mb-4">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(article.pubDate)}</span>
                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author}</span>
                      </div>
                      
                      <h3 className="text-2xl font-['Bebas_Neue'] text-[hsl(var(--black))] mb-3 group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-[hsl(var(--gray))] mb-6 flex-grow line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-[hsl(var(--white))]">
                        <a 
                          href={article.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[hsl(var(--primary))] font-bold uppercase tracking-wider text-sm hover:text-[hsl(var(--primary-dark))] transition-colors"
                        >
                          Read Full Article <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {visibleNews < news.length && (
              <div className="text-center pt-16">
                <Button 
                  onClick={handleLoadMore} 
                  variant="outline" 
                  className="border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--true-white))] nav-text text-lg px-8 py-6 h-auto"
                >
                  Load More Articles <ChevronDown className="ml-2 w-5 h-5" />
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default NewsPage;