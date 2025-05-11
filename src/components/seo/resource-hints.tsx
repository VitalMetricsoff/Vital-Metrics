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
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

      {/* Preconnect */}
      {preconnectUrls.map(url => (
        <link key={`preconnect-${url}`} rel="preconnect" href={url} crossOrigin="anonymous" />
      ))}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />

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
