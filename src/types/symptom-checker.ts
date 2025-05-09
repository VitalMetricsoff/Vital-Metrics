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
  | 'minutes'
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

export type AdditionalResource = {
  name: string;
  url: string;
  type: 'organization' | 'research' | 'education';
};

export type RiskAssessment = {
  highRisk: string[];
  moderateRisk: string[];
};

export type Disease = {
  id: string;
  name: string;
  symptoms: string[];
  bodyRegion: BodyRegion;
  severity: Severity;
  description?: string;
  redFlags?: string[];
  commonDurations?: SymptomDuration[];
  riskFactors?: string[];
  treatment?: string;
  whenToSeekCare?: string;
  preventiveMeasures?: string[];
  commonTriggers?: string[];
  additionalResources?: AdditionalResource[];
  riskAssessment?: RiskAssessment;
  emergencySteps?: string[];
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
