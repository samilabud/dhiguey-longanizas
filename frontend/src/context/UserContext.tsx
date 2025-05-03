import { AuthUser } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../common/supabaseClient";
import {
  getUserFromLocalStorage,
  saveUserToLocalStorage,
} from "../common/utils";
import { type UserContextType } from "./contextTypes";

const userContextDefaultValue: UserContextType = {
  user: null,
  loading: true,
  handleLogin: () => {},
  handleSignOut: () => {},
  role: null,
  error: null,
  phoneNumber: null,
};

// Create the context
const UserContext = createContext(userContextDefaultValue);

// Custom hook for easy access
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);

type UserProviderProps = {
  children: React.ReactNode;
};
// Provider component
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Check if the user is logged in via Supabase
  useEffect(() => {
    if (user) return;

    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user as AuthUser);
        saveUserToLocalStorage(data.user);

        // Fetch the user's role from the profiles table
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role, phone")
          .eq("email", data.user.email)
          .single();

        if (profileError) {
          setError("Failed to fetch user role.");
        } else {
          setRole(profile.role);
          setPhoneNumber(profile.phone);
        }
      }
      if (error) {
        if (error.name !== "AuthSessionMissingError") {
          console.error("Fetch user error:", error.message);
        }
        setError(error.message);
      }
    };

    fetchUser();
  }, [user]);

  // Login with Google
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Google Sign-In Error:", error.message);
      setError(error.message);
    }
  };

  // Sign out the user
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole("user");
    setPhoneNumber(null);
    localStorage.removeItem("googleUser");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        handleLogin,
        handleSignOut,
        role,
        error,
        phoneNumber,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
