import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { cn } from "@/lib/utils";

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

type CategoryScores = {
  'Perceived Stress': number;
  'Emotional Response': number;
  'Control & Coping': number;
  'Physical Symptoms': number;
};

export function StressLevelEstimator() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [stressLevel, setStressLevel] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const [categoryScores, setCategoryScores] = useState<CategoryScores>({} as CategoryScores);

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

    // Calculate category scores
    const categories: CategoryScores = {
      'Perceived Stress': (answers.find(a => a.questionId === 1)?.value || 0) + (answers.find(a => a.questionId === 2)?.value || 0),
      'Emotional Response': (answers.find(a => a.questionId === 8)?.value || 0) + (answers.find(a => a.questionId === 9)?.value || 0),
      'Control & Coping': (4 - (answers.find(a => a.questionId === 3)?.value || 0)) + (4 - (answers.find(a => a.questionId === 6)?.value || 0)),
      'Physical Symptoms': (answers.find(a => a.questionId === 5)?.value || 0) + (answers.find(a => a.questionId === 10)?.value || 0)
    };
    setCategoryScores(categories);

    // Determine stress level
    if (totalScore <= 13) {
      setStressLevel("Low");
    } else if (totalScore <= 26) {
      setStressLevel("Moderate");
    } else {
      setStressLevel("High");
    }

    setShowResults(true);
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

      {showResults && (
        <CalculatorResult title="Stress Level Assessment">
          <div className="space-y-6">
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg text-center border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-medium dark:text-slate-200">Your Stress Score</h3>
              <p className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">{result} / 40</p>
              <ResultAlert
                type={
                  result <= 10 ? "success" :
                  result <= 20 ? "info" :
                  result <= 30 ? "warning" : "error"
                }
                title={
                  result <= 10 ? "Low Stress" :
                  result <= 20 ? "Moderate Stress" :
                  result <= 30 ? "High Stress" : "Severe Stress"
                }
              >
                {result <= 10 
                  ? "Your stress levels appear to be well-managed"
                  : result <= 20
                  ? "You're experiencing moderate stress levels"
                  : result <= 30
                  ? "Your stress levels are elevated"
                  : "You're experiencing significant stress"
                }
              </ResultAlert>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-slate-900 dark:text-slate-100">Stress Categories</h3>
              <div className="grid gap-3">
                {Object.entries(categoryScores).map(([category, score]) => (
                  <div 
                    key={category}
                    className={cn(
                      "p-4 rounded-lg border",
                      score <= 2 
                        ? "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800" 
                        : score <= 4
                        ? "bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800"
                        : score <= 6
                        ? "bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800"
                        : "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={cn(
                          "text-sm font-medium",
                          score <= 2 
                            ? "text-green-900 dark:text-green-100" 
                            : score <= 4
                            ? "text-yellow-900 dark:text-yellow-100"
                            : score <= 6
                            ? "text-orange-900 dark:text-orange-100"
                            : "text-red-900 dark:text-red-100"
                        )}>
                          {category}
                        </p>
                        <p className={cn(
                          "text-2xl font-bold",
                          score <= 2 
                            ? "text-green-950 dark:text-green-50" 
                            : score <= 4
                            ? "text-yellow-950 dark:text-yellow-50"
                            : score <= 6
                            ? "text-orange-950 dark:text-orange-50"
                            : "text-red-950 dark:text-red-50"
                        )}>
                          {score} / 10
                        </p>
                      </div>
                      <div className={cn(
                        "text-sm",
                        score <= 2 
                          ? "text-green-700 dark:text-green-300" 
                          : score <= 4
                          ? "text-yellow-700 dark:text-yellow-300"
                          : score <= 6
                          ? "text-orange-700 dark:text-orange-300"
                          : "text-red-700 dark:text-red-300"
                      )}>
                        {score <= 2 
                          ? "Low" 
                          : score <= 4
                          ? "Moderate"
                          : score <= 6
                          ? "High"
                          : "Severe"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-300">
              <p>Note: This assessment provides a general indication of your stress levels. If you're experiencing persistent stress, consider consulting with a mental health professional.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
