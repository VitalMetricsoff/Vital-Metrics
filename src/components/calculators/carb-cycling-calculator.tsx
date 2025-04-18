
import { useState } from "react";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { Button } from "@/components/ui/button";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CarbCyclingCalculator() {
  const [weight, setWeight] = useState<number>(70);
  const [unitSystem, setUnitSystem] = useState<string>("metric");
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [goal, setGoal] = useState<string>("maintain");
  const [workoutDays, setWorkoutDays] = useState<number>(4);
  const [showResults, setShowResults] = useState(false);

  const calculateCarbCycling = () => {
    // Convert weight to kg if in imperial units
    const weightInKg = unitSystem === "imperial" ? weight * 0.45359237 : weight;
    
    // Calculate base calories and macros based on weight and activity level
    let proteinPerKg = 2.0; // g/kg
    let fatPerKg = 1.0; // g/kg
    
    // Base carb calculations
    let highCarbDay = 0;
    let moderateCarbDay = 0;
    let lowCarbDay = 0;
    
    // Adjust macros based on activity level
    switch (activityLevel) {
      case "sedentary":
        highCarbDay = 3;
        moderateCarbDay = 2;
        lowCarbDay = 1;
        break;
      case "light":
        highCarbDay = 4;
        moderateCarbDay = 2.5;
        lowCarbDay = 1;
        break;
      case "moderate":
        highCarbDay = 5;
        moderateCarbDay = 3;
        lowCarbDay = 1.5;
        break;
      case "active":
        highCarbDay = 6;
        moderateCarbDay = 4;
        lowCarbDay = 2;
        break;
      case "veryActive":
        highCarbDay = 7;
        moderateCarbDay = 5;
        lowCarbDay = 2.5;
        break;
      default:
        highCarbDay = 5;
        moderateCarbDay = 3;
        lowCarbDay = 1.5;
    }
    
    // Adjust based on goal
    if (goal === "lose") {
      highCarbDay *= 0.85;
      moderateCarbDay *= 0.85;
      lowCarbDay *= 0.85;
    } else if (goal === "gain") {
      highCarbDay *= 1.15;
      moderateCarbDay *= 1.15;
      lowCarbDay *= 1.15;
    }
    
    // Calculate daily macros
    const proteinGrams = Math.round(weightInKg * proteinPerKg);
    const fatGrams = Math.round(weightInKg * fatPerKg);
    
    const highCarbGrams = Math.round(weightInKg * highCarbDay);
    const moderateCarbGrams = Math.round(weightInKg * moderateCarbDay);
    const lowCarbGrams = Math.round(weightInKg * lowCarbDay);
    
    // Calculate calories
    const highCarbCalories = (proteinGrams * 4) + (fatGrams * 9) + (highCarbGrams * 4);
    const moderateCarbCalories = (proteinGrams * 4) + (fatGrams * 9) + (moderateCarbGrams * 4);
    const lowCarbCalories = (proteinGrams * 4) + (fatGrams * 9) + (lowCarbGrams * 4);
    
    // Weekly distribution based on workout days
    const restDays = 7 - workoutDays;
    
    // Distribute high and low carb days based on workout days
    const highCarbDays = Math.min(workoutDays, 2); // Max 2 high carb days
    const lowCarbDays = Math.min(restDays, 2); // Max 2 low carb days
    const moderateCarbDays = 7 - highCarbDays - lowCarbDays;
    
    return {
      // Daily macros
      protein: proteinGrams,
      fat: fatGrams,
      
      // Carb days
      highCarb: {
        carbs: highCarbGrams,
        calories: highCarbCalories,
        days: highCarbDays
      },
      moderateCarb: {
        carbs: moderateCarbGrams,
        calories: moderateCarbCalories,
        days: moderateCarbDays
      },
      lowCarb: {
        carbs: lowCarbGrams,
        calories: lowCarbCalories,
        days: lowCarbDays
      }
    };
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const results = calculateCarbCycling();

  // Generate weekly schedule
  const generateSchedule = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const schedule = [];
    
    let remainingHighDays = results.highCarb.days;
    let remainingModerateDays = results.moderateCarb.days;
    let remainingLowDays = results.lowCarb.days;
    
    // Distribute workout days first, prioritizing high carb days
    for (let i = 0; i < workoutDays; i++) {
      if (remainingHighDays > 0) {
        schedule.push({ day: days[i], type: 'high', workout: true });
        remainingHighDays--;
      } else {
        schedule.push({ day: days[i], type: 'moderate', workout: true });
        remainingModerateDays--;
      }
    }
    
    // Distribute rest days, prioritizing low carb days
    for (let i = workoutDays; i < 7; i++) {
      if (remainingLowDays > 0) {
        schedule.push({ day: days[i], type: 'low', workout: false });
        remainingLowDays--;
      } else {
        schedule.push({ day: days[i], type: 'moderate', workout: false });
        remainingModerateDays--;
      }
    }
    
    return schedule;
  };

  const weeklySchedule = generateSchedule();

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
              
              <CalculatorNumberInput
                label="Workout Days Per Week"
                value={workoutDays}
                onChange={setWorkoutDays}
                min={1}
                max={7}
                required
              />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Activity Level</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                    <SelectItem value="light">Lightly active (1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderately active (3-5 days/week)</SelectItem>
                    <SelectItem value="active">Very active (6-7 days/week)</SelectItem>
                    <SelectItem value="veryActive">Extremely active (physical job/training)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Goal</Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose">Lose weight</SelectItem>
                    <SelectItem value="maintain">Maintain weight</SelectItem>
                    <SelectItem value="gain">Gain muscle/weight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Button className="w-full mt-6" onClick={handleCalculate}>
            Calculate Carb Cycling Plan
          </Button>
        </CardContent>
      </Card>
      
      {showResults && (
        <CalculatorResult title="Your Carb Cycling Plan">
          <div className="space-y-6">
            <Tabs defaultValue="plan" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="plan">Weekly Plan</TabsTrigger>
                <TabsTrigger value="details">Nutritional Details</TabsTrigger>
              </TabsList>
              <TabsContent value="plan" className="pt-4">
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="p-2 border text-left">Day</th>
                          <th className="p-2 border text-left">Type</th>
                          <th className="p-2 border text-left">Workout</th>
                          <th className="p-2 border text-left">Carbs</th>
                          <th className="p-2 border text-left">Calories</th>
                        </tr>
                      </thead>
                      <tbody>
                        {weeklySchedule.map((day, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                            <td className="p-2 border">{day.day}</td>
                            <td className="p-2 border">
                              <span className={`px-2 py-1 rounded text-xs ${
                                day.type === 'high' ? 'bg-green-100 text-green-800' : 
                                day.type === 'moderate' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {day.type === 'high' ? 'High Carb' : 
                                 day.type === 'moderate' ? 'Moderate Carb' : 
                                 'Low Carb'}
                              </span>
                            </td>
                            <td className="p-2 border">{day.workout ? 'Yes' : 'No'}</td>
                            <td className="p-2 border font-medium">
                              {day.type === 'high' ? results.highCarb.carbs : 
                               day.type === 'moderate' ? results.moderateCarb.carbs : 
                               results.lowCarb.carbs}g
                            </td>
                            <td className="p-2 border font-medium">
                              {day.type === 'high' ? results.highCarb.calories : 
                               day.type === 'moderate' ? results.moderateCarb.calories : 
                               results.lowCarb.calories} cal
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="details" className="pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 border rounded-md">
                      <h3 className="font-semibold text-green-600">High Carb Day</h3>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between">
                          <span>Protein:</span>
                          <span className="font-medium">{results.protein}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Carbs:</span>
                          <span className="font-medium">{results.highCarb.carbs}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fat:</span>
                          <span className="font-medium">{results.fat}g</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span>Total Calories:</span>
                          <span className="font-medium">{results.highCarb.calories}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-md">
                      <h3 className="font-semibold text-blue-600">Moderate Carb Day</h3>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between">
                          <span>Protein:</span>
                          <span className="font-medium">{results.protein}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Carbs:</span>
                          <span className="font-medium">{results.moderateCarb.carbs}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fat:</span>
                          <span className="font-medium">{results.fat}g</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span>Total Calories:</span>
                          <span className="font-medium">{results.moderateCarb.calories}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-md">
                      <h3 className="font-semibold text-yellow-600">Low Carb Day</h3>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between">
                          <span>Protein:</span>
                          <span className="font-medium">{results.protein}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Carbs:</span>
                          <span className="font-medium">{results.lowCarb.carbs}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fat:</span>
                          <span className="font-medium">{results.fat}g</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span>Total Calories:</span>
                          <span className="font-medium">{results.lowCarb.calories}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ResultAlert type="info" title="How to Use This Plan">
                    <p className="mb-2">For optimal results:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Schedule high carb days on your most intense workout days</li>
                      <li>Place low carb days on rest days</li>
                      <li>Keep protein intake consistent across all days</li>
                      <li>Adjust fat intake slightly to maintain energy levels on low carb days</li>
                    </ul>
                  </ResultAlert>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
