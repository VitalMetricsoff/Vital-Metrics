import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { MoonStar, Sun, Info, Clock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { format, addHours, addMinutes } from "date-fns";

type ActivityLevel = "low" | "moderate" | "high";
type SleepQuality = "poor" | "fair" | "good";

export function IdealSleepDurationCalculator() {
  const [age, setAge] = useState<number>(30);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [sleepQuality, setSleepQuality] = useState<SleepQuality>("fair");
  const [stressLevel, setStressLevel] = useState<number>(5);
  const [bedtime, setBedtime] = useState<string>("22:30");
  const [idealDuration, setIdealDuration] = useState<number | null>(null);
  const [recommendedDuration, setRecommendedDuration] = useState<{min: number, max: number} | null>(null);
  const [wakeupTime, setWakeupTime] = useState<string | null>(null);
  
  const calculateIdealSleep = () => {
    // Base sleep duration by age
    let baseDuration: number;
    if (age <= 1) {
      baseDuration = 14;
    } else if (age <= 2) {
      baseDuration = 13;
    } else if (age <= 5) {
      baseDuration = 11.5;
    } else if (age <= 12) {
      baseDuration = 10;
    } else if (age <= 17) {
      baseDuration = 9;
    } else if (age <= 64) {
      baseDuration = 8;
    } else {
      baseDuration = 7.5;
    }
    
    // Sleep quality adjustment
    const qualityAdjustment = sleepQuality === "poor" ? 1 : sleepQuality === "fair" ? 0.5 : 0;
    
    // Activity level adjustment
    const activityAdjustment = activityLevel === "low" ? 0 : activityLevel === "moderate" ? 0.5 : 1;
    
    // Stress adjustment (0.1 hour per stress unit above 5)
    const stressAdjustment = stressLevel > 5 ? (stressLevel - 5) * 0.1 : 0;
    
    // Calculate ideal sleep duration
    const calculatedDuration = baseDuration + qualityAdjustment + activityAdjustment + stressAdjustment;
    
    setIdealDuration(parseFloat(calculatedDuration.toFixed(1)));
    
    // Set recommended range (±1 hour for adults, ±0.5 for children)
    const range = age >= 18 ? 1 : 0.5;
    setRecommendedDuration({
      min: parseFloat((calculatedDuration - range).toFixed(1)),
      max: parseFloat((calculatedDuration + range).toFixed(1))
    });
    
    // Calculate wake-up time based on bedtime and ideal duration
    if (bedtime) {
      const [hours, minutes] = bedtime.split(":").map(Number);
      const bedDateTime = new Date();
      bedDateTime.setHours(hours, minutes, 0, 0);
      
      const durationHours = Math.floor(calculatedDuration);
      const durationMinutes = Math.round((calculatedDuration - durationHours) * 60);
      
      const wakeTime = addMinutes(addHours(bedDateTime, durationHours), durationMinutes);
      setWakeupTime(format(wakeTime, "HH:mm"));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <CalculatorNumberInput
              label="Age"
              value={age}
              onChange={setAge}
              min={0}
              max={120}
              step={1}
              required
            />
            
            <div className="space-y-2">
              <Label>Physical Activity Level</Label>
              <RadioGroup
                value={activityLevel}
                onValueChange={(value) => setActivityLevel(value as ActivityLevel)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low-activity" />
                  <Label htmlFor="low-activity">Low (mostly sedentary)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate-activity" />
                  <Label htmlFor="moderate-activity">Moderate (regular activity)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high-activity" />
                  <Label htmlFor="high-activity">High (intense daily exercise)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Current Sleep Quality</Label>
              <RadioGroup
                value={sleepQuality}
                onValueChange={(value) => setSleepQuality(value as SleepQuality)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="poor" id="poor-sleep" />
                  <Label htmlFor="poor-sleep">Poor (frequently interrupted, not refreshing)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fair" id="fair-sleep" />
                  <Label htmlFor="fair-sleep">Fair (sometimes interrupted, mostly refreshing)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="good-sleep" />
                  <Label htmlFor="good-sleep">Good (rarely interrupted, fully refreshing)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Stress Level (1-10)</Label>
                <span className="text-sm font-medium">{stressLevel}</span>
              </div>
              <Slider 
                defaultValue={[5]} 
                max={10} 
                min={1} 
                step={1} 
                onValueChange={(value) => setStressLevel(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low Stress</span>
                <span>High Stress</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bedtime">Typical Bedtime</Label>
              <input 
                type="time" 
                id="bedtime"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            
            <Button onClick={calculateIdealSleep} className="w-full">
              Calculate Ideal Sleep Duration
            </Button>
          </div>
        </CardContent>
      </Card>

      {idealDuration !== null && recommendedDuration && (
        <CalculatorResult title="Sleep Duration Analysis">
          <div className="space-y-6">
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-medium dark:text-slate-200">Recommended Sleep Duration</h3>
              <p className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">
                {Math.floor(recommendedDuration.min)} - {Math.ceil(recommendedDuration.max)} hours
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">per night</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100">Ideal Bedtime</p>
                <p className="text-2xl font-bold text-indigo-950 dark:text-indigo-50">
                  {format(new Date(0, 0, 0, ...bedtime.split(':').map(Number)), 'hh:mm a')}
                </p>
                <p className="text-sm text-indigo-700 dark:text-indigo-300">
                  For your target wake time
                </p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-lg">
                <p className="text-sm font-medium text-purple-900 dark:text-purple-100">Sleep Cycles</p>
                <p className="text-2xl font-bold text-purple-950 dark:text-purple-50">
                  {Math.floor(recommendedDuration.min * 60 / 90)} - {Math.ceil(recommendedDuration.max * 60 / 90)}
                </p>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Complete 90-minute cycles
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-slate-900 dark:text-slate-100">Sleep Schedule Options</h3>
              <div className="grid gap-3">
                {Array.from({ length: 5 }, (_, index) => {
                  const duration = recommendedDuration.min + index * 0.5;
                  const wakeTime = addMinutes(new Date(0, 0, 0, ...bedtime.split(':').map(Number)), Math.round(duration * 60));
                  return (
                    <div 
                      key={index}
                      className="p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                            Option {index + 1}
                          </p>
                          <p className="text-2xl font-bold text-blue-950 dark:text-blue-50">
                            {format(new Date(0, 0, 0, ...bedtime.split(':').map(Number)), 'hh:mm a')} - {format(wakeTime, 'hh:mm a')}
                          </p>
                        </div>
                        <div className="text-sm text-blue-700 dark:text-blue-300">
                          {Math.round(duration * 60 / 90)} cycles
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-300">
              <p>Note: These recommendations are based on your age, activity level, and sleep quality factors. Individual sleep needs may vary.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
