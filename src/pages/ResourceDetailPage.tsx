import { useParams, useSearchParams } from "react-router-dom";
import { healthResources } from "@/data/resources";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function ResourceDetailPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const currentPage = parseInt(page);
  
  const resource = healthResources.find(r => r.slug === slug);
  const pages = resource?.pages || [];
  const totalPages = pages.length;
  const currentContent = pages[currentPage - 1];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  if (!resource) {
    return (
      <div className="container px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Resource not found</h1>
        <Link to="/resources">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Button>
        </Link>
      </div>
    );
  }

  const Icon = resource.icon;

  return (
    <>
      <Helmet>
        <title>{resource.title} | VitalMetrics Resources</title>
        <meta name="description" content={resource.description} />
        <meta
          name="keywords"
          content={`${resource.category}, health resources, WHO guidelines, ${resource.title.toLowerCase()}, health information`}
        />
        <link rel="canonical" href={`https://vitalmetrics.in/resources/${slug}`} />
        <meta property="og:title" content={`${resource.title} | VitalMetrics Resources`} />
        <meta property="og:description" content={resource.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://vitalmetrics.in/resources/${slug}`} />
      </Helmet>

      <div className="container max-w-4xl px-4 py-8 md:py-12">
        <div className="mb-8">
          <Link to="/resources">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <Badge variant="secondary" className="mb-2">
                {resource.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {resource.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <Button variant="ghost" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          {totalPages > 1 && (
            <div className="mb-8">
              <Tabs value={currentPage.toString()} onValueChange={(value) => handlePageChange(parseInt(value))}>
                <TabsList className="w-full justify-start h-auto flex-wrap gap-2 bg-transparent p-0">
                  {pages.map((_, index) => (
                    <TabsTrigger
                      key={index + 1}
                      value={(index + 1).toString()}
                      className={cn(
                        "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                        "border border-input"
                      )}
                    >
                      Page {index + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          )}
        </div>

        <div className={cn(
          "prose dark:prose-invert max-w-none",
          "prose-headings:scroll-mt-20 prose-headings:font-heading",
          "prose-h1:text-3xl prose-h1:font-bold prose-h2:text-2xl prose-h2:font-semibold prose-h3:text-xl prose-h3:font-medium",
          "prose-p:text-base prose-p:leading-7",
          "prose-li:text-base prose-li:leading-7",
          "prose-code:text-sm prose-code:font-mono prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
          "prose-blockquote:border-l-4 prose-blockquote:border-muted",
          "prose-img:rounded-lg prose-img:border prose-img:border-muted",
          "prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
        )}>
          {currentContent && <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentContent}</ReactMarkdown>}

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous Page
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next Page
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>

        <div className="mt-12 pt-6 border-t">
          <h2 className="text-lg font-semibold mb-2">Disclaimer</h2>
          <p className="text-sm text-muted-foreground">
            This information is for educational purposes only and is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </div>
      </div>
    </>
  );
}
