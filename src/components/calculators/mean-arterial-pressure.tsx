import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { InfoIcon } from "lucide-react";
import { ResultAlert } from "@/components/calculator/calculator-result";

export function MeanArterialPressure() {
  const [systolicBP, setSystolicBP] = useState<number>(120);
  const [diastolicBP, setDiastolicBP] = useState<number>(80);
  const [heartRate, setHeartRate] = useState<number>(70);
  const [showResults, setShowResults] = useState(false);
  const [map, setMap] = useState<number>(0);
  const [mapMethod, setMapMethod] = useState<string>("");
  const [pulsePressure, setPulsePressure] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const calculateMAP = () => {
    // Standard MAP calculation
    const standardMap = diastolicBP + (1/3) * (systolicBP - diastolicBP);
    
    // Alternative MAP calculation considering heart rate
    // This is a simplified approximation - real calculations can be more complex
    let alternativeMap = standardMap;
    if (heartRate < 60) {
      // Bradycardia - longer diastole, so diastolic pressure contributes more
      alternativeMap = diastolicBP + (1/4) * (systolicBP - diastolicBP);
    } else if (heartRate > 100) {
      // Tachycardia - shorter diastole, so systolic pressure contributes more
      alternativeMap = diastolicBP + (2/5) * (systolicBP - diastolicBP);
    }
    
    // Calculate pulse pressure
    const pp = systolicBP - diastolicBP;
    
    // Use the standard calculation (more widely accepted)
    const mapValue = Math.round(standardMap);
    
    // Determine MAP category
    let mapCategory = "";
    if (mapValue < 70) mapCategory = "Low";
    else if (mapValue <= 100) mapCategory = "Normal";
    else if (mapValue <= 110) mapCategory = "Elevated";
    else if (mapValue <= 120) mapCategory = "High";
    else mapCategory = "Very High";
    
    setMap(mapValue);
    setMapMethod("Standard");
    setPulsePressure(pp);
    setCategory(mapCategory);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setShowResults(false);
    setMap(0);
    setMapMethod("");
    setPulsePressure(0);
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
                  <CalculatorNumberInput
                    label="Systolic Blood Pressure"
                    value={systolicBP}
                    onChange={setSystolicBP}
                    min={70}
                    max={250}
                    unit="mmHg"
                    description="Top number"
                    required
                  />
                  
                  <CalculatorNumberInput
                    label="Diastolic Blood Pressure"
                    value={diastolicBP}
                    onChange={setDiastolicBP}
                    min={40}
                    max={150}
                    unit="mmHg"
                    description="Bottom number"
                    required
                  />
                </div>
                
                <CalculatorNumberInput
                  label="Heart Rate (optional)"
                  value={heartRate}
                  onChange={setHeartRate}
                  min={40}
                  max={200}
                  unit="bpm"
                  description="For informational purposes"
                />
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={resetCalculator}
                    disabled={!showResults}
                  >
                    Reset
                  </Button>
                  <Button onClick={calculateMAP}>Calculate</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="info" className="space-y-4">
              <h3 className="text-lg font-semibold">About Mean Arterial Pressure (MAP)</h3>
              <p>Mean Arterial Pressure (MAP) is the average blood pressure during a single cardiac cycle. It is considered a better indicator of perfusion to vital organs than systolic blood pressure alone.</p>
              
              <div className="flex items-start space-x-2 bg-muted p-3 rounded-md mt-4">
                <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Clinical Use</h4>
                  <p className="text-sm">MAP is often used in intensive care settings to monitor patients. A MAP of at least 65 mmHg is typically necessary to ensure adequate blood flow to organs.</p>
                </div>
              </div>
              
              <h4 className="font-medium mt-4">MAP Calculation</h4>
              <p className="text-sm">The most commonly used formula for MAP is:</p>
              <div className="bg-muted p-3 rounded-md mt-2 text-center">
                <p className="font-medium">MAP = DBP + 1/3(SBP - DBP)</p>
                <p className="text-xs mt-1">Where DBP is diastolic blood pressure and SBP is systolic blood pressure</p>
              </div>
              
              <h4 className="font-medium mt-4">MAP Categories</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Low:</strong> &lt; 70 mmHg - May indicate shock or hypotension</li>
                <li><strong>Normal:</strong> 70-100 mmHg - Optimal range for most adults</li>
                <li><strong>Elevated:</strong> 101-110 mmHg - May indicate prehypertension</li>
                <li><strong>High:</strong> 111-120 mmHg - May indicate stage 1 hypertension</li>
                <li><strong>Very High:</strong> &gt; 120 mmHg - May indicate stage 2 hypertension</li>
              </ul>
              
              <p className="text-sm mt-4">Note: MAP values should be interpreted by a healthcare professional in the context of an individual's overall health status.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showResults && (
        <CalculatorResult title="Mean Arterial Pressure Results">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium dark:text-slate-200">Mean Arterial Pressure</h3>
                <p className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">{map} mmHg</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Calculated using {mapMethod}</p>
                <ResultAlert
                  type={map >= 70 && map <= 100 ? "success" : "warning"}
                  title={map >= 70 && map <= 100 ? "Normal Range" : "Outside Normal Range"}
                >
                  {map >= 70 && map <= 100
                    ? "Your mean arterial pressure is within normal limits"
                    : "Your mean arterial pressure is outside the normal range of 70-100 mmHg"}
                </ResultAlert>
              </div>

              <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium dark:text-slate-200">Pulse Pressure</h3>
                <p className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">{pulsePressure} mmHg</p>
                <ResultAlert
                  type={pulsePressure >= 40 && pulsePressure <= 60 ? "success" : "warning"}
                  title={pulsePressure >= 40 && pulsePressure <= 60 ? "Normal Range" : "Outside Normal Range"}
                >
                  {pulsePressure >= 40 && pulsePressure <= 60
                    ? "Your pulse pressure is within normal limits"
                    : "Your pulse pressure is outside the normal range of 40-60 mmHg"}
                </ResultAlert>
              </div>
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-300">
              <p>Note: Mean arterial pressure (MAP) represents the average pressure in your arteries during one cardiac cycle. Normal MAP typically ranges from 70 to 100 mmHg.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
