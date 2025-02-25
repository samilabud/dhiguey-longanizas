import { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
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
  const [accountMenuOpen, setAccountMenuOpen] = useState(false); // Dropdown state
  const { role, loading, user, handleSignOut } = useUser();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleAccountMenu = () => setAccountMenuOpen(!accountMenuOpen);
  const handleLogout = async () => {
    await handleSignOut();
    navigate("/login-register");
  };

  return (
    <header className="bg-[#7F3C28] px-6 md:px-10 py-4">
      <div className="flex items-center justify-between">
        <HeaderTitle />

        {/* Desktop Menu (hidden on mobile) */}
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
              <NavLink to="/product-management" className={getNavLinkClass}>
                Gestiona Productos
              </NavLink>
            )}

            {/* Expandable Mi Cuenta Dropdown */}
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
                    to="/login-register"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setAccountMenuOpen(false)}
                  >
                    Ver mis órdenes
                  </NavLink>
                  {user && (
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Salir
                    </button>
                  )}
                </div>
              )}
            </div>
          </nav>
        )}

        {/* Mobile Menu Button */}
        {isTabletOrMobile && (
          <button
            className="text-white text-5xl focus:outline-none z-50"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}

        {/* Overlay for mobile menu */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleMenu}
          />
        )}

        {/* Mobile Sidebar Menu */}
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
              <NavLink
                to="/product-management"
                className={getNavLinkClass}
                onClick={toggleMenu}
              >
                Gestiona Productos
              </NavLink>
            )}

            {/* Expandable Account Menu for Mobile */}
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
                      to="/login-register"
                      className={getNavLinkClass}
                      onClick={() => {
                        toggleMenu();
                        setAccountMenuOpen(false);
                      }}
                    >
                      Ver mis órdenes
                    </NavLink>
                    {user && (
                      <button
                        onClick={() => {
                          handleLogout();
                          toggleMenu();
                        }}
                        className="text-left text-white hover:underline"
                      >
                        Salir
                      </button>
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
