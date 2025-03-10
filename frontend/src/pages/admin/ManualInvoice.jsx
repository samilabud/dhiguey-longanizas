import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingIndicator from "../../components/LoadingIndicator";
import { BACKEND_URL } from "../../config";
import useCachedFetch from "../../hooks/useCachedFetch";

const ManualInvoice = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedShippingIndex, setSelectedShippingIndex] = useState(-1);
  const [shippingCost, setShippingCost] = useState(0);
  const [invoiceUrl, setInvoiceUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [generatingInvoiceLoading, setGeneratingInvoiceLoading] =
    useState(false);
  const [products, setProducts] = useState([]);
  // This state stores the quantity for each product keyed by product id
  const [quantities, setQuantities] = useState({});

  // Fetch all products
  const fetchProducts = () => {
    setLoading(true);
    fetch(`${BACKEND_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const {
    data: shippingOptions,
    loading: loadingShippingOptions,
    error: errorShippingOptions,
  } = useCachedFetch(
    "shippingOptionsCache",
    `${BACKEND_URL}/api/products/shipping_options`
  );

  // Update the quantity for a specific product
  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneratingInvoiceLoading(true);
    const dataProducts = products
      .filter((product) => Number(quantities[product.id]) > 0)
      .map((product) => ({
        id: product.id,
        name: product.name,
        quantity: Number(quantities[product.id]),
        price_cash: product.price_cash,
      }));
    dataProducts.push({
      id: 0,
      name: "Envío a " + shippingOptions[selectedShippingIndex].label,
      quantity: 1,
      price_cash: shippingCost,
    });

    const data = {
      customerName: name,
      clientEmail: email,
      customerPhone: phoneNumber,
      products: dataProducts,
      description: "Manual invoice",
      totalDOP: grandTotal,
    };

    const response = await fetch(`${BACKEND_URL}/invoices/create-manual`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setName("");
      setEmail("");
      setPhoneNumber("");
      setSelectedShippingIndex(0);
      setShippingCost(0);
      setQuantities({});
      toast.success("Factura creada exitosamente");
      const invoice = await response.json();
      setInvoiceUrl(invoice.invoiceURL);
    }
    setGeneratingInvoiceLoading(false);
  };

  if (loading || loadingShippingOptions) {
    return <LoadingIndicator />;
  }

  if (errorShippingOptions) {
    return (
      <div>Error loading shipping options: {errorShippingOptions.message}</div>
    );
  }

  // Calculate total for products and the overall total including shipping
  const totalProductsCost = products.reduce((sum, product) => {
    const quantity = Number(quantities[product.id]) || 0;
    return sum + quantity * product.price_cash;
  }, 0);
  const grandTotal = totalProductsCost + shippingCost;

  return (
    <div>
      <div className="flex justify-end">
        <Link to="/generated-invoices" className="link-button-inside-text">
          Facturas generadas
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-primary">
          Crear Factura Manual
        </h2>
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Nombre del cliente"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mt-2"
          type="email"
          placeholder="Correo del cliente"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        />
        <input
          className="border p-2 w-full mt-2"
          placeholder="Teléfono del cliente"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        {/* Render a label, quantity input, and total for each product */}
        <div className="mt-4 space-y-4 w-lg">
          {products.map((product) => {
            const quantity = Number(quantities[product.id]) || 0;
            const total = quantity * product.price_cash;
            return (
              <div
                key={product.id}
                className="flex justify-between items-center gap-4 mb-2"
              >
                <label className="w-1/3">{product.name}</label>
                <input
                  type="number"
                  min="0"
                  className="border p-2 w-28"
                  placeholder="Cantidad"
                  value={quantities[product.id] || 0}
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                />
                <span className="w-1/3">RD$ {total.toFixed(2)}</span>
              </div>
            );
          })}
        </div>

        {/* Shipping options */}
        <div className="mt-4 flex justify-between items-center gap-4 mb-2">
          <label className="w-1/3">Método de envío</label>
          <select
            className="border rounded text-center pb-1 pt-1 w-1/3"
            value={selectedShippingIndex}
            onChange={(e) => {
              const newIndex = Number(e.target.value);
              setSelectedShippingIndex(newIndex);
              if (newIndex === -1) {
                setShippingCost(0);
                return;
              }
              // Shipping cost
              const selectedShippingOption = shippingOptions[newIndex];
              const shippingCostDOP = selectedShippingOption.cost_dop;
              setShippingCost(shippingCostDOP);
            }}
          >
            <option key="-1" value="-1">
              Selecciona una zona
            </option>
            {shippingOptions.map((option, idx) => (
              <option key={idx} value={idx}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="w-1/3 flex justify-end items-center gap-2">
            <span>RD$</span>
            <input
              className="w-20 border p-2 text-right"
              type="number"
              value={shippingCost}
              onChange={(e) => setShippingCost(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Overall total */}
        <div className="mt-4 flex justify-between items-center gap-4 mb-2">
          <label className="w-1/3 font-bold">Total General</label>
          <span className="w-2/3 font-bold text-lg">
            RD$ {grandTotal.toFixed(2)}
          </span>
        </div>

        <button
          type="submit"
          className="secondary-button mt-4"
          disabled={generatingInvoiceLoading}
        >
          Generar Factura
        </button>
        {generatingInvoiceLoading && <LoadingIndicator />}

        {!generatingInvoiceLoading && invoiceUrl && (
          <div className="mt-4">
            <a href={invoiceUrl} target="_blank" rel="noopener noreferrer">
              Ver Factura
            </a>
          </div>
        )}
      </form>
    </div>
  );
};

export default ManualInvoice;
