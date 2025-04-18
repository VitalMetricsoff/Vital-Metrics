
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { InfoIcon } from "lucide-react";
import { ResultAlert } from "@/components/calculator/calculator-result";

export function PulsePressure() {
  const [systolicBP, setSystolicBP] = useState<number>(120);
  const [diastolicBP, setDiastolicBP] = useState<number>(80);
  const [age, setAge] = useState<number>(40);
  const [showResults, setShowResults] = useState(false);
  const [pulsePressure, setPulsePressure] = useState<number>(0);
  const [ppCategory, setPpCategory] = useState<string>("");
  const [ppRatio, setPpRatio] = useState<number>(0);
  const [expectedPp, setExpectedPp] = useState<number>(0);

  const calculatePulsePressure = () => {
    // Calculate pulse pressure
    const pp = systolicBP - diastolicBP;
    
    // Calculate pulse pressure to systolic ratio
    const ratio = parseFloat((pp / systolicBP).toFixed(2));
    
    // Calculate expected pulse pressure based on age (approximate formula)
    // This is a simplified model - real relationships are more complex
    const expected = Math.round(40 + (age - 30) * 0.5);
    
    // Determine PP category
    let category = "";
    if (pp < 40) category = "Narrow";
    else if (pp <= 60) category = "Normal";
    else if (pp <= 80) category = "Widened";
    else category = "Significantly Widened";
    
    setPulsePressure(pp);
    setPpCategory(category);
    setPpRatio(ratio);
    setExpectedPp(expected);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setShowResults(false);
    setPulsePressure(0);
    setPpCategory("");
    setPpRatio(0);
    setExpectedPp(0);
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
                  label="Age (optional)"
                  value={age}
                  onChange={setAge}
                  min={18}
                  max={120}
                  unit="years"
                  description="For comparison with age-expected values"
                />
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={resetCalculator}
                    disabled={!showResults}
                  >
                    Reset
                  </Button>
                  <Button onClick={calculatePulsePressure}>Calculate</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="info" className="space-y-4">
              <h3 className="text-lg font-semibold">About Pulse Pressure</h3>
              <p>Pulse pressure (PP) is the difference between systolic and diastolic blood pressure. It represents the force that your heart generates each time it contracts.</p>
              
              <div className="flex items-start space-x-2 bg-muted p-3 rounded-md mt-4">
                <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Clinical Significance</h4>
                  <p className="text-sm">Pulse pressure is an important indicator of cardiovascular health. Both abnormally high and low pulse pressures can indicate underlying cardiovascular issues.</p>
                </div>
              </div>
              
              <h4 className="font-medium mt-4">Pulse Pressure Categories</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Narrow (&lt;40 mmHg):</strong> May indicate heart failure, cardiac tamponade, or aortic stenosis</li>
                <li><strong>Normal (40-60 mmHg):</strong> Typical for healthy adults</li>
                <li><strong>Widened (61-80 mmHg):</strong> May indicate arterial stiffness, aortic regurgitation, or increased stroke volume</li>
                <li><strong>Significantly Widened (&gt;80 mmHg):</strong> May indicate severe arterial stiffness, aortic insufficiency, or hyperthyroidism</li>
              </ul>
              
              <h4 className="font-medium mt-4">Age and Pulse Pressure</h4>
              <p className="text-sm">Pulse pressure typically increases with age due to arterial stiffening. A healthy young adult might have a pulse pressure of 40 mmHg, while older adults might normally have higher values.</p>
              
              <p className="text-sm mt-4">Note: Pulse pressure should be interpreted by a healthcare professional alongside other cardiovascular measurements.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showResults && (
        <CalculatorResult 
          title="Pulse Pressure Results" 
          description="Your calculated pulse pressure and related metrics"
        >
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-4xl font-bold">{pulsePressure} mmHg</p>
              <p className="text-lg text-muted-foreground">Pulse Pressure</p>
              <div className="mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  ppCategory === "Normal" ? "bg-green-100 text-green-800" : 
                  ppCategory === "Narrow" ? "bg-blue-100 text-blue-800" : 
                  ppCategory === "Widened" ? "bg-yellow-100 text-yellow-800" : 
                  "bg-orange-100 text-orange-800"
                }`}>
                  {ppCategory}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-sm text-muted-foreground">Pulse Pressure/Systolic Ratio</h4>
                <p className="text-lg font-medium mt-1">{ppRatio}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  PP/SBP (typical range: 0.25-0.5)
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-sm text-muted-foreground">Age-Expected Pulse Pressure</h4>
                <p className="text-lg font-medium mt-1">{expectedPp} mmHg</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Estimated based on your age
                </p>
              </div>
            </div>
            
            {pulsePressure < 40 ? (
              <ResultAlert type="warning" title="Narrow Pulse Pressure">
                Your pulse pressure is below the normal range. Narrow pulse pressure may be associated with heart failure, cardiac tamponade, or aortic stenosis. Please consult with a healthcare professional.
              </ResultAlert>
            ) : pulsePressure <= 60 ? (
              <ResultAlert type="success" title="Normal Pulse Pressure">
                Your pulse pressure is within the normal range for adults.
              </ResultAlert>
            ) : pulsePressure <= 80 ? (
              <ResultAlert type="info" title="Widened Pulse Pressure">
                Your pulse pressure is higher than the normal range. Widened pulse pressure may indicate increased arterial stiffness. Consider discussing with a healthcare provider.
              </ResultAlert>
            ) : (
              <ResultAlert type="warning" title="Significantly Widened Pulse Pressure">
                Your pulse pressure is significantly higher than the normal range. This may indicate arterial stiffness or other cardiovascular conditions. Please consult with a healthcare professional.
              </ResultAlert>
            )}
            
            <div className="bg-muted p-4 rounded-lg text-sm">
              <h4 className="font-medium">Understanding Your Results</h4>
              <p className="mt-1">Pulse pressure is influenced by cardiac output, arterial stiffness, and the timing of reflected waves from the periphery. Both abnormally high and low values may warrant further evaluation, especially if they differ significantly from age-expected values.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
