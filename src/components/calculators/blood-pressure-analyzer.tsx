import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { HeartPulseIcon, InfoIcon } from "lucide-react";

interface BPCategory {
  name: string;
  systolic: [number, number];
  diastolic: [number, number];
  description: string;
  type: "success" | "info" | "warning" | "error";
}

const bpCategories: BPCategory[] = [
  {
    name: "Normal",
    systolic: [0, 119],
    diastolic: [0, 79],
    description: "Your blood pressure is considered normal. Continue to maintain healthy habits.",
    type: "success"
  },
  {
    name: "Elevated",
    systolic: [120, 129],
    diastolic: [0, 79],
    description: "Your blood pressure is slightly elevated. Consider lifestyle modifications to prevent hypertension.",
    type: "info"
  },
  {
    name: "Hypertension Stage 1",
    systolic: [130, 139],
    diastolic: [80, 89],
    description: "You have Stage 1 hypertension. Lifestyle changes and possibly medication may be recommended.",
    type: "warning"
  },
  {
    name: "Hypertension Stage 2",
    systolic: [140, 180],
    diastolic: [90, 120],
    description: "You have Stage 2 hypertension. Lifestyle changes and medication are typically recommended.",
    type: "error"
  },
  {
    name: "Hypertensive Crisis",
    systolic: [181, 300],
    diastolic: [121, 200],
    description: "This is a hypertensive crisis requiring immediate medical attention. Consult a doctor immediately.",
    type: "error"
  },
  {
    name: "Low Blood Pressure",
    systolic: [0, 89],
    diastolic: [0, 59],
    description: "Your blood pressure is low. This may or may not cause symptoms. Consult with a healthcare provider if you're experiencing symptoms.",
    type: "warning"
  }
];

