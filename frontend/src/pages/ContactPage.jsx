import { FaInstagram, FaWhatsapp, FaPhone, FaMailBulk } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6">
      <h1 className="text-[#7F3C28] text-3xl md:text-4xl font-bold mb-4">
        Contáctanos
      </h1>
      <p className="text-gray-700 text-lg md:text-xl">
        ¡Estamos aquí para servirte! Contáctanos a través de nuestras redes.
        Nuestro servicio de delivery opera desde Santo Domingo Este, llevamos
        calidad y sabor directamente a tu mesa.
      </p>

      {/* Contact Information */}
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-semibold text-[#7F3C28]">
          D&apos;Higüey Longanizas y Más
        </h2>
        <p className="text-gray-700 text-lg">Del campo a tu mesa</p>

        <div className="flex justify-center mt-4 space-x-6">
          <a
            href="mailto:dhigueylonganizas@gmail.com"
            className="text-[#7F3C28] hover:text-gray-600 transition"
          >
            <FaMailBulk size={32} />
          </a>
          <a
            href="https://www.instagram.com/dhigueylonganizasymas"
            className="text-[#7F3C28] hover:text-gray-600 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={32} />
          </a>
          <a
            href="https://wa.me/8496535551"
            className="text-[#7F3C28] hover:text-gray-600 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={32} />
          </a>
          <a
            href="tel:+18496535551"
            className="text-[#7F3C28] hover:text-gray-600 transition"
          >
            <FaPhone size={32} />
          </a>
        </div>

        <p className="mt-3 text-xl">
          Teléfono:{" "}
          <a
            href="tel:+18496535551"
            className="text-[#7F3C28] hover:text-gray-600 transition"
          >
            +1 (849) 653-5551
          </a>
        </p>
      </div>

      {/* Google Map Section */}
      <div className="mt-6 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-[#7F3C28] text-center mb-4">
          Nuestra Ubicación
        </h2>
        <div className="w-full h-64 md:h-96">
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
