import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const Footer = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <footer className="bg-[#7F3C28] text-white text-center p-4 text-4xl lg:text-xl">
      <p className="m-0">D&apos;Higüey Longanizas y Más</p>
      <p className="m-0">Del campo a tu mesa</p>

      {/* Social Media Icons */}
      <div className="mt-2 flex justify-center gap-4">
        <a
          href="https://www.instagram.com/dhigueylonganizasymas"
          className="text-white hover:text-gray-300 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={isTabletOrMobile ? 48 : 24} />
        </a>
        <a
          href="https://wa.me/8496535551"
          className="text-white hover:text-gray-300 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={isTabletOrMobile ? 48 : 24} />
        </a>
      </div>

      {/* Contact Info */}
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
