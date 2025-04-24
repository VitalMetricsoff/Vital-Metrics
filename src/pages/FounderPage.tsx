import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, Stethoscope, Code, Brain, Heart, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { categoryLabels } from "@/types/calculator";
import { useState } from "react";
import { Helmet } from 'react-helmet-async';

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
    <>
      <Helmet>
        <title>Dr. Aravind Kumar | Founder of VitalMetrics</title>
        <meta name="description" content="Meet Dr. Aravind Kumar, the founder of VitalMetrics. Learn about his journey from medical practice to creating innovative health calculation tools." />
      </Helmet>
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
                <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-1">
                  Dr. Aravind Kumar Kalusivalingam
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Founder of VitalMetrics.in
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    MD General Physician
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Healthcare Technology Innovator
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Introduction</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    As a medical professional with a passion for technology, I founded VitalMetrics to address 
                    a critical need in healthcare: accessible, accurate medical calculations. My journey from 
                    medical practice to healthcare technology has been driven by a simple yet powerful vision: 
                    to make medical calculations more efficient and reliable for healthcare professionals worldwide.
                  </p>
                </div>
              </section>

              {/* Background */}
              <section>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Background</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    With a background in general medicine and a deep understanding of healthcare workflows, 
                    I recognized the challenges healthcare professionals face with manual calculations and 
                    outdated tools. This insight led to the creation of VitalMetrics, a comprehensive suite 
                    of medical calculators designed to streamline clinical decision-making.
                  </p>
                </div>
              </section>

              {/* Impact */}
              <section>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Impact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Stethoscope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-lg font-medium text-slate-900 dark:text-slate-50">Medical Calculators</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Comprehensive collection of evidence-based medical calculators across various specialties
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-lg font-medium text-slate-900 dark:text-slate-50">Growing Community</h3>
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

              {/* Future Vision */}
              <section>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Future Vision</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Looking ahead, I envision VitalMetrics evolving into an even more comprehensive platform 
                    that integrates with modern healthcare systems, providing seamless calculation tools that 
                    enhance clinical workflows and improve patient care outcomes.
                  </p>
                </div>
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
    </>
  );
} 