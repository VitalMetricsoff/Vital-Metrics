
import { useState } from "react";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { Button } from "@/components/ui/button";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ProteinIntakeCalculator() {
  const [weight, setWeight] = useState<number>(70);
  const [goal, setGoal] = useState<string>("maintain");
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [unitSystem, setUnitSystem] = useState<string>("metric");
  const [showResults, setShowResults] = useState(false);

  const calculateProteinIntake = () => {
    // Convert weight to kg if in imperial units
    const weightInKg = unitSystem === "imperial" ? weight * 0.45359237 : weight;
    
    // Base protein calculation (g/kg of body weight)
    let proteinPerKg = 0;
    
    // Adjust based on activity level and goal
    if (goal === "lose") {
      switch (activityLevel) {
        case "sedentary":
          proteinPerKg = 1.6;
          break;
        case "light":
          proteinPerKg = 1.8;
          break;
        case "moderate":
          proteinPerKg = 2.0;
          break;
        case "active":
          proteinPerKg = 2.2;
          break;
        case "veryActive":
          proteinPerKg = 2.4;
          break;
        default:
          proteinPerKg = 1.8;
      }
    } else if (goal === "maintain") {
      switch (activityLevel) {
        case "sedentary":
          proteinPerKg = 1.2;
          break;
        case "light":
          proteinPerKg = 1.3;
          break;
        case "moderate":
          proteinPerKg = 1.5;
          break;
        case "active":
          proteinPerKg = 1.7;
          break;
        case "veryActive":
          proteinPerKg = 1.9;
          break;
        default:
          proteinPerKg = 1.5;
      }
    } else if (goal === "gain") {
      switch (activityLevel) {
        case "sedentary":
          proteinPerKg = 1.6;
          break;
        case "light":
          proteinPerKg = 1.8;
          break;
        case "moderate":
          proteinPerKg = 2.0;
          break;
        case "active":
          proteinPerKg = 2.2;
          break;
        case "veryActive":
          proteinPerKg = 2.4;
          break;
        default:
          proteinPerKg = 2.0;
      }
    }
    
    // Calculate total daily protein
    const dailyProtein = Math.round(weightInKg * proteinPerKg);
    
    // Calculate protein per meal (assuming 4 meals per day)
    const proteinPerMeal = Math.round(dailyProtein / 4);
    
    return {
      dailyProtein,
      proteinPerMeal,
      proteinPerKg
    };
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const proteinResults = calculateProteinIntake();

  // Example protein sources and their amounts needed to reach daily goal
  const getProteinSourcesExamples = (totalProtein: number) => {
    return [
      { name: "Chicken Breast", proteinPer100g: 31, amountNeeded: Math.round(totalProtein / 31 * 100) },
      { name: "Salmon", proteinPer100g: 22, amountNeeded: Math.round(totalProtein / 22 * 100) },
      { name: "Greek Yogurt", proteinPer100g: 10, amountNeeded: Math.round(totalProtein / 10 * 100) },
      { name: "Eggs", proteinPer100g: 13, amountNeeded: Math.round(totalProtein / 13 * 100), unit: "large eggs", conversion: 50 }, // 50g per large egg
      { name: "Tofu", proteinPer100g: 8, amountNeeded: Math.round(totalProtein / 8 * 100) },
      { name: "Lentils (cooked)", proteinPer100g: 9, amountNeeded: Math.round(totalProtein / 9 * 100) }
    ];
  };

  const proteinSources = getProteinSourcesExamples(proteinResults.dailyProtein);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label>Unit System</Label>
              <RadioGroup
                value={unitSystem}
                onValueChange={setUnitSystem}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="metric" id="metric" />
                  <Label htmlFor="metric">Metric (kg)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="imperial" id="imperial" />
                  <Label htmlFor="imperial">Imperial (lbs)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <CalculatorNumberInput
              label="Weight"
              value={weight}
              onChange={setWeight}
              min={unitSystem === "metric" ? 30 : 66}
              max={unitSystem === "metric" ? 300 : 660}
              unit={unitSystem === "metric" ? "kg" : "lbs"}
              required
            />
            
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
              <Label>Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Lose weight</SelectItem>
                  <SelectItem value="maintain">Maintain weight</SelectItem>
                  <SelectItem value="gain">Gain muscle/weight</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button className="w-full mt-6" onClick={handleCalculate}>
            Calculate Protein Intake
          </Button>
        </CardContent>
      </Card>
      
      {showResults && (
        <CalculatorResult title="Your Daily Protein Intake Requirements">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-md text-center">
                <h3 className="font-medium">Daily Protein</h3>
                <p className="text-3xl font-bold mt-1">{proteinResults.dailyProtein}g</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {proteinResults.proteinPerKg.toFixed(1)}g per kg of body weight
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-md text-center">
                <h3 className="font-medium">Per Meal</h3>
                <p className="text-3xl font-bold mt-1">{proteinResults.proteinPerMeal}g</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on 4 meals per day
                </p>
              </div>
            </div>
            
            <ResultAlert type="info" title="Protein Requirements">
              Based on your {weight}{unitSystem === "metric" ? "kg" : "lbs"} weight, {activityLevel.replace(/([A-Z])/g, ' $1').toLowerCase()} activity level, 
              and goal to {goal === "lose" ? "lose weight" : goal === "gain" ? "gain muscle" : "maintain weight"}, 
              you should consume approximately <strong>{proteinResults.dailyProtein}g</strong> of protein daily.
            </ResultAlert>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-3">Food Examples to Meet Your Protein Goal</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-2 border">Food</th>
                      <th className="text-left p-2 border">Protein Content</th>
                      <th className="text-left p-2 border">Amount Needed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proteinSources.map((source, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                        <td className="p-2 border">{source.name}</td>
                        <td className="p-2 border">{source.proteinPer100g}g per 100g</td>
                        <td className="p-2 border">
                          {source.unit ? 
                            `${Math.round(source.amountNeeded / source.conversion)} ${source.unit}` :
                            `${source.amountNeeded}g`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm mt-3">
                <strong>Note:</strong> These are example foods and quantities. A balanced diet with varied protein sources is recommended.
              </p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
