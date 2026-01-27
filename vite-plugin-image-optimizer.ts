import type { Plugin } from 'vite';
import sharp from 'sharp';
import { readdir, stat, mkdir, copyFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

interface ImageOptimizerOptions {
  inputDir: string;
  outputDir: string;
  quality?: number;
  webpQuality?: number;
}

export function imageOptimizer(options: ImageOptimizerOptions): Plugin {
  const {
    inputDir,
    outputDir,
    quality = 85,
    webpQuality = 80,
  } = options;

  return {
    name: 'vite-plugin-image-optimizer',
    apply: 'build',
    async buildStart() {
      if (!existsSync(inputDir)) {
        console.warn(`Image optimizer: Input directory ${inputDir} does not exist`);
        return;
      }

      // Ensure output directory exists
      if (!existsSync(outputDir)) {
        await mkdir(outputDir, { recursive: true });
      }

      console.log('🖼️  Optimizing images...');

      try {
        await processImages(inputDir, outputDir, quality, webpQuality);
        console.log('✅ Image optimization complete');
      } catch (error) {
        console.error('❌ Image optimization failed:', error);
      }
    },
  };
}

async function processImages(
  inputDir: string,
  outputDir: string,
  quality: number,
  webpQuality: number
) {
  const files = await readdir(inputDir, { recursive: true });

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const stats = await stat(inputPath);

    if (!stats.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      // Copy non-image files as-is
      const outputPath = path.join(outputDir, file);
      const outputDirPath = path.dirname(outputPath);
      if (!existsSync(outputDirPath)) {
        await mkdir(outputDirPath, { recursive: true });
      }
      await copyFile(inputPath, outputPath);
      continue;
    }

    const outputPath = path.join(outputDir, file);
    const outputDirPath = path.dirname(outputPath);
    if (!existsSync(outputDirPath)) {
      await mkdir(outputDirPath, { recursive: true });
    }

    // Optimize original image
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Resize if too large (max 2000px on longest side)
    if (metadata.width && metadata.height) {
      const maxDimension = 2000;
      if (metadata.width > maxDimension || metadata.height > maxDimension) {
        image.resize(maxDimension, maxDimension, {
          fit: 'inside',
          withoutEnlargement: true,
        });
      }
    }

    // Optimize and save original format
    if (ext === '.png') {
      await image.png({ quality, compressionLevel: 9 }).toFile(outputPath);
    } else {
      await image.jpeg({ quality, mozjpeg: true }).toFile(outputPath);
    }

    // Generate WebP version
    const webpPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    await image
      .webp({ quality: webpQuality })
      .toFile(webpPath);

    console.log(`  ✓ Optimized: ${file} → ${path.basename(outputPath)} + ${path.basename(webpPath)}`);
  }
}
