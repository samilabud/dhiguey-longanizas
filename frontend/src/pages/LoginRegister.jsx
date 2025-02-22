import { useUser } from "../context/UserContext";

const LoginRegister = () => {
  const { user, handleLogin, handleSignOut } = useUser();

  return (
    <div className="bg-white rounded shadow overflow-hidden hover:shadow-md transition flex lg:block justify-center items-center lg:justify-normal">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        {user ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Hola, {user.user_metadata.full_name} 👋
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
            <p className="mt-6 text-center text-gray-600">
              Necesitamos que inicies sesión para poder enviarte la factura y
              mostrarte el historial de tus pedidos.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
