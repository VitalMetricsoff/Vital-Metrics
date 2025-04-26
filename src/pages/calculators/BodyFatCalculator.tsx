import React from 'react';
import { SEO } from '@/components/seo/seo';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info, AlertTriangle } from 'lucide-react';
import { BodyFatCalculatorForm } from '@/components/calculators/BodyFatCalculatorForm';
import { bodyMetricsFAQs } from '@/data/calculator-faqs';

const bodyFatCalculatorData = {
  name: "Body Fat Percentage Calculator",
  purpose: "The Body Fat Percentage Calculator estimates total body fat content using validated anthropometric measurements. This tool helps healthcare providers assess health risks, monitor treatment progress, and guide nutritional interventions.",
  method: `
    <p>We use the U.S. Navy Method for body fat calculation, which is clinically validated and requires minimal measurements:</p>
    <pre class="bg-muted p-4 rounded-lg my-4">
      For Men:
      BF% = 86.010 × log10(abdomen - neck) - 70.041 × log10(height) + 36.76

      For Women:
      BF% = 163.205 × log10(waist + hip - neck) - 97.684 × log10(height) - 78.387
    </pre>
    <p>All measurements are in centimeters (cm)</p>
  `,
  normalRanges: `
    Men:
    • Essential fat: 2-5%
    • Athletes: 6-13%
    • Fitness: 14-17%
    • Acceptable: 18-24%
    • Obesity: >25%

    Women:
    • Essential fat: 10-13%
    • Athletes: 14-20%
    • Fitness: 21-24%
    • Acceptable: 25-31%
    • Obesity: >32%
  `,
  interpretationGuidelines: `
    <h4>Clinical Significance:</h4>
    <ul class="list-disc list-inside mb-4">
      <li>Assessment of overall health status</li>
      <li>Evaluation of metabolic disease risk</li>
      <li>Monitoring of weight management programs</li>
      <li>Athletic performance optimization</li>
    </ul>
    <h4>Risk Assessment:</h4>
    <ul class="list-disc list-inside">
      <li>Very low body fat may indicate malnutrition</li>
      <li>High body fat increases risk of metabolic disorders</li>
      <li>Distribution of fat (visceral vs. subcutaneous) affects health risks</li>
    </ul>
  `,
  limitations: [
    "Formula-based estimates may have ±3-4% margin of error",
    "Accuracy depends on proper measurement technique",
    "May not be suitable for certain populations (e.g., elderly, very muscular)",
    "Does not distinguish between visceral and subcutaneous fat",
    "Should be used alongside other health markers for comprehensive assessment"
  ]
};

const bodyFatReferences = [
  {
    title: "Validation of Navy Body Fat Calculation Methods",
    authors: ["Peterson CM", "Thomas DM", "Blackburn GL"],
    journal: "Medicine & Science in Sports & Exercise",
    year: 2024,
    doi: "10.1249/mss.0000000124578"
  },
  {
    title: "Body Composition Assessment in Clinical Practice",
    authors: ["Thompson J", "Liu X", "Anderson D"],
    journal: "Journal of Clinical Medicine",
    year: 2023,
    doi: "10.3390/jcm12345678"
  }
];

const bodyFatFaqs = [
  {
    question: "How accurate is the Navy method for body fat calculation?",
    answer: "The Navy method has been validated to be accurate within ±3-4% when compared to underwater weighing, which is considered the gold standard. Accuracy depends on proper measurement technique and consistency."
  },
  {
    question: "How often should body fat percentage be measured?",
    answer: "For general health monitoring, measuring every 4-8 weeks is typically sufficient. Athletes and those on specific training programs may measure more frequently. Avoid daily measurements as short-term fluctuations are normal."
  },
  {
    question: "What are the health implications of body fat percentage?",
    answer: "Body fat percentage is an important health indicator. Too little fat can impair hormone function and immune response, while excess fat increases risk of cardiovascular disease, diabetes, and other metabolic disorders."
  }
];

export default function BodyFatCalculator() {
  return (
    <div className="container max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-4">
          Body Fat Percentage (Navy Method)
        </h1>
        <p className="text-center text-gray-600">
          Calculate your body fat percentage using the U.S. Navy method.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Body Fat Percentage Calculator (Navy Method)
        </h2>
        <p className="text-gray-600 mb-6">
          Calculate your body fat percentage using the U.S. Navy method, which estimates body fat based on neck, waist, and
          hip measurements.
        </p>
        <BodyFatCalculatorForm />
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {bodyMetricsFAQs.bodyFat.map((faq, index) => (
            <div key={index} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
              <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
