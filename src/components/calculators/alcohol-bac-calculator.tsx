
import { useState } from "react";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { Button } from "@/components/ui/button";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export function AlcoholBACCalculator() {
  const [weight, setWeight] = useState<number>(70);
  const [gender, setGender] = useState<string>("male");
  const [hours, setHours] = useState<number>(1);
  const [drinks, setDrinks] = useState<Array<{ type: string; quantity: number }>>([
    { type: "beer", quantity: 1 }
  ]);
  const [unitSystem, setUnitSystem] = useState<string>("metric");
  const [showResults, setShowResults] = useState(false);

  const drinkOptions = [
    { value: "beer", label: "Beer (5% alcohol, 12 oz / 355 ml)" },
    { value: "wine", label: "Wine (12% alcohol, 5 oz / 150 ml)" },
    { value: "spirits", label: "Spirits (40% alcohol, 1.5 oz / 45 ml)" },
    { value: "liqueur", label: "Liqueur (20% alcohol, 1.5 oz / 45 ml)" },
    { value: "hardSeltzer", label: "Hard Seltzer (5% alcohol, 12 oz / 355 ml)" },
    { value: "cocktail", label: "Cocktail (varies, avg 14% alcohol)" }
  ];

  const addDrink = () => {
    setDrinks([...drinks, { type: "beer", quantity: 1 }]);
  };

  const removeDrink = (index: number) => {
    const newDrinks = [...drinks];
    newDrinks.splice(index, 1);
    setDrinks(newDrinks);
  };

  const updateDrinkType = (index: number, type: string) => {
    const newDrinks = [...drinks];
    newDrinks[index].type = type;
    setDrinks(newDrinks);
  };

  const updateDrinkQuantity = (index: number, quantity: number) => {
    const newDrinks = [...drinks];
    newDrinks[index].quantity = quantity;
    setDrinks(newDrinks);
  };

  const calculateBloodAlcoholContent = () => {
    // Convert weight to kg if in imperial units
    const weightInKg = unitSystem === "imperial" ? weight * 0.45359237 : weight;
    
    // Gender-specific constants (Widmark formula)
    const r = gender === "male" ? 0.68 : 0.55; // Body water constant
    
    let totalAlcoholGrams = 0;
    
    // Calculate total alcohol consumed in grams
    drinks.forEach(drink => {
      let alcoholGrams = 0;
      
      switch (drink.type) {
        case "beer":
          alcoholGrams = 14 * drink.quantity; // ~14g per standard beer
          break;
        case "wine":
          alcoholGrams = 14 * drink.quantity; // ~14g per standard wine
          break;
        case "spirits":
          alcoholGrams = 14 * drink.quantity; // ~14g per standard shot
          break;
        case "liqueur":
          alcoholGrams = 8 * drink.quantity; // ~8g per standard liqueur
          break;
        case "hardSeltzer":
          alcoholGrams = 14 * drink.quantity; // ~14g per standard seltzer
          break;
        case "cocktail":
          alcoholGrams = 17 * drink.quantity; // ~17g per standard cocktail
          break;
        default:
          alcoholGrams = 14 * drink.quantity; // Default to standard drink
      }
      
      totalAlcoholGrams += alcoholGrams;
    });
    
    // BAC = (Alcohol consumed in grams / (Body weight in grams * r)) * 100
    let bac = (totalAlcoholGrams / (weightInKg * 1000 * r)) * 100;
    
    // Subtract alcohol eliminated by the liver (approximately 0.015% per hour)
    bac -= 0.015 * hours;
    
    // Can't have negative BAC
    bac = Math.max(0, bac);
    
    return bac;
  };

  const getBACCategory = (bac: number) => {
    if (bac === 0) return { level: "None", description: "No alcohol in bloodstream", color: "success" };
    if (bac < 0.03) return { level: "Minimal", description: "Minimal effects", color: "success" };
    if (bac < 0.06) return { level: "Mild", description: "Mild relaxation, euphoria, and impairment", color: "success" };
    if (bac < 0.10) return { level: "Moderate", description: "Reduced coordination and judgment", color: "warning" };
    if (bac < 0.15) return { level: "Significant", description: "Significant impairment of physical and mental control", color: "warning" };
    if (bac < 0.20) return { level: "Severe", description: "Severe motor impairment, blackouts possible", color: "error" };
    if (bac < 0.30) return { level: "Very Severe", description: "Confusion, dysphoria, nausea, possible unconsciousness", color: "error" };
    if (bac < 0.40) return { level: "Life-Threatening", description: "Severe central nervous system depression, unconsciousness, risk of death", color: "error" };
    return { level: "Fatal", description: "High risk of death due to respiratory depression", color: "error" };
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const bac = calculateBloodAlcoholContent();
  const bacFixed = bac.toFixed(3);
  const category = getBACCategory(bac);

  // Legal driving limits by country (simplified for common thresholds)
  const getLegalStatus = (bac: number) => {
    if (bac < 0.02) return "Legal in all countries";
    if (bac < 0.03) return "Legal in most countries, illegal in some";
    if (bac < 0.05) return "Legal in some countries, illegal in others";
    if (bac < 0.08) return "Illegal in most countries";
    return "Illegal in virtually all countries";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Unit System</Label>
                <RadioGroup
                  value={unitSystem}
                  onValueChange={setUnitSystem}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="metric" id="metric" />
                    <Label htmlFor="metric">Metric (kg)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="imperial" id="imperial" />
                    <Label htmlFor="imperial">Imperial (lbs)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <CalculatorNumberInput
                label="Weight"
                value={weight}
                onChange={setWeight}
                min={unitSystem === "metric" ? 30 : 66}
                max={unitSystem === "metric" ? 300 : 660}
                unit={unitSystem === "metric" ? "kg" : "lbs"}
                required
              />
              
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                  value={gender}
                  onValueChange={setGender}
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
            </div>
            
            <div className="space-y-4">
              <CalculatorNumberInput
                label="Hours Since First Drink"
                value={hours}
                onChange={setHours}
                min={0}
                max={24}
                step={0.5}
                required
              />
              
              <div className="space-y-2">
                <Label className="mb-1 block">Alcoholic Drinks Consumed</Label>
                <div className="space-y-3">
                  {drinks.map((drink, index) => (
                    <div key={index} className="flex space-x-2">
                      <Select 
                        value={drink.type} 
                        onValueChange={(value) => updateDrinkType(index, value)}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select drink type" />
                        </SelectTrigger>
                        <SelectContent>
                          {drinkOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <CalculatorNumberInput
                        label=""
                        value={drink.quantity}
                        onChange={(value) => updateDrinkQuantity(index, value)}
                        min={1}
                        max={20}
                        className="w-24"
                      />
                      
                      {drinks.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeDrink(index)}
                          className="mt-1 h-10 w-10"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addDrink}
                  className="mt-2"
                >
                  Add Another Drink
                </Button>
              </div>
            </div>
          </div>
          
          <Button className="w-full mt-6" onClick={handleCalculate}>
            Calculate BAC
          </Button>
        </CardContent>
      </Card>
      
      {showResults && (
        <CalculatorResult title="Blood Alcohol Content (BAC) Estimate">
          <div className="space-y-6">
            <div className="p-6 bg-muted rounded-lg text-center">
              <h3 className="text-lg font-medium">Estimated BAC</h3>
              <p className="text-5xl font-bold mt-2">{bacFixed}%</p>
              <p className={`text-md font-semibold mt-2 text-${category.color}-600`}>
                {category.level} - {category.description}
              </p>
              <div className="mt-4">
                <Progress
                  value={Math.min(bac * 250, 100)}
                  className={`h-2 ${
                    bac < 0.06 
                      ? "bg-green-100" 
                      : bac < 0.15 
                      ? "bg-yellow-100" 
                      : "bg-red-100"
                  }`}
                />
                <div className="flex justify-between text-xs mt-1">
                  <span>0.00%</span>
                  <span>0.08%</span>
                  <span>0.20%</span>
                  <span>0.40%</span>
                </div>
              </div>
            </div>
            
            <ResultAlert 
              type={
                bac < 0.06 
                  ? "success" 
                  : bac < 0.15 
                  ? "warning" 
                  : "error"
              } 
              title="BAC Level Assessment"
            >
              <div className="space-y-2">
                <p><strong>Impairment Level:</strong> {category.level}</p>
                <p><strong>Effects:</strong> {category.description}</p>
                <p><strong>Legal Status:</strong> {getLegalStatus(bac)}</p>
                {bac >= 0.08 && (
                  <p className="font-semibold text-red-500">
                    You are above the legal driving limit in most countries. DO NOT DRIVE.
                  </p>
                )}
              </div>
            </ResultAlert>
            
            <div className="mt-4 text-sm">
              <h3 className="font-semibold mb-2">Important Notes:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>This is an estimate only and should not be used to determine if you are safe to drive.</li>
                <li>Many factors can affect BAC including medications, food consumption, and individual metabolism.</li>
                <li>The only accurate measurement of BAC is through blood testing or calibrated breathalyzer devices.</li>
                <li>Even low levels of alcohol can impair driving ability and reaction time.</li>
                <li>The safest approach is to avoid driving after consuming any alcohol.</li>
              </ul>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
