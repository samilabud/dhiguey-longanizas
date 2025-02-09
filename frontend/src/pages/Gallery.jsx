import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import products from "../data/products";

const MAX_LENGTH = 131;

const Gallery = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
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
  // Local state to handle whether description is expanded
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle function
  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  const truncatedDescription =
    product.description.length > MAX_LENGTH
      ? product.description.substring(0, MAX_LENGTH) + "..."
      : product.description;

  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product);
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
          {product.priceDOP} {product.sellingBy}
        </p>

        {product.available ? (
          <button
            onClick={handleAddToCart}
            className="mt-2 bg-[#7F3C28] text-white px-4 py-2 rounded hover:bg-[#4C150B] transition"
          >
            Agregar al carrito
          </button>
        ) : (
          <p className="mt-2 text-red-500">No disponible</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
