import { 
  Heart, Brain, Apple, Dumbbell, Stethoscope, Baby, Pill, 
  Sun, Bug, Cigarette, Droplet, Eye, Bone, Thermometer, 
  Bed, Users, ShieldCheck, Syringe, Salad, Smile, 
  HeartPulse, Activity, Dna, Scale, Wind, Milk, 
  Tablets, Sunset, Shield, Flower2,
  Soup, Footprints, Microscope, Egg, Bandage, Waves,
  Zap, Leaf, Moon, Bath, Flame, Sandwich, Glasses,
  Umbrella, Coffee, Bike, Tent, Monitor, Shirt, Fish
} from 'lucide-react';

export const healthCategories = [
  "Cardiovascular",
  "Mental Health",
  "Nutrition",
  "Fitness",
  "Respiratory",
  "Maternal Health",
  "Medications",
  "Infectious Diseases",
  "Lifestyle",
  "Prevention"
] as const;

export type HealthCategory = typeof healthCategories[number];

export interface HealthResource {
  title: string;
  description: string;
  icon: any; // LucideIcon type
  slug: string;
  readTime: string;
  category: HealthCategory;
  content: string;
}

export const healthResources: HealthResource[] = [
  // Cardiovascular Resources
  {
    title: "Blood Pressure Management",
    description: "Understanding and managing blood pressure for heart health.",
    icon: HeartPulse,
    slug: "blood-pressure-management",
    readTime: "10 min",
    category: "Cardiovascular",
    content: `# Blood Pressure Management

## Understanding Blood Pressure
- Normal ranges
- Risk factors
- Monitoring techniques
- Lifestyle impact

## Management Strategies
1. Diet modifications
2. Exercise routines
3. Stress reduction
4. Medication compliance

## WHO Guidelines
- Regular monitoring
- Risk assessment
- Treatment options
- Emergency response
    `
  },
  {
    title: "Cholesterol Control",
    description: "Managing cholesterol levels for cardiovascular health.",
    icon: Activity,
    slug: "cholesterol-control",
    readTime: "8 min",
    category: "Cardiovascular",
    content: `# Cholesterol Control

## Types of Cholesterol
- HDL (good)
- LDL (bad)
- Triglycerides
- Total cholesterol

## Management
1. Dietary changes
2. Physical activity
3. Weight management
4. Medication options

## WHO Recommendations
- Screening frequency
- Risk factors
- Treatment guidelines
- Prevention strategies
    `
  },

  // Mental Health Resources
  {
    title: "Anxiety Management",
    description: "Techniques and strategies for managing anxiety.",
    icon: Brain,
    slug: "anxiety-management",
    readTime: "12 min",
    category: "Mental Health",
    content: `# Anxiety Management

## Understanding Anxiety
- Types of anxiety
- Common triggers
- Physical symptoms
- Emotional impact

## Coping Strategies
1. Breathing exercises
2. Mindfulness techniques
3. Progressive relaxation
4. Cognitive restructuring

## WHO Guidelines
- Assessment tools
- Treatment options
- Support resources
- Crisis management
    `
  },
  {
    title: "Depression Support",
    description: "Understanding and managing depression with professional guidance.",
    icon: Moon,
    slug: "depression-support",
    readTime: "15 min",
    category: "Mental Health",
    content: `# Depression Support

## Understanding Depression
- Signs and symptoms
- Risk factors
- Types of depression
- Impact on daily life

## Treatment Options
1. Professional help
2. Medication management
3. Therapy types
4. Lifestyle changes

## WHO Guidelines
- Screening tools
- Treatment protocols
- Support systems
- Prevention strategies
    `
  },

  // Nutrition Resources
  {
    title: "Balanced Diet Planning",
    description: "Creating nutritionally balanced meal plans for optimal health.",
    icon: Apple,
    slug: "balanced-diet-planning",
    readTime: "10 min",
    category: "Nutrition",
    content: `# Balanced Diet Planning

## Nutrition Basics
- Food groups
- Portion control
- Meal timing
- Nutrient balance

## Meal Planning
1. Weekly planning
2. Shopping lists
3. Prep techniques
4. Storage tips

## WHO Guidelines
- Dietary requirements
- Nutritional goals
- Special populations
- Food safety
    `
  },
  {
    title: "Healthy Cooking Methods",
    description: "Learn healthy cooking techniques for better nutrition.",
    icon: Flame,
    slug: "healthy-cooking-methods",
    readTime: "8 min",
    category: "Nutrition",
    content: `# Healthy Cooking Methods

## Cooking Techniques
- Steaming
- Grilling
- Baking
- Stir-frying

## Kitchen Tips
1. Equipment needs
2. Preparation methods
3. Temperature control
4. Food safety

## WHO Recommendations
- Best practices
- Nutrient preservation
- Safety guidelines
- Equipment use
    `
  },

  // Fitness Resources
  {
    title: "Home Workout Guide",
    description: "Effective exercises you can do at home without equipment.",
    icon: Dumbbell,
    slug: "home-workout-guide",
    readTime: "12 min",
    category: "Fitness",
    content: `# Home Workout Guide

## Exercise Types
- Bodyweight exercises
- Cardio routines
- Flexibility work
- Strength training

## Workout Plans
1. Beginner level
2. Intermediate level
3. Advanced level
4. Cool-down routines

## WHO Guidelines
- Safety precautions
- Progression tips
- Form guidance
- Injury prevention
    `
  },
  {
    title: "Cardio Training",
    description: "Cardiovascular exercise guidelines for better fitness.",
    icon: Activity,
    slug: "cardio-training",
    readTime: "10 min",
    category: "Fitness",
    content: `# Cardio Training

## Training Basics
- Types of cardio
- Intensity levels
- Duration guidelines
- Progress tracking

## Workout Plans
1. Walking program
2. Running basics
3. Cycling tips
4. Swimming guide

## WHO Recommendations
- Activity levels
- Safety guidelines
- Health benefits
- Risk management
    `
  },

  // Respiratory Resources
  {
    title: "Asthma Care Guide",
    description: "Managing asthma effectively with proper care and prevention.",
    icon: Wind,
    slug: "asthma-care-guide",
    readTime: "12 min",
    category: "Respiratory",
    content: `# Asthma Care Guide

## Understanding Asthma
- Triggers and symptoms
- Types of asthma
- Risk factors
- Early warning signs

## Management Plan
1. Medication use
2. Trigger avoidance
3. Action plans
4. Peak flow monitoring

## WHO Guidelines
- Treatment protocols
- Emergency response
- Prevention strategies
- Support resources
    `
  },
  {
    title: "Respiratory Infections",
    description: "Prevention and management of common respiratory infections.",
    icon: Shield,
    slug: "respiratory-infections",
    readTime: "10 min",
    category: "Respiratory",
    content: `# Respiratory Infections

## Common Infections
- Upper respiratory
- Lower respiratory
- Viral vs bacterial
- Risk factors

## Prevention
1. Hygiene practices
2. Vaccination
3. Lifestyle factors
4. Environmental control

## WHO Guidelines
- Treatment options
- Prevention measures
- Risk assessment
- When to seek help
    `
  },

  // Maternal Health Resources
  {
    title: "Prenatal Care Basics",
    description: "Essential information for a healthy pregnancy.",
    icon: Baby,
    slug: "prenatal-care-basics",
    readTime: "15 min",
    category: "Maternal Health",
    content: `# Prenatal Care Basics

## Pregnancy Care
- Regular check-ups
- Nutrition needs
- Exercise guidelines
- Warning signs

## Trimester Guide
1. First trimester
2. Second trimester
3. Third trimester
4. Labor preparation

## WHO Guidelines
- Care standards
- Risk assessment
- Screening tests
- Emergency signs
    `
  },
  {
    title: "Postpartum Recovery",
    description: "Guide to recovery and care after childbirth.",
    icon: Heart,
    slug: "postpartum-recovery",
    readTime: "12 min",
    category: "Maternal Health",
    content: `# Postpartum Recovery

## Recovery Basics
- Physical healing
- Emotional changes
- Baby care
- Self-care

## Support Systems
1. Medical follow-up
2. Mental health
3. Family support
4. Resources

## WHO Guidelines
- Recovery timeline
- Warning signs
- Support services
- Mental health
    `
  },

  // Infectious Diseases Resources
  {
    title: "Infection Prevention",
    description: "Essential guidelines for preventing infectious diseases.",
    icon: Shield,
    slug: "infection-prevention",
    readTime: "10 min",
    category: "Infectious Diseases",
    content: `# Infection Prevention

## Basic Prevention
- Hand hygiene
- Vaccination
- Food safety
- Water safety

## Risk Management
1. Travel precautions
2. Workplace safety
3. Home hygiene
4. Personal protection

## WHO Guidelines
- Prevention protocols
- Risk assessment
- Global standards
- Emergency response
    `
  },
  {
    title: "Pandemic Preparedness",
    description: "How to prepare for and respond to disease outbreaks.",
    icon: Bug,
    slug: "pandemic-preparedness",
    readTime: "15 min",
    category: "Infectious Diseases",
    content: `# Pandemic Preparedness

## Understanding Pandemics
- Definition
- Historical context
- Risk factors
- Impact assessment

## Preparation Steps
1. Emergency supplies
2. Communication plan
3. Health measures
4. Support network

## WHO Guidelines
- Response phases
- Safety measures
- Community action
- Resource management
    `
  },

  // Lifestyle Resources
  {
    title: "Work-Life Balance",
    description: "Maintaining a healthy balance between work and personal life.",
    icon: Sun,
    slug: "work-life-balance",
    readTime: "10 min",
    category: "Lifestyle",
    content: `# Work-Life Balance

## Understanding Balance
- Time management
- Stress factors
- Priority setting
- Boundary setting

## Improvement Steps
1. Schedule planning
2. Stress management
3. Health routines
4. Social connections

## WHO Guidelines
- Mental health
- Physical health
- Social well-being
- Workplace health
    `
  },
  {
    title: "Digital Wellness",
    description: "Managing technology use for better health and well-being.",
    icon: Monitor,
    slug: "digital-wellness",
    readTime: "8 min",
    category: "Lifestyle",
    content: `# Digital Wellness

## Screen Time
- Usage patterns
- Health impacts
- Eye health
- Posture care

## Healthy Habits
1. Screen breaks
2. Ergonomics
3. Sleep hygiene
4. Digital boundaries

## WHO Guidelines
- Usage limits
- Health protection
- Risk management
- Best practices
    `
  },

  // Prevention Resources
  {
    title: "Cancer Screening",
    description: "Understanding important cancer screening guidelines and schedules.",
    icon: Microscope,
    slug: "cancer-screening",
    readTime: "12 min",
    category: "Prevention",
    content: `# Cancer Screening

## Screening Types
- Breast cancer
- Colorectal cancer
- Cervical cancer
- Prostate cancer

## Guidelines
1. Age recommendations
2. Frequency
3. Risk factors
4. Early signs

## WHO Guidelines
- Screening programs
- Risk assessment
- Follow-up care
- Support services
    `
  },
  {
    title: "Preventive Health Checks",
    description: "Regular health screenings and check-ups for disease prevention.",
    icon: ShieldCheck,
    slug: "preventive-health-checks",
    readTime: "10 min",
    category: "Prevention",
    content: `# Preventive Health Checks

## Regular Screenings
- Blood pressure
- Cholesterol
- Blood sugar
- BMI

## Check-up Schedule
1. Annual physicals
2. Age-based tests
3. Risk assessments
4. Vaccinations

## WHO Guidelines
- Screening intervals
- Priority tests
- Age guidelines
- Risk factors
    `
  },

  // Medication Resources
  {
    title: "Medication Safety",
    description: "Guidelines for safe medication use and storage.",
    icon: Pill,
    slug: "medication-safety",
    readTime: "10 min",
    category: "Medications",
    content: `# Medication Safety

## Safe Use
- Prescription guidelines
- Storage requirements
- Common interactions
- Side effects

## Special Considerations
1. Elderly patients
2. Children
3. Pregnancy
4. Chronic conditions

## WHO Guidelines
- Safety standards
- Documentation
- Emergency contacts
- Disposal methods
    `
  },
  {
    title: "Antibiotic Awareness",
    description: "Understanding proper antibiotic use and resistance prevention.",
    icon: Bug,
    slug: "antibiotic-awareness",
    readTime: "8 min",
    category: "Medications",
    content: `# Antibiotic Awareness

## Proper Use
- When needed
- Course completion
- Resistance risks
- Side effects

## Guidelines
1. Prescription only
2. Full course
3. Storage
4. Disposal

## WHO Guidelines
- Resistance prevention
- Usage protocols
- Global impact
- Future concerns
    `
  },
  {
    title: "Heart Health Essentials",
    description: "Learn about cardiovascular health, risk factors, and prevention strategies recommended by WHO.",
    icon: Heart,
    slug: "heart-health-essentials",
    readTime: "8 min",
    category: "Cardiovascular",
    content: `
# Heart Health Essentials

## Understanding Cardiovascular Health

Cardiovascular diseases (CVDs) are the leading cause of death globally. However, most cardiovascular diseases can be prevented by addressing behavioral risk factors.

### Key Risk Factors

- High blood pressure
- High cholesterol
- Tobacco use
- Unhealthy diet
- Physical inactivity
- Harmful use of alcohol

### Prevention Strategies

1. **Regular Physical Activity**
   - At least 150 minutes of moderate aerobic activity per week
   - Or 75 minutes of vigorous aerobic activity
   - Include strength training exercises

2. **Healthy Diet**
   - Plenty of fruits and vegetables
   - Whole grains
   - Lean proteins
   - Limited salt, sugar, and unhealthy fats

3. **Regular Health Checks**
   - Blood pressure monitoring
   - Cholesterol screening
   - Blood sugar testing

### Warning Signs

Seek immediate medical attention if you experience:
- Chest pain or discomfort
- Shortness of breath
- Pain in arms, back, neck, or jaw
- Irregular heartbeat
- Extreme fatigue

## WHO Recommendations

The World Health Organization recommends:
1. Regular health screenings
2. Maintaining a healthy weight
3. Quitting smoking
4. Limiting alcohol consumption
5. Managing stress effectively

Remember: Prevention is better than cure. Start taking care of your heart health today.
    `
  },
  {
    title: "Mental Wellness Guide",
    description: "Expert guidance on maintaining mental health, managing stress, and building resilience.",
    icon: Brain,
    slug: "mental-wellness-guide",
    readTime: "10 min",
    category: "Mental Health",
    content: `
# Mental Wellness Guide

## Understanding Mental Health

Mental health is a crucial part of overall well-being, affecting how we think, feel, and act. It also influences how we handle stress, relate to others, and make choices.

### Common Mental Health Challenges

1. **Stress**
   - Work-related pressure
   - Financial concerns
   - Relationship issues
   - Health worries

2. **Anxiety**
   - Excessive worry
   - Physical symptoms
   - Social anxiety
   - Panic attacks

3. **Depression**
   - Persistent sadness
   - Loss of interest
   - Sleep changes
   - Energy levels

### Building Resilience

1. **Self-Care Practices**
   - Regular exercise
   - Adequate sleep
   - Healthy diet
   - Mindfulness and meditation

2. **Social Connections**
   - Maintain relationships
   - Join support groups
   - Share feelings
   - Ask for help when needed

### WHO Recommendations

The World Health Organization emphasizes:
1. Early intervention
2. Regular mental health check-ups
3. Work-life balance
4. Stress management
5. Professional support when needed

## Warning Signs

Seek professional help if you experience:
- Persistent sadness
- Excessive fears or worries
- Extreme mood changes
- Social withdrawal
- Major changes in eating or sleeping habits

Remember: Mental health is as important as physical health. Don't hesitate to seek support.
    `
  },
  {
    title: "Nutrition & Diet Basics",
    description: "Essential information about balanced nutrition, healthy eating habits, and dietary guidelines.",
    icon: Apple,
    slug: "nutrition-diet-basics",
    readTime: "12 min",
    category: "Nutrition",
    content: `
# Nutrition & Diet Basics

## Understanding Balanced Nutrition

A balanced diet provides your body with the nutrients it needs to function properly. The WHO emphasizes the importance of maintaining a healthy diet to prevent various diseases.

### Essential Nutrients

1. **Macronutrients**
   - Proteins
   - Carbohydrates
   - Healthy fats

2. **Micronutrients**
   - Vitamins
   - Minerals
   - Antioxidants

### Healthy Eating Guidelines

1. **Daily Recommendations**
   - 5+ servings of fruits and vegetables
   - Whole grains
   - Lean proteins
   - Limited processed foods

2. **Portion Control**
   - Understanding serving sizes
   - Mindful eating
   - Regular meal timing

### WHO Dietary Guidelines

1. **Eat More**
   - Fresh fruits and vegetables
   - Legumes
   - Nuts and seeds
   - Whole grains

2. **Limit Intake**
   - Salt
   - Sugar
   - Saturated fats
   - Processed foods

## Special Considerations

1. **Dietary Requirements**
   - Age groups
   - Activity levels
   - Health conditions
   - Pregnancy

2. **Hydration**
   - Water intake
   - Natural beverages
   - Limited sugary drinks

Remember: Good nutrition is the foundation of good health. Start making healthy choices today.
    `
  },
  {
    title: "Physical Activity Guide",
    description: "WHO recommendations for physical activity, exercise tips, and fitness guidelines for all ages.",
    icon: Dumbbell,
    slug: "physical-activity-guide",
    readTime: "9 min",
    category: "Fitness",
    content: `
# Physical Activity Guide

## WHO Physical Activity Recommendations

Regular physical activity is crucial for health and well-being. The World Health Organization provides specific guidelines for different age groups.

### Adults (18-64 years)

1. **Weekly Requirements**
   - 150-300 minutes moderate activity
   - Or 75-150 minutes vigorous activity
   - Muscle strengthening activities

2. **Types of Activities**
   - Aerobic exercises
   - Strength training
   - Flexibility work
   - Balance exercises

### Benefits of Regular Exercise

1. **Physical Health**
   - Weight management
   - Stronger muscles and bones
   - Better cardiovascular health
   - Improved immunity

2. **Mental Health**
   - Reduced stress
   - Better sleep
   - Improved mood
   - Enhanced cognitive function

### Getting Started

1. **Basic Guidelines**
   - Start slowly
   - Progress gradually
   - Listen to your body
   - Stay consistent

2. **Safety Tips**
   - Proper warm-up
   - Correct form
   - Adequate rest
   - Hydration

Remember: Any physical activity is better than none. Find activities you enjoy and make them part of your routine.
    `
  },
  {
    title: "Respiratory Health Guide",
    description: "Understanding respiratory health, common conditions, and prevention strategies.",
    icon: Stethoscope,
    slug: "respiratory-health-guide",
    readTime: "10 min",
    category: "Respiratory",
    content: `# Respiratory Health Guide

## Understanding Respiratory Health

Respiratory health is crucial for overall well-being. The WHO emphasizes the importance of maintaining good respiratory health through prevention and proper management of conditions.

### Common Respiratory Conditions

1. **Asthma**
   - Triggers and management
   - Action plans
   - Medications

2. **COPD**
   - Risk factors
   - Prevention
   - Treatment options

### Prevention Strategies

1. **Avoid Tobacco Smoke**
   - Quit smoking
   - Avoid secondhand smoke
   - Workplace safety

2. **Air Quality**
   - Indoor air quality
   - Outdoor pollution
   - Ventilation

## WHO Recommendations

1. Regular check-ups
2. Vaccination
3. Environmental measures
4. Occupational safety

Remember: Early detection and proper management are key to respiratory health.`
  },
  {
    title: "Maternal and Child Health",
    description: "Essential information for maternal health, pregnancy, and childcare.",
    icon: Baby,
    slug: "maternal-child-health",
    readTime: "15 min",
    category: "Maternal Health",
    content: `# Maternal and Child Health

## Pregnancy Care

### Prenatal Care
1. Regular check-ups
2. Nutrition during pregnancy
3. Exercise guidelines
4. Risk factors

### Labor and Delivery
1. Birth preparedness
2. Warning signs
3. Emergency planning

## Child Health

### Newborn Care
1. Breastfeeding
2. Immunization schedule
3. Growth monitoring

### Early Development
1. Milestones
2. Nutrition needs
3. Common health issues

## WHO Guidelines

1. Essential care during pregnancy
2. Safe childbirth practices
3. Newborn care standards
4. Child development monitoring

Remember: Regular prenatal care is crucial for both mother and child health.`
  },
  {
    title: "Medication Safety Guide",
    description: "Guidelines for safe medication use, storage, and common interactions.",
    icon: Pill,
    slug: "medication-safety-guide",
    readTime: "8 min",
    category: "Medications",
    content: `# Medication Safety Guide

## Safe Medication Use

### General Guidelines
1. Following prescriptions
2. Storage requirements
3. Common interactions
4. Side effects

### Special Considerations
1. Elderly patients
2. Children
3. Chronic conditions
4. Multiple medications

## WHO Recommendations

1. Proper medication storage
2. Regular review of medications
3. Documentation
4. Emergency contacts

Remember: Always consult healthcare providers about medication changes.`
  },
  {
    title: "Infectious Disease Prevention",
    description: "Essential information about preventing and managing infectious diseases.",
    icon: Bug,
    slug: "infectious-disease-prevention",
    readTime: "12 min",
    category: "Infectious Diseases",
    content: `# Infectious Disease Prevention

## Understanding Transmission

### Common Routes
1. Airborne
2. Contact
3. Foodborne
4. Waterborne

### Prevention Strategies
1. Hand hygiene
2. Vaccination
3. Food safety
4. Water safety

## WHO Guidelines

1. Regular vaccination
2. Hygiene practices
3. Environmental measures
4. Travel precautions

Remember: Prevention is better than cure in infectious diseases.`
  },
  {
    title: "Tobacco Cessation Guide",
    description: "Comprehensive guide to quit smoking and maintain a tobacco-free life.",
    icon: Cigarette,
    slug: "tobacco-cessation-guide",
    readTime: "10 min",
    category: "Lifestyle",
    content: `# Tobacco Cessation Guide

## Quitting Smoking

### Preparation
1. Understanding addiction
2. Setting quit date
3. Support systems
4. Replacement therapy

### Coping Strategies
1. Managing cravings
2. Stress management
3. Lifestyle changes
4. Avoiding triggers

## WHO Recommendations

1. Cessation methods
2. Support resources
3. Health benefits
4. Long-term strategies

Remember: It's never too late to quit smoking.`
  },
  {
    title: "Diabetes Management",
    description: "Comprehensive guide for understanding and managing diabetes.",
    icon: Droplet,
    slug: "diabetes-management",
    readTime: "15 min",
    category: "Prevention",
    content: `# Diabetes Management

## Understanding Diabetes

### Types and Causes
1. Type 1 diabetes
2. Type 2 diabetes
3. Gestational diabetes
4. Risk factors

### Management Strategies
1. Blood sugar monitoring
2. Medication adherence
3. Diet planning
4. Exercise routine

## WHO Guidelines

1. Regular screening
2. Lifestyle modifications
3. Complication prevention
4. Support systems

Remember: Proper management can prevent complications.`
  },
  {
    title: "Eye Health Care",
    description: "Guidelines for maintaining good eye health and preventing vision problems.",
    icon: Eye,
    slug: "eye-health-care",
    readTime: "8 min",
    category: "Prevention",
    content: `# Eye Health Care

## Vision Care

### Prevention
1. Regular check-ups
2. Digital eye strain
3. UV protection
4. Nutrition for eyes

### Common Issues
1. Refractive errors
2. Age-related changes
3. Eye infections
4. Warning signs

## WHO Recommendations

1. Screening schedule
2. Protective measures
3. Workplace safety
4. Emergency care

Remember: Regular eye exams are crucial for vision health.`
  },
  {
    title: "Bone and Joint Health",
    description: "Essential information about maintaining strong bones and healthy joints.",
    icon: Bone,
    slug: "bone-joint-health",
    readTime: "10 min",
    category: "Prevention",
    content: `# Bone and Joint Health

## Maintaining Strong Bones

### Prevention
1. Calcium intake
2. Vitamin D
3. Exercise
4. Fall prevention

### Risk Factors
1. Age-related changes
2. Lifestyle factors
3. Medical conditions
4. Medications

## WHO Guidelines

1. Nutrition recommendations
2. Physical activity
3. Screening tests
4. Treatment options

Remember: Prevention starts early in life.`
  },
  {
    title: "Fever Management",
    description: "Guide to understanding and managing fever in different age groups.",
    icon: Thermometer,
    slug: "fever-management",
    readTime: "8 min",
    category: "Prevention",
    content: `# Fever Management

## Understanding Fever

### Assessment
1. Temperature measurement
2. Associated symptoms
3. Red flags
4. When to seek help

### Management
1. Home care
2. Medications
3. Hydration
4. Monitoring

## WHO Guidelines

1. Temperature ranges
2. Treatment options
3. Warning signs
4. Emergency care

Remember: Not all fevers need medication.`
  },
  {
    title: "Sleep Hygiene Guide",
    description: "Tips and strategies for better sleep quality and habits.",
    icon: Bed,
    slug: "sleep-hygiene-guide",
    readTime: "10 min",
    category: "Lifestyle",
    content: `# Sleep Hygiene Guide

## Better Sleep Habits

### Sleep Environment
1. Room temperature
2. Lighting
3. Noise control
4. Bedding comfort

### Healthy Habits
1. Sleep schedule
2. Pre-sleep routine
3. Diet considerations
4. Exercise timing

## WHO Recommendations

1. Sleep duration
2. Quality measures
3. Problem solutions
4. When to seek help

Remember: Good sleep is essential for health.`
  },
  {
    title: "Social Health and Relationships",
    description: "Understanding the importance of social connections for health.",
    icon: Users,
    slug: "social-health-relationships",
    readTime: "12 min",
    category: "Mental Health",
    content: `# Social Health and Relationships

## Social Connections

### Benefits
1. Mental well-being
2. Physical health
3. Longevity
4. Support systems

### Building Relationships
1. Communication skills
2. Healthy boundaries
3. Conflict resolution
4. Community engagement

## WHO Guidelines

1. Social support
2. Community programs
3. Mental health
4. Crisis resources

Remember: Strong social connections improve health.`
  },
  {
    title: "Immunization Guide",
    description: "Comprehensive information about vaccines and immunization schedules.",
    icon: ShieldCheck,
    slug: "immunization-guide",
    readTime: "15 min",
    category: "Prevention",
    content: `# Immunization Guide

## Vaccination Basics

### Schedules
1. Childhood vaccines
2. Adult vaccines
3. Travel vaccines
4. Special conditions

### Important Facts
1. How vaccines work
2. Safety measures
3. Side effects
4. Myths and facts

## WHO Recommendations

1. Required vaccines
2. Optional vaccines
3. Documentation
4. Travel requirements

Remember: Vaccines save lives.`
  },
  {
    title: "Allergy Management",
    description: "Guide to understanding, preventing, and managing allergies.",
    icon: Syringe,
    slug: "allergy-management",
    readTime: "10 min",
    category: "Prevention",
    content: `# Allergy Management

## Understanding Allergies

### Common Allergens
1. Food allergens
2. Environmental triggers
3. Seasonal allergies
4. Contact allergies

### Management
1. Avoidance strategies
2. Medication options
3. Emergency plans
4. Lifestyle changes

## WHO Guidelines

1. Diagnosis methods
2. Treatment options
3. Prevention strategies
4. Emergency care

Remember: Know your triggers and be prepared.`
  },
  {
    title: "Food Safety Guidelines",
    description: "Essential information about food safety and preventing foodborne illness.",
    icon: Salad,
    slug: "food-safety-guidelines",
    readTime: "8 min",
    category: "Prevention",
    content: `# Food Safety Guidelines

## Safe Food Handling

### Storage
1. Temperature control
2. Storage methods
3. Cross-contamination
4. Expiration dates

### Preparation
1. Cleaning practices
2. Cooking temperatures
3. Food handling
4. Kitchen hygiene

## WHO Recommendations

1. Five keys to safety
2. Risk prevention
3. Emergency response
4. Special populations

Remember: Clean, separate, cook, and chill.`
  },
  {
    title: "Stress Management",
    description: "Effective strategies for managing stress and promoting mental well-being.",
    icon: Smile,
    slug: "stress-management",
    readTime: "12 min",
    category: "Mental Health",
    content: `# Stress Management

## Understanding Stress

### Types of Stress
1. Acute stress
2. Chronic stress
3. Work-related stress
4. Life changes

### Management Techniques
1. Relaxation methods
2. Time management
3. Exercise
4. Support systems

## WHO Guidelines

1. Stress reduction
2. Mental health
3. Work-life balance
4. Professional help

Remember: Stress management is essential for health.`
  }
];


