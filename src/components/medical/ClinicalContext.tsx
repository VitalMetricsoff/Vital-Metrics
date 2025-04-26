import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Stethoscope, Target, LineChart, HelpCircle } from 'lucide-react';

interface ClinicalContextProps {
  calculatorName: string;
  purpose: string;
  method: string;
  normalRanges?: string;
  interpretationGuidelines?: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function ClinicalContext({
  calculatorName,
  purpose,
  method,
  normalRanges,
  interpretationGuidelines,
  faqs
}: ClinicalContextProps) {
  return (
    <div className="space-y-6 mt-8">
      {/* Clinical Purpose */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-xl">Clinical Significance</h2>
          </div>
          <p className="text-muted-foreground">{purpose}</p>
        </CardContent>
      </Card>

      {/* Calculation Method */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-xl">Calculation Method</h2>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: method }} />
          </div>
        </CardContent>
      </Card>

      {/* Normal Ranges & Interpretation */}
      {(normalRanges || interpretationGuidelines) && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <LineChart className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-xl">Clinical Interpretation</h2>
            </div>
            {normalRanges && (
              <div className="mb-4">
                <h3 className="font-medium text-lg mb-2">Normal Ranges</h3>
                <p className="text-muted-foreground">{normalRanges}</p>
              </div>
            )}
            {interpretationGuidelines && (
              <div>
                <h3 className="font-medium text-lg mb-2">Interpretation Guidelines</h3>
                <div className="prose dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: interpretationGuidelines }} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* FAQs */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-xl">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
