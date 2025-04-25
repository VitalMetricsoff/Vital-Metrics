import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <MainLayout
      title="Page Not Found | VitalMetrics"
      description="We couldn't find the page you're looking for. Explore our health calculators and wellness tools instead."
      keywords={['404', 'page not found', 'health calculators', 'wellness tools']}
    >
      <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          We couldn't find the page you're looking for. But don't worry, you can:
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild variant="outline">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>
          
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
