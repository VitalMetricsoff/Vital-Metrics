
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

export function CalculatorCard({ calculator, className }: CalculatorCardProps) {
  return (
    <Link to={`/calculator/${calculator.slug}`} className="block group">
      <Card 
        className={cn(
          "h-full transition-all duration-300 hover:shadow-lg border-l-4 relative", 
          "dark:bg-card/70 dark:border-primary/30 dark:hover:border-primary/50",
          className,
          categoryColors[calculator.category].replace("text-white", "").replace("bg-", "border-")
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className={cn(
              "p-2 rounded-md flex-shrink-0", 
              categoryColors[calculator.category].replace("text-white", "bg-opacity-10"),
              "dark:bg-opacity-20 dark:border dark:border-white/10",
              calculator.category.includes("body") ? "dark:bg-blue-900/20" : "",
              calculator.category.includes("fitness") ? "dark:bg-green-900/20" : "",
              calculator.category.includes("cardio") ? "dark:bg-red-900/20" : "",
              calculator.category.includes("nutrition") ? "dark:bg-orange-900/20" : "",
              calculator.category.includes("diabetes") ? "dark:bg-yellow-900/20" : "",
              calculator.category.includes("pregnancy") ? "dark:bg-pink-900/20" : "",
              calculator.category.includes("lungs") ? "dark:bg-indigo-900/20" : "",
              calculator.category.includes("mental") ? "dark:bg-purple-900/20" : "",
              calculator.category.includes("other") ? "dark:bg-gray-900/20" : ""
            )}>
              <CalculatorIcon 
                calculator={calculator} 
                size={20} 
                className={cn(
                  "calculator-icon transition-colors", 
                  categoryColors[calculator.category].replace("bg-", "text-").replace("text-white", ""),
                  "dark:text-opacity-100 dark:text-white",
                  calculator.category.includes("body") ? "dark:text-blue-400" : "",
                  calculator.category.includes("fitness") ? "dark:text-green-400" : "",
                  calculator.category.includes("cardio") ? "dark:text-red-400" : "",
                  calculator.category.includes("nutrition") ? "dark:text-orange-400" : "",
                  calculator.category.includes("diabetes") ? "dark:text-yellow-400" : "",
                  calculator.category.includes("pregnancy") ? "dark:text-pink-400" : "",
                  calculator.category.includes("lungs") ? "dark:text-indigo-400" : "",
                  calculator.category.includes("mental") ? "dark:text-purple-400" : "",
                  calculator.category.includes("other") ? "dark:text-gray-400" : ""
                )} 
              />
            </div>
            <div>
              <h3 className="font-medium text-base leading-tight group-hover:text-primary dark:group-hover:text-primary-foreground dark:text-white transition-colors font-heading">
                {calculator.name}
              </h3>
              <Badge 
                variant="outline" 
                className={cn(
                  "text-xs mt-1.5", 
                  categoryColors[calculator.category],
                  "dark:bg-opacity-20 dark:text-opacity-100 dark:text-white dark:border-white/10",
                  calculator.category.includes("body") ? "dark:bg-blue-900/30 dark:text-blue-300" : "",
                  calculator.category.includes("fitness") ? "dark:bg-green-900/30 dark:text-green-300" : "",
                  calculator.category.includes("cardio") ? "dark:bg-red-900/30 dark:text-red-300" : "",
                  calculator.category.includes("nutrition") ? "dark:bg-orange-900/30 dark:text-orange-300" : "",
                  calculator.category.includes("diabetes") ? "dark:bg-yellow-900/30 dark:text-yellow-300" : "",
                  calculator.category.includes("pregnancy") ? "dark:bg-pink-900/30 dark:text-pink-300" : "",
                  calculator.category.includes("lungs") ? "dark:bg-indigo-900/30 dark:text-indigo-300" : "",
                  calculator.category.includes("mental") ? "dark:bg-purple-900/30 dark:text-purple-300" : "",
                  calculator.category.includes("other") ? "dark:bg-gray-900/30 dark:text-gray-300" : ""
                )}
              >
                {calculator.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground dark:text-gray-300 mb-3">
            {calculator.description}
          </p>
          
          <div className="flex items-center text-xs text-primary dark:text-primary font-medium">
            <span>Use Calculator</span>
            <ArrowRight className="h-3 w-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
