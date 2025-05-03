import { AuthUser } from "@supabase/supabase-js";

type NavLinkClassType = {
  isActive: boolean;
  isPending: boolean;
};
export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("googleUser");
  return user ? JSON.parse(user) : null;
};

export const saveUserToLocalStorage = (user: AuthUser) => {
  localStorage.setItem("googleUser", JSON.stringify(user));
};

export const clearCache = (key: string) => {
  localStorage.removeItem(key);
};

// Determine the class for active and pending states
export const getNavLinkClass = ({
  isActive: active,
  isPending: pending,
}: NavLinkClassType) => {
  if (pending) return `pending-link`;
  if (active) return `primary-link`;
  return `inactive-link`;
};
