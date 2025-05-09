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
  category: HealthCategory;
  pages: string[];
}

export const healthResources: HealthResource[] = [
  // Cardiovascular Resources
  {
    title: "Blood Pressure Management",
    description: "Understanding and managing blood pressure for heart health.",
    icon: HeartPulse,
    slug: "blood-pressure-management",

    category: "Cardiovascular",
    pages: [`# Blood Pressure Management

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
    `,
    ],
  },
  {
    title: "Cholesterol Control",
    description: "Managing cholesterol levels for cardiovascular health.",
    icon: Activity,
    slug: "cholesterol-control",

    category: "Cardiovascular",
    pages: [
      `# Cholesterol Control

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
    `,
    ],
  },

  // Mental Health Resources
  {
    title: "Anxiety Management",
    description: "Techniques and strategies for managing anxiety.",
    icon: Brain,
    slug: "anxiety-management",

    category: "Mental Health",
    pages: [`# Anxiety Management

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
    `,
    ],
  },
  {
    title: "Depression Support",
    description: "Understanding and managing depression with professional guidance.",
    icon: Moon,
    slug: "depression-support",
    category: "Mental Health",
    pages: [
      `# Depression Support

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
    `,
    ],
  },

  // Nutrition Resources
  {
    title: "Balanced Diet Planning",
    description: "Creating nutritionally balanced meal plans for optimal health.",
    icon: Apple,
    slug: "balanced-diet-planning",
    category: "Nutrition",
    pages: [
      `# Balanced Diet Planning

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
    `,
    ],
  },
  {
    title: "Healthy Cooking Methods",
    description: "Learn healthy cooking techniques for better nutrition.",
    icon: Flame,
    slug: "healthy-cooking-methods",
    category: "Nutrition",
    pages: [
      `# Healthy Cooking Methods

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
    `,
    ],
  },

  // Fitness Resources
  {
    title: "Home Workout Guide",
    description: "Effective exercises you can do at home without equipment.",
    icon: Dumbbell,
    slug: "home-workout-guide",
    category: "Fitness",
    pages: [
      `# Home Workout Guide

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
    `,
    ],
  },
  {
    title: "Cardio Training",
    description: "Cardiovascular exercise guidelines for better fitness.",
    icon: Activity,
    slug: "cardio-training",
    category: "Fitness",
    pages: [
      `# Cardio Training

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
    `,
    ],
  },

  // Respiratory Resources
  {
    title: "Asthma Care Guide",
    description: "Managing asthma effectively with proper care and prevention.",
    icon: Wind,
    slug: "asthma-care-guide",
    category: "Respiratory",
    pages: [
      `# Asthma Care Guide

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
    `,
    ],
  },
  {
    title: "Respiratory Infections",
    description: "Prevention and management of common respiratory infections.",
    icon: Shield,
    slug: "respiratory-infections",
    category: "Respiratory",
    pages: [
      `# Respiratory Infections

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
    `,
    ],
  },

  // Maternal Health Resources
  {
    title: "Prenatal Care Basics",
    description: "Essential information for a healthy pregnancy.",
    icon: Baby,
    slug: "prenatal-care-basics",
    category: "Maternal Health",
    pages: [
      `# Prenatal Care Basics

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
    `,
    ],
  },
  {
    title: "Postpartum Recovery",
    description: "Guide to recovery and care after childbirth.",
    icon: Heart,
    slug: "postpartum-recovery",
    category: "Maternal Health",
    pages: [
      `# Postpartum Recovery

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
    `,
    ],
  },

  // Infectious Diseases Resources
  {
    title: "Infection Prevention",
    description: "Essential guidelines for preventing infectious diseases.",
    icon: Shield,
    slug: "infection-prevention",
    category: "Infectious Diseases",
    pages: [
      `# Infection Prevention

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
    `,
    ],
  },
  {
    title: "Pandemic Preparedness",
    description: "How to prepare for and respond to disease outbreaks.",
    icon: Bug,
    slug: "pandemic-preparedness",
    category: "Infectious Diseases",
    pages: [
      `# Pandemic Preparedness

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
    `,
    ],
  },

  // Lifestyle Resources
  {
    title: "Work-Life Balance",
    description: "Maintaining a healthy balance between work and personal life.",
    icon: Sun,
    slug: "work-life-balance",
    category: "Lifestyle",
    pages: [
      `# Work-Life Balance

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
    `,
    ],
  },
  {
    title: "Digital Wellness",
    description: "Managing technology use for better health and well-being.",
    icon: Monitor,
    slug: "digital-wellness",
    category: "Lifestyle",
    pages: [
      `# Digital Wellness

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
    `,
    ],
  },

  // Prevention Resources
  {
    title: "Cancer Screening",
    description: "Understanding important cancer screening guidelines and schedules.",
    icon: Microscope,
    slug: "cancer-screening",
    category: "Prevention",
    pages: [
      `# Cancer Screening

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
    `,
    ],
  },
  {
    title: "Preventive Health Checks",
    description: "Regular health screenings and check-ups for disease prevention.",
    icon: ShieldCheck,
    slug: "preventive-health-checks",
    category: "Prevention",
    pages: [
      `# Preventive Health Checks

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
    `,
    ],
  },

  // Medication Resources
  {
    title: "Medication Safety",
    description: "Guidelines for safe medication use and storage.",
    icon: Pill,
    slug: "medication-safety",
    category: "Medications",
    pages: [
      `# Medication Safety

## Safe Use
- Prescription guidelines
- Storage requirements
- Common interactions
- Side effects

## Special Considerations
1. Elderly patients
2. Children
3. Chronic conditions
4. Multiple medications

## WHO Guidelines
- Safety standards
- Documentation
- Emergency contacts
- Disposal methods
    `,
    ],
  },
  {
    title: "Antibiotic Awareness",
    description: "Understanding proper antibiotic use and resistance prevention.",
    icon: Bug,
    slug: "antibiotic-awareness",
    category: "Medications",
    pages: [
      `# Antibiotic Awareness

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
    `,
    ],
  },
  {
    title: "Heart Health Essentials",
    description: "Learn about cardiovascular health, risk factors, and prevention strategies recommended by WHO.",
    icon: Heart,
    slug: "heart-health-essentials",
    category: "Cardiovascular",
    pages: [
      `# Heart Health Essentials

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
    `,
    ],
  },
  {
    title: "Mental Wellness Guide",
    description: "Expert guidance on maintaining mental health, managing stress, and building resilience.",
    icon: Brain,
    slug: "mental-wellness-guide",
    category: "Mental Health",
    pages: [
      `# Mental Wellness Guide

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
    `,
    `# Real-World Examples and Coping Strategies

## Case Study 1: Anxiety Management
Alex's Story:

1. Initial Challenges
   - Panic attacks
   - Work stress
   - Social anxiety

2. Treatment Approach
   - Therapy sessions
   - Mindfulness practice
   - Exercise routine

3. Outcomes
   - Reduced anxiety
   - Better coping
   - Improved relationships

## Case Study 2: Depression Recovery
Samantha's Journey:

1. Starting Point
   - Major depression
   - Isolation
   - Low motivation

2. Recovery Steps
   - Professional help
   - Support network
   - Daily structure

3. Progress
   - Mood improvement
   - Social reengagement
   - Work return

## Practical Strategies

1. Daily Routine
   - Morning ritual
   - Activity scheduling
   - Sleep hygiene

2. Coping Tools
   - Grounding techniques
   - Breathing exercises
   - Journaling

3. Support System
   - Professional help
   - Peer support
   - Family education

Remember: Recovery is possible with the right support.`
    ],
  },
  {
    title: "Nutrition & Diet Basics",
    description: "Essential information about balanced nutrition, healthy eating habits, and dietary guidelines.",
    icon: Apple,
    slug: "nutrition-diet-basics",
    category: "Nutrition",
    pages: [
      `# Nutrition & Diet Basics

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
    `,
    `# Case Studies and Practical Examples

## Case Study 1: Weight Loss Journey
Sarah's Story:

1. Initial Situation
   - Overweight
   - Unhealthy diet
   - Sedentary lifestyle

2. Changes Made
   - Balanced diet
   - Regular exercise
   - Portion control

3. Results
   - Significant weight loss
   - Improved overall health
   - Increased energy

## Case Study 2: Managing Chronic Conditions
Mark's Experience:

1. Background
   - Diabetes
   - High blood pressure
   - Unhealthy diet

2. Dietary Changes
   - Balanced meals
   - Limited sugar intake
   - Regular hydration

3. Outcomes
   - Improved blood sugar control
   - Normalized blood pressure
   - Better overall health

## Practical Tips

1. **Meal Planning**
   - Creating a meal schedule
   - Grocery shopping
   - Healthy cooking methods

2. **Snacking**
   - Healthy snack options
   - Portion control
   - Mindful eating

3. **Eating Out**
   - Healthy restaurant choices
   - Menu planning
   - Moderation

Remember: Small dietary changes lead to significant health improvements.`
    ],
  },
  {
    title: "Physical Activity Guide",
    description: "WHO recommendations for physical activity, exercise tips, and fitness guidelines for all ages.",
    icon: Dumbbell,
    slug: "physical-activity-guide",
    category: "Fitness",
    pages: [
      `# Physical Activity Guide

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
    `,
    `# Case Studies and Fitness Examples

## Case Study 1: Fitness Journey
John's Story:

1. Initial Situation
   - Sedentary lifestyle
   - Overweight
   - Low motivation

2. Changes Made
   - Regular exercise routine
   - Balanced diet
   - Progress tracking

3. Results
   - Significant weight loss
   - Improved overall health
   - Increased energy

## Case Study 2: Injury Recovery
Emily's Experience:

1. Background
   - Sports injury
   - Rehabilitation program
   - Modified exercises

2. Recovery Process
   - Physical therapy
   - Pain management
   - Gradual progression

3. Outcomes
   - Full recovery
   - Improved strength and flexibility
   - Return to sports

## Practical Tips

1. **Finding Motivation**
   - Setting goals
   - Finding a workout buddy
   - Tracking progress

2. **Creating a Routine**
   - Scheduling workouts
   - Variety in exercises
   - Rest and recovery

3. **Staying Safe**
   - Proper equipment
   - Warm-up and cool-down
   - Listening to your body

Remember: Consistency is key to fitness success.`
    ],
  },
  {
    title: "Respiratory Health Guide",
    description: "Understanding respiratory health, common conditions, and prevention strategies.",
    icon: Stethoscope,
    slug: "respiratory-health-guide",
    category: "Respiratory",
    pages: [
      `# Respiratory Health Guide

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

Remember: Early detection and proper management are key to respiratory health.
    `,
    `# Case Studies and Examples

## Case Study 1: Asthma Management
John, a 35-year-old office worker, struggled with asthma triggered by seasonal allergies. Here's how he managed his condition:

1. Identified triggers
   - Pollen
   - Dust
   - Cold air

2. Created an action plan
   - Regular peak flow monitoring
   - Preventive inhaler use
   - Emergency inhaler always available

3. Results
   - 70% reduction in asthma attacks
   - Improved quality of life
   - Better sleep quality

## Case Study 2: COPD Management
Mary, 60, was diagnosed with COPD. Her success story includes:

1. Lifestyle changes
   - Quit smoking
   - Regular exercise
   - Breathing exercises

2. Environmental modifications
   - Air purifier installation
   - Regular house cleaning
   - Humidity control

3. Outcomes
   - Increased exercise tolerance
   - Fewer hospitalizations
   - Better breathing control

## Practical Tips

1. Daily Breathing Exercises
   - Pursed lip breathing
   - Diaphragmatic breathing
   - Counted breathing

2. Home Environment
   - Regular cleaning schedule
   - Proper ventilation
   - Allergen control

3. Exercise Routine
   - Walking program
   - Strength training
   - Flexibility exercises

Remember: Consistency in management leads to better outcomes.`
    ],
  },
  {
    title: "Maternal and Child Health",
    description: "Essential information for maternal health, pregnancy, and childcare.",
    icon: Baby,
    slug: "maternal-child-health",
    category: "Maternal Health",
    pages: [
      `# Maternal and Child Health

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

Remember: Regular prenatal care is crucial for both mother and child health.
    `,
    `# Practical Examples and Case Studies

## Case Study 1: First-Time Mother
Sarah's Journey Through Pregnancy:

1. First Trimester
   - Morning sickness management
   - Nutrition planning
   - Exercise routine

2. Second Trimester
   - Prenatal yoga
   - Birth plan preparation
   - Genetic screening

3. Third Trimester
   - Birth preparation classes
   - Hospital bag checklist
   - Labor positions practice

## Case Study 2: High-Risk Pregnancy
Emily's Success Story:

1. Risk Factors
   - Advanced maternal age
   - Gestational diabetes
   - Previous miscarriage

2. Management Plan
   - Frequent monitoring
   - Dietary control
   - Activity modification

3. Outcomes
   - Successful delivery
   - Healthy baby
   - Quick recovery

## Practical Guidelines

1. Nutrition Tips
   - Meal planning examples
   - Healthy snack ideas
   - Hydration schedule

2. Exercise Routines
   - Safe activities
   - Modified exercises
   - Warning signs

3. Mental Health
   - Stress management
   - Support groups
   - Partner involvement

Remember: Each pregnancy is unique, but preparation is key.`
    ],
  },
  {
    title: "Medication Safety Guide",
    description: "Guidelines for safe medication use, storage, and common interactions.",
    icon: Pill,
    slug: "medication-safety-guide",
    category: "Medications",
    pages: [
      `# Medication Safety Guide

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

Remember: Always consult healthcare providers about medication changes.
    `,
    `# Real-World Examples and Best Practices

## Case Study 1: Multiple Medications
Robert's Story:

1. Initial Situation
   - 5 different medications
   - Confusion about timing
   - Side effects concerns

2. Solutions Implemented
   - Pill organizer system
   - Medication schedule chart
   - Mobile app reminders

3. Results
   - Better compliance
   - Reduced confusion
   - Improved outcomes

## Case Study 2: Elderly Care
Mrs. Johnson's Experience:

1. Challenges
   - Vision problems
   - Memory issues
   - Multiple prescriptions

2. Management Strategy
   - Large print labels
   - Family involvement
   - Pharmacy coordination

3. Improvements
   - No missed doses
   - Better organization
   - Reduced anxiety

## Practical Solutions

1. Organization Tools
   - Medication charts
   - Pill containers
   - Digital reminders

2. Safety Measures
   - Storage solutions
   - Temperature control
   - Expiration tracking

3. Communication Tips
   - Doctor discussions
   - Pharmacy coordination
   - Family involvement

Remember: Good organization prevents medication errors.`
    ],
  },
  {
    title: "Infectious Disease Prevention",
    description: "Essential information about preventing and managing infectious diseases.",
    icon: Bug,
    slug: "infectious-disease-prevention",
    category: "Infectious Diseases",
    pages: [
      `# Infectious Disease Prevention

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

Remember: Prevention is better than cure in infectious diseases.
    `,
    `# Case Studies and Prevention Examples

## Case Study 1: Workplace Prevention
Tech Company Success:

1. Implementation
   - Hand sanitizer stations
   - Regular cleaning schedule
   - Air filtration systems

2. Employee Education
   - Hygiene workshops
   - Prevention protocols
   - Sick leave policies

3. Results
   - 50% reduction in sick days
   - Improved productivity
   - Better workplace health

## Case Study 2: School Prevention
Elementary School Program:

1. Measures Taken
   - Hand washing stations
   - Regular sanitization
   - Health education

2. Student Engagement
   - Fun hygiene activities
   - Educational games
   - Parent involvement

3. Outcomes
   - Reduced absenteeism
   - Fewer outbreaks
   - Healthier environment

## Practical Guidelines

1. Personal Protection
   - Proper mask usage
   - Hand hygiene steps
   - Social distancing

2. Environmental Control
   - Ventilation tips
   - Surface cleaning
   - Waste management

3. Travel Safety
   - Pre-travel checklist
   - During-travel precautions
   - Post-travel monitoring

Remember: Small prevention steps lead to significant protection.`
    ],
  },
  {
    title: "Tobacco Cessation Guide",
    description: "Comprehensive guide to quit smoking and maintain a tobacco-free life.",
    icon: Cigarette,
    slug: "tobacco-cessation-guide",
    category: "Lifestyle",
    pages: [
      `# Tobacco Cessation Guide

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

Remember: It's never too late to quit smoking.
    `,
    `# Success Stories and Practical Strategies

## Case Study 1: Young Professional
Mike's Quit Journey:

1. Initial Situation
   - 10-year smoking history
   - Pack a day habit
   - Multiple quit attempts

2. Quit Strategy
   - Nicotine replacement
   - Exercise program
   - Support group

3. Results
   - Smoke-free for 2 years
   - Improved health
   - Money savings

## Case Study 2: Long-Term Smoker
Linda's Success Story:

1. Background
   - 30-year habit
   - Health concerns
   - Family motivation

2. Approach
   - Medical support
   - Behavioral therapy
   - Lifestyle changes

3. Achievements
   - Quit after 6 months
   - Better breathing
   - Inspired others

## Practical Tips

1. Trigger Management
   - Identifying triggers
   - Alternative activities
   - Stress management

2. Support Systems
   - Family involvement
   - Professional help
   - Support groups

3. Health Benefits
   - Timeline of improvements
   - Physical changes
   - Mental benefits

Remember: Every quit attempt brings you closer to success.`
    ],
  },
  {
    title: "Diabetes Management",
    description: "Comprehensive guide for understanding and managing diabetes.",
    icon: Droplet,
    slug: "diabetes-management",
    category: "Prevention",
    pages: [
      `# Diabetes Management

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

Remember: Proper management can prevent complications.
    `,
    ],
  },
  {
    title: "Eye Health Care",
    description: "Guidelines for maintaining good eye health and preventing vision problems.",
    icon: Eye,
    slug: "eye-health-care",
    category: "Prevention",
    pages: [
      `# Eye Health Care

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

1. Screening schedule,
2. Protective measures,
3. Workplace safety,
4. Emergency care

Remember: Regular eye exams are crucial for vision health.
    `,
    ],
  },
  {
    title: "Bone and Joint Health",
    description: "Essential information about maintaining strong bones and healthy joints.",
    icon: Bone,
    slug: "bone-joint-health",
    category: "Prevention",
    pages: [
      `# Bone and Joint Health

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

1. Nutrition recommendations,
2. Physical activity,
3. Screening tests,
4. Treatment options

Remember: Prevention starts early in life.
    `,
    ],
  },
  {
    title: "Fever Management",
    description: "Guide to understanding and managing fever in different age groups.",
    icon: Thermometer,
    slug: "fever-management",
    category: "Prevention",
    pages: [
      `# Fever Management

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

Remember: Not all fevers need medication.
    `,
    ],
  },
  {
    title: "Sleep Hygiene Guide",
    description: "Tips and strategies for better sleep quality and habits.",
    icon: Bed,
    slug: "sleep-hygiene-guide",
    category: "Lifestyle",
    pages: [
      `# Sleep Hygiene Guide

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

Remember: Good sleep is essential for health.
    `,
    ],
  },
  {
    title: "Social Health and Relationships",
    description: "Understanding the importance of social connections for health.",
    icon: Users,
    slug: "social-health-relationships",
    category: "Mental Health",
    pages: [
      `# Social Health and Relationships

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

Remember: Strong social connections improve health.
    `,
    ],
  },
  {
    title: "Immunization Guide",
    description: "Comprehensive information about vaccines and immunization schedules.",
    icon: ShieldCheck,
    slug: "immunization-guide",
    category: "Prevention",
    pages: [
      `# Immunization Guide

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

Remember: Vaccines save lives.
    `,
    ],
  },
  {
    title: "Allergy Management",
    description: "Guide to understanding, preventing, and managing allergies.",
    icon: Syringe,
    slug: "allergy-management",
    category: "Prevention",
    pages: [
      `# Allergy Management

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

Remember: Know your triggers and be prepared.
    `,
    ],
  },
  {
    title: "Food Safety Guidelines",
    description: "Essential information about food safety and preventing foodborne illness.",
    icon: Salad,
    slug: "food-safety-guidelines",
    category: "Prevention",
    pages: [
      `# Food Safety Guidelines

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
    ],
  },
  {
    title: "Stress Management",
    description: "Effective strategies for managing stress and promoting mental well-being.",
    icon: Smile,
    slug: "stress-management",

    category: "Mental Health",
    pages: [`# Stress Management

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
    ],
  },
];


