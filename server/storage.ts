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
        name: "Fluffy Hug Candy Pink",
        description: "Дутая сумка со съемными ленточками. Внутри сумки есть удобный карман на замке.\n\nцвета: forest green, leo, candy pink, black\n\nматериал: плащевая ткань с водоотталкивающей пропиткой, синтепон.\n\nразмер: длина 50, высота 38, ширина 15, длина ручки на выбор 84, 90 см.",
        price: "80",
        image: "/images/fluffy-hug-candy-pink.png",
        category: "accessories"
      },
      {
        name: "Fluffy Hug Leo",
        description: "Дутая сумка со съемными ленточками. Внутри сумки есть удобный карман на замке.\n\nцвета: forest green, leo, candy pink, black\n\nматериал: плащевая ткань с водоотталкивающей пропиткой, синтепон.\n\nразмер: длина 50, высота 38, ширина 15, длина ручки на выбор 84, 90 см.",
        price: "80",
        image: "/images/fluffy-hug-leo.png",
        category: "accessories"
      },
      {
        name: "Fluffy Hug Elegant Black",
        description: "Дутая сумка со съемными ленточками. Внутри сумки есть удобный карман на замке.\n\nцвета: forest green, leo, candy pink, black\n\nматериал: плащевая ткань с водоотталкивающей пропиткой, синтепон.\n\nразмер: длина 50, высота 38, ширина 15, длина ручки на выбор 84, 90 см.",
        price: "80",
        image: "/images/fluffy-hug-elegant-black.png",
        category: "accessories"
      },
      {
        name: "Fluffy Hug Forest Green",
        description: "Дутая сумка со съемными ленточками. Внутри сумки есть удобный карман на замке.\n\nцвета: forest green, leo, candy pink, elegant black\n\nматериал: плащевая ткань с водоотталкивающей пропиткой, синтепон.\n\nразмеры: длина 50, высота 38, ширина 15, длина ручки на выбор 84, 90 см.",
        price: "80",
        image: "/images/fluffy-hug-forest-green.png",
        category: "accessories"
      },
      {
        name: "Косметичка Polka dot «small»",
        description: "Маленькая, да удаленькая!\n\nЗащитит вашу косметику от царапин и разбитых теней, благодаря мягкому синтепону.\nИдеальна для путешествий, работы и повседневности.\n\n-мягкая защита вашей косметики\n-вместительная\n-качественная фурнитура\n-элегантный дизайн\n\nМатериал: хлопок, синтепон\n\nРазмер: длина 23, высота 15, ширина 8",
        price: "35",
        image: "/images/product-2.png",
        category: "accessories"
      },
      {
        name: "Косметичка Polka dot «big»",
        description: "Идеальная спутница для тех, кто ценит порядок и заботится о каждой детали!\n\n-мягкая защита вашей косметики\n-вместительная\n-качественная фурнитура\n-лаконичный дизайн\n\nМатериал: хлопок, синтепон.\n\nРазмер: длина 31, высота 21, ширина 12",
        price: "45",
        image: "/images/product-3.png",
        category: "accessories"
      },
      {
        name: "Shopper Polka dot",
        description: "Удобная сумка для покупок",
        price: "65",
        image: "/images/product-4.png",
        category: "accessories"
      },
      {
        name: "Crossbody Milk",
        description: "Невероятно вместительная, но при этом компактная! Уникальная сборка на резинке позволяет сумке *автоматически подстраиваться под содержимое*\n-Загрузили много? Сумка аккуратно расширяется, сохраняя форму.\n-Носите минимум? Остается изящной и не занимает места.\n\nДлина ручки регулируется.\nТри варианта носки: носите на поясе, через плечо или с короткой ручкой на плече.\n\nВнутри сумочки есть вместительный карман на замке.\n\nМатериал: плотный атлас, пряжка алюминий.\n\nРазмер: длина 45, высота 16, ширина 23\n*могут быть погрешности, так как сумка не имеет четкой формы.\n\nColor: Black, Leo, Milk",
        price: "75",
        image: "/images/product-5.png",
        category: "accessories"
      },
      {
        name: "Crossbody Leo",
        description: "Стильная сумка с леопардовым принтом",
        price: "75",
        image: "/images/product-6.png",
        category: "accessories"
      },
      {
        name: "Shopper bag village vibes",
        description: "Мягкая, стеганая сумка шоппер на замке.\nВнутри есть вместительный карман для самых ценных вещей.\nДоступна под заказ ! Варианты цветов в каталоге.\n\nМатериал: хлопок, синтепон\n\nРазмер : длина 48, высота 31, ширина 12, длина ручки 86см",
        price: "65",
        image: "/images/product-7.png",
        category: "accessories"
      },
      {
        name: "Bag Carnival Stripes",
        description: "Яркая полосатая сумка",
        price: "70",
        image: "/images/product-8.png",
        category: "accessories"
      },
      {
        name: "Striped shopper",
        description: "Полосатая сумка для покупок",
        price: "65",
        image: "/images/product-1.png",
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