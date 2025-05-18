export const generateSymptomCheckerSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Vital Metrics Symptom Checker',
  description: 'Free online symptom checker with AI-powered medical assessment. Get instant health insights and find nearby healthcare providers.',
  about: {
    '@type': 'MedicalWebPage',
    name: 'Online Symptom Assessment',
    description: 'Professional medical symptom checker that helps identify potential health conditions based on reported symptoms.'
  },
  specialty: 'Medical Diagnostics',
  audience: {
    '@type': 'Audience',
    audienceType: 'General Public'
  },
  provider: {
    '@type': 'Organization',
    name: 'Vital Metrics',
    url: 'https://vitalmetrics.in'
  },
  mainEntity: {
    '@type': 'WebApplication',
    applicationCategory: 'HealthApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      'AI-powered symptom analysis',
      'Multiple symptom selection',
      'Duration tracking',
      'Severity assessment',
      'Nearby hospital finder',
      'PDF report generation'
    ]
  }
});
