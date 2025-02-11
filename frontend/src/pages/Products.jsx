import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import products from "../data/products";

const MAX_LENGTH = 90;

const Products = () => {
  return (
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
  );
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

  return (
    <div className="bg-white rounded shadow overflow-hidden hover:shadow-md transition flex lg:block justify-center items-center lg:justify-normal">
      <img
        src={product.image}
        alt={product.name}
        className="w-1/2 h-3/4 lg:w-full lg:h-auto max-h-[300px] rounded-xl transform transition duration-300 ease-in-out hover:scale-105"
      />
      <div className="p-3 lg:p-4 text-left ml-6 lg:ml-0">
        <h3 className="text-4xl lg:text-xl font-semibold mb-2">
          {product.name}
        </h3>
        <p className="text-gray-700 mb-2 text-4xl lg:text-xl mt-2 lg:mt-0">
          {isExpanded ? product.description : truncatedDescription}
          {product.description.length > MAX_LENGTH && (
            <button
              onClick={toggleDescription}
              className="ml-2 text-[#7F3C28] hover:text-[#4C150B] transition text-4xl lg:text-xl"
            >
              {isExpanded ? "Ver menos" : "Ver más"}
            </button>
          )}
        </p>
        <p className="text-[#7F3C28] font-bold text-4xl lg:text-xl mt-2 lg:mt-0">
          RD$ {product.priceDOP} {product.sellingBy}
        </p>

        {product.available ? (
          <div className="mt-3 flex items-center gap-2">
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="w-16 border border-gray-300 rounded px-2 py-1 text-center text-4xl lg:text-xl"
            />
            <button
              onClick={handleAddToCart}
              className="bg-[#7F3C28] text-white px-4 py-2 rounded hover:bg-[#4C150B] transition text-4xl lg:text-xl"
            >
              Agregar al carrito
            </button>
          </div>
        ) : (
          <p className="mt-2 text-red-500 text-2xl lg:text-xl">No disponible</p>
        )}
      </div>
    </div>
  );
};

export default Products;
