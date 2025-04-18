
import { useState } from "react";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { Button } from "@/components/ui/button";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function GlucoseUnitConverter() {
  const [glucoseValue, setGlucoseValue] = useState<number>(100);
  const [conversionDirection, setConversionDirection] = useState<string>("mgdl-to-mmol");
  const [showResults, setShowResults] = useState(false);

  // Conversion constants
  const CONVERSION_FACTOR = 18; // mg/dL to mmol/L: divide by 18, mmol/L to mg/dL: multiply by 18

  const convertGlucose = () => {
    if (conversionDirection === "mgdl-to-mmol") {
      // Convert mg/dL to mmol/L
      return parseFloat((glucoseValue / CONVERSION_FACTOR).toFixed(1));
    } else {
      // Convert mmol/L to mg/dL
      return Math.round(glucoseValue * CONVERSION_FACTOR);
    }
  };

  const getInterpretation = (value: number, unit: string) => {
    // Values for interpretation
    if (unit === "mg/dL") {
      if (value < 70) return "Low blood sugar (hypoglycemia)";
      if (value < 100) return "Normal fasting glucose";
      if (value < 126) return "Prediabetes (fasting)";
      return "Diabetes (fasting)";
    } else { // mmol/L
      if (value < 3.9) return "Low blood sugar (hypoglycemia)";
      if (value < 5.6) return "Normal fasting glucose";
      if (value < 7.0) return "Prediabetes (fasting)";
      return "Diabetes (fasting)";
    }
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const convertedValue = convertGlucose();
  const inputUnit = conversionDirection === "mgdl-to-mmol" ? "mg/dL" : "mmol/L";
  const outputUnit = conversionDirection === "mgdl-to-mmol" ? "mmol/L" : "mg/dL";
  
  const inputInterpretation = getInterpretation(glucoseValue, inputUnit);
  const outputInterpretation = getInterpretation(convertedValue, outputUnit);

  // Reference table values
  const referenceValues = [
    { description: "Hypoglycemia", mgdl: "Below 70", mmol: "Below 3.9" },
    { description: "Normal Fasting", mgdl: "70-99", mmol: "3.9-5.5" },
    { description: "Prediabetes (Fasting)", mgdl: "100-125", mmol: "5.6-6.9" },
    { description: "Diabetes (Fasting)", mgdl: "126 or higher", mmol: "7.0 or higher" },
    { description: "Normal (2 hours after eating)", mgdl: "Below 140", mmol: "Below 7.8" },
    { description: "Prediabetes (2 hours after eating)", mgdl: "140-199", mmol: "7.8-11.0" },
    { description: "Diabetes (2 hours after eating)", mgdl: "200 or higher", mmol: "11.1 or higher" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label>Conversion Direction</Label>
              <RadioGroup
                value={conversionDirection}
                onValueChange={setConversionDirection}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mgdl-to-mmol" id="mgdl-to-mmol" />
                  <Label htmlFor="mgdl-to-mmol">mg/dL to mmol/L (US to International)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mmol-to-mgdl" id="mmol-to-mgdl" />
                  <Label htmlFor="mmol-to-mgdl">mmol/L to mg/dL (International to US)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <CalculatorNumberInput
              label={`Glucose Value (${inputUnit})`}
              value={glucoseValue}
              onChange={setGlucoseValue}
              min={0}
              max={conversionDirection === "mgdl-to-mmol" ? 1000 : 55}
              step={conversionDirection === "mgdl-to-mmol" ? 1 : 0.1}
              unit={inputUnit}
              required
            />
          </div>
          
          <Button className="w-full mt-6" onClick={handleCalculate}>
            Convert
          </Button>
        </CardContent>
      </Card>
      
      {showResults && (
        <CalculatorResult title="Glucose Unit Conversion">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="p-5 bg-muted rounded-md text-center">
                <h3 className="text-lg font-medium">Input Value</h3>
                <p className="text-3xl font-bold mt-2">
                  {glucoseValue} {inputUnit}
                </p>
                <p className="text-sm mt-2">
                  {inputInterpretation}
                </p>
              </div>
              
              <div className="p-5 bg-muted rounded-md text-center">
                <h3 className="text-lg font-medium">Converted Value</h3>
                <p className="text-3xl font-bold mt-2">
                  {convertedValue} {outputUnit}
                </p>
                <p className="text-sm mt-2">
                  {outputInterpretation}
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-3">Reference Table</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Condition</TableHead>
                      <TableHead>mg/dL (US)</TableHead>
                      <TableHead>mmol/L (International)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referenceValues.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.description}</TableCell>
                        <TableCell>{item.mgdl}</TableCell>
                        <TableCell>{item.mmol}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="text-sm mt-4 space-y-2">
                <h4 className="font-semibold">Conversion Formula:</h4>
                <ul className="list-disc pl-5">
                  <li>mg/dL to mmol/L: Divide by 18</li>
                  <li>mmol/L to mg/dL: Multiply by 18</li>
                </ul>
                <p>
                  <strong>Note:</strong> These reference values apply to blood glucose measurements for adults. 
                  Target ranges may vary for individuals with specific conditions, pregnant women, children, or the elderly.
                </p>
              </div>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
