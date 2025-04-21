import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useId } from "react";
import { cn } from "@/lib/utils";

interface CalculatorNumberInputProps {
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
}

export function CalculatorNumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  placeholder,
  className,
  required = false,
  disabled = false,
  description,
}: CalculatorNumberInputProps) {
  const id = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    if (!isNaN(newValue)) {
      onChange(newValue);
    } else {
      onChange(0);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between">
        <Label htmlFor={id} className="text-sm font-medium dark:text-slate-100">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {description && (
          <span className="text-xs text-muted-foreground dark:text-slate-300">
            {description}
          </span>
        )}
      </div>
      <div className="relative">
        <Input
          id={id}
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={cn(
            unit ? "pr-12" : "",
            "dark:bg-slate-800/90 dark:border-slate-600",
            "dark:text-slate-100 dark:placeholder:text-slate-500",
            "focus:dark:border-primary focus:dark:ring-primary/30",
            "dark:hover:border-slate-500",
            disabled && "dark:bg-slate-800/50 dark:text-slate-400"
          )}
        />
        {unit && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground dark:text-slate-400">
            {unit}
          </div>
        )}
      </div>
    </div>
  );
}
