
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Droplets, Thermometer, Wind, AlertTriangle } from "lucide-react";

type ExerciseIntensity = "light" | "moderate" | "vigorous" | "extreme";
type WeatherCondition = "cool" | "moderate" | "hot" | "very-hot";
type HumidityLevel = "low" | "moderate" | "high" | "very-high";

export function HydrationDepletionEstimator() {
  const [weight, setWeight] = useState<number>(70);
  const [weightUnit, setWeightUnit] = useState<string>("kg");
  const [exerciseDuration, setExerciseDuration] = useState<number>(60);
  const [intensity, setIntensity] = useState<ExerciseIntensity>("moderate");
  const [weather, setWeather] = useState<WeatherCondition>("moderate");
  const [humidity, setHumidity] = useState<HumidityLevel>("moderate");
  const [acclimatization, setAcclimatization] = useState<number>(5);
  
  const [waterLoss, setWaterLoss] = useState<number | null>(null);
  const [hydrationRecommendation, setHydrationRecommendation] = useState<number | null>(null);
  const [dehydrationRisk, setDehydrationRisk] = useState<string | null>(null);
  
  const calculateHydrationLoss = () => {
    // Base sweat rate per hour based on exercise intensity (ml/kg/hr)
    const intensityRates = {
      light: 5,
      moderate: 10,
      vigorous: 15,
      extreme: 20
    };
    
    // Weather condition multipliers
    const weatherMultipliers = {
      cool: 0.7,
      moderate: 1.0,
      hot: 1.3,
      "very-hot": 1.6
    };
    
    // Humidity multipliers
    const humidityMultipliers = {
      low: 0.8,
      moderate: 1.0,
      high: 1.2,
      "very-high": 1.4
    };
    
    // Calculate base water loss
    let weightInKg = weight;
    if (weightUnit === "lb") {
      weightInKg = weight * 0.453592;
    }
    
    // Duration in hours
    const durationHours = exerciseDuration / 60;
    
    // Calculate water loss in milliliters
    let waterLossML = weightInKg * intensityRates[intensity] * durationHours * 
                      weatherMultipliers[weather] * humidityMultipliers[humidity];
    
    // Adjust for acclimatization (10% reduction per point above 5, up to 50%)
    if (acclimatization > 5) {
      const acclimatizationFactor = 1 - Math.min(0.5, (acclimatization - 5) * 0.1);
      waterLossML *= acclimatizationFactor;
    }
    
    // Round to nearest 10 ml
    waterLossML = Math.round(waterLossML / 10) * 10;
    
    // Convert to liters
    const waterLossL = parseFloat((waterLossML / 1000).toFixed(2));
    setWaterLoss(waterLossL);
    
    // Calculate recommended hydration (water loss + 20% for regular metabolism)
    const recommendedHydration = parseFloat((waterLossL * 1.2).toFixed(2));
    setHydrationRecommendation(recommendedHydration);
    
    // Determine dehydration risk
    const percentBodyWeight = (waterLossML / (weightInKg * 1000)) * 100;
    
    if (percentBodyWeight < 2) {
      setDehydrationRisk("low");
    } else if (percentBodyWeight < 4) {
      setDehydrationRisk("moderate");
    } else if (percentBodyWeight < 6) {
      setDehydrationRisk("high");
    } else {
      setDehydrationRisk("severe");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <CalculatorNumberInput
                label="Weight"
                value={weight}
                onChange={setWeight}
                min={weightUnit === "kg" ? 30 : 66}
                max={weightUnit === "kg" ? 200 : 440}
                step={weightUnit === "kg" ? 0.1 : 1}
                className="col-span-2"
                required
              />
              
              <div className="space-y-2">
                <Label>Unit</Label>
                <Select value={weightUnit} onValueChange={setWeightUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lb">lb</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <CalculatorNumberInput
              label="Exercise Duration"
              value={exerciseDuration}
              onChange={setExerciseDuration}
              min={10}
              max={300}
              step={5}
              unit="minutes"
              required
            />
            
            <div className="space-y-2">
              <Label>Exercise Intensity</Label>
              <RadioGroup
                value={intensity}
                onValueChange={(value) => setIntensity(value as ExerciseIntensity)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light-intensity" />
                  <Label htmlFor="light-intensity">Light (walking, yoga, easy cycling)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate-intensity" />
                  <Label htmlFor="moderate-intensity">Moderate (brisk walking, light jogging)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vigorous" id="vigorous-intensity" />
                  <Label htmlFor="vigorous-intensity">Vigorous (running, basketball, swimming)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="extreme" id="extreme-intensity" />
                  <Label htmlFor="extreme-intensity">Extreme (racing, intense interval training)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Weather Conditions</Label>
              <Select value={weather} onValueChange={(value) => setWeather(value as WeatherCondition)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select weather" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cool">Cool (&lt; 15°C / 59°F)</SelectItem>
                  <SelectItem value="moderate">Moderate (15-25°C / 59-77°F)</SelectItem>
                  <SelectItem value="hot">Hot (25-30°C / 77-86°F)</SelectItem>
                  <SelectItem value="very-hot">Very Hot (&gt; 30°C / 86°F)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Humidity Level</Label>
              <Select value={humidity} onValueChange={(value) => setHumidity(value as HumidityLevel)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select humidity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (&lt; 30%)</SelectItem>
                  <SelectItem value="moderate">Moderate (30-60%)</SelectItem>
                  <SelectItem value="high">High (60-80%)</SelectItem>
                  <SelectItem value="very-high">Very High (&gt; 80%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Acclimatization Level (1-10)</Label>
                <span className="text-sm font-medium">{acclimatization}</span>
              </div>
              <Slider 
                defaultValue={[5]} 
                max={10} 
                min={1} 
                step={1} 
                onValueChange={(value) => setAcclimatization(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>New to conditions</span>
                <span>Fully acclimatized</span>
              </div>
            </div>
            
            <Button onClick={calculateHydrationLoss} className="w-full">
              Calculate Hydration Needs
            </Button>
          </div>
        </CardContent>
      </Card>

      {waterLoss !== null && hydrationRecommendation !== null && (
        <CalculatorResult title="Hydration Analysis">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-md flex flex-col items-center justify-center text-center">
                <Droplets className="h-8 w-8 text-blue-500 mb-2" />
                <p className="text-sm text-muted-foreground">Estimated Water Loss</p>
                <p className="text-2xl font-bold">{waterLoss} L</p>
                <p className="text-xs text-muted-foreground">
                  ({(waterLoss * 1000).toFixed(0)} ml)
                </p>
              </div>
              
              <div className="bg-primary/10 p-4 rounded-md flex flex-col items-center justify-center text-center">
                <Droplets className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Recommended Fluid Intake</p>
                <p className="text-2xl font-bold">{hydrationRecommendation} L</p>
                <p className="text-xs text-muted-foreground">
                  ({(hydrationRecommendation * 1000).toFixed(0)} ml)
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-muted rounded-md">
              <div className="flex-shrink-0">
                {dehydrationRisk === "low" && (
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <Droplets className="h-8 w-8 text-green-500" />
                  </div>
                )}
                {dehydrationRisk === "moderate" && (
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Droplets className="h-8 w-8 text-yellow-500" />
                  </div>
                )}
                {dehydrationRisk === "high" && (
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                    <Droplets className="h-8 w-8 text-orange-500" />
                  </div>
                )}
                {dehydrationRisk === "severe" && (
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="font-medium text-lg">
                  {dehydrationRisk === "low" && "Low Dehydration Risk"}
                  {dehydrationRisk === "moderate" && "Moderate Dehydration Risk"}
                  {dehydrationRisk === "high" && "High Dehydration Risk"}
                  {dehydrationRisk === "severe" && "Severe Dehydration Risk"}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {dehydrationRisk === "low" && "Minor impact on performance. Stay hydrated at regular intervals."}
                  {dehydrationRisk === "moderate" && "May affect endurance and performance. Drink regularly during activity."}
                  {dehydrationRisk === "high" && "Significant performance decline likely. Consider electrolyte replacement."}
                  {dehydrationRisk === "severe" && "Dangerous level of dehydration possible. Reduce intensity or duration."}
                </p>
              </div>
            </div>
            
            <ResultAlert 
              type={
                dehydrationRisk === "low" 
                  ? "success" 
                  : dehydrationRisk === "moderate" 
                    ? "info" 
                    : dehydrationRisk === "high" 
                      ? "warning" 
                      : "error"
              }
              title="Hydration Recommendations"
            >
              <div className="space-y-2">
                <p>Hydration schedule for {exerciseDuration} minutes of {intensity} activity:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Before exercise: 400-600 ml of fluid 2 hours prior</li>
                  <li>During exercise: {(hydrationRecommendation / (exerciseDuration / 15)).toFixed(2)} L every 15 minutes</li>
                  <li>After exercise: At least {hydrationRecommendation} L within 2 hours of completion</li>
                  {dehydrationRisk === "high" || dehydrationRisk === "severe" ? (
                    <li>Include electrolytes in your hydration strategy</li>
                  ) : null}
                </ul>
              </div>
            </ResultAlert>
            
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="p-2 bg-muted/50 rounded-md flex flex-col items-center">
                <Thermometer className="h-4 w-4 mb-1 text-muted-foreground" />
                <p className="font-medium">
                  {weather === "cool" && "Cool"}
                  {weather === "moderate" && "Moderate"}
                  {weather === "hot" && "Hot"}
                  {weather === "very-hot" && "Very Hot"}
                </p>
                <p className="text-xs text-muted-foreground">Temperature</p>
              </div>
              
              <div className="p-2 bg-muted/50 rounded-md flex flex-col items-center">
                <Wind className="h-4 w-4 mb-1 text-muted-foreground" />
                <p className="font-medium">
                  {humidity === "low" && "Low"}
                  {humidity === "moderate" && "Moderate"}
                  {humidity === "high" && "High"}
                  {humidity === "very-high" && "Very High"}
                </p>
                <p className="text-xs text-muted-foreground">Humidity</p>
              </div>
              
              <div className="p-2 bg-muted/50 rounded-md flex flex-col items-center">
                <Droplets className="h-4 w-4 mb-1 text-muted-foreground" />
                <p className="font-medium">{acclimatization}/10</p>
                <p className="text-xs text-muted-foreground">Acclimatization</p>
              </div>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
