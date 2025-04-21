import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { InfoIcon } from "lucide-react";
import { ResultAlert } from "@/components/calculator/calculator-result";

export function CholesterolRatioCalculator() {
  const [totalCholesterol, setTotalCholesterol] = useState<number>(200);
  const [hdlCholesterol, setHdlCholesterol] = useState<number>(50);
  const [ldlCholesterol, setLdlCholesterol] = useState<number>(130);
  const [triglycerides, setTriglycerides] = useState<number>(150);
  const [showResults, setShowResults] = useState(false);
  const [tcHdlRatio, setTcHdlRatio] = useState<number>(0);
  const [ldlHdlRatio, setLdlHdlRatio] = useState<number>(0);
  const [nonHdl, setNonHdl] = useState<number>(0);
  const [triglyceridesHdlRatio, setTriglyceridesHdlRatio] = useState<number>(0);

  const calculateRatios = () => {
    // Total Cholesterol to HDL ratio
    const tcToHdl = parseFloat((totalCholesterol / hdlCholesterol).toFixed(1));
    
    // LDL to HDL ratio
    const ldlToHdl = parseFloat((ldlCholesterol / hdlCholesterol).toFixed(1));
    
    // Non-HDL Cholesterol
    const nonHdlValue = totalCholesterol - hdlCholesterol;
    
    // Triglycerides to HDL ratio
    const trigToHdl = parseFloat((triglycerides / hdlCholesterol).toFixed(1));
    
    setTcHdlRatio(tcToHdl);
    setLdlHdlRatio(ldlToHdl);
    setNonHdl(nonHdlValue);
    setTriglyceridesHdlRatio(trigToHdl);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setShowResults(false);
    setTcHdlRatio(0);
    setLdlHdlRatio(0);
    setNonHdl(0);
    setTriglyceridesHdlRatio(0);
  };

  // Helper function to determine risk level for each ratio
  const getRiskLevel = (ratio: string, value: number) => {
    if (ratio === "tcHdl") {
      if (value < 3.5) return "Low";
      if (value < 5) return "Average";
      return "High";
    } else if (ratio === "ldlHdl") {
      if (value < 2) return "Low";
      if (value < 3.5) return "Average";
      return "High";
    } else if (ratio === "nonHdl") {
      if (value < 130) return "Optimal";
      if (value < 160) return "Above Optimal";
      if (value < 190) return "Borderline High";
      return "High";
    } else if (ratio === "trigHdl") {
      if (value < 2) return "Ideal";
      if (value < 4) return "Good";
      return "High";
    }
    return "Unknown";
  };

  // Helper function to get styling for risk levels
  const getRiskStyling = (level: string) => {
    switch (level) {
      case "Low":
      case "Optimal":
      case "Ideal":
        return "bg-green-100 text-green-800";
      case "Average":
      case "Good":
      case "Above Optimal":
        return "bg-yellow-100 text-yellow-800";
      case "Borderline High":
        return "bg-orange-100 text-orange-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
                    label="Total Cholesterol"
                    value={totalCholesterol}
                    onChange={setTotalCholesterol}
                    min={100}
                    max={400}
                    unit="mg/dL"
                    required
                  />
                  
                  <CalculatorNumberInput
                    label="HDL Cholesterol"
                    value={hdlCholesterol}
                    onChange={setHdlCholesterol}
                    min={20}
                    max={100}
                    unit="mg/dL"
                    description="'Good' cholesterol"
                    required
                  />
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <CalculatorNumberInput
                    label="LDL Cholesterol"
                    value={ldlCholesterol}
                    onChange={setLdlCholesterol}
                    min={40}
                    max={300}
                    unit="mg/dL"
                    description="'Bad' cholesterol"
                    required
                  />
                  
                  <CalculatorNumberInput
                    label="Triglycerides"
                    value={triglycerides}
                    onChange={setTriglycerides}
                    min={50}
                    max={500}
                    unit="mg/dL"
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
                  <Button onClick={calculateRatios}>Calculate</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="info" className="space-y-4">
              <h3 className="text-lg font-semibold">About Cholesterol Ratios</h3>
              <p>Cholesterol ratios are an important indicator of cardiovascular health. These ratios can provide a more comprehensive picture of your cardiovascular risk than individual cholesterol measurements alone.</p>
              
              <div className="flex items-start space-x-2 bg-muted p-3 rounded-md mt-4">
                <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Medical Advice</h4>
                  <p className="text-sm">This calculator is for educational purposes only. Always consult with a healthcare professional for interpretation of your cholesterol results.</p>
                </div>
              </div>
              
              <h4 className="font-medium mt-4">Key Cholesterol Ratios</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Total Cholesterol to HDL Ratio:</strong> A lower ratio indicates a lower risk of heart disease. Aim for a ratio below 5:1, with optimal levels below 3.5:1.</li>
                <li><strong>LDL to HDL Ratio:</strong> This ratio should ideally be below 3:1, with optimal levels below 2:1.</li>
                <li><strong>Non-HDL Cholesterol:</strong> This is your total cholesterol minus HDL, and represents all the "bad" types of cholesterol. Target levels depend on your cardiovascular risk.</li>
                <li><strong>Triglycerides to HDL Ratio:</strong> This ratio is an indicator of insulin resistance and metabolic health. A ratio below 2:1 is considered ideal.</li>
              </ul>
              
              <h4 className="font-medium mt-4">Improving Your Cholesterol Profile</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Maintain a heart-healthy diet rich in fruits, vegetables, whole grains, and lean proteins</li>
                <li>Regular physical activity</li>
                <li>Achieve and maintain a healthy weight</li>
                <li>Limit saturated and trans fats</li>
                <li>Quit smoking</li>
                <li>Limit alcohol consumption</li>
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showResults && (
        <CalculatorResult title="Cholesterol Ratio Results">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium dark:text-slate-200">Total/HDL Ratio</h3>
                <p className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">{tcHdlRatio}</p>
                <ResultAlert
                  type={tcHdlRatio <= 3.5 ? "success" : tcHdlRatio <= 5 ? "info" : "warning"}
                  title={tcHdlRatio <= 3.5 ? "Optimal" : tcHdlRatio <= 5 ? "Normal" : "Elevated"}
                >
                  {tcHdlRatio <= 3.5 
                    ? "Your ratio is in the optimal range"
                    : tcHdlRatio <= 5
                    ? "Your ratio is within normal limits"
                    : "Your ratio is above recommended levels"}
                </ResultAlert>
              </div>

              <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium dark:text-slate-200">LDL/HDL Ratio</h3>
                <p className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">{ldlHdlRatio}</p>
                <ResultAlert
                  type={ldlHdlRatio <= 2.3 ? "success" : ldlHdlRatio <= 3.3 ? "info" : "warning"}
                  title={ldlHdlRatio <= 2.3 ? "Optimal" : ldlHdlRatio <= 3.3 ? "Normal" : "Elevated"}
                >
                  {ldlHdlRatio <= 2.3
                    ? "Your ratio indicates good cardiovascular health"
                    : ldlHdlRatio <= 3.3
                    ? "Your ratio is within acceptable limits"
                    : "Your ratio suggests increased cardiovascular risk"}
                </ResultAlert>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium dark:text-slate-200">Non-HDL Cholesterol</h3>
                <p className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">{nonHdl} mg/dL</p>
                <ResultAlert
                  type={nonHdl < 130 ? "success" : nonHdl < 160 ? "info" : "warning"}
                  title={nonHdl < 130 ? "Optimal" : nonHdl < 160 ? "Near Optimal" : "Elevated"}
                >
                  {nonHdl < 130
                    ? "Your non-HDL cholesterol is in the optimal range"
                    : nonHdl < 160
                    ? "Your non-HDL cholesterol is near optimal"
                    : "Your non-HDL cholesterol is above recommended levels"}
                </ResultAlert>
              </div>

              <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium dark:text-slate-200">Triglycerides/HDL Ratio</h3>
                <p className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">{triglyceridesHdlRatio}</p>
                <ResultAlert
                  type={triglyceridesHdlRatio <= 2 ? "success" : triglyceridesHdlRatio <= 4 ? "info" : "warning"}
                  title={triglyceridesHdlRatio <= 2 ? "Optimal" : triglyceridesHdlRatio <= 4 ? "Normal" : "Elevated"}
                >
                  {triglyceridesHdlRatio <= 2
                    ? "Your ratio indicates good metabolic health"
                    : triglyceridesHdlRatio <= 4
                    ? "Your ratio is within normal limits"
                    : "Your ratio suggests increased metabolic risk"}
                </ResultAlert>
              </div>
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-300">
              <p>Note: These ratios are important indicators of cardiovascular health. Consult with your healthcare provider for personalized interpretation of your results.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
