// Fixed prices for products in BYN and RUB
export interface ProductPrices {
  [productId: number]: {
    BYN: string;
    RUB: string;
  };
}

export const fixedPrices: ProductPrices = {
  // Fluffy Hug Candy Pink
  1: {
    BYN: "265",
    RUB: "9500"
  },
  // Fluffy Hug Leo
  2: {
    BYN: "265",
    RUB: "9500"
  },
  // Fluffy Hug Forest Green
  3: {
    BYN: "265",
    RUB: "9500"
  },
  // Fluffy Hug Black
  4: {
    BYN: "265",
    RUB: "9500"
  },
  // Crossbody Black
  5: {
    BYN: "180",
    RUB: "6500"
  },
  // Shopper village
  6: {
    BYN: "130",
    RUB: "4600"
  },
  // Косметичка Polka dot «big»
  7: {
    BYN: "90",
    RUB: "3200"
  },
  // Косметичка Polka dot «small»
  8: {
    BYN: "75",
    RUB: "2700"
  },
  // Косметичка Candy Pink
  9: {
    BYN: "85",
    RUB: "3000"
  },
  // Shopper village
  10: {
    BYN: "85",
    RUB: "3000"
  },
  // Bag Carnival Stripes
  11: {
    BYN: "95",
    RUB: "3100"
  },
  // Crossbody Black
  12: {
    BYN: "300",
    RUB: "9100"
  },
  // Striper shopper
  13: {
    BYN: "250",
    RUB: "7200"
  },
};