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
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
}

export function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  sizes = '100vw',
  priority = false,
  quality = 75,
  placeholder = 'empty',
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageFormat, setImageFormat] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const generateSrcSet = (format: string) => {
      const widths = [640, 1024, 1280];
      const baseName = src.replace(/\.(jpg|jpeg|png)$/, '');
      return widths
        .map(w => `${baseName}-${w}.${format} ${w}w`)
        .join(', ');
    };

    // Check browser support for modern formats
    const checkImageSupport = async () => {
      const formats = ['avif', 'webp'];
      for (const format of formats) {
        if (await testImageFormat(format)) {
          setImageFormat(format);
          break;
        }
      }
    };

    checkImageSupport();
  }, [src]);

  const testImageFormat = async (format: string) => {
    const image = new Image();
    const supported = image.decode !== undefined;
    
    if (supported) {
      const testSrc = src.replace(/\.(jpg|jpeg|png)$/, `-640.${format}`);
      try {
        const response = await fetch(testSrc, { method: 'HEAD' });
        return response.ok;
      } catch {
        return false;
      }
    }
    return false;
  };

  return (
    <picture className={cn(
      'inline-block',
      !isLoaded && placeholder === 'blur' && 'blur-sm',
      error && 'bg-muted',
      className
    )}>
      {imageFormat === 'avif' && (
        <source
          type="image/avif"
          srcSet={`${src.replace(/\.(jpg|jpeg|png)$/, '-640.avif')} 640w, 
                  ${src.replace(/\.(jpg|jpeg|png)$/, '-1024.avif')} 1024w, 
                  ${src.replace(/\.(jpg|jpeg|png)$/, '-1280.avif')} 1280w`}
          sizes={sizes}
        />
      )}
      {(imageFormat === 'webp' || imageFormat === 'avif') && (
        <source
          type="image/webp"
          srcSet={`${src.replace(/\.(jpg|jpeg|png)$/, '-640.webp')} 640w, 
                  ${src.replace(/\.(jpg|jpeg|png)$/, '-1024.webp')} 1024w, 
                  ${src.replace(/\.(jpg|jpeg|png)$/, '-1280.webp')} 1280w`}
          sizes={sizes}
        />
      )}
      <img
        src={src.replace(/\.(jpg|jpeg|png)$/, '-optimized$&')}
        alt={alt}
        className={cn('max-w-full h-auto', error && 'hidden')}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        {...props}
      />
      {error && (
        <div className="flex items-center justify-center w-full h-full bg-muted rounded-md p-4">
          <span className="text-sm text-muted-foreground">Failed to load image</span>
        </div>
      )}
    </picture>
  );
}
