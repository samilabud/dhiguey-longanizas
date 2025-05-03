import { useState, FC, JSX } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { FaPaypal } from "react-icons/fa";
import { Product } from "../common/types";

type PayPalButtonProps = {
  totalDOP: number;
  totalUSD: number;
  description: string;
  customerName: string;
  customerPhone: string | null;
  clientEmail: string | undefined;
  products: Product[];
};
const PayPalButton: FC<PayPalButtonProps> = ({
  totalDOP,
  totalUSD,
  description,
  customerName,
  customerPhone,
  clientEmail,
  products,
}: PayPalButtonProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!customerPhone || !customerPhone.trim()) {
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
