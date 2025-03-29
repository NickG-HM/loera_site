import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  });

  app.get("/api/products/category/:category", async (req, res) => {
    const products = await storage.getProductsByCategory(req.params.category);
    res.json(products);
  });

  app.get("/api/products/search/:query", async (req, res) => {
    const products = await storage.searchProducts(req.params.query);
    res.json(products);
  });

  app.get("/api/cart", async (_req, res) => {
    const items = await storage.getCartItems();
    res.json(items);
  });

  app.post("/api/cart", async (req, res) => {
    const result = insertCartItemSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid cart item data" });
      return;
    }
    const item = await storage.addToCart(result.data);
    res.json(item);
  });

  app.patch("/api/cart/:id", async (req, res) => {
    const { quantity } = req.body;
    if (typeof quantity !== "number" || quantity < 0) {
      res.status(400).json({ message: "Invalid quantity" });
      return;
    }
    const item = await storage.updateCartItem(Number(req.params.id), quantity);
    if (!item) {
      res.status(404).json({ message: "Cart item not found" });
      return;
    }
    res.json(item);
  });

  app.delete("/api/cart/:id", async (req, res) => {
    await storage.removeFromCart(Number(req.params.id));
    res.status(204).send();
  });

  app.delete("/api/cart", async (_req, res) => {
    await storage.clearCart();
    res.status(204).send();
  });

  const httpServer = createServer(app);
  return httpServer;
}
