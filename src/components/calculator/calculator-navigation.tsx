
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams } from "react-router-dom";
import { calculators } from "@/data/calculators";
import { categoryLabels } from "@/types/calculator";

export function CalculatorNavigation() {
  const { slug } = useParams<{ slug: string }>();
  const currentCalculator = calculators.find(calc => calc.slug === slug);
  const relatedCalculators = currentCalculator 
    ? calculators.filter(calc => 
        calc.category === currentCalculator.category && 
        calc.slug !== currentCalculator.slug
      )
    : [];

  return (
    <div className="flex items-center justify-between mb-6">
      <Link to="/calculators">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" />
          Back to Calculators
        </Button>
      </Link>
      
      {relatedCalculators.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Related Calculators
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {currentCalculator && (
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                {categoryLabels[currentCalculator.category]}
              </div>
            )}
            {relatedCalculators.map((calc) => (
              <DropdownMenuItem key={calc.slug} asChild>
                <Link to={`/calculator/${calc.slug}`} className="cursor-pointer">
                  {calc.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
