interface FAQ {
  question: string;
  answer: string;
}

interface CalculatorFAQs {
  [key: string]: FAQ[];
}

// Body Metrics FAQs
export const bodyMetricsFAQs: CalculatorFAQs = {

  idealBodyWeight: [
    {
      question: "What is Ideal Body Weight (IBW)?",
      answer: "IBW is an estimated weight range considered healthy for your height and gender. It's calculated using the Devine formula, which is widely used in clinical settings."
    },
    {
      question: "How accurate is the Devine formula?",
      answer: "The Devine formula provides a reasonable estimate but should be used as a general guide. Individual factors like muscle mass, age, and body composition aren't considered."
    },
    {
      question: "Should everyone aim for their IBW?",
      answer: "Not necessarily. IBW is a general guideline and may not be appropriate for athletes, elderly, or those with certain medical conditions. Consult a healthcare provider for personalized advice."
    }
  ],
  waistToHipRatio: [
    {
      question: "What is Waist-to-Hip Ratio (WHR)?",
      answer: "WHR is a measure of body fat distribution that can indicate health risks. It's calculated by dividing waist circumference by hip circumference."
    },
    {
      question: "What are healthy WHR ranges?",
      answer: "For men: Below 0.9 is considered healthy. For women: Below 0.85 is considered healthy. Higher ratios may indicate increased health risks."
    },
    {
      question: "Why is WHR important?",
      answer: "WHR helps assess risk for conditions like heart disease and diabetes. Higher ratios indicate more abdominal fat, which is linked to these health risks."
    }
  ],
  waistToHeightRatio: [
    {
      question: "What is Waist-to-Height Ratio (WHtR)?",
      answer: "WHtR is a simple measure of central obesity and associated health risks. It's calculated by dividing waist circumference by height."
    },
    {
      question: "What's a healthy WHtR?",
      answer: "A ratio below 0.5 is considered healthy for most adults. This translates to keeping your waist circumference less than half your height."
    },
    {
      question: "Is WHtR better than BMI?",
      answer: "WHtR can be more accurate than BMI for assessing health risks, as it considers where fat is stored. Abdominal fat is particularly linked to health issues."
    }
  ],
  bmi: [
    {
      question: "What is BMI and what does it measure?",
      answer: "Body Mass Index (BMI) is a screening tool that uses height and weight to estimate body fat and assess weight categories. It's calculated as weight in kilograms divided by height in meters squared."
    },
    {
      question: "What are the BMI categories?",
      answer: "Standard BMI categories are: Underweight (<18.5), Normal weight (18.5-24.9), Overweight (25-29.9), and Obese (≥30). However, these may vary for different populations."
    },
    {
      question: "How often should I check my BMI?",
      answer: "For general health monitoring, checking BMI every 6-12 months is sufficient. More frequent monitoring may be needed if you're following a weight management program."
    }
  ],
  bsa: [
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
  ],
  bodyFat: [
    {
      question: "How accurate is the Navy method for body fat calculation?",
      answer: "The Navy method is accurate within ±3-4% when compared to underwater weighing. Accuracy depends on proper measurement technique and consistency."
    },
    {
      question: "What are healthy body fat percentage ranges?",
      answer: "For men: Essential fat (2-5%), Athletes (6-13%), Fitness (14-17%), Average (18-24%). For women: Essential fat (10-13%), Athletes (14-20%), Fitness (21-24%), Average (25-31%)."
    },
    {
      question: "How often should body fat be measured?",
      answer: "Measure every 4-8 weeks for general monitoring. Athletes may measure more frequently. Avoid daily measurements as short-term fluctuations are normal."
    }
  ]
};

