import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PatientInfoForm } from '@/components/symptom-checker/patient-info-form';
import { SymptomSelector } from '@/components/symptom-checker/symptom-selector';
import { DiagnosisResults } from '@/components/symptom-checker/diagnosis-results';
import { DurationSelector } from '@/components/symptom-checker/duration-selector';
import { PatientInfo, Symptom, DiagnosisResult, SymptomDuration, Severity } from '@/types/symptom-checker';
import { symptoms } from '@/data/symptom-data';
import { diseases, getDiseasesBySymptoms, checkRedFlags } from '@/data/disease-data';
import { AlertTriangle } from 'lucide-react';
import { SEO } from '@/components/seo';
import { generateSymptomCheckerSchema } from '@/lib/schema';
import { Breadcrumbs } from './breadcrumbs';

const steps = ['patient-info', 'symptoms', 'duration', 'results'] as const;
type Step = typeof steps[number];

export function SymptomChecker() {
  const [currentStep, setCurrentStep] = useState<Step>('patient-info');
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [diagnosisResults, setDiagnosisResults] = useState<DiagnosisResult[]>([]);
  const { toast } = useToast();

  const progress = steps.indexOf(currentStep) / (steps.length - 1) * 100;

  const handleRedFlags = (symptoms: Symptom[]) => {
    const symptomIds = symptoms.map(s => s.id);
    const warnings = checkRedFlags(symptomIds);
    
    warnings.forEach(warning => {
      toast({
        variant: "destructive",
        title: "⚠️ Warning",
        description: warning,
      });
    });
  };

  const generateDiagnosis = (symptoms: Symptom[]): DiagnosisResult[] => {
    if (!symptoms.length) return [];
    const symptomIds = symptoms.map(s => s.id);
    
    // Get diseases that match any of our symptoms
    const matchingDiseases = getDiseasesBySymptoms(symptomIds);
    
    return matchingDiseases.map(disease => {
      // Calculate confidence based on symptom matches and durations
      const matchedSymptoms = disease.symptoms.filter(s => symptomIds.includes(s));
      let confidence = (matchedSymptoms.length / disease.symptoms.length) * 100;
      
      // Adjust confidence based on duration match
      const symptomsWithDuration = symptoms.filter(s => s.duration && disease.commonDurations?.includes(s.duration));
      if (symptomsWithDuration.length > 0) {
        confidence += 10; // Boost confidence if duration matches
      }
      
      // Cap confidence at 100%
      confidence = Math.min(confidence, 100);
      
      const severity: Severity = disease.severity;

      return {
        disease,
        confidence,
        matchedSymptoms,
        severity,
        requiresUrgentCare: disease.redFlags?.some(flag => symptomIds.includes(flag)) ?? false
      };
    })
    .filter(result => result.confidence > 30)
    .sort((a, b) => b.confidence - a.confidence);
  };

  const handlePatientInfoSubmit = (info: PatientInfo) => {
    setPatientInfo(info);
    setCurrentStep('symptoms');
  };

  const handleSymptomAdd = (symptom: Symptom) => {
    setSelectedSymptoms(prev => [...prev, { ...symptom, duration: undefined }]);
    handleRedFlags([...selectedSymptoms, symptom]);
    toast({
      title: "Symptom added",
      description: "What other symptoms do you have?",
    });
  };

  const handleSymptomFinish = () => {
    if (selectedSymptoms.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one symptom.",
      });
      return;
    }
    setCurrentStep('duration');
  };

  const handleDurationFinish = () => {
    const results = generateDiagnosis(selectedSymptoms);
    setDiagnosisResults(results);
    setCurrentStep('results');
  };

  const handleUpdateSymptomDuration = (symptomId: string, duration: SymptomDuration) => {
    setSelectedSymptoms(prev => 
      prev.map(s => s.id === symptomId ? { ...s, duration } : s)
    );
  };

  return (
    <>
      <SEO 
        title="Free Online Symptom Checker | AI-Powered Medical Assessment | Vital Metrics"
        description="Check your symptoms with our free, AI-powered medical symptom checker. Get instant health insights, possible conditions, and find nearby healthcare providers. Easy to use, accurate results."
        path="/symptom-checker"
        keywords={[
          'AI symptom checker',
          'online symptom diagnosis',
          'medical condition checker',
          'health symptom analyzer',
          'symptom assessment tool',
          'disease symptom checker',
          'medical diagnosis online',
          'health condition identifier',
          'medical symptoms guide',
          'free medical assessment',
          'instant health check',
          'medical condition finder',
          'symptom duration tracker',
          'nearby hospital finder',
          'medical report generator',
          'symptom checker',
          'medical symptoms',
          'health assessment',
          'online diagnosis',
          'disease checker',
          'medical condition checker',
          'health symptoms',
          'medical diagnosis online',
          'symptom assessment tool',
          'free symptom checker'
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSymptomCheckerSchema())
        }}
      />
    <Card className="w-full max-w-4xl mx-auto shadow-lg overflow-hidden">
      <div className="px-4 sm:px-6 py-6 md:py-12">
        <CardTitle className="text-xl sm:text-2xl font-bold text-primary">Free Online Symptom Checker</CardTitle>
        <CardDescription className="text-sm sm:text-base mt-2">
          Get instant health insights by answering a few simple questions about your symptoms. Free, accurate, and confidential.
        </CardDescription>
      </div>
      <CardContent className="p-3 sm:p-6 overflow-x-hidden">
        <div className="max-w-full overflow-x-auto">
        <Progress value={progress} className="mb-2 sm:mb-4" />
        <Breadcrumbs currentStep={currentStep} />
        <Tabs value={currentStep} className="w-full overflow-hidden">
          <TabsContent value="patient-info" className="overflow-hidden">
            <PatientInfoForm onSubmit={handlePatientInfoSubmit} />
          </TabsContent>

          <TabsContent value="symptoms" className="mt-0 border-none overflow-hidden">
            <SymptomSelector
              selectedSymptoms={selectedSymptoms}
              onSymptomAdd={handleSymptomAdd}
              onFinish={handleSymptomFinish}
              patientInfo={patientInfo}
            />
          </TabsContent>

          <TabsContent value="duration" className="mt-0 border-none overflow-hidden">
            <DurationSelector
              symptoms={selectedSymptoms}
              onUpdateSymptom={handleUpdateSymptomDuration}
              onFinish={handleDurationFinish}
            />
          </TabsContent>

          <TabsContent value="results" className="mt-0 border-none overflow-hidden">
            <DiagnosisResults
              results={diagnosisResults}
              symptoms={selectedSymptoms}
              patientInfo={patientInfo}
            />
          </TabsContent>
        </Tabs>
        </div>
      </CardContent>
    </Card>
    </>
  );
}
