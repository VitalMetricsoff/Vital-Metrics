
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container py-8 md:py-12 max-w-4xl">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">About HealthGenius</h1>
        <p className="text-muted-foreground mx-auto max-w-[700px]">
          Your trusted source for health and wellness calculators
        </p>
      </div>

      <div className="mt-8 space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p>
            At HealthGenius, our mission is to make health monitoring and analysis accessible to everyone. We believe that 
            having the right tools to understand your health metrics is the first step toward making informed decisions 
            about your wellness journey.
          </p>
          <p>
            We've created a comprehensive suite of over 50 health calculators that span across various aspects of wellness - 
            from body composition and fitness to nutrition, mental health, and specialized health indicators.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Why Use HealthGenius?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Comprehensive Collection:</span> Access to over 50 specialized health calculators in one place
            </li>
            <li>
              <span className="font-medium">Evidence-Based:</span> Our calculators use scientifically validated formulas and methodologies
            </li>
            <li>
              <span className="font-medium">User-Friendly:</span> Simple, intuitive interfaces that make health monitoring easy
            </li>
            <li>
              <span className="font-medium">Privacy-Focused:</span> Your health data stays on your device and is never stored on our servers
            </li>
            <li>
              <span className="font-medium">Educational:</span> Contextual information and interpretations help you understand your results
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Categories We Cover</h2>
          <p>Our health calculators are organized into several categories to help you find exactly what you need:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg">Body Metrics</h3>
              <p className="text-sm text-muted-foreground">BMI, body fat percentage, and other body composition metrics</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg">Fitness & Metabolism</h3>
              <p className="text-sm text-muted-foreground">BMR, TDEE, and exercise-related calculations</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg">Cardio & Vitals</h3>
              <p className="text-sm text-muted-foreground">Blood pressure, heart rate, and cardiovascular risk assessments</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg">Nutrition & Metabolic</h3>
              <p className="text-sm text-muted-foreground">Calorie, macronutrient, and dietary planning tools</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg">Mental & Sleep</h3>
              <p className="text-sm text-muted-foreground">Mental health screenings and sleep optimization tools</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg">Specialized Health</h3>
              <p className="text-sm text-muted-foreground">Pregnancy, diabetes, respiratory health, and more</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Important Disclaimer</h2>
          <div className="bg-muted rounded-lg p-4 text-sm">
            <p>
              HealthGenius provides health calculators for informational and educational purposes only. Our tools are not 
              intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare 
              providers regarding any health concerns or before making significant changes to your health regimen.
            </p>
            <p className="mt-2">
              The results provided by our calculators should be used as general guidelines. Individual health situations vary, 
              and many factors not accounted for in these calculations may influence your personal health metrics.
            </p>
          </div>
        </section>

        <div className="text-center border-t pt-8 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Ready to explore our calculators?</h2>
          <Link to="/calculators">
            <Button size="lg">Browse All Calculators</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
