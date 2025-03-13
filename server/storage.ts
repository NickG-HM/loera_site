import { Product, InsertProduct, CartItem, InsertCartItem } from "@shared/schema";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  getCartItems(): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<void>;
  clearCart(): Promise<void>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private currentProductId: number;
  private currentCartItemId: number;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.currentProductId = 1;
    this.currentCartItemId = 1;
    this.initializeProducts();
  }

  private initializeProducts() {
    const products: InsertProduct[] = [
      {
        name: "Premium Watch",
        description: "Elegant timepiece for any occasion",
        price: "199.99",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        category: "accessories"
      },
      {
        name: "Wireless Headphones",
        description: "High-quality sound with noise cancellation",
        price: "159.99",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        category: "electronics"
      },
      {
        name: "Smart Watch",
        description: "Stay connected with style",
        price: "299.99",
        image: "https://images.unsplash.com/photo-1596460107916-430662021049",
        category: "electronics"
      },
      {
        name: "Camera Lens",
        description: "Professional grade photography lens",
        price: "499.99",
        image: "https://images.unsplash.com/photo-1615615228002-890bb61cac6e",
        category: "electronics"
      },
      {
        name: "Vintage Camera",
        description: "Classic photography equipment",
        price: "399.99",
        image: "https://images.unsplash.com/photo-1616423641454-caa695af6a0f",
        category: "electronics"
      },
      {
        name: "Polaroid Camera",
        description: "Instant memories at your fingertips",
        price: "89.99",
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
        category: "electronics"
      },
      {
        name: "Sunglasses",
        description: "Stylish protection for your eyes",
        price: "129.99",
        image: "https://images.unsplash.com/photo-1529634885322-b17ffaf423ac",
        category: "accessories"
      },
      {
        name: "Designer Watch",
        description: "Luxury timepiece for special occasions",
        price: "599.99",
        image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0",
        category: "accessories"
      },
      {
        name: "Gold Ring",
        description: "Elegant jewelry piece",
        price: "899.99",
        image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d",
        category: "jewelry"
      },
      {
        name: "Silver Bracelet",
        description: "Handcrafted silver accessory",
        price: "199.99",
        image: "https://images.unsplash.com/photo-1532667449560-72a95c8d381b",
        category: "jewelry"
      }
    ];

    products.forEach(product => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id });
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      product =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getCartItems(): Promise<CartItem[]> {
    return Array.from(this.cartItems.values());
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const id = this.currentCartItemId++;
    const cartItem = { ...item, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      const updated = { ...item, quantity };
      this.cartItems.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(): Promise<void> {
    this.cartItems.clear();
  }
}

export const storage = new MemStorage();
