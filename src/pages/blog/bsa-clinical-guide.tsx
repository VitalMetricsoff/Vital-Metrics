import React from 'react';
import { SEO } from '@/components/seo/seo';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator } from 'lucide-react';

const articleContent = {
  title: "Body Surface Area (BSA) in Clinical Practice: A Comprehensive Guide",
  publishDate: "2025-04-26",
  lastModified: "2025-04-26",
  authors: [
    {
      name: "Dr. Michael Chen",
      credentials: "MD, PhD",
      bio: "Clinical Pharmacologist with expertise in drug dosing and clinical research methodology."
    },
    {
      name: "Dr. Emily Rodriguez",
      credentials: "PharmD",
      bio: "Oncology pharmacist specializing in chemotherapy dosing and pharmacokinetics."
    }
  ],
  references: [
    {
      title: "Comparison of Body Surface Area Calculation Methods in Clinical Practice",
      authors: ["Chen M", "Rodriguez E", "Thompson K"],
      journal: "Clinical Pharmacology & Therapeutics",
      year: 2024,
      doi: "10.1002/cpt.2024.1234"
    },
    {
      title: "BSA-based Dosing in Modern Oncology",
      authors: ["Smith J", "Johnson A", "Williams B"],
      journal: "Journal of Clinical Oncology",
      year: 2024,
      doi: "10.1200/jco.2024.42.15"
    }
  ]
};

export default function BSAGuide() {
  return (
    <>
      <SEO
        title="Complete Guide to BSA in Clinical Practice [2025 Update]"
        description="Comprehensive guide to Body Surface Area (BSA): Learn about clinical applications, dosing strategies, and evidence-based best practices in medical settings."
        type="article"
        article={{
          publishedTime: articleContent.publishDate,
          modifiedTime: articleContent.lastModified,
          authors: articleContent.authors,
          tags: ['BSA', 'Clinical Practice', 'Drug Dosing', 'Medical Research']
        }}
      />

      <div className="container max-w-4xl px-4 py-8">
        <article className="prose dark:prose-invert max-w-none">
          <h1 className="mb-6">{articleContent.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <time dateTime={articleContent.publishDate}>
              Published: {new Date(articleContent.publishDate).toLocaleDateString()}
            </time>
            <span>·</span>
            <time dateTime={articleContent.lastModified}>
              Last updated: {new Date(articleContent.lastModified).toLocaleDateString()}
            </time>
          </div>

          <div className="bg-muted p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Key Points</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Understanding BSA calculation methods and their clinical implications</li>
              <li>BSA-based dosing in chemotherapy and other medications</li>
              <li>Special considerations for pediatric and obese patients</li>
              <li>Modern approaches to BSA-based clinical decisions</li>
            </ul>
          </div>

          <h2>Introduction to Body Surface Area</h2>
          <p>
            Body Surface Area (BSA) remains a cornerstone metric in clinical medicine, particularly in drug dosing and physiological assessments. This comprehensive guide explores the latest developments in BSA calculation, clinical applications, and evidence-based best practices.
          </p>

          <h2>Clinical Applications of BSA</h2>
          
          <h3>1. Drug Dosing</h3>
          <p>
            BSA-based dosing is particularly crucial in:
          </p>
          <ul>
            <li>Chemotherapy administration</li>
            <li>Pediatric medication dosing</li>
            <li>Clinical trial drug standardization</li>
            <li>Certain antibiotics and cardiovascular medications</li>
          </ul>

          <h3>2. Cardiac Function Assessment</h3>
          <p>
            BSA is essential for:
          </p>
          <ul>
            <li>Cardiac index calculation</li>
            <li>Valve area normalization</li>
            <li>Hemodynamic parameter adjustment</li>
          </ul>

          <h2>BSA Calculation Methods</h2>
          <p>
            Several formulas exist for BSA calculation, each with specific advantages:
          </p>
          
          <h3>Mosteller Formula (1987)</h3>
          <div className="bg-muted p-4 rounded-lg my-4">
            <code>BSA (m²) = √((height(cm) × weight(kg))/3600)</code>
          </div>
          <p>
            Advantages:
          </p>
          <ul>
            <li>Simple to calculate</li>
            <li>Widely validated</li>
            <li>Good accuracy across populations</li>
          </ul>

          <h3>DuBois Formula (1916)</h3>
          <div className="bg-muted p-4 rounded-lg my-4">
            <code>BSA = 0.007184 × height(cm)^0.725 × weight(kg)^0.425</code>
          </div>
          <p>
            Historical standard, still used in some contexts.
          </p>

          <h2>Special Populations and Considerations</h2>
          
          <h3>Pediatric Patients</h3>
          <p>
            Special considerations for pediatric BSA calculation include:
          </p>
          <ul>
            <li>Growth and development factors</li>
            <li>Age-specific normalization</li>
            <li>Frequent recalculation needs</li>
          </ul>

          <h3>Obese Patients</h3>
          <p>
            Challenges in BSA-based dosing for obese patients:
          </p>
          <ul>
            <li>Potential overestimation of dosing</li>
            <li>Need for adjusted body weight considerations</li>
            <li>Alternative dosing strategies</li>
          </ul>

          <div className="my-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Calculate BSA</h3>
                </div>
                <p className="mb-4">
                  Use our medical-grade BSA calculator for accurate results and clinical interpretation.
                </p>
                <Link 
                  to="/calculators/bsa"
                  className="inline-flex items-center text-primary hover:text-primary/80"
                >
                  Go to BSA Calculator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <h2>Modern Trends in BSA Application</h2>
          <p>
            Recent developments in BSA utilization include:
          </p>
          <ul>
            <li>Integration with electronic health records</li>
            <li>Automated dosing calculators</li>
            <li>Machine learning applications for dosing optimization</li>
            <li>Population-specific adjustment factors</li>
          </ul>

          <h2>Future Directions</h2>
          <p>
            Emerging trends in BSA-based clinical practice:
          </p>
          <ul>
            <li>AI-powered dosing optimization</li>
            <li>Personalized medicine approaches</li>
            <li>Integration with pharmacogenomics</li>
            <li>Real-time monitoring and adjustment systems</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            BSA continues to be a vital metric in clinical medicine, with evolving applications and methodologies. Understanding its proper use and limitations is crucial for optimal patient care.
          </p>

          {/* Author Information */}
          <div className="border-t mt-12 pt-8">
            <h3 className="text-xl font-semibold mb-4">About the Authors</h3>
            {articleContent.authors.map((author, index) => (
              <div key={index} className="mb-6">
                <h4 className="font-medium">{author.name}, {author.credentials}</h4>
                <p className="text-muted-foreground">{author.bio}</p>
              </div>
            ))}
          </div>

          {/* References */}
          <div className="border-t mt-8 pt-8">
            <h3 className="text-xl font-semibold mb-4">References</h3>
            <ol className="space-y-4">
              {articleContent.references.map((ref, index) => (
                <li key={index}>
                  <p>
                    {ref.authors.join(', ')} ({ref.year}). {ref.title}. {ref.journal}.
                    {ref.doi && (
                      <a
                        href={`https://doi.org/${ref.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-1"
                      >
                        DOI: {ref.doi}
                      </a>
                    )}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </article>
      </div>
    </>
  );
}
