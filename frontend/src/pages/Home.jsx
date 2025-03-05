import QuickBuy from "../components/QuickBuy";

function Home() {
  return (
    <div>
      <section className="text-center p-6 md:p-12 bg-white text-[#7F3C28] text-6xl lg:text-3xl">
        <h1
          className="text-3xl font-bold"
          style={{ fontFamily: '"Lato", sans-serif' }}
        >
          D&apos;Higüey Longanizas y Más
        </h1>
        <p className="mt-2 text-3xl lg:text-xl">
          Calidad y sabor 100% artesanal - Del campo a tu mesa
        </p>
      </section>
      <QuickBuy />
    </div>
  );
}

export default Home;
