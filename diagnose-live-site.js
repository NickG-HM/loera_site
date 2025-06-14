#!/usr/bin/env node

import fs from 'fs';
import { execSync } from 'child_process';

console.log('🔍 Live Site Diagnostic Script');
console.log('==============================\n');

// Check current build
function checkCurrentBuild() {
  console.log('1️⃣ Checking current build...');
  
  const indexPath = 'dist/public/index.html';
  if (!fs.existsSync(indexPath)) {
    console.log('   ❌ No build found, creating fresh build...');
    try {
      execSync('npm run build:frontend', { stdio: 'pipe' });
      execSync('echo "loera.store" > dist/public/CNAME', { stdio: 'pipe' });
      console.log('   ✅ Fresh build created');
    } catch (error) {
      console.log('   ❌ Build failed:', error.message);
      return false;
    }
  }
  
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  console.log('   📄 Index.html analysis:');
  
  // Check for critical elements
  const hasRootDiv = indexContent.includes('<div id="root">');
  const hasJSScript = indexContent.match(/<script[^>]*src="([^"]*\.js)"[^>]*>/);
  const hasCSSLink = indexContent.match(/<link[^>]*href="([^"]*\.css)"[^>]*>/);
  
  console.log(`   ${hasRootDiv ? '✅' : '❌'} Root div present`);
  console.log(`   ${hasJSScript ? '✅' : '❌'} JS script: ${hasJSScript ? hasJSScript[1] : 'MISSING'}`);
  console.log(`   ${hasCSSLink ? '✅' : '❌'} CSS link: ${hasCSSLink ? hasCSSLink[1] : 'MISSING'}`);
  
  // Check for absolute vs relative paths
  const absoluteAssetPaths = indexContent.match(/(?:src|href)="\/[^"]*\.(js|css|png|jpg|svg)"/g);
  if (absoluteAssetPaths) {
    console.log(`   ❌ Found absolute asset paths: ${absoluteAssetPaths.join(', ')}`);
    return false;
  } else {
    console.log('   ✅ All asset paths are relative');
  }
  
  // Check if assets exist
  if (hasJSScript) {
    const jsPath = `dist/public/${hasJSScript[1]}`;
    const jsExists = fs.existsSync(jsPath);
    console.log(`   ${jsExists ? '✅' : '❌'} JS file exists: ${jsExists}`);
    if (!jsExists) return false;
  }
  
  if (hasCSSLink) {
    const cssPath = `dist/public/${hasCSSLink[1]}`;
    const cssExists = fs.existsSync(cssPath);
    console.log(`   ${cssExists ? '✅' : '❌'} CSS file exists: ${cssExists}`);
    if (!cssExists) return false;
  }
  
  console.log('');
  return true;
}

// Check GitHub Pages specific issues
function checkGitHubPagesIssues() {
  console.log('2️⃣ Checking GitHub Pages specific issues...');
  
  // Check CNAME
  const cnameExists = fs.existsSync('dist/public/CNAME');
  const rootCnameExists = fs.existsSync('CNAME');
  
  console.log(`   ${cnameExists ? '✅' : '❌'} CNAME in dist/public: ${cnameExists}`);
  console.log(`   ${rootCnameExists ? '✅' : '❌'} CNAME in root: ${rootCnameExists}`);
  
  if (cnameExists) {
    const cnameContent = fs.readFileSync('dist/public/CNAME', 'utf8').trim();
    console.log(`   📝 CNAME content: "${cnameContent}"`);
    if (cnameContent !== 'loera.store') {
      console.log('   ❌ CNAME content incorrect');
      return false;
    }
  }
  
  // Check for Jekyll bypass
  const nojekyllExists = fs.existsSync('dist/public/.nojekyll');
  console.log(`   ${nojekyllExists ? '✅' : '❌'} .nojekyll file: ${nojekyllExists}`);
  
  if (!nojekyllExists) {
    console.log('   🔧 Creating .nojekyll file...');
    fs.writeFileSync('dist/public/.nojekyll', '');
    console.log('   ✅ .nojekyll file created');
  }
  
  console.log('');
  return true;
}

