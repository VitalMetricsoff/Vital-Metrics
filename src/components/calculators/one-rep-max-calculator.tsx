import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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

      {showResults && result && (
        <CalculatorResult title="One Rep Max Results">
          <div className="space-y-6">
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-medium dark:text-slate-200">Estimated One Rep Max</h3>
              <p className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">{result} lbs</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Using {formula === "average" ? "averaged formulas" : `${formula} formula`}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-slate-900 dark:text-slate-100">Training Percentages</h3>
              <div className="grid gap-3">
                {Object.entries(percentages).map(([percent, weight]) => (
                  <div 
                    key={percent}
                    className={cn(
                      "p-4 rounded-lg border",
                      parseInt(percent) >= 90 
                        ? "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800" 
                        : parseInt(percent) >= 80
                        ? "bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800"
                        : parseInt(percent) >= 70
                        ? "bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800"
                        : "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={cn(
                          "text-sm font-medium",
                          parseInt(percent) >= 90 
                            ? "text-red-900 dark:text-red-100" 
                            : parseInt(percent) >= 80
                            ? "text-orange-900 dark:text-orange-100"
                            : parseInt(percent) >= 70
                            ? "text-yellow-900 dark:text-yellow-100"
                            : "text-green-900 dark:text-green-100"
                        )}>
                          {percent}% of 1RM
                        </p>
                        <p className={cn(
                          "text-2xl font-bold",
                          parseInt(percent) >= 90 
                            ? "text-red-950 dark:text-red-50" 
                            : parseInt(percent) >= 80
                            ? "text-orange-950 dark:text-orange-50"
                            : parseInt(percent) >= 70
                            ? "text-yellow-950 dark:text-yellow-50"
                            : "text-green-950 dark:text-green-50"
                        )}>
                          {weight} lbs
                        </p>
                      </div>
                      <div className={cn(
                        "text-sm",
                        parseInt(percent) >= 90 
                          ? "text-red-700 dark:text-red-300" 
                          : parseInt(percent) >= 80
                          ? "text-orange-700 dark:text-orange-300"
                          : parseInt(percent) >= 70
                          ? "text-yellow-700 dark:text-yellow-300"
                          : "text-green-700 dark:text-green-300"
                      )}>
                        {parseInt(percent) >= 90 
                          ? "Max Effort" 
                          : parseInt(percent) >= 80
                          ? "Heavy"
                          : parseInt(percent) >= 70
                          ? "Moderate"
                          : "Light"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-300">
              <p>Note: These calculations are estimates based on your performance with submaximal weights. Actual maximal strength may vary.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
