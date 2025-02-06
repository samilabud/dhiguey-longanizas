import logo from "../assets/logo.png"; // Suppose you put the pig logo in src/assets

const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#7F3C28",
        padding: "1rem 2rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ height: "50px", marginRight: "1rem" }}
        />
        <span
          style={{
            fontFamily: "'Lobster', cursive",
            color: "#FFFFFF",
            fontSize: "1.8rem",
          }}
        >
          D&apos;Higüey Longanizas y Más
        </span>
      </div>

      {/* Future nav items can go here */}
    </header>
  );
};

export default Header;
