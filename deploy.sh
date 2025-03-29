#!/bin/bash

# Clean any previous build
echo "Cleaning previous builds..."
rm -rf dist

# Build the frontend with static data and relative paths
echo "Building application with static data and relative paths..."
VITE_USE_STATIC_DATA=true VITE_BASE=./ npm run build

# Create necessary files in the root dist directory for deployment
echo "Setting up deployment structure..."
mkdir -p dist

# Copy the public/index.html content to the dist root for direct access
if [ -f "dist/public/index.html" ]; then
  # Copy the entire contents of the public folder to the dist root
  echo "Copying public assets to dist root for deployment..."
  cp -r dist/public/* dist/
  
  # Fix paths in index.html for mobile compatibility
  echo "Fixing paths in index.html for mobile compatibility..."
  sed -i 's|src="/assets/|src="./assets/|g' dist/index.html
  sed -i 's|href="/assets/|href="./assets/|g' dist/index.html
  
  # Create a copy of index.html for all routes to support client-side routing
  echo "Creating route copies for client-side routing..."
  mkdir -p dist/product dist/category dist/search
  cp dist/index.html dist/products.html
  cp dist/index.html dist/cart.html
  cp dist/index.html dist/checkout.html
  cp dist/index.html dist/contact.html
  cp dist/index.html dist/product/index.html
  cp dist/index.html dist/category/index.html
  cp dist/index.html dist/search/index.html
  
  # Copy the 200.html (for SPA fallback) and .htaccess for proper routing
  cp dist/200.html dist/404.html
fi

echo "Deployment preparation complete!"
echo "You can now use Replit's deployment features to deploy your application."