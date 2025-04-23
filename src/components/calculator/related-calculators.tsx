import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculators } from "@/data/calculators";
import { categoryLabels } from "@/types/calculator";

interface RelatedCalculatorsProps {
  currentSlug: string;
  category: string;
  limit?: number;
}

export function RelatedCalculators({
  currentSlug,
  category,
  limit = 3,
}: RelatedCalculatorsProps) {
  const relatedCalculators = calculators
    .filter(
      (calc) =>
        calc.category === category && calc.slug !== currentSlug
    )
    .slice(0, limit);

  if (!relatedCalculators.length) return null;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Related Calculators</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {relatedCalculators.map((calc) => (
          <Link
            key={calc.slug}
            to={`/calculator/${calc.slug}`}
            className="group block"
          >
            <div className="professional-card p-4 transition-colors hover:bg-muted/50">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary" />
                <h4 className="font-medium">{calc.name}</h4>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {calc.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button variant="outline" asChild>
          <Link to={`/calculators?category=${category}`}>
            View All {categoryLabels[category]} Calculators
          </Link>
        </Button>
      </div>
    </div>
  );
} 