import { Product } from "@shared/schema";
import { createStaticProducts } from "@shared/products";

// Static product data for GitHub Pages deployment
export const staticProducts: Product[] = createStaticProducts();

// Helper functions to simulate API responses
export const getStaticProducts = (): Promise<Product[]> => {
  // Filter out products from "нижнее белье" category (for products page only)
  return Promise.resolve(staticProducts.filter(p => p.category !== "нижнее белье"));
};

// Get all products including нижнее белье (for cart and checkout)
export const getAllStaticProducts = (): Promise<Product[]> => {
  return Promise.resolve(staticProducts);
};

export const getStaticProduct = (id: number): Promise<Product | undefined> => {
  return Promise.resolve(staticProducts.find(p => p.id === id));
};

export const getStaticProductsByCategory = (category: string): Promise<Product[]> => {
  return Promise.resolve(staticProducts.filter(p => p.category === category));
};

export const searchStaticProducts = (query: string): Promise<Product[]> => {
  const lowercaseQuery = query.toLowerCase();
  return Promise.resolve(
    staticProducts.filter(
      product =>
        product.category !== "нижнее белье" &&
        (product.ProductName.toLowerCase().includes(lowercaseQuery) ||
        product.CatalogueName.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery))
    )
  );
}; 