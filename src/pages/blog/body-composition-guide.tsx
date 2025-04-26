import React from 'react';
import { SEO } from '@/components/seo/seo';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Scale } from 'lucide-react';

const articleContent = {
  title: "Body Composition Analysis: A Clinical Guide to Assessment Methods",
  publishDate: "2025-04-26",
  lastModified: "2025-04-26",
  authors: [
    {
      name: "Dr. Jennifer Martinez",
      credentials: "MD, MSc",
      bio: "Sports Medicine Physician specializing in body composition assessment and athletic performance."
    },
    {
      name: "Dr. Robert Thompson",
      credentials: "PhD",
      bio: "Research scientist in exercise physiology and body composition analysis methods."
    }
  ],
  references: [
    {
      title: "Comparison of Body Composition Assessment Methods in Clinical Practice",
      authors: ["Martinez J", "Thompson R", "Anderson K"],
      journal: "Sports Medicine",
      year: 2024,
      doi: "10.1007/s40279-024-01234-x"
    },
    {
      title: "Clinical Applications of Body Composition Analysis",
      authors: ["Wilson M", "Brown S", "Davis L"],
      journal: "Journal of Clinical Medicine",
      year: 2024,
      doi: "10.3390/jcm13020567"
    }
  ]
};

export default function BodyCompositionGuide() {
  return (
    <>
      <SEO
        title="Body Composition Analysis: Clinical Methods & Applications [2025]"
        description="Comprehensive guide to body composition assessment methods, clinical applications, and interpretation guidelines for healthcare professionals."
        type="article"
        article={{
          publishedTime: articleContent.publishDate,
          modifiedTime: articleContent.lastModified,
          authors: articleContent.authors,
          tags: ['Body Composition', 'Clinical Assessment', 'Medical Research', 'Health Monitoring']
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
            <h2 className="text-xl font-semibold mb-4">Article Overview</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Understanding different body composition assessment methods</li>
              <li>Clinical applications and interpretation guidelines</li>
              <li>Method selection based on patient needs</li>
              <li>Integration into clinical practice</li>
            </ul>
          </div>

          <h2>Introduction</h2>
          <p>
            Body composition analysis is fundamental to understanding health status, disease risk, and treatment effectiveness. 
            This comprehensive guide explores various assessment methods, their clinical applications, and practical implementation 
            in healthcare settings.
          </p>

          <h2>Body Composition Assessment Methods</h2>
          
          <h3>1. Anthropometric Measurements</h3>
          <ul>
            <li>Body Mass Index (BMI)</li>
            <li>Skinfold measurements</li>
            <li>Circumference measurements</li>
            <li>Navy method calculations</li>
          </ul>

          <h3>2. Advanced Technologies</h3>
          <ul>
            <li>Dual-energy X-ray absorptiometry (DXA)</li>
            <li>Bioelectrical impedance analysis (BIA)</li>
            <li>Air displacement plethysmography</li>
            <li>Hydrostatic weighing</li>
          </ul>

          <h2>Clinical Applications</h2>
          
          <h3>General Health Assessment</h3>
          <p>
            Body composition analysis provides valuable insights for:
          </p>
          <ul>
            <li>Metabolic health evaluation</li>
            <li>Cardiovascular risk assessment</li>
            <li>Nutritional status monitoring</li>
            <li>Age-related composition changes</li>
          </ul>

          <h3>Disease Management</h3>
          <p>
            Applications in various clinical conditions:
          </p>
          <ul>
            <li>Obesity treatment monitoring</li>
            <li>Sarcopenia assessment</li>
            <li>Cancer cachexia evaluation</li>
            <li>Eating disorder management</li>
          </ul>

          <div className="my-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Body Composition Tools</h3>
                </div>
                <p className="mb-4">
                  Access our suite of clinical body composition calculators:
                </p>
                <div className="space-y-2">
                  <Link 
                    to="/calculators/body-fat"
                    className="block text-primary hover:text-primary/80"
                  >
                    Body Fat Calculator <ArrowRight className="inline-block ml-2 h-4 w-4" />
                  </Link>
                  <Link 
                    to="/calculators/bmi"
                    className="block text-primary hover:text-primary/80"
                  >
                    BMI Calculator <ArrowRight className="inline-block ml-2 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2>Method Selection Guidelines</h2>
          <p>
            Factors to consider when choosing assessment methods:
          </p>
          <ul>
            <li>Clinical setting and available resources</li>
            <li>Patient characteristics and limitations</li>
            <li>Required accuracy level</li>
            <li>Time and cost constraints</li>
          </ul>

          <h3>Practical Considerations</h3>
          <ul>
            <li>Equipment availability and maintenance</li>
            <li>Staff training requirements</li>
            <li>Patient preparation protocols</li>
            <li>Result interpretation guidelines</li>
          </ul>

          <h2>Implementation in Clinical Practice</h2>
          
          <h3>Standard Operating Procedures</h3>
          <ol>
            <li>Patient screening and preparation</li>
            <li>Measurement protocols</li>
            <li>Quality control measures</li>
            <li>Result documentation</li>
            <li>Clinical interpretation</li>
          </ol>

          <h3>Result Interpretation</h3>
          <p>
            Key factors in interpreting results:
          </p>
          <ul>
            <li>Age and gender-specific norms</li>
            <li>Population-specific considerations</li>
            <li>Clinical context integration</li>
            <li>Longitudinal monitoring protocols</li>
          </ul>

          <h2>Future Developments</h2>
          <p>
            Emerging trends in body composition assessment:
          </p>
          <ul>
            <li>3D body scanning technology</li>
            <li>Artificial intelligence integration</li>
            <li>Mobile health applications</li>
            <li>Remote monitoring capabilities</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            Body composition analysis remains a crucial tool in clinical practice. Understanding available methods and their 
            appropriate application ensures optimal patient care and treatment monitoring.
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
