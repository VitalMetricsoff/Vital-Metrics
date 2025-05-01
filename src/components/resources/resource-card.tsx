import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
  readTime: string;
  category: string;
}

export function ResourceCard({ title, description, icon, slug, readTime, category }: ResourceCardProps) {
  return (
    <Link to={`/resources/${slug}`}>
      <Card className="group h-full transition-all duration-200 hover:shadow-lg dark:hover:shadow-blue-900/20">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span className="bg-primary/10 dark:bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
              {category}
            </span>
            <span className="text-xs">{readTime} read</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
              {icon}
            </div>
            <div>
              <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                {title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-primary text-sm font-medium">
            Read More <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
