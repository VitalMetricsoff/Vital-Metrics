import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'MedicalCalculator';
  lastReviewed?: string;
  reviewedBy?: {
    name: string;
    credentials: string;
    affiliation?: string;
  };
  medicalReferences?: Array<{
    title: string;
    authors: string[];
    journal: string;
    year: number;
    doi?: string;
  }>;
  calculatorData?: {
    name: string;
    purpose: string;
    method: string;
    normalRanges?: string;
    interpretationGuidelines?: string;
    limitations?: string[];
  };
  faqSchema?: Array<{
    question: string;
    answer: string;
  }>;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: Array<{
      name: string;
      credentials: string;
      bio?: string;
    }>;
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

const getMedicalCalculatorSchema = (calculatorData: SEOProps['calculatorData']) => ({
  "@context": "https://schema.org",
  "@type": "MedicalCalculator",
  "name": calculatorData?.name,
  "description": calculatorData?.purpose,
  "medicalSpecialty": ["General Practice", "Internal Medicine", "Family Medicine", "Emergency Medicine"],
  "relevantSpecialty": ["General Practice", "Internal Medicine", "Family Medicine", "Emergency Medicine", "Cardiology", "Endocrinology", "Nutrition"],
  "study": {
    "@type": "MedicalStudy",
    "description": calculatorData?.method,
    "healthCondition": {
      "@type": "MedicalCondition",
      "name": calculatorData?.name.split(' ')[0]
    }
  },
  "about": {
    "@type": "MedicalProcedure",
    "name": calculatorData?.name,
    "howPerformed": calculatorData?.method,
    "normalRange": calculatorData?.normalRanges,
    "interpretation": calculatorData?.interpretationGuidelines
  },
  "audience": {
    "@type": "Audience",
    "audienceType": ["Healthcare Professionals", "Medical Students", "General Public"]
  },
  "provider": {
    "@type": "Organization",
    "name": "VitalMetrics",
    "url": "https://vitalmetrics.in"
  }
});

const getFAQSchema = (faqs: SEOProps['faqSchema']) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs?.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

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
  title = 'Free Medical Calculators (50+) | Evidence-Based Tools for Healthcare',
  description = 'Free access to 50+ evidence-based medical calculators & health tools. Used by 100,000+ healthcare professionals worldwide. Get instant, accurate clinical calculations with detailed interpretations. BMI, BMR, Body Fat, Heart Rate, Blood Pressure & more.',
  keywords = [
    'medical calculator', 'clinical calculator', 'healthcare tools', 'medical equations',
    'BMI calculator', 'body fat calculator', 'BMR calculator', 'TDEE calculator',
    'heart rate calculator', 'blood pressure calculator', 'pregnancy calculator',
    'diabetes calculator', 'cholesterol calculator', 'health risk calculator',
    'free medical tools', 'online health calculator', 'clinical decision support',
    'evidence based calculator', 'medical reference tools', 'healthcare calculations'
  ],
  ogImage = '/og-image.jpg',
  canonical,
  type = 'website',
  lastReviewed,
  reviewedBy,
  medicalReferences,
  calculatorData,
  faqSchema,
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
      
      {/* Comprehensive Favicon Support */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="apple-touch-icon" href="/favicon-96x96.png" />
      <link rel="mask-icon" href="/favicon.svg" color="#2563EB" />
      <meta name="msapplication-TileImage" content="/favicon-96x96.png" />
      <meta name="msapplication-square96x96logo" content="/favicon-96x96.png" />
      <meta property="og:image" content="/favicon-96x96.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Preload Critical Images */}
      <link rel="preload" as="image" href="/favicon.svg" type="image/svg+xml" />
      <link rel="modulepreload" href="/src/main.tsx" />
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

      {/* Enhanced Meta Tags for Search Results */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#2563EB" />
      <meta name="msapplication-TileColor" content="#2563EB" />
      <meta name="application-name" content="VitalMetrics" />
      <meta name="apple-mobile-web-app-title" content="VitalMetrics" />

      {/* Google Analytics - Optimized Loading */}
      <script async defer src="https://www.googletagmanager.com/gtag/js?id=G-YRMK8N3PQL" />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YRMK8N3PQL', {
            'send_page_view': true,
            'cookie_domain': 'vitalmetrics.in',
            'cookie_flags': 'SameSite=None;Secure',
            'anonymize_ip': true
          });
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
            <meta 
              property="article:author" 
              content={typeof author === 'string' ? author : `${author.name}, ${author.credentials}`}
              key={typeof author === 'string' ? author : author.name}
            />
          ))}
          {article.tags?.map((tag) => (
            <meta property="article:tag" content={tag} key={tag} />
          ))}
        </>
      )}

      {/* Enhanced SEO Optimization */}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="1 days" />
      <meta name="language" content="English" />
      <meta name="copyright" content="© 2025 VitalMetrics. All rights reserved." />
      <meta name="author" content="VitalMetrics - Evidence-Based Medical Calculators" />
      <meta name="web_author" content="VitalMetrics Development Team" />
      <meta name="generator" content="VitalMetrics Calculator Platform" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="safe for kids" />
      <meta name="doc-type" content="Web Page" />
      <meta name="doc-class" content="Medical Tools" />
      <meta name="doc-rights" content="Public" />
      
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
