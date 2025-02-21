import { useState, useEffect } from "react";
import { supabase } from "../common/supabaseClient";
import {
  getUserFromLocalStorage,
  saveUserToLocalStorage,
} from "../common/utils";

const LoginRegister = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Get user data from localStorage on component mount
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    // Check if user is already logged in
    if (user) return;
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        saveUserToLocalStorage(data.user);
      }
      if (error) console.error("Fetch user error:", error.message);
    };
    fetchUser();
  }, [user]);
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem("googleUser");
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Google Sign-In Error:", error.message);
  };

  return (
    <div className="bg-white rounded shadow overflow-hidden hover:shadow-md transition flex lg:block justify-center items-center lg:justify-normal">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        {user ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Bienvenido, {user.user_metadata.full_name} 👋
            </h2>
            <img
              src={user.user_metadata.avatar_url}
              alt="User Profile Picture"
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center text-[#7F3C28]">
              Iniciar Sesión / Registrarse
            </h2>
            <div className="text-center">
              <button
                onClick={handleLogin}
                className="bg-[#7F3C28] text-white px-6 rounded-md hover:bg-[#4C150B] transition cursor-pointer text-4xl lg:text-xl h-28 lg:h-18"
              >
                Iniciar sesión con Google
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
