import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { CartProvider } from "./context/CartProvider";

// Pages
import Cancel from "./pages/Cancel";
import Cart from "./pages/Cart";
import ContactPage from "./pages/ContactPage";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Success from "./pages/Success";
import ProductManagement from "./pages/ProductManagement";
import AddProduct from "./pages/AddProduct";

// Components
import CartSidebar from "./components/CartSidebar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoadingIndicator from "./components/LoadingIndicator";
import useUserRole from "./hooks/useUserRole";

function App() {
  const { role, loading } = useUserRole();
  if (loading) {
    return <LoadingIndicator />;
  }
  return (
    <Router>
      <CartProvider>
        <div className="relative min-h-screen flex flex-col">
          <div className="relative z-10 flex flex-col min-h-screen">
            {/* Header visible on all pages */}
            <Header />

            {/* Main content */}
            <div className="flex-grow">
              <main className="flex-1 flex flex-col">
                <section className="flex flex-wrap justify-center items-center gap-8 p-6 flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/cancel" element={<Cancel />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/login-register" element={<LoginRegister />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/contact" element={<ContactPage />} />
                    {role === "admin" && (
                      <>
                        <Route
                          path="/product-management"
                          element={<ProductManagement />}
                        />
                        <Route path="/add-product" element={<AddProduct />} />
                      </>
                    )}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </section>
              </main>
            </div>

            {/* Conditionally show CartSidebar using useLocation() */}
            <CartSidebarWrapper />

            {/* Footer visible on all pages */}
            <Footer />
          </div>
        </div>
      </CartProvider>
    </Router>
  );
}

function CartSidebarWrapper() {
  const location = useLocation(); // Get the current path

  return location.pathname !== "/cart" ? <CartSidebar /> : null;
}

export default App;
