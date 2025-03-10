import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../config";
import useCachedFetch from "../hooks/useCachedFetch";
import LoadingIndicator from "./LoadingIndicator";

const QuickBuy = () => {
  const {
    data: products,
    loading,
    error,
  } = useCachedFetch("productsCache", `${BACKEND_URL}/api/products`);

  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ ...product, quantity });
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error al cargar productos: {error}
      </div>
    );
  }

  const product = products[0]; // First product Longaniza Artesanal
  // Calculate total price
  const totalprice_dop = product.price_dop * quantity;

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-4xl lg:max-w-3xl bg-white shadow-lg rounded-xl p-6 md:p-10">
        <h2 className="text-4xl lg:text-2xl font-bold mb-6 text-center text-[#7F3C28] whitespace-nowrap">
          🔥 ¡Auténtica Longaniza Artesanal Dominicana! 🇩🇴
        </h2>
        <div className="flex flex-col md:flex-row items-center">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="product-image w-sm h-auto"
          />

          {/* Product Details */}
          <div className="mt-4 md:mt-0 md:ml-6 flex flex-col text-center md:text-left">
            <p className="text-gray-700 mt-2 text-3xl lg:text-xl">
              {product.description}
            </p>

            <div className="flex justify-between md:justify-start mt-4">
              <div>
                <label className="mr-2 lg:text-lg text-3xl font-semibold">
                  Cantidad:
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-400 rounded-lg px-3 py-1 text-lg"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <p className="product-price">
                  RD$&nbsp;
                  {totalprice_dop.toLocaleString("es-DO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="w-auto mt-4 ml-4 lg:mt-1">
                <button
                  onClick={handleAddToCart}
                  className="add-to-cart-button"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/products" className="secondary-button">
                Ver todos los productos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickBuy;
