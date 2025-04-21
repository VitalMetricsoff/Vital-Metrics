import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addDays, format, getDate, isSameDay, subDays } from "date-fns";
import { CalendarIcon, InfoIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export function FertilityWindowCalculator() {
  const [periodDate, setPeriodDate] = useState<Date | undefined>(undefined);
  const [cycleLength, setCycleLength] = useState<number>(28);
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
    return [subDays(ovulationDate, 5), ovulationDate];
  };
  
  const getNextThreeCycles = (): { periodStart: Date, ovulation: Date, fertilityWindow: [Date, Date] }[] => {
    if (!periodDate) return [];
    
    const cycles = [];
    let currentPeriodStart = periodDate;
    
    for (let i = 0; i < 3; i++) {
      const nextOvulation = addDays(currentPeriodStart, cycleLength - 14);
      const nextFertilityWindow: [Date, Date] = [subDays(nextOvulation, 5), nextOvulation];
      
      cycles.push({
        periodStart: currentPeriodStart,
        ovulation: nextOvulation,
        fertilityWindow: nextFertilityWindow
      });
      
      currentPeriodStart = addDays(currentPeriodStart, cycleLength);
    }
    
    return cycles;
  };
  
  const formatDateRange = (range: [Date, Date] | null): string => {
    if (!range) return "";
    return `${format(range[0], 'MMM d, yyyy')} - ${format(range[1], 'MMM d, yyyy')}`;
  };
  
  const ovulationDate = calculateOvulationDate();
  const fertileWindow = calculateFertileWindow();
  const nextThreeCycles = getNextThreeCycles();
  
  // Color code for the calendar display
  const getDayStyle = (date: Date) => {
    if (!periodDate) return {};
    
    for (const cycle of nextThreeCycles) {
      // Period start
      if (isSameDay(date, cycle.periodStart)) {
        return { backgroundColor: '#FECDD3', color: '#881337', fontWeight: 'bold' };
      }
      
      // Ovulation day
      if (isSameDay(date, cycle.ovulation)) {
        return { backgroundColor: '#FEF3C7', color: '#92400E', fontWeight: 'bold' };
      }
      
      // Fertile window
      const startDate = cycle.fertilityWindow[0];
      const endDate = cycle.fertilityWindow[1];
      
      if (date >= startDate && date <= endDate) {
        return { backgroundColor: '#D1FAE5', color: '#065F46' };
      }
    }
    
    return {};
  };
  
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
            
            <Button className="w-full mt-4" onClick={handleCalculate} disabled={!periodDate}>
              Calculate Fertility Window
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {showResults && ovulationDate && (
        <CalculatorResult title="Fertility Window Results">
          <div className="space-y-4">
            <div className="p-6 bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium dark:text-green-100">Current Fertility Window</h3>
                <HoverCard>
                  <HoverCardTrigger>
                    <InfoIcon className="h-4 w-4 text-muted-foreground dark:text-green-300" />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 dark:bg-slate-800 dark:border-slate-700">
                    <p className="text-sm dark:text-slate-200">
                      The fertility window includes the 5 days before ovulation and the day of ovulation. 
                      Sperm can survive up to 5 days in a woman's body, while an egg lives for about 24 hours after release.
                    </p>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <p className="text-xl font-semibold dark:text-green-50">{formatDateRange(fertileWindow)}</p>
              <p className="text-sm text-muted-foreground dark:text-green-200 mt-2">
                These days have the highest chance of conception if you're trying to get pregnant.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-100 dark:border-yellow-800 rounded-lg text-center">
              <h3 className="text-lg font-medium dark:text-yellow-100">Estimated Ovulation Day</h3>
              <p className="text-2xl font-bold mt-1 dark:text-yellow-50">{format(ovulationDate, 'MMMM d, yyyy')}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium dark:text-white mb-4">Your Next 3 Cycles</h3>
              <div className="space-y-4">
                {nextThreeCycles.map((cycle, index) => (
                  <div key={index} className="p-4 bg-muted dark:bg-slate-800 rounded-lg">
                    <h4 className="font-medium text-center mb-2 dark:text-white">Cycle {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="p-2 bg-pink-50 dark:bg-pink-950 rounded border border-pink-100 dark:border-pink-800 text-center">
                        <p className="text-xs text-muted-foreground dark:text-pink-200">Period Start</p>
                        <p className="font-medium dark:text-pink-100">{format(cycle.periodStart, 'MMM d, yyyy')}</p>
                      </div>
                      <div className="p-2 bg-green-50 dark:bg-green-950 rounded border border-green-100 dark:border-green-800 text-center">
                        <p className="text-xs text-muted-foreground dark:text-green-200">Fertile Window</p>
                        <p className="font-medium dark:text-green-100">{format(cycle.fertilityWindow[0], 'MMM d')} - {format(cycle.fertilityWindow[1], 'MMM d')}</p>
                      </div>
                      <div className="p-2 bg-yellow-50 dark:bg-yellow-950 rounded border border-yellow-100 dark:border-yellow-800 text-center">
                        <p className="text-xs text-muted-foreground dark:text-yellow-200">Ovulation</p>
                        <p className="font-medium dark:text-yellow-100">{format(cycle.ovulation, 'MMM d, yyyy')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="mb-2 flex items-center space-x-2">
                <span className="inline-block w-3 h-3 bg-pink-200 dark:bg-pink-500 rounded-full"></span>
                <span className="text-sm dark:text-white">Period Start</span>
                <span className="inline-block w-3 h-3 bg-yellow-200 dark:bg-yellow-500 rounded-full ml-4"></span>
                <span className="text-sm dark:text-white">Ovulation</span>
                <span className="inline-block w-3 h-3 bg-green-200 dark:bg-green-500 rounded-full ml-4"></span>
                <span className="text-sm dark:text-white">Fertile Window</span>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground dark:text-slate-300 mt-4">
              <p><strong className="dark:text-white">Note:</strong> This calculator provides estimates based on averages and the information you provided. Many factors can affect ovulation timing, including stress, illness, and hormonal fluctuations. For higher accuracy, consider additional tracking methods like basal body temperature or ovulation prediction kits.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
