import { useContext, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Slider from "react-slick";
import LoadingIndicator from "../components/LoadingIndicator";
import { BACKEND_URL } from "../config";
import { CartContext } from "../context/CartContext";
import useCachedFetch from "../hooks/useCachedFetch";
import { Helmet } from "react-helmet";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const MAX_LENGTH = 90;

const Products = () => {
  const {
    data: products,
    loading,
    error,
  } = useCachedFetch("productsCache", `${BACKEND_URL}/api/products`);

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

  return (
    <>
      <Helmet>
        <title>D&apos;Higüey Longanizas y Más | Catalogo de productos</title>
        <meta
          name="description"
          content="D'Higüey Longanizas y Más - catalogo de productos"
        />
      </Helmet>
      <div className="p-6">
        <h2 className="text-5xl lg:text-3xl font-bold mb-6 text-center text-[#7F3C28]">
          Nuestra Galería de Productos
        </h2>
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 max-w-4xl lg:max-w-5xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

// Settings for the react-slick slider
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
};
const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  const truncatedDescription =
    product.description.length > MAX_LENGTH
      ? product.description.substring(0, MAX_LENGTH) + "..."
      : product.description;

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ ...product, quantity });
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value > 0 ? value : 1);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="bg-white rounded shadow overflow-hidden hover:shadow-md transition flex lg:block justify-center items-center lg:justify-normal">
      {product.images && product.images.length > 1 ? (
        <div className="w-1/2 lg:w-full">
          <Slider {...sliderSettings}>
            {product.images.map((imgUrl, index) => (
              <div key={index}>
                <img
                  src={imgUrl}
                  alt={`Imagen ${index + 1} de ${product.name}`}
                  className="product-image-slider "
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image w-3/6 lg:w-full lg:h-auto"
        />
      )}
      <div className="p-3 lg:p-4 text-left ml-6 lg:ml-0">
        <h3 className="text-4xl lg:text-xl font-semibold mb-2">
          {product.name}
        </h3>
        <p className="text-gray-700 mb-2 text-4xl lg:text-xl mt-2 lg:mt-0">
          {isExpanded ? product.description : truncatedDescription}
          {product.description.length > MAX_LENGTH && (
            <button
              onClick={toggleDescription}
              className="link-button-inside-text"
            >
              {isExpanded ? "Ver menos" : "Ver más"}
            </button>
          )}
        </p>
        <p className="product-price">
          RD$ {product.price_dop} {product.selling_by}
        </p>

        {product.available ? (
          <div className="mt-3 flex items-center gap-2">
            <button onClick={decreaseQuantity} className="text-4xl lg:text-xl">
              <FaMinus className="hover:text-call-to-action transition cursor-pointer" />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="w-16 border border-gray-300 rounded px-2 py-1 text-center text-4xl lg:text-xl"
            />
            <button onClick={increaseQuantity} className="text-4xl lg:text-xl">
              <FaPlus className="hover:text-call-to-action transition cursor-pointer" />
            </button>
            <button onClick={handleAddToCart} className="add-to-cart-button">
              Agregar al carrito
            </button>
          </div>
        ) : (
          <div className="mt-3 flex items-center gap-2">
            <p className="mt-2 text-red-500 text-3xl lg:text-xl font-bold">
              AGOTADO
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
