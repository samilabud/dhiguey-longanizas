import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { getNavLinkClass } from "../common/helper";

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
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-[#7F3C28] px-6 md:px-10 py-4">
      <div className="flex items-center justify-between">
        <HeaderTitle />

        {/* Desktop Menu (hidden on mobile) */}
        {!isTabletOrMobile && (
          <nav className="flex space-x-6">
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
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed left-0 top-0 h-full w-56 bg-[#7F3C28] shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-6 flex flex-col space-y-8 text-4xl">
          <div>
            <img
              src={logo}
              alt="Logo"
              className="h-40 lg:h-16 drop-shadow-lg filter brightness-110"
            />
          </div>

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
          <NavLink to="/cart" className={getNavLinkClass} onClick={toggleMenu}>
            Carrito
          </NavLink>
          <NavLink
            to="/contact"
            className={getNavLinkClass}
            onClick={toggleMenu}
          >
            Contacto
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
