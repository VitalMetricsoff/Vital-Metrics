import { Disease, BodyRegion } from '@/types/symptom-checker';

export const diseases: Disease[] = [
  // Head & Neck Diseases
  {
    id: 'migraine',
    name: 'Migraine',
    symptoms: ['headache', 'vision-changes', 'nausea', 'sensitivity-to-light', 'aura', 'dizziness'],
    bodyRegion: 'head-neck',
    severity: 'medium',
    description: 'A neurological condition characterized by severe, throbbing headaches often accompanied by sensory disturbances called auras. Migraines can significantly impact daily activities and quality of life.',
    redFlags: ['worst-headache', 'sudden-onset', 'fever-with-headache'],
    commonDurations: ['hours', 'days'],
    riskFactors: [
      'family-history',
      'stress',
      'hormonal-changes',
      'certain-foods',
      'lack-of-sleep',
      'dehydration'
    ],
    treatment: `Treatment options include:
- Acute medications (triptans, NSAIDs)
- Preventive medications (beta-blockers, anticonvulsants)
- Lifestyle changes (stress management, sleep hygiene)
- Trigger avoidance
- Alternative therapies (acupuncture, biofeedback)`,
    whenToSeekCare: `Seek immediate medical attention if you experience:
- First severe headache of your life
- Headache with fever and stiff neck
- Headache after head injury
- Sudden onset, extremely severe headache
- Headache with confusion or weakness`,
    preventiveMeasures: [
      'Maintain regular sleep schedule',
      'Stay hydrated',
      'Avoid known triggers',
      'Practice stress management',
      'Regular exercise'
    ],
    commonTriggers: [
      'Bright lights or loud sounds',
      'Strong smells',
      'Certain foods or drinks',
      'Weather changes',
      'Stress or anxiety'
    ],
    additionalResources: [
      {
        name: 'American Migraine Foundation',
        url: 'https://americanmigrainefoundation.org',
        type: 'organization'
      },
      {
        name: 'Migraine Research Foundation',
        url: 'https://migraineresearchfoundation.org',
        type: 'research'
      }
    ]
  },
  {
    id: 'tension-headache',
    name: 'Tension Headache',
    symptoms: ['headache', 'neck-pain', 'stress'],
    bodyRegion: 'head-neck',
    severity: 'low',
    description: 'Common headache causing mild to moderate pain, often described as a tight band around the head.',
    commonDurations: ['hours', 'days'],
    riskFactors: ['stress', 'poor-posture', 'anxiety'],
    treatment: 'Over-the-counter pain relievers, stress management, proper posture',
    whenToSeekCare: 'If headaches become chronic or significantly impact daily activities'
  },
  {
    id: 'sinusitis',
    name: 'Sinusitis',
    symptoms: ['sinus-congestion', 'facial-pain', 'headache', 'runny-nose'],
    bodyRegion: 'head-neck',
    severity: 'low',
    description: 'Inflammation of the sinuses causing pain and pressure in the face.',
    commonDurations: ['days', 'weeks'],
    treatment: 'Decongestants, nasal steroids, antibiotics if bacterial',
    whenToSeekCare: 'If symptoms persist beyond 10 days or worsen after initial improvement'
  },

  // Chest & Lungs Diseases
  {
    id: 'heart-attack',
    name: 'Heart Attack (Myocardial Infarction)',
    symptoms: [
      'chest-pain',
      'shortness-of-breath',
      'sweating',
      'nausea',
      'arm-pain',
      'jaw-pain',
      'upper-back-pain',
      'lightheadedness'
    ],
    bodyRegion: 'chest-lungs',
    severity: 'high',
    description: `A life-threatening emergency where blood flow to the heart muscle is blocked, causing tissue damage. The medical term is myocardial infarction (MI). Heart attacks can range from mild to severe and may present differently in men and women.`,
    redFlags: [
      'chest-pain',
      'shortness-of-breath',
      'radiating-pain',
      'cold-sweats',
      'severe-nausea'
    ],
    commonDurations: ['minutes', 'hours'],
    riskFactors: [
      'smoking',
      'hypertension',
      'diabetes',
      'obesity',
      'high-cholesterol',
      'family-history',
      'age',
      'physical-inactivity',
      'stress',
      'previous-heart-attack'
    ],
    treatment: `Emergency treatment includes:
- Immediate hospitalization
- Medications (aspirin, blood thinners)
- Procedures (angioplasty, stent placement)
- Possible emergency bypass surgery

Long-term treatment:
- Cardiac rehabilitation
- Blood pressure management
- Cholesterol control
- Lifestyle modifications`,
    whenToSeekCare: 'CALL EMERGENCY SERVICES IMMEDIATELY if you suspect a heart attack. Every minute counts. Do not drive yourself to the hospital.',
    preventiveMeasures: [
      'Regular exercise',
      'Heart-healthy diet',
      'Blood pressure monitoring',
      'Cholesterol management',
      'Stress reduction',
      'Regular medical check-ups'
    ],
    riskAssessment: {
      highRisk: [
        'Multiple risk factors present',
        'Previous heart problems',
        'Family history of early heart disease',
        'Diabetes with other risk factors'
      ],
      moderateRisk: [
        'Single risk factor',
        'Family history without other risks',
        'Age over 45 (men) or 55 (women)'
      ]
    },
    additionalResources: [
      {
        name: 'American Heart Association',
        url: 'https://www.heart.org',
        type: 'organization'
      },
      {
        name: 'CardioSmart',
        url: 'https://www.cardiosmart.org',
        type: 'education'
      }
    ],
    emergencySteps: [
      'Call emergency services immediately',
      'Chew an aspirin if advised by emergency services',
      'Rest in a comfortable position',
      'Loosen tight clothing',
      'Stay calm and take slow breaths'
    ]
  },
  {
    id: 'pneumonia',
    name: 'Pneumonia',
    symptoms: ['cough', 'fever', 'shortness-of-breath', 'chest-pain', 'fatigue'],
    bodyRegion: 'chest-lungs',
    severity: 'high',
    description: 'Infection causing inflammation of the air sacs in lungs.',
    redFlags: ['severe-shortness-of-breath', 'high-fever'],
    commonDurations: ['days', 'weeks'],
    riskFactors: ['smoking', 'weakened-immune-system', 'age'],
    treatment: 'Antibiotics for bacterial pneumonia, rest, fluids',
    whenToSeekCare: 'If experiencing severe breathing difficulty or high fever'
  },

  // Abdominal Diseases
  {
    id: 'gastritis',
    name: 'Gastritis',
    symptoms: ['abdominal-pain', 'nausea', 'vomiting', 'bloating'],
    bodyRegion: 'abdomen',
    severity: 'medium',
    description: 'Inflammation of stomach lining causing digestive issues.',
    commonDurations: ['days', 'weeks'],
    riskFactors: ['nsaid-use', 'alcohol', 'h-pylori'],
    treatment: 'Acid reducers, antibiotics if H. pylori present, dietary changes',
    whenToSeekCare: 'If symptoms persist or include severe pain/black stools'
  },
  {
    id: 'appendicitis',
    name: 'Appendicitis',
    symptoms: ['abdominal-pain', 'nausea', 'fever', 'loss-of-appetite'],
    bodyRegion: 'abdomen',
    severity: 'high',
    description: 'Inflammation of the appendix requiring immediate attention.',
    redFlags: ['severe-abdominal-pain', 'fever'],
    commonDurations: ['hours', 'days'],
    treatment: 'Surgery (appendectomy)',
    whenToSeekCare: 'IMMEDIATELY if suspected - surgical emergency'
  },

  // Limb-related Diseases
  {
    id: 'rheumatoid-arthritis',
    name: 'Rheumatoid Arthritis',
    symptoms: ['joint-pain', 'joint-swelling', 'stiffness', 'fatigue'],
    bodyRegion: 'limbs',
    severity: 'medium',
    description: 'Autoimmune condition causing joint inflammation and pain.',
    commonDurations: ['months', 'years'],
    riskFactors: ['genetics', 'smoking', 'obesity'],
    treatment: 'Disease-modifying drugs, pain management, physical therapy',
    whenToSeekCare: 'If experiencing persistent joint pain and swelling'
  },
  {
    id: 'deep-vein-thrombosis',
    name: 'Deep Vein Thrombosis',
    symptoms: ['leg-pain', 'swelling', 'warmth', 'redness'],
    bodyRegion: 'limbs',
    severity: 'high',
    description: 'Blood clot in deep vein, usually in legs.',
    redFlags: ['sudden-leg-pain', 'swelling'],
    commonDurations: ['days'],
    riskFactors: ['immobility', 'surgery', 'pregnancy', 'obesity'],
    treatment: 'Blood thinners, compression stockings',
    whenToSeekCare: 'Immediately if suspected - can lead to pulmonary embolism'
  },

  // Skin Diseases
  {
    id: 'cellulitis',
    name: 'Cellulitis',
    symptoms: ['skin-redness', 'swelling', 'warmth', 'pain'],
    bodyRegion: 'skin',
    severity: 'medium',
    description: 'Bacterial skin infection that can spread if untreated.',
    redFlags: ['fever', 'spreading-redness'],
    commonDurations: ['days', 'weeks'],
    treatment: 'Antibiotics, elevation of affected area',
    whenToSeekCare: 'If area is rapidly spreading or accompanied by fever'
  },
  {
    id: 'shingles',
    name: 'Shingles',
    symptoms: ['skin-pain', 'rash', 'blisters', 'itching'],
    bodyRegion: 'skin',
    severity: 'medium',
    description: 'Viral infection causing painful skin rash.',
    commonDurations: ['weeks'],
    riskFactors: ['age', 'weakened-immune-system'],
    treatment: 'Antiviral medications, pain management',
    whenToSeekCare: 'Within 72 hours of rash appearance for best treatment results'
  },

  // General Conditions
  {
    id: 'influenza',
    name: 'Influenza',
    symptoms: ['fever', 'body-aches', 'fatigue', 'cough', 'headache'],
    bodyRegion: 'general',
    severity: 'medium',
    description: 'Viral infection affecting respiratory system.',
    commonDurations: ['days', 'weeks'],
    riskFactors: ['age', 'chronic-conditions', 'pregnancy'],
    treatment: 'Rest, fluids, antiviral medications if early',
    whenToSeekCare: 'If experiencing severe symptoms or in high-risk group'
  },
  {
    id: 'covid-19',
    name: 'COVID-19',
    symptoms: ['fever', 'cough', 'shortness-of-breath', 'fatigue', 'loss-of-taste'],
    bodyRegion: 'general',
    severity: 'high',
    description: 'Viral infection that can affect multiple body systems.',
    redFlags: ['severe-shortness-of-breath', 'chest-pain'],
    commonDurations: ['days', 'weeks'],
    riskFactors: ['age', 'chronic-conditions', 'obesity'],
    treatment: 'Supportive care, antivirals if eligible',
    whenToSeekCare: 'If experiencing severe symptoms or shortness of breath'
  }
];

