import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { Apple, Beef, Carrot, Egg, Fish, Leaf, ScrollText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Gender = "male" | "female";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive";
type LifeStage = "none" | "pregnancy" | "lactation";

interface Nutrient {
  name: string;
  unit: string;
  value: number;
  percentage: number;
  category: "vitamins" | "minerals" | "macros";
  icon: JSX.Element;
  foodSources: string[];
  rda: number;
}

export function MicronutrientNeedsEstimator() {
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<Gender>("female");
  const [weight, setWeight] = useState<number>(65);
  const [weightUnit, setWeightUnit] = useState<string>("kg");
  const [height, setHeight] = useState<number>(165);
  const [heightUnit, setHeightUnit] = useState<string>("cm");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [lifeStage, setLifeStage] = useState<LifeStage>("none");
  const [pregnant, setPregnant] = useState<boolean>(false);
  const [breastfeeding, setBreastfeeding] = useState<boolean>(false);
  const [specialDiet, setSpecialDiet] = useState<string>("none");
  
  const [nutrients, setNutrients] = useState<Nutrient[] | null>(null);
  
  const handleLifeStageChange = (value: string) => {
    setLifeStage(value as LifeStage);
    if (value === "pregnancy") {
      setPregnant(true);
      setBreastfeeding(false);
    } else if (value === "lactation") {
      setPregnant(false);
      setBreastfeeding(true);
    } else {
      setPregnant(false);
      setBreastfeeding(false);
    }
  };
  
  const calculateMicronutrientNeeds = () => {
    // Convert units if needed
    let weightInKg = weight;
    if (weightUnit === "lb") {
      weightInKg = weight * 0.453592;
    }
    
    let heightInCm = height;
    if (heightUnit === "ft") {
      heightInCm = height * 30.48;
    }
    
    // Calculate BMR (using Mifflin-St Jeor Equation)
    let bmr;
    if (gender === "male") {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
    } else {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
    }
    
    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityMultipliers[activityLevel];
    
    // Adjustment for life stage
    let lifeStageMultiplier = 1;
    if (pregnant) {
      lifeStageMultiplier = 1.2; // 20% increase for pregnancy
    } else if (breastfeeding) {
      lifeStageMultiplier = 1.3; // 30% increase for lactation
    }
    const adjustedTdee = tdee * lifeStageMultiplier;
    
    // Base nutrient requirements (RDAs for a reference person)
    // These would be adjusted based on age, gender, and life stage in a real application
    const baseNutrients: Nutrient[] = [
      // Vitamins
      {
        name: "Vitamin A",
        unit: "mcg RAE",
        value: gender === "male" ? 900 : 700,
        percentage: 100,
        category: "vitamins",
        icon: <Carrot className="h-4 w-4" />,
        foodSources: ["Sweet potatoes", "Carrots", "Spinach", "Liver", "Bell peppers"],
        rda: gender === "male" ? 900 : 700
      },
      {
        name: "Vitamin C",
        unit: "mg",
        value: gender === "male" ? 90 : 75,
        percentage: 100,
        category: "vitamins",
        icon: <Apple className="h-4 w-4" />,
        foodSources: ["Citrus fruits", "Strawberries", "Kiwi", "Bell peppers", "Broccoli"],
        rda: gender === "male" ? 90 : 75
      },
      {
        name: "Vitamin D",
        unit: "mcg",
        value: 15,
        percentage: 100,
        category: "vitamins",
        icon: <Fish className="h-4 w-4" />,
        foodSources: ["Fatty fish", "Fortified milk", "Egg yolks", "Mushrooms", "Fortified cereals"],
        rda: 15
      },
      {
        name: "Vitamin E",
        unit: "mg",
        value: 15,
        percentage: 100,
        category: "vitamins",
        icon: <Leaf className="h-4 w-4" />,
        foodSources: ["Sunflower seeds", "Almonds", "Spinach", "Avocado", "Wheat germ"],
        rda: 15
      },
      {
        name: "Vitamin K",
        unit: "mcg",
        value: gender === "male" ? 120 : 90,
        percentage: 100,
        category: "vitamins",
        icon: <Leaf className="h-4 w-4" />,
        foodSources: ["Kale", "Spinach", "Broccoli", "Brussels sprouts", "Green leafy vegetables"],
        rda: gender === "male" ? 120 : 90
      },
      {
        name: "Thiamin (B1)",
        unit: "mg",
        value: gender === "male" ? 1.2 : 1.1,
        percentage: 100,
        category: "vitamins",
        icon: <Apple className="h-4 w-4" />,
        foodSources: ["Whole grains", "Pork", "Beans", "Enriched cereals", "Nuts"],
        rda: gender === "male" ? 1.2 : 1.1
      },
      {
        name: "Riboflavin (B2)",
        unit: "mg",
        value: gender === "male" ? 1.3 : 1.1,
        percentage: 100,
        category: "vitamins",
        icon: <Egg className="h-4 w-4" />,
        foodSources: ["Eggs", "Dairy", "Lean meats", "Green vegetables", "Fortified cereals"],
        rda: gender === "male" ? 1.3 : 1.1
      },
      {
        name: "Niacin (B3)",
        unit: "mg",
        value: gender === "male" ? 16 : 14,
        percentage: 100,
        category: "vitamins",
        icon: <Beef className="h-4 w-4" />,
        foodSources: ["Chicken", "Turkey", "Tuna", "Beef", "Peanuts"],
        rda: gender === "male" ? 16 : 14
      },
      
      // Minerals
      {
        name: "Calcium",
        unit: "mg",
        value: 1000,
        percentage: 100,
        category: "minerals",
        icon: <Egg className="h-4 w-4" />,
        foodSources: ["Dairy products", "Fortified plant milks", "Leafy greens", "Sardines", "Almonds"],
        rda: 1000
      },
      {
        name: "Iron",
        unit: "mg",
        value: gender === "male" ? 8 : 18,
        percentage: 100,
        category: "minerals",
        icon: <Beef className="h-4 w-4" />,
        foodSources: ["Red meat", "Spinach", "Beans", "Lentils", "Fortified cereals"],
        rda: gender === "male" ? 8 : 18
      },
      {
        name: "Magnesium",
        unit: "mg",
        value: gender === "male" ? 420 : 320,
        percentage: 100,
        category: "minerals",
        icon: <Leaf className="h-4 w-4" />,
        foodSources: ["Nuts", "Seeds", "Beans", "Whole grains", "Leafy greens"],
        rda: gender === "male" ? 420 : 320
      },
      {
        name: "Zinc",
        unit: "mg",
        value: gender === "male" ? 11 : 8,
        percentage: 100,
        category: "minerals",
        icon: <Beef className="h-4 w-4" />,
        foodSources: ["Oysters", "Red meat", "Poultry", "Beans", "Nuts"],
        rda: gender === "male" ? 11 : 8
      },
      {
        name: "Selenium",
        unit: "mcg",
        value: 55,
        percentage: 100,
        category: "minerals",
        icon: <Fish className="h-4 w-4" />,
        foodSources: ["Brazil nuts", "Fish", "Meat", "Eggs", "Whole grains"],
        rda: 55
      },
      {
        name: "Potassium",
        unit: "mg",
        value: 3400,
        percentage: 100,
        category: "minerals",
        icon: <Apple className="h-4 w-4" />,
        foodSources: ["Bananas", "Potatoes", "Beans", "Spinach", "Yogurt"],
        rda: 3400
      },
      
      // Macros (included for completeness)
      {
        name: "Protein",
        unit: "g",
        value: 0.8 * weightInKg,
        percentage: 100,
        category: "macros",
        icon: <Beef className="h-4 w-4" />,
        foodSources: ["Meat", "Fish", "Eggs", "Dairy", "Legumes"],
        rda: 0.8 * weightInKg
      },
      {
        name: "Fiber",
        unit: "g",
        value: gender === "male" ? 38 : 25,
        percentage: 100,
        category: "macros",
        icon: <Carrot className="h-4 w-4" />,
        foodSources: ["Whole grains", "Beans", "Fruits", "Vegetables", "Nuts"],
        rda: gender === "male" ? 38 : 25
      }
    ];
    
    // Adjust for life stage (pregnancy or lactation)
    if (pregnant) {
      // Increase requirements for certain nutrients during pregnancy
      baseNutrients.find(n => n.name === "Iron")!.value = 27;
      baseNutrients.find(n => n.name === "Folate")!.value = 600;
      baseNutrients.find(n => n.name === "Calcium")!.value = 1000;
      // Other adjustments would be made in a full implementation
    } else if (breastfeeding) {
      // Increase requirements for certain nutrients during lactation
      baseNutrients.find(n => n.name === "Vitamin A")!.value = 1300;
      baseNutrients.find(n => n.name === "Vitamin C")!.value = 120;
      baseNutrients.find(n => n.name === "Calcium")!.value = 1000;
      // Other adjustments would be made in a full implementation
    }
    
    // Adjust for special diets
    if (specialDiet === "vegetarian") {
      // Increase iron needs due to lower absorption of non-heme iron
      const ironNutrient = baseNutrients.find(n => n.name === "Iron");
      if (ironNutrient) {
        ironNutrient.value = ironNutrient.value * 1.8;
      }
      // Add B12 (often supplemented in vegetarian diets)
      baseNutrients.push({
        name: "Vitamin B12",
        unit: "mcg",
        value: 2.4,
        percentage: 100,
        category: "vitamins",
        icon: <Egg className="h-4 w-4" />,
        foodSources: ["Fortified plant milks", "Nutritional yeast", "Fortified cereals", "Supplements", "Eggs and dairy (for ovo-lacto)"],
        rda: 2.4
      });
    } else if (specialDiet === "vegan") {
      // Increase iron needs due to lower absorption of non-heme iron
      const ironNutrient = baseNutrients.find(n => n.name === "Iron");
      if (ironNutrient) {
        ironNutrient.value = ironNutrient.value * 1.8;
      }
      // Add B12 (required supplementation in vegan diets)
      baseNutrients.push({
        name: "Vitamin B12",
        unit: "mcg",
        value: 2.4,
        percentage: 100,
        category: "vitamins",
        icon: <Egg className="h-4 w-4" />,
        foodSources: ["Fortified plant milks", "Nutritional yeast", "Fortified cereals", "Supplements", "Fortified meat alternatives"],
        rda: 2.4
      });
      // Add omega-3 (EPA/DHA typically from fish)
      baseNutrients.push({
        name: "Omega-3 (EPA/DHA)",
        unit: "mg",
        value: 250,
        percentage: 100,
        category: "macros",
        icon: <Fish className="h-4 w-4" />,
        foodSources: ["Algae oil", "Flaxseeds", "Chia seeds", "Walnuts", "Hemp seeds"],
        rda: 250
      });
    }
    
    // Calculate percentage of RDA
    const adjustedNutrients = baseNutrients.map(nutrient => ({
      ...nutrient,
      percentage: Math.round((nutrient.value / nutrient.rda) * 100)
    }));
    
    setNutrients(adjustedNutrients);
  };

  // Group nutrients by category
  const vitamins = nutrients?.filter(n => n.category === "vitamins") || [];
  const minerals = nutrients?.filter(n => n.category === "minerals") || [];
  const macros = nutrients?.filter(n => n.category === "macros") || [];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <CalculatorNumberInput
              label="Age"
              value={age}
              onChange={setAge}
              min={18}
              max={100}
              step={1}
              required
            />
            
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                value={gender}
                onValueChange={(value) => setGender(value as Gender)}
                className="flex flex-col sm:flex-row sm:space-x-4"
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
            
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select value={activityLevel} onValueChange={(value) => setActivityLevel(value as ActivityLevel)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                  <SelectItem value="veryActive">Very Active (hard exercise/physical job)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {gender === "female" && age >= 18 && age <= 50 && (
              <div className="space-y-2">
                <Label>Life Stage</Label>
                <RadioGroup
                  value={lifeStage}
                  onValueChange={handleLifeStageChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none">None</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pregnancy" id="pregnancy" />
                    <Label htmlFor="pregnancy">Pregnant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lactation" id="lactation" />
                    <Label htmlFor="lactation">Breastfeeding</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            <div className="space-y-2">
              <Label>Special Diet</Label>
              <Select value={specialDiet} onValueChange={setSpecialDiet}>
                <SelectTrigger>
                  <SelectValue placeholder="Select diet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (omnivore)</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={calculateMicronutrientNeeds} className="w-full">
              Calculate Micronutrient Needs
            </Button>
          </div>
        </CardContent>
      </Card>

      {nutrients && (
        <CalculatorResult title="Estimated Micronutrient Needs" onDownload={() => {
          // Simple CSV export
          const csv = [
            "Nutrient,Value,Unit,Percentage of RDA",
            ...nutrients.map(nutrient => 
              `${nutrient.name},${nutrient.value},${nutrient.unit},${nutrient.percentage}%`
            )
          ].join("\n");
          
          const blob = new Blob([csv], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `micronutrient-needs-${new Date().toISOString().split('T')[0]}.csv`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }}>
          <Tabs defaultValue="vitamins" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vitamins">Vitamins</TabsTrigger>
              <TabsTrigger value="minerals">Minerals</TabsTrigger>
              <TabsTrigger value="macros">Macros</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vitamins" className="mt-4 space-y-4">
              {vitamins.map((nutrient, index) => (
                <div key={index} className="flex items-center p-3 bg-muted/30 rounded-md">
                  <div className="mr-3">
                    {nutrient.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <p className="font-medium">{nutrient.name}</p>
                      <p className="font-semibold">
                        {nutrient.value} {nutrient.unit}
                      </p>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full mt-1">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${Math.min(100, nutrient.percentage)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>RDA: {nutrient.rda} {nutrient.unit}</span>
                      <span>{nutrient.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="minerals" className="mt-4 space-y-4">
              {minerals.map((nutrient, index) => (
                <div key={index} className="flex items-center p-3 bg-muted/30 rounded-md">
                  <div className="mr-3">
                    {nutrient.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <p className="font-medium">{nutrient.name}</p>
                      <p className="font-semibold">
                        {nutrient.value} {nutrient.unit}
                      </p>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full mt-1">
                      <div 
                        className="bg-secondary h-2 rounded-full" 
                        style={{ width: `${Math.min(100, nutrient.percentage)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>RDA: {nutrient.rda} {nutrient.unit}</span>
                      <span>{nutrient.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="macros" className="mt-4 space-y-4">
              {macros.map((nutrient, index) => (
                <div key={index} className="flex items-center p-3 bg-muted/30 rounded-md">
                  <div className="mr-3">
                    {nutrient.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <p className="font-medium">{nutrient.name}</p>
                      <p className="font-semibold">
                        {nutrient.value} {nutrient.unit}
                      </p>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full mt-1">
                      <div 
                        className="bg-accent h-2 rounded-full" 
                        style={{ width: `${Math.min(100, nutrient.percentage)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>RDA: {nutrient.rda} {nutrient.unit}</span>
                      <span>{nutrient.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 p-4 bg-muted rounded-md">
            <div className="flex items-start">
              <ScrollText className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-muted-foreground" />
              <div className="space-y-2 text-sm">
                <p className="font-medium">Food sources for key nutrients:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {nutrients.slice(0, 5).map((nutrient, index) => (
                    <li key={index}>
                      <span className="font-medium">{nutrient.name}:</span> {nutrient.foodSources.join(", ")}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-muted-foreground">
                  Note: These are estimates based on general recommendations. 
                  Individual needs may vary. Consult a healthcare provider or registered dietitian for personalized guidance.
                </p>
              </div>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
