#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🔍 GitHub Pages Debugging Script');
console.log('================================\n');

const issues = [];
const fixes = [];

// 1. Check if build exists and is valid
function checkBuildOutput() {
  console.log('1️⃣ Checking build output...');
  
  const distPath = 'dist/public';
  const indexPath = path.join(distPath, 'index.html');
  
  if (!fs.existsSync(distPath)) {
    issues.push('❌ dist/public directory does not exist');
    fixes.push('Run: npm run build:frontend');
    return false;
  }
  
  if (!fs.existsSync(indexPath)) {
    issues.push('❌ index.html not found in dist/public');
    fixes.push('Run: npm run build:frontend');
    return false;
  }
  
  // Check index.html content
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Check for script and CSS tags
  const hasScript = indexContent.includes('<script') && indexContent.includes('.js');
  const hasCSS = indexContent.includes('<link') && indexContent.includes('.css');
  const hasRootDiv = indexContent.includes('<div id="root">');
  
  if (!hasScript) {
    issues.push('❌ No JavaScript files found in index.html');
  }
  if (!hasCSS) {
    issues.push('❌ No CSS files found in index.html');
  }
  if (!hasRootDiv) {
    issues.push('❌ No root div found in index.html');
  }
  
  // Check asset paths
  const absolutePaths = indexContent.match(/(?:src|href)="\/[^"]+"/g);
  if (absolutePaths && absolutePaths.length > 0) {
    issues.push(`❌ Found absolute paths in index.html: ${absolutePaths.join(', ')}`);
    fixes.push('Fix: Change base in vite.config.ts to "./"');
  }
  
  console.log(`   ✅ Build output exists`);
  console.log(`   ${hasScript ? '✅' : '❌'} JavaScript files: ${hasScript}`);
  console.log(`   ${hasCSS ? '✅' : '❌'} CSS files: ${hasCSS}`);
  console.log(`   ${hasRootDiv ? '✅' : '❌'} Root div: ${hasRootDiv}`);
  console.log(`   ${!absolutePaths ? '✅' : '❌'} Relative paths: ${!absolutePaths}\n`);
  
  return hasScript && hasCSS && hasRootDiv && !absolutePaths;
}

// 2. Check vite.config.ts
function checkViteConfig() {
  console.log('2️⃣ Checking vite.config.ts...');
  
  const configPath = 'vite.config.ts';
  if (!fs.existsSync(configPath)) {
    issues.push('❌ vite.config.ts not found');
    return false;
  }
  
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  const hasCorrectBase = configContent.includes('base: "./"') || configContent.includes("base: './'");
  const hasCorrectOutDir = configContent.includes('outDir: path.resolve(__dirname, "dist/public")');
  
  if (!hasCorrectBase) {
    issues.push('❌ vite.config.ts base should be "./" for GitHub Pages');
    fixes.push('Fix: Set base: "./" in vite.config.ts');
  }
  
  if (!hasCorrectOutDir) {
    issues.push('❌ vite.config.ts outDir should point to dist/public');
    fixes.push('Fix: Set outDir to dist/public in vite.config.ts');
  }
  
  console.log(`   ${hasCorrectBase ? '✅' : '❌'} Base path: ${hasCorrectBase ? '"./"' : 'incorrect'}`);
  console.log(`   ${hasCorrectOutDir ? '✅' : '❌'} Output directory: ${hasCorrectOutDir ? 'correct' : 'incorrect'}\n`);
  
  return hasCorrectBase && hasCorrectOutDir;
}

// 3. Check GitHub Actions workflow
function checkWorkflow() {
  console.log('3️⃣ Checking GitHub Actions workflow...');
  
  const workflowPath = '.github/workflows/deploy.yml';
  if (!fs.existsSync(workflowPath)) {
    issues.push('❌ GitHub Actions workflow not found');
    fixes.push('Create: .github/workflows/deploy.yml');
    return false;
  }
  
  const workflowContent = fs.readFileSync(workflowPath, 'utf8');
  
  const hasBuildStep = workflowContent.includes('npm run build:frontend');
  const hasCNAME = workflowContent.includes('echo "loera.store" > dist/public/CNAME');
  const hasCorrectPublishDir = workflowContent.includes("path: './dist/public'");
  const hasCorrectAction = workflowContent.includes('actions/deploy-pages@v4');
  
  if (!hasBuildStep) {
    issues.push('❌ Workflow missing build:frontend step');
  }
  if (!hasCNAME) {
    issues.push('❌ Workflow missing CNAME creation');
  }
  if (!hasCorrectPublishDir) {
    issues.push('❌ Workflow publish directory incorrect');
  }
  if (!hasCorrectAction) {
    issues.push('❌ Workflow using wrong deployment action');
  }
  
  console.log(`   ${hasBuildStep ? '✅' : '❌'} Build step: ${hasBuildStep}`);
  console.log(`   ${hasCNAME ? '✅' : '❌'} CNAME creation: ${hasCNAME}`);
  console.log(`   ${hasCorrectPublishDir ? '✅' : '❌'} Publish directory: ${hasCorrectPublishDir}`);
  console.log(`   ${hasCorrectAction ? '✅' : '❌'} Deployment action: ${hasCorrectAction}\n`);
  
  return hasBuildStep && hasCNAME && hasCorrectPublishDir && hasCorrectAction;
}

