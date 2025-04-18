
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FootprintsIcon } from "lucide-react";

export function StepToCalorieConverter() {
  const [steps, setSteps] = useState<number>(10000);
  const [weight, setWeight] = useState<number>(70);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState<number>(170);
  const [walkingIntensity, setWalkingIntensity] = useState<"light" | "moderate" | "brisk">("moderate");
  const [showResults, setShowResults] = useState(false);
  const [calories, setCalories] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  
  // Average step length based on height (cm)
  const getStrideLength = (): number => {
    if (gender === "male") {
      return height * 0.415; // 41.5% of height for males
    } else {
      return height * 0.413; // 41.3% of height for females
    }
  };
  
  const calculateCalories = () => {
    // Calculate stride length in cm
    const strideLength = getStrideLength();
    
    // Calculate distance in kilometers
    const distanceInCm = steps * strideLength;
    const distanceInKm = distanceInCm / 100000; // Convert cm to km
    
    // Set MET value based on walking intensity
    let metValue = 3.0; // Default for light walking
    
    switch (walkingIntensity) {
      case "light":
        metValue = 3.0; // Light walking (2.5 mph)
        break;
      case "moderate":
        metValue = 4.3; // Moderate walking (3.5 mph)
        break;
      case "brisk":
        metValue = 5.0; // Brisk walking (4.0 mph)
        break;
    }
    
    // Calculate time spent walking in hours (assuming average walking speed based on intensity)
    let speedInKmPerHour = 0;
    switch (walkingIntensity) {
      case "light":
        speedInKmPerHour = 4.0; // 2.5 mph ≈ 4.0 km/h
        break;
      case "moderate":
        speedInKmPerHour = 5.6; // 3.5 mph ≈ 5.6 km/h
        break;
      case "brisk":
        speedInKmPerHour = 6.4; // 4.0 mph ≈ 6.4 km/h
        break;
    }
    
    const timeInHours = distanceInKm / speedInKmPerHour;
    
    // Calculate calories burned using the MET formula
    // Calories = MET * weight in kg * time in hours
    let caloriesBurned = metValue * weight * timeInHours;
    
    // Apply gender adjustment
    if (gender === "female") {
      caloriesBurned = caloriesBurned * 0.9; // Women generally burn ~10% fewer calories
    }
    
    // Round to the nearest whole number
    caloriesBurned = Math.round(caloriesBurned);
    
    setCalories(caloriesBurned);
    setDistance(Math.round(distanceInKm * 100) / 100); // Round to 2 decimal places
    setShowResults(true);
  };

  const resetCalculator = () => {
    setShowResults(false);
    setCalories(0);
    setDistance(0);
  };
  
  const getWalkingIntensityLabel = (intensity: string): string => {
    switch (intensity) {
      case "light": return "Light (2.5 mph / 4.0 km/h)";
      case "moderate": return "Moderate (3.5 mph / 5.6 km/h)";
      case "brisk": return "Brisk (4.0 mph / 6.4 km/h)";
      default: return "";
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="info">Information</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator" className="space-y-6 pt-4">
              <div className="space-y-4">
                <CalculatorNumberInput
                  label="Steps"
                  value={steps}
                  onChange={setSteps}
                  min={100}
                  max={100000}
                  step={100}
                  required
                />
                
                <div className="grid gap-4 md:grid-cols-2">
                  <CalculatorNumberInput
                    label="Weight"
                    value={weight}
                    onChange={setWeight}
                    min={30}
                    max={250}
                    unit="kg"
                    required
                  />
                  
                  <CalculatorNumberInput
                    label="Height"
                    value={height}
                    onChange={setHeight}
                    min={120}
                    max={220}
                    unit="cm"
                    required
                    description="Used to estimate stride length"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup 
                    defaultValue="male" 
                    value={gender}
                    onValueChange={(value) => setGender(value as "male" | "female")}
                    className="flex space-x-4"
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
                  <Label>Walking Intensity</Label>
                  <RadioGroup 
                    defaultValue="moderate" 
                    value={walkingIntensity}
                    onValueChange={(value) => setWalkingIntensity(value as "light" | "moderate" | "brisk")}
                    className="grid gap-2"
                  >
                    <div className="flex items-center space-x-2 border rounded-lg p-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">Light (2.5 mph / 4.0 km/h)</Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate">Moderate (3.5 mph / 5.6 km/h)</Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-2">
                      <RadioGroupItem value="brisk" id="brisk" />
                      <Label htmlFor="brisk">Brisk (4.0 mph / 6.4 km/h)</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={resetCalculator}
                    disabled={!showResults}
                  >
                    Reset
                  </Button>
                  <Button onClick={calculateCalories}>Calculate</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="info" className="space-y-4">
              <h3 className="text-lg font-semibold">About Step to Calorie Conversion</h3>
              <p>This calculator estimates the number of calories burned based on your step count, physical characteristics, and walking intensity.</p>
              
              <h4 className="font-medium mt-4">How It Works</h4>
              <p>The calculator follows these steps:</p>
              <ol className="list-decimal pl-5 space-y-1 text-sm mt-2">
                <li>Estimates your stride length based on your height and gender</li>
                <li>Calculates the total distance walked using your step count</li>
                <li>Determines the approximate time spent walking based on walking intensity</li>
                <li>Applies MET values based on walking intensity to calculate calorie expenditure</li>
              </ol>
              
              <div className="bg-muted p-3 rounded-md mt-4">
                <h4 className="font-medium">Stride Length Estimation</h4>
                <p className="text-sm">For men: approximately 41.5% of height</p>
                <p className="text-sm">For women: approximately 41.3% of height</p>
              </div>
              
              <div className="bg-muted p-3 rounded-md mt-4">
                <h4 className="font-medium">Common Step Goals</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>5,000 steps:</strong> Low active lifestyle</li>
                  <li><strong>7,500 steps:</strong> Somewhat active lifestyle</li>
                  <li><strong>10,000 steps:</strong> Active lifestyle</li>
                  <li><strong>12,500+ steps:</strong> Highly active lifestyle</li>
                </ul>
              </div>
              
              <p className="text-sm mt-4">Note: This is an estimation. Actual calories burned will vary based on individual factors such as fitness level, body composition, age, terrain, and walking efficiency.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showResults && (
        <CalculatorResult 
          title="Step to Calorie Conversion Results" 
          description={`${steps.toLocaleString()} steps at ${getWalkingIntensityLabel(walkingIntensity)} intensity`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <div className="bg-muted rounded-full p-4">
                <FootprintsIcon className="h-10 w-10 text-blue-500" />
              </div>
            </div>
            
            <div className="text-center space-y-6">
              <div>
                <p className="text-4xl font-bold">{calories} calories</p>
                <p className="text-lg text-muted-foreground">Estimated calories burned</p>
              </div>
              
              <div>
                <p className="text-2xl font-semibold">{distance} km</p>
                <p className="text-lg text-muted-foreground">Approximate distance</p>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-md text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-muted-foreground">Stride Length:</p>
                  <p className="font-medium">{Math.round(getStrideLength())} cm</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Walking Intensity:</p>
                  <p className="font-medium">{getWalkingIntensityLabel(walkingIntensity)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Steps per km:</p>
                  <p className="font-medium">{Math.round(100000 / getStrideLength())}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Gender & Weight:</p>
                  <p className="font-medium">{gender === "male" ? "Male" : "Female"}, {weight} kg</p>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-xs text-muted-foreground">Note: These calculations provide an estimate. Actual values may vary based on individual walking patterns, terrain, and fitness levels.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
