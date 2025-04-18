
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

type ActivityLevel = {
  label: string;
  value: string;
  multiplier: number;
  description: string;
};

const activityLevels: ActivityLevel[] = [
  {
    label: "Sedentary",
    value: "sedentary",
    multiplier: 1.2,
    description: "Little or no exercise, desk job"
  },
  {
    label: "Lightly Active",
    value: "light",
    multiplier: 1.375,
    description: "Light exercise 1-3 days/week"
  },
  {
    label: "Moderately Active",
    value: "moderate",
    multiplier: 1.55,
    description: "Moderate exercise 3-5 days/week"
  },
  {
    label: "Very Active",
    value: "active",
    multiplier: 1.725,
    description: "Hard exercise 6-7 days/week"
  },
  {
    label: "Extremely Active",
    value: "veryActive",
    multiplier: 1.9,
    description: "Hard daily exercise & physical job"
  }
];

export function TDEECalculator() {
  // Personal data
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number>(30);
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  
  // Metric system
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(70);
  
  // Imperial system
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(7);
  const [weightLbs, setWeightLbs] = useState<number>(154);
  
  const [bmr, setBmr] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);
  const [system, setSystem] = useState<"metric" | "imperial">("metric");

  // Calculate BMR and TDEE when values change
  useEffect(() => {
    calculateTDEE();
  }, [heightCm, weightKg, heightFt, heightIn, weightLbs, gender, age, activityLevel, system]);

  const calculateBMR = (): number => {
    let weightInKg: number;
    let heightInCm: number;
    
    if (system === "metric") {
      weightInKg = weightKg;
      heightInCm = heightCm;
    } else {
      // Convert imperial to metric
      weightInKg = weightLbs * 0.453592;
      heightInCm = ((heightFt * 12) + heightIn) * 2.54;
    }
    
    // Mifflin-St Jeor Equation for BMR
    let calculatedBMR: number;
    
    if (gender === "male") {
      calculatedBMR = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
    } else {
      calculatedBMR = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
    }
    
    return Math.round(calculatedBMR);
  };

  const calculateTDEE = () => {
    const calculatedBMR = calculateBMR();
    setBmr(calculatedBMR);
    
    // Find the selected activity level multiplier
    const selectedActivity = activityLevels.find(level => level.value === activityLevel);
    const multiplier = selectedActivity ? selectedActivity.multiplier : 1.55; // Default to moderate if not found
    
    const calculatedTDEE = Math.round(calculatedBMR * multiplier);
    setTdee(calculatedTDEE);
  };

  const getActivityLevelDescription = (): string => {
    const selectedActivity = activityLevels.find(level => level.value === activityLevel);
    return selectedActivity ? selectedActivity.description : "";
  };

  const macroCalculations = () => {
    if (!tdee) return null;
    
    const balancedMacros = {
      protein: Math.round((tdee * 0.3) / 4), // 30% of calories, 4 cal per gram
      carbs: Math.round((tdee * 0.4) / 4),   // 40% of calories, 4 cal per gram
      fat: Math.round((tdee * 0.3) / 9)      // 30% of calories, 9 cal per gram
    };
    
    const lowCarbMacros = {
      protein: Math.round((tdee * 0.4) / 4), // 40% of calories, 4 cal per gram
      carbs: Math.round((tdee * 0.2) / 4),   // 20% of calories, 4 cal per gram
      fat: Math.round((tdee * 0.4) / 9)      // 40% of calories, 9 cal per gram
    };
    
    const highProteinMacros = {
      protein: Math.round((tdee * 0.45) / 4), // 45% of calories, 4 cal per gram
      carbs: Math.round((tdee * 0.35) / 4),   // 35% of calories, 4 cal per gram
      fat: Math.round((tdee * 0.2) / 9)       // 20% of calories, 9 cal per gram
    };
    
    return {
      balanced: balancedMacros,
      lowCarb: lowCarbMacros,
      highProtein: highProteinMacros
    };
  };

  const downloadReport = () => {
    if (!bmr || !tdee) return;
    
    const macros = macroCalculations();
    const height = system === "metric" 
      ? `${heightCm} cm` 
      : `${heightFt}'${heightIn}"`;
    
    const weight = system === "metric"
      ? `${weightKg} kg`
      : `${weightLbs} lbs`;
    
    const report = `
TDEE CALCULATION REPORT
----------------------
Date: ${new Date().toLocaleDateString()}

YOUR INFORMATION:
Gender: ${gender === "male" ? "Male" : "Female"}
Age: ${age} years
Height: ${height}
Weight: ${weight}
Activity Level: ${activityLevels.find(a => a.value === activityLevel)?.label || ""} (${getActivityLevelDescription()})

RESULTS:
Basal Metabolic Rate (BMR): ${bmr} calories/day
Total Daily Energy Expenditure (TDEE): ${tdee} calories/day

MACRONUTRIENT RECOMMENDATIONS:
Standard Balanced Diet (30% protein, 40% carbs, 30% fat):
- Protein: ${macros?.balanced.protein}g (${Math.round(macros?.balanced.protein || 0 * 4)} calories)
- Carbohydrates: ${macros?.balanced.carbs}g (${Math.round(macros?.balanced.carbs || 0 * 4)} calories)
- Fat: ${macros?.balanced.fat}g (${Math.round(macros?.balanced.fat || 0 * 9)} calories)

Low Carb Diet (40% protein, 20% carbs, 40% fat):
- Protein: ${macros?.lowCarb.protein}g (${Math.round(macros?.lowCarb.protein || 0 * 4)} calories)
- Carbohydrates: ${macros?.lowCarb.carbs}g (${Math.round(macros?.lowCarb.carbs || 0 * 4)} calories)
- Fat: ${macros?.lowCarb.fat}g (${Math.round(macros?.lowCarb.fat || 0 * 9)} calories)

High Protein Diet (45% protein, 35% carbs, 20% fat):
- Protein: ${macros?.highProtein.protein}g (${Math.round(macros?.highProtein.protein || 0 * 4)} calories)
- Carbohydrates: ${macros?.highProtein.carbs}g (${Math.round(macros?.highProtein.carbs || 0 * 4)} calories)
- Fat: ${macros?.highProtein.fat}g (${Math.round(macros?.highProtein.fat || 0 * 9)} calories)

NOTES:
- BMR is the amount of energy you need at complete rest
- TDEE includes your daily activity level
- For weight loss, consume 10-20% fewer calories than your TDEE
- For weight gain, consume 10-20% more calories than your TDEE
- For maintenance, consume calories equal to your TDEE

Generated by: Health Calculator App
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tdee-report-${new Date().toLocaleDateString().replace(/\//g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>TDEE Calculator</CardTitle>
          <CardDescription>
            Total Daily Energy Expenditure (TDEE) is an estimation of how many calories you burn per day including your resting metabolic rate and activity level.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-medium mb-2">Personal Information</h3>
              <div className="space-y-4">
                <RadioGroup 
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
                
                <CalculatorNumberInput
                  label="Age"
                  value={age}
                  onChange={setAge}
                  min={1}
                  max={120}
                  step={1}
                  unit="years"
                  required
                />
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Activity Level</Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      {activityLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">{getActivityLevelDescription()}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium mb-2">Body Measurements</h3>
              <Tabs value={system} onValueChange={(v) => setSystem(v as "metric" | "imperial")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="metric">Metric</TabsTrigger>
                  <TabsTrigger value="imperial">Imperial</TabsTrigger>
                </TabsList>
                <TabsContent value="metric" className="space-y-4">
                  <CalculatorNumberInput
                    label="Height"
                    value={heightCm}
                    onChange={setHeightCm}
                    min={50}
                    max={250}
                    step={1}
                    unit="cm"
                    description="50-250 cm"
                    required
                  />
                  <CalculatorNumberInput
                    label="Weight"
                    value={weightKg}
                    onChange={setWeightKg}
                    min={20}
                    max={300}
                    step={0.1}
                    unit="kg"
                    description="20-300 kg"
                    required
                  />
                </TabsContent>
                <TabsContent value="imperial" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <CalculatorNumberInput
                      label="Height (feet)"
                      value={heightFt}
                      onChange={setHeightFt}
                      min={1}
                      max={8}
                      step={1}
                      unit="ft"
                      required
                    />
                    <CalculatorNumberInput
                      label="Height (inches)"
                      value={heightIn}
                      onChange={setHeightIn}
                      min={0}
                      max={11}
                      step={1}
                      unit="in"
                      required
                    />
                  </div>
                  <CalculatorNumberInput
                    label="Weight"
                    value={weightLbs}
                    onChange={setWeightLbs}
                    min={44}
                    max={660}
                    step={0.1}
                    unit="lbs"
                    description="44-660 lbs"
                    required
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {tdee !== null && (
        <CalculatorResult 
          title="Your TDEE Results" 
          onDownload={downloadReport}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="p-4 border rounded-lg">
                <div className="text-sm text-muted-foreground">Basal Metabolic Rate (BMR)</div>
                <div className="text-3xl font-bold mt-1">{bmr} <span className="text-lg font-normal">calories/day</span></div>
                <div className="text-xs text-muted-foreground mt-2">Calories burned at complete rest</div>
              </div>
              
              <div className="p-4 border rounded-lg bg-primary/10">
                <div className="text-sm text-muted-foreground">Total Daily Energy Expenditure</div>
                <div className="text-3xl font-bold mt-1">{tdee} <span className="text-lg font-normal">calories/day</span></div>
                <div className="text-xs text-muted-foreground mt-2">Calories burned with daily activities</div>
              </div>
            </div>
            
            <ResultAlert type="info" title="What does this mean?">
              <p>Your TDEE of <strong>{tdee} calories</strong> represents your estimated daily calorie needs including your activity level of <strong>{activityLevels.find(a => a.value === activityLevel)?.label}</strong>.</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>To maintain weight: Consume ~{tdee} calories daily</li>
                <li>To lose weight: Consume {Math.round(tdee * 0.85)} - {Math.round(tdee * 0.9)} calories daily</li>
                <li>To gain weight: Consume {Math.round(tdee * 1.1)} - {Math.round(tdee * 1.15)} calories daily</li>
              </ul>
            </ResultAlert>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                Macronutrient Recommendations
                <Info className="h-4 w-4 ml-2 text-muted-foreground" />
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Balanced Diet</CardTitle>
                    <CardDescription>30% protein, 40% carbs, 30% fat</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Protein:</span>
                        <span className="font-medium">{macroCalculations()?.balanced.protein}g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Carbs:</span>
                        <span className="font-medium">{macroCalculations()?.balanced.carbs}g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Fat:</span>
                        <span className="font-medium">{macroCalculations()?.balanced.fat}g</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Low Carb</CardTitle>
                    <CardDescription>40% protein, 20% carbs, 40% fat</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Protein:</span>
                        <span className="font-medium">{macroCalculations()?.lowCarb.protein}g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Carbs:</span>
                        <span className="font-medium">{macroCalculations()?.lowCarb.carbs}g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Fat:</span>
                        <span className="font-medium">{macroCalculations()?.lowCarb.fat}g</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">High Protein</CardTitle>
                    <CardDescription>45% protein, 35% carbs, 20% fat</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Protein:</span>
                        <span className="font-medium">{macroCalculations()?.highProtein.protein}g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Carbs:</span>
                        <span className="font-medium">{macroCalculations()?.highProtein.carbs}g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Fat:</span>
                        <span className="font-medium">{macroCalculations()?.highProtein.fat}g</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Notes:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>These are general recommendations based on your calculated TDEE.</li>
                <li>Individual needs may vary based on specific goals, health conditions, and preferences.</li>
                <li>For personalized nutrition advice, consult with a registered dietitian.</li>
              </ul>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
