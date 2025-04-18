
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReactNode } from "react";
import { Check, Info, AlertTriangle, AlertCircle, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CalculatorResultProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  onDownload?: () => void;
}

export function CalculatorResult({ title, description, children, className, onDownload }: CalculatorResultProps) {
  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          {onDownload && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onDownload}
              className="flex items-center gap-1 text-xs"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </Button>
          )}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

type AlertType = "success" | "info" | "warning" | "error";

interface ResultAlertProps {
  type: AlertType;
  title: string;
  children: ReactNode;
  className?: string;
}

export function ResultAlert({ type, title, children, className }: ResultAlertProps) {
  const icons = {
    success: Check,
    info: Info,
    warning: AlertTriangle,
    error: AlertCircle
  };

  const Icon = icons[type];

  const alertClasses = {
    success: "border-green-500 text-green-700 dark:text-green-300",
    info: "border-blue-500 text-blue-700 dark:text-blue-300",
    warning: "border-yellow-500 text-yellow-700 dark:text-yellow-300",
    error: "border-red-500 text-red-700 dark:text-red-300"
  };

  return (
    <Alert className={cn("border-l-4", alertClasses[type], className)}>
      <Icon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
