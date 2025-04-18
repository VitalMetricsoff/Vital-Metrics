
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Category, categoryLabels } from "@/types/calculator";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CalculatorFilterProps {
  selectedCategory: Category | undefined;
  onCategoryChange: (category: Category | undefined) => void;
}

export function CalculatorFilter({ selectedCategory, onCategoryChange }: CalculatorFilterProps) {
  const handleCategoryClick = (category: Category | undefined) => {
    onCategoryChange(category === selectedCategory ? undefined : category);
  };

  const categories: Category[] = [
    "body-metrics",
    "fitness-metabolism", 
    "cardio-vitals", 
    "nutrition-metabolic", 
    "diabetes-blood-sugar", 
    "pregnancy-fertility", 
    "lungs-life-expectancy", 
    "mental-sleep", 
    "other-tools",
  ];

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-2 pb-4">
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          size="sm"
          className={cn(
            "rounded-full",
            !selectedCategory 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "border border-muted text-muted-foreground hover:bg-muted/30 dark:border-muted-foreground/30 dark:text-muted-foreground dark:hover:bg-muted/20"
          )}
          onClick={() => handleCategoryClick(undefined)}
        >
          All Calculators
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            className={cn(
              "rounded-full",
              selectedCategory === category 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "border border-muted text-muted-foreground hover:bg-muted/30 dark:border-muted-foreground/30 dark:text-muted-foreground dark:hover:bg-muted/20"
            )}
            onClick={() => handleCategoryClick(category)}
          >
            {categoryLabels[category]}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
