import { createContext, Context } from "react";
import { type CartContextType } from "./contextTypes";

const defaultCart: CartContextType = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateQuantity: () => {},
};
// Create the CartContext
export const CartContext: Context<CartContextType> = createContext(defaultCart);
