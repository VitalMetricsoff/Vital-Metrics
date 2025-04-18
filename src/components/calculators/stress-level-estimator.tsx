
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";

type Question = {
  id: number;
  text: string;
};

type Answer = {
  questionId: number;
  value: number;
};

const stressQuestions: Question[] = [
  { id: 1, text: "How often have you felt nervous or stressed in the last month?" },
  { id: 2, text: "How often have you felt unable to control important things in your life?" },
  { id: 3, text: "How often have you felt confident about your ability to handle personal problems?" },
  { id: 4, text: "How often have you felt that things were going your way?" },
  { id: 5, text: "How often have you found that you could not cope with all the things you had to do?" },
  { id: 6, text: "How often have you been able to control irritations in your life?" },
  { id: 7, text: "How often have you felt that you were on top of things?" },
  { id: 8, text: "How often have you been angered because of things that were outside of your control?" },
  { id: 9, text: "How often have you felt difficulties were piling up so high that you could not overcome them?" },
  { id: 10, text: "How often have you had trouble sleeping because of stress?" }
];

export function StressLevelEstimator() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [stressLevel, setStressLevel] = useState<string>("");

  const handleAnswerChange = (questionId: number, value: number) => {
    const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId);
    
    if (existingAnswerIndex >= 0) {
      const newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = { questionId, value };
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, { questionId, value }]);
    }
  };

  const calculateStressScore = () => {
    if (answers.length < stressQuestions.length) {
      return;
    }

    // Questions 3, 4, 6, and 7 are positively stated, so we reverse the score
    const totalScore = answers.reduce((total, answer) => {
      if ([3, 4, 6, 7].includes(answer.questionId)) {
        return total + (4 - answer.value); // Reverse scoring for positive questions
      }
      return total + answer.value;
    }, 0);

    setResult(totalScore);

    // Determine stress level
    if (totalScore <= 13) {
      setStressLevel("Low");
    } else if (totalScore <= 26) {
      setStressLevel("Moderate");
    } else {
      setStressLevel("High");
    }
  };

  const getProgressPercentage = () => {
    return (answers.length / stressQuestions.length) * 100;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="relative pt-1 mb-6">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-primary">
                  {Math.round(getProgressPercentage())}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/20">
              <div
                style={{ width: `${getProgressPercentage()}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
              ></div>
            </div>
          </div>

          <div className="space-y-8">
            {stressQuestions.map((question) => (
              <div key={question.id} className="space-y-3">
                <h3 className="font-medium text-base">{question.text}</h3>
                <RadioGroup
                  value={answers.find(a => a.questionId === question.id)?.value.toString() || ""}
                  onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                  className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                >
                  {[0, 1, 2, 3].map((value) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem value={value.toString()} id={`q${question.id}-a${value}`} />
                      <Label htmlFor={`q${question.id}-a${value}`} className="text-sm">
                        {value === 0 && "Never"}
                        {value === 1 && "Sometimes"}
                        {value === 2 && "Often"}
                        {value === 3 && "Very Often"}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>

          <Button 
            onClick={calculateStressScore} 
            className="w-full mt-6"
            disabled={answers.length < stressQuestions.length}
          >
            Calculate Stress Level
          </Button>
        </CardContent>
      </Card>

      {result !== null && (
        <CalculatorResult title="Your Stress Level Result">
          <div className="space-y-4">
            <p className="text-center text-lg font-medium">
              Your stress score is: <span className="text-primary font-semibold">{result} / 40</span>
            </p>
            
            <ResultAlert 
              type={stressLevel === "Low" ? "success" : stressLevel === "Moderate" ? "warning" : "error"}
              title={`${stressLevel} Stress Level`}
            >
              <p className="mt-2">
                {stressLevel === "Low" && "You're managing stress well. Continue with healthy coping strategies."}
                {stressLevel === "Moderate" && "You're experiencing moderate stress. Consider stress management techniques."}
                {stressLevel === "High" && "You're experiencing high levels of stress. Consider consulting with a healthcare professional."}
              </p>
            </ResultAlert>
            
            <div className="mt-4 bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">What to do next:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Practice deep breathing exercises</li>
                <li>Engage in regular physical activity</li>
                <li>Maintain a consistent sleep schedule</li>
                <li>Consider mindfulness meditation</li>
                <li>Connect with supportive friends and family</li>
                {stressLevel === "High" && <li className="font-medium">Consult with a healthcare professional</li>}
              </ul>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
