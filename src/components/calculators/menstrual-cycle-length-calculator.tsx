
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format, addDays, differenceInDays } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

interface CycleData {
  startDate: Date;
  endDate: Date;
  duration: number;
}

export function MenstrualCycleLengthCalculator() {
  const [cycles, setCycles] = useState<CycleData[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState<string>("");
  const [averageCycleLength, setAverageCycleLength] = useState<number | null>(null);
  const [nextPeriodDate, setNextPeriodDate] = useState<Date | null>(null);
  
  const handleAddCycle = () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates");
      return;
    }

    if (endDate < startDate) {
      setError("End date cannot be earlier than start date");
      return;
    }

    const duration = differenceInDays(endDate, startDate) + 1;
    
    const newCycle: CycleData = {
      startDate,
      endDate,
      duration
    };

    const updatedCycles = [...cycles, newCycle];
    setCycles(updatedCycles);
    calculateAverageCycle(updatedCycles);
    
    // Reset form
    setStartDate(undefined);
    setEndDate(undefined);
    setError("");
  };

  const calculateAverageCycle = (cycleData: CycleData[]) => {
    if (cycleData.length < 2) {
      return;  // Need at least 2 cycles to calculate average length
    }

    // Sort cycles by start date
    const sortedCycles = [...cycleData].sort((a, b) => 
      a.startDate.getTime() - b.startDate.getTime()
    );

    // Calculate cycle lengths (from start of one period to start of next)
    const cycleLengths: number[] = [];
    for (let i = 0; i < sortedCycles.length - 1; i++) {
      const currentCycleStart = sortedCycles[i].startDate;
      const nextCycleStart = sortedCycles[i + 1].startDate;
      const cycleLength = differenceInDays(nextCycleStart, currentCycleStart);
      cycleLengths.push(cycleLength);
    }

    // Calculate average
    const totalDays = cycleLengths.reduce((sum, length) => sum + length, 0);
    const avgLength = Math.round(totalDays / cycleLengths.length);
    
    setAverageCycleLength(avgLength);
    
    // Predict next period
    if (sortedCycles.length > 0) {
      const lastPeriodStart = sortedCycles[sortedCycles.length - 1].startDate;
      setNextPeriodDate(addDays(lastPeriodStart, avgLength));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground mb-4">
            Track at least 3 menstrual cycles to calculate your average cycle length.
          </p>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="start-date">Period Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="start-date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end-date">Period End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="end-date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => startDate ? date < startDate : false}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
          
          <Button onClick={handleAddCycle} className="w-full mt-4">
            Add Cycle
          </Button>

          {cycles.length > 0 && (
            <div className="mt-6 border rounded-md overflow-hidden">
              <div className="bg-muted px-4 py-2 font-medium text-sm">
                Recorded Cycles ({cycles.length})
              </div>
              <div className="p-1">
                {cycles.map((cycle, index) => (
                  <div key={index} className="flex justify-between p-2 text-sm even:bg-muted/50">
                    <div>
                      {format(cycle.startDate, "MMM d, yyyy")} to {format(cycle.endDate, "MMM d, yyyy")}
                    </div>
                    <div className="font-medium">
                      {cycle.duration} days
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {averageCycleLength && nextPeriodDate && (
        <CalculatorResult title="Your Menstrual Cycle Analysis">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-md text-center">
                <p className="text-sm text-muted-foreground">Average Cycle Length</p>
                <p className="text-2xl font-bold text-primary">{averageCycleLength} days</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-md text-center">
                <p className="text-sm text-muted-foreground">Next Period (Estimated)</p>
                <p className="text-xl font-bold text-primary">{format(nextPeriodDate, "MMM d, yyyy")}</p>
              </div>
            </div>
            
            <ResultAlert type="info" title="About Your Cycle Length">
              {averageCycleLength >= 21 && averageCycleLength <= 35 ? (
                <p>Your average cycle length of {averageCycleLength} days falls within the normal range (21-35 days).</p>
              ) : averageCycleLength < 21 ? (
                <p>Your average cycle length of {averageCycleLength} days is shorter than the typical range. Consistently short cycles may be worth discussing with a healthcare provider.</p>
              ) : (
                <p>Your average cycle length of {averageCycleLength} days is longer than the typical range. Consistently long cycles may be worth discussing with a healthcare provider.</p>
              )}
            </ResultAlert>
            
            <div className="mt-4 bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">Understanding Your Cycle:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>The menstrual cycle is counted from the first day of one period to the first day of the next</li>
                <li>A typical cycle ranges from 21-35 days, with 28 days being the average</li>
                <li>Period duration typically ranges from 3-7 days</li>
                <li>Tracking at least 3 consecutive cycles provides more accurate predictions</li>
                <li>Cycle length can vary due to stress, weight changes, exercise, illness, or other factors</li>
              </ul>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
