
import { useState } from "react";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { Button } from "@/components/ui/button";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CalorieMacroCalculator() {
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [gender, setGender] = useState<string>("male");
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [goal, setGoal] = useState<string>("maintain");
  const [showResults, setShowResults] = useState(false);

  const calculateBMR = () => {
    // Using Mifflin-St Jeor Equation
    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375,   // Light exercise 1-3 days/week
    moderate: 1.55, // Moderate exercise 3-5 days/week
    active: 1.725,  // Heavy exercise 6-7 days/week
    veryActive: 1.9 // Very heavy exercise, physical job
  };

  const goalAdjustments = {
    lose: -500,     // Deficit for weight loss
    maintain: 0,    // Maintenance calories
    gain: 500       // Surplus for weight gain
  };

  const calculateMacros = (totalCalories: number) => {
    let proteinPercentage, carbPercentage, fatPercentage;

    switch (goal) {
      case "lose":
        proteinPercentage = 0.4; // 40% protein
        fatPercentage = 0.35;    // 35% fat
        carbPercentage = 0.25;   // 25% carbs
        break;
      case "maintain":
        proteinPercentage = 0.3; // 30% protein
        fatPercentage = 0.3;     // 30% fat
        carbPercentage = 0.4;    // 40% carbs
        break;
      case "gain":
        proteinPercentage = 0.25; // 25% protein
        fatPercentage = 0.25;     // 25% fat
        carbPercentage = 0.5;     // 50% carbs
        break;
      default:
        proteinPercentage = 0.3;
        fatPercentage = 0.3;
        carbPercentage = 0.4;
    }

    const proteinCalories = totalCalories * proteinPercentage;
    const fatCalories = totalCalories * fatPercentage;
    const carbCalories = totalCalories * carbPercentage;

    // Convert to grams (protein: 4 cal/g, carbs: 4 cal/g, fat: 9 cal/g)
    const proteinGrams = Math.round(proteinCalories / 4);
    const fatGrams = Math.round(fatCalories / 9);
    const carbGrams = Math.round(carbCalories / 4);

    return { proteinGrams, fatGrams, carbGrams };
  };

  const calculateResults = () => {
    const bmr = calculateBMR();
    const tdee = Math.round(bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers]);
    const dailyCalories = Math.round(tdee + goalAdjustments[goal as keyof typeof goalAdjustments]);
    const macros = calculateMacros(dailyCalories);

    return {
      bmr: Math.round(bmr),
      tdee,
      dailyCalories,
      ...macros
    };
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const results = calculateResults();

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-4">
              <CalculatorNumberInput
                label="Age"
                value={age}
                onChange={setAge}
                min={18}
                max={100}
                required
              />
              
              <CalculatorNumberInput
                label="Weight"
                value={weight}
                onChange={setWeight}
                min={30}
                max={300}
                unit="kg"
                required
              />
              
              <CalculatorNumberInput
                label="Height"
                value={height}
                onChange={setHeight}
                min={100}
                max={250}
                unit="cm"
                required
              />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                  value={gender}
                  onValueChange={setGender}
                  className="flex flex-col space-y-1"
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
                    <SelectItem value="gain">Gain weight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Button className="w-full mt-6" onClick={handleCalculate}>
            Calculate Macros
          </Button>
        </CardContent>
      </Card>
      
      {showResults && (
        <CalculatorResult title="Your Daily Calorie & Macronutrient Needs">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-md">
                <h3 className="font-semibold">Basal Metabolic Rate</h3>
                <p className="text-2xl font-bold mt-1">{results.bmr} calories</p>
                <p className="text-xs text-muted-foreground mt-1">Calories your body needs at rest</p>
              </div>
              
              <div className="p-4 bg-muted rounded-md">
                <h3 className="font-semibold">Total Daily Energy</h3>
                <p className="text-2xl font-bold mt-1">{results.tdee} calories</p>
                <p className="text-xs text-muted-foreground mt-1">Calories with activity factor</p>
              </div>
            </div>
            
            <ResultAlert type="info" title="Daily Calorie Target">
              Based on your goal to {goal === "lose" ? "lose" : goal === "gain" ? "gain" : "maintain"} weight, 
              your daily calorie target is <strong>{results.dailyCalories} calories</strong>.
            </ResultAlert>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Recommended Macronutrient Distribution</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium text-sm">Protein</h4>
                  <p className="text-xl font-bold mt-1">{results.proteinGrams}g</p>
                  <p className="text-xs text-muted-foreground mt-1">{Math.round(results.proteinGrams * 4)} calories</p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium text-sm">Carbohydrates</h4>
                  <p className="text-xl font-bold mt-1">{results.carbGrams}g</p>
                  <p className="text-xs text-muted-foreground mt-1">{Math.round(results.carbGrams * 4)} calories</p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium text-sm">Fat</h4>
                  <p className="text-xl font-bold mt-1">{results.fatGrams}g</p>
                  <p className="text-xs text-muted-foreground mt-1">{Math.round(results.fatGrams * 9)} calories</p>
                </div>
              </div>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
