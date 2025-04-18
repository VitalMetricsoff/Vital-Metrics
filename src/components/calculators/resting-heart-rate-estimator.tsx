
import { useState } from "react";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { HeartPulse, Activity, Info } from "lucide-react";

type Gender = "male" | "female";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "athlete";

export function RestingHeartRateEstimator() {
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<Gender>("male");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [result, setResult] = useState<number | null>(null);
  const [trendType, setTrendType] = useState<"rhr" | "hrr" | null>(null);
  const [heartRateReserve, setHeartRateReserve] = useState<number | null>(null);
  
  const calculateRestingHeartRate = () => {
    // Base resting heart rate by age
    const baseRHRByAge = () => {
      if (age < 20) return 73;
      if (age < 30) return 70;
      if (age < 40) return 72;
      if (age < 50) return 74;
      if (age < 60) return 76;
      if (age < 70) return 78;
      return 80;
    };
    
    // Activity level modifiers
    const activityModifiers = {
      sedentary: 0,
      light: -5,
      moderate: -9,
      active: -12,
      athlete: -17
    };
    
    // Gender adjustments
    const genderAdjustment = gender === "female" ? 4 : 0;
    
    // Calculate estimated RHR
    let calculatedRHR = baseRHRByAge() + activityModifiers[activityLevel] + genderAdjustment;
    
    // Ensure result is within reasonable bounds
    calculatedRHR = Math.max(40, Math.min(100, calculatedRHR));
    
    setResult(Math.round(calculatedRHR));
    
    // Calculate Heart Rate Reserve (HRR)
    const maxHeartRate = 220 - age;
    setHeartRateReserve(maxHeartRate - calculatedRHR);
    
    // Determine if RHR is excellent, good, average, or poor
    if (calculatedRHR < 60) {
      setTrendType("rhr");
    } else if (heartRateReserve && heartRateReserve > 150) {
      setTrendType("hrr");
    } else {
      setTrendType(null);
    }
  };
  
  const getHeartRateCategory = (rate: number) => {
    if (gender === "male") {
      if (age < 20) {
        if (rate < 60) return "Excellent";
        if (rate < 70) return "Good";
        if (rate < 80) return "Average";
        return "Above Average";
      } else if (age < 30) {
        if (rate < 61) return "Excellent";
        if (rate < 71) return "Good";
        if (rate < 81) return "Average";
        return "Above Average";
      } else if (age < 40) {
        if (rate < 63) return "Excellent";
        if (rate < 73) return "Good";
        if (rate < 83) return "Average";
        return "Above Average";
      } else if (age < 50) {
        if (rate < 65) return "Excellent";
        if (rate < 75) return "Good";
        if (rate < 85) return "Average";
        return "Above Average";
      } else {
        if (rate < 67) return "Excellent";
        if (rate < 77) return "Good";
        if (rate < 87) return "Average";
        return "Above Average";
      }
    } else { // female
      if (age < 20) {
        if (rate < 65) return "Excellent";
        if (rate < 75) return "Good";
        if (rate < 85) return "Average";
        return "Above Average";
      } else if (age < 30) {
        if (rate < 66) return "Excellent";
        if (rate < 76) return "Good";
        if (rate < 86) return "Average";
        return "Above Average";
      } else if (age < 40) {
        if (rate < 67) return "Excellent";
        if (rate < 77) return "Good";
        if (rate < 87) return "Average";
        return "Above Average";
      } else if (age < 50) {
        if (rate < 69) return "Excellent";
        if (rate < 79) return "Good";
        if (rate < 89) return "Average";
        return "Above Average";
      } else {
        if (rate < 70) return "Excellent";
        if (rate < 80) return "Good";
        if (rate < 90) return "Average";
        return "Above Average";
      }
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
              min={10}
              max={100}
              step={1}
              required
            />
            
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                value={gender}
                onValueChange={(value) => setGender(value as Gender)}
                className="flex flex-col sm:flex-row sm:space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <RadioGroup
                value={activityLevel}
                onValueChange={(value) => setActivityLevel(value as ActivityLevel)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sedentary" id="sedentary" />
                  <Label htmlFor="sedentary">Sedentary (little to no exercise)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">Light (light exercise 1-3 days/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate">Moderate (moderate exercise 3-5 days/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active">Active (hard exercise 6-7 days/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="athlete" id="athlete" />
                  <Label htmlFor="athlete">Athlete (professional/twice daily training)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button onClick={calculateRestingHeartRate} className="w-full">
              Estimate Resting Heart Rate
            </Button>
          </div>
        </CardContent>
      </Card>

      {result !== null && (
        <CalculatorResult title="Estimated Resting Heart Rate">
          <div className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="text-center">
                <div className="relative inline-block">
                  <HeartPulse className="h-20 w-20 text-red-500 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{result}</span>
                  </div>
                </div>
                <p className="font-medium text-lg mt-2">{result} BPM</p>
                <p className="text-sm text-muted-foreground">
                  {getHeartRateCategory(result)}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-medium">Max Heart Rate</h4>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xl font-bold">{220 - age} BPM</p>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-medium">Heart Rate Reserve</h4>
                  <HeartPulse className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xl font-bold">{heartRateReserve} BPM</p>
              </div>
            </div>
            
            <ResultAlert 
              type={result < 60 ? "success" : result > 90 ? "warning" : "info"}
              title={
                result < 60 
                  ? "Excellent Resting Heart Rate" 
                  : result > 90 
                    ? "Elevated Resting Heart Rate" 
                    : "Normal Resting Heart Rate"
              }
            >
              {result < 60 ? (
                <p>Your estimated resting heart rate is excellent! A lower resting heart rate is typically associated with better cardiovascular fitness and overall health.</p>
              ) : result > 90 ? (
                <p>Your estimated resting heart rate is elevated. This may be due to various factors including stress, dehydration, or caffeine consumption. Consider discussing with a healthcare provider if consistently elevated.</p>
              ) : (
                <p>Your estimated resting heart rate falls within the normal range. Regular exercise and healthy lifestyle habits can help lower your resting heart rate over time.</p>
              )}
            </ResultAlert>
            
            <div className="mt-4 bg-muted p-4 rounded-md">
              <div className="flex items-start">
                <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div className="space-y-2 text-sm">
                  <p className="font-medium">How to measure your actual resting heart rate:</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Measure in the morning before getting out of bed</li>
                    <li>Find your pulse at your wrist or neck</li>
                    <li>Count beats for 30 seconds and multiply by 2</li>
                    <li>Track over several days for a more accurate average</li>
                  </ol>
                  <p className="mt-2">Normal adult resting heart rates typically range from 60-100 BPM. Athletes and very fit individuals often have rates in the 40-60 BPM range.</p>
                </div>
              </div>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
