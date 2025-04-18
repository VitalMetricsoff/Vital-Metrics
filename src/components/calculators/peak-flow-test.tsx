
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PeakFlowTest() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number>(30);
  const [height, setHeight] = useState<number>(170);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(7);
  const [measurement, setMeasurement] = useState<number | null>(null);
  const [system, setSystem] = useState<"metric" | "imperial">("metric");
  const [showResults, setShowResults] = useState(false);
  
  const handleCalculate = () => {
    setShowResults(true);
  };
  
  const calculatePredictedPeakFlow = () => {
    // Convert height to cm if in imperial
    const heightInCm = system === "metric" ? height : (heightFt * 30.48 + heightIn * 2.54);
    
    // Calculate predicted peak flow using the EU scale formula
    let predictedPeakFlow: number;
    
    if (gender === "male") {
      if (age < 15) {
        // For boys
        predictedPeakFlow = (0.00151 * heightInCm * age + 0.117) * 60;
      } else {
        // For men
        predictedPeakFlow = (0.0614 * heightInCm - 4.65) * 60;
      }
    } else {
      if (age < 15) {
        // For girls
        predictedPeakFlow = (0.00144 * heightInCm * age + 0.092) * 60;
      } else {
        // For women
        predictedPeakFlow = (0.0523 * heightInCm - 3.51) * 60;
      }
    }
    
    return Math.round(predictedPeakFlow);
  };
  
  const calculatePercentage = () => {
    if (!measurement) return null;
    const predicted = calculatePredictedPeakFlow();
    const percentage = (measurement / predicted) * 100;
    return Math.round(percentage);
  };
  
  const getPeakFlowZone = (percentage: number | null) => {
    if (percentage === null) return null;
    
    if (percentage >= 80) {
      return { zone: "Green", description: "Good control", color: "green" };
    } else if (percentage >= 50) {
      return { zone: "Yellow", description: "Caution - medical attention may be needed", color: "yellow" };
    } else {
      return { zone: "Red", description: "Medical alert - seek immediate medical attention", color: "red" };
    }
  };
  
  const predictionResult = calculatePredictedPeakFlow();
  const percentageResult = calculatePercentage();
  const zoneResult = getPeakFlowZone(percentageResult);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Gender</Label>
              <RadioGroup
                value={gender}
                onValueChange={(value) => setGender(value as "male" | "female")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
            
            <CalculatorNumberInput
              label="Age"
              value={age}
              onChange={setAge}
              min={5}
              max={100}
              unit="years"
              required
            />
            
            <Tabs value={system} onValueChange={(v) => setSystem(v as "metric" | "imperial")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="metric">Metric</TabsTrigger>
                <TabsTrigger value="imperial">Imperial</TabsTrigger>
              </TabsList>
              <TabsContent value="metric" className="space-y-4">
                <CalculatorNumberInput
                  label="Height"
                  value={height}
                  onChange={setHeight}
                  min={100}
                  max={250}
                  unit="cm"
                  required
                />
              </TabsContent>
              <TabsContent value="imperial" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <CalculatorNumberInput
                    label="Height (feet)"
                    value={heightFt}
                    onChange={setHeightFt}
                    min={3}
                    max={8}
                    unit="ft"
                    required
                  />
                  <CalculatorNumberInput
                    label="Height (inches)"
                    value={heightIn}
                    onChange={setHeightIn}
                    min={0}
                    max={11}
                    unit="in"
                    required
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <CalculatorNumberInput
              label="Your Peak Flow Reading"
              value={measurement || ""}
              onChange={(value) => setMeasurement(value)}
              min={60}
              max={900}
              unit="L/min"
              description="Your measured peak expiratory flow rate"
            />
            
            <Button className="w-full mt-4" onClick={handleCalculate}>
              Analyze Peak Flow
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {showResults && (
        <CalculatorResult title="Peak Flow Analysis Results">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-muted rounded-lg text-center">
                <h3 className="text-lg font-medium">Your Expected Peak Flow</h3>
                <p className="text-4xl font-bold mt-2">{predictionResult} <span className="text-xl">L/min</span></p>
                <p className="text-sm text-muted-foreground mt-1">Based on your age, gender, and height</p>
              </div>
              
              {measurement !== null && (
                <div className="p-6 bg-muted rounded-lg text-center">
                  <h3 className="text-lg font-medium">Your Measured Peak Flow</h3>
                  <p className="text-4xl font-bold mt-2">{measurement} <span className="text-xl">L/min</span></p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {percentageResult}% of predicted value
                  </p>
                </div>
              )}
            </div>
            
            {measurement !== null && zoneResult && (
              <div className={`p-6 bg-${zoneResult.color}-50 border border-${zoneResult.color}-200 rounded-lg`}>
                <h3 className="text-lg font-medium mb-2">Your Peak Flow Zone</h3>
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full bg-${zoneResult.color}-500 flex items-center justify-center text-white font-bold`}>
                    {zoneResult.zone.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{zoneResult.zone} Zone</p>
                    <p className="text-sm">{zoneResult.description}</p>
                  </div>
                </div>
              </div>
            )}
            
            {measurement !== null && percentageResult && percentageResult < 80 && (
              <ResultAlert 
                type={percentageResult < 50 ? "error" : "warning"}
                title={percentageResult < 50 ? "Medical Alert - Seek Help" : "Caution - Monitor Closely"}
              >
                {percentageResult < 50 ? 
                  "Your peak flow reading is in the red zone, which indicates poor asthma control. Please seek immediate medical attention." : 
                  "Your peak flow reading is in the yellow zone, which indicates that your asthma may not be well controlled. Consider using your rescue medication and contact your healthcare provider if symptoms worsen."}
              </ResultAlert>
            )}
            
            <div className="space-y-3 mt-2">
              <h3 className="font-medium">About Peak Flow Zones</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Green Zone (80-100% of personal best)</p>
                    <p className="text-sm text-muted-foreground">Asthma is under good control. Continue taking your regular medications as prescribed.</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Yellow Zone (50-80% of personal best)</p>
                    <p className="text-sm text-muted-foreground">Asthma control is not optimal. You may need to use your rescue inhaler or adjust your medication.</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Red Zone (below 50% of personal best)</p>
                    <p className="text-sm text-muted-foreground">Asthma is poorly controlled. Use your rescue medication and seek medical attention immediately.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground mt-4">
              <p><strong>Note:</strong> This calculator provides an estimation based on general formulas. Your actual personal best peak flow should be established with your healthcare provider. Regular monitoring and following your asthma action plan is essential for proper asthma management.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
