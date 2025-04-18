
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
        <CalculatorResult title="Smoking Health Risk Assessment">
          <div className="space-y-4">
            {smokerStatus !== "never" && (
              <div className="p-6 bg-blue-50 border border-blue-100 rounded-lg text-center">
                <h3 className="text-lg font-medium">Pack-Years</h3>
                <p className="text-4xl font-bold mt-2">{packYears.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  A pack-year is equivalent to smoking one pack (20 cigarettes) per day for one year
                </p>
              </div>
            )}
            
            {smokerStatus !== "never" && (
              <div className={`p-6 bg-${riskLevel.color}-50 border border-${riskLevel.color}-200 rounded-lg`}>
                <h3 className="text-lg font-medium mb-2">Overall Risk Level</h3>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full bg-${riskLevel.color}-500 flex items-center justify-center text-white font-bold`}>
                    {riskLevel.level.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-xl">{riskLevel.level} Risk</p>
                    <p className="text-sm text-muted-foreground">Based on your smoking history</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Disease Risk Factors</h3>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Lung Cancer</span>
                    <span className={`font-bold ${lungCancerRisk > 1.5 ? "text-red-500" : "text-green-500"}`}>
                      {lungCancerRisk}x
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Compared to a non-smoker</p>
                </div>
                
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>COPD (Emphysema/Bronchitis)</span>
                    <span className={`font-bold ${copdRisk > 1.5 ? "text-red-500" : "text-green-500"}`}>
                      {copdRisk}x
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Compared to a non-smoker</p>
                </div>
                
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Heart Disease</span>
                    <span className={`font-bold ${heartDiseaseRisk > 1.5 ? "text-red-500" : "text-green-500"}`}>
                      {heartDiseaseRisk}x
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Compared to a non-smoker</p>
                </div>
                
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Stroke</span>
                    <span className={`font-bold ${strokeRisk > 1.5 ? "text-red-500" : "text-green-500"}`}>
                      {strokeRisk}x
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Compared to a non-smoker</p>
                </div>
              </div>
            </div>
            
            {smokerStatus !== "never" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-md font-medium mb-1">Estimated Life Years Lost</h3>
                <p className="text-xl font-bold">
                  {lifeYearsLost} years
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Estimated reduction in life expectancy compared to non-smokers
                </p>
              </div>
            )}
            
            {smokerStatus === "current" && (
              <ResultAlert type="warning" title="Benefits of Quitting">
                <p>Quitting smoking at any age can significantly reduce your health risks:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Within 20 minutes: Your heart rate drops.</li>
                  <li>Within 12 hours: Carbon monoxide levels in your blood drop to normal.</li>
                  <li>Within 2 weeks to 3 months: Your circulation improves and lung function increases.</li>
                  <li>Within 1 to 9 months: Coughing and shortness of breath decrease.</li>
                  <li>Within 1 year: Your risk of coronary heart disease is about half that of a smoker's.</li>
                  <li>Within 5 years: Your stroke risk is reduced to that of a nonsmoker.</li>
                  <li>Within 10 years: Your lung cancer death rate is about half that of a smoker's.</li>
                </ul>
              </ResultAlert>
            )}
            
            {smokerStatus === "former" && (
              <ResultAlert type="success" title="Congratulations on Quitting!">
                <p>By quitting smoking {yearsQuit} years ago, you've already reduced your health risks significantly.</p>
                <p className="mt-2">Continue to maintain a healthy lifestyle to further improve your health outcomes.</p>
              </ResultAlert>
            )}
            
            <div className="text-sm text-muted-foreground mt-4">
              <p><strong>Note:</strong> This calculator provides estimates based on population averages. Individual risks may vary based on genetics, environment, and other health factors. These results are not a substitute for medical advice. Consult with a healthcare provider for personalized risk assessment.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
