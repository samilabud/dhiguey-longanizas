import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  // Group products by ID and sum their quantities
  const groupedCart = cart.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 0 };
    }
    acc[item.id].quantity += item.quantity || 1; // If no quantity exists, assume 1
    return acc;
  }, {});

  // Convert object to array for rendering
  const groupedCartArray = Object.values(groupedCart);

  // Calculate total quantity and total price
  const totalQuantity = groupedCartArray.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalPrice = groupedCartArray.reduce(
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

          {/* Display total quantity and price */}
          <div className="flex justify-between mt-4">
            <span className="font-bold">Cantidad Total:</span>
            <span className="font-bold">{totalQuantity}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-bold">Total a Pagar:</span>
            <span className="font-bold text-[#7F3C28]">RD$ {totalPrice}</span>
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
