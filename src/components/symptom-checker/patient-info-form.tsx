import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { PatientInfo, Gender, BodyRegion } from '@/types/symptom-checker';
import { bodyRegions, riskFactors } from '@/data/symptom-data';

interface PatientInfoFormProps {
  onSubmit: (info: PatientInfo) => void;
}

export function PatientInfoForm({ onSubmit }: PatientInfoFormProps) {
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<Gender>('male');
  const [selectedRiskFactors, setSelectedRiskFactors] = useState<string[]>([]);
  const [selectedBodyRegions, setSelectedBodyRegions] = useState<BodyRegion[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      age,
      gender,
      riskFactors: selectedRiskFactors,
      bodyRegions: selectedBodyRegions,
      symptoms: []
    });
  };

  const toggleBodyRegion = (region: BodyRegion) => {
    setSelectedBodyRegions(prev =>
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const toggleRiskFactor = (id: string) => {
    setSelectedRiskFactors(prev =>
      prev.includes(id)
        ? prev.filter(r => r !== id)
        : [...prev, id]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              min={0}
              max={120}
              value={age || ''}
              onChange={(e) => setAge(parseInt(e.target.value) || 0)}
              required
              className="h-10 sm:h-11 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              value={gender}
              onValueChange={(value) => setGender(value as Gender)}
              className="flex flex-col sm:flex-row gap-2 sm:gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Affected Body Regions</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
            {(Object.entries(bodyRegions) as [BodyRegion, string][]).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={selectedBodyRegions.includes(key)}
                  onCheckedChange={() => toggleBodyRegion(key)}
                />
                <Label htmlFor={key}>{label}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Risk Factors</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {riskFactors.map(factor => (
              <div key={factor.id} className="flex items-start space-x-2">
                <Checkbox
                  id={factor.id}
                  checked={selectedRiskFactors.includes(factor.id)}
                  onCheckedChange={() => toggleRiskFactor(factor.id)}
                />
                <div className="space-y-1">
                  <Label htmlFor={factor.id}>{factor.question}</Label>
                  {factor.description && (
                    <p className="text-sm text-muted-foreground">{factor.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full h-11 text-base font-medium">
        Continue
      </Button>
    </form>
  );
}
