import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface RelatedToolsProps {
  tools: Array<{
    name: string;
    path: string;
    description: string;
  }>;
}

export function RelatedTools({ tools }: RelatedToolsProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Related Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <Link to={tool.path}>
              <CardHeader>
                <CardTitle>{tool.name}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
