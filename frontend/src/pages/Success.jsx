import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "./Layout";

const Success = () => {
  const [searchParams] = useSearchParams();
  const orderID = searchParams.get("token");

  useEffect(() => {
    if (orderID) {
      axios
        .post(`http://localhost:5000/api/paypal/capture-payment/${orderID}`)
        .then(() => alert("Payment successful!"))
        .catch((err) => console.error(err));
    }
  }, [orderID]);

  return (
    <Layout>
      <h1 className="text-green-600 text-center text-2xl mt-6">
        Payment Successful!
      </h1>
    </Layout>
  );
};

export default Success;
