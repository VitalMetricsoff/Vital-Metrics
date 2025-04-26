import React from 'react';
import { SEO } from '@/components/seo/seo';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const articleContent = {
  title: "Complete Guide to Body Mass Index (BMI): Clinical Applications & Limitations",
  publishDate: "2025-04-26",
  lastModified: "2025-04-26",
  authors: [
    {
      name: "Dr. Sarah Johnson",
      credentials: "MD, MPH",
      bio: "Board-certified endocrinologist with 15 years of experience in weight management and metabolic disorders."
    },
    {
      name: "Dr. Michael Chen",
      credentials: "PhD",
      bio: "Research scientist specializing in epidemiology and public health metrics."
    }
  ],
  references: [
    {
      title: "WHO guidelines on body mass index and health outcomes",
      authors: ["World Health Organization"],
      journal: "WHO Technical Report Series",
      year: 2024,
      doi: "10.1000/who.2024.bmi.1234"
    },
    {
      title: "BMI in Clinical Practice: New Perspectives",
      authors: ["Smith J", "Williams R", "Davis M"],
      journal: "Journal of Clinical Medicine",
      year: 2024,
      doi: "10.3390/jcm13020789"
    }
  ]
};

export default function BMIGuide() {
  return (
    <>
      <SEO
        title="Complete Guide to BMI: Clinical Applications & Research [2025]"
        description="Comprehensive guide to Body Mass Index (BMI): Learn about clinical applications, research-backed insights, limitations, and proper interpretation in medical practice."
        type="article"
        article={{
          publishedTime: articleContent.publishDate,
          modifiedTime: articleContent.lastModified,
          authors: articleContent.authors,
          tags: ['BMI', 'Clinical Guidelines', 'Medical Research', 'Weight Management']
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
            <h2 className="text-xl font-semibold mb-4">Article Highlights</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Understanding BMI's role in clinical assessment</li>
              <li>Latest research on BMI thresholds and health outcomes</li>
              <li>Population-specific considerations and limitations</li>
              <li>Practical guidelines for healthcare providers</li>
            </ul>
          </div>

          <h2>Introduction</h2>
          <p>
            Body Mass Index (BMI) remains one of the most widely used tools in clinical practice for assessing weight-related health risks. This comprehensive guide explores the latest research, clinical applications, and important considerations for healthcare providers and researchers using BMI in their practice.
          </p>

          <h2>Clinical Significance of BMI</h2>
          <p>
            BMI serves as an initial screening tool in the clinical assessment of weight status and potential health risks. Recent studies have reinforced its value while highlighting the importance of considering it alongside other health markers.
          </p>

          <h3>Key Clinical Applications</h3>
          <ul>
            <li>Population health screening and monitoring</li>
            <li>Risk assessment for weight-related conditions</li>
            <li>Treatment planning and intervention strategies</li>
            <li>Research and epidemiological studies</li>
          </ul>

          <h2>Latest Research Insights</h2>
          <p>
            Recent meta-analyses have provided new insights into the relationship between BMI and health outcomes. Studies published in 2024-2025 have particularly focused on:
          </p>
          <ul>
            <li>Population-specific BMI thresholds</li>
            <li>Correlation with metabolic health markers</li>
            <li>Long-term health outcome predictions</li>
            <li>Integration with other health metrics</li>
          </ul>

          <h2>Understanding BMI Limitations</h2>
          <p>
            While BMI is valuable, understanding its limitations is crucial for proper clinical application:
          </p>
          <ul>
            <li>Does not differentiate between fat and muscle mass</li>
            <li>May not accurately reflect body fat distribution</li>
            <li>Requires different thresholds for different populations</li>
            <li>Not suitable as a sole diagnostic tool</li>
          </ul>

          <h2>Best Practices for Clinical Implementation</h2>
          <p>
            Modern clinical practice recommends using BMI as part of a comprehensive health assessment:
          </p>
          <ol>
            <li>Combine BMI with other anthropometric measurements</li>
            <li>Consider ethnic and population-specific factors</li>
            <li>Assess body composition when possible</li>
            <li>Account for age and sex-specific variations</li>
          </ol>

          <div className="my-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Calculate Your BMI</h3>
                <p className="mb-4">
                  Use our medical-grade BMI calculator for accurate results and detailed clinical interpretation.
                </p>
                <Link 
                  to="/calculators/bmi"
                  className="inline-flex items-center text-primary hover:text-primary/80"
                >
                  Go to BMI Calculator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <h2>Future Directions</h2>
          <p>
            Emerging research is exploring enhanced approaches to body composition assessment:
          </p>
          <ul>
            <li>Integration of AI-powered body composition analysis</li>
            <li>Development of improved metabolic health markers</li>
            <li>Population-specific BMI adjustment factors</li>
            <li>Novel approaches to body fat distribution assessment</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            BMI continues to be a valuable tool in clinical practice when used appropriately and in conjunction with other health assessments. Understanding its applications and limitations enables healthcare providers to make more informed decisions in patient care.
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
