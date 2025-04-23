import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function generateSitemap() {
  const baseUrl = 'https://vitalmetrics.in';
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add main pages
  const mainPages = [
    { url: '/', priority: '1.0' },
    { url: '/founder', priority: '0.8' },
    { url: '/calculators', priority: '0.9' },
    { url: '/about', priority: '0.7' },
    { url: '/contact', priority: '0.6' },
    { url: '/privacy-policy', priority: '0.5' },
    { url: '/terms-of-service', priority: '0.5' }
  ];

  mainPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add calculator pages
  const calculatorCategories = [
    'body-metrics',
    'fitness-metabolism',
    'cardio-vitals',
    'nutrition-metabolic',
    'diabetes-blood-sugar',
    'pregnancy-fertility',
    'lungs-life-expectancy',
    'mental-sleep',
    'other-tools'
  ];

  calculatorCategories.forEach(category => {
    sitemap += `
  <url>
    <loc>${baseUrl}/calculators/${category}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  sitemap += '\n</urlset>';

  // Write sitemap to public directory
  fs.writeFileSync(join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
}

function generateRSS() {
  const baseUrl = 'https://vitalmetrics.in';
  const today = new Date().toISOString();
  
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>VitalMetrics Updates</title>
    <link>${baseUrl}</link>
    <description>Latest updates and new calculators from VitalMetrics</description>
    <language>en-us</language>
    <lastBuildDate>${today}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />`;

  // Add category updates
  const categories = [
    { name: 'Body Metrics', slug: 'body-metrics' },
    { name: 'Fitness & Metabolism', slug: 'fitness-metabolism' },
    { name: 'Cardio & Vitals', slug: 'cardio-vitals' },
    { name: 'Nutrition & Metabolic', slug: 'nutrition-metabolic' },
    { name: 'Diabetes & Blood Sugar', slug: 'diabetes-blood-sugar' },
    { name: 'Pregnancy & Fertility', slug: 'pregnancy-fertility' },
    { name: 'Lungs & Life Expectancy', slug: 'lungs-life-expectancy' },
    { name: 'Mental & Sleep', slug: 'mental-sleep' },
    { name: 'Other Tools', slug: 'other-tools' }
  ];

  categories.forEach(category => {
    rss += `
    <item>
      <title>${category.name} Calculators</title>
      <link>${baseUrl}/calculators/${category.slug}</link>
      <description>Medical calculators in the ${category.name} category</description>
      <pubDate>${today}</pubDate>
      <guid>${baseUrl}/calculators/${category.slug}</guid>
    </item>`;
  });

  rss += `
  </channel>
</rss>`;

  // Write RSS feed to public directory
  fs.writeFileSync(join(process.cwd(), 'public', 'rss.xml'), rss);
}

// Generate sitemap and RSS feed
generateSitemap();
generateRSS();

console.log('Generated sitemap.xml and rss.xml'); 