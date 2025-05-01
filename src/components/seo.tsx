import { Helmet, HelmetProps } from 'react-helmet';
import { siteMetadata } from '@/lib/metadata';

interface SEOProps extends Partial<HelmetProps> {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
}

export function SEO({ 
  title = siteMetadata.title,
  description = siteMetadata.description,
  path = '',
  keywords = siteMetadata.keywords,
}: SEOProps) {
  const url = `${siteMetadata.alternates.canonical}${path}`;
  const ogImage = `${siteMetadata.alternates.canonical}${siteMetadata.openGraph.images[0].url}`;

  const metaTags: HelmetProps['meta'] = [
    { name: 'description', content: description },
    { name: 'keywords', content: keywords.join(', ') },
    
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: ogImage },
    { property: 'og:site_name', content: 'Vital Metrics' },
    { property: 'og:locale', content: siteMetadata.openGraph.locale },

    // Twitter
    { name: 'twitter:card', content: siteMetadata.twitter.card },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
    { name: 'twitter:creator', content: siteMetadata.twitter.creator },

    // Additional SEO
    { name: 'robots', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#ffffff' }
  ];

  return (
    <Helmet>
      <title>{title}</title>
      <meta charSet="utf-8" />
      {metaTags.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Vital Metrics',
            description: description,
            url: url,
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            author: {
              '@type': 'Organization',
              name: 'Vital Metrics',
              url: siteMetadata.alternates.canonical
            }
          })
        }}
      />
    </Helmet>
  );
}
