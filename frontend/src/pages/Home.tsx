import { Helmet } from "react-helmet-async";
import QuickBuy from "../components/QuickBuy";
import { FC, JSX } from "react";

const Home: FC = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>
          D&apos;Higüey Longanizas y Más - Del campo a tu mesa | Inicio
        </title>
        <meta
          name="description"
          content="D'Higüey Longanizas y Más - Ofrecemos longanizas frescas y otros productos del campo a tu mesa con servicio de delivery en Santo Domingo Este."
        />
      </Helmet>
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
    </>
  );
};

export default Home;
