import { useEffect } from "react";

const ProductCard = () => {
  const product = {
    id: 1,
    name: "Longaniza Artesanal",
    description: "Deliciosa longaniza hecha con ingredientes 100% naturales.",
    price: 300.0,
    image: "/images/sausage_pkg.png",
  };

  useEffect(() => {
    if (window.paypal) {
      window.paypal
        .Buttons({
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  description: product.name,
                  amount: {
                    value: product.price,
                  },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              alert("Pago completado por " + details.payer.name.given_name);
            });
          },
          onError: function (err) {
            console.error("Error during PayPal transaction", err);
          },
        })
        .render("#paypal-button-container-" + product.id);
    }
  }, [product.id, product.name, product.price]);

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 text-2xl lg:text-xl">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 h-auto rounded-xl"
          />

          {/* Product Details */}
          <div className="mt-4 md:mt-0 md:ml-6 flex flex-col text-center md:text-left">
            <h2 className="text-4xl lg:text-xl font-bold text-[#7F3C28] font-lobster">
              {product.name}
            </h2>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <p className="text-3xl lg:text-xl font-semibold mt-2 text-[#7F3C28]">
              RD${product.price.toFixed(2)}
            </p>

            {/* PayPal Button */}
            <div
              id={`paypal-button-container-${product.id}`}
              className="mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
