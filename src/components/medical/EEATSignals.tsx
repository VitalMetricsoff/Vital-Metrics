import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, GraduationCap, BookOpen, AlertCircle } from 'lucide-react';

interface Reference {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
}

interface ReviewerInfo {
  name: string;
  credentials: string;
  affiliation?: string;
}

interface EEATSignalsProps {
  lastReviewed: string;
  reviewedBy: ReviewerInfo;
  medicalReferences: Reference[];
  limitations?: string[];
}

export function EEATSignals({ lastReviewed, reviewedBy, medicalReferences, limitations }: EEATSignalsProps) {
  return (
    <div className="space-y-6 mt-8">
      {/* Reviewer Information */}
      <Card className="bg-blue-50/50 dark:bg-blue-950/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-lg">Medical Review</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Reviewed by:</span> {reviewedBy.name}, {reviewedBy.credentials}
            </p>
            {reviewedBy.affiliation && (
              <p className="text-sm text-muted-foreground">{reviewedBy.affiliation}</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Last reviewed: {new Date(lastReviewed).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical References */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Medical References</h3>
          </div>
          <div className="space-y-4">
            {medicalReferences.map((reference, index) => (
              <div key={index} className="text-sm">
                <p className="font-medium mb-1">{reference.title}</p>
                <p className="text-muted-foreground">
                  {reference.authors.join(', ')}
                </p>
                <p className="text-muted-foreground">
                  {reference.journal} ({reference.year})
                </p>
                {reference.doi && (
                  <a
                    href={`https://doi.org/${reference.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    DOI: {reference.doi}
                  </a>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Limitations */}
      {limitations && limitations.length > 0 && (
        <Card className="bg-yellow-50/50 dark:bg-yellow-950/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <h3 className="font-semibold text-lg">Limitations & Considerations</h3>
            </div>
            <ul className="list-disc list-inside space-y-2">
              {limitations.map((limitation, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {limitation}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
