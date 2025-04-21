import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addDays, format, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";

export function OvulationTracker() {
  const [periodDate, setPeriodDate] = useState<Date | undefined>(undefined);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [lutealPhase, setLutealPhase] = useState<number>(14);
  const [showResults, setShowResults] = useState(false);
  
  const handleCalculate = () => {
    if (periodDate) {
      setShowResults(true);
    }
  };
  
  const calculateOvulationDate = (): Date | null => {
    if (!periodDate) return null;
    
    // Ovulation occurs at the end of the follicular phase
    // Follicular phase = Cycle length - Luteal phase
    const follicularPhase = cycleLength - lutealPhase;
    return addDays(periodDate, follicularPhase - 1);
  };
  
  const calculateFertileWindow = (): [Date, Date] | null => {
    if (!periodDate) return null;
    
    const ovulationDate = calculateOvulationDate();
    if (!ovulationDate) return null;
    
    // Fertile window is typically 5 days before ovulation and the day of ovulation
    return [subDays(ovulationDate, 5), ovulationDate];
  };
  
  const calculateNextPeriod = (): Date | null => {
    if (!periodDate) return null;
    
    return addDays(periodDate, cycleLength);
  };
  
  const formatDateRange = (range: [Date, Date] | null): string => {
    if (!range) return "";
    return `${format(range[0], 'MMM d, yyyy')} - ${format(range[1], 'MMM d, yyyy')}`;
  };
  
  const ovulationDate = calculateOvulationDate();
  const fertileWindow = calculateFertileWindow();
  const nextPeriod = calculateNextPeriod();
  
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
              label="Luteal Phase Length"
              value={lutealPhase}
              onChange={setLutealPhase}
              min={10}
              max={16}
              unit="days"
              description="Days from ovulation to the start of your next period (usually 13-14 days)"
              required
            />
            
            <Button className="w-full mt-4" onClick={handleCalculate} disabled={!periodDate}>
              Calculate Ovulation
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {showResults && ovulationDate && (
        <CalculatorResult title="Ovulation Tracker Results">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-pink-50 dark:bg-pink-950 border border-pink-100 dark:border-pink-800 rounded-lg text-center">
                <h3 className="text-lg font-medium dark:text-pink-100">Estimated Ovulation Date</h3>
                <p className="text-2xl font-bold mt-2 dark:text-pink-50">{format(ovulationDate, 'MMMM d, yyyy')}</p>
              </div>
              
              <div className="p-6 bg-purple-50 dark:bg-purple-950 border border-purple-100 dark:border-purple-800 rounded-lg text-center">
                <h3 className="text-lg font-medium dark:text-purple-100">Next Period Start</h3>
                <p className="text-2xl font-bold mt-2 dark:text-purple-50">{nextPeriod ? format(nextPeriod, 'MMMM d, yyyy') : 'N/A'}</p>
              </div>
            </div>
            
            <div className="p-6 bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-lg">
              <h3 className="text-lg font-medium mb-2 dark:text-blue-100">Fertile Window</h3>
              <p className="text-xl font-semibold dark:text-blue-50">{formatDateRange(fertileWindow)}</p>
              <p className="text-sm text-muted-foreground dark:text-blue-200 mt-2">
                These are your most fertile days. If you're trying to conceive, these are the best days for sexual intercourse.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium dark:text-white">Your Cycle At a Glance</h3>
              <div className="grid gap-2">
                <div className="p-3 bg-muted dark:bg-slate-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold dark:text-white">Follicular Phase</span>
                      <p className="text-xs text-muted-foreground dark:text-slate-300">From period start to ovulation</p>
                    </div>
                    <div className="text-lg font-bold dark:text-white">{cycleLength - lutealPhase} <span className="text-sm dark:text-slate-300">days</span></div>
                  </div>
                </div>
                
                <div className="p-3 bg-muted dark:bg-slate-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold dark:text-white">Luteal Phase</span>
                      <p className="text-xs text-muted-foreground dark:text-slate-300">From ovulation to next period</p>
                    </div>
                    <div className="text-lg font-bold dark:text-white">{lutealPhase} <span className="text-sm dark:text-slate-300">days</span></div>
                  </div>
                </div>
                
                <div className="p-3 bg-muted dark:bg-slate-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold dark:text-white">Total Cycle Length</span>
                    </div>
                    <div className="text-lg font-bold dark:text-white">{cycleLength} <span className="text-sm dark:text-slate-300">days</span></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground dark:text-slate-300">
              <p><strong className="dark:text-white">Note:</strong> This is an estimation based on averages. Ovulation can vary based on many factors including stress, illness, travel, and lifestyle changes. For the most accurate tracking, consider using ovulation prediction kits or basal body temperature charting.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
