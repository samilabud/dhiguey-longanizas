import { FC, JSX, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Product } from "../common/types";
import { BACKEND_URL } from "../config";
import { CartContext } from "../context/CartContext";
import useCachedFetch from "../hooks/useCachedFetch";
import LoadingIndicator from "./LoadingIndicator";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// Settings for the react-slick slider
const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  initialSlide: 1,
  lazyLoad: "ondemand" as const,
};

const QuickBuy: FC = (): JSX.Element => {
  const {
    data: products,
    loading,
    error,
  } = useCachedFetch<Product>("productsCache", `${BACKEND_URL}/api/products`);

  const [quantity, setQuantity] = useState<number>(1);

  const { addToCart } = useContext(CartContext);
  const handleAddToCart = (productToAdd: Product) => {
    if (quantity > 0) {
      addToCart({ ...productToAdd, quantity });
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
    <div className="flex items-center justify-center p-4 lg:p-0">
      <div className="w-full max-w-4xl lg:max-w-3xl bg-white shadow-lg rounded-xl p-6 md:p-10">
        <h2 className="text-4xl lg:text-2xl font-bold mb-6 lg:mb-4 text-center text-primary whitespace-nowrap">
          🔥 ¡Auténtica Longaniza Artesanal Dominicana! 🇩🇴
        </h2>
        <div className="">
          {/* Product Image */}
          {product.images && product.images.length > 1 ? (
            <Slider {...sliderSettings}>
              {product.images.map((imgUrl, index) => (
                <div key={index}>
                  <img
                    src={imgUrl}
                    alt={`Imagen ${index + 1} de ${product.name}`}
                    className="product-image-slider mt-4 border-primary border-2 rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              src={product.images[0]}
              alt={product.name}
              className="product-image"
            />
          )}

          {/* Product Details */}
          <div className="mt-4 md:mt-0 md:ml-6 flex flex-col text-center md:text-left">
            <p className="text-gray-700 mt-2 text-3xl lg:text-xl text-justify">
              {product.description}
            </p>

            <div className="flex justify-between md:justify-between items-center mt-4">
              <label className="mr-2 lg:text-xl text-3xl font-semibold">
                Cantidad:
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-400 rounded-lg px-3 py-1 text-xl"
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

              <div className="w-full md:w-auto">
                <button
                  onClick={() => handleAddToCart(product)}
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
