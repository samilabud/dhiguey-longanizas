import { useContext, useState, FC, JSX } from "react";
import { CartContext } from "../context/CartContext";
import { useLocation, Link } from "react-router-dom";
import { MdOutlineShoppingCart, MdMinimize } from "react-icons/md";
import { Product } from "../common/types";

const CartSidebar: FC = (): JSX.Element | null => {
  const { cart, removeFromCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const location = useLocation();

  // Hide the sidebar if the cart is empty or if the user is on the cart page
  if (cart.length === 0 || location.pathname === "/cart") {
    return null;
  }

  // Group products by ID and sum their quantities
  const groupedCart = cart.reduce(
    (acc: { [key: string]: Product }, item: Product) => {
      if (!acc[item.id]) {
        acc[item.id] = { ...item, quantity: 0 };
      }
      acc[item.id].quantity += item.quantity || 1; // If no quantity exists, assume 1
      return acc;
    },
    {}
  );

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
  const formatPrice = (price: number) =>
    price.toLocaleString("es-DO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div
      className={`fixed top-40 lg:top-20 right-0 ${
        isOpen ? "w-96 lg:w-72" : "w-20"
      } bg-white shadow-lg h-fit p-4 border rounded-lg`}
      style={{ zIndex: 9999 }}
    >
      {isOpen ? (
        <h2 className="flex items-center justify-between mb-4 text-primary">
          {/* Toggle Button on the Right */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <MdOutlineShoppingCart
              className="text-5xl lg:text-2xl animate-pulse transition-all duration-1000 ease-in-out"
              style={{
                animation: "color-change 1s 7 alternate",
              }}
            />
          </button>

          {/* Cart Link in the Center */}
          <Link to="/cart" className="text-5xl lg:text-xl font-extrabold">
            Tu Carrito
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-5xl lg:text-xl focus:outline-none -mt-12"
          >
            <MdMinimize />
          </button>
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
          <div className="flex flex-col items-start mt-3 border-t pt-2 font-semibold text-2xl lg:text-lg">
            {/* Total Quantity and Price */}
            <p>Cantidad Total: {totalQuantity}</p>
            <p className="text-primary">Total: RD$ {formatPrice(totalPrice)}</p>
            <div className="mt-3 w-full">
              {/* Link to Cart Page */}
              <Link to="/cart">
                <button className="secondary-button w-full">
                  Realizar la compra
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar;
