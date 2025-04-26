import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { SEO } from '@/components/seo/seo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Home, Search } from 'lucide-react';

declare global {
  interface Window {
    gtag: (command: string, action: string, params: object) => void;
  }
}

interface Suggestion {
  title: string;
  description: string;
  path: string;
}

export default function NotFoundPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      title: 'Medical Calculators',
      description: 'Access our comprehensive collection of medical calculators',
      path: '/calculators'
    },
    {
      title: 'Health Blog',
      description: 'Read the latest articles on health and wellness',
      path: '/blog'
    },
    {
      title: 'About Us',
      description: 'Learn more about VitalMetrics and our mission',
      path: '/about'
    }
  ]);

  useEffect(() => {
    // Report 404 to analytics
    if (window.gtag) {
      window.gtag('event', '404_error', {
        page_path: window.location.pathname,
        page_title: '404 Not Found'
      });
    }
  }, []);

  return (
    <MainLayout
      title="Page Not Found | VitalMetrics"
      description="We couldn't find the page you're looking for. Explore our suggested resources or return to the homepage."
      keywords={['404', 'page not found', 'health calculators', 'wellness tools']}
    >
      <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-4rem)]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Page Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            We couldn't find the page you're looking for. Here are some helpful links:
          </p>
          
          <Button asChild variant="outline">
            <Link to="/calculators" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Browse Calculators
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Read Our Blog
            </Link>
          </Button>
        </div>
        
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">Popular Calculators</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/calculators/bmi" className="text-primary hover:underline">
              BMI Calculator
            </Link>
            <Link to="/calculators/bmr" className="text-primary hover:underline">
              BMR Calculator
            </Link>
            <Link to="/calculators/body-fat" className="text-primary hover:underline">
              Body Fat Calculator
            </Link>
            <Link to="/calculators/calorie-macro" className="text-primary hover:underline">
              Calorie & Macro Calculator
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
