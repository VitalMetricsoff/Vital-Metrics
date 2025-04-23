import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { calculators } from "@/data/calculators";
import { Calculator } from "@/types/calculator";
import { BMICalculator } from "@/components/calculators/bmi-calculator";
import { BodySurfaceAreaCalculator } from "@/components/calculators/body-surface-area";
import { TDEECalculator } from "@/components/calculators/tdee-calculator";
import { IdealBodyWeightCalculator } from "@/components/calculators/ideal-body-weight";
import { BodyFatPercentageCalculator } from "@/components/calculators/body-fat-percentage";
import { LeanBodyMassCalculator } from "@/components/calculators/lean-body-mass";
import { BMRCalculator } from "@/components/calculators/bmr-calculator";
import { HeartRateZonesCalculator } from "@/components/calculators/heart-rate-zones";
import { WaistToHipRatioCalculator } from "@/components/calculators/waist-to-hip-ratio";
import { WaistToHeightRatioCalculator } from "@/components/calculators/waist-to-height-ratio";
import { VO2MaxEstimator } from "@/components/calculators/vo2-max-estimator";
import { OneRepMaxCalculator } from "@/components/calculators/one-rep-max-calculator";
import { CaloriesBurnedEstimator } from "@/components/calculators/calories-burned-estimator";
import { StepToCalorieConverter } from "@/components/calculators/step-to-calorie-converter";
import { BloodPressureAnalyzer } from "@/components/calculators/blood-pressure-analyzer";
import { FraminghamRiskScore } from "@/components/calculators/framingham-risk-score";
import { CholesterolRatioCalculator } from "@/components/calculators/cholesterol-ratio-calculator";
import { MeanArterialPressure } from "@/components/calculators/mean-arterial-pressure";
import { PulsePressure } from "@/components/calculators/pulse-pressure";
import { CalorieMacroCalculator } from "@/components/calculators/calorie-macro-calculator";
import { WaterIntakeCalculator } from "@/components/calculators/water-intake-calculator";
import { GlycemicLoadEstimator } from "@/components/calculators/glycemic-load-estimator";
import { ProteinIntakeCalculator } from "@/components/calculators/protein-intake-calculator";
import { CarbCyclingCalculator } from "@/components/calculators/carb-cycling-calculator";
import { AlcoholBACCalculator } from "@/components/calculators/alcohol-bac-calculator";
import { HbA1cToGlucose } from "@/components/calculators/hba1c-to-glucose";
import { GlucoseUnitConverter } from "@/components/calculators/glucose-unit-converter";
import { InsulinDosageEstimator } from "@/components/calculators/insulin-dosage-estimator";
import { PregnancyDueDate } from "@/components/calculators/pregnancy-due-date";
import { OvulationTracker } from "@/components/calculators/ovulation-tracker";
import { FertilityWindowCalculator } from "@/components/calculators/fertility-window-calculator";
import { SafeDaysCalculator } from "@/components/calculators/safe-days-calculator";
import { PeakFlowTest } from "@/components/calculators/peak-flow-test";
import { LifeExpectancyEstimator } from "@/components/calculators/life-expectancy-estimator";
import { SmokingRiskCalculator } from "@/components/calculators/smoking-risk-calculator";
import { PHQ9DepressionTest } from "@/components/calculators/phq9-depression-test";
import { GAD7AnxietyTest } from "@/components/calculators/gad7-anxiety-test";
import { SleepCycleOptimizer } from "@/components/calculators/sleep-cycle-optimizer";
import { StressLevelEstimator } from "@/components/calculators/stress-level-estimator";
import { BasalBodyTemperatureChart } from "@/components/calculators/basal-body-temperature-chart";
import { MenstrualCycleLengthCalculator } from "@/components/calculators/menstrual-cycle-length-calculator";
import { OvulationPredictionKitReader } from "@/components/calculators/ovulation-prediction-kit-reader";
import { RestingHeartRateEstimator } from "@/components/calculators/resting-heart-rate-estimator";
import { PregnancyWeightGainEstimator } from "@/components/calculators/pregnancy-weight-gain-estimator";
import { IdealSleepDurationCalculator } from "@/components/calculators/ideal-sleep-duration-calculator";
import { HydrationDepletionEstimator } from "@/components/calculators/hydration-depletion-estimator";
import { MicronutrientNeedsEstimator } from "@/components/calculators/micronutrient-needs-estimator";
import { SkinfoldBodyFatCalculator } from "@/components/calculators/skinfold-body-fat-calculator";
import { BloodDonationEligibilityChecker } from "@/components/calculators/blood-donation-eligibility-checker";
import { HealthScoreIndex } from "@/components/calculators/health-score-index";
import { CalculatorNavigation } from "@/components/calculator/calculator-navigation";
import { toast } from "@/components/ui/use-toast";
import { Breadcrumb } from '@/components/breadcrumb';
import { Helmet } from 'react-helmet-async';

