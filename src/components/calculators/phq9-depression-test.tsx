
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead or of hurting yourself in some way"
];

export function PHQ9DepressionTest() {
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
  
  const getDepressionSeverity = (score: number) => {
    if (score < 5) return { level: "Minimal or None", class: "success" };
    if (score < 10) return { level: "Mild", class: "warning" };
    if (score < 15) return { level: "Moderate", class: "warning" };
    if (score < 20) return { level: "Moderately Severe", class: "error" };
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
  const severity = getDepressionSeverity(score);
  
  const getRecommendation = (score: number) => {
    if (score < 5) {
      return "Your responses suggest minimal or no depressive symptoms. Continue to maintain your mental health through healthy habits.";
    } else if (score < 10) {
      return "Your responses suggest mild depressive symptoms. Consider lifestyle changes, relaxation techniques, and monitoring your symptoms.";
    } else if (score < 15) {
      return "Your responses suggest moderate depressive symptoms. Consider speaking with a mental health professional for an evaluation.";
    } else if (score < 20) {
      return "Your responses suggest moderately severe depressive symptoms. It is recommended to consult with a mental health professional soon.";
    } else {
      return "Your responses suggest severe depressive symptoms. Please consult with a mental health professional as soon as possible.";
    }
  };
  
  const isValid = answers.every(answer => answer >= 0) && functionalImpairment >= 0;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">PHQ-9 Depression Screening Questionnaire</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Over the last 2 weeks, how often have you been bothered by any of the following problems?
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
        <CalculatorResult title="PHQ-9 Depression Screening Results">
          <div className="space-y-6">
            <div className="p-6 bg-muted rounded-lg text-center">
              <h3 className="text-lg font-medium">Depression Severity Score</h3>
              <p className="text-4xl font-bold mt-2">{score}</p>
              <p className={`mt-2 text-lg font-semibold text-${severity.class}-600`}>
                {severity.level} Depression
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
              type={score >= 10 ? (score >= 20 ? "error" : "warning") : "info"}
              title="Recommendation"
            >
              {getRecommendation(score)}
            </ResultAlert>
            
            {answers[8] > 0 && (
              <ResultAlert type="error" title="Important Safety Notice">
                <p className="font-medium">You indicated having thoughts that you would be better off dead or of hurting yourself.</p>
                <p className="mt-2">If you're having thoughts of suicide or self-harm, please seek help immediately:</p>
                <ul className="list-disc list-inside mt-1">
                  <li>Call the National Suicide Prevention Lifeline: 988 or 1-800-273-8255</li>
                  <li>Text HOME to the Crisis Text Line: 741741</li>
                  <li>Go to your nearest emergency room</li>
                  <li>Contact a mental health professional</li>
                </ul>
              </ResultAlert>
            )}
            
            <div className="space-y-2 mt-4">
              <h3 className="text-lg font-medium">Depression Severity Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-green-50 border border-green-100">
                  <p className="font-semibold">Minimal or None: 0-4</p>
                  <p className="text-sm">Minimal or no depressive symptoms</p>
                </div>
                <div className="p-2 rounded-lg bg-yellow-50 border border-yellow-100">
                  <p className="font-semibold">Mild: 5-9</p>
                  <p className="text-sm">Mild depressive symptoms</p>
                </div>
                <div className="p-2 rounded-lg bg-orange-50 border border-orange-100">
                  <p className="font-semibold">Moderate: 10-14</p>
                  <p className="text-sm">Moderate depressive symptoms</p>
                </div>
                <div className="p-2 rounded-lg bg-red-50 border border-red-100">
                  <p className="font-semibold">Moderately Severe: 15-19</p>
                  <p className="text-sm">Moderately severe depressive symptoms</p>
                </div>
                <div className="p-2 rounded-lg bg-red-50 border border-red-100 col-span-1 md:col-span-2">
                  <p className="font-semibold">Severe: 20-27</p>
                  <p className="text-sm">Severe depressive symptoms</p>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground mt-4">
              <p><strong>Important:</strong> The PHQ-9 is a screening tool and not a diagnostic instrument. This questionnaire is not a substitute for professional diagnosis and treatment. If you are concerned about your mental health, please consult a healthcare professional.</p>
              <p className="mt-2"><strong>Confidentiality:</strong> Your answers are confidential and are not being stored or shared. This calculation happens entirely in your browser.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
