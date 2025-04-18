import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalculatorNumberInput } from "@/components/calculator/calculator-number-input";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThumbsUp, ThumbsDown, Clock, HeartPulse, Droplet, CalendarClock } from "lucide-react";
import { addMonths, format } from "date-fns";

interface Question {
  id: string;
  text: string;
  disqualifying: boolean;
  temporaryDisqualification?: {
    duration: number; // in months
    reason: string;
  };
  category: "general" | "medical" | "travel" | "lifestyle";
}

type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "unknown";
type Gender = "male" | "female";

export function BloodDonationEligibilityChecker() {
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);
  const [weightUnit, setWeightUnit] = useState<string>("kg");
  const [height, setHeight] = useState<number>(170);
  const [heightUnit, setHeightUnit] = useState<string>("cm");
  const [gender, setGender] = useState<Gender>("male");
  const [bloodType, setBloodType] = useState<BloodType>("unknown");
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [temporaryRestriction, setTemporaryRestriction] = useState<{
    until: Date;
    reason: string;
  } | null>(null);
  const [eligibilityReason, setEligibilityReason] = useState<string>("");
  const [nextDonationDate, setNextDonationDate] = useState<Date | null>(null);
  
  const calculateBMI = () => {
    let heightInM = height;
    if (heightUnit === "cm") {
      heightInM = height / 100;
    } else if (heightUnit === "ft") {
      heightInM = height * 0.3048;
    }
    
    let weightInKg = weight;
    if (weightUnit === "lb") {
      weightInKg = weight * 0.453592;
    }
    
    return weightInKg / (heightInM * heightInM);
  };
  
  const questions: Question[] = [
    {
      id: "recent_donation",
      text: "Have you donated whole blood in the last 8 weeks?",
      disqualifying: false,
      temporaryDisqualification: {
        duration: 2,
        reason: "Must wait 8 weeks between whole blood donations"
      },
      category: "general"
    },
    {
      id: "pregnancy",
      text: "Are you pregnant or have you given birth in the last 6 weeks?",
      disqualifying: false,
      temporaryDisqualification: {
        duration: 6,
        reason: "Must wait until 6 weeks after giving birth"
      },
      category: "general"
    },
    {
      id: "feeling_ill",
      text: "Are you feeling unwell or currently have a cold, flu, or infection?",
      disqualifying: false,
      temporaryDisqualification: {
        duration: 1,
        reason: "Must be symptom-free for at least 2 weeks"
      },
      category: "general"
    },
    
    {
      id: "cancer",
      text: "Do you have active cancer or are currently receiving cancer treatment?",
      disqualifying: true,
      category: "medical"
    },
    {
      id: "heart_disease",
      text: "Have you had a heart attack, heart failure, or severe heart disease?",
      disqualifying: true,
      category: "medical"
    },
    {
      id: "blood_condition",
      text: "Do you have a bleeding condition or blood disease?",
      disqualifying: true,
      category: "medical"
    },
    {
      id: "antibiotics",
      text: "Are you currently taking antibiotics?",
      disqualifying: false,
      temporaryDisqualification: {
        duration: 1,
        reason: "Must complete antibiotic course and be symptom-free"
      },
      category: "medical"
    },
    {
      id: "dental_work",
      text: "Have you had dental work in the last 24 hours?",
      disqualifying: false,
      temporaryDisqualification: {
        duration: 0.1,
        reason: "Must wait 24 hours after dental work"
      },
      category: "medical"
    },
    
    {
      id: "malaria_travel",
      text: "Have you traveled to a malaria-endemic area in the last 12 months?",
      disqualifying: false,
      temporaryDisqualification: {
        duration: 12,
        reason: "Must wait 12 months after returning from malaria-endemic areas"
      },
      category: "travel"
    },
    {
      id: "variant_cjd",
      text: "Did you spend 3 months or more in the UK between 1980 and 1996?",
      disqualifying: true,
      category: "travel"
    },
    
    {
      id: "tattoo",
      text: "Have you gotten a tattoo or piercing in the last 3 months?",
      disqualifying: false,
      temporaryDisqualification: {
        duration: 3,
        reason: "Must wait 3 months after tattoos or piercings"
      },
      category: "lifestyle"
    },
    {
      id: "iv_drugs",
      text: "Have you ever used IV drugs that were not prescribed by a doctor?",
      disqualifying: true,
      category: "lifestyle"
    }
  ];
  
  const checkEligibility = () => {
    const bmi = calculateBMI();
    
    let weightInKg = weight;
    if (weightUnit === "lb") {
      weightInKg = weight * 0.453592;
    }
    
    if (age < 17) {
      setIsEligible(false);
      setEligibilityReason("You must be at least 17 years old to donate blood.");
      return;
    } else if (weightInKg < 50) {
      setIsEligible(false);
      setEligibilityReason("You must weigh at least 50kg (110lbs) to donate blood.");
      return;
    }
    
    for (const question of questions) {
      if (checkedQuestions[question.id] && question.disqualifying) {
        setIsEligible(false);
        setEligibilityReason("You are not eligible to donate blood based on your medical history.");
        return;
      }
    }
    
    let longestWaitTime = 0;
    let waitReason = "";
    
    for (const question of questions) {
      if (checkedQuestions[question.id] && question.temporaryDisqualification) {
        const waitMonths = question.temporaryDisqualification.duration;
        if (waitMonths > longestWaitTime) {
          longestWaitTime = waitMonths;
          waitReason = question.temporaryDisqualification.reason;
        }
      }
    }
    
    if (longestWaitTime > 0) {
      const today = new Date();
      const futureDate = addMonths(today, longestWaitTime);
      
      setIsEligible(false);
      setTemporaryRestriction({
        until: futureDate,
        reason: waitReason
      });
      return;
    }
    
    setIsEligible(true);
    setEligibilityReason("Based on your responses, you appear to be eligible to donate blood.");
    
    const today = new Date();
    setNextDonationDate(addMonths(today, 2));
  };
  
  const handleCheckboxChange = (questionId: string, checked: boolean) => {
    setCheckedQuestions({
      ...checkedQuestions,
      [questionId]: checked
    });
  };
  
  const generalQuestions = questions.filter(q => q.category === "general");
  const medicalQuestions = questions.filter(q => q.category === "medical");
  const travelQuestions = questions.filter(q => q.category === "travel");
  const lifestyleQuestions = questions.filter(q => q.category === "lifestyle");

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <CalculatorNumberInput
                label="Age"
                value={age}
                onChange={setAge}
                min={16}
                max={100}
                step={1}
                required
              />
              
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                  value={gender}
                  onValueChange={(value) => setGender(value as Gender)}
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
            
            <div className="grid grid-cols-3 gap-4">
              <CalculatorNumberInput
                label="Weight"
                value={weight}
                onChange={setWeight}
                min={0}
                max={200}
                step={0.1}
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
                min={0}
                max={250}
                step={1}
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
              <Label>Blood Type (if known)</Label>
              <Select value={bloodType} onValueChange={(value) => setBloodType(value as BloodType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                  <SelectItem value="unknown">I don't know</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="medical">Medical</TabsTrigger>
                <TabsTrigger value="travel">Travel</TabsTrigger>
                <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
              </TabsList>
              
              <div className="mt-4 p-4 border rounded-md">
                <TabsContent value="general" className="space-y-4 mt-0">
                  {generalQuestions.map((question) => (
                    <div key={question.id} className="flex items-start space-x-2">
                      <Checkbox 
                        id={question.id} 
                        checked={checkedQuestions[question.id] || false}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(question.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={question.id} className="text-sm leading-tight cursor-pointer">
                        {question.text}
                      </Label>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="medical" className="space-y-4 mt-0">
                  {medicalQuestions.map((question) => (
                    <div key={question.id} className="flex items-start space-x-2">
                      <Checkbox 
                        id={question.id} 
                        checked={checkedQuestions[question.id] || false}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(question.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={question.id} className="text-sm leading-tight cursor-pointer">
                        {question.text}
                      </Label>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="travel" className="space-y-4 mt-0">
                  {travelQuestions.map((question) => (
                    <div key={question.id} className="flex items-start space-x-2">
                      <Checkbox 
                        id={question.id} 
                        checked={checkedQuestions[question.id] || false}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(question.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={question.id} className="text-sm leading-tight cursor-pointer">
                        {question.text}
                      </Label>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="lifestyle" className="space-y-4 mt-0">
                  {lifestyleQuestions.map((question) => (
                    <div key={question.id} className="flex items-start space-x-2">
                      <Checkbox 
                        id={question.id} 
                        checked={checkedQuestions[question.id] || false}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(question.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={question.id} className="text-sm leading-tight cursor-pointer">
                        {question.text}
                      </Label>
                    </div>
                  ))}
                </TabsContent>
              </div>
            </Tabs>
            
            <p className="text-xs text-muted-foreground text-center">
              Note: This is a preliminary eligibility check only. The donation center will make the final determination.
            </p>
            
            <Button onClick={checkEligibility} className="w-full">
              Check Eligibility
            </Button>
          </div>
        </CardContent>
      </Card>

      {isEligible !== null && (
        <CalculatorResult title="Blood Donation Eligibility Results">
          <div className="space-y-4">
            <div className="flex justify-center items-center mb-4">
              <div className="text-center">
                {isEligible ? (
                  <ThumbsUp className="h-16 w-16 text-green-500 mx-auto" />
                ) : (
                  <ThumbsDown className="h-16 w-16 text-red-500 mx-auto" />
                )}
                <h3 className="text-lg font-semibold mt-2">
                  {isEligible ? "Likely Eligible to Donate" : "Not Eligible to Donate at This Time"}
                </h3>
              </div>
            </div>
            
            <ResultAlert 
              type={isEligible ? "success" : temporaryRestriction ? "info" : "error"}
              title={
                isEligible 
                  ? "You appear to be eligible" 
                  : temporaryRestriction
                    ? "Temporary deferral"
                    : "Donation criteria not met"
              }
            >
              {isEligible ? (
                <p>Based on your responses, you appear to meet the basic eligibility criteria for blood donation. 
                   Please note that the final determination will be made by health professionals at the donation center.</p>
              ) : temporaryRestriction ? (
                <div>
                  <p>You are temporarily deferred from donating blood until approximately: <strong>{format(temporaryRestriction.until, "MMMM d, yyyy")}</strong></p>
                  <p className="mt-1">Reason: {temporaryRestriction.reason}</p>
                </div>
              ) : (
                <p>{eligibilityReason}</p>
              )}
            </ResultAlert>
            
            {isEligible && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-md flex items-center">
                  <div className="mr-4">
                    <Droplet className="h-8 w-8 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Blood Type</h4>
                    <p className="text-lg font-bold">
                      {bloodType !== "unknown" ? bloodType : "Unknown"}
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-md flex items-center">
                  <div className="mr-4">
                    <CalendarClock className="h-8 w-8 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Next Donation</h4>
                    <p className="text-lg font-bold">
                      {nextDonationDate && format(nextDonationDate, "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {isEligible && bloodType !== "unknown" && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <h4 className="font-medium mb-2 flex items-center">
                  <HeartPulse className="h-4 w-4 mr-1" />
                  Your Blood Type Information
                </h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div>Can donate to:</div>
                  <div>
                    {bloodType === "O-" && "O-, O+, A-, A+, B-, B+, AB-, AB+"}
                    {bloodType === "O+" && "O+, A+, B+, AB+"}
                    {bloodType === "A-" && "A-, A+, AB-, AB+"}
                    {bloodType === "A+" && "A+, AB+"}
                    {bloodType === "B-" && "B-, B+, AB-, AB+"}
                    {bloodType === "B+" && "B+, AB+"}
                    {bloodType === "AB-" && "AB-, AB+"}
                    {bloodType === "AB+" && "AB+"}
                  </div>
                  
                  <div>Can receive from:</div>
                  <div>
                    {bloodType === "O-" && "O-"}
                    {bloodType === "O+" && "O-, O+"}
                    {bloodType === "A-" && "O-, A-"}
                    {bloodType === "A+" && "O-, O+, A-, A+"}
                    {bloodType === "B-" && "O-, B-"}
                    {bloodType === "B+" && "O-, O+, B-, B+"}
                    {bloodType === "AB-" && "O-, A-, B-, AB-"}
                    {bloodType === "AB+" && "All blood types"}
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-muted-foreground">
                  {bloodType === "O-" && "Universal donor: Your blood can be given to anyone!"}
                  {bloodType === "AB+" && "Universal recipient: You can receive blood from any donor!"}
                  {bloodType === "O+" && "Your blood type is the most common. Your donations are always needed!"}
                  {(bloodType === "A-" || bloodType === "B-" || bloodType === "AB-") && "Negative blood types are less common and especially valuable."}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div className="p-2 bg-muted/50 rounded-md">
                <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                <p>Whole blood donation takes about 1 hour</p>
              </div>
              
              <div className="p-2 bg-muted/50 rounded-md">
                <Droplet className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                <p>One donation can save up to 3 lives</p>
              </div>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