// Cardiac Metrics FAQs
export const fitnessMetricsFAQs: CalculatorFAQs = {
  bmr: [
    {
      question: "What is Basal Metabolic Rate (BMR)?",
      answer: "BMR is the number of calories your body burns at rest to maintain basic life functions like breathing, circulation, and cell production."
    },
    {
      question: "How accurate is the Mifflin-St Jeor formula?",
      answer: "The Mifflin-St Jeor equation is considered the most accurate for estimating BMR, with accuracy within ±10% for most people."
    },
    {
      question: "What factors affect BMR?",
      answer: "Age, gender, muscle mass, genetics, hormones, and certain medical conditions can all affect your BMR."
    }
  ],
  tdee: [
    {
      question: "What is Total Daily Energy Expenditure (TDEE)?",
      answer: "TDEE is the total number of calories you burn in a day, including BMR, physical activity, and the thermic effect of food."
    },
    {
      question: "How is TDEE calculated?",
      answer: "TDEE is calculated by multiplying your BMR by an activity factor based on your daily physical activity level."
    },
    {
      question: "Why is TDEE important for weight management?",
      answer: "TDEE helps determine calorie needs for weight maintenance. Eat below TDEE to lose weight, above to gain weight."
    }
  ],
  heartRateZones: [
    {
      question: "What are heart rate zones?",
      answer: "Heart rate zones are ranges of heart rate expressed as percentages of your maximum heart rate. They help optimize different types of training."
    },
    {
      question: "How many heart rate zones are there?",
      answer: "Typically 5 zones: Zone 1 (50-60%), Zone 2 (60-70%), Zone 3 (70-80%), Zone 4 (80-90%), and Zone 5 (90-100% of max heart rate)."
    },
    {
      question: "How do I use heart rate zones in training?",
      answer: "Different zones serve different purposes: lower zones for recovery and endurance, higher zones for improving anaerobic capacity and performance."
    }
  ],
  caloriesBurned: [
    {
      question: "How are calories burned calculated?",
      answer: "Calories burned are calculated using your weight, activity type, intensity level, and duration of exercise."
    },
    {
      question: "How accurate are calorie burn estimates?",
      answer: "Estimates are typically within 10-20% accuracy. Factors like fitness level and exercise efficiency can affect actual calorie burn."
    },
    {
      question: "Which activities burn the most calories?",
      answer: "High-intensity activities like running, swimming, and HIIT typically burn more calories than lower-intensity activities like walking."
    }
  ]
};

export const cardiacMetricsFAQs: CalculatorFAQs = {
  meanArterialPressure: [
    {
      question: "What is Mean Arterial Pressure (MAP)?",
      answer: "MAP is the average blood pressure during a single cardiac cycle. It's important for assessing organ perfusion and cardiovascular health."
    },
    {
      question: "What's a normal MAP value?",
      answer: "A normal MAP ranges from 70-100 mmHg. Values below 65 mmHg may indicate inadequate organ perfusion."
    },
    {
      question: "When should MAP be calculated?",
      answer: "MAP should be calculated during critical care monitoring, shock assessment, and evaluation of organ perfusion."
    }
  ],
  cardiacOutput: [
    {
      question: "What is Cardiac Output?",
      answer: "Cardiac Output is the volume of blood pumped by the heart per minute. It's calculated as Stroke Volume × Heart Rate."
    },
    {
      question: "What's a normal Cardiac Output?",
      answer: "Normal cardiac output at rest is 4-8 L/min for adults. Athletes may have higher values due to training."
    },
    {
      question: "Why is Cardiac Output important?",
      answer: "It's essential for assessing heart function, diagnosing heart conditions, and monitoring treatment effectiveness."
    }
  ]
};

// Renal Function FAQs
export const renalMetricsFAQs: CalculatorFAQs = {
  gfr: [
    {
      question: "What is GFR and why is it important?",
      answer: "Glomerular Filtration Rate (GFR) measures kidney function by estimating how much blood passes through the glomeruli per minute. It's crucial for diagnosing kidney disease."
    },
    {
      question: "What affects GFR results?",
      answer: "Age, gender, race, muscle mass, diet, certain medications, and acute illness can affect GFR results."
    },
    {
      question: "How often should GFR be checked?",
      answer: "Frequency depends on kidney health and risk factors. Those with chronic kidney disease may need checks every 3-12 months."
    }
  ],
  creatinineClearance: [
    {
      question: "What is Creatinine Clearance?",
      answer: "Creatinine Clearance measures how efficiently kidneys filter creatinine from blood. It helps assess kidney function and guide medication dosing."
    },
    {
      question: "How is it different from eGFR?",
      answer: "Creatinine Clearance uses 24-hour urine collection, while eGFR estimates kidney function from a blood test. Both provide information about kidney function."
    },
    {
      question: "What can affect results?",
      answer: "Diet, muscle mass, exercise, certain medications, and proper urine collection technique can affect results."
    }
  ]
};

// Clinical Scores FAQs
export const clinicalScoresFAQs: CalculatorFAQs = {
  apacheII: [
    {
      question: "What is APACHE II used for?",
      answer: "APACHE II (Acute Physiology and Chronic Health Evaluation II) predicts mortality risk in ICU patients based on various physiological measurements."
    },
    {
      question: "When should it be calculated?",
      answer: "Calculate within 24 hours of ICU admission. Use the worst values during this period."
    },
    {
      question: "How often should it be recalculated?",
      answer: "Generally calculated once at admission, but may be repeated if clinical status changes significantly."
    }
  ],
  sofa: [
    {
      question: "What does SOFA score measure?",
      answer: "Sequential Organ Failure Assessment (SOFA) score measures organ dysfunction in six systems: respiratory, cardiovascular, hepatic, coagulation, renal, and neurological."
    },
    {
      question: "How is SOFA score used?",
      answer: "It helps assess organ dysfunction, predict outcomes, and track patient progress in ICU settings."
    },
    {
      question: "When should SOFA be recalculated?",
      answer: "Calculate daily while in ICU to track organ function changes and response to treatment."
    }
  ]
};

