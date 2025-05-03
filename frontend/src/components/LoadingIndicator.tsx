import { FC, JSX } from "react";

const LoadingIndicator: FC = (): JSX.Element => {
  return (
    <div className="p-6 text-center flex flex-col items-center">
      <span className="text-primary">Cargando...</span>
      <img
        className="mx-auto max-h-18"
        src="/images/loading-indicator.gif"
        alt="Cargando..."
      />
    </div>
  );
};

export default LoadingIndicator;
