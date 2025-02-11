import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import logo from "../assets/logo.png";

const HeaderTitle = () => {
  return (
    <Link to="/" className="flex items-center space-x-3">
      <img
        src={logo}
        alt="Logo"
        className="h-40 lg:h-16 drop-shadow-lg filter brightness-110"
      />
      <span className="text-white font-lobster text-4xl lg:text-2xl drop-shadow-md">
        D&apos;Higüey Longanizas y Más
      </span>
    </Link>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-[#7F3C28] px-6 md:px-10 py-4">
      <div className="flex items-center justify-between">
        <HeaderTitle />

        {/* Desktop Menu (hidden on mobile) */}
        {!isTabletOrMobile && (
          <nav className="flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-300 transition">
              Inicio
            </Link>
            <Link
              to="/products"
              className="text-white hover:text-gray-300 transition"
            >
              Productos
            </Link>
            <Link
              to="/cart"
              className="text-white hover:text-gray-300 transition"
            >
              Carrito
            </Link>
          </nav>
        )}

        {/* Mobile Menu Button */}
        {isTabletOrMobile && (
          <button
            className="text-white text-2xl focus:outline-none z-50"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed left-0 top-0 h-full w-56 bg-[#7F3C28] shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-6 flex flex-col space-y-6 text-3xl">
          <div>
            <img
              src={logo}
              alt="Logo"
              className="h-40 lg:h-16 drop-shadow-lg filter brightness-110"
            />
          </div>

          <Link
            to="/"
            className="text-white hover:text-gray-300 transition"
            onClick={toggleMenu}
          >
            Inicio
          </Link>
          <Link
            to="/products"
            className="text-white hover:text-gray-300 transition"
            onClick={toggleMenu}
          >
            Productos
          </Link>
          <Link
            to="/cart"
            className="text-white hover:text-gray-300 transition"
            onClick={toggleMenu}
          >
            Carrito
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
