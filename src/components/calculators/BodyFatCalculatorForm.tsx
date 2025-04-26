import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface BodyFatResult {
  bodyFat: number;
  category: string;
}

export function BodyFatCalculatorForm() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [result, setResult] = useState<BodyFatResult | null>(null);

  const calculateBodyFat = () => {
    const heightInCm = parseFloat(height);
    const neckInCm = parseFloat(neck);
    const waistInCm = parseFloat(waist);
    const hipInCm = parseFloat(hip);

    if (isNaN(heightInCm) || isNaN(neckInCm) || isNaN(waistInCm) || (gender === 'female' && isNaN(hipInCm))) {
      return;
    }

    let bodyFat: number;

    if (gender === 'male') {
      bodyFat = 86.010 * Math.log10(waistInCm - neckInCm) - 70.041 * Math.log10(heightInCm) + 36.76;
    } else {
      bodyFat = 163.205 * Math.log10(waistInCm + hipInCm - neckInCm) - 97.684 * Math.log10(heightInCm) - 78.387;
    }

    // Round to 1 decimal place
    bodyFat = Math.round(bodyFat * 10) / 10;

    const category = getCategory(bodyFat, gender);

    setResult({ bodyFat, category });
  };

  const getCategory = (bf: number, gender: string): string => {
    if (gender === 'male') {
      if (bf < 5) return 'Essential Fat';
      if (bf < 13) return 'Athletic';
      if (bf < 17) return 'Fitness';
      if (bf < 25) return 'Average';
      return 'Obese';
    } else {
      if (bf < 13) return 'Essential Fat';
      if (bf < 20) return 'Athletic';
      if (bf < 24) return 'Fitness';
      if (bf < 32) return 'Average';
      return 'Obese';
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div>
          <p>Gender</p>
          <RadioGroup
            defaultValue="male"
            onValueChange={(value) => setGender(value as 'male' | 'female')}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <label htmlFor="male">Male</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <label htmlFor="female">Female</label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <p>Height *</p>
          <div className="flex items-center">
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="flex-1"
            />
            <span className="ml-2">cm</span>
          </div>
        </div>

        <div>
          <p>Neck Circumference *</p>
          <div className="flex items-center">
            <Input
              type="number"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              className="flex-1"
            />
            <span className="ml-2">cm</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p>Waist Circumference *</p>
            <span className="text-sm text-gray-500">Measure at the narrowest point</span>
          </div>
          <div className="flex items-center">
            <Input
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              className="flex-1"
            />
            <span className="ml-2">cm</span>
          </div>
        </div>

        {gender === 'female' && (
          <div>
            <p>Hip Circumference *</p>
            <div className="flex items-center">
              <Input
                type="number"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                className="flex-1"
              />
              <span className="ml-2">cm</span>
            </div>
          </div>
        )}
      </div>

      <Button 
        onClick={calculateBodyFat}
        className="w-full"
        disabled={!gender || !height || !neck || !waist || (gender === 'female' && !hip)}
      >
        <Calculator className="mr-2 h-4 w-4" />
        Calculate Body Fat
      </Button>

      {result && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Your Body Fat Percentage Result</h3>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
          
          <div className="text-center mb-4">
            <div className="text-4xl font-bold mb-1">{result.bodyFat}%</div>
            <div className="text-gray-600">Body Fat Percentage</div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Category: {result.category}</span>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              This range indicates good fitness and is achievable with consistent exercise and healthy eating.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Body Fat Percentage Categories for Men:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Essential fat: 2-5%</li>
              <li>Athletic: 6-13%</li>
              <li>Fitness: 14-17%</li>
              <li>Average: 18-24%</li>
              <li>Obese: 25% and higher</li>
            </ul>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Note: The U.S. Navy method provides an estimate of body fat percentage. For more accurate results, consider
            professional body composition testing.
          </div>
        </div>
      )}
    </div>
  );
}
