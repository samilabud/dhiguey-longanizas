import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import LoginRegister from "./pages/LoginRegister";
import Gallery from "./pages/Gallery";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen flex flex-col">
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

                {/* New Routes */}
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/login-register" element={<LoginRegister />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </section>
          </main>
        </div>

        {/* Footer visible on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
