export type BodyRegion = 
  | 'head-neck'
  | 'chest-lungs'
  | 'abdomen'
  | 'limbs'
  | 'skin'
  | 'genitals'
  | 'general';

export type Severity = 'low' | 'medium' | 'high';

export type Gender = 'male' | 'female' | 'other';

export type SymptomDuration = 
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years';

export type RiskFactor = {
  id: string;
  question: string;
  description?: string;
};

export type Symptom = {
  id: string;
  name: string;
  bodyRegion: BodyRegion;
  suggestedFollowUps: string[];
  isRedFlag?: boolean;
  duration?: SymptomDuration;
};

export type Disease = {
  id: string;
  name: string;
  symptoms: string[];
  bodyRegion: BodyRegion;
  severity: Severity;
  description?: string;
  redFlags?: string[];
};

export type DiagnosisResult = {
  disease: Disease;
  confidence: number; // 0-100
  matchedSymptoms: string[];
  severity: Severity;
  requiresUrgentCare: boolean;
};

export type PatientInfo = {
  age: number;
  gender: Gender;
  symptoms: Symptom[];
  riskFactors: string[];
  bodyRegions: BodyRegion[];
};

export type Language = 'en' | 'ta';
