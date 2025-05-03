import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { getNavLinkClass } from "../common/utils";
import { NavLink } from "react-router-dom";
import { FC, JSX } from "react";

const Footer: FC = (): JSX.Element => {
  return (
    <footer className="bg-primary text-white text-center p-4 gap-4 lg:gap-0 flex flex-col">
      {/* Social Media Icons */}
      <div className="mt-2 flex justify-center gap-4">
        <a
          href="https://www.instagram.com/dhigueylonganizasymas"
          aria-label="Visit our Instagram"
          className="social-icon-link-footer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="social-icon" />
        </a>
        <a
          href="https://wa.me/8496535551"
          aria-label="Chat on WhatsApp"
          className="social-icon-link-footer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="social-icon" />
        </a>
      </div>

      {/* Additional Menu */}
      <nav className="mt-4">
        <ul className="flex justify-center gap-4 text-4xl lg:text-xl">
          <li>
            <NavLink to="/terms-and-conditions" className={getNavLinkClass}>
              Términos y Condiciones
            </NavLink>
          </li>
          <li>
            <NavLink to="/faqs" className={getNavLinkClass}>
              FAQs
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Contact Information */}
      <p className="mt-2 text-4xl lg:text-xl">
        Tel:{" "}
        <a
          href="https://wa.me/8496535551"
          className="text-white hover:text-gray-300 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          +1 (849) 653-5551
        </a>
      </p>
    </footer>
  );
};

export default Footer;
