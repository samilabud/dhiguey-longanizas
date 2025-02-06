import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";

function App() {
  return (
    <div
      style={{ fontFamily: "'Open Sans', sans-serif", background: "#FFFFFF" }}
    >
      <Header />
      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "#FFFFFF",
          color: "#7F3C28",
        }}
      >
        <h1 style={{ fontFamily: "'Lobster', cursive", fontSize: "3rem" }}>
          D&apos;Higüey Longanizas y Más
        </h1>
        <p style={{ fontSize: "1.2rem" }}>
          Calidad y sabor 100% artesanal - Del campo a tu mesa
        </p>
      </section>

      {/* Product Section */}
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        <ProductCard />
      </section>

      <Footer />
    </div>
  );
}

export default App;
