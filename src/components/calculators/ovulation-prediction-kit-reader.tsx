
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalculatorResult, ResultAlert } from "@/components/calculator/calculator-result";
import { 
  AlertCircle,
  CheckCircle2,
  Circle,
  CircleX,
  HelpCircle, 
  InfoIcon 
} from "lucide-react";

type TestResult = "positive" | "negative" | "invalid" | "unclear";

export function OvulationPredictionKitReader() {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [testLineIntensity, setTestLineIntensity] = useState<string | null>(null);
  const [controlLine, setControlLine] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const handleCalculate = () => {
    let result: TestResult;
    
    if (controlLine === false) {
      result = "invalid";
    } else if (testLineIntensity === "none") {
      result = "negative";
    } else if (testLineIntensity === "faint") {
      result = "negative";
    } else if (testLineIntensity === "similar" || testLineIntensity === "darker") {
      result = "positive";
    } else {
      result = "unclear";
    }
    
    setTestResult(result);
    setShowResult(true);
  };
  
  const resetForm = () => {
    setTestLineIntensity(null);
    setControlLine(null);
    setTestResult(null);
    setShowResult(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base">Is the control line visible?</Label>
              <RadioGroup value={controlLine === null ? undefined : controlLine.toString()} onValueChange={(value) => setControlLine(value === "true")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="control-yes" />
                  <Label htmlFor="control-yes">Yes, control line is visible</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="control-no" />
                  <Label htmlFor="control-no">No, control line is not visible</Label>
                </div>
              </RadioGroup>
            </div>
            
            {controlLine && (
              <div className="space-y-3">
                <Label className="text-base">How intense is the test line compared to the control line?</Label>
                <RadioGroup value={testLineIntensity || undefined} onValueChange={setTestLineIntensity}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="test-none" />
                    <Label htmlFor="test-none">No test line visible</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="faint" id="test-faint" />
                    <Label htmlFor="test-faint">Faint/lighter than control line</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="similar" id="test-similar" />
                    <Label htmlFor="test-similar">Similar to control line</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="darker" id="test-darker" />
                    <Label htmlFor="test-darker">Darker than control line</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            <Button 
              onClick={handleCalculate} 
              className="w-full mt-4"
              disabled={controlLine === null || (controlLine === true && testLineIntensity === null)}
            >
              Interpret Result
            </Button>
          </div>
        </CardContent>
      </Card>

      {showResult && (
        <CalculatorResult title="OPK Test Interpretation">
          <div className="space-y-4">
            <div className="flex justify-center mb-4">
              {testResult === "positive" && (
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                  <p className="font-medium text-lg mt-2">Positive Result</p>
                </div>
              )}
              {testResult === "negative" && (
                <div className="flex flex-col items-center">
                  <Circle className="h-16 w-16 text-blue-500" />
                  <p className="font-medium text-lg mt-2">Negative Result</p>
                </div>
              )}
              {testResult === "invalid" && (
                <div className="flex flex-col items-center">
                  <CircleX className="h-16 w-16 text-red-500" />
                  <p className="font-medium text-lg mt-2">Invalid Test</p>
                </div>
              )}
              {testResult === "unclear" && (
                <div className="flex flex-col items-center">
                  <HelpCircle className="h-16 w-16 text-yellow-500" />
                  <p className="font-medium text-lg mt-2">Unclear Result</p>
                </div>
              )}
            </div>
            
            <ResultAlert 
              type={
                testResult === "positive" 
                  ? "success" 
                  : testResult === "negative" 
                    ? "info" 
                    : testResult === "invalid" 
                      ? "error" 
                      : "warning"
              }
              title={
                testResult === "positive" 
                  ? "LH Surge Detected" 
                  : testResult === "negative" 
                    ? "No LH Surge Detected" 
                    : testResult === "invalid" 
                      ? "Test Invalid" 
                      : "Result Unclear"
              }
            >
              {testResult === "positive" && (
                <p>Your test is positive! The luteinizing hormone (LH) surge has been detected, indicating ovulation will likely occur within 24-36 hours. This is your most fertile time.</p>
              )}
              {testResult === "negative" && (
                <p>Your test is negative. No LH surge detected at this time. Continue testing daily until you get a positive result.</p>
              )}
              {testResult === "invalid" && (
                <p>Your test is invalid because the control line is not visible. Please discard this test and try again with a new test kit.</p>
              )}
              {testResult === "unclear" && (
                <p>Your test result is unclear. Please consider retesting or consulting the test kit instructions for more guidance.</p>
              )}
            </ResultAlert>
            
            <div className="mt-4 bg-muted p-4 rounded-md">
              <div className="flex items-start">
                <InfoIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div className="text-sm">
                  <h4 className="font-medium mb-1">What to do next:</h4>
                  {testResult === "positive" && (
                    <ul className="list-disc pl-5 space-y-1">
                      <li>This is your most fertile time - the 24-48 hours after a positive OPK</li>
                      <li>If trying to conceive, have intercourse within the next 48 hours</li>
                      <li>No need to continue testing this cycle after a positive result</li>
                      <li>Track your basal body temperature to confirm ovulation has occurred</li>
                    </ul>
                  )}
                  {testResult === "negative" && (
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Continue testing daily, preferably at the same time each day</li>
                      <li>Consider testing twice daily as you approach your expected ovulation</li>
                      <li>Reduce liquid intake 2-4 hours before testing for more concentrated urine</li>
                      <li>If you've tested throughout your cycle with no positive, consult a healthcare provider</li>
                    </ul>
                  )}
                  {testResult === "invalid" && (
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Discard this test and use a new test kit</li>
                      <li>Read the test kit instructions carefully before testing</li>
                      <li>Ensure you're using the test within its expiration date</li>
                      <li>Make sure to read the result within the recommended time window</li>
                    </ul>
                  )}
                  {testResult === "unclear" && (
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Try testing again in 12 hours</li>
                      <li>Review the test kit instructions for specific guidance</li>
                      <li>Check the expiration date of your test kit</li>
                      <li>Consider using a digital ovulation test for clearer results</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            
            <Button onClick={resetForm} variant="outline" className="w-full">
              Test Another Result
            </Button>
          </div>
        </CalculatorResult>
      )}
    </div>
  );
}
