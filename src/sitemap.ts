import { calculators } from "@/data/calculators";
import { categoryLabels } from "@/types/calculator";

export const siteConfig = {
  name: "VitalMetrics",
  url: "https://vitalmetrics.in", // Updated domain
  description: "Comprehensive health and fitness calculators for your wellbeing",
};

export const generateSiteLinks = () => {
  const categories = [...new Set(calculators.map(calc => calc.category))];
  
  const siteLinks = [
    {
      name: "Home",
      url: "/",
      priority: 1.0,
      children: []
    },
    {
      name: "Symptom Checker",
      url: "/symptom-checker",
      priority: 0.9,
      children: []
    },
    {
      name: "All Calculators",
      url: "/calculators",
      priority: 0.9,
      children: categories.map(category => ({
        name: categoryLabels[category],
        url: `/calculators?category=${category}`,
        priority: 0.8,
        children: calculators
          .filter(calc => calc.category === category)
          .map(calc => ({
            name: calc.name,
            url: `/calculator/${calc.slug}`,
            priority: 0.7,
            children: []
          }))
      }))
    },
    {
      name: "Health Resources",
      url: "/resources",
      priority: 0.8,
      children: []
    },
    {
      name: "About",
      url: "/about",
      priority: 0.6,
      children: []
    },
    {
      name: "Privacy Policy",
      url: "/privacy",
      priority: 0.5,
      children: []
    },
    {
      name: "Terms of Service",
      url: "/terms",
      priority: 0.5,
      children: []
    }
  ];

  return siteLinks;
};

export const generateSitemapXML = () => {
  const baseUrl = siteConfig.url;
  const siteLinks = generateSiteLinks();
  const today = new Date().toISOString();

  const generateUrlEntry = (link: any) => {
    return `
      <url>
        <loc>${baseUrl}${link.url}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${link.url === '/' ? 'daily' : 'weekly'}</changefreq>
        <priority>${link.priority}</priority>
      </url>
      ${link.children.map(child => generateUrlEntry(child)).join('')}
    `;
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${siteLinks.map(link => generateUrlEntry(link)).join('')}
    </urlset>
  `;
};

export const generateStructuredData = (currentPath: string) => {
  const siteLinks = generateSiteLinks();
  
  const findCurrentPage = (links: any[], path: string): any => {
    for (const link of links) {
      if (link.url === path) return link;
      const found = findCurrentPage(link.children, path);
      if (found) return found;
    }
    return null;
  };

  const currentPage = findCurrentPage(siteLinks, currentPath);
  
  if (!currentPage) return null;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "description": siteConfig.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/calculators?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "siteNavigationElement": siteLinks.map(link => ({
      "@type": "SiteNavigationElement",
      "name": link.name,
      "url": `${siteConfig.url}${link.url}`
    }))
  };
}; 