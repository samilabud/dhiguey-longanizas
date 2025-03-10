import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../../common/utils";
import LoadingIndicator from "../../components/LoadingIndicator";
import { BACKEND_URL } from "../../config";

const ProductManagement = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (!storedUser) {
      navigate("/my-account");
    }

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch all products
  const fetchProducts = () => {
    setLoading(true);
    fetch(`${BACKEND_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  // Delete a product
  const deleteProduct = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      await fetch(`${BACKEND_URL}/api/products/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    }
  };

  // Open modal and set the product to edit
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  // Handle field changes in the modal
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save changes to the server (PUT request)
  const handleSave = async () => {
    if (!editingProduct) return;

    const { id, ...updateFields } = editingProduct;

    try {
      await fetch(`${BACKEND_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateFields),
      });
      // Refresh and close modal
      fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }
  return (
    <div className="flex flex-col overflow-x-auto w-11/12 items-center justify-center">
      <div className="mt-3 -ml-1 w-11/12 flex justify-end">
        <Link to="/add-product" className="link-button-inside-text">
          Agregar nuevo producto
        </Link>
      </div>
      <h2 className="text-4xl lg:text-2xl font-bold mb-4 text-primary mt-2">
        Gestión de Productos
      </h2>
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-11/12">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold text-blue-500">
              DOP {product.price_dop} / USD {product.price_usd} / Efectivo{" "}
              {product.price_cash} {product.selling_by}
            </p>
            <p className="text-sm">
              {product.available ? "Disponible" : "Agotado"}
            </p>
            <div className="mt-2 flex justify-start">
              <button
                onClick={() => handleEditClick(product)}
                className="secondary-button mt-2"
              >
                Editar
              </button>

              <button
                onClick={() => deleteProduct(product.id)}
                className="remove-button text-2xl lg:text-lg px-4 py-2 rounded-md mt-2 ml-2"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Edit Modal */}
      {showModal && editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="bg-white p-6 rounded shadow relative z-10 w-11/12 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>

            {/* NAME */}
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="name">
                Nombre:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={editingProduct.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="description">
                Descripción:
              </label>
              <textarea
                name="description"
                id="description"
                rows="3"
                value={editingProduct.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* PRICE DOP */}
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="price_dop">
                Precio (DOP):
              </label>
              <input
                type="number"
                name="price_dop"
                id="price_dop"
                value={editingProduct.price_dop}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* PRICE USD */}
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="price_usd">
                Precio (USD):
              </label>
              <input
                type="number"
                name="price_usd"
                id="price_usd"
                value={editingProduct.price_usd}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* PRICE CASH */}
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="price_cash">
                Precio (Efectivo):
              </label>
              <input
                type="number"
                name="price_cash"
                id="price_cash"
                value={editingProduct.price_cash}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* AVAILABLE */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="available"
                id="available"
                checked={editingProduct.available}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="available" className="font-semibold">
                Disponible
              </label>
            </div>

            {/* SELLING BY (optional) */}
            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="selling_by">
                Vendido por:
              </label>
              <input
                type="text"
                name="selling_by"
                id="selling_by"
                value={editingProduct.selling_by || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <p className="text-sm text-gray-600">
                Ej: Unidad, Libra, Paquete...
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-3 py-2 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-3 py-2 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
