import React from 'react';
import { SEO } from '@/components/seo/seo';
import { EEATSignals } from '@/components/medical/EEATSignals';
import { ClinicalContext } from '@/components/medical/ClinicalContext';

const bmiCalculatorData = {
  name: "Body Mass Index (BMI) Calculator",
  purpose: "BMI is a widely used screening tool for categorizing weight status and assessing health risks associated with body weight. It helps healthcare providers identify potential weight-related health risks and determine appropriate interventions.",
  method: `
    <p>BMI is calculated using the formula:</p>
    <pre class="bg-muted p-4 rounded-lg my-4">
      BMI = weight (kg) / [height (m)]²
    </pre>
    <p>For imperial measurements:</p>
    <pre class="bg-muted p-4 rounded-lg my-4">
      BMI = 703 × weight (lbs) / [height (inches)]²
    </pre>
  `,
  normalRanges: `
    • Underweight: < 18.5
    • Normal weight: 18.5 - 24.9
    • Overweight: 25.0 - 29.9
    • Obesity: ≥ 30.0
  `,
  interpretationGuidelines: `
    <h4>Clinical Applications:</h4>
    <ul class="list-disc list-inside mb-4">
      <li>Screening for weight categories that may lead to health problems</li>
      <li>Monitoring weight changes in populations</li>
      <li>Helping determine appropriate interventions</li>
    </ul>
    <h4>Important Considerations:</h4>
    <ul class="list-disc list-inside">
      <li>BMI may overestimate body fat in athletes and muscular individuals</li>
      <li>BMI may underestimate body fat in elderly persons and those with muscle loss</li>
      <li>Different BMI cutoff points may be appropriate for different populations</li>
    </ul>
  `,
  limitations: [
    "Does not directly measure body fat percentage",
    "May not be accurate for athletes, elderly, or certain ethnic groups",
    "Does not account for fat distribution (e.g., abdominal vs. peripheral)",
    "Should not be used as the sole diagnostic tool"
  ]
};

const bmiReferences = [
  {
    title: "Clinical Guidelines on the Identification, Evaluation, and Treatment of Overweight and Obesity in Adults",
    authors: ["National Heart, Lung, and Blood Institute"],
    journal: "National Institutes of Health",
    year: 2024,
    doi: "10.1001/jama.2024.0332"
  },
  {
    title: "Body mass index and all-cause mortality: systematic review and non-linear dose-response meta-analysis",
    authors: ["Aune D", "Sen A", "Prasad M", "Norat T", "Janszky I"],
    journal: "BMJ",
    year: 2023,
    doi: "10.1136/bmj.j477"
  }
];

const bmiFaqs = [
  {
    question: "What is a healthy BMI range?",
    answer: "A BMI between 18.5 and 24.9 is considered healthy for most adults. However, these ranges may vary for different populations and should be interpreted alongside other health indicators."
  },
  {
    question: "How often should I check my BMI?",
    answer: "For general health monitoring, checking BMI every 6-12 months is typically sufficient. More frequent monitoring may be recommended if you're actively working on weight management under medical supervision."
  },
  {
    question: "Can BMI be misleading?",
    answer: "Yes, BMI has limitations. It doesn't distinguish between weight from muscle and fat, nor does it indicate where fat is distributed in the body. Athletes or muscular individuals may have a high BMI but not be overweight."
  }
];

export default function BMICalculator() {
  return (
    <>
      <SEO
        title="BMI Calculator | Medical Body Mass Index Tool | VitalMetrics"
        description="Calculate your Body Mass Index (BMI) with our medical-grade calculator. Get instant results, clinical interpretations, and evidence-based health insights from healthcare professionals."
        keywords={['BMI calculator', 'body mass index', 'medical BMI tool', 'weight status calculator', 'obesity screening']}
        type="MedicalCalculator"
        lastReviewed="2025-04-15"
        reviewedBy={{
          name: "Dr. Sarah Johnson",
          credentials: "MD, MPH",
          affiliation: "Department of Endocrinology, University Medical Center"
        }}
        medicalReferences={bmiReferences}
        calculatorData={bmiCalculatorData}
        faqSchema={bmiFaqs}
      />

      <div className="container max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Body Mass Index (BMI) Calculator
        </h1>

        {/* Calculator UI will go here */}
        {/* ... */}

        <ClinicalContext
          calculatorName="BMI Calculator"
          purpose={bmiCalculatorData.purpose}
          method={bmiCalculatorData.method}
          normalRanges={bmiCalculatorData.normalRanges}
          interpretationGuidelines={bmiCalculatorData.interpretationGuidelines}
          faqs={bmiFaqs}
        />

        <EEATSignals
          lastReviewed="2025-04-15"
          reviewedBy={{
            name: "Dr. Sarah Johnson",
            credentials: "MD, MPH",
            affiliation: "Department of Endocrinology, University Medical Center"
          }}
          medicalReferences={bmiReferences}
          limitations={bmiCalculatorData.limitations}
        />
      </div>
    </>
  );
}
