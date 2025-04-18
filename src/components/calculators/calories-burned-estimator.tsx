
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { CalculatorResult } from "@/components/calculator/calculator-result";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Activity, Flame } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// MET values for various activities
const activities = [
  { name: "Walking (2.5 mph, level surface)", met: 3.0 },
  { name: "Walking (3.5 mph, level surface)", met: 4.3 },
  { name: "Walking (4.0 mph, very brisk pace)", met: 5.0 },
  { name: "Hiking", met: 6.0 },
  { name: "Jogging (5 mph)", met: 8.0 },
  { name: "Running (6 mph)", met: 9.8 },
  { name: "Running (7.5 mph)", met: 11.8 },
  { name: "Running (10 mph)", met: 16.0 },
  { name: "Cycling (10-12 mph, leisure)", met: 6.0 },
  { name: "Cycling (12-14 mph, moderate)", met: 8.0 },
  { name: "Cycling (14-16 mph, vigorous)", met: 10.0 },
  { name: "Cycling (16-20 mph, racing)", met: 12.0 },
  { name: "Swimming (leisure)", met: 6.0 },
  { name: "Swimming (moderate)", met: 8.0 },
  { name: "Swimming (fast, vigorous)", met: 10.0 },
  { name: "Aerobics", met: 7.0 },
  { name: "Weight lifting (light/moderate)", met: 3.5 },
  { name: "Weight lifting (vigorous)", met: 6.0 },
  { name: "Basketball (game)", met: 8.0 },
  { name: "Basketball (recreational)", met: 6.0 },
  { name: "Soccer", met: 7.0 },
  { name: "Tennis (singles)", met: 8.0 },
  { name: "Tennis (doubles)", met: 6.0 },
  { name: "Volleyball (non-competitive)", met: 3.0 },
  { name: "Volleyball (competitive)", met: 8.0 },
  { name: "Dancing (ballroom)", met: 4.5 },
  { name: "Dancing (aerobic/ballet)", met: 6.5 },
  { name: "Yoga", met: 2.5 },
  { name: "Pilates", met: 3.0 },
  { name: "Gardening", met: 4.0 },
  { name: "Housework", met: 3.5 },
  { name: "Skiing (downhill, moderate)", met: 5.8 },
  { name: "Skiing (cross-country)", met: 9.0 },
  { name: "Elliptical trainer", met: 5.0 },
  { name: "Stair climbing", met: 9.0 },
  { name: "Rowing (moderate)", met: 7.0 },
  { name: "Rowing (vigorous)", met: 12.0 },
  { name: "Jump rope", met: 12.3 },
];

export function CaloriesBurnedEstimator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState<number>(70);
  const [activity, setActivity] = useState<string>(activities[0].name);
  const [duration, setDuration] = useState<number>(30);
  const [showResults, setShowResults] = useState(false);
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  const { toast } = useToast();

  const calculateCaloriesBurned = () => {
    if (weight <= 0 || duration <= 0) {
      toast({
        title: "Invalid input",
        description: "Please enter valid weight and duration values",
        variant: "destructive",
      });
      return;
    }

    const selectedActivity = activities.find(a => a.name === activity);
    if (!selectedActivity) return;

    // Calories = MET * weight in kg * duration in hours
    const durationInHours = duration / 60;
    let calories = selectedActivity.met * weight * durationInHours;
    
    // Gender adjustment (women generally burn slightly fewer calories)
    if (gender === "female") {
      calories = calories * 0.9;
    }
    
    // Round to nearest whole number
    calories = Math.round(calories);
    
    setCaloriesBurned(calories);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setShowResults(false);
    setCaloriesBurned(0);
  };

  const getMET = (activityName: string): number => {
    const selectedActivity = activities.find(a => a.name === activityName);
    return selectedActivity ? selectedActivity.met : 0;
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
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup 
                    defaultValue="male" 
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
                  label="Weight"
                  value={weight}
                  onChange={setWeight}
                  min={30}
                  max={250}
                  unit="kg"
                  required
                />
                
                <div className="space-y-2">
                  <Label htmlFor="activity-select">Activity Type</Label>
                  <Select
                    value={activity}
                    onValueChange={setActivity}
                  >
                    <SelectTrigger id="activity-select" className="w-full">
                      <SelectValue placeholder="Select activity" />
                    </SelectTrigger>
                    <SelectContent>
                      {activities.map((act) => (
                        <SelectItem key={act.name} value={act.name}>
                          {act.name} (MET: {act.met})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">MET: {getMET(activity)} - Metabolic equivalent of task</p>
                </div>
                
                <CalculatorNumberInput
                  label="Duration"
                  value={duration}
                  onChange={setDuration}
                  min={1}
                  max={300}
                  unit="minutes"
                  required
                />
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={resetCalculator}
                    disabled={!showResults}
                  >
                    Reset
                  </Button>
                  <Button onClick={calculateCaloriesBurned}>Calculate</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="info" className="space-y-4">
              <h3 className="text-lg font-semibold">About Calories Burned Estimation</h3>
              <p>This calculator estimates the number of calories burned during various physical activities based on your weight, the activity's intensity, and its duration.</p>
              
              <h4 className="font-medium mt-4">How It Works</h4>
              <p>The calculation uses MET (Metabolic Equivalent of Task) values, which represent the energy cost of physical activities as multiples of the resting metabolic rate.</p>
              
              <div className="bg-muted p-3 rounded-md mt-2">
                <p className="text-sm"><strong>Formula:</strong> Calories Burned = MET × Weight (kg) × Duration (hours)</p>
              </div>
              
              <h4 className="font-medium mt-4">MET Values</h4>
              <p>MET values indicate how many times more energy an activity requires compared to sitting at rest:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                <li><strong>1 MET</strong> = Resting energy expenditure (sitting quietly)</li>
                <li><strong>2-3 METs</strong> = Light intensity activities</li>
                <li><strong>4-6 METs</strong> = Moderate intensity activities</li>
                <li><strong>7+ METs</strong> = Vigorous intensity activities</li>
              </ul>
              
              <p className="text-sm mt-4">Note: These are estimates and actual calorie expenditure may vary based on individual factors such as fitness level, body composition, age, and environmental conditions.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showResults && (
        <CalculatorResult 
          title="Calories Burned Estimation" 
          description={`${activity} for ${duration} minutes`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="bg-muted rounded-full p-4">
                <Flame className="h-10 w-10 text-orange-500" />
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-4xl font-bold">{caloriesBurned} calories</p>
              <p className="text-lg text-muted-foreground">Estimated calories burned</p>
            </div>
            
            <div className="bg-muted p-4 rounded-md text-sm space-y-2">
              <div className="flex justify-between">
                <span>Activity:</span>
                <span className="font-medium">{activity}</span>
              </div>
              <div className="flex justify-between">
                <span>MET Value:</span>
                <span className="font-medium">{getMET(activity)}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium">{duration} minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Weight:</span>
                <span className="font-medium">{weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span>Gender Adjustment:</span>
                <span className="font-medium">{gender === "female" ? "Applied (-10%)" : "None"}</span>
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-sm">These calculations provide an estimate of calories burned. Actual values may vary based on individual factors and exercise intensity.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
