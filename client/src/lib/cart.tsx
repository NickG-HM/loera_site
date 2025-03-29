import { createContext, useContext, useReducer, ReactNode } from "react";
import { Product, CartItem } from "@shared/schema";
import { apiRequest, queryClient } from "./queryClient";

interface CartState {
  items: (CartItem & { product: Product })[];
  total: number;
}

type CartAction =
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "UPDATE_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR_CART" };

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        items: action.payload.map(item => ({
          ...item,
          product: {} as Product
        })),
        total: calculateTotal(action.payload)
      };
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, { ...action.payload, product: {} as Product }],
        total: calculateTotal([...state.items, action.payload])
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
        total: calculateTotal(state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ))
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: calculateTotal(state.items.filter(item => item.id !== action.payload))
      };
    case "CLEAR_CART":
      return {
        items: [],
        total: 0
      };
    default:
      return state;
  }
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + Number(item.quantity), 0);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addToCart = async (product: Product, quantity: number) => {
    const response = await apiRequest("POST", "api/cart", {
      productId: product.id,
      quantity
    });
    const item = await response.json();
    dispatch({ type: "ADD_ITEM", payload: item });
    queryClient.invalidateQueries({ queryKey: ["api/cart"] });
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    const response = await apiRequest("PATCH", `api/cart/${itemId}`, {
      quantity
    });
    const item = await response.json();
    dispatch({ type: "UPDATE_ITEM", payload: item });
    queryClient.invalidateQueries({ queryKey: ["api/cart"] });
  };

  const removeFromCart = async (itemId: number) => {
    await apiRequest("DELETE", `api/cart/${itemId}`);
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
    queryClient.invalidateQueries({ queryKey: ["api/cart"] });
  };

  const clearCart = async () => {
    await apiRequest("DELETE", "api/cart");
    dispatch({ type: "CLEAR_CART" });
    queryClient.invalidateQueries({ queryKey: ["api/cart"] });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}