export function BloodPressureAnalyzer() {
  const [systolic, setSystolic] = useState<number>(120);
  const [diastolic, setDiastolic] = useState<number>(80);
  const [showResults, setShowResults] = useState(false);
  const [category, setCategory] = useState<BPCategory | null>(null);
  const [pulseRate, setPulseRate] = useState<number>(70);
  const [meanArterialPressure, setMeanArterialPressure] = useState<number>(0);
  const [pulsePressure, setPulsePressure] = useState<number>(0);

  const analyzeBP = () => {
    // Validate inputs
    if (systolic <= 0 || diastolic <= 0 || systolic > 300 || diastolic > 200) {
      return;
    }
    
    // Determine BP category
    let matchedCategory: BPCategory | null = null;
    
    // Special case for hypertensive crisis
    if (systolic > 180 || diastolic > 120) {
      matchedCategory = bpCategories.find(cat => cat.name === "Hypertensive Crisis") || null;
    } 
    // Special case for low blood pressure
    else if (systolic < 90 || diastolic < 60) {
      matchedCategory = bpCategories.find(cat => cat.name === "Low Blood Pressure") || null;
    }
    // Check other categories
    else {
      // First check diastolic as it takes precedence in some cases
      const diastolicCategory = bpCategories.find(
        cat => diastolic >= cat.diastolic[0] && diastolic <= cat.diastolic[1] &&
              systolic >= cat.systolic[0] && systolic <= cat.systolic[1]
      );
      
      if (diastolicCategory) {
        matchedCategory = diastolicCategory;
      } else {
        // If no category matches both, use the higher category
        const systolicCategory = bpCategories.find(
          cat => systolic >= cat.systolic[0] && systolic <= cat.systolic[1]
        );
        
        const diastolicOnlyCategory = bpCategories.find(
          cat => diastolic >= cat.diastolic[0] && diastolic <= cat.diastolic[1]
        );
        
        // Choose the more severe category
        if (systolicCategory && diastolicOnlyCategory) {
          const systolicIndex = bpCategories.indexOf(systolicCategory);
          const diastolicIndex = bpCategories.indexOf(diastolicOnlyCategory);
          
          matchedCategory = systolicIndex > diastolicIndex ? systolicCategory : diastolicOnlyCategory;
        } else {
          matchedCategory = systolicCategory || diastolicOnlyCategory || null;
        }
      }
    }
    
    // Calculate Mean Arterial Pressure (MAP)
    // MAP ≈ (SBP + 2 × DBP) / 3
    const map = Math.round((systolic + (2 * diastolic)) / 3);
    
    // Calculate Pulse Pressure (PP)
    // PP = SBP - DBP
    const pp = systolic - diastolic;
    
    setCategory(matchedCategory);
    setMeanArterialPressure(map);
    setPulsePressure(pp);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setShowResults(false);
    setCategory(null);
    setMeanArterialPressure(0);
    setPulsePressure(0);
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
                    value={systolic}
                    onChange={setSystolic}
                    min={50}
                    max={250}
                    unit="mmHg"
                    required
                    description="Upper number, when heart contracts"
                  />
                  
                  <CalculatorNumberInput
                    label="Diastolic Blood Pressure"
                    value={diastolic}
                    onChange={setDiastolic}
                    min={30}
                    max={150}
                    unit="mmHg"
                    required
                    description="Lower number, when heart relaxes"
                  />
                </div>
                
                <CalculatorNumberInput
                  label="Pulse Rate"
                  value={pulseRate}
                  onChange={setPulseRate}
                  min={40}
                  max={220}
                  unit="bpm"
                  description="Optional, heart beats per minute"
                />
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={resetCalculator}
                    disabled={!showResults}
                  >
                    Reset
                  </Button>
                  <Button onClick={analyzeBP}>Analyze</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="info" className="space-y-4">
              <h3 className="text-lg font-semibold">About Blood Pressure</h3>
              <p>Blood pressure is the pressure of circulating blood against the walls of blood vessels. It's measured in millimeters of mercury (mmHg) and recorded as two numbers:</p>
              
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Systolic pressure:</strong> The pressure when the heart contracts (the top number)</li>
                <li><strong>Diastolic pressure:</strong> The pressure when the heart relaxes between beats (the bottom number)</li>
              </ul>
              
              <h4 className="font-medium mt-4">Blood Pressure Categories</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border rounded-lg mt-2">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Category</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Systolic (mmHg)</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Diastolic (mmHg)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-green-600">Normal</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">Less than 120</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">Less than 80</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-blue-600">Elevated</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">120-129</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">Less than 80</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-yellow-600">Hypertension Stage 1</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">130-139</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">80-89</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-orange-600">Hypertension Stage 2</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">140 or higher</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">90 or higher</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-red-600">Hypertensive Crisis</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">Higher than 180</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">Higher than 120</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-muted p-3 rounded-md mt-4">
                <div className="flex items-start gap-2">
                  <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Medical Disclaimer</h4>
                    <p className="text-sm">This analyzer is for informational purposes only and is not a substitute for professional medical advice. Always consult with a healthcare provider for diagnosis and treatment.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showResults && category && (
        <CalculatorResult title="Blood Pressure Analysis">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium dark:text-slate-200">Blood Pressure Category</h3>
                <p className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">
                  {category.name}
                </p>
                <ResultAlert
                  type={category.type}
                  title={category.name}
                >
                  {category.description}
                </ResultAlert>
              </div>

              <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium dark:text-slate-200">Mean Arterial Pressure</h3>
                <p className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">
                  {meanArterialPressure} mmHg
                </p>
                <ResultAlert
                  type={meanArterialPressure >= 70 && meanArterialPressure <= 100 ? "success" : "warning"}
                  title={meanArterialPressure >= 70 && meanArterialPressure <= 100 ? "Normal" : "Outside Normal Range"}
                >
                  {meanArterialPressure >= 70 && meanArterialPressure <= 100
                    ? "Your mean arterial pressure is within the normal range"
                    : "Your mean arterial pressure is outside the normal range of 70-100 mmHg"}
                </ResultAlert>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium dark:text-slate-200">Pulse Pressure</h3>
                <p className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">
                  {pulsePressure} mmHg
                </p>
                <ResultAlert
                  type={pulsePressure >= 40 && pulsePressure <= 60 ? "success" : "warning"}
                  title={pulsePressure >= 40 && pulsePressure <= 60 ? "Normal" : "Outside Normal Range"}
                >
                  {pulsePressure >= 40 && pulsePressure <= 60
                    ? "Your pulse pressure is within the normal range"
                    : "Your pulse pressure is outside the normal range of 40-60 mmHg"}
                </ResultAlert>
              </div>

              {pulseRate && (
                <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-medium dark:text-slate-200">Pulse Rate</h3>
                  <p className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">
                    {pulseRate} bpm
                  </p>
                  <ResultAlert
                    type={pulseRate >= 60 && pulseRate <= 100 ? "success" : "warning"}
                    title={pulseRate >= 60 && pulseRate <= 100 ? "Normal" : "Outside Normal Range"}
                  >
                    {pulseRate >= 60 && pulseRate <= 100
                      ? "Your pulse rate is within the normal range"
                      : "Your pulse rate is outside the normal range of 60-100 bpm"}
                  </ResultAlert>
                </div>
              )}
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-300">
              <p>Note: These measurements provide important information about your cardiovascular health. Regular monitoring and consultation with healthcare providers is recommended for managing blood pressure.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
