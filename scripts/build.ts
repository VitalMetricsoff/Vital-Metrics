const { generateSitemap } = require('../src/utils/generate-sitemap');
const { generateRSS } = require('../src/utils/generate-rss');

// Generate sitemap and RSS feed
generateSitemap();
generateRSS();

console.log('Generated sitemap.xml and rss.xml'); 