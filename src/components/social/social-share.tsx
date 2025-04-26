import { Button } from '@/components/ui/button';
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon
} from 'react-share';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  tags?: string[];
  className?: string;
}

export function SocialShare({
  url,
  title,
  description = '',
  tags = [],
  className = ''
}: SocialShareProps) {
  const shareUrl = url.startsWith('http') ? url : `https://vitalmetrics.in${url}`;
  const hashtags = tags.map(tag => tag.replace(/\s+/g, '')); // Remove spaces from tags
  
  return (
    <div className={`flex gap-2 ${className}`}>
      <FacebookShareButton url={shareUrl} hashtag={hashtags[0]}>
        <Button variant="outline" size="icon" className="w-10 h-10 p-2">
          <FacebookIcon size={24} round />
        </Button>
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={title} hashtags={hashtags}>
        <Button variant="outline" size="icon" className="w-10 h-10 p-2">
          <TwitterIcon size={24} round />
        </Button>
      </TwitterShareButton>

      <LinkedinShareButton url={shareUrl} title={title} summary={description} source="VitalMetrics">
        <Button variant="outline" size="icon" className="w-10 h-10 p-2">
          <LinkedinIcon size={24} round />
        </Button>
      </LinkedinShareButton>

      <WhatsappShareButton url={shareUrl} title={title}>
        <Button variant="outline" size="icon" className="w-10 h-10 p-2">
          <WhatsappIcon size={24} round />
        </Button>
      </WhatsappShareButton>

      <TelegramShareButton url={shareUrl} title={title}>
        <Button variant="outline" size="icon" className="w-10 h-10 p-2">
          <TelegramIcon size={24} round />
        </Button>
      </TelegramShareButton>
    </div>
  );
}
