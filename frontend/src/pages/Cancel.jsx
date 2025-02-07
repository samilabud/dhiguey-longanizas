import Layout from "./Layout";

const Cancel = () => {
  return (
    <Layout>
      <h1 className="text-red-600 text-center text-2xl mt-6">
        ❌ Pago cancelado
      </h1>
      <p className="text-center mt-2">
        Tu pago no se ha procesado. Si crees que esto es un error, inténtalo de
        nuevo o contáctanos.
      </p>
    </Layout>
  );
};

export default Cancel;
