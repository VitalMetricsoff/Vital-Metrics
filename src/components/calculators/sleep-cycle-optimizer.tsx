
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addMinutes, format, parse, set } from "date-fns";
import { Input } from "@/components/ui/input";
import { CalendarIcon, MoonIcon, SunIcon } from "lucide-react";

export function SleepCycleOptimizer() {
  const [direction, setDirection] = useState<"bedtime" | "wakeup">("bedtime");
  const [bedTime, setBedTime] = useState<string>("22:30");
  const [wakeUpTime, setWakeUpTime] = useState<string>("07:00");
  const [fallAsleepTime, setFallAsleepTime] = useState<number>(15);
  const [showResults, setShowResults] = useState(false);
  
  const handleCalculate = () => {
    setShowResults(true);
  };
  
  const calculateSleepCycles = () => {
    let baseTime: Date;
    const cycles: Date[] = [];
    
    if (direction === "bedtime") {
      // Calculate wake-up times based on bed time
      baseTime = parse(bedTime, "HH:mm", new Date());
      baseTime = addMinutes(baseTime, fallAsleepTime); // Add time to fall asleep
      
      // Calculate 5 sleep cycles (90 minutes each)
      for (let i = 1; i <= 6; i++) {
        const cycleTime = addMinutes(baseTime, i * 90);
        cycles.push(cycleTime);
      }
    } else {
      // Calculate bed times based on wake-up time
      baseTime = parse(wakeUpTime, "HH:mm", new Date());
      
      // Calculate backwards 5 sleep cycles (90 minutes each) plus time to fall asleep
      for (let i = 1; i <= 6; i++) {
        const cycleTime = addMinutes(baseTime, -(i * 90 + fallAsleepTime));
        cycles.push(cycleTime);
      }
      
      // Reverse array so earliest time comes first
      cycles.reverse();
    }
    
    return cycles;
  };
  
  const formatTime = (date: Date): string => {
    return format(date, "h:mm a");
  };
  
  const calculateSleepDuration = (start: string, end: string): string => {
    const startTime = parse(start, "HH:mm", new Date());
    let endTime = parse(end, "HH:mm", new Date());
    
    // Adjust end time if it's earlier than start time (next day)
    if (endTime < startTime) {
      endTime = set(addMinutes(endTime, 24 * 60), { date: 2 }); // Add a day
    }
    
    const diffMinutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    return `${hours} hours ${minutes > 0 ? `${minutes} minutes` : ''}`;
  };
  
  const sleepCycles = calculateSleepCycles();
  
  // Calculate optimal wake times or bed times
  const optimalTimes = sleepCycles.map(formatTime);
  
  // Calculate total sleep duration
  let totalSleepDuration = "N/A";
  if (direction === "bedtime") {
    totalSleepDuration = calculateSleepDuration(bedTime, wakeUpTime);
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>I want to calculate:</Label>
              <RadioGroup
                value={direction}
                onValueChange={(value) => setDirection(value as "bedtime" | "wakeup")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bedtime" id="bedtime" />
                  <Label htmlFor="bedtime" className="flex items-center">
                    <MoonIcon className="mr-2 h-4 w-4" /> When to wake up
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wakeup" id="wakeup" />
                  <Label htmlFor="wakeup" className="flex items-center">
                    <SunIcon className="mr-2 h-4 w-4" /> When to go to bed
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <Tabs value={direction} onValueChange={(v) => setDirection(v as "bedtime" | "wakeup")}>
              <TabsContent value="bedtime" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedtime-input">I plan to go to bed at:</Label>
                    <Input
                      id="bedtime-input"
                      type="time"
                      value={bedTime}
                      onChange={(e) => setBedTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fallasleep-input">Minutes to fall asleep:</Label>
                    <Input
                      id="fallasleep-input"
                      type="number"
                      min="0"
                      max="60"
                      value={fallAsleepTime}
                      onChange={(e) => setFallAsleepTime(parseInt(e.target.value) || 15)}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="wakeup" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="wakeup-input">I need to wake up at:</Label>
                    <Input
                      id="wakeup-input"
                      type="time"
                      value={wakeUpTime}
                      onChange={(e) => setWakeUpTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fallasleep-input2">Minutes to fall asleep:</Label>
                    <Input
                      id="fallasleep-input2"
                      type="number"
                      min="0"
                      max="60"
                      value={fallAsleepTime}
                      onChange={(e) => setFallAsleepTime(parseInt(e.target.value) || 15)}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {direction === "wakeup" && (
              <div className="p-3 bg-blue-50 rounded-md text-sm">
                <p>Selecting your wake-up time will calculate the best times to go to bed for optimal sleep cycles.</p>
              </div>
            )}
            
            {direction === "bedtime" && (
              <div className="p-3 bg-indigo-50 rounded-md text-sm">
                <p>Selecting your bedtime will calculate the best times to wake up for optimal sleep cycles.</p>
              </div>
            )}
            
            <Button className="w-full mt-4" onClick={handleCalculate}>
              Calculate Sleep Cycles
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {showResults && (
        <CalculatorResult title={direction === "bedtime" ? "Optimal Wake-up Times" : "Optimal Bedtimes"}>
          <div className="space-y-6">
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
              <h3 className="text-lg font-medium mb-3">
                {direction === "bedtime" 
                  ? "If you go to bed at " + format(parse(bedTime, "HH:mm", new Date()), "h:mm a") + ", try waking up at one of these times:"
                  : "If you need to wake up at " + format(parse(wakeUpTime, "HH:mm", new Date()), "h:mm a") + ", try going to bed at one of these times:"}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {optimalTimes.map((time, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-lg text-center ${i >= 3 ? 'bg-green-100' : i >= 1 ? 'bg-yellow-100' : 'bg-red-100'}`}
                  >
                    <p className="text-xl font-semibold">{time}</p>
                    <p className="text-xs text-muted-foreground">
                      {i + 1} {i === 0 ? 'cycle' : 'cycles'} ({(i + 1) * 1.5} hours)
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {direction === "bedtime" && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">Current Sleep Schedule</span>
                    <p className="font-medium">
                      {format(parse(bedTime, "HH:mm", new Date()), "h:mm a")} - {format(parse(wakeUpTime, "HH:mm", new Date()), "h:mm a")}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">Total Duration</span>
                    <p className="font-medium">{totalSleepDuration}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <h3 className="text-lg font-medium">About Sleep Cycles</h3>
              <p className="text-sm">
                Sleep cycles typically last around 90 minutes and consist of several stages:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-semibold">Light Sleep (NREM 1 & 2)</p>
                  <p className="text-sm">Your heartbeat and breathing slow down, and muscles begin relaxing.</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-semibold">Deep Sleep (NREM 3)</p>
                  <p className="text-sm">Essential for physical recovery and immune function.</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-semibold">REM Sleep</p>
                  <p className="text-sm">When most dreaming occurs, important for learning and memory.</p>
                </div>
              </div>
              
              <p className="text-sm mt-2">
                Waking up at the end of a complete sleep cycle (after REM stage) typically results in feeling more refreshed, even if you've had slightly less total sleep time. This calculator helps you align your sleep schedule with these natural cycles.
              </p>
            </div>
            
            <div className="text-sm text-muted-foreground mt-2">
              <p><strong>Note:</strong> This calculator is based on the average 90-minute sleep cycle. Individual sleep cycles can vary from 80-120 minutes. For best results, maintain a consistent sleep schedule and practice good sleep hygiene.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
