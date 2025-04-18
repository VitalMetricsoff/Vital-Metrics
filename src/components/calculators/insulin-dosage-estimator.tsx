import { useState } from "react";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { Button } from "@/components/ui/button";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function InsulinDosageEstimator() {
  const [unitSystem, setUnitSystem] = useState<string>("mgdl");
  const [currentGlucose, setCurrentGlucose] = useState<number>(unitSystem === "mgdl" ? 180 : 10);
  const [targetGlucose, setTargetGlucose] = useState<number>(unitSystem === "mgdl" ? 120 : 6.7);
  const [carbsToEat, setCarbsToEat] = useState<number>(45);
  const [insulinSensitivity, setInsulinSensitivity] = useState<number>(unitSystem === "mgdl" ? 50 : 2.8);
  const [carbRatio, setCarbRatio] = useState<number>(10);
  const [insulinOnBoard, setInsulinOnBoard] = useState<number>(0);
  const [insulinType, setInsulinType] = useState<string>("rapid");
  const [showResults, setShowResults] = useState(false);

  // Update default values when unit system changes
  const handleUnitSystemChange = (value: string) => {
    setUnitSystem(value);
    if (value === "mgdl") {
      setCurrentGlucose(180);
      setTargetGlucose(120);
      setInsulinSensitivity(50);
    } else {
      setCurrentGlucose(10);
      setTargetGlucose(6.7);
      setInsulinSensitivity(2.8);
    }
  };

  const calculateInsulinDose = () => {
    // Correction dose (for high blood sugar)
    const glucoseDifference = Math.max(0, currentGlucose - targetGlucose);
    let correctionDose = glucoseDifference / insulinSensitivity;
    
    // Carbohydrate dose
    const carbDose = carbsToEat / carbRatio;
    
    // Total dose
    let totalDose = correctionDose + carbDose - insulinOnBoard;
    
    // Ensure non-negative
    totalDose = Math.max(0, totalDose);
    
    // Round to nearest 0.5 (or keep one decimal place for small values)
    if (totalDose >= 1) {
      totalDose = Math.round(totalDose * 2) / 2;
    } else {
      totalDose = Math.round(totalDose * 10) / 10;
    }
    
    return {
      correctionDose: Math.max(0, correctionDose),
      carbDose,
      totalDose
    };
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const result = calculateInsulinDose();

  const insulinTypes = [
    { value: "rapid", label: "Rapid-acting (Humalog, Novolog, Apidra)", onsetMin: 15, peakHours: "1-2", durationHours: "3-5" },
    { value: "short", label: "Short-acting (Regular, Humulin R)", onsetMin: 30, peakHours: "2-3", durationHours: "3-6" },
    { value: "intermediate", label: "Intermediate-acting (NPH)", onsetMin: 120, peakHours: "4-12", durationHours: "12-18" },
    { value: "long", label: "Long-acting (Lantus, Levemir)", onsetMin: 120, peakHours: "None", durationHours: "24+" },
    { value: "ultra", label: "Ultra long-acting (Tresiba)", onsetMin: 120, peakHours: "None", durationHours: "42+" }
  ];

  const selectedInsulinType = insulinTypes.find(type => type.value === insulinType);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Glucose Unit System</Label>
                <RadioGroup
                  value={unitSystem}
                  onValueChange={handleUnitSystemChange}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mgdl" id="mgdl" />
                    <Label htmlFor="mgdl">mg/dL (US)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mmol" id="mmol" />
                    <Label htmlFor="mmol">mmol/L (International)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <CalculatorNumberInput
                label="Current Blood Glucose"
                value={currentGlucose}
                onChange={setCurrentGlucose}
                min={0}
                max={unitSystem === "mgdl" ? 500 : 27.8}
                step={unitSystem === "mgdl" ? 1 : 0.1}
                unit={unitSystem === "mgdl" ? "mg/dL" : "mmol/L"}
                required
              />
              
              <CalculatorNumberInput
                label="Target Blood Glucose"
                value={targetGlucose}
                onChange={setTargetGlucose}
                min={0}
                max={unitSystem === "mgdl" ? 250 : 13.9}
                step={unitSystem === "mgdl" ? 1 : 0.1}
                unit={unitSystem === "mgdl" ? "mg/dL" : "mmol/L"}
                required
              />
              
              <CalculatorNumberInput
                label="Carbohydrates to Eat"
                value={carbsToEat}
                onChange={setCarbsToEat}
                min={0}
                max={200}
                unit="g"
                required
              />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Insulin Sensitivity Factor</Label>
                  <Popover>
                    <PopoverTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </PopoverTrigger>
                    <PopoverContent className="w-80 text-sm">
                      <p>The insulin sensitivity factor (ISF) indicates how much your blood glucose will decrease with 1 unit of insulin.</p>
                      <p className="mt-2">For example, if your ISF is 50 mg/dL, 1 unit of insulin will lower your blood glucose by 50 mg/dL.</p>
                    </PopoverContent>
                  </Popover>
                </div>
                <CalculatorNumberInput
                  label=""
                  value={insulinSensitivity}
                  onChange={setInsulinSensitivity}
                  min={unitSystem === "mgdl" ? 10 : 0.5}
                  max={unitSystem === "mgdl" ? 100 : 5.5}
                  step={unitSystem === "mgdl" ? 1 : 0.1}
                  unit={unitSystem === "mgdl" ? "mg/dL per unit" : "mmol/L per unit"}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Insulin-to-Carb Ratio</Label>
                  <Popover>
                    <PopoverTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </PopoverTrigger>
                    <PopoverContent className="w-80 text-sm">
                      <p>The insulin-to-carb ratio tells you how many grams of carbohydrates are covered by 1 unit of insulin.</p>
                      <p className="mt-2">For example, if your ratio is 10, 1 unit of insulin will cover 10 grams of carbohydrates.</p>
                    </PopoverContent>
                  </Popover>
                </div>
                <CalculatorNumberInput
                  label=""
                  value={carbRatio}
                  onChange={setCarbRatio}
                  min={1}
                  max={50}
                  unit="g of carbs per unit"
                />
              </div>
              
              <CalculatorNumberInput
                label="Active Insulin on Board"
                value={insulinOnBoard}
                onChange={setInsulinOnBoard}
                min={0}
                max={30}
                step={0.5}
                unit="units"
                description="Insulin already taken that is still active"
              />
              
              <div className="space-y-2">
                <Label>Insulin Type</Label>
                <Select value={insulinType} onValueChange={setInsulinType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select insulin type" />
                  </SelectTrigger>
                  <SelectContent>
                    {insulinTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Button className="w-full mt-6" onClick={handleCalculate}>
            Calculate Insulin Dose
          </Button>
        </CardContent>
      </Card>
      
      {showResults && (
        <CalculatorResult title="Estimated Insulin Dose">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border rounded-md text-center">
                <h3 className="text-sm font-medium">Correction Dose</h3>
                <p className="text-2xl font-bold mt-2">{result.correctionDose.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  units (for high blood glucose)
                </p>
              </div>
              
              <div className="p-4 border rounded-md text-center">
                <h3 className="text-sm font-medium">Carb Dose</h3>
                <p className="text-2xl font-bold mt-2">{result.carbDose.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  units (for food)
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-md text-center">
                <h3 className="text-sm font-medium">Total Dose</h3>
                <p className="text-2xl font-bold mt-2">{result.totalDose}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  units (minus active insulin)
                </p>
              </div>
            </div>
            
            <ResultAlert type="info" title="Insulin Information">
              <div className="space-y-1">
                <p><strong>Selected Insulin:</strong> {selectedInsulinType?.label}</p>
                <p><strong>Onset Time:</strong> ~{selectedInsulinType?.onsetMin} minutes</p>
                <p><strong>Peak Action:</strong> {selectedInsulinType?.peakHours} hours</p>
                <p><strong>Duration of Action:</strong> {selectedInsulinType?.durationHours} hours</p>
              </div>
            </ResultAlert>
            
            <div className="border p-4 rounded-md bg-yellow-50">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Safety Information</h3>
              <div className="text-sm text-yellow-700 space-y-2">
                <p>
                  <strong>This calculator is for educational purposes only.</strong> Do not use this calculator to make medical decisions without consulting your healthcare provider.
                </p>
                <p>
                  Insulin dosing should always be supervised by a qualified healthcare professional who understands your specific needs and medical history.
                </p>
                <p>
                  Many factors can affect insulin requirements including stress, illness, exercise, menstrual cycles, and other medications.
                </p>
              </div>
            </div>
            
            <div className="text-sm mt-4">
              <h3 className="font-semibold mb-2">Calculation Breakdown:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Correction dose:</strong> (Current glucose - Target glucose) ÷ Insulin sensitivity factor<br />
                  ({currentGlucose} - {targetGlucose}) ÷ {insulinSensitivity} = {result.correctionDose.toFixed(2)} units
                </li>
                <li>
                  <strong>Carbohydrate dose:</strong> Carbs to eat ÷ Insulin-to-carb ratio<br />
                  {carbsToEat} ÷ {carbRatio} = {result.carbDose.toFixed(2)} units
                </li>
                <li>
                  <strong>Active insulin adjustment:</strong> -{insulinOnBoard} units
                </li>
                <li>
                  <strong>Total dose:</strong> Correction dose + Carb dose - Active insulin<br />
                  {result.correctionDose.toFixed(2)} + {result.carbDose.toFixed(2)} - {insulinOnBoard} = {(result.correctionDose + result.carbDose - insulinOnBoard).toFixed(2)} ≈ {result.totalDose} units
                </li>
              </ul>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
