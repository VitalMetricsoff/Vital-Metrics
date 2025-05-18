import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];
const IMAGE_QUALITY = 80;

async function optimizeImages(directory) {
  try {
    const files = await fs.readdir(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = await fs.stat(filePath);
      
      if (stats.isDirectory()) {
        await optimizeImages(filePath);
        continue;
      }
      
      const ext = path.extname(file).toLowerCase();
      if (!SUPPORTED_FORMATS.includes(ext)) continue;
      
      const webpPath = filePath.replace(ext, '.webp');
      
      // Skip if WebP version already exists
      try {
        await fs.access(webpPath);
        continue;
      } catch {
        // WebP doesn't exist, create it
      }
      
      await sharp(filePath)
        .webp({ quality: IMAGE_QUALITY })
        .toFile(webpPath);
        
      console.log(`Converted ${file} to WebP`);
    }
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

// Optimize images in public directory
optimizeImages(path.join(__dirname, '../public'));
