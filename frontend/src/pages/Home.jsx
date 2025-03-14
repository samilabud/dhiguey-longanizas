import QuickBuy from "../components/QuickBuy";

function Home() {
  return (
    <section className="text-center p-6 md:p-8 text-primary text-6xl lg:text-3xl flex flex-col mt-20 lg:mt-0">
      <h1
        className="text-4xl font-bold"
        style={{ fontFamily: '"Lato", sans-serif' }}
      >
        D&apos;Higüey Longanizas y Más
      </h1>
      <p className="text-3xl lg:text-xl">
        Calidad y sabor 100% artesanal - Del campo a tu mesa
      </p>
      <QuickBuy />
    </section>
  );
}

export default Home;
