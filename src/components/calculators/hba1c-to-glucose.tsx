
import { useState } from "react";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { Button } from "@/components/ui/button";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function HbA1cToGlucose() {
  const [hba1c, setHba1c] = useState<number>(5.7);
  const [showResults, setShowResults] = useState(false);
  const [outputUnit, setOutputUnit] = useState<string>("mgdl");

  // Calculate the eAG (estimated Average Glucose)
  const calculateAverageGlucose = () => {
    // Using the formula: eAG (mg/dL) = 28.7 × A1C − 46.7
    const eAGmgdl = (28.7 * hba1c) - 46.7;
    
    // Convert to mmol/L if needed
    const eAGmmol = eAGmgdl / 18;
    
    return {
      mgdl: Math.round(eAGmgdl),
      mmol: parseFloat(eAGmmol.toFixed(1))
    };
  };

  const getDiabetesStatus = (a1c: number) => {
    if (a1c < 5.7) return { status: "Normal", color: "success", description: "HbA1c levels below 5.7% are considered normal." };
    if (a1c < 6.5) return { status: "Prediabetes", color: "warning", description: "HbA1c levels between 5.7% and 6.4% suggest prediabetes." };
    return { status: "Diabetes", color: "error", description: "HbA1c levels of 6.5% or higher indicate diabetes." };
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const result = calculateAverageGlucose();
  const diabetesStatus = getDiabetesStatus(hba1c);

  // Time in Range and risk interpretation
  const getTimeInRange = (a1c: number) => {
    // This is an approximation based on research
    if (a1c <= 5.7) return "> 90%";
    if (a1c <= 6.0) return "~85%";
    if (a1c <= 6.5) return "~75%";
    if (a1c <= 7.0) return "~60%";
    if (a1c <= 7.5) return "~50%";
    if (a1c <= 8.0) return "~40%";
    if (a1c <= 9.0) return "~25%";
    return "< 15%";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <CalculatorNumberInput
              label="HbA1c"
              value={hba1c}
              onChange={setHba1c}
              min={4.0}
              max={15.0}
              step={0.1}
              unit="%"
              description="Glycated hemoglobin percentage"
              required
            />
            
            <div className="space-y-2">
              <Label>Preferred Result Unit</Label>
              <RadioGroup
                value={outputUnit}
                onValueChange={setOutputUnit}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mgdl" id="mgdl" />
                  <Label htmlFor="mgdl">mg/dL</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mmol" id="mmol" />
                  <Label htmlFor="mmol">mmol/L</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <Button className="w-full mt-6" onClick={handleCalculate}>
            Calculate Average Glucose
          </Button>
        </CardContent>
      </Card>
      
      {showResults && (
        <CalculatorResult title="HbA1c to Estimated Average Glucose">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-muted rounded-md text-center">
                <h3 className="text-lg font-medium">HbA1c</h3>
                <p className="text-4xl font-bold mt-2">{hba1c}%</p>
                <p className={`text-sm font-semibold mt-2 text-${diabetesStatus.color}-600`}>
                  {diabetesStatus.status}
                </p>
              </div>
              
              <div className="p-5 bg-muted rounded-md text-center">
                <h3 className="text-lg font-medium">Estimated Average Glucose</h3>
                <p className="text-4xl font-bold mt-2">
                  {outputUnit === "mgdl" ? result.mgdl : result.mmol}
                  <span className="text-lg ml-1">{outputUnit === "mgdl" ? "mg/dL" : "mmol/L"}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Also available in {outputUnit === "mgdl" ? `${result.mmol} mmol/L` : `${result.mgdl} mg/dL`}
                </p>
              </div>
            </div>
            
            <ResultAlert 
              type={
                diabetesStatus.status === "Normal" 
                  ? "success" 
                  : diabetesStatus.status === "Prediabetes" 
                  ? "warning" 
                  : "error"
              } 
              title={diabetesStatus.status}
            >
              {diabetesStatus.description}
            </ResultAlert>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-3">Additional Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium text-sm">Time in Target Range</h4>
                  <p className="text-xl font-bold mt-1">{getTimeInRange(hba1c)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Percentage of time glucose is within target range (70-180 mg/dL)
                  </p>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium text-sm">Glucometer Value (Approx)</h4>
                  <p className="text-xl font-bold mt-1">
                    {outputUnit === "mgdl" ? `${result.mgdl - 15}-${result.mgdl + 15} mg/dL` : `${(result.mmol - 0.8).toFixed(1)}-${(result.mmol + 0.8).toFixed(1)} mmol/L`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Typical range you might see on a glucometer
                  </p>
                </div>
              </div>
              
              <div className="text-sm mt-4">
                <h4 className="font-semibold mb-2">Categories of Glycemic Control:</h4>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="p-2 text-left border">HbA1c</th>
                      <th className="p-2 text-left border">Average Glucose (mg/dL)</th>
                      <th className="p-2 text-left border">Average Glucose (mmol/L)</th>
                      <th className="p-2 text-left border">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border">Less than 5.7%</td>
                      <td className="p-2 border">Less than 117</td>
                      <td className="p-2 border">Less than 6.5</td>
                      <td className="p-2 border text-green-600 font-medium">Normal</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">5.7% to 6.4%</td>
                      <td className="p-2 border">117 to 137</td>
                      <td className="p-2 border">6.5 to 7.6</td>
                      <td className="p-2 border text-yellow-600 font-medium">Prediabetes</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">6.5% or higher</td>
                      <td className="p-2 border">140 or higher</td>
                      <td className="p-2 border">7.8 or higher</td>
                      <td className="p-2 border text-red-600 font-medium">Diabetes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
