import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { Trash2 } from "lucide-react";

function Cart() {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-playfair font-extrabold text-amber-900 mb-8">Keranjang Belanja 🛒</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-amber-100 shadow-sm">
          <p className="text-gray-500 text-lg mb-6">Keranjang belanjamu masih kosong nih. 🥺</p>
          <Link to="/shop" className="bg-amber-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-amber-800 transition-colors">
            Cari Cookies Favoritmu
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-sm border border-amber-100 mb-6 overflow-hidden">
            {cartItems.map((item, index) => (
              <div key={item.id} className={`flex items-center gap-4 px-6 py-5 ${index !== cartItems.length - 1 ? "border-b border-amber-50" : ""}`}>
                {/* Gambar */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FDE68A]/20 flex-shrink-0">
                  {item.image_url ? (
                    <img src={item.image_url.startsWith("http") ? item.image_url : `https://bakemelater-backend-production.up.railway.app/images/${item.image_url}`} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-amber-800 font-bold">Bake</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-grow">
                  <h3 className="font-playfair font-bold text-lg text-[#4A3219] leading-tight">{item.name}</h3>
                  <p className="text-sm text-gray-400 mt-0.5">Jumlah: {item.quantity}</p>
                  <p className="text-[#D97706] font-extrabold text-base mt-1">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
                </div>

                {/* Hapus */}
                <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-rose-400 transition-colors p-1 flex-shrink-0">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            {/* Total */}
            <div className="flex justify-between items-center px-6 py-5 bg-amber-50/50 border-t border-amber-100">
              <span className="font-bold text-base text-amber-900">Total Harga</span>
              <span className="font-extrabold text-2xl text-rose-500">Rp {getTotalPrice().toLocaleString("id-ID")}</span>
            </div>
          </div>

          <Link to="/checkout" className="w-full bg-amber-700 text-white font-extrabold py-4 rounded-xl hover:bg-amber-800 transition-colors shadow-md text-center block">
            Lanjut ke Pembayaran 💳
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
