const { calculators } = require('@/data/calculators');
const fs = require('fs');
const path = require('path');

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

  // Add calculator updates
  calculators.forEach(calculator => {
    rss += `
    <item>
      <title>${calculator.name}</title>
      <link>${baseUrl}/calculator/${calculator.slug}</link>
      <description>${calculator.description}</description>
      <pubDate>${today}</pubDate>
      <guid>${baseUrl}/calculator/${calculator.slug}</guid>
    </item>`;
  });

  rss += `
  </channel>
</rss>`;

  // Write RSS feed to public directory
  fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), rss);
}

module.exports = { generateRSS }; 