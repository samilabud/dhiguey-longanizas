import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { FaPaypal } from "react-icons/fa";

const PayPalButton = ({
  totalDOP,
  totalUSD,
  description,
  customerName,
  customerPhone,
  clientEmail,
  products,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    if (!customerPhone.trim()) {
      toast.warning("Por favor, ingrese su número de teléfono");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Request order creation from backend
      const { data } = await axios.post(
        `${BACKEND_URL}/api/paypal/create-payment`,
        {
          totalDOP,
          totalUSD,
          description,
          customerName,
          customerPhone,
          clientEmail,
          products,
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
        className="bg-[#FF7043] text-white px-12 py-6 lg:px-4 lg:py-4 rounded-md hover:bg-[#E64A19] transition cursor-pointer text-4xl lg:text-xl h-28 lg:h-18 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E64A19]"
        disabled={loading}
      >
        {loading ? (
          "Procesando..."
        ) : (
          <>
            <FaPaypal className="inline mr-2" />
            Pagar con PayPal
          </>
        )}
      </button>
    </div>
  );
};

export default PayPalButton;
