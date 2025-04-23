export interface Reference {
  title: string;
  url: string;
  source: string;
  year?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Calculator {
  id: string;
  name: string;
  category: Category;
  description: string;
  slug: string;
  icon: string;
  formula: string;
  inputs: Input[];
  references?: Reference[];
  faqs?: FAQ[];
}

export type Category = 
  | "body-metrics"
  | "fitness-metabolism"
  | "cardio-vitals"
  | "nutrition-metabolic"
  | "diabetes-blood-sugar"
  | "pregnancy-fertility"
  | "lungs-life-expectancy"
  | "mental-sleep"
  | "other-tools";

export const categoryLabels: Record<Category, string> = {
  "body-metrics": "Body Metrics",
  "fitness-metabolism": "Fitness & Metabolism",
  "cardio-vitals": "Cardio & Vitals",
  "nutrition-metabolic": "Nutrition & Metabolic",
  "diabetes-blood-sugar": "Diabetes & Blood Sugar",
  "pregnancy-fertility": "Pregnancy & Fertility",
  "lungs-life-expectancy": "Lungs & Life Expectancy",
  "mental-sleep": "Mental & Sleep",
  "other-tools": "Other Essential Tools",
};

export const categoryColors: Record<Category, string> = {
  "body-metrics": "bg-health-blue text-white",
  "fitness-metabolism": "bg-health-green text-white",
  "cardio-vitals": "bg-health-red text-white",
  "nutrition-metabolic": "bg-health-orange text-white",
  "diabetes-blood-sugar": "bg-health-yellow text-black",
  "pregnancy-fertility": "bg-health-pink text-white",
  "lungs-life-expectancy": "bg-health-teal text-white",
  "mental-sleep": "bg-health-violet text-white",
  "other-tools": "bg-health-indigo text-white",
};

export const categoryIcons: Record<Category, string> = {
  "body-metrics": "Scale",
  "fitness-metabolism": "Activity",
  "cardio-vitals": "Heart",
  "nutrition-metabolic": "Apple",
  "diabetes-blood-sugar": "Droplets",
  "pregnancy-fertility": "Baby",
  "lungs-life-expectancy": "Lungs",
  "mental-sleep": "Brain",
  "other-tools": "LifeBuoy",
};
