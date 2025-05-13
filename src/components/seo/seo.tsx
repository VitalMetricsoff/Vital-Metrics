import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { ResourceHints } from './resource-hints';

const SOCIAL_MEDIA = {
  twitter: 'https://twitter.com/vitalmetrics',
  facebook: 'https://facebook.com/vitalmetrics',
  linkedin: 'https://linkedin.com/company/vitalmetrics',
  instagram: 'https://instagram.com/vitalmetrics.health'
};

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
  "name": "VitalMetrics - Medical Calculators",
  "alternateName": "VitalMetrics",
  "description": "Free medical calculators and health assessment tools. Calculate BMI, BMR, body fat, heart rate zones and more. Evidence-based tools for healthcare professionals.",
  "potentialAction": [{
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://vitalmetrics.in/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }],
  "mainEntity": [{
    "@type": "WebPage",
    "@id": "https://vitalmetrics.in/login",
    "name": "Login to VitalMetrics",
    "description": "Log into VitalMetrics to access your saved calculations and personalized health tools."
  }, {
    "@type": "WebPage",
    "@id": "https://vitalmetrics.in/calculators",
    "name": "Medical Calculators",
    "description": "Access 50+ medical calculators for healthcare professionals. BMI, BMR, and more."
  }, {
    "@type": "WebPage",
    "@id": "https://vitalmetrics.in/register",
    "name": "Join VitalMetrics",
    "description": "Create an account to save your calculations and access premium features."
  }, {
    "@type": "WebPage",
    "@id": "https://vitalmetrics.in/about",
    "name": "About VitalMetrics",
    "description": "Learn about our evidence-based medical calculators and health assessment tools."
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
  "logo": {
    "@type": "ImageObject",
    "url": "https://vitalmetrics.in/logo.png",
    "width": "512",
    "height": "512"
  },
  "description": "VitalMetrics provides evidence-based medical calculators and health assessment tools for healthcare professionals worldwide",
  "sameAs": [
    "https://twitter.com/vitalmetrics",
    "https://facebook.com/vitalmetrics",
    "https://linkedin.com/company/vitalmetrics",
    "https://instagram.com/vitalmetrics.health"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@vitalmetrics.in"
  },
  "foundingDate": "2023",
  "award": "Trusted by 100,000+ Healthcare Professionals"
};

export function SEO({
  title = 'VitalMetrics - Medical Calculators',
  description = 'Create an account or log into VitalMetrics. Access 50+ medical calculators and health assessment tools. Save your calculations and get personalized recommendations.',
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
  const { pathname } = useLocation();
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

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={`${siteUrl}${canonical || pathname}`} />
        <meta property="og:image" content={`${siteUrl}${ogImage}`} />
        <meta property="og:site_name" content="VitalMetrics" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vitalmetrics" />
        <meta name="twitter:creator" content="@vitalmetrics" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
        
        {/* Social Media Verification */}
        <meta name="facebook-domain-verification" content="your-verification-code" />
        
        {/* Social Media Links */}
        {Object.entries(SOCIAL_MEDIA).map(([platform, url]) => (
          <link key={platform} rel="me" href={url} />
        ))}
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
