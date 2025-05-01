import { healthResources } from "@/data/resources";
import { ResourceCard } from "@/components/resources/resource-card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = [...new Set(healthResources.map(resource => resource.category))];

  const filteredResources = healthResources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Health Resources - Evidence-based Health Information | VitalMetrics</title>
        <meta
          name="description"
          content="Access reliable, WHO-based health resources covering nutrition, fitness, mental health, and more. Get expert guidance for better health understanding."
        />
        <meta
          name="keywords"
          content="health resources, WHO guidelines, nutrition guide, mental health, physical activity, heart health, wellness tips"
        />
        <link rel="canonical" href="https://vitalmetrics.in/resources" />
        <meta property="og:title" content="Health Resources - Evidence-based Health Information" />
        <meta property="og:description" content="Access reliable, WHO-based health resources for better health understanding." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vitalmetrics.in/resources" />
      </Helmet>

      <div className="container px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge variant="outline" className="mb-4">Health Resources</Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Evidence-Based Health Information
          </h1>
          <p className="text-lg text-muted-foreground">
            Access reliable health resources based on WHO guidelines to make informed decisions about your health and wellness.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search resources..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => setSearchQuery(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((resource) => {
            const Icon = resource.icon;
            return (
              <ResourceCard
                key={resource.slug}
                {...resource}
                icon={<Icon className="h-5 w-5 text-primary" />}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
