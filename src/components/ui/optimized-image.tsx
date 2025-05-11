import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  sizes = '100vw',
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageFormat, setImageFormat] = useState<string>('');

  useEffect(() => {
    // Check browser support for modern formats
    const checkImageSupport = async () => {
      const formats = ['avif', 'webp'];
      for (const format of formats) {
        const image = new Image();
        const supported = image.decode !== undefined && 
          image.currentSrc !== undefined;
        
        if (supported) {
          const formatSrc = src.replace(/\.(jpg|jpeg|png)$/, `.${format}`);
          try {
            const response = await fetch(formatSrc, { method: 'HEAD' });
            if (response.ok) {
              setImageSrc(formatSrc);
              setImageFormat(format);
              break;
            }
          } catch (error) {
            console.debug(`${format} version not available for ${src}`);
          }
        }
      }
    };

    checkImageSupport();
  }, [src]);

  return (
    <picture>
      {imageFormat === 'avif' && (
        <source
          type="image/avif"
          srcSet={imageSrc}
          sizes={sizes}
        />
      )}
      {(imageFormat === 'webp' || imageFormat === 'avif') && (
        <source
          type="image/webp"
          srcSet={src.replace(/\.(jpg|jpeg|png)$/, '.webp')}
          sizes={sizes}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={cn('max-w-full h-auto', className)}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        {...props}
      />
    </picture>
  );
}
