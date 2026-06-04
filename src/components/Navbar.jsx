import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../pages/CartContext"; // Keluar 1 folder ke src/

function Navbar() {
  const { cartItems } = useCart();
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-[#FFFDF9]/90 backdrop-blur-md sticky top-0 z-50 border-b border-amber-100/50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="text-3xl font-playfair font-extrabold text-[#4A3219] tracking-wide">
          BakeMe<span className="text-[#D97706]">Later.</span>
        </Link>

        <div className="flex items-center gap-8 font-bold text-[#6B4C3A]">
          <Link to="/" className="hover:text-[#D97706] transition-colors">
            Home
          </Link>
          <Link to="/shop" className="hover:text-[#D97706] transition-colors">
            Shop
          </Link>

          <Link to="/cart" className="relative flex items-center justify-center p-2 bg-[#FDE68A]/30 rounded-full hover:bg-[#FDE68A]/70 transition-all text-[#D97706]">
            <ShoppingBag size={24} />

            {totalItemsInCart > 0 && <span className="absolute -top-1 -right-1 bg-[#D97706] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-extrabold shadow-sm">{totalItemsInCart}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
