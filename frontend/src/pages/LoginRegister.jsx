import { useState, useEffect } from "react";
import GoogleAuth from "../components/GoogleAuth";
import { getUserFromLocalStorage } from "../common/account";

const LoginRegister = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage on component mount
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="bg-white rounded shadow overflow-hidden hover:shadow-md transition flex lg:block justify-center items-center lg:justify-normal">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        {user ? (
          // If user is logged in, show profile information
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Bienvenido, {user.name} 👋
            </h2>
            <img
              src={user.picture}
              alt="User Profile"
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />
            <p className="text-gray-600 mb-2">{user.email}</p>
            <button
              onClick={() => {
                localStorage.removeItem("googleUser"); // Clear user data
                setUser(null);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          // If no user, show login options
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Iniciar Sesión / Registrarse
            </h2>
            <div className="text-center">
              <h2>Iniciar sesión usando Google</h2>
              <GoogleAuth
                callbackAuthentication={(storedUser) => {
                  setUser(storedUser);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
