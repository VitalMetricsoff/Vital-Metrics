import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, Stethoscope, Code, Brain, Heart, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { categoryLabels } from "@/types/calculator";
import { useState } from "react";

export default function FounderPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "CARDIOLOGY":
        return <Heart className="h-6 w-6" />;
      case "NEUROLOGY":
        return <Brain className="h-6 w-6" />;
      case "body-metrics":
        return <Users className="h-6 w-6" />;
      default:
        return <Stethoscope className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Sticky Profile Section */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="rounded-xl bg-white dark:bg-slate-900 p-6 shadow-lg border border-slate-200 dark:border-slate-800/50">
              <div className="aspect-square w-full overflow-hidden rounded-lg mb-4">
                <img
                  src="/founder.jpg"
                  alt="Dr. Aravind Kumar Kalusivalingam"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-1">
                Dr. Aravind Kumar Kalusivalingam
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Founder of VitalMetrics.in
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <GraduationCap className="h-5 w-5" />
                  <span>MD General Physician</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Stethoscope className="h-5 w-5" />
                  <span>Physician Technologist</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Code className="h-5 w-5" />
                  <span>Healthcare Innovator</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Vision Section */}
            <section>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Vision</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                As a practicing physician, I recognized the need for quick, reliable medical calculations in daily practice. VitalMetrics was born from this vision - to create a platform that simplifies complex medical calculations while ensuring accuracy and efficiency. Our journey began with a simple idea: to make healthcare professionals' lives easier and enhance patient care through technology.
              </p>
            </section>

            {/* Mission Section */}
            <section>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Mission</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                At VitalMetrics, our mission is to empower healthcare professionals with efficient, reliable tools that streamline their workflow. We understand the critical nature of medical calculations and the importance of having trustworthy resources at your fingertips. Our platform is designed to be your reliable companion in clinical practice, research, and medical education.
              </p>
            </section>

            {/* Impact Section */}
            <section>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Stethoscope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-lg font-medium text-slate-900 dark:text-slate-50">Medical Calculators</h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Comprehensive collection of evidence-based medical calculators across various specialties
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-lg font-medium text-slate-900 dark:text-slate-50">Growing Community</h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Supporting healthcare professionals worldwide with reliable tools
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsModalOpen(true)}
              >
                Explore Our Calculators
              </Button>
            </section>

            {/* Future Vision Section */}
            <section>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Future Vision</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                We are committed to continuous improvement and innovation. Your feedback drives our development, and we're constantly working to expand our calculator collection, enhance user experience, and incorporate the latest medical evidence. Together, we're building a future where medical calculations are accessible, accurate, and efficient for all healthcare professionals.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Calculator Categories Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Browse by Category</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            {Object.entries(categoryLabels).map(([category, label]) => (
              <Link
                key={category}
                to={`/calculators?category=${category}`}
                className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                {getCategoryIcon(category)}
                <span className="text-slate-900 dark:text-slate-50">{label}</span>
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 