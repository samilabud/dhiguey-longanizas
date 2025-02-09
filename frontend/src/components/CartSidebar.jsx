import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useLocation, Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";

const CartSidebar = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const location = useLocation();

  // Hide the sidebar if the cart is empty or if the user is on the cart page
  if (cart.length === 0 || location.pathname === "/cart") {
    return null;
  }

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
    <div
      className="fixed top-20 right-0 w-72 bg-white shadow-lg h-fit p-4 border rounded-lg"
      style={{ zIndex: 9999 }}
    >
      <Link to="/cart">
        <h2 className="text-xl font-extrabold mb-4 flex items-center justify-between text-[#7F3C28]">
          Tu Carrito <MdOutlineShoppingCart className="text-2xl" />
        </h2>
      </Link>

      {/* Cart Items */}
      {groupedCartArray.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between mb-3 border-b pb-2"
        >
          <div>
            <span className="font-medium">{item.name}</span>
            <p className="text-sm text-gray-500">
              {item.quantity} x RD$ {item.priceDOP} = RD${" "}
              {item.priceDOP * item.quantity}
            </p>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            ✖
          </button>
        </div>
      ))}

      {/* Total Quantity and Price */}
      <div className="border-t mt-3 pt-2 text-sm font-semibold">
        <p>Cantidad Total: {totalQuantity}</p>
        <p className="text-[#7F3C28]">Total: RD$ {totalPrice}</p>
      </div>

      {/* Link to Cart Page */}
      <Link to="/cart">
        <h6 className="text-xs font-bold mt-3 underline text-blue-500 hover:text-blue-700 cursor-pointer">
          Revisar Carrito
        </h6>
      </Link>
    </div>
  );
};

export default CartSidebar;
