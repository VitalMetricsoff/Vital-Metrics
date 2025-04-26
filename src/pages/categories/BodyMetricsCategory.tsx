import React from 'react';
import { SEO } from '@/components/seo/seo';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Scale, ArrowRight, Calculator } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const categoryData = {
  title: "Body Metrics Calculators",
  description: "Evidence-based medical calculators for body measurements and composition analysis. Essential tools for healthcare professionals in clinical assessment and research.",
  calculators: [
    {
      id: "bmi",
      name: "Body Mass Index (BMI)",
      description: "Calculate and interpret BMI for weight status assessment. Includes clinical guidelines and health risk evaluation.",
      uses: ["Weight status screening", "Health risk assessment", "Population studies"],
      icon: Scale,
      color: "text-blue-600"
    },
    {
      id: "bsa",
      name: "Body Surface Area (BSA)",
      description: "Calculate BSA for drug dosing, metabolic rate assessment, and clinical applications using validated formulas.",
      uses: ["Drug dosing", "Burn assessment", "Metabolic calculations"],
      icon: Calculator,
      color: "text-green-600"
    }
    // Add more calculators as needed
  ],
  relatedResources: [
    {
      title: "Understanding BMI: Clinical Applications & Limitations",
      path: "/blog/understanding-bmi-guide",
      type: "Guide"
    },
    {
      title: "BSA in Clinical Practice",
      path: "/blog/bsa-clinical-guide",
      type: "Research"
    }
  ]
};

export default function BodyMetricsCategory() {
  return (
    <>
      <SEO
        title="Body Metrics Calculators | Medical Measurement Tools | VitalMetrics"
        description="Access evidence-based body metrics calculators for clinical use. Including BMI, BSA, and body composition tools with medical interpretations and guidelines."
        type="website"
      />

      <div className="container max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            {categoryData.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {categoryData.description}
          </p>
        </div>

        {/* Calculators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categoryData.calculators.map((calc) => {
            const IconComponent = calc.icon;
            return (
              <Card key={calc.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-full bg-slate-100 ${calc.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h2 className="font-semibold text-xl">{calc.name}</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {calc.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Common Uses:</h3>
                      <div className="flex flex-wrap gap-2">
                        {calc.uses.map((use, index) => (
                          <Badge key={index} variant="secondary">
                            {use}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Link
                      to={`/calculators/${calc.id}`}
                      className="inline-flex items-center text-primary hover:text-primary/80"
                    >
                      Use Calculator
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Related Resources */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryData.relatedResources.map((resource, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <Badge className="mb-3">{resource.type}</Badge>
                  <h3 className="font-medium text-lg mb-2">
                    {resource.title}
                  </h3>
                  <Link
                    to={resource.path}
                    className="inline-flex items-center text-primary hover:text-primary/80"
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Clinical Note */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Clinical Note</h2>
          <p className="text-muted-foreground">
            All calculators in this category are based on peer-reviewed medical research and current clinical guidelines. 
            Results should be interpreted within the appropriate clinical context and in conjunction with other relevant 
            patient data. For specific medical advice, please consult with a healthcare professional.
          </p>
        </div>
      </div>
    </>
  );
}
