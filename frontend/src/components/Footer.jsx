import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#7F3C28] text-white text-center p-4">
      {/* Social Media Icons */}
      <div className="mt-2 flex justify-center gap-4">
        <a
          href="https://www.instagram.com/dhigueylonganizasymas"
          aria-label="Visit our Instagram"
          className="text-white hover:text-gray-300 transition transform hover:scale-105"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="w-6 h-6 md:w-12 md:h-12" />
        </a>
        <a
          href="https://wa.me/8496535551"
          aria-label="Chat on WhatsApp"
          className="text-white hover:text-gray-300 transition transform hover:scale-105"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="w-6 h-6 md:w-12 md:h-12" />
        </a>
      </div>

      {/* Additional Menu */}
      <nav className="mt-4">
        <ul className="flex justify-center gap-4">
          <li>
            <a
              href="/terms-and-conditions"
              className="text-white hover:text-gray-300 transition"
            >
              Términos y Condiciones
            </a>
          </li>
          <li>
            <a
              href="/faqs"
              className="text-white hover:text-gray-300 transition"
            >
              FAQs
            </a>
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
