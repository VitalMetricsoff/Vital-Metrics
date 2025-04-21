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
  "Feeling afraid as if something awful might happen"
];

const answerOptions = [
  "Not at all",
  "Several days",
  "More than half the days",
  "Nearly every day"
];

export function GAD7AnxietyTest() {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [functionalImpairment, setFunctionalImpairment] = useState<number>(-1);
  
  const handleAnswerChange = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };
  
  const handleCalculate = () => {
    if (answers.every(answer => answer >= 0) && functionalImpairment >= 0) {
      setShowResults(true);
    }
  };
  
  const calculateScore = () => {
    return answers.reduce((sum, answer) => sum + (answer >= 0 ? answer : 0), 0);
  };
  
  const getSeverityDescription = (score: number): string => {
    if (score >= 15) return "Severe anxiety";
    if (score >= 10) return "Moderate anxiety";
    if (score >= 5) return "Mild anxiety";
    return "Minimal anxiety";
  };
  
  const totalScore = calculateScore();
  
  const getFunctionalImpairmentText = (level: number) => {
    switch (level) {
      case 0: return "Not difficult at all";
      case 1: return "Somewhat difficult";
      case 2: return "Very difficult";
      case 3: return "Extremely difficult";
      default: return "";
    }
  };
  
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
              <div key={index} className="space-y-2">
                <Label className="text-base dark:text-white">{question}</Label>
                <RadioGroup
                  value={answers[index].toString()}
                  onValueChange={(value) => handleAnswerChange(index, parseInt(value))}
                  className="grid grid-cols-4 gap-2"
                >
                  {answerOptions.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={optionIndex.toString()}
                        id={`question-${index}-option-${optionIndex}`}
                        className="dark:border-slate-600 dark:bg-slate-800"
                      />
                      <Label
                        htmlFor={`question-${index}-option-${optionIndex}`}
                        className="text-sm dark:text-slate-300"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
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
            
            <Button
              className="w-full mt-4"
              onClick={handleCalculate}
              disabled={!isValid}
            >
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
          <div className="space-y-4">
            <div className="p-6 bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-lg text-center">
              <h3 className="text-lg font-medium dark:text-blue-100">Your Score</h3>
              <p className="text-4xl font-bold mt-2 dark:text-blue-50">{totalScore}</p>
              <p className="text-sm text-muted-foreground dark:text-blue-200 mt-2">
                {getSeverityDescription(totalScore)}
              </p>
            </div>
            
            <div className="p-6 bg-purple-50 dark:bg-purple-950 border border-purple-100 dark:border-purple-800 rounded-lg">
              <h3 className="text-lg font-medium mb-4 dark:text-purple-100">Severity Levels</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted dark:bg-slate-800 rounded">
                  <span className="dark:text-white">0-4</span>
                  <span className="dark:text-slate-300">Minimal anxiety</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted dark:bg-slate-800 rounded">
                  <span className="dark:text-white">5-9</span>
                  <span className="dark:text-slate-300">Mild anxiety</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted dark:bg-slate-800 rounded">
                  <span className="dark:text-white">10-14</span>
                  <span className="dark:text-slate-300">Moderate anxiety</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted dark:bg-slate-800 rounded">
                  <span className="dark:text-white">15-21</span>
                  <span className="dark:text-slate-300">Severe anxiety</span>
                </div>
              </div>
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
              type={totalScore >= 10 ? (totalScore >= 15 ? "error" : "warning") : "info"}
              title="Recommendation"
            >
              {getRecommendation(totalScore)}
            </ResultAlert>
            
            <div className="space-y-2 mt-4">
              <h3 className="text-lg font-medium dark:text-white">Anxiety Management Strategies</h3>
              <ul className="list-disc list-inside space-y-1 dark:text-slate-200">
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
            
            <div className="text-sm text-muted-foreground dark:text-slate-300 mt-4">
              <p><strong className="dark:text-white">Important:</strong> The GAD-7 is a screening tool and not a diagnostic instrument. This questionnaire is not a substitute for professional diagnosis and treatment. If you are concerned about your mental health, please consult a healthcare professional.</p>
              <p className="mt-2"><strong className="dark:text-white">Confidentiality:</strong> Your answers are confidential and are not being stored or shared. This calculation happens entirely in your browser.</p>
            </div>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
