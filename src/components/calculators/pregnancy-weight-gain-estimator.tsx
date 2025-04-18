
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { cn } from "@/lib/utils";

type PregnancyType = "singleton" | "twins" | "triplets";

export function PregnancyWeightGainEstimator() {
  const [height, setHeight] = useState<number>(165);
  const [heightUnit, setHeightUnit] = useState<string>("cm");
  const [weight, setWeight] = useState<number>(65);
  const [weightUnit, setWeightUnit] = useState<string>("kg");
  const [pregnancyType, setPregnancyType] = useState<PregnancyType>("singleton");
  const [weightGainRecommendation, setWeightGainRecommendation] = useState<{min: number, max: number} | null>(null);
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>("");
  
  const calculateBMI = () => {
    // Convert to metric for BMI calculation
    const heightInM = heightUnit === "cm" 
      ? height / 100
      : heightUnit === "ft" 
        ? (height * 30.48) / 100
        : 0;
    
    const weightInKg = weightUnit === "kg"
      ? weight
      : weightUnit === "lb"
        ? weight * 0.453592
        : 0;
    
    if (heightInM && weightInKg) {
      const calculatedBMI = weightInKg / (heightInM * heightInM);
      setBmi(parseFloat(calculatedBMI.toFixed(1)));
      
      // Determine BMI category
      let category = "";
      if (calculatedBMI < 18.5) {
        category = "underweight";
      } else if (calculatedBMI < 25) {
        category = "normal weight";
      } else if (calculatedBMI < 30) {
        category = "overweight";
      } else {
        category = "obese";
      }
      
      setBmiCategory(category);
      
      // Determine recommended weight gain range
      let minGain, maxGain;
      
      if (pregnancyType === "singleton") {
        if (calculatedBMI < 18.5) {
          minGain = 12.5; maxGain = 18; // Underweight
        } else if (calculatedBMI < 25) {
          minGain = 11.5; maxGain = 16; // Normal weight
        } else if (calculatedBMI < 30) {
          minGain = 7; maxGain = 11.5; // Overweight
        } else {
          minGain = 5; maxGain = 9; // Obese
        }
      } else if (pregnancyType === "twins") {
        if (calculatedBMI < 18.5) {
          minGain = 22.5; maxGain = 28; // Underweight
        } else if (calculatedBMI < 25) {
          minGain = 17; maxGain = 25; // Normal weight
        } else if (calculatedBMI < 30) {
          minGain = 14; maxGain = 23; // Overweight
        } else {
          minGain = 11; maxGain = 19; // Obese
        }
      } else { // triplets or more
        // These are rough estimates as less data is available for triplet pregnancies
        if (calculatedBMI < 18.5) {
          minGain = 23; maxGain = 30; // Underweight
        } else if (calculatedBMI < 25) {
          minGain = 20; maxGain = 28; // Normal weight
        } else if (calculatedBMI < 30) {
          minGain = 17; maxGain = 25; // Overweight
        } else {
          minGain = 15; maxGain = 23; // Obese
        }
      }
      
      // Convert to the selected weight unit
      if (weightUnit === "lb") {
        minGain = parseFloat((minGain * 2.20462).toFixed(1));
        maxGain = parseFloat((maxGain * 2.20462).toFixed(1));
      }
      
      setWeightGainRecommendation({ min: minGain, max: maxGain });
    }
  };
  
  // Generate chart data for weight gain by week
  const getChartData = () => {
    if (!weightGainRecommendation) return [];
    
    // Weight gain pattern by trimester (approximate)
    // 1st trimester: ~10% of total weight gain
    // 2nd and 3rd trimesters: ~45% each of total weight gain
    const data = [];
    const { min, max } = weightGainRecommendation;
    
    // Starting from week 0 (pre-pregnancy)
    data.push({ week: 0, min: 0, max: 0 });
    
    // First trimester (weeks 1-13)
    for (let week = 1; week <= 13; week++) {
      const minPercentage = (week / 13) * 0.1;
      const maxPercentage = (week / 13) * 0.1;
      data.push({
        week,
        min: parseFloat((min * minPercentage).toFixed(1)),
        max: parseFloat((max * maxPercentage).toFixed(1)),
      });
    }
    
    // Second trimester (weeks 14-26)
    for (let week = 14; week <= 26; week++) {
      const weekInTrimester = week - 13;
      const minPercentage = 0.1 + (weekInTrimester / 13) * 0.45;
      const maxPercentage = 0.1 + (weekInTrimester / 13) * 0.45;
      data.push({
        week,
        min: parseFloat((min * minPercentage).toFixed(1)),
        max: parseFloat((max * maxPercentage).toFixed(1)),
      });
    }
    
    // Third trimester (weeks 27-40)
    for (let week = 27; week <= 40; week++) {
      const weekInTrimester = week - 26;
      const minPercentage = 0.1 + 0.45 + (weekInTrimester / 14) * 0.45;
      const maxPercentage = 0.1 + 0.45 + (weekInTrimester / 14) * 0.45;
      data.push({
        week,
        min: parseFloat((min * minPercentage).toFixed(1)),
        max: parseFloat((max * maxPercentage).toFixed(1)),
      });
    }
    
    return data;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <CalculatorNumberInput
                label="Height"
                value={height}
                onChange={setHeight}
                min={heightUnit === "cm" ? 100 : 3}
                max={heightUnit === "cm" ? 250 : 8}
                step={heightUnit === "cm" ? 1 : 0.1}
                className="col-span-2"
                required
              />
              
              <div className="space-y-2">
                <Label>Unit</Label>
                <Select value={heightUnit} onValueChange={setHeightUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="ft">ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <CalculatorNumberInput
                label="Weight"
                value={weight}
                onChange={setWeight}
                min={weightUnit === "kg" ? 30 : 66}
                max={weightUnit === "kg" ? 200 : 440}
                step={weightUnit === "kg" ? 0.1 : 1}
                className="col-span-2"
                required
              />
              
              <div className="space-y-2">
                <Label>Unit</Label>
                <Select value={weightUnit} onValueChange={setWeightUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lb">lb</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Pregnancy Type</Label>
              <RadioGroup
                value={pregnancyType}
                onValueChange={(value) => setPregnancyType(value as PregnancyType)}
                className="flex flex-col sm:flex-row sm:space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="singleton" id="singleton" />
                  <Label htmlFor="singleton">Singleton</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="twins" id="twins" />
                  <Label htmlFor="twins">Twins</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="triplets" id="triplets" />
                  <Label htmlFor="triplets">Triplets or more</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button onClick={calculateBMI} className="w-full">
              Calculate Recommended Weight Gain
            </Button>
          </div>
        </CardContent>
      </Card>

      {weightGainRecommendation && (
        <CalculatorResult title="Recommended Pregnancy Weight Gain">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="bg-muted/50 p-4 rounded-md">
                <p className="text-sm text-muted-foreground">Pre-pregnancy BMI</p>
                <p className="text-2xl font-bold">{bmi}</p>
                <p className="text-sm capitalize">
                  {bmiCategory === "normal weight" 
                    ? "Normal" 
                    : bmiCategory.charAt(0).toUpperCase() + bmiCategory.slice(1)
                  }
                </p>
              </div>
              
              <div className={cn(
                "p-4 rounded-md text-white",
                pregnancyType === "singleton" ? "bg-primary" : 
                pregnancyType === "twins" ? "bg-secondary" : "bg-accent"
              )}>
                <p className="text-sm opacity-90">Recommended Gain</p>
                <p className="text-2xl font-bold">
                  {weightGainRecommendation.min} - {weightGainRecommendation.max} {weightUnit}
                </p>
                <p className="text-sm capitalize">{pregnancyType} pregnancy</p>
              </div>
            </div>
            
            <div className="h-72 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={getChartData()}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="week"
                    label={{ value: 'Week of Pregnancy', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    label={{ 
                      value: `Weight Gain (${weightUnit})`, 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' }
                    }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value} ${weightUnit}`, '']}
                    labelFormatter={(label) => `Week ${label}`}
                  />
                  <ReferenceLine x={13} stroke="#666" strokeDasharray="3 3" label="1st Trimester" />
                  <ReferenceLine x={26} stroke="#666" strokeDasharray="3 3" label="2nd Trimester" />
                  <Area 
                    type="monotone" 
                    dataKey="min" 
                    name="Minimum Recommended" 
                    stackId="1" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="max" 
                    name="Maximum Recommended" 
                    stackId="1" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <ResultAlert 
              type="info" 
              title={`Pregnancy Weight Gain Guidelines for ${bmiCategory.charAt(0).toUpperCase() + bmiCategory.slice(1)} BMI`}
            >
              <p className="mb-2">
                These recommendations are based on the Institute of Medicine (IOM) guidelines for {pregnancyType} pregnancies. 
                Your healthcare provider may have different recommendations based on your specific health circumstances.
              </p>
              <div className="text-sm mt-2">
                <p className="font-medium">First Trimester (Weeks 1-13):</p>
                <p>Typically 0.5-2 {weightUnit} total</p>
                
                <p className="font-medium mt-1">Second & Third Trimesters (Weeks 14-40):</p>
                <p>
                  {bmiCategory === "underweight" 
                    ? `About 0.5 ${weightUnit} per week`
                    : bmiCategory === "normal weight"
                      ? `About 0.4 ${weightUnit} per week`
                      : bmiCategory === "overweight"
                        ? `About 0.3 ${weightUnit} per week`
                        : `About 0.2 ${weightUnit} per week`
                  }
                </p>
              </div>
            </ResultAlert>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