// Helper function to get diseases by symptoms with enhanced matching
export function getDiseasesBySymptoms(symptomIds: string[]): Disease[] {
  return diseases.filter(disease =>
    symptomIds.some(symptom => disease.symptoms.includes(symptom))
  ).sort((a, b) => {
    // Count matching symptoms for each disease
    const aMatches = symptomIds.filter(s => a.symptoms.includes(s)).length;
    const bMatches = symptomIds.filter(s => b.symptoms.includes(s)).length;
    
    // Calculate match percentage
    const aMatchPercentage = (aMatches / a.symptoms.length) * 100;
    const bMatchPercentage = (bMatches / b.symptoms.length) * 100;
    
    // Consider severity in ranking
    const severityScore = {
      'high': 3,
      'medium': 2,
      'low': 1
    };
    
    // Combine factors for final score:
    // 60% weight to matching symptoms
    // 30% weight to match percentage
    // 10% weight to severity
    const aScore = (aMatches * 0.6) + (aMatchPercentage * 0.3) + (severityScore[a.severity] * 0.1);
    const bScore = (bMatches * 0.6) + (bMatchPercentage * 0.3) + (severityScore[b.severity] * 0.1);
    
    return bScore - aScore;
  });
}

// Helper function to check for red flag combinations
export function checkRedFlags(symptomIds: string[]): string[] {
  return diseases
    .filter(disease => 
      disease.redFlags?.some(flag => symptomIds.includes(flag))
    )
    .map(disease => 
      `WARNING: ${disease.name} - ${disease.whenToSeekCare}`
    );
}
