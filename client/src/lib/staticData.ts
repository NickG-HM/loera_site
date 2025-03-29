import { CartItem, Product } from "@shared/schema";

// Static product data for deployment
export const productsData: Product[] = [
  {
    id: 1,
    name: "Fluffy Hug Candy Pink",
    description: "Дутая сумка со съемными ленточками. Внутри сумки есть удобный карман на замке.\n\nцвета: forest green, leo, candy pink, black\n\nматериал: плащевая ткань с водоотталкивающей пропиткой, синтепон.\n\nразмер: длина 50, высота 38, ширина 15, длина ручки на выбор 84, 90 см.",
    price: "80",
    image: "./images/fluffy-hug-candy-pink.png",
    category: "bags",
    gallery: ["./images/fluffy-hug-candy-pink_1.jpg", "./images/fluffy-hug-candy-pink_2.jpg", "./images/fluffy-hug-candy-pink_3.jpg"]
  },
  {
    id: 2,
    name: "Fluffy Hug Leo",
    description: "Дутая сумка со съемными ленточками. Внутри сумки есть удобный карман на замке.\n\nцвета: forest green, leo, candy pink, black\n\nматериал: плащевая ткань с водоотталкивающей пропиткой, синтепон.\n\nразмер: длина 50, высота 38, ширина 15, длина ручки на выбор 84, 90 см.",
    price: "80",
    image: "./images/fluffy-hug-leo.png",
    category: "bags",
    gallery: ["./images/fluffy-hug-leo_1.jpg", "./images/fluffy-hug-leo_2.jpg", "./images/fluffy-hug-leo_3.jpg", "./images/fluffy-hug-leo_4.jpg", "./images/fluffy-hug-leo_5.jpeg"]
  },
  {
    id: 3,
    name: "Fluffy Hug Black",
    description: "Дутая сумка со съемными ленточками. Внутри сумки есть удобный карман на замке.\n\nцвета: forest green, leo, candy pink, black\n\nматериал: плащевая ткань с водоотталкивающей пропиткой, синтепон.\n\nразмер: длина 50, высота 38, ширина 15, длина ручки на выбор 84, 90 см.",
    price: "80",
    image: "./images/fluffy-hug-black_1.jpeg",
    category: "bags",
    gallery: ["./images/fluffy-hug-black_2.jpeg", "./images/fluffy-hug-black_3.jpeg"]
  },
  {
    id: 4,
    name: "Fluffy Hug Forest Green",
    description: "Дутая сумка со съемными ленточками. Внутри сумки есть удобный карман на замке.\n\nцвета: forest green, leo, candy pink, black\n\nматериал: плащевая ткань с водоотталкивающей пропиткой, синтепон.\n\nразмеры: длина 50, высота 38, ширина 15, длина ручки на выбор 84, 90 см.",
    price: "80",
    image: "./images/fluffy-hug-forest-green.png",
    category: "bags",
    gallery: ["./images/fluffy-forest-green_1.jpg", "./images/fluffy-forest-green_2.jpg", "./images/fluffy-forest-green_3.jpg", "./images/fluffy-forest-green_4.jpg"]
  },
  {
    id: 5,
    name: "Косметичка Polka dot «small»",
    description: "Маленькая, да удаленькая!\n\nЗащитит вашу косметику от царапин и разбитых теней, благодаря мягкому синтепону.\nИдеальна для путешествий, работы и повседневности.\n\n-мягкая защита вашей косметики\n-вместительная\n-качественная фурнитура\n-элегантный дизайн\n\nМатериал: хлопок, синтепон\n\nРазмер: длина 23, высота 15, ширина 8",
    price: "35",
    image: "./images/product-2.png",
    category: "cosmetic bags",
    gallery: ["./images/product-1.png", "./images/product-3.png"]
  },
  {
    id: 6,
    name: "Косметичка Polka dot «big»",
    description: "Идеальная спутница для тех, кто ценит порядок и заботится о каждой детали!\n\n-мягкая защита вашей косметики\n-вместительная\n-качественная фурнитура\n-лаконичный дизайн\n\nМатериал: хлопок, синтепон.\n\nРазмер: длина 31, высота 21, ширина 12",
    price: "45",
    image: "./images/fun_1.jpg",
    category: "cosmetic bags",
    gallery: ["./images/fun_2.jpeg", "./images/fun_3.jpeg"]
  },
  {
    id: 7,
    name: "Crossbody Milk",
    description: "Невероятно вместительная, но при этом компактная! Уникальная сборка на резинке позволяет сумке *автоматически подстраиваться под содержимое*\n-Загрузили много? Сумка аккуратно расширяется, сохраняя форму.\n-Носите минимум? Остается изящной и не занимает места.\n\nДлина ручки регулируется.\nТри варианта носки: носите на поясе, через плече или с короткой ручкой на плече.\n\nВнутри сумочки есть вместительный карман на замке.\n\nМатериал: плотный атлас, пряжка алюминий.\n\nРазмер: длина:45, высота 16, ширина 23\n*могут быть погрешности, так как сумка не имеет четкой формы.\n\nColor: Black, Leo, Milk",
    price: "75",
    image: "./images/crossbody-milk_1.jpg",
    category: "bags",
    gallery: ["./images/crossbody-milk_2.jpg", "./images/crossbody-milk_3.jpg"]
  },
  {
    id: 8,
    name: "Shopper",
    description: "Стильная и вместительная сумка шоппер\nВнутри один вместительный карман на замке.\n\nМатериал: хлопок\nРазмер: длина 48, высота 31, ширина 12, длина ручки 86см\n\nДоступна для заказа в различных цветах! \nНаписать для заказа: WhatsApp +375255059703",
    price: "65",
    image: "./images/product-7.png",
    category: "bags",
    gallery: ["./images/product-8.png"]
  },
  {
    id: 9,
    name: "Shopper village",
    description: "Мягкая, стеганая сумка шоппер на замке.\nВнутри есть вместительный карман для самых ценных вещей.\nДоступна под заказ ! Варианты цветов в каталоге.\n\nМатериал: хлопок, синтепон\n\nРазмер : длина 48, высота 31, ширина 12, длина ручки 86см",
    price: "65",
    image: "./images/product-7.png",
    category: "bags",
    gallery: ["./images/product-8.png", "./images/product-9.png"]
  },
  {
    id: 10,
    name: "Bag Carnival Stripes",
    description: "Маленькая, но с характером: сумка, которая умеет быть элегантной и озорной одновременно, она сделает ваш лаконичный образ игривее и интересней\n\nМатериал: плотный атлас, хлопок\n\nРазмер: длина 35, высота 21, ширина 10см, длина ручки на выбор 90, 105",
    price: "70",
    image: "./images/Carnival-main.gif",
    category: "bags",
    gallery: ["./images/carnival_1.JPEG", "./images/carnival_2.JPEG"]
  },
  {
    id: 11,
    name: "Crossbody Black",
    description: "Невероятно вместительная, но при этом компактная! Уникальная сборка на резинке позволяет сумке *автоматически подстраиваться под содержимое*\n-Загрузили много? Сумка аккуратно расширяется, сохраняя форму.\n-Носите минимум? Остается изящной и не занимает места.\n\nДлина ручки регулируется.\nТри варианта носки: носите на поясе, через плече или с короткой ручкой на плече.\n\nВнутри сумочки есть вместительный карман на замке.\n\nМатериал: плотный атлас, пряжка алюминий.\n\nРазмер: длина:45, высота 16, ширина 23\n*могут быть погрешности, так как сумка не имеет четкой формы.\n\nColor: Black, Leo, Milk",
    price: "75",
    image: "./images/crossbody-main.png",
    category: "bags",
    gallery: ["./images/crossbody-2.png", "./images/crossbody-3.png", "./images/crossbody-4.png", "./images/crossbody-5.png"]
  },
  {
    id: 12,
    name: "Striped shopper",
    description: "Этот Невесомый шоппер станет вашим любимым аксессуаром. Его легко взять с собой в поездки, без труда помещается в маленькую сумочку или даже карман куртки.\n\nМатериал: хлопок 80%, ПЭ 20% , алюминий.\n\nРазмер: ширина 48, высота 39, длина ручки 79 см",
    price: "65",
    image: "./images/product-9.png",
    category: "bags",
    gallery: ["./images/product-2.png", "./images/product-3.png"]
  }
];

