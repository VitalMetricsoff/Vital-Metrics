import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PatientInfo, Symptom, BodyRegion } from '@/types/symptom-checker';
import { symptoms } from '@/data/symptom-data';
import { X, Clock } from 'lucide-react';

const bodyRegionLabels: Record<BodyRegion, string> = {
  'head-neck': 'Head & Neck',
  'chest-lungs': 'Chest & Lungs',
  'abdomen': 'Abdomen',
  'limbs': 'Arms & Legs',
  'skin': 'Skin',
  'genitals': 'Genitourinary',
  'general': 'General'
};

interface SymptomSelectorProps {
  selectedSymptoms: Symptom[];
  onSymptomAdd: (symptom: Symptom) => void;
  onFinish: () => void;
  patientInfo: PatientInfo;
}

export function SymptomSelector({
  selectedSymptoms,
  onSymptomAdd,
  onFinish,
  patientInfo
}: SymptomSelectorProps) {
  const symptomsByRegion = useMemo(() => {
    const selectedIds = selectedSymptoms.map(s => s.id);
    return patientInfo.bodyRegions.reduce((acc, region) => {
      acc[region] = symptoms
        .filter(s => s.bodyRegion === region)
        .filter(s => !selectedIds.includes(s.id));
      return acc;
    }, {} as Record<BodyRegion, Symptom[]>);
  }, [selectedSymptoms, patientInfo.bodyRegions]);

  const suggestedSymptoms = useMemo(() => {
    if (selectedSymptoms.length === 0) return [];
    
    const lastSymptom = selectedSymptoms[selectedSymptoms.length - 1];
    return symptoms
      .filter(s => lastSymptom.suggestedFollowUps.includes(s.id))
      .filter(s => !selectedSymptoms.some(selected => selected.id === s.id));
  }, [selectedSymptoms]);

  const handleSymptomClick = (symptom: Symptom) => {
    onSymptomAdd(symptom);
  };

  return (
    <div className="space-y-6">
      {/* Selected Symptoms */}
      {selectedSymptoms.length > 0 && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom) => (
                <Badge
                  key={symptom.id}
                  variant={symptom.isRedFlag ? "destructive" : "default"}
                  className="text-sm py-1 px-3"
                >
                  {symptom.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Suggested Symptoms */}
      {suggestedSymptoms.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4">Suggested Related Symptoms</h3>
            <div className="flex flex-wrap gap-2">
              {suggestedSymptoms.map((symptom) => (
                <Button
                  key={symptom.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSymptomClick(symptom)}
                >
                  {symptom.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Symptoms by Body Region */}
      <Tabs defaultValue={patientInfo.bodyRegions[0]} className="w-full">
        <TabsList className="w-full justify-start flex-wrap h-auto gap-2 bg-transparent p-0">
          {patientInfo.bodyRegions.map((region) => (
            <TabsTrigger
              key={region}
              value={region}
              className="data-[state=active]:bg-primary"
            >
              {bodyRegionLabels[region]}
            </TabsTrigger>
          ))}
        </TabsList>

        {patientInfo.bodyRegions.map((region) => (
          <TabsContent key={region} value={region} className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {symptomsByRegion[region]?.map((symptom) => (
                    <Button
                      key={symptom.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSymptomClick(symptom)}
                    >
                      {symptom.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-end">
        <Button 
          onClick={onFinish}
          disabled={selectedSymptoms.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
