import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

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

// Define the structured data for sitelinks searchbox
const siteLinksSearchBoxData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://vitalmetrics.in/",
  "potentialAction": [{
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://vitalmetrics.in/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }]
};

// Define the organization data
const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "VitalMetrics",
  "url": "https://vitalmetrics.in",
  "logo": "https://vitalmetrics.in/logo.png",
  "sameAs": [
    "https://twitter.com/vitalmetrics",
    "https://facebook.com/vitalmetrics",
    "https://linkedin.com/company/vitalmetrics"
  ]
};

export function SEO({
  title = 'VitalMetrics - Health & Wellness Analytics',
  description = 'VitalMetrics helps you track and analyze your health metrics with advanced calculators for BMI, stress levels, and more. Get personalized insights for your wellness journey.',
  keywords = ['health calculator', 'wellness tracker', 'BMI calculator', 'stress level estimator', 'fitness analytics'],
  ogImage = '/og-image.jpg',
  canonical,
  type = 'website',
  article,
}: SEOProps) {
  const siteUrl = 'https://vitalmetrics.in';
  const formattedTitle = title.includes('VitalMetrics') ? title : `${title} | VitalMetrics`;

  return (
    <Helmet>
      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://vitals.vercel-analytics.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
      
      {/* Preload Critical Images */}
      <link rel="preload" as="image" href="/favicon.svg" type="image/svg+xml" />
      <link rel="modulepreload" href="/src/main.tsx" />
      
      {/* Basic Meta Tags with Enhanced Keywords */}
      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" sizes="48x48" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* PWA Icons */}
      <link rel="icon" href="/web-app-manifest-192x192.png" type="image/png" sizes="192x192" />
      <link rel="icon" href="/web-app-manifest-512x512.png" type="image/png" sizes="512x512" />

      {/* Performance Optimizations */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <link rel="dns-prefetch" href="https://vitals.vercel-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      
      {/* Basic Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={canonical || `${siteUrl}${window.location.pathname}`} />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#ffffff" />
      
      {/* Open Graph Tags */}
      <meta property="og:url" content={siteUrl + (canonical || '')} />
      <meta property="og:site_name" content="VitalMetrics" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Structured Data for Search Results */}
      <script type="application/ld+json">
        {JSON.stringify(siteLinksSearchBoxData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>

      {/* Additional Meta Tags for Search Results */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#2563EB" />
      <meta name="msapplication-TileColor" content="#2563EB" />
      <meta name="application-name" content="VitalMetrics" />
      <meta name="apple-mobile-web-app-title" content="VitalMetrics" />

      {/* Google Analytics - Optimized Loading */}
      <script async defer src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX', { 'send_page_view': false });
          gtag('event', 'page_view');
        `}
      </script>
      
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
