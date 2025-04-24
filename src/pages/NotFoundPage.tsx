import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 Not Found | VitalMetrics</title>
        <meta name="description" content="The page you're looking for could not be found. Return to VitalMetrics homepage or explore our medical calculators." />
      </Helmet>
      <div className="container flex flex-col items-center justify-center min-h-[70vh] py-8 md:py-12">
        <div className="text-center space-y-6">
          <div className="bg-primary/10 p-4 rounded-full inline-block mx-auto">
            <Calculator className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
          <p className="text-xl text-muted-foreground">
            Oops! We couldn't find the page you're looking for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="default" size="lg">
                Back to Home
              </Button>
            </Link>
            <Link to="/calculators">
              <Button variant="outline" size="lg">
                Explore Calculators
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
