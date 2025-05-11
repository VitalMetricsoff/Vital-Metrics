
import { CalculatorCard } from "./calculator-card";
import { calculators } from "@/data/calculators";
import { Category } from "@/types/calculator";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface CalculatorGridProps {
  filter?: Category;
  search?: string;
}

// Custom hook for debounced search
const useDebounce = (value: string | undefined, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export function CalculatorGrid({ filter, search }: CalculatorGridProps) {
  const isMobile = useIsMobile();
  const debouncedSearch = useDebounce(search, 300); // 300ms debounce

  // Memoize filtered calculators by category
  const categoryFiltered = useMemo(() => {
    if (!filter) return calculators;
    return calculators.filter((calc) => calc.category === filter);
  }, [filter]);

  // Memoize search function
  const searchCalculators = useCallback((items: typeof calculators, searchTerm: string) => {
    if (!searchTerm || searchTerm.trim() === "") return items;
    const searchTerms = searchTerm.toLowerCase().trim().split(" ");
    return items.filter((calc) => 
      searchTerms.every(term => 
        calc.name.toLowerCase().includes(term) || 
        calc.description.toLowerCase().includes(term)
      )
    );
  }, []);

  // Final filtered results
  const filteredCalculators = useMemo(() => {
    return searchCalculators(categoryFiltered, debouncedSearch || "");
  }, [categoryFiltered, debouncedSearch, searchCalculators]);

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
