import { ChangeEvent, FC, JSX, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../common/supabaseClient";
import { Invoice } from "../../common/types";
import LoadingIndicator from "../../components/LoadingIndicator";
import { PostgrestError } from "@supabase/supabase-js";

const GeneratedInvoices: FC = (): JSX.Element => {
  const [searchByClient, setSearchByClient] = useState<string>("");
  const [searchByPhone, setSearchByPhone] = useState<string>("");
  const [searchByInvoice, setSearchByInvoice] = useState<string>("");
  const [searchByEmail, setSearchByEmail] = useState<string>("");
  const [searchByStatus, setSearchByStatus] = useState<string>("");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices: () => Promise<void> = async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase.from("invoices").select("*");

      // If any search parameter is provided, build the filter using the OR operator.
      if (
        searchByClient ||
        searchByPhone ||
        searchByInvoice ||
        searchByEmail ||
        searchByStatus
      ) {
        const filters = [];
        if (searchByClient) {
          filters.push(`client_name.ilike.%${searchByClient}%`);
        }
        if (searchByPhone) {
          filters.push(`client_phone.ilike.%${searchByPhone}%`);
        }
        if (searchByInvoice) {
          filters.push(`invoice_num.ilike.%${searchByInvoice}%`);
        }
        if (searchByEmail) {
          filters.push(`client_email.ilike.%${searchByEmail}%`);
        }
        if (searchByStatus) {
          filters.push(`status.ilike.%${searchByStatus}%`);
        }

        // Combine the filters with an OR condition.
        query = query.or(filters.join(","));
      } else {
        // If no search parameters are provided, order by created_at descending and limit to the last 100.
        query = query.order("created_at", { ascending: false }).limit(100);
      }

      const { data, error: queryError } = await query;

      if (queryError) {
        console.error("Error fetching invoices:", queryError);
        toast.error("Error fetching invoices");
        const postgrestError: PostgrestError = queryError;
        setError(postgrestError.message);
      } else {
        setInvoices(data);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching invoices:", err.message);
        setError(err.message);
        toast.error("Error fetching invoices");
      } else {
        console.error("Error fetching invoices:", err);
        setError("Error fetching invoices");
        toast.error("Error fetching invoices");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch invoices on initial mount.
  useEffect(() => {
    fetchInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit: (e: ChangeEvent<HTMLFormElement>) => void = (
    e: ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    fetchInvoices();
  };

  const handleReset: () => void = () => {
    setSearchByClient("");
    setSearchByPhone("");
    setSearchByInvoice("");
    setSearchByEmail("");
    setSearchByStatus("");
    fetchInvoices();
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <div>Error cargando los pedidos realizados: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="m-4 w-3/4 flex justify-end">
        <Link to="/create-manual-invoice" className="link-button-inside-text">
          Crear factura manual
        </Link>
      </div>
      <div className="bg-white min-h-screen flex flex-col items-center p-6 lg:gap-1 gap-10">
        <h1 className="text-primary text-5xl lg:text-3xl font-bold mb-4">
          Facturas Generadas
        </h1>
        <p className="text-primary text-4xl lg:text-xl">
          Aquí puedes ver tus facturas generadas
        </p>
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Buscar por nombre del cliente"
              value={searchByClient}
              onChange={(e) => setSearchByClient(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Buscar por teléfono"
              value={searchByPhone}
              onChange={(e) => setSearchByPhone(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Buscar por número de factura"
              value={searchByInvoice}
              onChange={(e) => setSearchByInvoice(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Buscar por email"
              value={searchByEmail}
              onChange={(e) => setSearchByEmail(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Buscar por estado"
              value={searchByStatus}
              onChange={(e) => setSearchByStatus(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button type="submit" className="secondary-button">
              Buscar
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-500 transition"
            >
              Resetear
            </button>
          </div>
        </form>

        {/* Invoices Table */}
        <div className="w-full max-w-5xl overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="p-3 border border-primary">Número Factura</th>
                <th className="p-3 border border-primary">Nombre Cliente</th>
                <th className="p-3 border border-primary">Teléfono</th>
                <th className="p-3 border border-primary">Email</th>
                <th className="p-3 border border-primary">Estado</th>
                <th className="p-3 border border-primary">Fecha de Creación</th>
                <th className="p-3 border border-primary">Ver Factura</th>
              </tr>
            </thead>
            <tbody>
              {invoices && invoices.length > 0 ? (
                invoices.map((invoice, index) => (
                  <tr
                    key={invoice.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#F5E6D8]"}
                  >
                    <td className="p-3 border border-primary text-center">
                      {invoice.invoice_num}
                    </td>
                    <td className="p-3 border border-primary text-center">
                      {invoice.client_name}
                    </td>
                    <td className="p-3 border border-primary text-center">
                      {invoice.client_phone}
                    </td>
                    <td className="p-3 border border-primary text-center">
                      {invoice.client_email}
                    </td>
                    <td className="p-3 border border-primary text-center">
                      {invoice.status}
                    </td>
                    <td className="p-3 border border-primary text-center">
                      {new Date(invoice.created_at).toLocaleString("es-DO", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>
                    <td className="p-3 border border-primary text-center">
                      {invoice.pdf_url ? (
                        <a
                          href={invoice.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Ver Factura
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-3 border border-primary text-center"
                  >
                    No se encontraron facturas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GeneratedInvoices;
