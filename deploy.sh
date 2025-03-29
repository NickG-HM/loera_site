#!/bin/bash
set -e  # Exit on any error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting LOERA static site deployment...${NC}"

# 1. Run the static build script
echo -e "${BLUE}📦 Running static build script...${NC}"
node static-build.cjs

# 2. Test the build locally
echo -e "${BLUE}🧪 Testing the static build...${NC}"
cd dist
echo -e "${GREEN}✅ Static build generated in ./dist directory${NC}"

# If we're on Replit, move to correct location for deployment
if [ -n "$REPL_ID" ]; then
  echo -e "${BLUE}🔄 Preparing for Replit deployment...${NC}"
  
  # Create necessary directories
  mkdir -p /home/runner/${REPL_SLUG}/dist

  # Copy built files to the deployment directory
  echo -e "${BLUE}📂 Copying built files to deployment location...${NC}"
  cp -R * /home/runner/${REPL_SLUG}/dist/
  
  echo -e "${GREEN}✅ Files copied to the correct location for Replit deployment${NC}"
  echo -e "${GREEN}✅ Your site is ready for deployment!${NC}"
  echo -e "${BLUE}🌐 Visit the 'Deployments' tab to deploy your site${NC}"
fi

echo -e "${GREEN}🎉 Deployment preparation complete!${NC}"
echo -e "${BLUE}📝 Important notes:${NC}"
echo -e "  - Static website files are in the ./dist directory"
echo -e "  - Upload these files to any static hosting service (Vercel, Netlify, GitHub Pages, etc.)"
echo -e "  - No server or API calls are needed, everything is included in the static files"