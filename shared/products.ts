import { Product } from "./schema";

export const baseProducts = [
  {
    name: "Fluffy Hug Candy Pink",
    description: "Дутая сумка со съемными ленточками. Внутри сумки есть удобный карман на замке.\n\nцвета: forest green, leo, candy pink, black\n\nматериал: плащевая ткань с водоотталкивающей пропиткой, синтепон.\n\nразмер: длина 50, высота 38, ширина 15, длина ручки на выбор 84, 90 см.",
    price: "80",
    image: "fluffy-hug-candy-pink.png",
    category: "bags",
    gallery: ["fluffy-hug-candy-pink_1.jpg", "fluffy-hug-candy-pink_2.jpg", "fluffy-hug-candy-pink_3.jpg"]
  },
  {
    name: "Fluffy Hug Leo",
    description: "Дутая сумка со съемными ленточками. Внутри сумки есть удобный карман на замке.\n\nцвета: forest green, leo, candy pink, black\n\nматериал: плащевая ткань с водоотталкивающей пропиткой, синтепон.\n\nразмер: длина 50, высота 38, ширина 15, длина ручки на выбор 84, 90 см.",
    price: "80",
    image: "fluffy-hug-leo.png",
    category: "bags",
    gallery: ["fluffy-hug-leo_1.jpg", "fluffy-hug-leo_2.jpg", "fluffy-hug-leo_3.jpg"]
  },
  {
    name: "Fluffy Hug Black",
    description: "Дутая сумка со съемными ленточками. Внутри сумки есть удобный карман на замке.\n\nцвета: forest green, leo, candy pink, black\n\nматериал: плащевая ткань с водоотталкивающей пропиткой, синтепон.\n\nразмер: длина 50, высота 38, ширина 15, длина ручки на выбор 84, 90 см.",
    price: "80",
    image: "fluffy-hug-black_1.jpeg",
    category: "bags",
    gallery: ["fluffy-hug-black_2.jpeg", "fluffy-hug-black_3.jpeg"]
  },
  {
    name: "Fluffy Hug Forest Green",
    description: "Дутая сумка со съемными ленточками. Внутри сумки есть удобный карман на замке.\n\nцвета: forest green, leo, candy pink, black\n\nматериал: плащевая ткань с водоотталкивающей пропиткой, синтепон.\n\nразмеры: длина 50, высота 38, ширина 15, длина ручки на выбор 84, 90 см.",
    price: "80",
    image: "fluffy-hug-forest-green.png",
    category: "bags",
    gallery: ["fluffy-forest-green_1.jpg", "fluffy-forest-green_2.jpg", "fluffy-forest-green_3.jpg"]
  },
  {
    name: "Косметичка Polka dot «small»",
    description: "Маленькая, да удаленькая!\n\nЗащитит вашу косметику от царапин и разбитых теней, благодаря мягкому синтепону.\nИдеальна для путешествий, работы и повседневности.\n\n-мягкая защита вашей косметики\n-вместительная\n-качественная фурнитура\n-элегантный дизайн\n\nМатериал: хлопок, синтепон\n\nРазмер: длина 23, высота 15, ширина 8",
    price: "35",
    image: "product-2.png",
    category: "cosmetic bags",
    gallery: ["product-1.png", "product-3.png"]
  },
  {
    name: "Косметичка Polka dot «big»",
    description: "Идеальная спутница для тех, кто ценит порядок и заботится о каждой детали!\n\n-мягкая защита вашей косметики\n-вместительная\n-качественная фурнитура\n-лаконичный дизайн\n\nМатериал: хлопок, синтепон.\n\nРазмер: длина 31, высота 21, ширина 12",
    price: "45",
    image: "fun_1.jpg",
    category: "cosmetic bags",
    gallery: ["fun_2.jpeg", "fun_3.jpeg"]
  },
  {
    name: "Shopper Polka dot",
    description: "Мягкий шоппер на завязках. В самом трендовом принте.\nВместительный карман внутри.\n\nМатериал : вискоза, хлопок, синтепон\n\nРазмер: длина 50, высота 41, ширина 12, длина ручек 71см",
    price: "65",
    image: "product-4.png",
    category: "bags",
    gallery: ["product-5.png", "product-6.png"]
  },
  {
    name: "Crossbody Milk",
    description: "Невероятно вместительная, но при этом компактная! Уникальная сборка на резинке позволяет сумке *автоматически подстраиваться под содержимое*\n-Загрузили много? Сумка аккуратно расширяется, сохраняя форму.\n-Носите минимум? Остается изящной и не занимает места.\n\nДлина ручки регулируется.\nТри варианта носки: носите на поясе, через плечо или с короткой ручкой на плече.\n\nВнутри сумочки есть вместительный карман на замке.\n\nМатериал: плотный атлас, пряжка алюминий.\n\nРазмер: длина 45, высота 16, ширина 23\n*могут быть погрешности, так как сумка не имеет четкой формы.\n\nColor: Black, Leo, Milk",
    price: "75",
    image: "crossbody-milk_1.jpg",
    category: "bags",
    gallery: ["crossbody-milk_2.jpg", "crossbody-milk_3.jpg"]
  },
  {
    name: "Crossbody Leo",
    description: "Невероятно вместительная, но при этом компактная! Уникальная сборка на резинке позволяет сумке *автоматически подстраиваться под содержимое*\n-Загрузили много? Сумка аккуратно расширяется, сохраняя форму.\n-Носите минимум? Остается изящной и не занимает места.\n\nДлина ручки регулируется.\nТри варианта носки: носите на поясе, через плече или с короткой ручкой на плече.\n\nВнутри сумочки есть вместительный карман на замке.\n\nМатериал: плотный атлас, пряжка алюминий.\n\nРазмер: длина:45, высота 16, ширина 23\n*могут быть погрешности, так как сумка не имеет четкой формы.\n\nColor: Black, Leo, Milk",
    price: "75",
    image: "product-6.png",
    category: "bags",
    gallery: ["product-7.png", "product-8.png"]
  },
  {
    name: "Shopper village",
    description: "Мягкая, стеганая сумка шоппер на замке.\nВнутри есть вместительный карман для самых ценных вещей.\nДоступна под заказ ! Варианты цветов в каталоге.\n\nМатериал: хлопок, синтепон\n\nРазмер : длина 48, высота 31, ширина 12, длина ручки 86см",
    price: "65",
    image: "product-7.png",
    category: "bags",
    gallery: ["product-8.png", "product-9.png"]
  },
  {
    name: "Bag Carnival Stripes",
    description: "Маленькая, но с характером: сумка, которая умеет быть элегантной и озорной одновременно, она сделает ваш лаконичный образ игривее и интересней\n\nМатериал: плотный атлас, хлопок\n\nРазмер: длина 35, высота 21, ширина 10см, длина ручки на выбор 90, 105",
    price: "70",
    image: "Carnival-main.gif",
    category: "bags",
    gallery: ["carnival_1.JPEG", "carnival_2.JPEG"]
  },
  {
    name: "Crossbody Black",
    description: "Невероятно вместительная, но при этом компактная! Уникальная сборка на резинке позволяет сумке *автоматически подстраиваться под содержимое*\n-Загрузили много? Сумка аккуратно расширяется, сохраняя форму.\n-Носите минимум? Остается изящной и не занимает места.\n\nДлина ручки регулируется.\nТри варианта носки: носите на поясе, через плече или с короткой ручкой на плече.\n\nВнутри сумочки есть вместительный карман на замке.\n\nМатериал: плотный атлас, пряжка алюминий.\n\nРазмер: длина:45, высота 16, ширина 23\n*могут быть погрешности, так как сумка не имеет четкой формы.\n\nColor: Black, Leo, Milk",
    price: "75",
    image: "crossbody-main.png",
    category: "bags",
    gallery: ["crossbody-2.png", "crossbody-3.png"]
  },
  {
    name: "Striped shopper",
    description: "Этот Невесомый шоппер станет вашим любимым аксессуаром. Его легко взять с собой в поездки, без труда помещается в маленькую сумочку или даже карман куртки.\n\nМатериал: хлопок 80%, ПЭ 20% , алюминий.\n\nРазмер: ширина 48, высота 39, длина ручки 79 см",
    price: "65",
    image: "product-9.png",
    category: "bags",
    gallery: ["product-2.png", "product-3.png"]
  }
];

// Helper function to create products with proper image paths
export function createProducts(imageBasePath: string = "/images/"): Product[] {
  return baseProducts.map((product, index) => ({
    ...product,
    id: index + 1,
    image: `${imageBasePath}${product.image}`,
    gallery: product.gallery.map(img => `${imageBasePath}${img}`)
  }));
}

// For static deployment (GitHub Pages)
export function createStaticProducts(): Product[] {
  return createProducts("/loera_site/images/");
}

// For server deployment
export function createServerProducts(): Product[] {
  return createProducts("/images/");
} 