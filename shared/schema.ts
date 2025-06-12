import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  priceBYN: text("price_byn").notNull(),
  priceRUB: text("price_rub").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  gallery: text("gallery").array().default([]),
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  priceBYN: true,
  priceRUB: true,
  image: true,
  category: true,
  gallery: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).pick({
  productId: true,
  quantity: true,
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;