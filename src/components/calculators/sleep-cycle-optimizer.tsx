import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addMinutes, format, parse } from "date-fns";
import { Input } from "@/components/ui/input";
import { MoonIcon, SunIcon } from "lucide-react";

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
      
      // Calculate 6 sleep cycles (90 minutes each)
      for (let i = 1; i <= 6; i++) {
        const cycleTime = addMinutes(baseTime, i * 90);
        cycles.push(cycleTime);
      }
    } else {
      // Calculate bed times based on wake-up time
      baseTime = parse(wakeUpTime, "HH:mm", new Date());
      
      // Calculate backwards 6 sleep cycles (90 minutes each) plus time to fall asleep
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
  
  const sleepCycles = calculateSleepCycles();
  const optimalTimes = sleepCycles.map(formatTime);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="dark:text-white">I want to calculate:</Label>
              <RadioGroup
                value={direction}
                onValueChange={(value) => setDirection(value as "bedtime" | "wakeup")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bedtime" id="bedtime" className="dark:border-slate-600 dark:bg-slate-800" />
                  <Label htmlFor="bedtime" className="flex items-center dark:text-slate-300">
                    <MoonIcon className="mr-2 h-4 w-4" /> When to wake up
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wakeup" id="wakeup" className="dark:border-slate-600 dark:bg-slate-800" />
                  <Label htmlFor="wakeup" className="flex items-center dark:text-slate-300">
                    <SunIcon className="mr-2 h-4 w-4" /> When to go to bed
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <Tabs value={direction} onValueChange={(v) => setDirection(v as "bedtime" | "wakeup")}>
              <TabsContent value="bedtime" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedtime-input" className="dark:text-white">I plan to go to bed at:</Label>
                    <Input
                      id="bedtime-input"
                      type="time"
                      value={bedTime}
                      onChange={(e) => setBedTime(e.target.value)}
                      className="dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fallasleep-input" className="dark:text-white">Minutes to fall asleep:</Label>
                    <Input
                      id="fallasleep-input"
                      type="number"
                      min="0"
                      max="60"
                      value={fallAsleepTime}
                      onChange={(e) => setFallAsleepTime(parseInt(e.target.value) || 15)}
                      className="dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="wakeup" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="wakeup-input" className="dark:text-white">I need to wake up at:</Label>
                    <Input
                      id="wakeup-input"
                      type="time"
                      value={wakeUpTime}
                      onChange={(e) => setWakeUpTime(e.target.value)}
                      className="dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fallasleep-input2" className="dark:text-white">Minutes to fall asleep:</Label>
                    <Input
                      id="fallasleep-input2"
                      type="number"
                      min="0"
                      max="60"
                      value={fallAsleepTime}
                      onChange={(e) => setFallAsleepTime(parseInt(e.target.value) || 15)}
                      className="dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {direction === "wakeup" && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-md text-sm dark:text-blue-200">
                <p>Selecting your wake-up time will calculate the best times to go to bed for optimal sleep cycles.</p>
              </div>
            )}
            
            {direction === "bedtime" && (
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 rounded-md text-sm dark:text-indigo-200">
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
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 rounded-lg">
              <h3 className="text-lg font-medium mb-3 dark:text-indigo-100">
                {direction === "bedtime" 
                  ? "If you go to bed at " + format(parse(bedTime, "HH:mm", new Date()), "h:mm a") + ", try waking up at one of these times:"
                  : "If you need to wake up at " + format(parse(wakeUpTime, "HH:mm", new Date()), "h:mm a") + ", try going to bed at one of these times:"}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {optimalTimes.map((time, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-lg text-center ${
                      i >= 3 ? 'bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-800' 
                      : i >= 1 ? 'bg-yellow-50 dark:bg-yellow-950 border border-yellow-100 dark:border-yellow-800' 
                      : 'bg-red-50 dark:bg-red-950 border border-red-100 dark:border-red-800'
                    }`}
                  >
                    <p className="text-xl font-semibold dark:text-white">{time}</p>
                    <p className="text-xs text-muted-foreground dark:text-slate-300">
                      {i + 1} {i === 0 ? 'cycle' : 'cycles'} ({(i + 1) * 1.5} hours)
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-medium dark:text-white">About Sleep Cycles</h3>
              <p className="text-sm dark:text-slate-300">
                Sleep cycles typically last around 90 minutes and consist of several stages:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-muted dark:bg-slate-800 rounded-lg">
                  <p className="font-semibold dark:text-white">Light Sleep (NREM 1 & 2)</p>
                  <p className="text-sm dark:text-slate-300">Your heartbeat and breathing slow down, and muscles begin relaxing.</p>
                </div>
                <div className="p-3 bg-muted dark:bg-slate-800 rounded-lg">
                  <p className="font-semibold dark:text-white">Deep Sleep (NREM 3)</p>
                  <p className="text-sm dark:text-slate-300">Essential for physical recovery and immune function.</p>
                </div>
                <div className="p-3 bg-muted dark:bg-slate-800 rounded-lg">
                  <p className="font-semibold dark:text-white">REM Sleep</p>
                  <p className="text-sm dark:text-slate-300">When most dreaming occurs, important for learning and memory.</p>
                </div>
              </div>
              
              <p className="text-sm mt-2 dark:text-slate-300">
                Waking up at the end of a complete sleep cycle (after REM stage) typically results in feeling more refreshed, even if you've had slightly less total sleep time. This calculator helps you align your sleep schedule with these natural cycles.
              </p>
            </div>
            
            <div className="text-sm text-muted-foreground dark:text-slate-300 mt-2">
              <p><strong className="dark:text-white">Note:</strong> This calculator is based on the average 90-minute sleep cycle. Individual sleep cycles can vary from 80-120 minutes. For best results, maintain a consistent sleep schedule and practice good sleep hygiene.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
