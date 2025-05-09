import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { PatientInfo, Symptom, DiagnosisResult } from '@/types/symptom-checker';
import { AlertTriangle, Download, Copy, Share2, ExternalLink, MapPin, Clock, ShieldAlert, Stethoscope, Shield, Link } from 'lucide-react';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { HospitalFinder } from './hospital-finder';

interface DiagnosisResultsProps {
  results: DiagnosisResult[];
  patientInfo: PatientInfo;
  symptoms: Symptom[];
}

export function DiagnosisResults({
  results,
  patientInfo,
  symptoms
}: DiagnosisResultsProps) {
  const { toast } = useToast();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showHospitalFinder, setShowHospitalFinder] = useState(false);

  const getSeverityColor = (severity: DiagnosisResult['severity']) => {
    switch (severity) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return '';
    }
  };

  const handleCopyToClipboard = async () => {
    const summary = `
Symptom Check Results (${format(new Date(), 'PPP')})
----------------------------------------
Patient: ${patientInfo.age} years old, ${patientInfo.gender}

Symptoms:
${symptoms.map(s => `- ${s.name} (${s.duration})`).join('\n')}

Top Possible Conditions:
${results.slice(0, 3).map(r => 
  `- ${r.disease.name} (${Math.round(r.confidence)}% match)`
).join('\n')}

Disclaimer: This is not medical advice. Please consult a healthcare professional.
    `.trim();

    await navigator.clipboard.writeText(summary);
    toast({
      title: "Copied to clipboard",
      description: "Summary has been copied to your clipboard",
    });
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const element = document.getElementById('diagnosis-results');
      if (!element) return;

      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      // Add header
      pdf.setFontSize(20);
      pdf.setTextColor(44, 62, 80);
      pdf.text('Vital Metrics - Symptom Check Results', pageWidth / 2, 15, { align: 'center' });
      
      // Add date
      pdf.setFontSize(12);
      pdf.setTextColor(127, 140, 141);
      pdf.text(format(new Date(), 'PPP'), pageWidth / 2, 25, { align: 'center' });
      
      // Add patient info
      pdf.setFontSize(14);
      pdf.setTextColor(44, 62, 80);
      pdf.text(`Patient Information`, 14, 40);
      pdf.setFontSize(12);
      pdf.setTextColor(75, 85, 99);
      pdf.text(`Age: ${patientInfo.age} years`, 14, 50);
      pdf.text(`Gender: ${patientInfo.gender}`, 14, 58);
      
      // Add symptoms
      pdf.setFontSize(14);
      pdf.setTextColor(44, 62, 80);
      pdf.text('Reported Symptoms', 14, 75);
      pdf.setFontSize(12);
      pdf.setTextColor(75, 85, 99);
      let yPos = 85;
      symptoms.forEach((symptom) => {
        pdf.text(`• ${symptom.name}${symptom.duration ? ` (${symptom.duration})` : ''}`, 20, yPos);
        yPos += 8;
      });
      
      // Add diagnosis results
      pdf.setFontSize(14);
      pdf.setTextColor(44, 62, 80);
      pdf.text('Possible Conditions', 14, yPos + 10);
      pdf.setFontSize(12);
      pdf.setTextColor(75, 85, 99);
      yPos += 20;
      results.forEach((result) => {
        pdf.text(`• ${result.disease.name} - ${Math.round(result.confidence)}% Match`, 20, yPos);
        if (result.disease.description) {
          pdf.setFontSize(10);
          const lines = pdf.splitTextToSize(result.disease.description, pageWidth - 40);
          lines.forEach((line: string) => {
            yPos += 6;
            pdf.text(line, 25, yPos);
          });
          pdf.setFontSize(12);
        }
        yPos += 12;
      });
      
      // Add disclaimer
      pdf.setFontSize(10);
      pdf.setTextColor(127, 140, 141);
      const disclaimer = 'This symptom checker is for educational purposes only and does not replace professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment.';
      const disclaimerLines = pdf.splitTextToSize(disclaimer, pageWidth - 28);
      yPos = Math.max(yPos + 20, pdf.internal.pageSize.getHeight() - 30);
      disclaimerLines.forEach((line: string) => {
        pdf.text(line, 14, yPos);
        yPos += 5;
      });
      
      pdf.save('vital-metrics-symptom-check.pdf');

      toast({
        title: "PDF Generated",
        description: "Your results have been downloaded as PDF",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate PDF",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-6">
      {showHospitalFinder ? (
        <HospitalFinder onClose={() => setShowHospitalFinder(false)} />
      ) : (
        <div id="diagnosis-results">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Diagnosis Results</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyToClipboard}
                  className="w-full sm:w-auto"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generatePDF}
                  disabled={isGeneratingPDF}
                  className="w-full sm:w-auto"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isGeneratingPDF ? "Generating..." : "Download PDF"}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setShowHospitalFinder(true)}
                  className="w-full sm:w-auto"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Hospitals
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Age</p>
                    <p className="font-medium">{patientInfo.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="font-medium capitalize">{patientInfo.gender}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Symptoms</p>
                  <div className="flex flex-wrap gap-2">
                    {symptoms.map((symptom) => (
                      <Badge
                        key={symptom.id}
                        variant={symptom.isRedFlag ? "destructive" : "default"}
                      >
                        {symptom.name}
                        {symptom.duration && (
                          <span className="ml-1 opacity-70">({symptom.duration})</span>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {results.map((result, index) => (
                <Card key={result.disease.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="space-y-1">
                        <h4 className="font-semibold">
                          {result.disease.name}
                          {index === 0 && (
                            <Badge className="ml-2">Most Likely</Badge>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {result.disease.description}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getSeverityColor(result.severity)}`}
                      >
                        {Math.round(result.confidence)}% Match
                      </Badge>
                    </div>

                    <Progress
                      value={result.confidence}
                      className="h-2"
                    />

                    <div className="mt-6 space-y-6">
                      {/* Duration and Risk Level */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {result.disease.commonDurations && (
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <h5 className="font-semibold mb-2 flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Common Duration
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {result.disease.commonDurations.map(duration => (
                                <Badge key={duration} variant="outline">
                                  {duration}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {result.disease.riskAssessment && (
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <h5 className="font-semibold mb-2 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4" />
                              Risk Assessment
                            </h5>
                            <div className="space-y-2">
                              {result.disease.riskAssessment.highRisk && (
                                <div>
                                  <Badge variant="destructive" className="mb-1">High Risk</Badge>
                                  <ul className="text-sm list-disc list-inside">
                                    {result.disease.riskAssessment.highRisk.map(risk => (
                                      <li key={risk}>{risk}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Risk Factors */}
                      {result.disease.riskFactors && result.disease.riskFactors.length > 0 && (
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h5 className="font-semibold mb-3 flex items-center gap-2">
                            <ShieldAlert className="h-4 w-4" />
                            Risk Factors
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {result.disease.riskFactors.map(factor => (
                              <Badge key={factor} variant="secondary">
                                {factor.replace(/-/g, ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Treatment */}
                      {result.disease.treatment && (
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h5 className="font-semibold mb-3 flex items-center gap-2">
                            <Stethoscope className="h-4 w-4" />
                            Treatment Plan
                          </h5>
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            {result.disease.treatment.split('\n').map((line, index) => (
                              <p key={index} className="my-1">{line}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Prevention */}
                      {result.disease.preventiveMeasures && (
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h5 className="font-semibold mb-3 flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Preventive Measures
                          </h5>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {result.disease.preventiveMeasures.map((measure, index) => (
                              <li key={index}>{measure}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Additional Resources */}
                      {result.disease.additionalResources && (
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h5 className="font-semibold mb-3 flex items-center gap-2">
                            <Link className="h-4 w-4" />
                            Additional Resources
                          </h5>
                          <div className="grid gap-2">
                            {result.disease.additionalResources.map((resource, index) => (
                              <a
                                key={index}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-primary hover:underline"
                              >
                                <ExternalLink className="h-3 w-3" />
                                {resource.name}
                                <Badge variant="outline" className="text-xs">
                                  {resource.type}
                                </Badge>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {result.requiresUrgentCare && (
                      <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <p className="text-sm">
                          {result.disease.whenToSeekCare || 'This condition may require urgent medical attention'}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
      <Card className="bg-muted">
        <CardContent className="pt-6">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-1 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              This symptom checker is for educational purposes only and does not replace professional medical advice.
              Always consult with a qualified healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
