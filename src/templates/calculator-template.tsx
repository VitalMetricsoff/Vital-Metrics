import { ReactNode } from 'react';
import { SEO } from '@/components/seo/seo';
import { Card } from '@/components/ui/card';
import { RelatedTools } from '../components/related-tools';
import { ClinicalContent } from '../components/clinical-content';
import { CalculatorFAQ } from '../components/calculator-faq';

interface CalculatorTemplateProps {
  title: string;
  description: string;
  keywords: string[];
  children: ReactNode;
  calculatorData: {
    name: string;
    purpose: string;
    method: string;
    normalRanges?: string;
    interpretationGuidelines?: string;
    limitations?: string[];
  };
  clinicalContent: {
    introduction: string;
    methodology: string;
    interpretation: string;
    limitations: string[];
    references: Array<{
      title: string;
      authors: string[];
      journal: string;
      year: number;
      doi?: string;
    }>;
  };
  faqData: Array<{
    question: string;
    answer: string;
  }>;
  relatedTools: Array<{
    name: string;
    path: string;
    description: string;
  }>;
  reviewedBy: {
    name: string;
    credentials: string;
    affiliation?: string;
  };
  lastReviewed: string;
}

export function CalculatorTemplate({
  title,
  description,
  keywords,
  children,
  calculatorData,
  clinicalContent,
  faqData,
  relatedTools,
  reviewedBy,
  lastReviewed
}: CalculatorTemplateProps) {
  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        type="MedicalCalculator"
        canonical={`https://vitalmetrics.in/calculators/${title.toLowerCase().replace(/\s+/g, '-')}`}
        calculatorData={calculatorData}
        faqSchema={faqData}
        lastReviewed={lastReviewed}
        reviewedBy={reviewedBy}
        medicalReferences={clinicalContent.references}
      />
      
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-gray-600 mb-6">{description}</p>
            {children}
          </div>
        </Card>

        <ClinicalContent
          introduction={clinicalContent.introduction}
          methodology={clinicalContent.methodology}
          interpretation={clinicalContent.interpretation}
          limitations={clinicalContent.limitations}
          references={clinicalContent.references}
        />

        <CalculatorFAQ faqs={faqData} />

        <RelatedTools tools={relatedTools} />

        <div className="mt-8 text-sm text-gray-500">
          <p>Last reviewed: {lastReviewed}</p>
          <p>Reviewed by: {reviewedBy.name}, {reviewedBy.credentials}</p>
          {reviewedBy.affiliation && <p>Affiliation: {reviewedBy.affiliation}</p>}
        </div>
      </main>
    </>
  );
}
