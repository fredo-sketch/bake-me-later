import { Routes, Route } from "react-router-dom"; // 1. Diubah ke Routes dan Route
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

function AppRouter() {
  return (
    <div className="min-h-screen bg-amber-50/30 text-slate-800">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default AppRouter;
