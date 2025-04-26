import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Calculator } from 'lucide-react';

interface BSAResult {
  bsa: number;
  formula: string;
}

export function BSACalculatorForm() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<BSAResult | null>(null);

  const calculateBSA = () => {
    const heightInCm = parseFloat(height);
    const weightInKg = parseFloat(weight);

    if (isNaN(heightInCm) || isNaN(weightInKg)) {
      return;
    }

    // Mosteller formula
    const bsa = Math.sqrt((heightInCm * weightInKg) / 3600);

    setResult({
      bsa: Math.round(bsa * 100) / 100,
      formula: 'Mosteller'
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            placeholder="Enter height in centimeters"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            placeholder="Enter weight in kilograms"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
      </div>

      <Button 
        onClick={calculateBSA}
        className="w-full"
        disabled={!height || !weight}
      >
        <Calculator className="mr-2 h-4 w-4" />
        Calculate BSA
      </Button>

      {result && (
        <Alert>
          <Calculator className="h-4 w-4" />
          <AlertTitle>BSA Result</AlertTitle>
          <AlertDescription>
            <div className="mt-2 space-y-2">
              <p className="font-medium">
                Body Surface Area: {result.bsa} m²
              </p>
              <p className="text-sm text-muted-foreground">
                Calculated using the {result.formula} formula
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
