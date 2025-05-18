import { useState, useEffect } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  
  // Generate WebP source if original is not WebP
  const webpSrc = src.endsWith('.webp') ? src : src.replace(/\.(jpg|jpeg|png)$/, '.webp');
  
  useEffect(() => {
    // Preload image if priority is true
    if (priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = webpSrc;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [webpSrc, priority]);

  return (
    <picture>
      <source
        srcSet={webpSrc}
        type="image/webp"
      />
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`object-cover ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        onError={() => {
          setImageSrc('/placeholder.webp');
        }}
        {...props}
      />
    </picture>
  );
}
