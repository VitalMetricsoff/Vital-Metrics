// Define valid body regions
export type BodyRegion = 'head-neck' | 'chest-lungs' | 'abdomen' | 'limbs' | 'skin' | 'genitals' | 'general';

// Map body regions to display names
export const bodyRegions: Record<BodyRegion, string> = {
  'head-neck': 'Head & Neck',
  'chest-lungs': 'Chest & Lungs',
  'abdomen': 'Abdomen',
  'limbs': 'Arms & Legs',
  'skin': 'Skin',
  'genitals': 'Genitourinary',
  'general': 'General'
} as const;

// Define duration type
export type SymptomDuration = 'hours' | 'days' | 'weeks' | 'months' | 'years';

// Define symptom interface
export interface Symptom {
  id: string;
  name: string;
  bodyRegion: BodyRegion;
  suggestedFollowUps: string[];
  isRedFlag: boolean;
  duration?: SymptomDuration;
}

// Define disease interface
export interface Disease {
  id: string;
  name: string;
  symptoms: string[];
  bodyRegion: BodyRegion;
  severity: 'low' | 'medium' | 'high';
  description?: string;
  redFlags?: string[];
}

// Define risk factor interface
export interface RiskFactor {
  id: string;
  question: string;
  description: string;
}

// Define symptoms data
export const symptoms: Array<Symptom> = [
  // Head & Neck Symptoms
  {
    id: 'headache',
    name: 'Headache',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['vision-changes', 'neck-pain'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'vision-changes',
    name: 'Vision Changes',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['headache'],
    isRedFlag: true
  } satisfies Symptom,
  {
    id: 'dizziness',
    name: 'Dizziness',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['nausea', 'headache', 'vision-changes'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'neck-pain',
    name: 'Neck Pain',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['headache', 'shoulder-pain'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'sore-throat',
    name: 'Sore Throat',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['difficulty-swallowing', 'fever'],
    isRedFlag: false
  },
  {
    id: 'difficulty-swallowing',
    name: 'Difficulty Swallowing',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['sore-throat', 'chest-pain'],
    isRedFlag: true
  },
  {
    id: 'ear-pain',
    name: 'Ear Pain',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['hearing-loss', 'dizziness'],
    isRedFlag: false
  },
  {
    id: 'hearing-loss',
    name: 'Hearing Loss',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['ear-pain', 'dizziness'],
    isRedFlag: true
  },
  {
    id: 'tinnitus',
    name: 'Ringing in Ears',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['hearing-loss', 'dizziness'],
    isRedFlag: false
  },
  {
    id: 'facial-pain',
    name: 'Facial Pain',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['headache', 'sinus-congestion'],
    isRedFlag: false
  },
  {
    id: 'sinus-congestion',
    name: 'Sinus Congestion',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['facial-pain', 'runny-nose'],
    isRedFlag: false
  },
  {
    id: 'runny-nose',
    name: 'Runny Nose',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['sinus-congestion', 'sore-throat'],
    isRedFlag: false
  },
  {
    id: 'nose-bleeding',
    name: 'Nose Bleeding',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['headache'],
    isRedFlag: false
  },
  {
    id: 'jaw-pain',
    name: 'Jaw Pain',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['headache', 'facial-pain'],
    isRedFlag: false
  },
  {
    id: 'tooth-pain',
    name: 'Tooth Pain',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['jaw-pain', 'facial-pain'],
    isRedFlag: false
  },
  {
    id: 'mouth-sores',
    name: 'Mouth Sores',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['difficulty-swallowing'],
    isRedFlag: false
  },
  {
    id: 'dry-mouth',
    name: 'Dry Mouth',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['difficulty-swallowing'],
    isRedFlag: false
  },
  {
    id: 'hoarseness',
    name: 'Hoarseness',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['sore-throat', 'difficulty-swallowing'],
    isRedFlag: false
  },
  {
    id: 'swollen-glands',
    name: 'Swollen Glands',
    bodyRegion: 'head-neck',
    suggestedFollowUps: ['sore-throat', 'fever'],
    isRedFlag: false
  },
  { id: 'double-vision', name: 'Double Vision', bodyRegion: 'head-neck', suggestedFollowUps: ['vision-changes', 'headache'], isRedFlag: true },

  // Chest & Lungs Symptoms
  {
    id: 'chest-pain',
    name: 'Chest Pain',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['shortness-of-breath', 'cough'],
    isRedFlag: true
  },
  {
    id: 'shortness-of-breath',
    name: 'Shortness of Breath',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['chest-pain', 'cough'],
    isRedFlag: true
  },
  {
    id: 'cough',
    name: 'Cough',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['shortness-of-breath', 'chest-pain'],
    isRedFlag: false
  },
  {
    id: 'wheezing',
    name: 'Wheezing',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['shortness-of-breath', 'cough'],
    isRedFlag: false
  },
  {
    id: 'coughing-blood',
    name: 'Coughing Blood',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['chest-pain', 'shortness-of-breath'],
    isRedFlag: true
  },
  {
    id: 'rapid-breathing',
    name: 'Rapid Breathing',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['shortness-of-breath', 'chest-pain'],
    isRedFlag: true
  },
  {
    id: 'chest-tightness',
    name: 'Chest Tightness',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['chest-pain', 'shortness-of-breath'],
    isRedFlag: true
  },
  {
    id: 'irregular-heartbeat',
    name: 'Irregular Heartbeat',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['chest-pain', 'dizziness'],
    isRedFlag: true
  },
  {
    id: 'heart-palpitations',
    name: 'Heart Palpitations',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['chest-pain', 'dizziness'],
    isRedFlag: true
  },
  {
    id: 'chest-pressure',
    name: 'Chest Pressure',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['chest-pain', 'shortness-of-breath'],
    isRedFlag: true
  },
  {
    id: 'productive-cough',
    name: 'Productive Cough',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['cough', 'fever'],
    isRedFlag: false
  },
  {
    id: 'dry-cough',
    name: 'Dry Cough',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['cough', 'sore-throat'],
    isRedFlag: false
  },
  {
    id: 'chest-congestion',
    name: 'Chest Congestion',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['cough', 'shortness-of-breath'],
    isRedFlag: false
  },
  {
    id: 'shallow-breathing',
    name: 'Shallow Breathing',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['shortness-of-breath', 'chest-pain'],
    isRedFlag: true
  },
  {
    id: 'painful-breathing',
    name: 'Painful Breathing',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['chest-pain', 'shortness-of-breath'],
    isRedFlag: true
  },
  {
    id: 'chest-pressure',
    name: 'Chest Pressure',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['chest-pain', 'shortness-of-breath'],
    isRedFlag: true
  },
  {
    id: 'rapid-heartbeat',
    name: 'Rapid Heartbeat',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['palpitations', 'chest-pain'],
    isRedFlag: true
  },
  {
    id: 'slow-heartbeat',
    name: 'Slow Heartbeat',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['palpitations', 'dizziness'],
    isRedFlag: true
  },
  {
    id: 'heart-fluttering',
    name: 'Heart Fluttering',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['palpitations', 'chest-pain'],
    isRedFlag: true
  },
  {
    id: 'chest-heaviness',
    name: 'Chest Heaviness',
    bodyRegion: 'chest-lungs',
    suggestedFollowUps: ['chest-pain', 'shortness-of-breath'],
    isRedFlag: true
  },

  // Abdomen Symptoms
  { id: 'abdominal-pain', name: 'Abdominal Pain', bodyRegion: 'abdomen', suggestedFollowUps: ['nausea', 'vomiting'], isRedFlag: false },
  { id: 'nausea', name: 'Nausea', bodyRegion: 'abdomen', suggestedFollowUps: ['vomiting', 'abdominal-pain'], isRedFlag: false },
  { id: 'vomiting', name: 'Vomiting', bodyRegion: 'abdomen', suggestedFollowUps: ['nausea', 'abdominal-pain'], isRedFlag: false },
  { id: 'diarrhea', name: 'Diarrhea', bodyRegion: 'abdomen', suggestedFollowUps: ['abdominal-pain', 'nausea'], isRedFlag: false },
  { id: 'constipation', name: 'Constipation', bodyRegion: 'abdomen', suggestedFollowUps: ['abdominal-pain'], isRedFlag: false },
  { id: 'bloating', name: 'Bloating', bodyRegion: 'abdomen', suggestedFollowUps: ['abdominal-pain', 'nausea'], isRedFlag: false },
  { id: 'heartburn', name: 'Heartburn', bodyRegion: 'abdomen', suggestedFollowUps: ['chest-pain', 'nausea'], isRedFlag: false },
  { id: 'indigestion', name: 'Indigestion', bodyRegion: 'abdomen', suggestedFollowUps: ['heartburn', 'nausea'], isRedFlag: false },
  { id: 'loss-of-appetite', name: 'Loss of Appetite', bodyRegion: 'abdomen', suggestedFollowUps: ['nausea', 'weight-loss'], isRedFlag: false },
  { id: 'increased-appetite', name: 'Increased Appetite', bodyRegion: 'abdomen', suggestedFollowUps: ['weight-gain'], isRedFlag: false },
  { id: 'difficulty-swallowing-food', name: 'Difficulty Swallowing Food', bodyRegion: 'abdomen', suggestedFollowUps: ['chest-pain', 'heartburn'], isRedFlag: true },
  { id: 'abdominal-swelling', name: 'Abdominal Swelling', bodyRegion: 'abdomen', suggestedFollowUps: ['abdominal-pain', 'bloating'], isRedFlag: false },
  { id: 'early-satiety', name: 'Early Satiety', bodyRegion: 'abdomen', suggestedFollowUps: ['loss-of-appetite', 'bloating'], isRedFlag: false },
  { id: 'blood-in-stool', name: 'Blood in Stool', bodyRegion: 'abdomen', suggestedFollowUps: ['abdominal-pain', 'diarrhea'], isRedFlag: true },
  { id: 'black-stool', name: 'Black Stool', bodyRegion: 'abdomen', suggestedFollowUps: ['abdominal-pain', 'fatigue'], isRedFlag: true },
  { id: 'yellow-skin', name: 'Yellow Skin', bodyRegion: 'abdomen', suggestedFollowUps: ['abdominal-pain', 'fatigue'], isRedFlag: true },
  { id: 'abdominal-cramping', name: 'Abdominal Cramping', bodyRegion: 'abdomen', suggestedFollowUps: ['abdominal-pain', 'diarrhea'], isRedFlag: false },
  { id: 'gas', name: 'Excessive Gas', bodyRegion: 'abdomen', suggestedFollowUps: ['bloating', 'abdominal-pain'], isRedFlag: false },
  { id: 'stomach-gurgling', name: 'Stomach Gurgling', bodyRegion: 'abdomen', suggestedFollowUps: ['abdominal-pain', 'nausea'], isRedFlag: false },
  { id: 'food-intolerance', name: 'Food Intolerance', bodyRegion: 'abdomen', suggestedFollowUps: ['bloating', 'diarrhea'], isRedFlag: false },

  // Limbs Symptoms
  { id: 'joint-pain', name: 'Joint Pain', bodyRegion: 'limbs', suggestedFollowUps: ['muscle-pain', 'swelling'], isRedFlag: false },
  {
    id: 'muscle-pain',
    name: 'Muscle Pain',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['joint-pain', 'weakness'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'weakness',
    name: 'Weakness',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['muscle-pain', 'fatigue'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'numbness',
    name: 'Numbness',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['tingling', 'weakness'],
    isRedFlag: true
  } satisfies Symptom,
  {
    id: 'tingling',
    name: 'Tingling',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['numbness', 'pain'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'swelling-limbs',
    name: 'Swelling in Limbs',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['joint-pain', 'numbness'],
    isRedFlag: false
  } satisfies Symptom,

  // Skin Symptoms
  {
    id: 'rash',
    name: 'Rash',
    bodyRegion: 'skin',
    suggestedFollowUps: ['itching', 'skin-color-changes'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'itching',
    name: 'Itching',
    bodyRegion: 'skin',
    suggestedFollowUps: ['rash', 'skin-color-changes'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'skin-color-changes',
    name: 'Skin Color Changes',
    bodyRegion: 'skin',
    suggestedFollowUps: ['rash', 'itching'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'bruising',
    name: 'Bruising',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-color-changes', 'pain'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'skin-lesions',
    name: 'Skin Lesions',
    bodyRegion: 'skin',
    suggestedFollowUps: ['rash', 'itching'],
    isRedFlag: true
  } satisfies Symptom,
  {
    id: 'dry-skin',
    name: 'Dry Skin',
    bodyRegion: 'skin',
    suggestedFollowUps: ['itching', 'rash'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'excessive-sweating',
    name: 'Excessive Sweating',
    bodyRegion: 'skin',
    suggestedFollowUps: ['fever', 'fatigue'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'skin-burning',
    name: 'Skin Burning',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-pain', 'rash'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'skin-peeling',
    name: 'Skin Peeling',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-dryness', 'rash'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'skin-blisters',
    name: 'Skin Blisters',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-pain', 'rash'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'skin-scaling',
    name: 'Skin Scaling',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-dryness', 'itching'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'skin-warmth',
    name: 'Skin Warmth',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-redness', 'fever'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'skin-redness',
    name: 'Skin Redness',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-warmth', 'skin-pain'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'skin-nodules',
    name: 'Skin Nodules',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-lumps', 'skin-pain'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'skin-discoloration',
    name: 'Skin Discoloration',
    bodyRegion: 'skin',
    suggestedFollowUps: ['rash', 'skin-pain'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'skin-sores',
    name: 'Skin Sores',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-pain', 'rash'],
    isRedFlag: true
  } satisfies Symptom,
  {
    id: 'skin-infection',
    name: 'Skin Infection',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-pain', 'fever'],
    isRedFlag: true
  } satisfies Symptom,
  {
    id: 'excessive-bruising',
    name: 'Excessive Bruising',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-pain', 'easy-bleeding'],
    isRedFlag: true
  } satisfies Symptom,
  {
    id: 'skin-inflammation',
    name: 'Skin Inflammation',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-redness', 'skin-warmth'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'skin-itching',
    name: 'Skin Itching',
    bodyRegion: 'skin',
    suggestedFollowUps: ['rash', 'skin-dryness'],
    isRedFlag: false
  } satisfies Symptom,
  { id: 'skin-swelling', name: 'Skin Swelling', bodyRegion: 'skin', suggestedFollowUps: ['skin-pain', 'skin-redness'], isRedFlag: false },
  { id: 'skin-tenderness', name: 'Skin Tenderness', bodyRegion: 'skin', suggestedFollowUps: ['skin-pain', 'skin-swelling'], isRedFlag: false },

  // Genitourinary Symptoms
  { id: 'urinary-frequency', name: 'Frequent Urination', bodyRegion: 'genitals', suggestedFollowUps: ['urinary-urgency', 'painful-urination'], isRedFlag: false },
  { id: 'urinary-urgency', name: 'Urinary Urgency', bodyRegion: 'genitals', suggestedFollowUps: ['urinary-frequency', 'painful-urination'], isRedFlag: false },
  { id: 'painful-urination', name: 'Painful Urination', bodyRegion: 'genitals', suggestedFollowUps: ['urinary-frequency', 'blood-in-urine'], isRedFlag: false },
  { id: 'blood-in-urine', name: 'Blood in Urine', bodyRegion: 'genitals', suggestedFollowUps: ['painful-urination', 'flank-pain'], isRedFlag: true },
  { id: 'decreased-urine', name: 'Decreased Urine Output', bodyRegion: 'genitals', suggestedFollowUps: ['swelling-limbs', 'fatigue'], isRedFlag: true },
  { id: 'genital-pain', name: 'Genital Pain', bodyRegion: 'genitals', suggestedFollowUps: ['painful-urination', 'genital-itching'], isRedFlag: false },
  { id: 'genital-itching', name: 'Genital Itching', bodyRegion: 'genitals', suggestedFollowUps: ['genital-pain', 'genital-discharge'], isRedFlag: false },
  { id: 'genital-discharge', name: 'Genital Discharge', bodyRegion: 'genitals', suggestedFollowUps: ['genital-itching', 'painful-urination'], isRedFlag: false },
  { id: 'menstrual-changes', name: 'Menstrual Changes', bodyRegion: 'genitals', suggestedFollowUps: ['abdominal-pain', 'fatigue'], isRedFlag: false },
  { id: 'erectile-dysfunction', name: 'Erectile Dysfunction', bodyRegion: 'genitals', suggestedFollowUps: ['fatigue', 'decreased-libido'], isRedFlag: false },
  { id: 'testicular-pain', name: 'Testicular Pain', bodyRegion: 'genitals', suggestedFollowUps: ['genital-pain', 'swelling'], isRedFlag: true },
  { id: 'vaginal-bleeding', name: 'Abnormal Vaginal Bleeding', bodyRegion: 'genitals', suggestedFollowUps: ['menstrual-changes', 'abdominal-pain'], isRedFlag: true },
  { id: 'urinary-incontinence', name: 'Urinary Incontinence', bodyRegion: 'genitals', suggestedFollowUps: ['urinary-frequency', 'urinary-urgency'], isRedFlag: false },
  { id: 'nocturia', name: 'Night-time Urination', bodyRegion: 'genitals', suggestedFollowUps: ['urinary-frequency', 'excessive-thirst'], isRedFlag: false },
  { id: 'flank-pain', name: 'Flank Pain', bodyRegion: 'genitals', suggestedFollowUps: ['back-pain', 'painful-urination'], isRedFlag: false },
  { id: 'genital-sores', name: 'Genital Sores', bodyRegion: 'genitals', suggestedFollowUps: ['genital-pain', 'genital-itching'], isRedFlag: true },
  { id: 'genital-swelling', name: 'Genital Swelling', bodyRegion: 'genitals', suggestedFollowUps: ['genital-pain', 'genital-itching'], isRedFlag: false },
  { id: 'pelvic-pain', name: 'Pelvic Pain', bodyRegion: 'genitals', suggestedFollowUps: ['abdominal-pain', 'menstrual-changes'], isRedFlag: false },
  { id: 'decreased-libido', name: 'Decreased Libido', bodyRegion: 'genitals', suggestedFollowUps: ['fatigue', 'erectile-dysfunction'], isRedFlag: false },
  { id: 'urinary-retention', name: 'Urinary Retention', bodyRegion: 'genitals', suggestedFollowUps: ['decreased-urine', 'painful-urination'], isRedFlag: true },
  { id: 'urinary-frequency', name: 'Frequent Urination', bodyRegion: 'genitals', suggestedFollowUps: ['urinary-urgency', 'painful-urination'], isRedFlag: false },
  { id: 'urinary-urgency', name: 'Urinary Urgency', bodyRegion: 'genitals', suggestedFollowUps: ['urinary-frequency', 'painful-urination'], isRedFlag: false },
  { id: 'painful-urination', name: 'Painful Urination', bodyRegion: 'genitals', suggestedFollowUps: ['urinary-frequency', 'blood-in-urine'], isRedFlag: false },
  { id: 'blood-in-urine', name: 'Blood in Urine', bodyRegion: 'genitals', suggestedFollowUps: ['painful-urination', 'flank-pain'], isRedFlag: true },
  { id: 'decreased-urine', name: 'Decreased Urine Output', bodyRegion: 'genitals', suggestedFollowUps: ['swelling-limbs', 'fatigue'], isRedFlag: true },
  { id: 'genital-pain', name: 'Genital Pain', bodyRegion: 'genitals', suggestedFollowUps: ['painful-urination', 'genital-itching'], isRedFlag: false },
  { id: 'genital-itching', name: 'Genital Itching', bodyRegion: 'genitals', suggestedFollowUps: ['genital-pain', 'genital-discharge'], isRedFlag: false },
  { id: 'genital-discharge', name: 'Genital Discharge', bodyRegion: 'genitals', suggestedFollowUps: ['genital-itching', 'painful-urination'], isRedFlag: false },
  { id: 'menstrual-changes', name: 'Menstrual Changes', bodyRegion: 'genitals', suggestedFollowUps: ['abdominal-pain', 'fatigue'], isRedFlag: false },
  { id: 'erectile-dysfunction', name: 'Erectile Dysfunction', bodyRegion: 'genitals', suggestedFollowUps: ['fatigue', 'decreased-libido'], isRedFlag: false },
  { id: 'testicular-pain', name: 'Testicular Pain', bodyRegion: 'genitals', suggestedFollowUps: ['genital-pain', 'swelling'], isRedFlag: true },
  { id: 'vaginal-bleeding', name: 'Abnormal Vaginal Bleeding', bodyRegion: 'genitals', suggestedFollowUps: ['menstrual-changes', 'abdominal-pain'], isRedFlag: true },
  { id: 'urinary-incontinence', name: 'Urinary Incontinence', bodyRegion: 'genitals', suggestedFollowUps: ['urinary-frequency', 'urinary-urgency'], isRedFlag: false },
  { id: 'nocturia', name: 'Night-time Urination', bodyRegion: 'genitals', suggestedFollowUps: ['urinary-frequency', 'excessive-thirst'], isRedFlag: false },
  { id: 'flank-pain', name: 'Flank Pain', bodyRegion: 'genitals', suggestedFollowUps: ['back-pain', 'painful-urination'], isRedFlag: false },
  { id: 'genital-sores', name: 'Genital Sores', bodyRegion: 'genitals', suggestedFollowUps: ['genital-pain', 'genital-itching'], isRedFlag: true },

  // General Symptoms
  { id: 'fever', name: 'Fever', bodyRegion: 'general', suggestedFollowUps: ['chills', 'fatigue', 'body-aches'], isRedFlag: false },
  { id: 'chills', name: 'Chills', bodyRegion: 'general', suggestedFollowUps: ['fever', 'fatigue'], isRedFlag: false },
  { id: 'fatigue', name: 'Fatigue', bodyRegion: 'general', suggestedFollowUps: ['weakness', 'sleep-changes'], isRedFlag: false },
  { id: 'weakness', name: 'General Weakness', bodyRegion: 'general', suggestedFollowUps: ['fatigue', 'dizziness'], isRedFlag: false },
  { id: 'body-aches', name: 'Body Aches', bodyRegion: 'general', suggestedFollowUps: ['fatigue', 'fever'], isRedFlag: false },
  { id: 'night-sweats', name: 'Night Sweats', bodyRegion: 'general', suggestedFollowUps: ['fever', 'fatigue'], isRedFlag: true },
  { id: 'weight-loss', name: 'Unexplained Weight Loss', bodyRegion: 'general', suggestedFollowUps: ['fatigue', 'appetite-changes'], isRedFlag: true },
  { id: 'weight-gain', name: 'Unexplained Weight Gain', bodyRegion: 'general', suggestedFollowUps: ['fatigue', 'swelling'], isRedFlag: false },
  { id: 'appetite-changes', name: 'Appetite Changes', bodyRegion: 'general', suggestedFollowUps: ['weight-changes', 'nausea'], isRedFlag: false },
  { id: 'sleep-changes', name: 'Sleep Changes', bodyRegion: 'general', suggestedFollowUps: ['fatigue', 'mood-changes'], isRedFlag: false },
  { id: 'dizziness', name: 'Dizziness', bodyRegion: 'general', suggestedFollowUps: ['headache', 'fatigue'], isRedFlag: false },
  { id: 'mood-changes', name: 'Mood Changes', bodyRegion: 'general', suggestedFollowUps: ['sleep-changes', 'anxiety'], isRedFlag: false },
  { id: 'anxiety', name: 'Anxiety', bodyRegion: 'general', suggestedFollowUps: ['mood-changes', 'sleep-changes'], isRedFlag: false },
  { id: 'depression', name: 'Depression', bodyRegion: 'general', suggestedFollowUps: ['mood-changes', 'sleep-changes'], isRedFlag: false },
  { id: 'easy-bleeding', name: 'Easy Bleeding', bodyRegion: 'general', suggestedFollowUps: ['bruising', 'fatigue'], isRedFlag: true },
  { id: 'easy-bruising', name: 'Easy Bruising', bodyRegion: 'general', suggestedFollowUps: ['easy-bleeding', 'fatigue'], isRedFlag: false },
  { id: 'excessive-thirst', name: 'Excessive Thirst', bodyRegion: 'general', suggestedFollowUps: ['frequent-urination', 'dry-mouth'], isRedFlag: false },
  { id: 'excessive-hunger', name: 'Excessive Hunger', bodyRegion: 'general', suggestedFollowUps: ['weight-changes', 'fatigue'], isRedFlag: false },
  { id: 'malaise', name: 'General Malaise', bodyRegion: 'general', suggestedFollowUps: ['fatigue', 'body-aches'], isRedFlag: false },
  { id: 'cough', name: 'Cough', bodyRegion: 'chest-lungs', suggestedFollowUps: ['shortness-of-breath', 'chest-pain'], isRedFlag: false },
  { id: 'wheezing', name: 'Wheezing', bodyRegion: 'chest-lungs', suggestedFollowUps: ['shortness-of-breath', 'cough'], isRedFlag: false },
  { id: 'palpitations', name: 'Palpitations', bodyRegion: 'chest-lungs', suggestedFollowUps: ['chest-pain', 'dizziness'], isRedFlag: false },
  {
    id: 'joint-pain',
    name: 'Joint Pain',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['muscle-weakness', 'swelling', 'numbness'],
    isRedFlag: false
  },
  {
    id: 'muscle-weakness',
    name: 'Muscle Weakness',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['joint-pain', 'numbness', 'fatigue'],
    isRedFlag: false
  },
  {
    id: 'numbness',
    name: 'Numbness or Tingling',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['muscle-weakness', 'joint-pain'],
    isRedFlag: false
  },
  {
    id: 'leg-pain',
    name: 'Leg Pain',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['joint-pain', 'muscle-pain'],
    isRedFlag: false
  },
  {
    id: 'arm-pain',
    name: 'Arm Pain',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['joint-pain', 'muscle-pain'],
    isRedFlag: false
  },
  {
    id: 'leg-swelling',
    name: 'Leg Swelling',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['leg-pain', 'joint-swelling'],
    isRedFlag: false
  },
  {
    id: 'arm-swelling',
    name: 'Arm Swelling',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['arm-pain', 'joint-swelling'],
    isRedFlag: false
  },
  {
    id: 'cold-extremities',
    name: 'Cold Hands/Feet',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['numbness', 'tingling'],
    isRedFlag: false
  },
  {
    id: 'leg-cramps',
    name: 'Leg Cramps',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['leg-pain', 'muscle-pain'],
    isRedFlag: false
  },
  {
    id: 'muscle-weakness',
    name: 'Muscle Weakness',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['limb-weakness', 'fatigue'],
    isRedFlag: false
  },
  {
    id: 'muscle-spasms',
    name: 'Muscle Spasms',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['muscle-pain', 'leg-cramps'],
    isRedFlag: false
  },

  // Skin Symptoms
  {
    id: 'rash',
    name: 'Rash',
    bodyRegion: 'skin',
    suggestedFollowUps: ['itching', 'fever', 'swelling'],
    isRedFlag: false
  },
  {
    id: 'itching',
    name: 'Itching',
    bodyRegion: 'skin',
    suggestedFollowUps: ['rash', 'skin-color-changes'],
    isRedFlag: false
  },
  {
    id: 'skin-color-changes',
    name: 'Skin Color Changes',
    bodyRegion: 'skin',
    suggestedFollowUps: ['rash', 'itching'],
    isRedFlag: false
  },
  {
    id: 'skin-dryness',
    name: 'Skin Dryness',
    bodyRegion: 'skin',
    suggestedFollowUps: ['itching', 'skin-redness'],
    isRedFlag: false
  },
  {
    id: 'bruising',
    name: 'Easy Bruising',
    bodyRegion: 'skin',
    suggestedFollowUps: ['bleeding', 'skin-lesions'],
    isRedFlag: false
  },
  {
    id: 'bleeding',
    name: 'Easy Bleeding',
    bodyRegion: 'skin',
    suggestedFollowUps: ['bruising', 'skin-lesions'],
    isRedFlag: true
  },
  {
    id: 'skin-color-changes',
    name: 'Skin Color Changes',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-redness', 'jaundice'],
    isRedFlag: false
  },
  {
    id: 'skin-swelling',
    name: 'Skin Swelling',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-redness', 'skin-lesions'],
    isRedFlag: false
  },
  {
    id: 'hives',
    name: 'Hives',
    bodyRegion: 'skin',
    suggestedFollowUps: ['itching', 'skin-swelling'],
    isRedFlag: false
  },
  {
    id: 'skin-infection',
    name: 'Skin Infection',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-redness', 'skin-swelling'],
    isRedFlag: true
  },
  {
    id: 'skin-ulcers',
    name: 'Skin Ulcers',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-infection', 'skin-lesions'],
    isRedFlag: true
  },
  {
    id: 'excessive-sweating',
    name: 'Excessive Sweating',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-redness', 'fever'],
    isRedFlag: false
  },
  {
    id: 'hair-loss',
    name: 'Hair Loss',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-lesions', 'itching'],
    isRedFlag: false
  },
  {
    id: 'nail-changes',
    name: 'Nail Changes',
    bodyRegion: 'skin',
    suggestedFollowUps: ['skin-infection', 'skin-lesions'],
    isRedFlag: false
  } satisfies Symptom,

  // Limbs Symptoms
  {
    id: 'joint-pain',
    name: 'Joint Pain',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['muscle-weakness', 'swelling', 'numbness'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'muscle-weakness',
    name: 'Muscle Weakness',
    bodyRegion: 'limbs',
    suggestedFollowUps: ['joint-pain', 'numbness', 'fatigue'],
    isRedFlag: false
  } satisfies Symptom,

  // Skin Symptoms

  {
    id: 'rash',
    name: 'Rash',
    bodyRegion: 'skin',
    suggestedFollowUps: ['itching', 'fever', 'swelling'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'itching',
    name: 'Itching',
    bodyRegion: 'skin',
    suggestedFollowUps: ['rash', 'skin-color-changes'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'skin-color-changes',
    name: 'Skin Color Changes',
    bodyRegion: 'skin',
    suggestedFollowUps: ['rash', 'itching'],
    isRedFlag: false
  } satisfies Symptom,

  // General Symptoms
  {
    id: 'fever',
    name: 'Fever',
    bodyRegion: 'general',
    suggestedFollowUps: ['fatigue', 'body-aches', 'chills'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'fatigue',
    name: 'Fatigue',
    bodyRegion: 'general',
    suggestedFollowUps: ['fever', 'muscle-weakness', 'sleep-changes'],
    isRedFlag: false
  } satisfies Symptom,
  {
    id: 'weight-loss',
    name: 'Unexplained Weight Loss',
    bodyRegion: 'general',
    suggestedFollowUps: ['fatigue', 'appetite-changes'],
    isRedFlag: true
  } satisfies Symptom
];

export const diseases: Disease[] = [
  {
    id: 'migraine',
    name: 'Migraine',
    symptoms: ['headache', 'vision-changes', 'nausea'],
    bodyRegion: 'head-neck',
    severity: 'medium',
    description: 'A neurological condition that causes severe headaches, often with visual disturbances.'
  },
  {
    id: 'heart-attack',
    name: 'Heart Attack',
    symptoms: ['chest-pain', 'shortness-of-breath', 'sweating'],
    bodyRegion: 'chest-lungs',
    severity: 'high',
    description: 'A serious condition where blood flow to the heart is blocked.',
    redFlags: ['chest-pain', 'shortness-of-breath']
  },
  {
    id: 'gastritis',
    name: 'Gastritis',
    symptoms: ['abdominal-pain', 'nausea', 'vomiting'],
    bodyRegion: 'abdomen',
    severity: 'medium',
    description: 'Inflammation of the stomach lining causing pain and digestive issues.'
  }
];

export const riskFactors: RiskFactor[] = [
  {
    id: 'smoking',
    question: 'Do you smoke?',
    description: 'Current or past smoking history'
  },
  {
    id: 'diabetes',
    question: 'Do you have diabetes?',
    description: 'Diagnosed with Type 1 or Type 2 diabetes'
  },
  {
    id: 'hypertension',
    question: 'Do you have high blood pressure?',
    description: 'Diagnosed with hypertension'
  },
  {
    id: 'heart-disease',
    question: 'Do you have any heart conditions?',
    description: 'History of heart disease or related conditions'
  }
];

export const redFlagCombinations = [
  {
    symptoms: ['chest-pain', 'shortness-of-breath'],
    message: 'These symptoms may indicate a serious cardiac event. Seek immediate medical attention.'
  },

  {
    symptoms: ['vision-changes', 'severe-headache'],
    message: 'Sudden vision changes with severe headache may indicate a neurological emergency. Seek urgent care.'
  }
];
