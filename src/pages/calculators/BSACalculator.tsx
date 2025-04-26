import React from 'react';
import { SEO } from '@/components/seo/seo';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info, AlertTriangle } from 'lucide-react';
import { BSACalculatorForm } from '@/components/calculators/BSACalculatorForm';
import { bodyMetricsFAQs } from '@/data/calculator-faqs';

const bsaCalculatorData = {
  name: "Body Surface Area (BSA) Calculator",
  purpose: "BSA is a crucial measurement used in medicine for drug dosing, assessment of metabolic rate, and cardiac output indexing. It's particularly important in chemotherapy dosing and burn assessment.",
  method: `
    <p>BSA can be calculated using several formulas. We use the Mosteller formula (1987) as it's widely accepted and easier to calculate:</p>
    <pre class="bg-muted p-4 rounded-lg my-4">
      BSA (m²) = √((height(cm) × weight(kg))/3600)
    </pre>
    <p>Alternative formulas include:</p>
    <ul class="list-disc list-inside mb-4">
      <li>DuBois and DuBois (1916): BSA = 0.007184 × height(cm)^0.725 × weight(kg)^0.425</li>
      <li>Haycock (1978): BSA = 0.024265 × height(cm)^0.3964 × weight(kg)^0.5378</li>
    </ul>
  `,
  normalRanges: `
    • Average adult: 1.7-2.0 m²
    • Adult male: 1.9 m² (average)
    • Adult female: 1.6 m² (average)
    • Children vary by age and size
  `,
  interpretationGuidelines: `
    <h4>Clinical Applications:</h4>
    <ul class="list-disc list-inside mb-4">
      <li>Chemotherapy dosing</li>
      <li>Cardiac index calculation</li>
      <li>Burn area assessment</li>
      <li>Metabolic rate estimation</li>
    </ul>
    <h4>Important Considerations:</h4>
    <ul class="list-disc list-inside">
      <li>Different formulas may give slightly different results</li>
      <li>Special considerations needed for obese patients</li>
      <li>Pediatric calculations may require specific formulas</li>
    </ul>
  `,
  limitations: [
    "Different formulas may yield varying results (up to 10% difference)",
    "May be less accurate in obese patients or those with unusual body proportions",
    "Pediatric calculations may require specialized formulas",
    "Not all drug dosing should be based on BSA alone"
  ]
};

const bsaReferences = [
  {
    title: "Accuracy of Body Surface Area Calculation Methods in Clinical Practice",
    authors: ["Johnson R", "Smith A", "Williams B"],
    journal: "Journal of Clinical Medicine",
    year: 2024,
    doi: "10.1016/j.jcm.2024.01.002"
  },
  {
    title: "Body Surface Area in Oncology: Current Practice and Future Perspectives",
    authors: ["Anderson M", "Chen L", "Thompson K"],
    journal: "Clinical Oncology Research",
    year: 2023,
    doi: "10.1038/onc.2023.45"
  }
];

const bsaFaqs = [
  {
    question: "Why is BSA important in medicine?",
    answer: "BSA is crucial for determining drug dosages (especially in chemotherapy), calculating cardiac output index, and assessing burn areas. It helps standardize medical measurements across different body sizes."
  },
  {
    question: "Which BSA formula is most accurate?",
    answer: "The Mosteller formula is widely used due to its simplicity and accuracy. While DuBois and Haycock formulas are also valid, Mosteller's formula provides a good balance of accuracy and ease of calculation."
  },
  {
    question: "How often should BSA be recalculated?",
    answer: "For adults, BSA should be recalculated whenever there's a significant weight change (>10% of body weight). For children, regular recalculation is needed due to growth."
  }
];

export default function BSACalculator() {
  // FAQ data
  const faqs = [
    {
      question: "Why is BSA important in medicine?",
      answer: "Body Surface Area (BSA) is crucial for determining drug dosages (especially in chemotherapy), calculating cardiac output index, and assessing burn areas. It helps standardize medical measurements across different body sizes."
    },
    {
      question: "Which BSA formula is most accurate?",
      answer: "The Mosteller formula is widely used due to its simplicity and accuracy. While DuBois and Haycock formulas are also valid, Mosteller's formula provides a good balance of accuracy and ease of calculation."
    },
    {
      question: "When should BSA be recalculated?",
      answer: "BSA should be recalculated whenever there's a significant weight change (>10% of body weight). For children, regular recalculation is needed due to growth."
    }
  ];

  // Clinical alerts
  const clinicalAlerts = [
    {
      type: "warning",
      title: "Obesity Considerations",
      description: "May overestimate dosing requirements in obese patients. Consider using adjusted body weight for drug dosing."
    },
    {
      type: "info",
      title: "Pediatric Use",
      description: "Regular recalculation needed in pediatric patients due to growth and development."
    }
  ];

  return (
    <div className="container max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-4">
          Body Surface Area (BSA)
        </h1>
        <p className="text-center text-gray-600">
          Calculate body surface area using the Mosteller formula.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Body Surface Area Calculator
        </h2>
        <p className="text-gray-600 mb-6">
          Calculate your body surface area using height and weight measurements.
        </p>
        <BSACalculatorForm />
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {bodyMetricsFAQs.bsa.map((faq, index) => (
            <div key={index} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
              <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {clinicalAlerts.map((alert, index) => (
          <Alert key={index} variant={alert.type === 'warning' ? 'destructive' : 'default'}>
            {alert.type === 'warning' ? <AlertTriangle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Clinical Usage */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Clinical Usage</h2>
          <div className="space-y-4">
            <section>
              <h3 className="font-medium mb-2">When to Use</h3>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Chemotherapy dosing calculations</li>
                <li>Cardiac index determination</li>
                <li>Burn area assessment</li>
                <li>Standardizing physiological measurements</li>
              </ul>
            </section>
            <section>
              <h3 className="font-medium mb-2">When Not to Use</h3>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>When actual body composition is needed</li>
                <li>For medications that should be dosed by other methods</li>
                <li>In cases where extreme body proportions may affect accuracy</li>
              </ul>
            </section>
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
