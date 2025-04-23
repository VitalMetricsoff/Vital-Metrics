import fs from 'fs';
import path from 'path';
import { generateSitemapXML } from '../src/sitemap';

const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');

// Generate sitemap XML
const sitemap = generateSitemapXML();

// Ensure the public directory exists
if (!fs.existsSync(path.dirname(outputPath))) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
}

// Write the sitemap file
fs.writeFileSync(outputPath, sitemap);

console.log(`Sitemap generated at ${outputPath}`); 