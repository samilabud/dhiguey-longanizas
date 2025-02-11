import { useState } from "react";
import PayPalButton from "./PayPalButton";
import products from "../data/products";

const QuickBuy = () => {
  const product = products[0]; // First product Longaniza Artesanal

  const [quantity, setQuantity] = useState(1);

  // Calculate total price
  const totalPriceDOP = product.priceDOP * quantity;
  const totalPriceUSD = product.priceUSD * quantity;

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 text-2xl lg:text-xl">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 h-auto rounded-xl transform transition duration-300 ease-in-out hover:scale-105"
          />

          {/* Product Details */}
          <div className="mt-4 md:mt-0 md:ml-6 flex flex-col text-center md:text-left">
            <h2 className="text-4xl lg:text-xl font-bold text-[#7F3C28] font-lobster">
              {product.name}
            </h2>
            <p className="text-gray-700 mt-2">{product.description}</p>

            <div className="flex justify-between md:justify-start mt-4">
              <div>
                <label className="mr-2 text-lg md:text-xl font-semibold">
                  Cantidad:
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-400 rounded-lg px-3 py-1 text-lg"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <p className="text-3xl lg:text-xl font-semibold mt-2 text-[#7F3C28]">
                  RD$&nbsp;
                  {totalPriceDOP.toLocaleString("es-DO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="w-1/2 -mt-4 ml-4">
                <PayPalButton
                  price={totalPriceUSD}
                  description={`${product.name} x${quantity}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickBuy;
