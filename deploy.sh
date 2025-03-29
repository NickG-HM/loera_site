#!/bin/bash

# Clean any previous build
echo "Cleaning previous builds..."
rm -rf dist

# Build the frontend and backend
echo "Building application..."
npm run build

# Create necessary files in the root dist directory for deployment
echo "Setting up deployment structure..."
mkdir -p dist

# Copy the public/index.html content to the dist root for direct access
if [ -f "dist/public/index.html" ]; then
  # Copy the entire contents of the public folder to the dist root
  echo "Copying public assets to dist root for deployment..."
  cp -r dist/public/* dist/
fi

echo "Deployment preparation complete!"
echo "You can now use Replit's deployment features to deploy your application."