// Initial empty cart data
export const cartData: CartItem[] = [];

// Store cart locally without requiring API calls
let localCart: CartItem[] = [...cartData];

// Static methods to work with cart locally
export const staticCartMethods = {
  getCartItems: () => localCart,
  
  addToCart: (productId: number, quantity: number) => {
    const existingItem = localCart.find(item => item.productId === productId);
    
    if (existingItem) {
      // If the item already exists, update the quantity
      existingItem.quantity += quantity;
      return existingItem;
    } else {
      // Otherwise, add a new item
      const newItem: CartItem = {
        id: Date.now(), // Use timestamp as a simple ID
        productId,
        quantity
      };
      localCart.push(newItem);
      return newItem;
    }
  },
  
  updateCartItem: (itemId: number, quantity: number) => {
    const item = localCart.find(item => item.id === itemId);
    
    if (!item) return null;
    
    if (quantity <= 0) {
      // If quantity is 0 or less, remove the item
      localCart = localCart.filter(item => item.id !== itemId);
      return null;
    } else {
      // Otherwise, update the quantity
      item.quantity = quantity;
      return item;
    }
  },
  
  removeFromCart: (itemId: number) => {
    localCart = localCart.filter(item => item.id !== itemId);
  },
  
  clearCart: () => {
    localCart = [];
  }
};

// Static methods to work with products locally
export const staticProductMethods = {
  getProducts: () => productsData,
  
  getProduct: (id: number) => productsData.find(product => product.id === id),
  
  getProductsByCategory: (category: string) => 
    productsData.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    ),
  
  searchProducts: (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return productsData.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  }
};