import Header from "../components/Header";
import Footer from "../components/Footer";

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      {/* Main Content: Flex-1 makes it expand to fit the screen */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="text-center p-6 md:p-12 bg-white text-[#7F3C28] text-6xl lg:text-3xl">
          <h1 className="font-lobster">D&apos;Higüey Longanizas y Más</h1>
          <p className="mt-2 text-3xl lg:text-xl">
            Calidad y sabor 100% artesanal - Del campo a tu mesa
          </p>
        </section>

        {/* Product Section */}
        <section className="flex flex-wrap justify-center items-center gap-8 p-6 flex-1">
          {children}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