type ActivityLevel = {
  sedentary: number;
  light: number;
  moderate: number;
  active: number;
  veryActive: number;
};

type HeartRateZones = {
  veryLight: string;
  light: string;
  moderate: string;
  hard: string;
  maximum: string;
};

type CalculatorResultData = string | number | ActivityLevel | HeartRateZones;

export default function CalculatorPage() {
  const { slug } = useParams<{ slug: string }>();
  const [calculator, setCalculator] = useState<Calculator | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundCalculator = calculators.find((calc) => calc.slug === slug);
      
      if (foundCalculator) {
        setCalculator(foundCalculator);
        document.title = `${foundCalculator.name} - Health Calculator`;
      } else {
        toast({
          title: "Calculator not found",
          description: "The calculator you're looking for doesn't exist.",
          variant: "destructive",
        });
      }
      
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!calculator) {
    return (
      <div className="container py-8">
        <CalculatorNavigation />
        <div className="text-center">
          <h1 className="text-2xl font-bold">Calculator Not Found</h1>
          <p className="mt-2 text-muted-foreground">
            The calculator you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Calculators', href: '/calculators' },
    { label: calculator.name, href: `/calculator/${calculator.slug}` }
  ];

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": calculator.name,
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "description": calculator.description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const renderCalculator = () => {
    switch (calculator.slug) {
      // Body Metrics
      case "bmi-calculator":
        return <BMICalculator />;
      case "body-surface-area":
        return <BodySurfaceAreaCalculator />;
      case "ideal-body-weight":
        return <IdealBodyWeightCalculator />;
      case "body-fat-percentage":
        return <BodyFatPercentageCalculator />;
      case "lean-body-mass":
        return <LeanBodyMassCalculator />;
      case "waist-to-hip-ratio":
        return <WaistToHipRatioCalculator />;
      case "waist-to-height-ratio":
        return <WaistToHeightRatioCalculator />;
        
      // Fitness & Metabolism
      case "bmr-calculator":
        return <BMRCalculator />;
      case "tdee-calculator":
        return <TDEECalculator />;
      case "heart-rate-zones":
        return <HeartRateZonesCalculator />;
      case "vo2-max-estimator":
        return <VO2MaxEstimator />;
      case "one-rep-max-calculator":
        return <OneRepMaxCalculator />;
      case "calories-burned-estimator":
        return <CaloriesBurnedEstimator />;
      case "step-to-calorie-converter":
        return <StepToCalorieConverter />;
        
      // Cardio & Vitals
      case "blood-pressure-analyzer":
        return <BloodPressureAnalyzer />;
      case "framingham-risk-score":
        return <FraminghamRiskScore />;
      case "cholesterol-ratio-calculator":
        return <CholesterolRatioCalculator />;
      case "mean-arterial-pressure":
        return <MeanArterialPressure />;
      case "pulse-pressure":
        return <PulsePressure />;
        
      // Nutrition & Metabolic
      case "calorie-macro-calculator":
        return <CalorieMacroCalculator />;
      case "water-intake-calculator":
        return <WaterIntakeCalculator />;
      case "glycemic-load-estimator":
        return <GlycemicLoadEstimator />;
      case "protein-intake-calculator":
        return <ProteinIntakeCalculator />;
      case "carb-cycling-calculator":
        return <CarbCyclingCalculator />;
      case "alcohol-bac-calculator":
        return <AlcoholBACCalculator />;
        
      // Diabetes & Blood Sugar
      case "hba1c-to-glucose":
        return <HbA1cToGlucose />;
      case "glucose-unit-converter":
        return <GlucoseUnitConverter />;
      case "insulin-dosage-estimator":
        return <InsulinDosageEstimator />;
        
      // Pregnancy & Fertility
      case "pregnancy-due-date":
        return <PregnancyDueDate />;
      case "ovulation-tracker":
        return <OvulationTracker />;
      case "fertility-window-calculator":
        return <FertilityWindowCalculator />;
      case "safe-days-calculator":
        return <SafeDaysCalculator />;
        
      // Lungs & Life Expectancy
      case "peak-flow-test":
        return <PeakFlowTest />;
      case "life-expectancy-estimator":
        return <LifeExpectancyEstimator />;
      case "smoking-risk-calculator":
        return <SmokingRiskCalculator />;
        
      // Mental & Sleep
      case "phq9-depression-test":
        return <PHQ9DepressionTest />;
      case "gad7-anxiety-test":
        return <GAD7AnxietyTest />;
      case "sleep-cycle-optimizer":
        return <SleepCycleOptimizer />;
      case "stress-level-estimator":
        return <StressLevelEstimator />;
        
      // Other Tools
      case "basal-body-temperature-chart":
        return <BasalBodyTemperatureChart />;
      case "menstrual-cycle-length-calculator":
        return <MenstrualCycleLengthCalculator />;
      case "ovulation-prediction-kit-reader":
        return <OvulationPredictionKitReader />;
      case "resting-heart-rate-estimator":
        return <RestingHeartRateEstimator />;
      case "pregnancy-weight-gain-estimator":
        return <PregnancyWeightGainEstimator />;
      case "ideal-sleep-duration-calculator":
        return <IdealSleepDurationCalculator />;
      case "hydration-depletion-estimator":
        return <HydrationDepletionEstimator />;
      case "micronutrient-needs-estimator":
        return <MicronutrientNeedsEstimator />;
      case "skinfold-body-fat-calculator":
        return <SkinfoldBodyFatCalculator />;
      case "blood-donation-eligibility-checker":
        return <BloodDonationEligibilityChecker />;
      case "health-score-index":
        return <HealthScoreIndex />;
        
      default:
        return <GenericCalculator calculator={calculator} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${calculator.name} | VitalMetrics`}</title>
        <meta name="description" content={calculator.description} />
        <script type="application/ld+json">
          {JSON.stringify(calculatorSchema)}
        </script>
      </Helmet>

      <div className="container py-8 md:py-12">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mt-6">
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
            {calculator.name}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {calculator.description}
          </p>
        </div>

        {renderCalculator()}

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">How accurate is this calculator?</h3>
              <p className="text-muted-foreground mt-1">
                This calculator uses evidence-based formulas and is regularly updated with the latest medical research.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Can I use this for medical diagnosis?</h3>
              <p className="text-muted-foreground mt-1">
                This calculator is for informational purposes only and should not be used as a substitute for professional medical advice.
              </p>
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {calculators
              .filter(c => c.category === calculator.category && c.id !== calculator.id)
              .slice(0, 3)
              .map(relatedCalculator => (
                <a
                  key={relatedCalculator.id}
                  href={`/calculator/${relatedCalculator.slug}`}
                  className="p-4 border rounded-lg hover:border-primary transition-colors"
                >
                  <h3 className="font-medium">{relatedCalculator.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {relatedCalculator.description}
                  </p>
                </a>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

function GenericCalculator({ calculator }: { calculator: Calculator }) {
  return (
    <div className="p-8 border rounded-lg bg-card text-card-foreground">
      <h2 className="text-xl font-semibold mb-4">This calculator is coming soon!</h2>
      <p>
        We're still working on implementing the {calculator.name}. Please check back later!
      </p>
    </div>
  );
}
