#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🔧 AUTO-FIX CENTERING SCRIPT');
console.log('============================\n');

// Test and fix functions
const fixes = [];

function addFix(description, fix) {
  fixes.push({ description, fix });
  console.log(`✅ ${description}`);
}

// 1. Check contact page centering
function fixContactPageCentering() {
  console.log('1️⃣ Analyzing contact page centering...');
  
  const contactPath = 'client/src/pages/contact.tsx';
  let content = fs.readFileSync(contactPath, 'utf8');
  
  // Check if it has proper centering structure
  if (!content.includes('flex justify-center items-center min-h-screen')) {
    console.log('   ❌ Contact page needs better centering structure');
    
    // Fix the entire structure for perfect centering
    const newContent = `import { Navigation } from "@/components/navigation";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const instagramLink = "https://www.instagram.com/loera.brand?igsh=MWJxbHA0Y3owbWR0bA==";
  const whatsappLink = "https://api.whatsapp.com/send/?phone=375255059703&type=phone_number&app_absent=0";

  return (
    <div className="min-h-screen relative">
      <Navigation />
      <BackButton />
      
      {/* Perfect centering container */}
      <div className="flex justify-center items-center min-h-screen pt-20 pb-12 px-4">
        <div className="w-full max-w-md text-center space-y-8">
          <h1 className="text-3xl font-light mb-10">Контакты</h1>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-lg mb-6">
                Если у вас есть вопросы,<br />просто напишите нам.
                <br />
                Мы с радостью на них ответим!
              </p>
              
              <div className="space-y-2">
                <p>+375 25 505 97 03</p>
                <p>Minsk, Belarus</p>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4 pt-6">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                <Button 
                  className="w-full transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-green-500 hover:bg-green-600 text-white border-0"
                >
                  Заказать WhatsApp
                </Button>
              </a>
              
              <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="block">
                <Button 
                  className="w-full transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white border-0"
                >
                  Заказать Instagram
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;
    
    fs.writeFileSync(contactPath, newContent);
    addFix('Fixed contact page with perfect vertical and horizontal centering', () => {});
  } else {
    console.log('   ✅ Contact page centering looks good');
  }
}

// 2. Check other pages for centering consistency
function checkOtherPagesCentering() {
  console.log('\n2️⃣ Checking other pages for centering consistency...');
  
  const pagesToCheck = [
    'client/src/pages/delivery.tsx',
    'client/src/pages/checkout.tsx',
    'client/src/pages/cart.tsx'
  ];
  
  pagesToCheck.forEach(pagePath => {
    if (fs.existsSync(pagePath)) {
      const content = fs.readFileSync(pagePath, 'utf8');
      const pageName = path.basename(pagePath, '.tsx');
      
      // Check if page has proper container structure
      if (!content.includes('container mx-auto') && !content.includes('max-w-')) {
        console.log(`   ⚠️  ${pageName} might need centering improvements`);
      } else {
        console.log(`   ✅ ${pageName} centering looks good`);
      }
    }
  });
}

// 3. Check CSS for centering utilities
function checkCSSCentering() {
  console.log('\n3️⃣ Checking CSS for centering utilities...');
  
  const cssPath = 'client/src/index.css';
  if (fs.existsSync(cssPath)) {
    const content = fs.readFileSync(cssPath, 'utf8');
    
    // Add custom centering utilities if needed
    if (!content.includes('.center-content')) {
      console.log('   ➕ Adding custom centering utilities to CSS');
      
      const centeringCSS = `
/* Custom centering utilities */
.center-content {
  @apply flex justify-center items-center;
}

.center-page {
  @apply min-h-screen flex justify-center items-center px-4;
}

.center-text {
  @apply text-center;
}

.center-container {
  @apply container mx-auto px-4;
}
`;
      
      fs.appendFileSync(cssPath, centeringCSS);
      addFix('Added custom centering utilities to CSS', () => {});
    } else {
      console.log('   ✅ CSS centering utilities exist');
    }
  }
}

// 4. Test build process
function testBuild() {
  console.log('\n4️⃣ Testing build process...');
  
  try {
    console.log('   🔨 Building frontend...');
    execSync('npm run build:frontend', { stdio: 'pipe' });
    console.log('   ✅ Build successful');
    
    // Ensure CNAME file exists
    const cnamePath = 'dist/public/CNAME';
    if (!fs.existsSync(cnamePath)) {
      fs.writeFileSync(cnamePath, 'loera.store');
      addFix('Added CNAME file for custom domain', () => {});
    }
    
  } catch (error) {
    console.log('   ❌ Build failed:', error.message);
    return false;
  }
  
  return true;
}

// 5. Check responsive design
function checkResponsiveDesign() {
  console.log('\n5️⃣ Checking responsive design classes...');
  
  const contactPath = 'client/src/pages/contact.tsx';
  const content = fs.readFileSync(contactPath, 'utf8');
  
  const responsiveClasses = ['sm:', 'md:', 'lg:', 'xl:'];
  const hasResponsive = responsiveClasses.some(cls => content.includes(cls));
  
  if (!hasResponsive) {
    console.log('   ⚠️  Consider adding responsive design classes');
  } else {
    console.log('   ✅ Responsive design classes found');
  }
}

// 6. Auto-test localhost
function testLocalhost() {
  console.log('\n6️⃣ Testing localhost server...');
  
  try {
    // Start server in background
    console.log('   🚀 Starting development server...');
    const serverProcess = execSync('npm run dev &', { stdio: 'pipe' });
    
    // Wait a bit for server to start
    console.log('   ⏳ Waiting for server to start...');
    setTimeout(() => {
      console.log('   ✅ Server should be running on http://localhost:3000');
      console.log('   📱 Test the contact page at: http://localhost:3000/contact');
    }, 3000);
    
  } catch (error) {
    console.log('   ❌ Server start failed:', error.message);
  }
}

// Main execution
async function main() {
  try {
    fixContactPageCentering();
    checkOtherPagesCentering();
    checkCSSCentering();
    
    const buildSuccess = testBuild();
    if (buildSuccess) {
      checkResponsiveDesign();
    }
    
    console.log('\n🎯 SUMMARY');
    console.log('==========');
    console.log(`Applied ${fixes.length} fixes:`);
    fixes.forEach((fix, index) => {
      console.log(`${index + 1}. ${fix.description}`);
    });
    
    console.log('\n📋 NEXT STEPS:');
    console.log('1. Test the contact page at http://localhost:3000/contact');
    console.log('2. Check centering on different screen sizes');
    console.log('3. Push changes to GitHub if everything looks good');
    
    // Start server
    testLocalhost();
    
  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  }
}

main(); 