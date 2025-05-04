import { FC, JSX } from "react";
const Cancel: FC = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center mt-24">
      <h1 className="text-red-600 text-center text-4xl lg:text-2xl mt-6">
        ❌ Pago cancelado
      </h1>
      <p className="text-center mt-2 text-3xl lg:text-2xl">
        Tu pago no se ha procesado. Si crees que esto es un error, inténtalo de
        nuevo o contáctanos.
      </p>
    </div>
  );
};

export default Cancel;
