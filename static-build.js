#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Make sure we're using static data
console.log('\n🔧 Setting up for static build...');

// Create .env to ensure static data is used
fs.writeFileSync('.env', 'VITE_USE_STATIC_DATA=true\n');
console.log('✅ Created .env file with VITE_USE_STATIC_DATA=true');

// Modify staticClient.ts to always use static data
const staticClientPath = './client/src/lib/staticClient.ts';
let staticClientContent = fs.readFileSync(staticClientPath, 'utf8');
staticClientContent = staticClientContent.replace(
  'export const useStaticData = true;',
  'export const useStaticData = true; // Always use static data for deployment'
);
fs.writeFileSync(staticClientPath, staticClientContent);
console.log('✅ Updated staticClient.ts to always use static data');

// Ensure product images have correct relative paths
const staticDataPath = './client/src/lib/staticData.ts';
let staticDataContent = fs.readFileSync(staticDataPath, 'utf8');

// Fix image paths by ensuring they start with './'
staticDataContent = staticDataContent.replace(/"images\//g, '"./images/');
fs.writeFileSync(staticDataPath, staticDataContent);
console.log('✅ Fixed image paths in staticData.ts');

// Build the project
console.log('\n🏗️ Building the project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}

// Copy all the images to the dist folder
console.log('\n📦 Copying images and assets...');
const publicImagesDir = './client/public/images';
const distImagesDir = './dist/images';

if (!fs.existsSync(distImagesDir)) {
  fs.mkdirSync(distImagesDir, { recursive: true });
}

// Copy all images
fs.readdirSync(publicImagesDir).forEach(file => {
  fs.copyFileSync(
    path.join(publicImagesDir, file),
    path.join(distImagesDir, file)
  );
});
console.log('✅ Copied all images to dist folder');

// Copy the 200.html and .htaccess files
const publicDir = './client/public';
const distDir = './dist';

['200.html', '.htaccess', 'vercel.json'].forEach(file => {
  if (fs.existsSync(path.join(publicDir, file))) {
    fs.copyFileSync(
      path.join(publicDir, file),
      path.join(distDir, file)
    );
  }
});
console.log('✅ Copied 200.html, .htaccess, and vercel.json to dist folder');

// Create a 404.html file
fs.copyFileSync(
  path.join(distDir, 'index.html'),
  path.join(distDir, '404.html')
);
console.log('✅ Created 404.html file');

// Create directories for client-side routing
['product', 'products', 'cart', 'checkout', 'contact', 'category', 'search'].forEach(dir => {
  const fullDir = path.join(distDir, dir);
  if (!fs.existsSync(fullDir)) {
    fs.mkdirSync(fullDir, { recursive: true });
  }
  
  // Copy index.html to each directory
  fs.copyFileSync(
    path.join(distDir, 'index.html'),
    path.join(fullDir, 'index.html')
  );
});
console.log('✅ Created directories for client-side routing');

console.log('\n🎉 Static build is complete! You can now deploy the dist folder.');