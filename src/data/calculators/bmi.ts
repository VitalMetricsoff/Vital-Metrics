import { Calculator } from "@/types/calculator";

export const bmiCalculator: Calculator = {
  id: "bmi",
  name: "Body Mass Index (BMI) Calculator",
  description: "Calculate your Body Mass Index (BMI) to assess if you're at a healthy weight for your height.",
  category: "body-metrics",
  slug: "bmi",
  formula: "weight / (height * height)",
  inputs: [
    {
      id: "weight",
      label: "Weight",
      type: "number",
      unit: "kg",
      min: 20,
      max: 300,
      step: 0.1,
      required: true,
    },
    {
      id: "height",
      label: "Height",
      type: "number",
      unit: "cm",
      min: 50,
      max: 250,
      step: 0.1,
      required: true,
    },
  ],
  references: [
    {
      title: "Body Mass Index (BMI)",
      url: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight",
      source: "World Health Organization",
      year: "2021"
    },
    {
      title: "Clinical Guidelines on the Identification, Evaluation, and Treatment of Overweight and Obesity in Adults",
      url: "https://www.nhlbi.nih.gov/health-topics/clinical-guidelines-on-the-identification-evaluation-and-treatment-of-overweight-and-obesity-in-adults",
      source: "National Heart, Lung, and Blood Institute",
      year: "2013"
    },
    {
      title: "BMI Classification",
      url: "https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html",
      source: "Centers for Disease Control and Prevention",
      year: "2022"
    }
  ]
}; 