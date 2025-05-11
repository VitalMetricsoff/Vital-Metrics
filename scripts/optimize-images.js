import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../public/blog');
const IMAGE_SIZES = [640, 1024, 1280];

async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const baseName = path.basename(filePath, ext);
    const dir = path.dirname(filePath);

    // Only process supported formats
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      console.log(`Skipping ${filePath} - unsupported format ${ext}`);
      return;
    }

    // Generate WebP versions
    for (const width of IMAGE_SIZES) {
      try {
        await sharp(filePath)
          .resize(width, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(path.join(dir, `${baseName}-${width}.webp`));
        console.log(`Generated ${width}px WebP version of ${path.basename(filePath)}`);
      } catch (err) {
        console.error(`Error generating WebP version for ${filePath}:`, err.message);
      }
    }

    // Generate AVIF versions
    for (const width of IMAGE_SIZES) {
      try {
        await sharp(filePath)
          .resize(width, null, { withoutEnlargement: true })
          .avif({ quality: 65 })
          .toFile(path.join(dir, `${baseName}-${width}.avif`));
        console.log(`Generated ${width}px AVIF version of ${path.basename(filePath)}`);
      } catch (err) {
        console.error(`Error generating AVIF version for ${filePath}:`, err.message);
      }
    }

    // Optimize original
    try {
      await sharp(filePath)
        .resize(1280, null, { withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true })
        .toFile(path.join(dir, `${baseName}-optimized${ext}`));
      console.log(`Optimized original ${path.basename(filePath)}`);
    } catch (err) {
      console.error(`Error optimizing original ${filePath}:`, err.message);
    }
  } catch (err) {
    console.error(`Failed to process ${filePath}:`, err.message);
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      console.log(`Optimizing ${file}...`);
      await optimizeImage(filePath);
    }
  }
}

// Run optimization
processDirectory(BLOG_DIR).catch(console.error);
