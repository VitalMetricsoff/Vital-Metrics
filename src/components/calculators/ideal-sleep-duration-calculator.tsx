
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
        <CalculatorResult title="Your Ideal Sleep Duration">
          <div className="space-y-4">
            <div className="flex justify-center items-center mb-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {idealDuration} hours
                </div>
                <p className="text-muted-foreground">
                  Recommended range: {recommendedDuration.min} - {recommendedDuration.max} hours
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-md flex">
                <MoonStar className="h-10 w-10 text-blue-400 dark:text-blue-300 mr-4" />
                <div>
                  <h4 className="font-medium">Bedtime</h4>
                  <p className="text-xl font-semibold">{bedtime}</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md flex">
                <Sun className="h-10 w-10 text-yellow-500 dark:text-yellow-400 mr-4" />
                <div>
                  <h4 className="font-medium">Wake Time</h4>
                  <p className="text-xl font-semibold">{wakeupTime}</p>
                </div>
              </div>
            </div>
            
            <ResultAlert 
              type="info" 
              title="Sleep Cycles"
            >
              <p>
                A complete sleep cycle lasts about 90 minutes. For optimal rest, try to sleep for a multiple of 90 minutes (e.g., 7.5 hours = 5 cycles).
              </p>
              <p className="mt-2">
                Based on your ideal duration of {idealDuration} hours, you would complete approximately {Math.round(idealDuration / 1.5)} full sleep cycles.
              </p>
            </ResultAlert>
            
            <div className="mt-4 bg-muted p-4 rounded-md">
              <div className="flex items-start">
                <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Age-Based Sleep Recommendations:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Newborns (0-3 months): 14-17 hours</li>
                    <li>Infants (4-12 months): 12-16 hours</li>
                    <li>Toddlers (1-2 years): 11-14 hours</li>
                    <li>Preschoolers (3-5 years): 10-13 hours</li>
                    <li>School-age children (6-12 years): 9-12 hours</li>
                    <li>Teenagers (13-17 years): 8-10 hours</li>
                    <li>Adults (18-64 years): 7-9 hours</li>
                    <li>Older adults (65+ years): 7-8 hours</li>
                  </ul>
                  <p className="mt-2">Remember that individual needs may vary. Pay attention to how you feel after different amounts of sleep.</p>
                </div>
              </div>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
