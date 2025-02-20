import { useState } from "react";
import { BACKEND_URL } from "../config";
import { Link } from "react-router-dom";

const AddProduct = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceDOP, setPriceDOP] = useState("");
  const [priceUSD, setPriceUSD] = useState("");
  const [image, setImage] = useState("");
  const [sellingBy, setSellingBy] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      description,
      price_dop: parseFloat(priceDOP),
      price_usd: parseFloat(priceUSD),
      image,
      available: true,
      selling_by: sellingBy,
    };

    const response = await fetch(`${BACKEND_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      setName("");
      setDescription("");
      setPriceDOP("");
      setPriceUSD("");
      setImage("");
      setSellingBy("");
      onProductAdded();
      alert("Producto agregado exitosamente");
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <Link
          to="/product-management"
          className="text-sm font-semibold text-[#7F3C28] hover:text-[#4C150B]"
        >
          Gestion de productos
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="border p-2 w-full mt-2"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mt-2"
          type="number"
          placeholder="Precio DOP"
          value={priceDOP}
          onChange={(e) => setPriceDOP(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mt-2"
          type="number"
          placeholder="Precio USD"
          value={priceUSD}
          onChange={(e) => setPriceUSD(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mt-2"
          type="text"
          placeholder="Imagen URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mt-2"
          type="text"
          placeholder="Se vende por"
          value={sellingBy}
          onChange={(e) => setSellingBy(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
