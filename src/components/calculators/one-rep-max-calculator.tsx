
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";

type FormulaType = "brzycki" | "epley" | "lander" | "lombardi" | "average";

export function OneRepMaxCalculator() {
  const [weight, setWeight] = useState<number>(100);
  const [reps, setReps] = useState<number>(8);
  const [formula, setFormula] = useState<FormulaType>("average");
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [percentages, setPercentages] = useState<{[key: string]: number}>({});

  const calculateOneRepMax = () => {
    let oneRepMax = 0;
    
    // Calculate 1RM using different formulas
    const brzyckiRM = weight * (36 / (37 - reps));
    const epleyRM = weight * (1 + 0.0333 * reps);
    const landerRM = (100 * weight) / (101.3 - 2.67123 * reps);
    const lombardiRM = weight * Math.pow(reps, 0.1);
    
    // Choose formula or use average
    switch (formula) {
      case "brzycki":
        oneRepMax = brzyckiRM;
        break;
      case "epley":
        oneRepMax = epleyRM;
        break;
      case "lander":
        oneRepMax = landerRM;
        break;
      case "lombardi":
        oneRepMax = lombardiRM;
        break;
      case "average":
      default:
        oneRepMax = (brzyckiRM + epleyRM + landerRM + lombardiRM) / 4;
        break;
    }
    
    // Round to nearest 0.5
    oneRepMax = Math.round(oneRepMax * 2) / 2;
    
    // Calculate common training percentages
    const percentageValues: {[key: string]: number} = {};
    [95, 90, 85, 80, 75, 70, 65, 60, 55, 50].forEach(percent => {
      percentageValues[percent] = Math.round(oneRepMax * (percent / 100) * 2) / 2;
    });
    
    setResult(oneRepMax);
    setPercentages(percentageValues);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setShowResults(false);
    setResult(null);
    setPercentages({});
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
                    label="Weight Lifted"
                    value={weight}
                    onChange={setWeight}
                    min={1}
                    max={1000}
                    unit="lbs"
                    required
                  />
                  
                  <CalculatorNumberInput
                    label="Repetitions Performed"
                    value={reps}
                    onChange={setReps}
                    min={1}
                    max={30}
                    step={1}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Calculation Formula</Label>
                  <RadioGroup 
                    defaultValue="average" 
                    value={formula}
                    onValueChange={(value) => setFormula(value as FormulaType)}
                    className="grid gap-2 md:grid-cols-3"
                  >
                    <div className="flex items-center space-x-2 border rounded-lg p-2">
                      <RadioGroupItem value="average" id="average" />
                      <Label htmlFor="average">Average (Recommended)</Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-2">
                      <RadioGroupItem value="brzycki" id="brzycki" />
                      <Label htmlFor="brzycki">Brzycki</Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-2">
                      <RadioGroupItem value="epley" id="epley" />
                      <Label htmlFor="epley">Epley</Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-2">
                      <RadioGroupItem value="lander" id="lander" />
                      <Label htmlFor="lander">Lander</Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-2">
                      <RadioGroupItem value="lombardi" id="lombardi" />
                      <Label htmlFor="lombardi">Lombardi</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={resetCalculator}
                    disabled={!showResults}
                  >
                    Reset
                  </Button>
                  <Button onClick={calculateOneRepMax}>Calculate</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="info" className="space-y-4">
              <h3 className="text-lg font-semibold">About 1 Rep Max (1RM)</h3>
              <p>Your one-repetition maximum (1RM) is the maximum amount of weight you can lift for a single repetition of a given exercise. This calculator estimates your 1RM based on the weight you can lift for multiple repetitions.</p>
              
              <div className="flex items-start space-x-2 bg-muted p-3 rounded-md mt-4">
                <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Safety Note</h4>
                  <p className="text-sm">Attempting a true 1RM can be dangerous without proper technique and spotters. Using this calculator to estimate your 1RM is safer than attempting a maximal lift.</p>
                </div>
              </div>
              
              <h4 className="font-medium mt-4">Calculation Formulas</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Brzycki:</strong> 1RM = weight × (36 / (37 - reps))</li>
                <li><strong>Epley:</strong> 1RM = weight × (1 + 0.0333 × reps)</li>
                <li><strong>Lander:</strong> 1RM = (100 × weight) / (101.3 - 2.67123 × reps)</li>
                <li><strong>Lombardi:</strong> 1RM = weight × reps<sup>0.1</sup></li>
                <li><strong>Average:</strong> The average of all formulas above</li>
              </ul>
              
              <p className="text-sm mt-4">The accuracy of these formulas decreases as the number of repetitions increases. For best results, use a weight that you can lift for 1-10 repetitions.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showResults && result !== null && (
        <CalculatorResult 
          title="One Rep Max (1RM) Results" 
          description="Your estimated maximum lift"
        >
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-4xl font-bold">{result} lbs</p>
              <p className="text-lg text-muted-foreground">Estimated 1RM</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Training Percentages</h4>
              <p className="text-sm text-muted-foreground">Common training intensities based on your 1RM:</p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border rounded-lg mt-2">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Percentage</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Weight (lbs)</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground tracking-wider">Training Focus</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-gray-200">
                    {Object.entries(percentages).map(([percent, weight]) => (
                      <tr key={percent}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">{percent}%</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium">{weight} lbs</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          {parseInt(percent) >= 90 ? "Strength / Power" : 
                           parseInt(percent) >= 75 ? "Strength / Hypertrophy" : 
                           parseInt(percent) >= 60 ? "Hypertrophy" : "Endurance"}
                        </td>
                      </tr>
                    ))}
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
