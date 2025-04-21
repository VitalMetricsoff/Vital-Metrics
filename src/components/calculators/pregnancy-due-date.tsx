import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addDays, format, parse, subDays } from "date-fns";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function PregnancyDueDate() {
  const [lmpDate, setLmpDate] = useState<Date | undefined>(undefined);
  const [showResults, setShowResults] = useState(false);
  
  const handleCalculate = () => {
    if (lmpDate) {
      setShowResults(true);
    }
  };
  
  const calculateDueDate = (): Date | null => {
    if (!lmpDate) return null;
    
    // Pregnancy is typically 40 weeks (280 days) from the first day of the last menstrual period
    return addDays(lmpDate, 280);
  };
  
  const calculateConceptionDate = (): Date | null => {
    if (!lmpDate) return null;
    
    // Conception typically occurs around 14 days after the start of the last period
    return addDays(lmpDate, 14);
  };
  
  const calculateFirstTrimester = (): [Date, Date] | null => {
    if (!lmpDate) return null;
    
    // First trimester: Weeks 1-12 (days 0-84)
    return [lmpDate, addDays(lmpDate, 84)];
  };
  
  const calculateSecondTrimester = (): [Date, Date] | null => {
    if (!lmpDate) return null;
    
    // Second trimester: Weeks 13-27 (days 85-189)
    return [addDays(lmpDate, 85), addDays(lmpDate, 189)];
  };
  
  const calculateThirdTrimester = (): [Date, Date] | null => {
    if (!lmpDate) return null;
    
    // Third trimester: Weeks 28-40 (days 190-280)
    return [addDays(lmpDate, 190), addDays(lmpDate, 280)];
  };
  
  const formatDateRange = (range: [Date, Date] | null): string => {
    if (!range) return "";
    return `${format(range[0], 'MMM d, yyyy')} - ${format(range[1], 'MMM d, yyyy')}`;
  };
  
  const dueDate = calculateDueDate();
  const conceptionDate = calculateConceptionDate();
  const firstTrimester = calculateFirstTrimester();
  const secondTrimester = calculateSecondTrimester();
  const thirdTrimester = calculateThirdTrimester();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lmp-date">First day of last menstrual period</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !lmpDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {lmpDate ? format(lmpDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={lmpDate}
                    onSelect={setLmpDate}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <Button className="w-full mt-4" onClick={handleCalculate} disabled={!lmpDate}>
              Calculate Due Date
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {showResults && dueDate && (
        <CalculatorResult title="Pregnancy Due Date Results">
          <div className="space-y-4">
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-medium dark:text-slate-200">Estimated Due Date</h3>
              <p className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">{format(dueDate, 'MMMM d, yyyy')}</p>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Conception Date (Estimated)</p>
                  <p className="text-lg font-semibold text-blue-950 dark:text-blue-50">
                    {conceptionDate ? format(conceptionDate, 'MMM d, yyyy') : 'N/A'}
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">Current Gestation</p>
                  <p className="text-lg font-semibold text-green-950 dark:text-green-50">
                    {lmpDate ? 
                      (() => {
                        const diffTime = Math.abs(new Date().getTime() - lmpDate.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        const weeks = Math.floor(diffDays / 7);
                        const days = diffDays % 7;
                        return diffDays <= 280 ? 
                          `${weeks} weeks, ${days} days` : 
                          "Due date has passed";
                      })() : 
                      'N/A'
                    }
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 mt-4">
                <h3 className="font-medium text-slate-900 dark:text-slate-100">Trimester Dates</h3>
                <div className="grid gap-3">
                  <div className="p-4 bg-pink-50 dark:bg-pink-950/50 border border-pink-200 dark:border-pink-800 rounded-lg">
                    <p className="text-sm font-medium text-pink-900 dark:text-pink-100">First Trimester (Weeks 1-12)</p>
                    <p className="text-base font-semibold text-pink-950 dark:text-pink-50">{formatDateRange(firstTrimester)}</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-lg">
                    <p className="text-sm font-medium text-purple-900 dark:text-purple-100">Second Trimester (Weeks 13-27)</p>
                    <p className="text-base font-semibold text-purple-950 dark:text-purple-50">{formatDateRange(secondTrimester)}</p>
                  </div>
                  
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                    <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100">Third Trimester (Weeks 28-40)</p>
                    <p className="text-base font-semibold text-indigo-950 dark:text-indigo-50">{formatDateRange(thirdTrimester)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-slate-600 dark:text-slate-300">
              <p>Note: This calculation is based on a 28-day menstrual cycle and assumes that ovulation occurs on day 14. The actual due date may vary by approximately two weeks before or after the calculated date.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
