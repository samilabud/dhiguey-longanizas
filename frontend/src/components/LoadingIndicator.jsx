const LoadingIndicator = () => {
  return (
    <div className="p-6 text-center flex flex-col items-center">
      <span className="text-primary">Cargando...</span>
      <img
        className="mx-auto"
        src="/images/loading-indicator.gif"
        alt="Cargando..."
      />
    </div>
  );
};

export default LoadingIndicator;
