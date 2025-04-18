
import { CalculatorCard } from "./calculator-card";
import { calculators } from "@/data/calculators";
import { Category } from "@/types/calculator";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface CalculatorGridProps {
  filter?: Category;
  search?: string;
}

export function CalculatorGrid({ filter, search }: CalculatorGridProps) {
  const [filteredCalculators, setFilteredCalculators] = useState(calculators);
  const isMobile = useIsMobile();

  useEffect(() => {
    let filtered = calculators;

    if (filter) {
      filtered = filtered.filter((calc) => calc.category === filter);
    }

    if (search && search.trim() !== "") {
      const searchTerms = search.toLowerCase().trim().split(" ");
      filtered = filtered.filter((calc) => 
        searchTerms.every(term => 
          calc.name.toLowerCase().includes(term) || 
          calc.description.toLowerCase().includes(term)
        )
      );
    }

    setFilteredCalculators(filtered);
  }, [filter, search]);

  if (filteredCalculators.length === 0) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <h3 className="text-xl font-medium">No calculators found</h3>
        <p className="text-muted-foreground mt-2 text-sm">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-3 sm:gap-4 animate-fade-in ${
      isMobile 
        ? 'grid-cols-1' 
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    }`}>
      {filteredCalculators.map((calculator) => (
        <CalculatorCard key={calculator.id} calculator={calculator} />
      ))}
    </div>
  );
}