// Check for SPA routing issues
function checkSPARouting() {
  console.log('3️⃣ Checking SPA routing...');
  
  const indexPath = 'dist/public/index.html';
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Check for SPA routing script
  const hasSPAScript = indexContent.includes('spa-github-pages') || indexContent.includes('l.search[1]');
  console.log(`   ${hasSPAScript ? '✅' : '❌'} SPA routing script present`);
  
  // Check for 404.html
  const has404 = fs.existsSync('dist/public/404.html');
  console.log(`   ${has404 ? '✅' : '❌'} 404.html exists`);
  
  if (!has404) {
    console.log('   🔧 Creating 404.html...');
    const html404 = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>LOÉRA</title>
  <script type="text/javascript">
    var pathSegmentsToKeep = 0;
    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>
<body>
</body>
</html>`;
    fs.writeFileSync('dist/public/404.html', html404);
    console.log('   ✅ 404.html created');
  }
  
  console.log('');
  return true;
}

// Check for React/Vite specific issues
function checkReactViteIssues() {
  console.log('4️⃣ Checking React/Vite specific issues...');
  
  // Check vite.config.ts
  const viteConfigPath = 'vite.config.ts';
  const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
  
  const hasCorrectBase = viteConfig.includes('base: "./"');
  const hasCorrectOutDir = viteConfig.includes('dist/public');
  
  console.log(`   ${hasCorrectBase ? '✅' : '❌'} Correct base path in vite.config.ts`);
  console.log(`   ${hasCorrectOutDir ? '✅' : '❌'} Correct output directory`);
  
  // Check for potential import issues
  const indexPath = 'dist/public/index.html';
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Look for module script
  const hasModuleScript = indexContent.includes('type="module"');
  console.log(`   ${hasModuleScript ? '✅' : '❌'} Module script present`);
  
  // Check for crossorigin attribute
  const hasCrossorigin = indexContent.includes('crossorigin');
  console.log(`   ${hasCrossorigin ? '✅' : '❌'} Crossorigin attribute present`);
  
  console.log('');
  return hasCorrectBase && hasCorrectOutDir && hasModuleScript;
}

// Create a test HTML file to verify basic functionality
function createTestFile() {
  console.log('5️⃣ Creating test file...');
  
  const testHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>LOÉRA Test</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      text-align: center; 
      padding: 50px;
      background: #f0f0f0;
    }
    .test-box {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      max-width: 500px;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <div class="test-box">
    <h1>🧪 LOÉRA Site Test</h1>
    <p>If you can see this, the basic HTML is working!</p>
    <p>Domain: <strong>${typeof window !== 'undefined' ? window.location.hostname : 'loera.store'}</strong></p>
    <p>Time: <strong>${new Date().toISOString()}</strong></p>
    <script>
      console.log('✅ JavaScript is working!');
      console.log('Current URL:', window.location.href);
      console.log('User Agent:', navigator.userAgent);
      
      // Test if we can access the root div
      setTimeout(() => {
        const rootDiv = document.getElementById('root');
        if (rootDiv) {
          console.log('✅ Root div found');
        } else {
          console.log('❌ Root div not found');
        }
      }, 100);
    </script>
    <div id="root"></div>
  </div>
</body>
</html>`;
  
  fs.writeFileSync('dist/public/test.html', testHTML);
  console.log('   ✅ Test file created at /test.html');
  console.log('   🌐 Visit: https://loera.store/test.html');
  console.log('');
}

// Apply all fixes
function applyFixes() {
  console.log('🔧 APPLYING ALL FIXES...');
  console.log('========================\n');
  
  // Fix 1: Ensure .nojekyll exists
  if (!fs.existsSync('dist/public/.nojekyll')) {
    fs.writeFileSync('dist/public/.nojekyll', '');
    console.log('✅ Created .nojekyll');
  }
  
  // Fix 2: Ensure CNAME is correct
  fs.writeFileSync('dist/public/CNAME', 'loera.store');
  console.log('✅ Updated CNAME');
  
  // Fix 3: Rebuild with fresh settings
  console.log('🔧 Rebuilding...');
  try {
    execSync('npm run build:frontend', { stdio: 'pipe' });
    fs.writeFileSync('dist/public/CNAME', 'loera.store');
    fs.writeFileSync('dist/public/.nojekyll', '');
    console.log('✅ Rebuild complete');
  } catch (error) {
    console.log('❌ Rebuild failed:', error.message);
  }
  
  console.log('');
}

// Main execution
async function main() {
  const checks = [
    checkCurrentBuild(),
    checkGitHubPagesIssues(),
    checkSPARouting(),
    checkReactViteIssues()
  ];
  
  createTestFile();
  
  const allPassed = checks.every(check => check);
  
  if (!allPassed) {
    console.log('❌ Issues found, applying fixes...\n');
    applyFixes();
  }
  
  console.log('📊 FINAL RECOMMENDATIONS:');
  console.log('=========================');
  console.log('1. 🌐 Test basic functionality: https://loera.store/test.html');
  console.log('2. 🔍 Check browser console for errors on main site');
  console.log('3. 📱 Try different browsers/devices');
  console.log('4. ⏰ Wait 5-10 minutes for GitHub Pages cache to clear');
  console.log('');
  console.log('🚀 If test.html works but main site doesn\'t:');
  console.log('   - The issue is with React/JavaScript loading');
  console.log('   - Check browser console for specific errors');
  console.log('   - Verify all asset paths are working');
  console.log('');
  console.log('📝 Next steps:');
  console.log('   git add .');
  console.log('   git commit -m "Add GitHub Pages fixes and test file"');
  console.log('   git push origin main');
}

main().catch(console.error); 