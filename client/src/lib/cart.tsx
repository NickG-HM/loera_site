import React, { createContext, useContext, ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CartItem, InsertCartItem } from "@shared/schema";

interface CartContextType {
  addToCart: (item: InsertCartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Local storage functions for static mode
const getLocalCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const setLocalCart = (items: CartItem[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(items));
};

export function CartProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  // Use local storage in production, API in development
  const { data: cartItems = [] } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
    queryFn: () => {
      if (import.meta.env.PROD) {
        return Promise.resolve(getLocalCart());
      } else {
        return fetch("/api/cart").then(res => res.json());
      }
    }
  });

  const addToCartMutation = useMutation({
    mutationFn: async (item: InsertCartItem) => {
      if (import.meta.env.PROD) {
        // Local storage implementation
        const currentCart = getLocalCart();
        const existingItem = currentCart.find(cartItem => cartItem.productId === item.productId);
        
        let newCart: CartItem[];
        if (existingItem) {
          newCart = currentCart.map(cartItem =>
            cartItem.productId === item.productId
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          );
        } else {
          const newItem: CartItem = {
            id: Date.now(), // Simple ID generation for static mode
            productId: item.productId,
            quantity: item.quantity
          };
          newCart = [...currentCart, newItem];
        }
        
        setLocalCart(newCart);
        return newCart[newCart.length - 1];
      } else {
        // API implementation
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        return response.json();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      if (import.meta.env.PROD) {
        // Local storage implementation
        const currentCart = getLocalCart();
        const newCart = currentCart.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        setLocalCart(newCart);
        return newCart.find(item => item.id === id);
      } else {
        // API implementation
        const response = await fetch(`/api/cart/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        });
        return response.json();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (id: number) => {
      if (import.meta.env.PROD) {
        // Local storage implementation
        const currentCart = getLocalCart();
        const newCart = currentCart.filter(item => item.id !== id);
        setLocalCart(newCart);
        return;
      } else {
        // API implementation
        await fetch(`/api/cart/${id}`, { method: "DELETE" });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      if (import.meta.env.PROD) {
        // Local storage implementation
        setLocalCart([]);
        return;
      } else {
        // API implementation
        await fetch("/api/cart", { method: "DELETE" });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const addToCart = (item: InsertCartItem) => {
    addToCartMutation.mutate(item);
  };

  const updateQuantity = (id: number, quantity: number) => {
    updateQuantityMutation.mutate({ id, quantity });
  };

  const removeFromCart = (id: number) => {
    removeFromCartMutation.mutate(id);
  };

  const clearCart = () => {
    clearCartMutation.mutate();
  };

  return (
    <CartContext.Provider value={{ addToCart, updateQuantity, removeFromCart, clearCart }}>
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