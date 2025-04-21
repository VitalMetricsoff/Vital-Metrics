import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function SmokingRiskCalculator() {
  const [cigarettesPerDay, setCigarettesPerDay] = useState<number>(10);
  const [yearsSmoked, setYearsSmoked] = useState<number>(5);
  const [smokerStatus, setSmokerStatus] = useState<"current" | "former" | "never">("current");
  const [yearsQuit, setYearsQuit] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  
  const handleCalculate = () => {
    setShowResults(true);
  };
  
  const calculatePackYears = () => {
    return (cigarettesPerDay / 20) * yearsSmoked;
  };
  
  const getRiskLevel = (packYears: number) => {
    if (packYears < 10) return { level: "Low", color: "green" };
    if (packYears < 20) return { level: "Moderate", color: "yellow" };
    if (packYears < 40) return { level: "High", color: "orange" };
    return { level: "Very High", color: "red" };
  };
  
  const getRelativeRiskForDisease = (packYears: number, disease: string) => {
    let baseRisk = 1.0; // non-smoker relative risk
    let riskFactor = 1.0;
    
    switch (disease) {
      case "lung-cancer":
        if (packYears < 10) riskFactor = 3.0;
        else if (packYears < 20) riskFactor = 9.0;
        else if (packYears < 40) riskFactor = 16.0;
        else riskFactor = 25.0;
        break;
      case "copd":
        if (packYears < 10) riskFactor = 2.0;
        else if (packYears < 20) riskFactor = 4.0;
        else if (packYears < 40) riskFactor = 8.0;
        else riskFactor = 12.0;
        break;
      case "heart-disease":
        if (packYears < 10) riskFactor = 1.5;
        else if (packYears < 20) riskFactor = 2.5;
        else if (packYears < 40) riskFactor = 4.0;
        else riskFactor = 6.0;
        break;
      case "stroke":
        if (packYears < 10) riskFactor = 1.3;
        else if (packYears < 20) riskFactor = 2.0;
        else if (packYears < 40) riskFactor = 3.5;
        else riskFactor = 5.0;
        break;
    }
    
    // Adjust for former smokers based on years since quitting
    if (smokerStatus === "former") {
      // Risk decreases over time after quitting
      // Formula approximates risk reduction (simplified model)
      const reductionFactor = Math.min(yearsQuit / 20, 0.9); // Max 90% reduction after 20 years
      riskFactor = baseRisk + (riskFactor - baseRisk) * (1 - reductionFactor);
    } else if (smokerStatus === "never") {
      riskFactor = baseRisk;
    }
    
    return Math.round((riskFactor + Number.EPSILON) * 100) / 100;
  };
  
  const getLifeYearsLost = (packYears: number) => {
    let yearsLost = 0;
    
    if (packYears < 10) yearsLost = 5;
    else if (packYears < 20) yearsLost = 7;
    else if (packYears < 40) yearsLost = 9;
    else yearsLost = 13;
    
    // Adjust for former smokers based on years since quitting
    if (smokerStatus === "former") {
      // Years recovered after quitting (simplified model)
      const yearsRecovered = Math.min(yearsQuit * 0.25, yearsLost * 0.7); // Max 70% recovery
      yearsLost -= yearsRecovered;
    } else if (smokerStatus === "never") {
      yearsLost = 0;
    }
    
    return Math.round(yearsLost);
  };
  
  const packYears = calculatePackYears();
  const riskLevel = getRiskLevel(packYears);
  const lungCancerRisk = getRelativeRiskForDisease(packYears, "lung-cancer");
  const copdRisk = getRelativeRiskForDisease(packYears, "copd");
  const heartDiseaseRisk = getRelativeRiskForDisease(packYears, "heart-disease");
  const strokeRisk = getRelativeRiskForDisease(packYears, "stroke");
  const lifeYearsLost = getLifeYearsLost(packYears);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Smoking Status</Label>
              <RadioGroup
                value={smokerStatus}
                onValueChange={(value) => setSmokerStatus(value as "current" | "former" | "never")}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="current" id="current" />
                  <Label htmlFor="current">Current Smoker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="former" id="former" />
                  <Label htmlFor="former">Former Smoker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="never" />
                  <Label htmlFor="never">Never Smoked</Label>
                </div>
              </RadioGroup>
            </div>
            
            {smokerStatus !== "never" && (
              <>
                <CalculatorNumberInput
                  label="Cigarettes Per Day"
                  value={cigarettesPerDay}
                  onChange={setCigarettesPerDay}
                  min={1}
                  max={100}
                  description="Average number of cigarettes smoked per day"
                  required
                />
                
                <CalculatorNumberInput
                  label="Years Smoked"
                  value={yearsSmoked}
                  onChange={setYearsSmoked}
                  min={1}
                  max={70}
                  unit="years"
                  description="Total number of years as a smoker"
                  required
                />
              </>
            )}
            
            {smokerStatus === "former" && (
              <CalculatorNumberInput
                label="Years Since Quitting"
                value={yearsQuit}
                onChange={setYearsQuit}
                min={0}
                max={70}
                unit="years"
                description="How many years ago did you quit smoking?"
                required
              />
            )}
            
            <Button className="w-full mt-4" onClick={handleCalculate}>
              Calculate Smoking Risk
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {showResults && (
        <CalculatorResult title="Smoking Risk Assessment">
          <div className="space-y-6">
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-medium dark:text-slate-200">Pack Years</h3>
              <p className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">{calculatePackYears()}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {smokerStatus === "current" ? "Current Smoker" : smokerStatus === "former" ? "Former Smoker" : "Never Smoked"}
              </p>
            </div>

            {smokerStatus !== "never" && (
              <div className="space-y-4">
                <h3 className="font-medium text-slate-900 dark:text-slate-100">Risk Assessment</h3>
                <div className="grid gap-3">
                  <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm font-medium text-red-900 dark:text-red-100">Lung Cancer Risk</p>
                    <p className="text-2xl font-bold text-red-950 dark:text-red-50">
                      {calculatePackYears() < 20 ? "2-4x" : calculatePackYears() < 40 ? "4-8x" : "8-20x"}
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-300">Higher than non-smokers</p>
                  </div>

                  <div className="p-4 bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 rounded-lg">
                    <p className="text-sm font-medium text-orange-900 dark:text-orange-100">Heart Disease Risk</p>
                    <p className="text-2xl font-bold text-orange-950 dark:text-orange-50">
                      {calculatePackYears() < 20 ? "2-3x" : calculatePackYears() < 40 ? "3-5x" : "5-10x"}
                    </p>
                    <p className="text-sm text-orange-700 dark:text-orange-300">Higher than non-smokers</p>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">COPD Risk</p>
                    <p className="text-2xl font-bold text-yellow-950 dark:text-yellow-50">
                      {calculatePackYears() < 20 ? "3-5x" : calculatePackYears() < 40 ? "5-10x" : "10-15x"}
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">Higher than non-smokers</p>
                  </div>
                </div>
              </div>
            )}

            {smokerStatus === "former" && (
              <div className="p-6 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg">
                <h3 className="text-lg font-medium text-green-900 dark:text-green-100">Risk Reduction</h3>
                <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                  {yearsQuit < 5 
                    ? "Your risk of heart disease and stroke starts decreasing. Within 1 year, your risk is half that of a smoker."
                    : yearsQuit < 10
                    ? "Your risk of lung cancer is about half that of a current smoker. Heart disease risk continues to decrease."
                    : "Your risk of heart disease is similar to a non-smoker. Lung cancer risk is significantly reduced but remains higher than never-smokers."}
                </p>
              </div>
            )}

            <div className="text-sm text-slate-600 dark:text-slate-300">
              <p>Note: These risk estimates are based on population studies and may vary for individuals. Quitting smoking at any age provides significant health benefits.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
