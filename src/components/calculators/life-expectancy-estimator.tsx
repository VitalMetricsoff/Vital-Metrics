
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon } from "lucide-react";
import { addYears, format } from "date-fns";

export function LifeExpectancyEstimator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number>(30);
  const [isSmoker, setIsSmoker] = useState<boolean>(false);
  const [hasExerciseRoutine, setHasExerciseRoutine] = useState<boolean>(true);
  const [hasDiabetes, setHasDiabetes] = useState<boolean>(false);
  const [hasHeartDisease, setHasHeartDisease] = useState<boolean>(false);
  const [hasCancer, setHasCancer] = useState<boolean>(false);
  const [hasHealthyDiet, setHasHealthyDiet] = useState<boolean>(true);
  const [bmi, setBmi] = useState<number>(24);
  const [showResults, setShowResults] = useState(false);
  
  const handleCalculate = () => {
    setShowResults(true);
  };
  
  const calculateLifeExpectancy = () => {
    // Base life expectancy in the US (2023 data)
    const baseLifeExpectancy = gender === "male" ? 76.3 : 81.2;
    
    // Remaining life expectancy based on current age
    let remainingYears = baseLifeExpectancy - age;
    
    // Apply modifiers based on health factors
    
    // Smoking status
    if (isSmoker) remainingYears -= 10;
    
    // Exercise routine
    if (hasExerciseRoutine) remainingYears += 3;
    
    // Chronic conditions
    if (hasDiabetes) remainingYears -= 5;
    if (hasHeartDisease) remainingYears -= 5;
    if (hasCancer) remainingYears -= 8;
    
    // Diet
    if (hasHealthyDiet) remainingYears += 2;
    
    // BMI
    if (bmi < 18.5) remainingYears -= 2; // Underweight
    else if (bmi >= 30) remainingYears -= 3; // Obese
    else if (bmi > 25) remainingYears -= 1; // Overweight
    
    // Ensure remaining years is positive
    remainingYears = Math.max(remainingYears, 0);
    
    // Total expected lifespan
    const totalLifeExpectancy = age + remainingYears;
    
    return {
      remainingYears: Math.round(remainingYears),
      totalLifeExpectancy: Math.round(totalLifeExpectancy)
    };
  };
  
  const getLifestyleImpacts = () => {
    const impacts = [];
    
    if (isSmoker) impacts.push({
      factor: "Smoking",
      impact: "Decreases life expectancy by ~10 years",
      recommendation: "Quitting smoking can restore some of the lost years, especially if done early."
    });
    
    if (!hasExerciseRoutine) impacts.push({
      factor: "Physical Inactivity",
      impact: "Decreases life expectancy by ~3 years",
      recommendation: "Regular moderate exercise (150 minutes/week) can increase your lifespan."
    });
    
    if (hasDiabetes) impacts.push({
      factor: "Diabetes",
      impact: "Decreases life expectancy by ~5 years",
      recommendation: "Good glucose control can reduce the impact of diabetes on your lifespan."
    });
    
    if (hasHeartDisease) impacts.push({
      factor: "Heart Disease",
      impact: "Decreases life expectancy by ~5 years",
      recommendation: "Following medical advice and adopting heart-healthy habits can mitigate this impact."
    });
    
    if (hasCancer) impacts.push({
      factor: "Cancer History",
      impact: "Decreases life expectancy by ~8 years",
      recommendation: "Regular screenings and following treatment plans are crucial for managing this impact."
    });
    
    if (!hasHealthyDiet) impacts.push({
      factor: "Poor Diet",
      impact: "Decreases life expectancy by ~2 years",
      recommendation: "A balanced diet rich in fruits, vegetables, and whole grains can extend your lifespan."
    });
    
    if (bmi < 18.5) impacts.push({
      factor: "Underweight (BMI < 18.5)",
      impact: "Decreases life expectancy by ~2 years",
      recommendation: "Achieving a healthy weight through proper nutrition can improve your longevity."
    });
    else if (bmi >= 30) impacts.push({
      factor: "Obesity (BMI ≥ 30)",
      impact: "Decreases life expectancy by ~3 years",
      recommendation: "Weight management through diet and exercise can significantly improve your health outcomes."
    });
    else if (bmi > 25) impacts.push({
      factor: "Overweight (BMI 25-29.9)",
      impact: "Decreases life expectancy by ~1 year",
      recommendation: "Modest weight loss can help reduce health risks associated with being overweight."
    });
    
    return impacts;
  };
  
  const result = calculateLifeExpectancy();
  const impacts = getLifestyleImpacts();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Gender</Label>
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
            </div>
            
            <CalculatorNumberInput
              label="Current Age"
              value={age}
              onChange={setAge}
              min={18}
              max={100}
              unit="years"
              required
            />
            
            <CalculatorNumberInput
              label="BMI (Body Mass Index)"
              value={bmi}
              onChange={setBmi}
              min={15}
              max={50}
              step={0.1}
              description="Body Mass Index (kg/m²)"
              required
            />
            
            <div className="space-y-4 pt-2">
              <Label className="text-base">Health Factors</Label>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="smoker" className="cursor-pointer">Do you smoke?</Label>
                <Switch
                  id="smoker"
                  checked={isSmoker}
                  onCheckedChange={setIsSmoker}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="exercise" className="cursor-pointer">Do you exercise regularly?</Label>
                <Switch
                  id="exercise"
                  checked={hasExerciseRoutine}
                  onCheckedChange={setHasExerciseRoutine}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="diet" className="cursor-pointer">Do you maintain a healthy diet?</Label>
                <Switch
                  id="diet"
                  checked={hasHealthyDiet}
                  onCheckedChange={setHasHealthyDiet}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="diabetes" className="cursor-pointer">Do you have diabetes?</Label>
                <Switch
                  id="diabetes"
                  checked={hasDiabetes}
                  onCheckedChange={setHasDiabetes}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="heart" className="cursor-pointer">Do you have heart disease?</Label>
                <Switch
                  id="heart"
                  checked={hasHeartDisease}
                  onCheckedChange={setHasHeartDisease}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="cancer" className="cursor-pointer">Do you have or have had cancer?</Label>
                <Switch
                  id="cancer"
                  checked={hasCancer}
                  onCheckedChange={setHasCancer}
                />
              </div>
            </div>
            
            <Button className="w-full mt-4" onClick={handleCalculate}>
              Estimate Life Expectancy
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {showResults && (
        <CalculatorResult title="Life Expectancy Estimation">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-blue-50 border border-blue-100 rounded-lg text-center">
                <h3 className="text-lg font-medium">Estimated Life Expectancy</h3>
                <p className="text-4xl font-bold mt-2">{result.totalLifeExpectancy} <span className="text-xl">years</span></p>
                <p className="text-sm text-muted-foreground mt-1">
                  Living to approximately {format(addYears(new Date(), result.remainingYears), 'yyyy')}
                </p>
              </div>
              
              <div className="p-6 bg-green-50 border border-green-100 rounded-lg text-center">
                <h3 className="text-lg font-medium">Estimated Remaining Years</h3>
                <p className="text-4xl font-bold mt-2">{result.remainingYears} <span className="text-xl">years</span></p>
                <div className="flex items-center justify-center mt-1">
                  <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Based on your current age and health factors</p>
                </div>
              </div>
            </div>
            
            {impacts.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Lifestyle Impact Analysis</h3>
                <div className="space-y-3">
                  {impacts.map((impact, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <p className="font-semibold">{impact.factor}</p>
                      <p className="text-sm text-red-500">{impact.impact}</p>
                      <p className="text-sm text-green-600 mt-1">{impact.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-sm text-muted-foreground mt-6">
              <p className="font-semibold mb-2">Important Disclaimer:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>This calculator provides only a rough estimation based on statistical averages and simplified assumptions.</li>
                <li>Life expectancy depends on many factors beyond those captured in this tool, including genetics, environmental factors, access to healthcare, and random events.</li>
                <li>The calculations are based on generalized population data and should not be considered as personalized medical advice.</li>
                <li>For a more accurate assessment of your health status and longevity prospects, consult with healthcare professionals.</li>
                <li>This tool is designed for educational purposes only.</li>
              </ul>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
