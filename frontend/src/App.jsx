import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { CartProvider } from "./context/CartProvider";

// Pages
import Home from "./pages/Home";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import LoginRegister from "./pages/LoginRegister";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";

function App() {
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
