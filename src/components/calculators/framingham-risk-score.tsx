
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";
import { ResultAlert } from "@/components/calculator/calculator-result";

export function FraminghamRiskScore() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number>(50);
  const [totalCholesterol, setTotalCholesterol] = useState<number>(200);
  const [hdlCholesterol, setHdlCholesterol] = useState<number>(50);
  const [systolicBP, setSystolicBP] = useState<number>(120);
  const [smoker, setSmoker] = useState<"yes" | "no">("no");
  const [diabetes, setDiabetes] = useState<"yes" | "no">("no");
  const [showResults, setShowResults] = useState(false);
  const [riskScore, setRiskScore] = useState<number>(0);
  const [riskCategory, setRiskCategory] = useState<string>("");
  const [heartAge, setHeartAge] = useState<number>(0);

  const calculateRiskScore = () => {
    // This is a simplified implementation of the Framingham Risk Score
    // A full implementation would use the official coefficients and formulas
    let score = 0;
    
    // Age points
    if (gender === "male") {
      if (age < 35) score += 0;
      else if (age < 40) score += 2;
      else if (age < 45) score += 5;
      else if (age < 50) score += 7;
      else if (age < 55) score += 9;
      else if (age < 60) score += 11;
      else if (age < 65) score += 13;
      else if (age < 70) score += 15;
      else score += 16;
    } else {
      if (age < 35) score += 0;
      else if (age < 40) score += 2;
      else if (age < 45) score += 4;
      else if (age < 50) score += 6;
      else if (age < 55) score += 8;
      else if (age < 60) score += 10;
      else if (age < 65) score += 12;
      else if (age < 70) score += 14;
      else score += 16;
    }
    
    // Total Cholesterol points
    if (totalCholesterol < 160) score += 0;
    else if (totalCholesterol < 200) score += 1;
    else if (totalCholesterol < 240) score += 2;
    else if (totalCholesterol < 280) score += 3;
    else score += 4;
    
    // HDL points
    if (hdlCholesterol >= 60) score -= 1;
    else if (hdlCholesterol >= 50) score += 0;
    else if (hdlCholesterol >= 40) score += 1;
    else score += 2;
    
    // Systolic BP points
    if (systolicBP < 120) score += 0;
    else if (systolicBP < 130) score += 1;
    else if (systolicBP < 140) score += 2;
    else if (systolicBP < 160) score += 3;
    else score += 4;
    
    // Smoker points
    if (smoker === "yes") score += 4;
    
    // Diabetes points
    if (diabetes === "yes") score += 3;
    
    // Calculate 10-year risk percentage (simplified conversion)
    let riskPercentage = 0;
    
    if (gender === "male") {
      if (score < 0) riskPercentage = 1;
      else if (score < 5) riskPercentage = 2;
      else if (score < 7) riskPercentage = 3;
      else if (score < 8) riskPercentage = 4;
      else if (score < 9) riskPercentage = 5;
      else if (score < 10) riskPercentage = 6;
      else if (score < 11) riskPercentage = 8;
      else if (score < 12) riskPercentage = 10;
      else if (score < 14) riskPercentage = 12;
      else if (score < 15) riskPercentage = 16;
      else if (score < 17) riskPercentage = 20;
      else if (score < 18) riskPercentage = 25;
      else riskPercentage = 30;
    } else {
      if (score < 9) riskPercentage = 1;
      else if (score < 13) riskPercentage = 2;
      else if (score < 14) riskPercentage = 3;
      else if (score < 16) riskPercentage = 5;
      else if (score < 18) riskPercentage = 8;
      else if (score < 20) riskPercentage = 11;
      else if (score < 22) riskPercentage = 14;
      else if (score < 24) riskPercentage = 17;
      else if (score < 26) riskPercentage = 22;
      else if (score < 28) riskPercentage = 27;
      else riskPercentage = 30;
    }

    // Calculate heart age (simplified)
    const heartAgeValue = Math.max(30, Math.min(90, age + (riskPercentage > 5 ? (riskPercentage - 5) * 3 : 0)));
    
    // Set risk category
    let category = "";
    if (riskPercentage < 10) category = "Low Risk";
    else if (riskPercentage < 20) category = "Intermediate Risk";
    else category = "High Risk";
    
    setRiskScore(riskPercentage);
    setRiskCategory(category);
    setHeartAge(heartAgeValue);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setShowResults(false);
    setRiskScore(0);
    setRiskCategory("");
    setHeartAge(0);
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
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup 
                    defaultValue="male" 
                    value={gender}
                    onValueChange={(value) => setGender(value as "male" | "female")}
                    className="grid grid-cols-2 gap-2"
                  >
                    <div className="flex items-center space-x-2 border rounded-lg p-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <CalculatorNumberInput
                    label="Age"
                    value={age}
                    onChange={setAge}
                    min={30}
                    max={79}
                    step={1}
                    unit="years"
                    required
                  />
                  
                  <CalculatorNumberInput
                    label="Total Cholesterol"
                    value={totalCholesterol}
                    onChange={setTotalCholesterol}
                    min={100}
                    max={400}
                    unit="mg/dL"
                    required
                  />
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <CalculatorNumberInput
                    label="HDL Cholesterol"
                    value={hdlCholesterol}
                    onChange={setHdlCholesterol}
                    min={20}
                    max={100}
                    unit="mg/dL"
                    required
                  />
                  
                  <CalculatorNumberInput
                    label="Systolic Blood Pressure"
                    value={systolicBP}
                    onChange={setSystolicBP}
                    min={90}
                    max={200}
                    unit="mmHg"
                    required
                  />
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Smoker</Label>
                    <RadioGroup 
                      defaultValue="no" 
                      value={smoker}
                      onValueChange={(value) => setSmoker(value as "yes" | "no")}
                      className="grid grid-cols-2 gap-2"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-2">
                        <RadioGroupItem value="yes" id="smoker-yes" />
                        <Label htmlFor="smoker-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-2">
                        <RadioGroupItem value="no" id="smoker-no" />
                        <Label htmlFor="smoker-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Diabetes</Label>
                    <RadioGroup 
                      defaultValue="no" 
                      value={diabetes}
                      onValueChange={(value) => setDiabetes(value as "yes" | "no")}
                      className="grid grid-cols-2 gap-2"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-2">
                        <RadioGroupItem value="yes" id="diabetes-yes" />
                        <Label htmlFor="diabetes-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-2">
                        <RadioGroupItem value="no" id="diabetes-no" />
                        <Label htmlFor="diabetes-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={resetCalculator}
                    disabled={!showResults}
                  >
                    Reset
                  </Button>
                  <Button onClick={calculateRiskScore}>Calculate</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="info" className="space-y-4">
              <h3 className="text-lg font-semibold">About Framingham Risk Score</h3>
              <p>The Framingham Risk Score estimates the 10-year cardiovascular risk of an individual. It was developed based on data obtained from the Framingham Heart Study, to estimate the risk of developing coronary heart disease.</p>
              
              <div className="flex items-start space-x-2 bg-muted p-3 rounded-md mt-4">
                <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Important Note</h4>
                  <p className="text-sm">This calculator is for educational purposes only. Always consult with a healthcare professional for a thorough assessment of your cardiovascular risk.</p>
                </div>
              </div>
              
              <h4 className="font-medium mt-4">Risk Factors</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Age and gender</li>
                <li>Total cholesterol</li>
                <li>HDL cholesterol</li>
                <li>Systolic blood pressure</li>
                <li>Treatment for high blood pressure</li>
                <li>Smoking</li>
                <li>Diabetes</li>
              </ul>
              
              <h4 className="font-medium mt-4">Risk Categories</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Low Risk:</strong> Less than 10% risk of developing cardiovascular disease in the next 10 years</li>
                <li><strong>Intermediate Risk:</strong> 10-20% risk</li>
                <li><strong>High Risk:</strong> Greater than 20% risk</li>
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showResults && (
        <CalculatorResult 
          title="Framingham Risk Score Results" 
          description="10-year cardiovascular disease risk assessment"
        >
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-4xl font-bold">{riskScore}%</p>
              <p className="text-lg text-muted-foreground">10-Year Risk</p>
              <div className="mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  riskCategory === "Low Risk" ? "bg-green-100 text-green-800" : 
                  riskCategory === "Intermediate Risk" ? "bg-yellow-100 text-yellow-800" : 
                  "bg-red-100 text-red-800"
                }`}>
                  {riskCategory}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Estimated Heart Age</h4>
              <p className="text-2xl font-semibold">{heartAge} years</p>
              {heartAge > age && (
                <ResultAlert type="warning" title="Heart Age Warning">
                  Your estimated heart age is {heartAge - age} years older than your actual age, which suggests elevated cardiovascular risk.
                </ResultAlert>
              )}
            </div>
            
            <div className="space-y-2 bg-muted p-4 rounded-lg">
              <h4 className="font-medium">Recommendations</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {riskScore >= 10 && <li>Consider discussing your results with a healthcare provider</li>}
                {totalCholesterol > 200 && <li>Work on lowering your total cholesterol levels</li>}
                {hdlCholesterol < 40 && <li>Consider strategies to increase your HDL ("good") cholesterol</li>}
                {systolicBP > 130 && <li>Monitor your blood pressure regularly</li>}
                {smoker === "yes" && <li>Quitting smoking can significantly reduce your cardiovascular risk</li>}
                <li>Maintain a healthy diet and regular physical activity</li>
              </ul>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
