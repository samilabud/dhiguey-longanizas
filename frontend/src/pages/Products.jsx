import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import products from "../data/products";

const MAX_LENGTH = 131;

const Products = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#7F3C28]">
        Nuestra Galería de Productos
      </h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
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
    <div className="bg-white rounded shadow overflow-hidden hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-700 mb-2">
          {isExpanded ? product.description : truncatedDescription}
          {product.description.length > MAX_LENGTH && (
            <button
              onClick={toggleDescription}
              className="ml-2 text-[#7F3C28] hover:text-[#4C150B] transition"
            >
              {isExpanded ? "Ver menos" : "Ver más"}
            </button>
          )}
        </p>
        <p className="text-[#7F3C28] font-bold">
          RD$ {product.priceDOP} {product.sellingBy}
        </p>

        {product.available ? (
          <div className="mt-3 flex items-center gap-2">
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
            />
            <button
              onClick={handleAddToCart}
              className="bg-[#7F3C28] text-white px-4 py-2 rounded hover:bg-[#4C150B] transition"
            >
              Agregar al carrito
            </button>
          </div>
        ) : (
          <p className="mt-2 text-red-500">No disponible</p>
        )}
      </div>
    </div>
  );
};

export default Products;
