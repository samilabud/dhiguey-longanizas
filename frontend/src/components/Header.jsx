import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-[#7F3C28] px-6 md:px-10 py-4">
      <Link to="/" className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-12 md:h-14" />
        <span className="text-white font-lobster text-3xl lg:text-3xl">
          D&apos;Higüey Longanizas y Más
        </span>
      </Link>
    </header>
  );
};

export default Header;
