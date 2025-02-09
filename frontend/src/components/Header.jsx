import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[#7F3C28] px-6 md:px-10 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-12 md:h-14" />
          <span className="text-white font-lobster text-2xl md:text-3xl">
            D&apos;Higüey Longanizas y Más
          </span>
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-300 transition">
            Inicio
          </Link>
          <Link
            to="/gallery"
            className="text-white hover:text-gray-300 transition"
          >
            Productos
          </Link>
          {/* <Link
            to="/login-register"
            className="text-white hover:text-gray-300 transition"
          >
            Mi Cuenta
          </Link> */}
          <Link
            to="/cart"
            className="text-white hover:text-gray-300 transition"
          >
            Carrito
          </Link>
          {/* <Link
            to="/orders"
            className="text-white hover:text-gray-300 transition"
          >
            Ordenes
          </Link> */}
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <nav className="md:hidden mt-4 space-y-2">
          <Link
            to="/gallery"
            className="block text-white hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Gallery
          </Link>
          <Link
            to="/login-register"
            className="block text-white hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Login/Register
          </Link>
          <Link
            to="/cart"
            className="block text-white hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Cart
          </Link>
          <Link
            to="/orders"
            className="block text-white hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Order List
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
