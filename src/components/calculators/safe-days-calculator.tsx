
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addDays, format, subDays } from "date-fns";
import { CalendarIcon, AlertTriangleIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";

export function SafeDaysCalculator() {
  const [periodDate, setPeriodDate] = useState<Date | undefined>(undefined);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [showResults, setShowResults] = useState(false);
  
  const handleCalculate = () => {
    if (periodDate) {
      setShowResults(true);
    }
  };
  
  const calculateOvulationDate = (): Date | null => {
    if (!periodDate) return null;
    
    // Ovulation typically occurs 14 days before the next period
    const daysToOvulation = cycleLength - 14;
    return addDays(periodDate, daysToOvulation);
  };
  
  const calculateFertileWindow = (): [Date, Date] | null => {
    if (!periodDate) return null;
    
    const ovulationDate = calculateOvulationDate();
    if (!ovulationDate) return null;
    
    // Fertile window is typically 5 days before ovulation and the day of ovulation
    const startDate = subDays(ovulationDate, 5);
    const endDate = ovulationDate;
    
    // Return as a tuple to ensure TypeScript knows this is exactly 2 elements
    return [startDate, endDate];
  };
  
  const calculateSafeDays = (): { early: [Date, Date] | null, late: [Date, Date] | null } => {
    if (!periodDate) return { early: null, late: null };
    
    const fertileWindow = calculateFertileWindow();
    if (!fertileWindow) return { early: null, late: null };
    
    // Early safe days: From the end of period to the start of fertile window
    const periodEnd = addDays(periodDate, periodLength - 1);
    const earlyStart = addDays(periodEnd, 1);
    const earlyEnd = subDays(fertileWindow[0], 1);
    
    // Late safe days: From the end of fertile window to the start of next period
    const lateStart = addDays(fertileWindow[1], 1);
    const lateEnd = addDays(periodDate, cycleLength - 1);
    
    // Check if ranges are valid (start <= end)
    // Make sure we're explicitly creating tuples with exactly 2 elements
    const early = earlyStart <= earlyEnd ? [earlyStart, earlyEnd] as [Date, Date] : null;
    const late = lateStart <= lateEnd ? [lateStart, lateEnd] as [Date, Date] : null;
    
    return { early, late };
  };
  
  const formatDateRange = (range: [Date, Date] | null): string => {
    if (!range) return "None";
    return `${format(range[0], 'MMM d, yyyy')} - ${format(range[1], 'MMM d, yyyy')}`;
  };
  
  const ovulationDate = calculateOvulationDate();
  const fertileWindow = calculateFertileWindow();
  const safeDays = calculateSafeDays();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="period-date">First day of last period</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !periodDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {periodDate ? format(periodDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={periodDate}
                    onSelect={setPeriodDate}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <CalculatorNumberInput
              label="Cycle Length"
              value={cycleLength}
              onChange={setCycleLength}
              min={21}
              max={45}
              unit="days"
              description="Average time from the first day of one period to the first day of the next"
              required
            />
            
            <CalculatorNumberInput
              label="Period Length"
              value={periodLength}
              onChange={setPeriodLength}
              min={2}
              max={10}
              unit="days"
              description="How many days your period typically lasts"
              required
            />
            
            <Button className="w-full mt-4" onClick={handleCalculate} disabled={!periodDate}>
              Calculate Safe Days
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {showResults && ovulationDate && (
        <CalculatorResult title="Safe Days Results (Ogino-Knaus Method)">
          <div className="space-y-4">
            <ResultAlert type="warning" title="Important Health Information">
              The calendar method (Ogino-Knaus) is one of the least reliable contraceptive methods, with typical failure rates of 15-24%. 
              This calculator is for educational purposes only and should not be your sole method of contraception. 
              Please consult with a healthcare provider for personalized advice.
            </ResultAlert>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <AlertTriangleIcon className="h-5 w-5 mr-2 text-red-500" /> 
                  Fertile Window
                </h3>
                <p className="text-base font-semibold">{formatDateRange(fertileWindow)}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Highest risk of pregnancy. Avoid unprotected intercourse during these days.
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-center">
                <h3 className="text-lg font-medium mb-2">Estimated Ovulation Day</h3>
                <p className="text-xl font-semibold">{format(ovulationDate, 'MMMM d, yyyy')}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mt-2">
              <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Potentially "Safe" Days (Lower Risk)</h3>
                
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <p className="font-medium">Early Phase:</p>
                    <p className="font-semibold">{formatDateRange(safeDays.early)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Days after your period ends and before your fertile window starts</p>
                  </div>
                  
                  <div>
                    <p className="font-medium">Late Phase:</p>
                    <p className="font-semibold">{formatDateRange(safeDays.late)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Days after your fertile window ends and before your next period starts</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Your Cycle At a Glance</h3>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 text-center bg-pink-100 rounded">
                    <p className="text-xs">Period</p>
                    <p className="font-semibold">{periodLength} days</p>
                  </div>
                  <div className="p-2 text-center bg-green-100 rounded">
                    <p className="text-xs">Potentially "Safe"</p>
                    <p className="font-semibold">
                      {safeDays.early ? Math.round((safeDays.early[1].getTime() - safeDays.early[0].getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0} days
                    </p>
                  </div>
                  <div className="p-2 text-center bg-red-100 rounded">
                    <p className="text-xs">Fertile</p>
                    <p className="font-semibold">
                      {fertileWindow ? Math.round((fertileWindow[1].getTime() - fertileWindow[0].getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0} days
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1">
                  <div className="p-2 text-center bg-green-100 rounded">
                    <p className="text-xs">Potentially "Safe"</p>
                    <p className="font-semibold">
                      {safeDays.late ? Math.round((safeDays.late[1].getTime() - safeDays.late[0].getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0} days
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground mt-4">
              <p className="font-semibold text-red-500 mb-2">Disclaimer:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>The Ogino-Knaus method (calendar method) is one of the least effective forms of birth control with a high failure rate.</li>
                <li>This calculator assumes a regular menstrual cycle, which many women do not have.</li>
                <li>Factors like stress, illness, travel, and lifestyle changes can affect ovulation timing.</li>
                <li>Even during "safe" days, there is still a risk of pregnancy.</li>
                <li>This method provides no protection against sexually transmitted infections.</li>
                <li>For reliable contraception, consult with a healthcare provider about more effective options.</li>
              </ul>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
