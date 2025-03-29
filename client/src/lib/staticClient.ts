import { QueryClient } from "@tanstack/react-query";
import { staticCartMethods, staticProductMethods } from "./staticData";

// This is a static query client that doesn't make network requests
// Instead, it uses the static data from staticData.ts
export const staticQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Never refetch data
      queryFn: async ({ queryKey }) => {
        // Parse the query key to determine what data to return
        const [endpoint, ...params] = queryKey as string[];
        
        // Handle different API endpoints
        switch (endpoint) {
          case "api/products": {
            if (params.length === 0) {
              return staticProductMethods.getProducts();
            } else if (params[0] === "search") {
              return staticProductMethods.searchProducts(params[1]);
            } else if (params[0] === "category") {
              return staticProductMethods.getProductsByCategory(params[1]);
            } else {
              // Must be a product ID
              const product = staticProductMethods.getProduct(Number(params[0]));
              if (!product) throw new Error("Product not found");
              return product;
            }
          }
          case "api/cart": {
            return staticCartMethods.getCartItems();
          }
          default:
            throw new Error(`Unknown endpoint: ${endpoint}`);
        }
      }
    }
  }
});

// Static API request function
export async function staticApiRequest(method: string, url: string, data?: any) {
  // Parse the URL to determine what action to take
  const urlParts = url.split("/").filter(Boolean);
  const endpoint = urlParts[0];
  
  // Handle different API endpoints
  switch (endpoint) {
    case "api": {
      const resource = urlParts[1];
      
      if (resource === "cart") {
        // Handle cart operations
        if (method === "POST") {
          const { productId, quantity } = data;
          const item = staticCartMethods.addToCart(productId, quantity);
          return {
            json: () => Promise.resolve(item),
            status: 200
          };
        } else if (method === "PATCH") {
          const itemId = Number(urlParts[2]);
          const { quantity } = data;
          const item = staticCartMethods.updateCartItem(itemId, quantity);
          return {
            json: () => Promise.resolve(item),
            status: 200
          };
        } else if (method === "DELETE") {
          if (urlParts.length > 2) {
            // Delete specific item
            const itemId = Number(urlParts[2]);
            staticCartMethods.removeFromCart(itemId);
          } else {
            // Clear entire cart
            staticCartMethods.clearCart();
          }
          return {
            status: 204
          };
        }
      }
      break;
    }
  }
  
  throw new Error(`Unknown request: ${method} ${url}`);
}

// Determine if we should use static data based on the environment variable
// This can be set to true for static deployments
export const useStaticData = true; // Set to true by default now, but could read from environment in production