import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cancel from "./pages/Cancel";
import Home from "./pages/Home";
import Success from "./pages/Success";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
}

export default App;
