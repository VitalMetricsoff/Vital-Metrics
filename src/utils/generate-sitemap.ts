const { calculators } = require('@/data/calculators');
const fs = require('fs');
const path = require('path');

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
  calculators.forEach(calculator => {
    sitemap += `
  <url>
    <loc>${baseUrl}/calculator/${calculator.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  sitemap += '\n</urlset>';

  // Write sitemap to public directory
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
}

module.exports = { generateSitemap }; 