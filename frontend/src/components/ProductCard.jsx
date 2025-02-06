import { useEffect } from "react";

const ProductCard = () => {
  // Hardcoded product details
  const product = {
    id: 1,
    name: "Longaniza Artesanal",
    description: "Deliciosa longaniza hecha con ingredientes 100% naturales.",
    price: 10.0, // Price in USD (for example)
    image: "https://via.placeholder.com/300x200.png?text=Longaniza+Artesanal", // Replace with real image
  };

  // Render PayPal button once the component is mounted
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
                    value: product.price, // USD
                  },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              alert("Pago completado por " + details.payer.name.given_name);
              // You can send 'details' to your server for verification/confirmation
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
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        width: "300px",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h2 style={{ fontFamily: "'Lobster', cursive", color: "#7F3C28" }}>
        {product.name}
      </h2>
      <p>{product.description}</p>
      <p style={{ fontWeight: "bold" }}>${product.price.toFixed(2)}</p>

      {/* PayPal button container */}
      <div
        id={`paypal-button-container-${product.id}`}
        style={{ marginTop: "1rem" }}
      />
    </div>
  );
};

export default ProductCard;
