import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { CartProvider } from "./context/CartProvider";

// User pages
import Cancel from "./pages/Cancel";
import Cart from "./pages/Cart";
import ContactPage from "./pages/ContactPage";
import FAQs from "./pages/FAQs";
import Home from "./pages/Home";
import MyAccount from "./pages/MyAccount";
import Products from "./pages/Products";
import Success from "./pages/Success";
import TermsAndConditions from "./pages/TermsAndConditions";
// Admin pages
import AddProduct from "./pages/admin/AddProduct";
import GeneratedInvoices from "./pages/admin/GeneratedInvoices";
import ManualInvoice from "./pages/admin/ManualInvoice";
import ProductManagement from "./pages/admin/ProductManagement";

// Components
import { ToastContainer } from "react-toastify";
import CartSidebar from "./components/CartSidebar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { UserProvider, useUser } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <ToastContainer />
          <div className="relative min-h-screen flex flex-col">
            <div className="relative z-10 flex flex-col min-h-screen">
              {/* Header visible on all pages */}
              <Header />

              {/* Main content */}
              <main className="flex-grow">
                <AppRoutes />
              </main>

              <CartSidebarWrapper />

              <Footer />
            </div>
          </div>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

function AppRoutes() {
  const { role, loading } = useUser();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/products" element={<Products />} />
      <Route path="/my-account" element={<MyAccount />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      {loading === false && role === "admin" && (
        <>
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/create-manual-invoice" element={<ManualInvoice />} />
          <Route path="/generated-invoices" element={<GeneratedInvoices />} />
        </>
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function CartSidebarWrapper() {
  const location = useLocation(); // Get the current path

  return location.pathname !== "/cart" ? <CartSidebar /> : null;
}

export default App;
