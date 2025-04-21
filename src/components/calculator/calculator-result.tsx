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
    <Card className={cn(
      "animate-fade-in", 
      "dark:bg-slate-950 dark:border-slate-800",
      "dark:shadow-2xl dark:shadow-black/30",
      "dark:ring-2 dark:ring-slate-700",
      className
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold dark:text-white">{title}</CardTitle>
          {onDownload && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onDownload}
              className="flex items-center gap-1 text-xs dark:bg-slate-800 dark:border-slate-600 dark:hover:bg-slate-700 dark:text-white"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </Button>
          )}
        </div>
        {description && <CardDescription className="dark:text-slate-100">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="dark:text-white">{children}</CardContent>
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
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-100";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-100";
      case "error":
        return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-100";
      case "info":
      default:
        return "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-100";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <Check className="h-5 w-5 text-green-600 dark:text-green-300" />;
      case "warning":
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-300" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-600 dark:text-blue-300" />;
    }
  };

  return (
    <div className={`p-4 rounded-lg border shadow-md ${getTypeStyles()}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3">
          <h3 className="text-sm font-medium dark:text-white">{title}</h3>
          <div className="mt-2 text-sm dark:text-slate-100">{children}</div>
        </div>
      </div>
    </div>
  );
}
