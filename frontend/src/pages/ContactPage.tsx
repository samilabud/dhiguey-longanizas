import { FC, JSX } from "react";
import { FaInstagram, FaMailBulk, FaPhone, FaWhatsapp } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const ContactPage: FC = (): JSX.Element => {
  const isTabletOrMobile: boolean = useMediaQuery({
    query: "(max-width: 1224px)",
  });
  return (
    <div className="bg-white flex flex-col items-center p-6 lg:gap-1 gap-10 overflow-y-auto">
      <h1 className="text-primary text-5xl lg:text-3xl font-bold mb-4">
        Contáctanos
      </h1>
      <p className="text-gray-700 text-4xl lg:text-xl p-2 text-justify">
        ¡Estamos aquí para servirte! Contáctanos a través de nuestras redes.
        Nuestro servicio de delivery opera desde Santo Domingo Este, llevamos
        calidad y sabor directamente a tu mesa.
      </p>

      {/* Contact Information */}
      <div className="mt-6 text-center">
        <h2 className="text-4xl lg:text-2xl font-semibold text-primary block lg:hidden">
          D&apos;Higüey Longanizas y Más
        </h2>
        <p className="text-gray-700 text-4xl lg:text-lg lg:mt-0 mt-1 block lg:hidden">
          Del campo a tu mesa
        </p>

        <div className="flex justify-center mt-4 space-x-6">
          <a
            className="social-icon-link"
            href="mailto:dhigueylonganizas@gmail.com"
          >
            <FaMailBulk
              className="social-icon"
              size={isTabletOrMobile ? 64 : 32}
            />
          </a>
          <a
            href="https://www.instagram.com/dhigueylonganizasymas"
            className="social-icon-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={isTabletOrMobile ? 64 : 32} />
          </a>
          <a
            href="https://wa.me/8496535551"
            className="social-icon-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={isTabletOrMobile ? 64 : 32} />
          </a>
          <a href="tel:+18496535551" className="social-icon-link">
            <FaPhone size={isTabletOrMobile ? 64 : 32} />
          </a>
        </div>

        <p className="mt-3 text-4xl lg:text-xl">
          Teléfono:{" "}
          <a href="tel:+18496535551" className="social-icon-link">
            +1 (849) 653-5551
          </a>
        </p>
      </div>

      {/* Google Map Section */}
      <div className="mt-6 lg:mt-3 w-full max-w-4xl">
        <h2 className="text-4xl lg:text-2xl font-semibold text-primary text-center mb-4 lg:mb-2">
          Nuestra Ubicación
        </h2>
        <div className="w-full h-64 md:h-80">
          <iframe
            title="D'Higüey Longanizas y Más Location"
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30273.674523381703!2d-69.8259125!3d18.4860575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea56428c8f9a229%3A0xf2cfa1dbb91b6de4!2sSanto%20Domingo%20Este%2C%20Dominican%20Republic!5e0!3m2!1sen!2sdo!4v1700000000000!5m2!1sen!2sdo"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
