import { Helmet } from 'react-helmet-async';

interface ResourceHintsProps {
  preconnectUrls?: string[];
  prefetchUrls?: string[];
  preloadFonts?: Array<{
    href: string;
    type: string;
  }>;
}

export function ResourceHints({
  preconnectUrls = [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ],
  prefetchUrls = [],
  preloadFonts = []
}: ResourceHintsProps) {
  return (
    <Helmet>
      {/* DNS Prefetch */}
      {preconnectUrls.map(url => (
        <link key={`dns-${url}`} rel="dns-prefetch" href={url} />
      ))}

      {/* Preconnect */}
      {preconnectUrls.map(url => (
        <link key={`preconnect-${url}`} rel="preconnect" href={url} crossOrigin="anonymous" />
      ))}

      {/* Prefetch */}
      {prefetchUrls.map(url => (
        <link key={`prefetch-${url}`} rel="prefetch" href={url} />
      ))}

      {/* Preload Fonts */}
      {preloadFonts.map(font => (
        <link 
          key={`font-${font.href}`} 
          rel="preload" 
          href={font.href} 
          as="font" 
          type={font.type} 
          crossOrigin="anonymous" 
        />
      ))}
    </Helmet>
  );
}
