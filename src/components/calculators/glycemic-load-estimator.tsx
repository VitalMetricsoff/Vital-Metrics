
import { useState } from "react";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { Button } from "@/components/ui/button";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function GlycemicLoadEstimator() {
  const [foodName, setFoodName] = useState<string>("");
  const [glycemicIndex, setGlycemicIndex] = useState<number>(50);
  const [carbsPerServing, setCarbsPerServing] = useState<number>(15);
  const [servingSize, setServingSize] = useState<number>(100);
  const [showResults, setShowResults] = useState(false);

  const calculateGlycemicLoad = () => {
    // Glycemic Load = (Glycemic Index × Carbs per Serving) ÷ 100
    return Math.round((glycemicIndex * carbsPerServing) / 100);
  };

  const getGlycemicLoadCategory = (gl: number) => {
    if (gl <= 10) return { category: "Low", color: "success" };
    if (gl <= 19) return { category: "Medium", color: "warning" };
    return { category: "High", color: "error" };
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const glycemicLoad = calculateGlycemicLoad();
  const category = getGlycemicLoadCategory(glycemicLoad);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="food-name">Food Name</Label>
              <Input
                id="food-name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="Enter food name (optional)"
              />
            </div>
            
            <CalculatorNumberInput
              label="Glycemic Index (GI)"
              value={glycemicIndex}
              onChange={setGlycemicIndex}
              min={0}
              max={100}
              description="Scale from 0-100"
              required
            />
            
            <CalculatorNumberInput
              label="Carbohydrates per Serving"
              value={carbsPerServing}
              onChange={setCarbsPerServing}
              min={0}
              max={200}
              unit="g"
              required
            />
            
            <CalculatorNumberInput
              label="Serving Size"
              value={servingSize}
              onChange={setServingSize}
              min={1}
              max={1000}
              unit="g"
              required
            />
          </div>
          
          <Button className="w-full mt-6" onClick={handleCalculate}>
            Calculate Glycemic Load
          </Button>
        </CardContent>
      </Card>
      
      {showResults && (
        <CalculatorResult title={`Glycemic Load ${foodName ? `for ${foodName}` : ""}`}>
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <h3 className="text-lg font-medium">Glycemic Load</h3>
              <p className="text-4xl font-bold mt-2">{glycemicLoad}</p>
              <p className={`text-md font-semibold mt-2 text-${category.color}-600`}>
                {category.category} Glycemic Load
              </p>
            </div>
            
            <ResultAlert 
              type={category.category === "Low" ? "success" : category.category === "Medium" ? "warning" : "error"} 
              title={`${category.category} Glycemic Load`}
            >
              {category.category === "Low" ? (
                "This food has a low impact on blood sugar levels and is a good choice for glycemic control."
              ) : category.category === "Medium" ? (
                "This food has a moderate impact on blood sugar levels. Consume in moderation."
              ) : (
                "This food has a high impact on blood sugar levels. Consider limiting consumption, especially if you have diabetes or insulin resistance."
              )}
            </ResultAlert>
            
            <div className="mt-4 text-sm">
              <h3 className="font-semibold mb-2">Glycemic Load Categories:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-green-500 mr-2 rounded-full"></span>
                  <span><strong>Low GL:</strong> 10 or less</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-yellow-500 mr-2 rounded-full"></span>
                  <span><strong>Medium GL:</strong> 11-19</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-red-500 mr-2 rounded-full"></span>
                  <span><strong>High GL:</strong> 20 or more</span>
                </li>
              </ul>
              <p className="mt-3">
                <strong>Note:</strong> The glycemic load takes into account both the quality (GI) and quantity (carbs) of carbohydrates in a food.
              </p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
