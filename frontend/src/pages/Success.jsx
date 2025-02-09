import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Success = () => {
  const [syncStatus, setSyncStatus] = useState(
    "Espere mientras sincronizamos el estado de su orden..."
  );
  const [searchParams] = useSearchParams();
  const orderID = searchParams.get("token");

  useEffect(() => {
    const capturePayment = async () => {
      try {
        const { data } = await axios.post(
          `${BACKEND_URL}/api/paypal/capture-payment/${orderID}`
        );
        console.log("✅ Payment Captured:", data);
        setSyncStatus("¡gracias! 🎉");
      } catch (error) {
        console.error("❌ Payment Capture Error:", error);
        setSyncStatus(
          "❌ Error al sincronizar el pago. Por favor, contáctenos."
        );
      }
    };

    if (orderID) capturePayment();
  }, [orderID]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-green-600 text-center text-2xl mt-6">
        🎉 ¡Pago exitoso!
      </h1>
      <h2 className="text-green-600 text-center text-2xl mt-6">{syncStatus}</h2>
    </div>
  );
};

export default Success;
