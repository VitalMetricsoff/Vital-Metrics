interface ClinicalAssistanceData {
  [key: string]: {
    calculatorName: string;
    clinicalUse: string;
    whenToUse: string[];
    whenNotToUse: string[];
    interpretationNotes: string;
    alternativeMethods?: string[];
    alerts?: Array<{
      type: 'warning' | 'info' | 'success';
      title: string;
      description: string;
    }>;
    specialPopulations?: Array<{
      population: string;
      considerations: string;
    }>;
    qualityMetrics?: {
      sensitivity?: string;
      specificity?: string;
      validationStudies?: string;
    };
  };
}

// Body Metrics Clinical Assistance
export const bodyMetricsClinicalData: ClinicalAssistanceData = {
  bmi: {
    calculatorName: "Body Mass Index (BMI)",
    clinicalUse: "BMI is a screening tool for weight categories that may indicate health problems. It's used in population health studies and initial patient assessment.",
    whenToUse: [
      "Initial patient assessment",
      "Population health screening",
      "Monitoring weight management progress",
      "Risk assessment for weight-related conditions"
    ],
    whenNotToUse: [
      "Assessment of body composition in athletes",
      "Evaluation of muscle mass",
      "Pregnant women",
      "Elderly patients with significant muscle loss"
    ],
    interpretationNotes: "Consider ethnicity-specific cutoffs and combine with other health markers for comprehensive assessment. BMI categories may need adjustment for certain populations.",
    alternativeMethods: [
      "Body fat percentage measurement",
      "Waist circumference",
      "Waist-to-hip ratio",
      "Bioelectrical impedance analysis"
    ],
    alerts: [
      {
        type: "warning",
        title: "Athletic Population",
        description: "BMI may overestimate body fat in muscular individuals."
      },
      {
        type: "info",
        title: "Ethnic Variations",
        description: "Asian populations may have increased health risks at lower BMI values."
      }
    ],
    specialPopulations: [
      {
        population: "Children and Adolescents",
        considerations: "Use age and sex-specific BMI percentiles instead of adult cutoffs."
      },
      {
        population: "Elderly",
        considerations: "Consider sarcopenia and changes in body composition with aging."
      }
    ],
    qualityMetrics: {
      sensitivity: "High sensitivity for identifying obesity (>95%)",
      specificity: "Moderate specificity for body fat (75-85%)",
      validationStudies: "Extensively validated in population studies across multiple ethnicities"
    }
  },
  bsa: {
    calculatorName: "Body Surface Area (BSA)",
    clinicalUse: "BSA is used for drug dosing, particularly in chemotherapy, and for indexing physiological parameters like cardiac output.",
    whenToUse: [
      "Chemotherapy dosing calculations",
      "Cardiac index determination",
      "Burn area assessment",
      "Standardizing physiological measurements"
    ],
    whenNotToUse: [
      "When actual body composition is needed",
      "For medications that should be dosed by other methods",
      "In cases where extreme body proportions may affect accuracy"
    ],
    interpretationNotes: "Different formulas may give slightly different results. Consider the specific application when choosing a formula.",
    alternativeMethods: [
      "Weight-based dosing",
      "Lean body mass-based calculations",
      "3D body scanning for burn assessment"
    ],
    alerts: [
      {
        type: "warning",
        title: "Obesity Impact",
        description: "May overestimate dosing requirements in obese patients."
      },
      {
        type: "info",
        title: "Formula Selection",
        description: "Mosteller formula provides good balance of accuracy and simplicity."
      }
    ],
    specialPopulations: [
      {
        population: "Pediatric Patients",
        considerations: "Regular recalculation needed due to growth."
      },
      {
        population: "Obese Patients",
        considerations: "Consider using alternative dosing methods for some medications."
      }
    ],
    qualityMetrics: {
      validationStudies: "Validated against direct measurement techniques with correlation >0.95"
    }
  },
  bodyFat: {
    calculatorName: "Body Fat Percentage",
    clinicalUse: "Estimates total body fat content for health risk assessment and fitness monitoring.",
    whenToUse: [
      "Health risk assessment",
      "Fitness program monitoring",
      "Nutritional assessment",
      "Athletic performance evaluation"
    ],
    whenNotToUse: [
      "When precise body composition is required",
      "In severe edema or dehydration",
      "For day-to-day monitoring"
    ],
    interpretationNotes: "Consider age, sex, and activity level when interpreting results. Use trending over time rather than single measurements.",
    alternativeMethods: [
      "Hydrostatic weighing",
      "DXA scan",
      "Bioelectrical impedance",
      "Skinfold measurements"
    ],
    alerts: [
      {
        type: "warning",
        title: "Measurement Technique",
        description: "Accuracy depends heavily on proper measurement technique."
      },
      {
        type: "info",
        title: "Normal Variations",
        description: "Body fat can vary throughout the day and with hydration status."
      }
    ],
    specialPopulations: [
      {
        population: "Athletes",
        considerations: "May have lower normal ranges due to increased muscle mass."
      },
      {
        population: "Elderly",
        considerations: "Consider age-related changes in body composition."
      }
    ],
    qualityMetrics: {
      sensitivity: "±3-4% accuracy compared to underwater weighing",
      specificity: "Good correlation with DXA measurements (r>0.90)",
      validationStudies: "Validated in multiple populations against gold standard methods"
    }
  }
};

// Cardiac Metrics Clinical Assistance
export const cardiacMetricsClinicalData: ClinicalAssistanceData = {
  meanArterialPressure: {
    calculatorName: "Mean Arterial Pressure (MAP)",
    clinicalUse: "Assessment of organ perfusion and cardiovascular status, particularly in critical care settings.",
    whenToUse: [
      "Critical care monitoring",
      "Shock assessment",
      "Perfusion evaluation",
      "Antihypertensive therapy monitoring"
    ],
    whenNotToUse: [
      "As sole indicator of cardiovascular status",
      "When direct arterial measurement is required",
      "In severe arrhythmias affecting accuracy"
    ],
    interpretationNotes: "Consider target MAP based on patient condition and comorbidities. Generally aim for MAP ≥65 mmHg in most adults.",
    alerts: [
      {
        type: "warning",
        title: "Critical Value",
        description: "MAP <65 mmHg may indicate inadequate organ perfusion."
      },
      {
        type: "info",
        title: "Measurement Method",
        description: "Oscillometric devices may be less accurate in shock states."
      }
    ],
    specialPopulations: [
      {
        population: "Septic Shock",
        considerations: "May need higher MAP targets in chronic hypertension."
      },
      {
        population: "Pregnancy",
        considerations: "Different target ranges may apply."
      }
    ],
    qualityMetrics: {
      validationStudies: "Extensively validated in critical care settings"
    }
  }
};

// Export all clinical assistance data
export const allClinicalAssistanceData = {
  bodyMetrics: bodyMetricsClinicalData,
  cardiacMetrics: cardiacMetricsClinicalData
  // Add more categories as needed
};
