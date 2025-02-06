import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#7F3C28",
        color: "#ffffff",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0 }}>D&apos;Higüey Longanizas y Más</p>
      <p style={{ margin: 0 }}>Del campo a tu mesa</p>

      <div
        style={{
          marginTop: "0.5rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <a
          href="https://www.instagram.com/dhigueylonganizasymas"
          style={{ color: "#ffffff" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={24} />
        </a>
        <a href="https://wa.me/8496535551" style={{ color: "#ffffff" }}>
          <FaWhatsapp size={24} />
        </a>
      </div>
      <p style={{ marginTop: "0.5rem" }}>Tel: +1 (849) 653-5551</p>
    </footer>
  );
};

export default Footer;
