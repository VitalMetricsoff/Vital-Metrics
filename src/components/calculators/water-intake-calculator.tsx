
import { useState } from "react";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { Button } from "@/components/ui/button";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function WaterIntakeCalculator() {
  const [weight, setWeight] = useState<number>(70);
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [climate, setClimate] = useState<string>("moderate");
  const [showResults, setShowResults] = useState(false);

  const calculateWaterIntake = () => {
    // Base calculation: 30-35 ml per kg of body weight
    let baseIntake = weight * 33; // ml

    // Activity level adjustments
    const activityAdjustments = {
      sedentary: 1.0,
      light: 1.1,
      moderate: 1.2,
      active: 1.3,
      veryActive: 1.4
    };

    // Climate adjustments
    const climateAdjustments = {
      cold: 0.9,
      moderate: 1.0,
      hot: 1.1,
      veryHot: 1.2
    };

    // Apply adjustments
    baseIntake *= activityAdjustments[activityLevel as keyof typeof activityAdjustments];
    baseIntake *= climateAdjustments[climate as keyof typeof climateAdjustments];

    // Round to nearest 50ml
    return Math.round(baseIntake / 50) * 50;
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const waterIntakeML = calculateWaterIntake();
  const waterIntakeL = (waterIntakeML / 1000).toFixed(1);
  const waterIntakeOz = Math.round(waterIntakeML / 29.5735); // Convert to fluid ounces
  const waterGlasses = Math.round(waterIntakeML / 240); // Assuming a glass is 240ml

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <CalculatorNumberInput
              label="Weight"
              value={weight}
              onChange={setWeight}
              min={30}
              max={300}
              unit="kg"
              required
            />
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Activity Level</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                    <SelectItem value="light">Lightly active (1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderately active (3-5 days/week)</SelectItem>
                    <SelectItem value="active">Very active (6-7 days/week)</SelectItem>
                    <SelectItem value="veryActive">Extremely active (physical job/training)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Climate</Label>
                <Select value={climate} onValueChange={setClimate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your climate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cold">Cold</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="hot">Hot</SelectItem>
                    <SelectItem value="veryHot">Very hot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Button className="w-full mt-6" onClick={handleCalculate}>
            Calculate Water Intake
          </Button>
        </CardContent>
      </Card>
      
      {showResults && (
        <CalculatorResult title="Your Daily Water Intake Recommendation">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border rounded-md text-center">
                <p className="text-3xl font-bold">{waterIntakeML} ml</p>
                <p className="text-sm text-muted-foreground mt-1">Milliliters</p>
              </div>
              
              <div className="p-4 border rounded-md text-center">
                <p className="text-3xl font-bold">{waterIntakeL} L</p>
                <p className="text-sm text-muted-foreground mt-1">Liters</p>
              </div>
              
              <div className="p-4 border rounded-md text-center">
                <p className="text-3xl font-bold">{waterIntakeOz} oz</p>
                <p className="text-sm text-muted-foreground mt-1">Fluid ounces</p>
              </div>
            </div>
            
            <ResultAlert type="info" title="Daily Water Intake">
              You should aim to drink approximately <strong>{waterGlasses} glasses</strong> of water per day.
            </ResultAlert>
            
            <div className="mt-4 text-sm">
              <h3 className="font-semibold mb-2">Factors that affect your water intake:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Activity level (more exercise = more water)</li>
                <li>Climate (hotter climate = more water)</li>
                <li>Health conditions (some may require more or less water)</li>
                <li>Pregnancy or breastfeeding (typically requires more water)</li>
              </ul>
              <p className="mt-3">
                <strong>Note:</strong> This is a general guideline. Listen to your body's needs and consult with a healthcare professional for personalized advice.
              </p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
