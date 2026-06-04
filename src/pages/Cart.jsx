import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { Trash2 } from "lucide-react";

function Cart() {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-amber-900 mb-6">Keranjang Belanja 🛒</h1>

      {/*Cek apakah keranjang kosong atau tidak */}
      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-amber-100 shadow-sm">
          <p className="text-gray-500 text-lg mb-6">Keranjang belanjamu masih kosong nih. 🥺</p>
          <Link to="/shop" className="bg-amber-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-amber-800 transition-colors">
            Cari Cookies Favoritmu
          </Link>
        </div>
      ) : (
        <>
          {/*Menampilkan list produk secara dinamis jika ada stands/isinya */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 mb-6 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b border-amber-50 py-4 last:border-none">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#FDE68A]/20 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                    {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <span className="text-xs text-amber-800">Bake</span>}
                  </div>

                  <div>
                    <h3 className="font-playfair font-bold text-lg text-[#4A3219]">{item.name}</h3>
                    <p className="text-sm text-gray-500">Jumlah: {item.quantity}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-extrabold text-[#D97706]">{item.price}</span>

                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-rose-500 transition-colors p-1">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            {/* Total harga otomatis terhitung berdasarkan jumlah kuantitas */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-amber-100">
              <span className="font-bold text-lg text-amber-900">Total Harga:</span>
              <span className="font-extrabold text-2xl text-rose-500">Rp {getTotalPrice().toLocaleString("id-ID")}</span>
            </div>
          </div>

          <Link to="/checkout" className="w-full bg-amber-700 text-white font-bold py-4 rounded-xl hover:bg-amber-800 transition-colors shadow-md text-center block">
            Lanjut ke Pembayaran 💳
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
