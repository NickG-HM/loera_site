import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
import { imageOptimizer } from "./vite-plugin-image-optimizer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(async ({ mode }): Promise<UserConfig> => ({
  base: "/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    // Image optimizer - only in production builds
    ...(mode === "production"
      ? [
          imageOptimizer({
            inputDir: path.resolve(__dirname, "client/public/images"),
            outputDir: path.resolve(__dirname, "dist/public/images"),
            quality: 85,
            webpQuality: 80,
          }),
        ]
      : []),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          (await import("@replit/vite-plugin-cartographer")).cartographer(),
        ]
      : []),
    // Bundle analyzer - only in analyze mode
    ...(mode === "analyze"
      ? [
          (await import("rollup-plugin-visualizer")).visualizer({
            open: true,
            filename: "dist/stats.html",
            gzipSize: true,
            brotliSize: true,
          }),
        ]
      : []),
    // PWA with service worker - only in production
    ...(mode === "production"
      ? [
          (await import("vite-plugin-pwa")).VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.svg", "Logo_LOERA_final.png"],
            manifest: {
              name: "LOÉRA",
              short_name: "LOÉRA",
              description: "LOÉRA - сумки и аксессуары",
              theme_color: "#ec4899",
              icons: [
                {
                  src: "Logo_LOERA_final.png",
                  sizes: "512x512",
                  type: "image/png",
                },
              ],
            },
            workbox: {
              globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}"],
              maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
              runtimeCaching: [
                {
                  urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                  handler: "CacheFirst",
                  options: {
                    cacheName: "google-fonts-cache",
                    expiration: {
                      maxEntries: 10,
                      maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                    },
                    cacheableResponse: {
                      statuses: [0, 200],
                    },
                  },
                },
                {
                  urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                  handler: "CacheFirst",
                  options: {
                    cacheName: "gstatic-fonts-cache",
                    expiration: {
                      maxEntries: 10,
                      maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                    },
                    cacheableResponse: {
                      statuses: [0, 200],
                    },
                  },
                },
                {
                  urlPattern: /\.(?:png|jpg|jpeg|webp|svg|gif)$/,
                  handler: "CacheFirst",
                  options: {
                    cacheName: "images-cache",
                    expiration: {
                      maxEntries: 100,
                      maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                    },
                  },
                },
              ],
            },
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "docs"),
    emptyOutDir: true,
    // Enable minification
    minify: 'esbuild',
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks(id: string) {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // React and all React-dependent libraries must be together
            // This includes React, React DOM, React Query, and any library that imports React
            if (
              id.includes('react') || 
              id.includes('react-dom') || 
              id.includes('@tanstack/react-query') ||
              id.includes('@radix-ui') ||
              id.includes('wouter')
            ) {
              return 'vendor-react';
            }
            // Other large dependencies
            if (id.includes('framer-motion') || id.includes('embla-carousel')) {
              return 'vendor-animations';
            }
            // All other node_modules
            return 'vendor';
          }
        },
        // Ensure proper module format
        format: 'es',
        // Ensure proper asset paths
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        // Ensure proper module resolution
        preserveModules: false,
      },
    },
    // Source maps for production debugging (optional - remove if not needed)
    sourcemap: false,
  },
  publicDir: path.resolve(__dirname, "client/public"),
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'wouter'],
  },
}));
