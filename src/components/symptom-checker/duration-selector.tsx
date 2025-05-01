import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Symptom, SymptomDuration } from '@/types/symptom-checker';
import { Clock } from 'lucide-react';

interface DurationSelectorProps {
  symptoms: Symptom[];
  onUpdateSymptom: (symptomId: string, duration: SymptomDuration) => void;
  onFinish: () => void;
}

export function DurationSelector({
  symptoms,
  onUpdateSymptom,
  onFinish
}: DurationSelectorProps) {
  const durations: SymptomDuration[] = ['hours', 'days', 'weeks', 'months', 'years'];

  const allDurationsSelected = symptoms.every(s => s.duration);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-medium">
            <Clock className="h-5 w-5" />
            <span>How long have you been experiencing these symptoms?</span>
          </div>
          
          <div className="space-y-4">
            {symptoms.map((symptom) => (
              <div key={symptom.id} className="space-y-2">
                <Label>{symptom.name}</Label>
                <Select
                  value={symptom.duration}
                  onValueChange={(value: SymptomDuration) => onUpdateSymptom(symptom.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration} value={duration}>
                        {duration.charAt(0).toUpperCase() + duration.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              onClick={onFinish}
              disabled={!allDurationsSelected}
            >
              Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
