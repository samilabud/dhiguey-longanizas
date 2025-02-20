import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useLocation, Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";

const CartSidebar = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(true);
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
    (acc, item) => acc + item.price_dop * item.quantity,
    0
  );

  // Format prices with commas
  const formatPrice = (price) =>
    price.toLocaleString("es-DO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div
      className={`fixed top-40 lg:top-20 right-0 ${
        isOpen ? "w-96 lg:w-72" : "w-20"
      }  bg-white shadow-lg h-fit p-4 border rounded-lg`}
      style={{ zIndex: 9999 }}
    >
      {isOpen ? (
        <h2 className="text-5xl lg:text-xl font-extrabold mb-4 flex items-center justify-between text-[#7F3C28]">
          <Link to="/cart"> Tu Carrito </Link>
          <MdOutlineShoppingCart
            className="text-5xl lg:text-2xl animate-pulse transition-all duration-1000 ease-in-out"
            style={{
              animation: "color-change 1s 7 alternate",
            }}
            onClick={() => setIsOpen(!isOpen)}
          />
        </h2>
      ) : (
        <MdOutlineShoppingCart
          onClick={() => setIsOpen(!isOpen)}
          className="text-5xl lg:text-2xl hover:*:scale-110 transition pointer"
        />
      )}
      {isOpen && (
        <>
          {/* Cart Items */}
          {groupedCartArray.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-3 border-b pb-2 text-3xl lg:text-xl"
            >
              <div>
                <span className="font-medium">{item.name}</span>
                <p className="text-xl lg:text-sm text-gray-900">
                  {item.quantity} x RD$ {formatPrice(item.price_dop)} = RD${" "}
                  {formatPrice(item.price_dop * item.quantity)}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-4xl lg:text-lg"
              >
                ✖
              </button>
            </div>
          ))}

          {/* Total Quantity and Price */}
          <div className="border-t mt-3 pt-2 font-semibold text-2xl lg:text-lg">
            <p>Cantidad Total: {totalQuantity}</p>
            <p className="text-[#7F3C28]">
              Total: RD$ {formatPrice(totalPrice)}
            </p>
          </div>

          {/* Link to Cart Page */}
          <Link to="/cart">
            <h6 className="text-2xl lg:text-sm font-bold mt-3 underline text-[#7F3C28] hover:text-blue-700 cursor-pointer">
              Realizar la compra
            </h6>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartSidebar;