// 4. Check CNAME file
function checkCNAME() {
  console.log('4️⃣ Checking CNAME file...');
  
  const cnamePath = 'CNAME';
  const distCnamePath = 'dist/public/CNAME';
  
  let rootCNAME = false;
  let distCNAME = false;
  
  if (fs.existsSync(cnamePath)) {
    const content = fs.readFileSync(cnamePath, 'utf8').trim();
    rootCNAME = content === 'loera.store';
  }
  
  if (fs.existsSync(distCnamePath)) {
    const content = fs.readFileSync(distCnamePath, 'utf8').trim();
    distCNAME = content === 'loera.store';
  }
  
  if (!rootCNAME) {
    issues.push('❌ Root CNAME file missing or incorrect');
    fixes.push('Fix: echo "loera.store" > CNAME');
  }
  
  console.log(`   ${rootCNAME ? '✅' : '❌'} Root CNAME: ${rootCNAME}`);
  console.log(`   ${distCNAME ? '✅' : '❌'} Dist CNAME: ${distCNAME}\n`);
  
  return rootCNAME;
}

// 5. Test build process
function testBuild() {
  console.log('5️⃣ Testing build process...');
  
  try {
    console.log('   Running npm run build:frontend...');
    execSync('npm run build:frontend', { stdio: 'pipe' });
    console.log('   ✅ Build successful\n');
    return true;
  } catch (error) {
    console.log('   ❌ Build failed');
    console.log(`   Error: ${error.message}\n`);
    issues.push('❌ Build process failed');
    fixes.push('Fix build errors and try again');
    return false;
  }
}

// 6. Check for SPA routing issues
function checkSPARouting() {
  console.log('6️⃣ Checking SPA routing...');
  
  const distPath = 'dist/public';
  const notFoundPath = path.join(distPath, '404.html');
  
  if (!fs.existsSync(notFoundPath)) {
    issues.push('❌ 404.html missing for SPA routing');
    fixes.push('Create 404.html that redirects to index.html');
  }
  
  console.log(`   ${fs.existsSync(notFoundPath) ? '✅' : '❌'} 404.html exists\n`);
  
  return fs.existsSync(notFoundPath);
}

// Auto-fix function
function autoFix() {
  console.log('🔧 APPLYING AUTO-FIXES...');
  console.log('========================\n');
  
  // Fix 1: Ensure correct vite.config.ts
  console.log('🔧 Fixing vite.config.ts...');
  const configPath = 'vite.config.ts';
  if (fs.existsSync(configPath)) {
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Fix base path
    if (!configContent.includes('base: "./"')) {
      configContent = configContent.replace(/base:\s*["'][^"']*["']/, 'base: "./"');
      fs.writeFileSync(configPath, configContent);
      console.log('   ✅ Fixed base path to "./"');
    }
  }
  
  // Fix 2: Create/fix CNAME
  console.log('🔧 Creating CNAME file...');
  fs.writeFileSync('CNAME', 'loera.store');
  console.log('   ✅ Created CNAME file');
  
  // Fix 3: Create 404.html for SPA routing
  console.log('🔧 Creating 404.html for SPA routing...');
  const html404 = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>LOÉRA</title>
  <script type="text/javascript">
    // GitHub Pages SPA redirect
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
  
  fs.writeFileSync('client/public/404.html', html404);
  console.log('   ✅ Created 404.html for SPA routing');
  
  // Fix 4: Rebuild with correct settings
  console.log('🔧 Rebuilding with correct settings...');
  try {
    execSync('npm run build:frontend', { stdio: 'pipe' });
    console.log('   ✅ Rebuild successful');
    
    // Add CNAME to dist
    fs.writeFileSync('dist/public/CNAME', 'loera.store');
    console.log('   ✅ Added CNAME to dist/public');
    
  } catch (error) {
    console.log('   ❌ Rebuild failed:', error.message);
  }
  
  console.log('\n🔧 Auto-fixes completed!\n');
}

// Main execution
async function main() {
  const checks = [
    checkViteConfig(),
    checkWorkflow(),
    checkCNAME(),
    testBuild(),
    checkBuildOutput(),
    checkSPARouting()
  ];
  
  const allPassed = checks.every(check => check);
  
  console.log('📊 SUMMARY');
  console.log('==========');
  
  if (issues.length > 0) {
    console.log('\n❌ ISSUES FOUND:');
    issues.forEach(issue => console.log(`   ${issue}`));
    
    console.log('\n🔧 SUGGESTED FIXES:');
    fixes.forEach(fix => console.log(`   ${fix}`));
    
    console.log('\n🤖 APPLYING AUTO-FIXES...\n');
    autoFix();
    
    // Re-run checks after fixes
    console.log('🔄 RE-RUNNING CHECKS AFTER FIXES...\n');
    const recheckResults = [
      checkViteConfig(),
      checkWorkflow(),
      checkCNAME(),
      testBuild(),
      checkBuildOutput(),
      checkSPARouting()
    ];
    
    const allFixed = recheckResults.every(check => check);
    
    if (allFixed) {
      console.log('✅ ALL ISSUES FIXED! Ready to deploy.');
      console.log('\n🚀 Next steps:');
      console.log('   1. git add .');
      console.log('   2. git commit -m "Fix GitHub Pages deployment issues"');
      console.log('   3. git push origin main');
      console.log('   4. Wait 5-10 minutes for deployment');
      console.log('   5. Check https://loera.store');
    } else {
      console.log('❌ Some issues remain. Manual intervention required.');
    }
  } else {
    console.log('✅ All checks passed! Site should be working.');
  }
}

main().catch(console.error); 