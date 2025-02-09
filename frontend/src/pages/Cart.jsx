import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import PayPalButton from "../components/PayPalButton"; // <-- Import your PayPalButton

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  // 1) Group products by ID and sum their quantities
  const groupedCart = cart.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 0 };
    }
    acc[item.id].quantity += item.quantity || 1; // If no quantity, assume 1
    return acc;
  }, {});

  // 2) Convert object to array for rendering
  const groupedCartArray = Object.values(groupedCart);

  // 3) Calculate total DOP or USD price (choose one or both)
  // If you have priceUSD in your data, sum those:
  const totalPriceUSD = groupedCartArray.reduce(
    (acc, item) => acc + item.priceUSD * item.quantity,
    0
  );

  // 4) Build a textual description of the cart for PayPal
  // Example: "Longaniza Artesanal x2, Tocino de Cerdo x1"
  const cartDescription = groupedCartArray
    .map((item) => `${item.name} x${item.quantity}`)
    .join(", ");

  // 5) Also compute totalQuantity and totalPriceDOP for your UI
  const totalQuantity = groupedCartArray.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalPriceDOP = groupedCartArray.reduce(
    (acc, item) => acc + item.priceDOP * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Tu Carrito</h2>

      {groupedCartArray.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <p className="mb-4">No hay productos en el carrito</p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded shadow p-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Producto</th>
                <th className="text-left p-2">Cantidad</th>
                <th className="text-left p-2">Precio Unitario</th>
                <th className="text-left p-2">Subtotal</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {groupedCartArray.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 font-semibold">{item.name}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">RD$ {item.priceDOP}</td>
                  <td className="p-2">RD$ {item.priceDOP * item.quantity}</td>
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

          {/* Display totals in your UI */}
          <div className="flex justify-between mt-4">
            <span className="font-bold">Cantidad Total:</span>
            <span className="font-bold">{totalQuantity}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-bold">Total a Pagar (RD$):</span>
            <span className="font-bold text-[#7F3C28]">
              RD$ {totalPriceDOP}
            </span>
          </div>

          {/* PayPal Button - pass USD price and cart description */}
          <div className="mt-4">
            {/* If you rely on priceUSD in your data: */}
            <PayPalButton
              price={totalPriceUSD.toFixed(2)} // e.g. "10.00"
              description={cartDescription}
            />
          </div>

          {/* Clear entire cart */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={clearCart}
              className="bg-[#7F3C28] text-white px-4 py-2 rounded hover:bg-[#4C150B] transition"
            >
              Vaciar Carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
