import React from 'react';
import { Link } from "react-router-dom";
import { Calculator, categoryColors } from "@/types/calculator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalculatorIcon } from "./calculator-icon";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CalculatorCardProps {
  calculator: Calculator;
  className?: string;
}

// Memoize category color classes to avoid recalculation on every render
const getCategoryColorClasses = (category: string) => {
  const baseColor = category.split('-')[0];
  return {
    border: categoryColors[category].replace('text-white', '').replace('bg-', 'border-'),
    bg: `dark:bg-${baseColor}-950`,
    text: `dark:text-${baseColor}-300`,
    badge: `dark:bg-${baseColor}-950 dark:text-${baseColor}-200 dark:border-${baseColor}-800`
  };
};

const CalculatorCardBase = ({ calculator, className }: CalculatorCardProps) => {
  // Memoize color classes
  const colorClasses = React.useMemo(
    () => getCategoryColorClasses(calculator.category),
    [calculator.category]
  );
  return (
    <Link to={`/calculator/${calculator.slug}`} className="block group">
      <Card 
        className={cn(
          "h-full transition-all duration-300 hover:shadow-lg border-l-4 relative", 
          "dark:bg-black/90 dark:border-slate-800",
          "dark:hover:bg-slate-900 dark:hover:border-primary",
          "dark:shadow-lg dark:shadow-black/40",
          className,
          colorClasses.border
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className={cn(
              "p-2 rounded-md flex-shrink-0", 
              categoryColors[calculator.category].replace("text-white", "bg-opacity-10"),
              "dark:bg-opacity-20 dark:border dark:border-slate-700",
              colorClasses.bg
            )}>
              <CalculatorIcon 
                calculator={calculator} 
                size={20} 
                className={cn(
                  "calculator-icon transition-colors", 
                  categoryColors[calculator.category].replace("bg-", "text-").replace("text-white", ""),
                  "dark:text-opacity-100",
                  colorClasses.text
                )} 
              />
            </div>
            <div>
              <h3 className="font-medium text-base leading-tight group-hover:text-primary dark:text-white dark:group-hover:text-primary transition-colors font-heading">
                {calculator.name}
              </h3>
              <Badge 
                variant="outline" 
                className={cn(
                  "text-xs mt-1.5", 
                  categoryColors[calculator.category],
                  "dark:bg-opacity-20 dark:border-slate-700",
                  colorClasses.badge
                )}
              >
                {calculator.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground dark:text-slate-400 mb-3">
            {calculator.description}
          </p>
          
          <div className="flex items-center text-xs text-primary dark:text-primary font-medium group-hover:text-primary-foreground">
            <span>Use Calculator</span>
            <ArrowRight className="h-3 w-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export const CalculatorCard = React.memo(CalculatorCardBase, (prevProps, nextProps) => {
  return prevProps.calculator.id === nextProps.calculator.id;
});
