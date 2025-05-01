import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  currentStep: 'patient-info' | 'symptoms' | 'duration' | 'results';
}

const stepLabels = {
  'patient-info': 'Patient Info',
  'symptoms': 'Select Symptoms',
  'duration': 'Symptom Duration',
  'results': 'Diagnosis Results'
};

export function Breadcrumbs({ currentStep }: BreadcrumbsProps) {
  const steps = ['patient-info', 'symptoms', 'duration', 'results'] as const;
  const currentIndex = steps.indexOf(currentStep);

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
      {steps.map((step, index) => {
        const isActive = index <= currentIndex;
        
        return (
          <div key={step} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
            <span
              className={`${
                isActive
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              {stepLabels[step]}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
