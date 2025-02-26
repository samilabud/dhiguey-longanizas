import { useState } from "react";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { getNavLinkClass } from "../common/utils";
import { useUser } from "../context/UserContext";

const HeaderTitle = () => {
  return (
    <Link to="/" className="flex items-center space-x-3">
      <img
        src={logo}
        alt="Logo"
        className="h-40 lg:h-16 drop-shadow-lg filter brightness-110"
      />
      <span className="text-white font-lobster text-5xl lg:text-2xl drop-shadow-md">
        D&apos;Higüey Longanizas y Más
      </span>
    </Link>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false); // Dropdown de Mi Cuenta
  const [adminMenuOpen, setAdminMenuOpen] = useState(false); // Dropdown de Administración
  const { role, loading, user, handleSignOut } = useUser();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleAccountMenu = () => setAccountMenuOpen(!accountMenuOpen);
  const toggleAdminMenu = () => setAdminMenuOpen(!adminMenuOpen);

  const handleLogout = async () => {
    await handleSignOut();
    setAccountMenuOpen(false);
    navigate("/my-account");
  };

  return (
    <header className="bg-[#7F3C28] px-6 md:px-10 py-4">
      <div className="flex items-center justify-between">
        <HeaderTitle />

        {/* Menú de escritorio (oculto en mobile) */}
        {!isTabletOrMobile && (
          <nav className="flex space-x-6 relative">
            <NavLink to="/" className={getNavLinkClass}>
              Inicio
            </NavLink>
            <NavLink to="/products" className={getNavLinkClass}>
              Productos
            </NavLink>
            <NavLink to="/cart" className={getNavLinkClass}>
              Carrito
            </NavLink>
            <NavLink to="/contact" className={getNavLinkClass}>
              Contáctanos
            </NavLink>
            {loading === false && role === "admin" && (
              <div className="relative">
                <button
                  onClick={toggleAdminMenu}
                  className="flex items-center space-x-2 text-white hover:underline focus:outline-none"
                >
                  <span>Administración</span>
                  <FaChevronDown className="ml-1" />
                </button>
                {adminMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                    <NavLink
                      to="/product-management"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setAdminMenuOpen(false)}
                    >
                      Gestionar productos
                    </NavLink>
                    <NavLink
                      to="/add-product"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setAdminMenuOpen(false)}
                    >
                      Agregar productos
                    </NavLink>
                    <NavLink
                      to="/create-manual-invoice"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setAdminMenuOpen(false)}
                    >
                      Crear factura manual
                    </NavLink>
                    <NavLink
                      to="/generated-invoices"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setAdminMenuOpen(false)}
                    >
                      Facturas generadas
                    </NavLink>
                  </div>
                )}
              </div>
            )}

            {/* Dropdown de Mi Cuenta */}
            <div className="relative">
              <button
                onClick={toggleAccountMenu}
                className="flex items-center space-x-2 text-white hover:underline focus:outline-none"
              >
                {loading === false && user
                  ? `Hola, ${user.user_metadata.full_name}`
                  : "Mi Cuenta"}
                {user && <FaChevronDown className="ml-1" />}
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                  <NavLink
                    to="/my-account"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setAccountMenuOpen(false)}
                  >
                    Ver mis órdenes
                  </NavLink>
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Salir
                    </button>
                  ) : (
                    <NavLink
                      to="/my-account"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setAccountMenuOpen(false)}
                    >
                      Iniciar Sesión
                    </NavLink>
                  )}
                </div>
              )}
            </div>
          </nav>
        )}

        {/* Botón de menú para mobile */}
        {isTabletOrMobile && (
          <button
            className="text-white text-5xl focus:outline-none z-50"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}

        {/* Overlay para menú mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleMenu}
          />
        )}

        {/* Menú lateral para mobile */}
        <div
          className={`fixed left-0 top-0 h-full w-56 bg-[#7F3C28] shadow-lg transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="p-6 flex flex-col space-y-8 text-4xl">
            <Link
              to="/"
              className="flex items-center space-x-3"
              onClick={toggleMenu}
            >
              <img
                src={logo}
                alt="Logo"
                className="h-40 lg:h-16 drop-shadow-lg filter brightness-110"
              />
            </Link>

            <NavLink to="/" className={getNavLinkClass} onClick={toggleMenu}>
              Inicio
            </NavLink>
            <NavLink
              to="/products"
              className={getNavLinkClass}
              onClick={toggleMenu}
            >
              Productos
            </NavLink>
            <NavLink
              to="/cart"
              className={getNavLinkClass}
              onClick={toggleMenu}
            >
              Carrito
            </NavLink>
            <NavLink
              to="/contact"
              className={getNavLinkClass}
              onClick={toggleMenu}
            >
              Contacto
            </NavLink>

            {loading === false && role === "admin" && (
              <div className="flex flex-col">
                <button
                  onClick={toggleAdminMenu}
                  className="flex items-center justify-between  text-white hover:underline focus:outline-none"
                >
                  Gestión del Sistema
                  <FaChevronDown />
                </button>
                {adminMenuOpen && (
                  <div className="flex flex-col space-y-4 pl-4 text-3xl mt-4">
                    <NavLink
                      to="/product-management"
                      className={getNavLinkClass}
                      onClick={() => {
                        toggleMenu();
                        setAdminMenuOpen(false);
                      }}
                    >
                      Gestionar productos
                    </NavLink>
                    <NavLink
                      to="/add-product"
                      className={getNavLinkClass}
                      onClick={() => {
                        toggleMenu();
                        setAdminMenuOpen(false);
                      }}
                    >
                      Agregar productos
                    </NavLink>
                    <NavLink
                      to="/create-manual-invoice"
                      className={getNavLinkClass}
                      onClick={() => {
                        toggleMenu();
                        setAdminMenuOpen(false);
                      }}
                    >
                      Crear factura manual
                    </NavLink>
                    <NavLink
                      to="/generated-invoices"
                      className={getNavLinkClass}
                      onClick={() => {
                        toggleMenu();
                        setAdminMenuOpen(false);
                      }}
                    >
                      Facturas generadas
                    </NavLink>
                  </div>
                )}
              </div>
            )}
            {!user && (
              <NavLink
                to="/my-account"
                className={getNavLinkClass}
                onClick={toggleMenu}
              >
                Iniciar Sesión
              </NavLink>
            )}

            {/* Menú desplegable de Cuenta en mobile */}
            {user && (
              <div className="flex flex-col">
                <span className="text-white mb-2">
                  {user.user_metadata.full_name}
                </span>
                <button
                  onClick={toggleAccountMenu}
                  className="flex items-center justify-between text-white hover:underline focus:outline-none"
                >
                  Cuenta
                  <FaChevronDown />
                </button>
                {accountMenuOpen && (
                  <div className="flex flex-col space-y-2 pl-4">
                    <NavLink
                      to="/my-account"
                      className={getNavLinkClass}
                      onClick={() => {
                        toggleMenu();
                        setAccountMenuOpen(false);
                      }}
                    >
                      Ver mis órdenes
                    </NavLink>
                    {user ? (
                      <button
                        onClick={() => {
                          handleLogout();
                          toggleMenu();
                        }}
                        className="text-left text-white hover:underline"
                      >
                        Salir
                      </button>
                    ) : (
                      <NavLink
                        to="/my-account"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => toggleMenu()}
                      >
                        Iniciar Sesión
                      </NavLink>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
