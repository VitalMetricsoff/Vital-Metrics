
import * as LucideIcons from "lucide-react";
import { Calculator } from "@/types/calculator";

interface CalculatorIconProps {
  calculator: Calculator;
  className?: string;
  size?: number;
}

export function CalculatorIcon({ calculator, className, size = 24 }: CalculatorIconProps) {
  // Dynamically get the icon from lucide-react
  const IconComponent = (LucideIcons as any)[calculator.icon] || LucideIcons.CircleDashed;

  return <IconComponent className={className} size={size} />;
}
