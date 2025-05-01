interface ClinicalContentProps {
  introduction: string;
  methodology: string;
  interpretation: string;
  limitations: string[];
  references: Array<{
    title: string;
    authors: string[];
    journal: string;
    year: number;
    doi?: string;
  }>;
}

export function ClinicalContent({
  introduction,
  methodology,
  interpretation,
  limitations,
  references
}: ClinicalContentProps) {
  return (
    <section className="prose prose-slate max-w-none mb-8">
      <h2 className="text-2xl font-semibold mb-4">Clinical Information</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Overview</h3>
        <p>{introduction}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Methodology</h3>
        <p>{methodology}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Interpretation</h3>
        <p>{interpretation}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Limitations</h3>
        <ul className="list-disc pl-6">
          {limitations.map((limitation, index) => (
            <li key={index}>{limitation}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-2">References</h3>
        <ol className="list-decimal pl-6">
          {references.map((ref, index) => (
            <li key={index} className="mb-2">
              {ref.authors.join(', ')}. {ref.title}. {ref.journal}. {ref.year}.
              {ref.doi && (
                <a
                  href={`https://doi.org/${ref.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  DOI: {ref.doi}
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
