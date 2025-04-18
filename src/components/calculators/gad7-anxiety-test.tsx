
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen"
];

export function GAD7AnxietyTest() {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [functionalImpairment, setFunctionalImpairment] = useState<number>(-1);
  
  const handleAnswer = (questionIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };
  
  const handleCalculate = () => {
    if (answers.every(answer => answer >= 0) && functionalImpairment >= 0) {
      setShowResults(true);
    }
  };
  
  const calculateScore = () => {
    return answers.reduce((sum, answer) => sum + answer, 0);
  };
  
  const getAnxietySeverity = (score: number) => {
    if (score < 5) return { level: "Minimal", class: "success" };
    if (score < 10) return { level: "Mild", class: "warning" };
    if (score < 15) return { level: "Moderate", class: "warning" };
    return { level: "Severe", class: "error" };
  };
  
  const getFunctionalImpairmentText = (level: number) => {
    switch (level) {
      case 0: return "Not difficult at all";
      case 1: return "Somewhat difficult";
      case 2: return "Very difficult";
      case 3: return "Extremely difficult";
      default: return "";
    }
  };
  
  const score = calculateScore();
  const severity = getAnxietySeverity(score);
  
  const getRecommendation = (score: number) => {
    if (score < 5) {
      return "Your responses suggest minimal anxiety symptoms. Continue to maintain your mental health through healthy habits.";
    } else if (score < 10) {
      return "Your responses suggest mild anxiety symptoms. Consider stress management techniques like mindfulness, exercise, and adequate sleep.";
    } else if (score < 15) {
      return "Your responses suggest moderate anxiety symptoms. Consider speaking with a mental health professional for an evaluation.";
    } else {
      return "Your responses suggest severe anxiety symptoms. It is recommended to consult with a mental health professional for proper evaluation and treatment.";
    }
  };
  
  const isValid = answers.every(answer => answer >= 0) && functionalImpairment >= 0;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">GAD-7 Anxiety Screening Questionnaire</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Over the last 2 weeks, how often have you been bothered by the following problems?
              </p>
            </div>
            
            {questions.map((question, index) => (
              <div key={index} className="space-y-3">
                <Label className="text-base">{index + 1}. {question}</Label>
                <RadioGroup
                  value={answers[index].toString()}
                  onValueChange={(value) => handleAnswer(index, parseInt(value))}
                  className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4"
                >
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem value="0" id={`q${index}-0`} />
                    <Label htmlFor={`q${index}-0`} className="flex-grow">Not at all</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem value="1" id={`q${index}-1`} />
                    <Label htmlFor={`q${index}-1`} className="flex-grow">Several days</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem value="2" id={`q${index}-2`} />
                    <Label htmlFor={`q${index}-2`} className="flex-grow">More than half the days</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem value="3" id={`q${index}-3`} />
                    <Label htmlFor={`q${index}-3`} className="flex-grow">Nearly every day</Label>
                  </div>
                </RadioGroup>
              </div>
            ))}
            
            <div className="space-y-3 pt-4">
              <Label className="text-base">
                If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?
              </Label>
              <RadioGroup
                value={functionalImpairment.toString()}
                onValueChange={(value) => setFunctionalImpairment(parseInt(value))}
                className="grid grid-cols-1 gap-2 sm:grid-cols-2"
              >
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="0" id="func-0" />
                  <Label htmlFor="func-0" className="flex-grow">Not difficult at all</Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="1" id="func-1" />
                  <Label htmlFor="func-1" className="flex-grow">Somewhat difficult</Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="2" id="func-2" />
                  <Label htmlFor="func-2" className="flex-grow">Very difficult</Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="3" id="func-3" />
                  <Label htmlFor="func-3" className="flex-grow">Extremely difficult</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button className="w-full mt-4" onClick={handleCalculate} disabled={!isValid}>
              Submit Questionnaire
            </Button>
            
            {!isValid && (
              <p className="text-sm text-red-500 text-center">Please answer all questions to continue</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      {showResults && (
        <CalculatorResult title="GAD-7 Anxiety Screening Results">
          <div className="space-y-6">
            <div className="p-6 bg-muted rounded-lg text-center">
              <h3 className="text-lg font-medium">Anxiety Severity Score</h3>
              <p className="text-4xl font-bold mt-2">{score}</p>
              <p className={`mt-2 text-lg font-semibold text-${severity.class}-600`}>
                {severity.level} Anxiety
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Functional Impact</h3>
              <p className="text-xl font-medium">
                {getFunctionalImpairmentText(functionalImpairment)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Level of difficulty these problems have caused in your daily life
              </p>
            </div>
            
            <ResultAlert
              type={score >= 10 ? (score >= 15 ? "error" : "warning") : "info"}
              title="Recommendation"
            >
              {getRecommendation(score)}
            </ResultAlert>
            
            <div className="space-y-2 mt-4">
              <h3 className="text-lg font-medium">Anxiety Severity Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-green-50 border border-green-100">
                  <p className="font-semibold">Minimal: 0-4</p>
                  <p className="text-sm">Minimal anxiety symptoms</p>
                </div>
                <div className="p-2 rounded-lg bg-yellow-50 border border-yellow-100">
                  <p className="font-semibold">Mild: 5-9</p>
                  <p className="text-sm">Mild anxiety symptoms</p>
                </div>
                <div className="p-2 rounded-lg bg-orange-50 border border-orange-100">
                  <p className="font-semibold">Moderate: 10-14</p>
                  <p className="text-sm">Moderate anxiety symptoms</p>
                </div>
                <div className="p-2 rounded-lg bg-red-50 border border-red-100">
                  <p className="font-semibold">Severe: 15-21</p>
                  <p className="text-sm">Severe anxiety symptoms</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <h3 className="text-lg font-medium">Anxiety Management Strategies</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Practice deep breathing and relaxation techniques</li>
                <li>Engage in regular physical activity</li>
                <li>Maintain a regular sleep schedule</li>
                <li>Limit caffeine and alcohol consumption</li>
                <li>Consider mindfulness and meditation practices</li>
                <li>Seek social support from friends and family</li>
                <li>Challenge negative thoughts</li>
                <li>Seek professional help from a therapist or counselor if needed</li>
              </ul>
            </div>
            
            <div className="text-sm text-muted-foreground mt-4">
              <p><strong>Important:</strong> The GAD-7 is a screening tool and not a diagnostic instrument. This questionnaire is not a substitute for professional diagnosis and treatment. If you are concerned about your mental health, please consult a healthcare professional.</p>
              <p className="mt-2"><strong>Confidentiality:</strong> Your answers are confidential and are not being stored or shared. This calculation happens entirely in your browser.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
