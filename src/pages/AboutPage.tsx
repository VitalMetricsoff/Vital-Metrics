import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="mx-auto max-w-3xl space-y-12">
        {/* About Section */}
        <section className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">About VitalMetrics</h1>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Welcome to VitalMetrics, your trusted companion for health and wellness calculations. Our platform 
              is designed by healthcare professionals, for healthcare professionals, ensuring accuracy and reliability 
              in every calculation.
            </p>
            <p className="text-muted-foreground">
              At VitalMetrics, our mission is to make health monitoring and analysis accessible to everyone. We believe that 
              accurate health calculations should be readily available to both healthcare professionals and individuals 
              interested in monitoring their well-being.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Why Use VitalMetrics?</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium">Evidence-Based Calculations</h3>
              <p className="text-sm text-muted-foreground">
                All our calculators are based on scientifically validated formulas and current medical guidelines.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">User Privacy Focused</h3>
              <p className="text-sm text-muted-foreground">
                Your health data never leaves your device – all calculations are performed locally.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Comprehensive Tools</h3>
              <p className="text-sm text-muted-foreground">
                From basic health metrics to specialized medical calculations, we've got you covered.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Regular Updates</h3>
              <p className="text-sm text-muted-foreground">
                We continuously update our calculators based on the latest medical research and guidelines.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="space-y-4 rounded-lg border p-6">
          <h2 className="text-2xl font-semibold">Medical Disclaimer</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              VitalMetrics provides health calculators for informational and educational purposes only. Our tools are not 
              intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of your 
              physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
            <p>
              Never disregard professional medical advice or delay in seeking it because of something you have read or 
              calculated using our tools. If you think you may have a medical emergency, immediately call your doctor 
              or dial emergency services.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
