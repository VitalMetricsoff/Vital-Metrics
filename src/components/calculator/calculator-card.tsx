import React from 'react';
import { Link } from "react-router-dom";
import { Calculator, categoryColors } from "@/types/calculator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalculatorIcon } from "./calculator-icon";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from '@/components/ui/optimized-image';

interface CalculatorCardProps {
  calculator: Calculator;
  className?: string;
  priority?: boolean;
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

const CalculatorCardBase = ({ calculator, className, priority = false }: CalculatorCardProps) => {
  // Memoize color classes and link
  const colorClasses = React.useMemo(
    () => getCategoryColorClasses(calculator.category),
    [calculator.category]
  );

  const calculatorPath = React.useMemo(
    () => `/calculators/${calculator.slug}`,
    [calculator.slug]
  );

  return (
    <Link
      to={calculatorPath}
      className={cn(
        'block p-4 rounded-lg transition-all duration-200',
        'hover:shadow-lg hover:-translate-y-1',
        'focus:outline-none focus:ring-2 focus:ring-primary',
        'will-change-transform',
        colorClasses.bg,
        className
      )}
    >
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
          <div className="flex items-start justify-between gap-4">
            {calculator.icon && (
              <OptimizedImage
                src={calculator.icon}
                alt={`${calculator.name} icon`}
                width={48}
                height={48}
                className="flex-shrink-0 rounded-md"
                priority={priority}
                loading={priority ? 'eager' : 'lazy'}
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className={cn('text-lg font-semibold mb-1 truncate', colorClasses.text)}>
                {calculator.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {calculator.description}
              </p>
            </div>
            <div className="flex items-center text-xs text-primary dark:text-primary font-medium group-hover:text-primary-foreground">
              <span>Use Calculator</span>
              <ArrowRight className="h-3 w-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export const CalculatorCard = React.memo(CalculatorCardBase, (prevProps, nextProps) => {
  return prevProps.calculator.id === nextProps.calculator.id;
});
