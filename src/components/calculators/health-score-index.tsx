
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Heart, 
  Scale, 
  Dumbbell, 
  Brain, 
  Pizza, 
  Cigarette, 
  Wine,
  Download 
} from "lucide-react";

type Gender = "male" | "female";
type SmokerStatus = "never" | "former" | "current";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive";

interface HealthFactor {
  name: string;
  value: number;
  score: number;
  percentage: number;
  maxScore: number;
  color: string;
  icon: JSX.Element;
}

export function HealthScoreIndex() {
  // Basic information
  const [age, setAge] = useState<number>(40);
  const [gender, setGender] = useState<Gender>("female");
  
  // Biometric measurements
  const [height, setHeight] = useState<number>(165);
  const [heightUnit, setHeightUnit] = useState<string>("cm");
  const [weight, setWeight] = useState<number>(68);
  const [weightUnit, setWeightUnit] = useState<string>("kg");
  const [systolic, setSystolic] = useState<number>(120);
  const [diastolic, setDiastolic] = useState<number>(80);
  const [restingHeartRate, setRestingHeartRate] = useState<number>(70);
  
  // Lifestyle factors
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [smokerStatus, setSmokerStatus] = useState<SmokerStatus>("never");
  const [alcoholDrinks, setAlcoholDrinks] = useState<number>(3);
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [stressLevel, setStressLevel] = useState<number>(5);
  const [dietQuality, setDietQuality] = useState<number>(6);
  
  // Health score results
  const [healthFactors, setHealthFactors] = useState<HealthFactor[] | null>(null);
  const [overallScore, setOverallScore] = useState<number | null>(null);
  const [healthStatus, setHealthStatus] = useState<string>("");
  
  const calculateHealthScore = () => {
    // Convert units if needed
    let heightInCm = height;
    if (heightUnit === "ft") {
      heightInCm = height * 30.48;
    }
    
    let weightInKg = weight;
    if (weightUnit === "lb") {
      weightInKg = weight * 0.453592;
    }
    
    // Calculate BMI
    const heightInM = heightInCm / 100;
    const bmi = weightInKg / (heightInM * heightInM);
    
    // Score each factor (higher is better, max 10 points per factor)
    
    // 1. BMI Score (ideal range: 18.5-25)
    let bmiScore = 10;
    if (bmi < 18.5) {
      bmiScore = 7; // Underweight
    } else if (bmi > 25 && bmi <= 30) {
      bmiScore = 6; // Overweight
    } else if (bmi > 30 && bmi <= 35) {
      bmiScore = 3; // Obese Class I
    } else if (bmi > 35) {
      bmiScore = 1; // Obese Class II+
    }
    
    // 2. Blood Pressure Score (ideal: <120/80)
    let bpScore = 10;
    if (systolic >= 120 && systolic < 130 && diastolic < 80) {
      bpScore = 8; // Elevated
    } else if ((systolic >= 130 && systolic < 140) || (diastolic >= 80 && diastolic < 90)) {
      bpScore = 6; // Stage 1 Hypertension
    } else if (systolic >= 140 || diastolic >= 90) {
      bpScore = 3; // Stage 2 Hypertension
    }
    
    // 3. Resting Heart Rate Score (ideal: 60-70 bpm)
    let rhrScore = 10;
    if (restingHeartRate > 70 && restingHeartRate <= 80) {
      rhrScore = 8;
    } else if (restingHeartRate > 80 && restingHeartRate <= 90) {
      rhrScore = 6;
    } else if (restingHeartRate > 90) {
      rhrScore = 4;
    }
    
    // 4. Physical Activity Score
    const activityScores = {
      sedentary: 1,
      light: 4,
      moderate: 7,
      active: 9,
      veryActive: 10
    };
    const activityScore = activityScores[activityLevel];
    
    // 5. Smoking Score
    const smokingScores = {
      never: 10,
      former: 5,
      current: 0
    };
    const smokingScore = smokingScores[smokerStatus];
    
    // 6. Alcohol Score (0-2 drinks is ideal)
    let alcoholScore = 10;
    if (alcoholDrinks > 2 && alcoholDrinks <= 7) {
      alcoholScore = 7;
    } else if (alcoholDrinks > 7 && alcoholDrinks <= 14) {
      alcoholScore = 4;
    } else if (alcoholDrinks > 14) {
      alcoholScore = 1;
    }
    
    // 7. Sleep Score (7-9 hours is ideal)
    let sleepScore = 10;
    if (sleepHours >= 6 && sleepHours < 7) {
      sleepScore = 7;
    } else if (sleepHours > 9 && sleepHours <= 10) {
      sleepScore = 7;
    } else if (sleepHours < 6 || sleepHours > 10) {
      sleepScore = 4;
    }
    
    // 8. Diet Quality Score (directly use the 1-10 rating)
    const dietScore = dietQuality;
    
    // 9. Stress Score (reverse scale: 10 - stress level)
    const stressScore = 10 - stressLevel;
    
    // 10. Age-related adjustment
    // This gives a slight advantage to younger people, max 10 points
    const maxAge = 100;
    const ageScore = Math.max(1, 10 - Math.floor((age / maxAge) * 10));
    
    // Create health factors array
    const factors: HealthFactor[] = [
      {
        name: "BMI",
        value: parseFloat(bmi.toFixed(1)),
        score: bmiScore,
        percentage: (bmiScore / 10) * 100,
        maxScore: 10,
        color: "#3b82f6", // blue
        icon: <Scale className="h-4 w-4" />
      },
      {
        name: "Blood Pressure",
        value: systolic / diastolic,
        score: bpScore,
        percentage: (bpScore / 10) * 100,
        maxScore: 10,
        color: "#ef4444", // red
        icon: <Heart className="h-4 w-4" />
      },
      {
        name: "Heart Rate",
        value: restingHeartRate,
        score: rhrScore,
        percentage: (rhrScore / 10) * 100,
        maxScore: 10,
        color: "#ec4899", // pink
        icon: <Activity className="h-4 w-4" />
      },
      {
        name: "Physical Activity",
        value: activityLevel === "sedentary" ? 1 : 
               activityLevel === "light" ? 2 :
               activityLevel === "moderate" ? 3 :
               activityLevel === "active" ? 4 : 5,
        score: activityScore,
        percentage: (activityScore / 10) * 100,
        maxScore: 10,
        color: "#10b981", // green
        icon: <Dumbbell className="h-4 w-4" />
      },
      {
        name: "Smoking",
        value: smokerStatus === "never" ? 0 : smokerStatus === "former" ? 1 : 2,
        score: smokingScore,
        percentage: (smokingScore / 10) * 100,
        maxScore: 10,
        color: "#6366f1", // indigo
        icon: <Cigarette className="h-4 w-4" />
      },
      {
        name: "Alcohol",
        value: alcoholDrinks,
        score: alcoholScore,
        percentage: (alcoholScore / 10) * 100,
        maxScore: 10,
        color: "#f97316", // orange
        icon: <Wine className="h-4 w-4" />
      },
      {
        name: "Sleep",
        value: sleepHours,
        score: sleepScore,
        percentage: (sleepScore / 10) * 100,
        maxScore: 10,
        color: "#8b5cf6", // violet
        icon: <Brain className="h-4 w-4" />
      },
      {
        name: "Diet",
        value: dietQuality,
        score: dietScore,
        percentage: (dietScore / 10) * 100,
        maxScore: 10,
        color: "#14b8a6", // teal
        icon: <Pizza className="h-4 w-4" />
      },
      {
        name: "Stress",
        value: stressLevel,
        score: stressScore,
        percentage: (stressScore / 10) * 100,
        maxScore: 10,
        color: "#f59e0b", // amber
        icon: <Brain className="h-4 w-4" />
      },
      {
        name: "Age Factor",
        value: age,
        score: ageScore,
        percentage: (ageScore / 10) * 100,
        maxScore: 10,
        color: "#64748b", // slate
        icon: <Activity className="h-4 w-4" />
      }
    ];
    
    // Calculate overall score (weighted average)
    // Weights: BMI (1.5), BP (1.5), RHR (1), Activity (1.5), Smoking (2),
    //          Alcohol (1), Sleep (1), Diet (1.5), Stress (1), Age (0.5)
    const weights = [1.5, 1.5, 1, 1.5, 2, 1, 1, 1.5, 1, 0.5];
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    
    const weightedSum = factors.reduce((sum, factor, index) => {
      return sum + (factor.score * weights[index]);
    }, 0);
    
    const calculatedScore = Math.round(weightedSum / totalWeight * 10);
    
    setHealthFactors(factors);
    setOverallScore(calculatedScore);
    
    // Determine health status
    if (calculatedScore >= 90) {
      setHealthStatus("Excellent");
    } else if (calculatedScore >= 80) {
      setHealthStatus("Very Good");
    } else if (calculatedScore >= 70) {
      setHealthStatus("Good");
    } else if (calculatedScore >= 60) {
      setHealthStatus("Fair");
    } else {
      setHealthStatus("Needs Improvement");
    }
  };
  
  const downloadReport = () => {
    if (!healthFactors || overallScore === null) return;
    
    // Create CSV content
    const csvContent = [
      "Health Factor,Value,Score,Maximum Score",
      ...healthFactors.map(factor => 
        `${factor.name},${factor.value},${factor.score},${factor.maxScore}`
      ),
      `Overall Health Score,${overallScore},100,100`
    ].join("\n");
    
    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `health-score-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-blue-500";
    if (score >= 70) return "text-yellow-500";
    if (score >= 60) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="biometrics" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="biometrics">Biometrics</TabsTrigger>
              <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
              <TabsTrigger value="medical">Medical</TabsTrigger>
            </TabsList>
            
            <TabsContent value="biometrics" className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                    className="flex flex-row space-x-4"
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
              
              <div className="grid grid-cols-2 gap-4">
                <CalculatorNumberInput
                  label="Systolic BP"
                  value={systolic}
                  onChange={setSystolic}
                  min={80}
                  max={200}
                  step={1}
                  unit="mmHg"
                  required
                />
                
                <CalculatorNumberInput
                  label="Diastolic BP"
                  value={diastolic}
                  onChange={setDiastolic}
                  min={40}
                  max={120}
                  step={1}
                  unit="mmHg"
                  required
                />
              </div>
              
              <CalculatorNumberInput
                label="Resting Heart Rate"
                value={restingHeartRate}
                onChange={setRestingHeartRate}
                min={40}
                max={120}
                step={1}
                unit="bpm"
                required
              />
            </TabsContent>
            
            <TabsContent value="lifestyle" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label>Physical Activity Level</Label>
                <Select value={activityLevel} onValueChange={(value) => setActivityLevel(value as ActivityLevel)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                    <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="veryActive">Very Active (intense daily exercise or physical job)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Smoking Status</Label>
                <RadioGroup
                  value={smokerStatus}
                  onValueChange={(value) => setSmokerStatus(value as SmokerStatus)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="never" id="never-smoked" />
                    <Label htmlFor="never-smoked">Never Smoked</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="former" id="former-smoker" />
                    <Label htmlFor="former-smoker">Former Smoker</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="current" id="current-smoker" />
                    <Label htmlFor="current-smoker">Current Smoker</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <CalculatorNumberInput
                label="Alcoholic Drinks Per Week"
                value={alcoholDrinks}
                onChange={setAlcoholDrinks}
                min={0}
                max={50}
                step={1}
                required
              />
              
              <CalculatorNumberInput
                label="Average Sleep Duration"
                value={sleepHours}
                onChange={setSleepHours}
                min={4}
                max={12}
                step={0.5}
                unit="hours"
                required
              />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Diet Quality (1-10)</Label>
                  <span className="text-sm font-medium">{dietQuality}</span>
                </div>
                <Slider 
                  defaultValue={[dietQuality]} 
                  max={10} 
                  min={1} 
                  step={1} 
                  onValueChange={(value) => setDietQuality(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="medical" className="mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Stress Level (1-10)</Label>
                  <span className="text-sm font-medium">{stressLevel}</span>
                </div>
                <Slider 
                  defaultValue={[stressLevel]} 
                  max={10} 
                  min={1} 
                  step={1} 
                  onValueChange={(value) => setStressLevel(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low Stress</span>
                  <span>High Stress</span>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-md mt-6">
                <p className="text-sm">
                  Note: This health score index is a simplified composite measure.
                  It does not account for chronic conditions, medications, family history, 
                  or lab test results that would provide a more comprehensive assessment.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <Button onClick={calculateHealthScore} className="w-full mt-6">
            Calculate Health Score
          </Button>
        </CardContent>
      </Card>

      {overallScore !== null && healthFactors && (
        <CalculatorResult 
          title="Your Health Score Index" 
          onDownload={downloadReport}
        >
          <div className="space-y-6">
            <div className="flex justify-center items-center mb-4">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 leading-none">
                  <span className={getHealthScoreColor(overallScore)}>{overallScore}</span>
                  <span className="text-2xl text-muted-foreground">/100</span>
                </div>
                <p className="text-xl font-medium">{healthStatus}</p>
              </div>
            </div>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={healthFactors}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="score"
                    nameKey="name"
                  >
                    {healthFactors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [`${value}/10`, name]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <ResultAlert 
              type={
                healthStatus === "Excellent" || healthStatus === "Very Good" 
                  ? "success" 
                  : healthStatus === "Good" 
                    ? "info" 
                    : healthStatus === "Fair" 
                      ? "warning" 
                      : "error"
              }
              title={`${healthStatus} Health Status`}
            >
              <p>
                Your composite health score of {overallScore} indicates {healthStatus.toLowerCase()} overall health based on the factors evaluated.
                {healthStatus === "Excellent" && " Keep up the great work with your healthy habits!"}
                {healthStatus === "Very Good" && " You're doing well, with just a few areas that could be improved."}
                {healthStatus === "Good" && " You have several strong health areas, but others need attention."}
                {healthStatus === "Fair" && " Several areas need improvement to reduce health risks."}
                {healthStatus === "Needs Improvement" && " Multiple health factors need significant improvement to reduce health risks."}
              </p>
            </ResultAlert>
            
            <div className="space-y-3">
              <h4 className="font-medium">Health Factor Breakdown</h4>
              {healthFactors.map((factor, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-3">
                    {factor.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{factor.name}</p>
                      <p className="text-sm font-medium">{factor.score}/10</p>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full mt-1">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${factor.percentage}%`,
                          backgroundColor: factor.color
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-muted rounded-md text-sm">
              <p className="font-medium mb-2">Improvement Opportunities:</p>
              <ul className="list-disc pl-5 space-y-1">
                {healthFactors
                  .filter(f => f.score < 7)
                  .map((factor, index) => {
                    let tip = "";
                    switch (factor.name) {
                      case "BMI":
                        tip = "Consider working with a healthcare provider on a weight management plan.";
                        break;
                      case "Blood Pressure":
                        tip = "Reduce sodium intake, increase physical activity, and manage stress to improve blood pressure.";
                        break;
                      case "Heart Rate":
                        tip = "Regular cardiovascular exercise can help lower resting heart rate.";
                        break;
                      case "Physical Activity":
                        tip = "Aim for at least 150 minutes of moderate activity per week.";
                        break;
                      case "Smoking":
                        tip = "Quitting smoking is one of the most beneficial things you can do for your health.";
                        break;
                      case "Alcohol":
                        tip = "Limit alcohol to 1 drink per day for women or 2 for men.";
                        break;
                      case "Sleep":
                        tip = "Aim for 7-9 hours of quality sleep per night.";
                        break;
                      case "Diet":
                        tip = "Focus on fruits, vegetables, whole grains, and lean proteins.";
                        break;
                      case "Stress":
                        tip = "Practice stress management techniques like meditation or deep breathing.";
                        break;
                      default:
                        tip = "Work with a healthcare provider to improve this area.";
                    }
                    return <li key={index}><strong>{factor.name}:</strong> {tip}</li>;
                  })
                }
                {healthFactors.filter(f => f.score < 7).length === 0 && (
                  <li>Great job! You don't have any major areas needing immediate improvement.</li>
                )}
              </ul>
              <p className="mt-4 text-muted-foreground">
                This assessment is for informational purposes only and should not replace professional medical advice.
              </p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
