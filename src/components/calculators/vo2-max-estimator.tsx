
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckIcon, XCircleIcon } from "lucide-react";

export function VO2MaxEstimator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number>(30);
  const [restingHR, setRestingHR] = useState<number>(70);
  const [timeMinutes, setTimeMinutes] = useState<number>(12);
  const [timeSeconds, setTimeSeconds] = useState<number>(0);
  const [distance, setDistance] = useState<number>(1.5);
  const [method, setMethod] = useState<"cooper" | "rockport">("cooper");
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  const calculateVO2Max = () => {
    let vo2Max = 0;
    
    if (method === "cooper") {
      // Cooper 1.5-mile run test
      // VO2max = (483 / time in minutes) + 3.5
      const timeInMinutes = timeMinutes + (timeSeconds / 60);
      vo2Max = (483 / timeInMinutes) + 3.5;
    } else {
      // Rockport 1-mile walk test
      // For men: VO2max = 139.168 - (0.388 × age) - (0.077 × weight in lb) - (3.265 × time in min) - (0.156 × heart rate)
      // For women: VO2max = 139.168 - (0.388 × age) - (0.077 × weight in lb) - (3.265 × time in min) - (0.156 × heart rate)
      // Simplified version without weight
      const timeInMinutes = timeMinutes + (timeSeconds / 60);
      const baseVO2 = 88.768 - (0.388 * age) - (3.265 * timeInMinutes) - (0.156 * restingHR);
      vo2Max = gender === "male" ? baseVO2 + 8.8 : baseVO2;
    }
    
    // Round to two decimal places
    vo2Max = Math.round(vo2Max * 10) / 10;
    
    // Determine fitness category
    let fitnessCategory = "";
    if (gender === "male") {
      if (age < 30) {
        if (vo2Max >= 49.0) fitnessCategory = "Excellent";
        else if (vo2Max >= 43.9) fitnessCategory = "Good";
        else if (vo2Max >= 38.9) fitnessCategory = "Average";
        else if (vo2Max >= 33.9) fitnessCategory = "Fair";
        else fitnessCategory = "Poor";
      } else if (age < 40) {
        if (vo2Max >= 45.0) fitnessCategory = "Excellent";
        else if (vo2Max >= 39.9) fitnessCategory = "Good";
        else if (vo2Max >= 35.9) fitnessCategory = "Average";
        else if (vo2Max >= 30.9) fitnessCategory = "Fair";
        else fitnessCategory = "Poor";
      } else if (age < 50) {
        if (vo2Max >= 42.0) fitnessCategory = "Excellent";
        else if (vo2Max >= 36.9) fitnessCategory = "Good";
        else if (vo2Max >= 32.9) fitnessCategory = "Average";
        else if (vo2Max >= 27.9) fitnessCategory = "Fair";
        else fitnessCategory = "Poor";
      } else {
        if (vo2Max >= 39.0) fitnessCategory = "Excellent";
        else if (vo2Max >= 33.9) fitnessCategory = "Good";
        else if (vo2Max >= 29.9) fitnessCategory = "Average";
        else if (vo2Max >= 24.9) fitnessCategory = "Fair";
        else fitnessCategory = "Poor";
      }
    } else {
      if (age < 30) {
        if (vo2Max >= 45.0) fitnessCategory = "Excellent";
        else if (vo2Max >= 38.9) fitnessCategory = "Good";
        else if (vo2Max >= 33.9) fitnessCategory = "Average";
        else if (vo2Max >= 28.9) fitnessCategory = "Fair";
        else fitnessCategory = "Poor";
      } else if (age < 40) {
        if (vo2Max >= 42.0) fitnessCategory = "Excellent";
        else if (vo2Max >= 36.9) fitnessCategory = "Good";
        else if (vo2Max >= 31.9) fitnessCategory = "Average";
        else if (vo2Max >= 26.9) fitnessCategory = "Fair";
        else fitnessCategory = "Poor";
      } else if (age < 50) {
        if (vo2Max >= 38.0) fitnessCategory = "Excellent";
        else if (vo2Max >= 32.9) fitnessCategory = "Good";
        else if (vo2Max >= 28.9) fitnessCategory = "Average";
        else if (vo2Max >= 24.9) fitnessCategory = "Fair";
        else fitnessCategory = "Poor";
      } else {
        if (vo2Max >= 35.0) fitnessCategory = "Excellent";
        else if (vo2Max >= 30.9) fitnessCategory = "Good";
        else if (vo2Max >= 26.9) fitnessCategory = "Average";
        else if (vo2Max >= 22.9) fitnessCategory = "Fair";
        else fitnessCategory = "Poor";
      }
    }
    
    setResult(vo2Max);
    setCategory(fitnessCategory);
    setShowResults(true);
  };

  const getResultType = (category: string): "success" | "info" | "warning" | "error" => {
    switch (category) {
      case "Excellent": return "success";
      case "Good": return "success";
      case "Average": return "info";
      case "Fair": return "warning";
      case "Poor": return "error";
      default: return "info";
    }
  };

  const resetCalculator = () => {
    setShowResults(false);
    setResult(null);
    setCategory("");
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
                <div className="grid gap-4 md:grid-cols-2">
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
                  
                  <CalculatorNumberInput
                    label="Age"
                    value={age}
                    onChange={setAge}
                    min={18}
                    max={100}
                    unit="years"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Test Method</Label>
                  <RadioGroup 
                    defaultValue="cooper" 
                    value={method}
                    onValueChange={(value) => setMethod(value as "cooper" | "rockport")}
                    className="grid gap-4 md:grid-cols-2"
                  >
                    <div className="flex items-start space-x-2 border rounded-lg p-3">
                      <RadioGroupItem value="cooper" id="cooper" className="mt-1" />
                      <div>
                        <Label htmlFor="cooper" className="text-base">Cooper 1.5-mile Run Test</Label>
                        <p className="text-sm text-muted-foreground">Run 1.5 miles as fast as possible and record your time</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 border rounded-lg p-3">
                      <RadioGroupItem value="rockport" id="rockport" className="mt-1" />
                      <div>
                        <Label htmlFor="rockport" className="text-base">Rockport 1-mile Walk Test</Label>
                        <p className="text-sm text-muted-foreground">Briskly walk 1 mile and record your time and heart rate</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                {method === "rockport" && (
                  <CalculatorNumberInput
                    label="Resting Heart Rate"
                    value={restingHR}
                    onChange={setRestingHR}
                    min={40}
                    max={220}
                    unit="bpm"
                    required
                  />
                )}
                
                <div className="grid gap-4 md:grid-cols-3">
                  <CalculatorNumberInput
                    label={method === "cooper" ? "Distance" : "Distance"}
                    value={distance}
                    onChange={setDistance}
                    min={0.1}
                    max={10}
                    step={0.1}
                    unit="miles"
                    disabled={true}
                    description={method === "cooper" ? "Fixed at 1.5 miles" : "Fixed at 1 mile"}
                  />
                  
                  <CalculatorNumberInput
                    label="Minutes"
                    value={timeMinutes}
                    onChange={setTimeMinutes}
                    min={0}
                    max={60}
                    required
                  />
                  
                  <CalculatorNumberInput
                    label="Seconds"
                    value={timeSeconds}
                    onChange={setTimeSeconds}
                    min={0}
                    max={59}
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={resetCalculator}
                    disabled={!showResults}
                  >
                    Reset
                  </Button>
                  <Button onClick={calculateVO2Max}>Calculate</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="info" className="space-y-4">
              <h3 className="text-lg font-semibold">About VO2 Max</h3>
              <p>VO2 Max is the maximum amount of oxygen your body can utilize during intense exercise. It's a measure of aerobic fitness and cardiorespiratory endurance.</p>
              
              <h4 className="font-medium mt-4">Cooper 1.5-mile Run Test</h4>
              <p>This test requires you to run 1.5 miles as quickly as possible. Your VO2 Max is calculated based on how long it takes you to complete the distance.</p>
              
              <h4 className="font-medium mt-4">Rockport 1-mile Walk Test</h4>
              <p>This test is less strenuous and requires you to walk 1 mile at a brisk, steady pace. Your heart rate at the end of the mile is measured along with your time.</p>
              
              <h4 className="font-medium mt-4">VO2 Max Categories</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border rounded-lg mt-2">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Category</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Men (ml/kg/min)</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Women (ml/kg/min)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">Excellent</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">&gt;49</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">&gt;45</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">Good</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">44-49</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">38-45</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">Average</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">36-43</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">32-37</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">Fair</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">30-35</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">27-31</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">Poor</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">&lt;30</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">&lt;27</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showResults && result !== null && (
        <CalculatorResult 
          title="VO2 Max Estimation Results" 
          description="Based on your test performance"
        >
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold">{result} ml/kg/min</p>
              <p className="text-lg text-muted-foreground">Your estimated VO2 Max</p>
            </div>
            
            <ResultAlert type={getResultType(category)} title="Fitness Category">
              <span className="font-bold">{category}</span>
            </ResultAlert>
            
            <div className="pt-4 space-y-2">
              <h4 className="font-medium">What this means:</h4>
              <p className="text-sm">VO2 Max is considered the best indicator of cardiovascular fitness and aerobic endurance. Higher values indicate better cardiorespiratory fitness.</p>
              
              <div className="mt-2 flex items-start space-x-2">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Your results are specific to your age and gender.</p>
              </div>
              
              <div className="flex items-start space-x-2">
                <XCircleIcon className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">This is an estimate based on a field test, not a laboratory measurement.</p>
              </div>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
