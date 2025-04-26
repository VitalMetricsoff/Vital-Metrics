import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info, AlertTriangle, CheckCircle } from 'lucide-react';

interface ClinicalAlert {
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
}

interface ClinicalAssistanceProps {
  calculatorName: string;
  clinicalUse: string;
  whenToUse: string[];
  whenNotToUse: string[];
  interpretationNotes: string;
  alternativeMethods?: string[];
  alerts?: ClinicalAlert[];
  specialPopulations?: {
    population: string;
    considerations: string;
  }[];
  qualityMetrics?: {
    sensitivity?: string;
    specificity?: string;
    validationStudies?: string;
  };
}

export function ClinicalAssistance({
  calculatorName,
  clinicalUse,
  whenToUse,
  whenNotToUse,
  interpretationNotes,
  alternativeMethods,
  alerts,
  specialPopulations,
  qualityMetrics
}: ClinicalAssistanceProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Clinical Assistance Guide: {calculatorName}</h3>
          
          <div className="space-y-6">
            {/* Primary Clinical Use */}
            <section>
              <h4 className="font-medium mb-2">Primary Clinical Use</h4>
              <p className="text-muted-foreground">{clinicalUse}</p>
            </section>

            {/* When to Use */}
            <section>
              <h4 className="font-medium mb-2">When to Use</h4>
              <ul className="list-disc list-inside text-muted-foreground">
                {whenToUse.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* When Not to Use */}
            <section>
              <h4 className="font-medium mb-2">When Not to Use</h4>
              <ul className="list-disc list-inside text-muted-foreground">
                {whenNotToUse.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Interpretation Notes */}
            <section>
              <h4 className="font-medium mb-2">Interpretation Guidelines</h4>
              <p className="text-muted-foreground">{interpretationNotes}</p>
            </section>

            {/* Alternative Methods */}
            {alternativeMethods && alternativeMethods.length > 0 && (
              <section>
                <h4 className="font-medium mb-2">Alternative Methods</h4>
                <ul className="list-disc list-inside text-muted-foreground">
                  {alternativeMethods.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Clinical Alerts */}
            {alerts && alerts.length > 0 && (
              <section className="space-y-3">
                {alerts.map((alert, index) => (
                  <Alert key={index} variant={alert.type === 'warning' ? 'destructive' : 'default'}>
                    {alert.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                    {alert.type === 'info' && <Info className="h-4 w-4" />}
                    {alert.type === 'success' && <CheckCircle className="h-4 w-4" />}
                    <AlertTitle>{alert.title}</AlertTitle>
                    <AlertDescription>{alert.description}</AlertDescription>
                  </Alert>
                ))}
              </section>
            )}

            {/* Special Populations */}
            {specialPopulations && specialPopulations.length > 0 && (
              <section>
                <h4 className="font-medium mb-2">Special Population Considerations</h4>
                <div className="space-y-3">
                  {specialPopulations.map((pop, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4">
                      <h5 className="font-medium">{pop.population}</h5>
                      <p className="text-muted-foreground">{pop.considerations}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Quality Metrics */}
            {qualityMetrics && (
              <section>
                <h4 className="font-medium mb-2">Quality Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {qualityMetrics.sensitivity && (
                    <div>
                      <h5 className="font-medium">Sensitivity</h5>
                      <p className="text-muted-foreground">{qualityMetrics.sensitivity}</p>
                    </div>
                  )}
                  {qualityMetrics.specificity && (
                    <div>
                      <h5 className="font-medium">Specificity</h5>
                      <p className="text-muted-foreground">{qualityMetrics.specificity}</p>
                    </div>
                  )}
                  {qualityMetrics.validationStudies && (
                    <div className="md:col-span-2">
                      <h5 className="font-medium">Validation Studies</h5>
                      <p className="text-muted-foreground">{qualityMetrics.validationStudies}</p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
