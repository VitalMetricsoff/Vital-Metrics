import { calculators } from '../data/calculators';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateSitemap() {
  const baseUrl = 'https://vitalmetrics.in';
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add main pages
  const mainPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/founder', priority: '0.8', changefreq: 'monthly' },
    { url: '/calculators', priority: '0.9', changefreq: 'weekly' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.6', changefreq: 'monthly' },
    { url: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
    { url: '/terms-of-service', priority: '0.5', changefreq: 'yearly' }
  ];

  mainPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Get unique categories
  const categories = [...new Set(calculators.map(calc => calc.category))];

  // Add category pages
  categories.forEach(category => {
    sitemap += `
  <url>
    <loc>${baseUrl}/calculators/${category}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Add individual calculator pages
  calculators.forEach(calculator => {
    sitemap += `
  <url>
    <loc>${baseUrl}/calculators/${calculator.category}/${calculator.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  sitemap += '\n</urlset>';

  // Write sitemap to public directory
  const publicDir = path.join(process.cwd(), 'public');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

// Run the generator if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
} 