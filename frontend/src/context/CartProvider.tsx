import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { type ProductWithQuantity } from "../common/types";

type CartProviderProps = {
  children: React.ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<ProductWithQuantity[]>([]);

  // Load cart from local storage on mount
  useEffect(() => {
    const storedCart: string | null = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Whenever cart changes, store it in local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product: ProductWithQuantity) => {
    setCart((prevCart: ProductWithQuantity[]) => [...prevCart, product]);
  };

  // Remove item from cart
  const removeFromCart = (productId: ProductWithQuantity["id"]) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (id: ProductWithQuantity["id"], quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
