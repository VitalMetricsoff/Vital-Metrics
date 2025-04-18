
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Ruler, Scale, Dumbbell, Info } from "lucide-react";

type Gender = "male" | "female";
type Protocol = "3site" | "4site" | "7site";

export function SkinfoldBodyFatCalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState<number>(30);
  const [protocol, setProtocol] = useState<Protocol>("3site");
  const [chest, setChest] = useState<number>(0);
  const [abdominal, setAbdominal] = useState<number>(0);
  const [thigh, setThigh] = useState<number>(0);
  const [triceps, setTriceps] = useState<number>(0);
  const [suprailiac, setSuprailiac] = useState<number>(0);
  const [subscapular, setSubscapular] = useState<number>(0);
  const [midaxillary, setMidaxillary] = useState<number>(0);
  
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [bodyFatCategory, setBodyFatCategory] = useState<string>("");
  const [leanMass, setLeanMass] = useState<number | null>(null);
  const [fatMass, setFatMass] = useState<number | null>(null);
  
  // Weight for calculating lean mass and fat mass
  const [weight, setWeight] = useState<number>(70);
  const [weightUnit, setWeightUnit] = useState<string>("kg");
  
  const calculateBodyFat = () => {
    let sum = 0;
    let bodyDensity = 0;
    let calculatedBodyFat = 0;
    
    // Convert skinfold measurements from mm to cm
    const chestCm = chest / 10;
    const abdominalCm = abdominal / 10;
    const thighCm = thigh / 10;
    const tricepsCm = triceps / 10;
    const suprailiacCm = suprailiac / 10;
    const subscapularCm = subscapular / 10;
    const midaxillaryCm = midaxillary / 10;
    
    if (protocol === "3site") {
      if (gender === "male") {
        // Jackson-Pollock 3-site formula for men (chest, abdominal, thigh)
        sum = chestCm + abdominalCm + thighCm;
        bodyDensity = 1.10938 - (0.0008267 * sum) + (0.0000016 * sum * sum) - (0.0002574 * age);
      } else {
        // Jackson-Pollock 3-site formula for women (triceps, suprailiac, thigh)
        sum = tricepsCm + suprailiacCm + thighCm;
        bodyDensity = 1.099421 - (0.0009929 * sum) + (0.0000023 * sum * sum) - (0.0001392 * age);
      }
    } else if (protocol === "4site") {
      // 4-site formula (abdominal, suprailiac, triceps, thigh)
      sum = abdominalCm + suprailiacCm + tricepsCm + thighCm;
      if (gender === "male") {
        bodyDensity = 1.10938 - (0.0008267 * sum) + (0.0000016 * sum * sum) - (0.0002574 * age);
      } else {
        bodyDensity = 1.096095 - (0.0006952 * sum) + (0.0000011 * sum * sum) - (0.0000714 * age);
      }
    } else if (protocol === "7site") {
      // 7-site formula (chest, abdominal, thigh, triceps, subscapular, suprailiac, midaxillary)
      sum = chestCm + abdominalCm + thighCm + tricepsCm + subscapularCm + suprailiacCm + midaxillaryCm;
      if (gender === "male") {
        bodyDensity = 1.112 - (0.00043499 * sum) + (0.00000055 * sum * sum) - (0.00028826 * age);
      } else {
        bodyDensity = 1.097 - (0.00046971 * sum) + (0.00000056 * sum * sum) - (0.00012828 * age);
      }
    }
    
    // Siri equation to convert body density to body fat percentage
    calculatedBodyFat = (495 / bodyDensity) - 450;
    
    // Round to 1 decimal place
    calculatedBodyFat = parseFloat(calculatedBodyFat.toFixed(1));
    
    setBodyFat(calculatedBodyFat);
    
    // Determine body fat category
    let category = "";
    if (gender === "male") {
      if (calculatedBodyFat < 6) category = "Essential Fat";
      else if (calculatedBodyFat < 14) category = "Athletic";
      else if (calculatedBodyFat < 18) category = "Fitness";
      else if (calculatedBodyFat < 25) category = "Average";
      else category = "Obese";
    } else {
      if (calculatedBodyFat < 14) category = "Essential Fat";
      else if (calculatedBodyFat < 21) category = "Athletic";
      else if (calculatedBodyFat < 25) category = "Fitness";
      else if (calculatedBodyFat < 32) category = "Average";
      else category = "Obese";
    }
    
    setBodyFatCategory(category);
    
    // Calculate lean mass and fat mass if weight is provided
    if (weight) {
      let weightInKg = weight;
      if (weightUnit === "lb") {
        weightInKg = weight * 0.453592;
      }
      
      const fatMassKg = (calculatedBodyFat / 100) * weightInKg;
      const leanMassKg = weightInKg - fatMassKg;
      
      if (weightUnit === "kg") {
        setFatMass(parseFloat(fatMassKg.toFixed(1)));
        setLeanMass(parseFloat(leanMassKg.toFixed(1)));
      } else {
        // Convert back to pounds
        setFatMass(parseFloat((fatMassKg * 2.20462).toFixed(1)));
        setLeanMass(parseFloat((leanMassKg * 2.20462).toFixed(1)));
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
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
            
            <CalculatorNumberInput
              label="Age"
              value={age}
              onChange={setAge}
              min={18}
              max={99}
              step={1}
              required
            />
            
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
            
            <div className="space-y-2">
              <Label>Skinfold Protocol</Label>
              <Select value={protocol} onValueChange={(value) => setProtocol(value as Protocol)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select protocol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3site">
                    {gender === "male" 
                      ? "3-Site (Chest, Abdominal, Thigh)" 
                      : "3-Site (Triceps, Suprailiac, Thigh)"}
                  </SelectItem>
                  <SelectItem value="4site">4-Site (Abdominal, Suprailiac, Triceps, Thigh)</SelectItem>
                  <SelectItem value="7site">7-Site (All measurements)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium mb-3">Skinfold Measurements (mm)</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(protocol === "3site" && gender === "male" || protocol === "4site" || protocol === "7site") && (
                  <CalculatorNumberInput
                    label="Chest"
                    value={chest}
                    onChange={setChest}
                    min={0}
                    max={100}
                    step={0.5}
                    unit="mm"
                    required={protocol === "3site" && gender === "male" || protocol === "7site"}
                  />
                )}
                
                {(protocol === "3site" && gender === "male" || protocol === "4site" || protocol === "7site") && (
                  <CalculatorNumberInput
                    label="Abdominal"
                    value={abdominal}
                    onChange={setAbdominal}
                    min={0}
                    max={100}
                    step={0.5}
                    unit="mm"
                    required={protocol === "3site" && gender === "male" || protocol === "4site" || protocol === "7site"}
                  />
                )}
                
                {(protocol === "3site" || protocol === "4site" || protocol === "7site") && (
                  <CalculatorNumberInput
                    label="Thigh"
                    value={thigh}
                    onChange={setThigh}
                    min={0}
                    max={100}
                    step={0.5}
                    unit="mm"
                    required={protocol === "3site" || protocol === "4site" || protocol === "7site"}
                  />
                )}
                
                {(protocol === "3site" && gender === "female" || protocol === "4site" || protocol === "7site") && (
                  <CalculatorNumberInput
                    label="Triceps"
                    value={triceps}
                    onChange={setTriceps}
                    min={0}
                    max={100}
                    step={0.5}
                    unit="mm"
                    required={protocol === "3site" && gender === "female" || protocol === "4site" || protocol === "7site"}
                  />
                )}
                
                {(protocol === "3site" && gender === "female" || protocol === "4site" || protocol === "7site") && (
                  <CalculatorNumberInput
                    label="Suprailiac"
                    value={suprailiac}
                    onChange={setSuprailiac}
                    min={0}
                    max={100}
                    step={0.5}
                    unit="mm"
                    required={protocol === "3site" && gender === "female" || protocol === "4site" || protocol === "7site"}
                  />
                )}
                
                {protocol === "7site" && (
                  <CalculatorNumberInput
                    label="Subscapular"
                    value={subscapular}
                    onChange={setSubscapular}
                    min={0}
                    max={100}
                    step={0.5}
                    unit="mm"
                    required={protocol === "7site"}
                  />
                )}
                
                {protocol === "7site" && (
                  <CalculatorNumberInput
                    label="Midaxillary"
                    value={midaxillary}
                    onChange={setMidaxillary}
                    min={0}
                    max={100}
                    step={0.5}
                    unit="mm"
                    required={protocol === "7site"}
                  />
                )}
              </div>
            </div>
            
            <Button onClick={calculateBodyFat} className="w-full">
              Calculate Body Fat Percentage
            </Button>
          </div>
        </CardContent>
      </Card>

      {bodyFat !== null && (
        <CalculatorResult title="Body Fat Analysis">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 p-4 rounded-md text-center flex flex-col items-center">
                <Scale className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Body Fat Percentage</p>
                <p className="text-3xl font-bold">{bodyFat}%</p>
                <p className="text-sm font-medium">{bodyFatCategory}</p>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <div className="bg-muted/50 p-2 rounded-md text-center">
                  <p className="text-xs text-muted-foreground">Lean Mass</p>
                  <p className="text-xl font-bold">{leanMass} {weightUnit}</p>
                </div>
                <div className="bg-muted/50 p-2 rounded-md text-center">
                  <p className="text-xs text-muted-foreground">Fat Mass</p>
                  <p className="text-xl font-bold">{fatMass} {weightUnit}</p>
                </div>
              </div>
            </div>
            
            <ResultAlert 
              type={
                bodyFatCategory === "Athletic" 
                  ? "success" 
                  : bodyFatCategory === "Fitness" 
                    ? "success" 
                    : bodyFatCategory === "Average" 
                      ? "info" 
                      : bodyFatCategory === "Essential Fat" 
                        ? "warning" 
                        : "warning"
              }
              title={`${bodyFatCategory} Body Fat Level`}
            >
              <p>
                Your body fat percentage is categorized as <strong>{bodyFatCategory}</strong> for your gender.
                {bodyFatCategory === "Athletic" && " This range is typical for trained athletes."}
                {bodyFatCategory === "Fitness" && " This range indicates good fitness and health."}
                {bodyFatCategory === "Average" && " This is within the average range for the general population."}
                {bodyFatCategory === "Obese" && " This range is associated with increased health risks."}
                {bodyFatCategory === "Essential Fat" && " This is close to essential fat levels required for basic bodily functions."}
              </p>
            </ResultAlert>
            
            <div className="mt-4 bg-muted p-4 rounded-md">
              <div className="flex items-start">
                <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div className="text-sm">
                  <h4 className="font-medium mb-1">Body Fat Percentage Categories:</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <div className="col-span-2 font-medium mt-1">Males:</div>
                    <div>Essential Fat: 2-5%</div>
                    <div>Athletic: 6-13%</div>
                    <div>Fitness: 14-17%</div>
                    <div>Average: 18-24%</div>
                    <div>Obese: 25%+</div>
                    
                    <div className="col-span-2 font-medium mt-2">Females:</div>
                    <div>Essential Fat: 10-13%</div>
                    <div>Athletic: 14-20%</div>
                    <div>Fitness: 21-24%</div>
                    <div>Average: 25-31%</div>
                    <div>Obese: 32%+</div>
                  </div>
                  
                  <p className="mt-3 text-muted-foreground">
                    Note: The skinfold method has an error margin of approximately ±3-4%. For most accurate results, have measurements taken by a trained professional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
