import { FC, JSX, useEffect, useState } from "react";
import { supabase } from "../common/supabaseClient";
import { useUser } from "../context/UserContext";
import LoadingIndicator from "./LoadingIndicator";
import { type Invoice } from "../common/types";

const OrderList: FC = (): JSX.Element => {
  const [orders, setOrders] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useUser();

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("client_email", user.email)
        .or("status.eq.paid,generated_by.eq.manual_invoice")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching orders:", error.message);
        setError(error);
      } else {
        setOrders(data);
      }
      setLoading(false);
    }
    fetchOrders();
  }, [user]);

  if (loading) return <LoadingIndicator />;
  if (error)
    return <div>Error cargando los pedidos realizados: {error.message}</div>;

  return (
    <div className="max-w-5xl mx-auto my-8 p-4 bg-white border-2 border-primary rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Pedidos realizados
      </h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-primary text-white">
            <th className="p-3 border border-primary">Número Factura</th>
            <th className="p-3 border border-primary">Estado</th>
            <th className="p-3 border border-primary">Fecha de emisión</th>
            <th className="p-3 border border-primary">Ver Factura</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className={index % 2 === 0 ? "bg-white" : "bg-[#F5E6D8]"}
            >
              <td className="p-3 border border-primary text-center">
                {order.invoice_num}
              </td>
              <td className="p-3 border border-primary text-center">
                {order.generated_by === "manual_invoice"
                  ? "Efectivo"
                  : "Pagado"}
              </td>
              <td className="p-3 border border-primary text-center">
                {new Date(order.created_at).toLocaleString("es-DO", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </td>
              <td className="p-3 border border-primary text-center">
                <a
                  href={order.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-button"
                >
                  Ver Factura
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
