import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Reference {
  title: string;
  url: string;
  source: string;
  year?: string;
}

interface ReferencesProps {
  references: Reference[];
}

export function References({ references }: ReferencesProps) {
  if (!references.length) return null;

  return (
    <div className="mt-8 pt-6 border-t">
      <h3 className="text-lg font-semibold mb-4">References & Sources</h3>
      <div className="space-y-3">
        {references.map((ref, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="text-sm text-muted-foreground">[{index + 1}]</span>
            <div>
              <p className="text-sm">
                {ref.title}
                {ref.year && ` (${ref.year})`}
              </p>
              <p className="text-xs text-muted-foreground">{ref.source}</p>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs"
                asChild
              >
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  View Source
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 