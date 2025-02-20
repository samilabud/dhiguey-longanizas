import { useContext, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import PayPalButton from "../components/PayPalButton";
import { BACKEND_URL } from "../config";
import { CartContext } from "../context/CartContext";
import useCachedFetch from "../hooks/useCachedFetch";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } =
    useContext(CartContext);
  const {
    data: shippingOptions,
    loading: loadingShippingOptions,
    error: errorShippingOptions,
  } = useCachedFetch(
    "shippingOptionsCache",
    `${BACKEND_URL}/api/products/shipping_options`
  );

  // Group products by ID and sum their quantities
  const groupedCart = cart.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 0 };
    }
    acc[item.id].quantity += item.quantity || 1;
    return acc;
  }, {});

  const groupedCartArray = Object.values(groupedCart);

  // Calculate total prices
  const totalprice_usd = groupedCartArray.reduce(
    (acc, item) => acc + item.price_usd * item.quantity,
    0
  );
  const totalprice_dop = groupedCartArray.reduce(
    (acc, item) => acc + item.price_dop * item.quantity,
    0
  );
  const totalQuantity = groupedCartArray.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const [selectedShippingIndex, setSelectedShippingIndex] = useState(0);

  const formatPrice = (price) =>
    price.toLocaleString("es-DO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  if (loadingShippingOptions)
    return (
      <div className="bg-gray-100 lg:mt-7 p-10 mt-24">
        <h2 className="text-5xl lg:text-2xl font-bold text-center mb-6 text-[#7F3C28]">
          Tu Carrito
        </h2>
        <LoadingIndicator />
      </div>
    );

  //Shipping cost
  const selectedShippingOption = shippingOptions[selectedShippingIndex];
  const shippingCostDOP = selectedShippingOption.cost_dop;
  const shippingCostUSD = selectedShippingOption.cost_usd;
  // Total with shipping
  const totalWithShippingDOP = totalprice_dop + shippingCostDOP;
  const totalWithShippingUSD = totalprice_usd + shippingCostUSD;

  const cartDescription = [
    ...groupedCartArray.map((item) => `${item.name} x${item.quantity}`),
    `Envío: ${selectedShippingOption.label} (RD$ ${formatPrice(
      shippingCostDOP
    )})`,
  ].join(", ");

  if (errorShippingOptions)
    return (
      <div className="bg-gray-100 lg:mt-7 p-10 mt-24">
        <h2 className="text-5xl lg:text-2xl font-bold text-center mb-6 text-[#7F3C28]">
          Tu Carrito
        </h2>
        <div className="flex flex-col items-center justify-center text-[#7F3C28] text-4xl lg:text-xl">
          <p className="mb-4">Error al cargar opciones de envio</p>
          <p>{errorShippingOptions}</p>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-100 lg:mt-7 p-10 mt-24">
      <h2 className="text-5xl lg:text-2xl font-bold text-center mb-6 text-[#7F3C28]">
        Tu Carrito
      </h2>

      {groupedCartArray.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-[#7F3C28] text-4xl lg:text-xl">
          <p className="mb-4">No hay productos en el carrito</p>
          <Link
            to="/products"
            className="text-white bg-[#7F3C28] hover:bg-[#7F3C28] px-4 py-2 rounded"
          >
            Ver Productos
          </Link>
        </div>
      ) : (
        <div className="w-4xl lg:max-w-3xl mx-auto bg-white rounded shadow p-4 flex flex-col lg:gap-1 gap-4">
          <table className="w-full">
            <thead>
              <tr className="border-b text-2xl lg:text-xl">
                <th className="text-left p-2">Producto</th>
                <th className="text-left p-2">Cantidad</th>
                <th className="text-left p-2">Precio Unitario</th>
                <th className="text-left p-2">Subtotal</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {groupedCartArray.map((item, index) => (
                <tr key={index} className="border-b text-2xl lg:text-xl">
                  <td className="p-2 font-semibold">{item.name}</td>
                  <td className="p-2 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-[#7F3C28] hover:text-red-500"
                    >
                      <FaMinus />
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-[#7F3C28] hover:text-green-500"
                    >
                      <FaPlus />
                    </button>
                  </td>
                  <td className="p-2">RD$ {formatPrice(item.price_dop)}</td>
                  <td className="p-2">
                    RD$ {formatPrice(item.price_dop * item.quantity)}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4 text-3xl lg:text-xl">
            <span className="font-bold">Cantidad Total:</span>
            <span className="font-bold">{totalQuantity}</span>
          </div>
          <div className="flex justify-between mt-4 text-3xl lg:text-xl">
            <span className="mr-4 font-bold">Zona de Envío:</span>
            <select
              className="border rounded text-4xl lg:text-base border-[#7F3C28] text-[#7F3C28] text-center pb-2 pt-2"
              value={selectedShippingIndex}
              onChange={(e) => setSelectedShippingIndex(e.target.value)}
            >
              {shippingOptions.map((option, idx) => (
                <option key={idx} value={idx}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between mt-4 text-3xl lg:text-xl">
            <span className="font-bold">Subtotal (RD$):</span>
            <span>RD$ {formatPrice(totalprice_dop)}</span>
          </div>
          <div className="flex justify-between mt-1 text-3xl lg:text-xl">
            <span>Costo de Envío (RD$):</span>
            <span>RD$ {formatPrice(shippingCostDOP)}</span>
          </div>
          <div className="flex justify-between mt-1 text-3xl lg:text-xl">
            <span className="font-bold">Total a Pagar (RD$):</span>
            <span className="font-bold text-[#7F3C28]">
              RD$ {formatPrice(totalWithShippingDOP)}
            </span>
          </div>

          <div className="mt-6 flex justify-between items-end">
            <div className="mt-4 flex flex-col gap-4 items-start justify-start">
              <Link to="/products">
                <button className="bg-white border border-[#7F3C28] px-4 py-2 rounded hover:bg-[#4C150B] transition text-[#7F3C28] hover:text-white text-2xl lg:text-lg">
                  Seguir Comprando
                </button>
              </Link>{" "}
              <button
                onClick={clearCart}
                className="bg-white border h-1/2 border-[#7F3C28] px-4 py-2 rounded hover:bg-[#4C150B] transition text-[#7F3C28] hover:text-white text-2xl lg:text-lg"
              >
                Vaciar Carrito
              </button>
            </div>

            <PayPalButton
              price={formatPrice(totalWithShippingUSD)}
              description={cartDescription}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
