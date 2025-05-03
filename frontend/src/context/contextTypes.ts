import { AuthUser } from "@supabase/supabase-js";
import { type Product } from "../common/types";

export type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: Product["id"]) => void;
  clearCart: () => void;
  updateQuantity: (id: Product["id"], quantity: number) => void;
};

export type UserContextType = {
  user: AuthUser | null;
  loading: boolean;
  handleLogin: () => void;
  handleSignOut: () => void;
  role: string | null;
  error: string | null;
  phoneNumber: string | null;
};