// Pediatric Calculators FAQs
export const pediatricMetricsFAQs: CalculatorFAQs = {
  weightForAge: [
    {
      question: "What is Weight-for-Age?",
      answer: "Weight-for-Age measures a child's weight compared to other children of the same age and sex, helping assess growth and nutritional status."
    },
    {
      question: "How are percentiles interpreted?",
      answer: "Percentiles show where a child's weight falls compared to peers. Below 5th or above 95th percentile may need evaluation."
    },
    {
      question: "How often should it be checked?",
      answer: "Regular checks during well-child visits: monthly for infants, every few months for toddlers, annually for older children."
    }
  ],
  pediatricBMI: [
    {
      question: "How is pediatric BMI different from adult BMI?",
      answer: "Pediatric BMI uses age and sex-specific percentiles instead of fixed ranges, as children's body composition changes with growth."
    },
    {
      question: "What are concerning BMI percentiles?",
      answer: "Below 5th percentile (underweight), above 85th (overweight), or above 95th (obese) may need medical evaluation."
    },
    {
      question: "When should pediatric BMI be checked?",
      answer: "At regular well-child visits, typically annually after age 2. More frequent monitoring may be needed for weight concerns."
    }
  ]
};

// Mental Health & Sleep FAQs
export const mentalHealthFAQs: CalculatorFAQs = {
  phq9: [
    {
      question: "What is the PHQ-9?",
      answer: "The Patient Health Questionnaire-9 (PHQ-9) is a 9-item depression screening tool that helps assess the severity of depression symptoms."
    },
    {
      question: "How is the PHQ-9 scored?",
      answer: "Scores range from 0-27: 0-4 minimal, 5-9 mild, 10-14 moderate, 15-19 moderately severe, 20-27 severe depression."
    },
    {
      question: "How often should PHQ-9 be taken?",
      answer: "Typically every 2-4 weeks when monitoring depression treatment, or as recommended by your healthcare provider."
    }
  ],
  gad7: [
    {
      question: "What is the GAD-7?",
      answer: "The Generalized Anxiety Disorder-7 (GAD-7) is a 7-item screening tool used to assess the severity of anxiety symptoms."
    },
    {
      question: "What do GAD-7 scores mean?",
      answer: "Scores range from 0-21: 0-4 minimal, 5-9 mild, 10-14 moderate, 15-21 severe anxiety."
    },
    {
      question: "Is the GAD-7 a diagnostic tool?",
      answer: "No, while GAD-7 helps screen for anxiety symptoms, it's not a diagnostic tool. Only a qualified healthcare provider can diagnose anxiety disorders."
    }
  ],
  sleepCycle: [
    {
      question: "What is a sleep cycle?",
      answer: "A sleep cycle is a 90-minute period during which your brain progresses through various stages of sleep, including light sleep, deep sleep, and REM sleep."
    },
    {
      question: "How many sleep cycles do I need?",
      answer: "Most adults need 4-6 complete sleep cycles (6-9 hours) per night for optimal rest."
    },
    {
      question: "Why is sleep cycle timing important?",
      answer: "Waking up at the end of a sleep cycle helps you feel more refreshed, while waking mid-cycle can leave you feeling groggy."
    }
  ],
  stressLevel: [
    {
      question: "How is stress level measured?",
      answer: "Stress levels are assessed through a questionnaire that evaluates physical symptoms, emotional state, and behavioral changes."
    },
    {
      question: "What are normal stress levels?",
      answer: "Some stress is normal, but persistent high scores may indicate need for stress management techniques or professional help."
    },
    {
      question: "How often should I check my stress levels?",
      answer: "Regular weekly or monthly checks can help track stress patterns and identify triggers. Seek help if stress interferes with daily life."
    }
  ]
};

// Export all FAQ categories
export const allCalculatorFAQs = {
  bodyMetrics: bodyMetricsFAQs,
  cardiacMetrics: cardiacMetricsFAQs,
  renalMetrics: renalMetricsFAQs,
  clinicalScores: clinicalScoresFAQs,
  pediatricMetrics: pediatricMetricsFAQs,
  fitnessMetrics: fitnessMetricsFAQs,
  mentalHealth: mentalHealthFAQs
};
