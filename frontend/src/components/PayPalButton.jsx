import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const PayPalButton = ({ price, description }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Request order creation from backend
      const { data } = await axios.post(
        `${BACKEND_URL}/api/paypal/create-payment`,
        {
          price,
          description,
        }
      );

      // Redirect user to PayPal checkout
      window.location.href = data.link;
    } catch (err) {
      setError("Payment failed. Please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handlePayment}
        className="bg-[#7F3C28] text-white px-6 rounded-md hover:bg-[#4C150B] transition cursor-pointer text-4xl lg:text-xl h-28 lg:h-18"
        disabled={loading}
      >
        {loading ? "Procesando..." : "Pagar con PayPal"}
      </button>
    </div>
  );
};

export default PayPalButton;
