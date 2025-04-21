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
        <CalculatorResult title="Framingham Risk Score Results">
          <div className="space-y-6">
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-medium dark:text-slate-200">10-Year CVD Risk</h3>
              <p className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">{riskScore}%</p>
              <ResultAlert
                type={
                  riskScore < 10 ? "success" :
                  riskScore < 20 ? "warning" : "error"
                }
                title={
                  riskScore < 10 ? "Low Risk" :
                  riskScore < 20 ? "Intermediate Risk" : "High Risk"
                }
              >
                {riskScore < 10 
                  ? "Your 10-year risk of cardiovascular disease is low"
                  : riskScore < 20
                  ? "Your risk is intermediate, consider lifestyle modifications"
                  : "Your risk is high, consult with a healthcare provider"}
              </ResultAlert>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Heart Age</p>
                <p className="text-2xl font-bold text-blue-950 dark:text-blue-50">
                  {heartAge} years
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {heartAge > age ? `${heartAge - age} years older than your actual age` : 
                   heartAge < age ? `${age - heartAge} years younger than your actual age` :
                   "Same as your actual age"}
                </p>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm font-medium text-green-900 dark:text-green-100">Risk Category</p>
                <p className="text-2xl font-bold text-green-950 dark:text-green-50">
                  {riskCategory}
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Based on your risk factors
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-slate-900 dark:text-slate-100">Risk Factors Analysis</h3>
              <div className="grid gap-3">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                        Cholesterol Profile
                      </p>
                      <p className="text-lg font-bold text-yellow-950 dark:text-yellow-50">
                        Total: {totalCholesterol} mg/dL | HDL: {hdlCholesterol} mg/dL
                      </p>
                    </div>
                    <div className="text-sm text-yellow-700 dark:text-yellow-300">
                      {totalCholesterol < 200 ? "Optimal" : totalCholesterol < 240 ? "Borderline" : "High"}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                        Blood Pressure
                      </p>
                      <p className="text-lg font-bold text-orange-950 dark:text-orange-50">
                        {systolicBP} mmHg
                      </p>
                    </div>
                    <div className="text-sm text-orange-700 dark:text-orange-300">
                      {systolicBP < 120 ? "Normal" : systolicBP < 140 ? "Elevated" : "High"}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-red-900 dark:text-red-100">
                        Additional Risk Factors
                      </p>
                      <p className="text-lg font-bold text-red-950 dark:text-red-50">
                        {[
                          smoker === "yes" ? "Smoker" : null,
                          diabetes === "yes" ? "Diabetes" : null
                        ].filter(Boolean).join(", ") || "None"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-300">
              <p>Note: The Framingham Risk Score estimates your 10-year risk of developing cardiovascular disease. This tool should be used in consultation with healthcare providers for proper interpretation and recommendations.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
