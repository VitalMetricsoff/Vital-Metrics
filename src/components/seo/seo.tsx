import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  type?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
}

export function SEO({
  title = 'VitalMetrics - Health & Wellness Analytics',
  description = 'VitalMetrics helps you track and analyze your health metrics with advanced calculators for BMI, stress levels, and more. Get personalized insights for your wellness journey.',
  keywords = ['health calculator', 'wellness tracker', 'BMI calculator', 'stress level estimator', 'fitness analytics'],
  ogImage = '/og-image.jpg',
  canonical,
  type = 'website',
  article,
}: SEOProps) {
  const siteUrl = 'https://vitalmetrics.health'; // Replace with your actual domain

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={siteUrl + (canonical || '')} />
      <meta property="og:site_name" content="VitalMetrics" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Article Specific Meta Tags */}
      {type === 'article' && article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.authors?.map((author) => (
            <meta property="article:author" content={author} key={author} />
          ))}
          {article.tags?.map((tag) => (
            <meta property="article:tag" content={tag} key={tag} />
          ))}
        </>
      )}

      {/* Additional SEO Optimization */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'WebSite',
          name: title,
          description: description,
          url: siteUrl + (canonical || ''),
          ...(type === 'article' && article
            ? {
                datePublished: article.publishedTime,
                dateModified: article.modifiedTime || article.publishedTime,
                author: article.authors?.map(name => ({
                  '@type': 'Person',
                  name,
                })),
              }
            : {}),
        })}
      </script>
    </Helmet>
  );
}
