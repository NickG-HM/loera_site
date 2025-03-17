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
        name: "Striped shopper",
        description: "Этот Невесомый шоппер станет вашим любимым аксессуаром. Его легко взять с собой в поездки, без труда помещается в маленькую сумочку или даже карман куртки.\n\nМатериал: хлопок 80%, ПЭ 20% , алюминий.\n\nРазмер: ширина 48, высота 39, длина ручки 79 см",
        price: "65",
        image: "/images/product-1.png",
        category: "accessories"
      },
      {
        name: "Косметичка Polka dot «small»",
        description: "Компактная косметичка",
        price: "35",
        image: "/images/crossbody-2.png",
        category: "accessories"
      },
      {
        name: "Косметичка Polka dot «big»",
        description: "Вместительная косметичка",
        price: "45",
        image: "/images/crossbody-3.png",
        category: "accessories"
      },
      {
        name: "Shopper Polka dot",
        description: "Мягкий шоппер на завязках. В самом трендовом принте.\nВместительный карман внутри.\n\nМатериал : вискоза, хлопок, синтепон\n\nРазмер: длина 50, высота 41, ширина 12, длина ручек 71см",
        price: "65",
        image: "/images/crossbody-4.png",
        category: "accessories"
      },
      {
        name: "Crossbody Milk",
        description: "Элегантная сумка через плечо",
        price: "75",
        image: "/images/crossbody-5.png",
        category: "accessories"
      },
      {
        name: "Crossbody Leo",
        description: "Стильная сумка с леопардовым принтом",
        price: "75",
        image: "/images/crossbody-main.png",
        category: "accessories"
      },
      {
        name: "Shopper bag village vibes",
        description: "Вместительная сумка для покупок",
        price: "65",
        image: "/images/product-2.png",
        category: "accessories"
      },
      {
        name: "Bag Carnival Stripes",
        description: "Маленькая, но с характером: сумка, которая умеет быть элегантной и озорной одновременно, она сделает ваш лаконичный образ игривее и интересней\n\nМатериал: плотный атлас, хлопок\n\nРазмер: длина 35, высота 21, ширина 10см, длина ручки на выбор 90, 105",
        price: "70",
        image: "/images/product-3.png",
        category: "accessories"
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