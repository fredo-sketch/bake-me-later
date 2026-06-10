import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, ArrowRight, Heart } from "lucide-react";
import { useCart } from "./CartContext";
import axios from "axios"; // Axios sudah aktif

// Banner image tetap dari assets lokal karena tidak disimpan di database
import heroKueBesar from "../assets/images/newvarian.jpeg";
import fotoProfilOwner from "../assets/images/owner.jpeg";

function Shop() {
  // BARIS SALAH 1 (DIPERBAIKI): Sekarang products mengambil data kosong dulu, nanti diisi dari database
  const [products, setProducts] = useState([]);

  // BARIS TAMBAHAN: Mengambil data dari server backend via Axios saat halaman dibuka
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data); // Memasukkan data dari MySQL ke state
      })
      .catch((error) => {
        console.error("Gagal mengambil data dari backend:", error);
      });
  }, []);

  const { cartItems, addToCart } = useCart();

  const handleAdd = (item) => {
    addToCart(item, 1);
  };

  const handleMinus = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem && existingItem.quantity > 0) {
      addToCart(item, -1);
    }
  };

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* SECTION 1: HERO BANNER (Tetap Aman) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 bg-gradient-to-br from-[#FFFDF9] to-[#FFF9F0] p-6 md:p-10 rounded-[3rem] border border-amber-100/60 relative overflow-hidden">
        <div className="w-full flex flex-col justify-between h-full">
          <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-md mb-6 bg-amber-50/50">
            <img src={heroKueBesar} alt="Premium Fresh Baked Cookies" className="w-full h-full object-cover hover:scale-102 transition-transform duration-500" />
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <span className="bg-[#FFF4E4] text-[#B45309] font-bold text-xs md:text-sm px-5 py-2.5 rounded-full border border-amber-200/50 shadow-sm">Cookies Bite</span>
            <span className="bg-[#FCE7F3] text-[#DB2777] font-bold text-xs md:text-sm px-5 py-2.5 rounded-full shadow-sm">Food & Snack</span>
            <span className="bg-[#FEF3C7] text-[#D97706] font-bold text-xs md:text-sm px-5 py-2.5 rounded-full shadow-sm">Delicious</span>
          </div>
        </div>
        <div className="relative flex flex-col h-full justify-center">
          <div className="absolute top-0 right-0 text-[#E65F2B] animate-pulse hidden sm:block">
            <Heart size={44} fill="#E65F2B" stroke="none" />
          </div>
          <h1 className="text-4xl md:text-5xl font-playfair font-extrabold text-[#4A3219] leading-tight mb-4 pr-12">A New Letter Has Arrived!</h1>
          <h2 className="text-4xl md:text-2xl font-playfair font-extrabold text-[#D97706] leading-tight mb-4 pr-12">Pistachio Royale, Baked in Golden Sweetness</h2>
          <p className="text-[#6B4C3A] text-sm md:text-base leading-relaxed font-medium mb-8 max-w-xl">
            Nikmati perpaduan cookies lembut dengan isian pistachio creamy, kunafa renyah, dan sentuhan rasa manis yang premium di setiap gigitan.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
            <div className="sm:col-span-7 space-y-4">
              <div className="bg-gradient-to-r from-[#FAE8FF]/50 to-[#E0F2FE]/40 p-5 rounded-2xl border border-purple-100/50 shadow-sm">
                <h4 className="font-playfair font-black text-lg text-[#4A2840] mb-1">Our Mission</h4>
                <p className="text-xs text-[#6B5164] font-medium leading-relaxed">Menghadirkan varian cookies yang tidak hanya manis, tetapi juga punya karakter rasa yang unik dan berkelas.</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm">
                <h4 className="font-playfair font-black text-lg text-[#4A3219] mb-1">Our Vision</h4>
                <p className="text-xs text-[#7A614E] font-medium leading-relaxed">Menjadi pilihan dessert modern dengan cita rasa premium, tampilan elegan, dan kualitas yang selalu berkesan.</p>
              </div>
            </div>
            <div className="sm:col-span-5 flex flex-col gap-4">
              <div className="w-full h-40 rounded-2xl overflow-hidden shadow-sm border border-amber-100">
                <img src={fotoProfilOwner} alt="Our Artisan Baker" className="w-full h-full object-cover" />
              </div>
              <a href="https://canva.link/xymmqnamcgcbwyb" target="_blank" rel="noopener noreferrer">
                <button className="w-full flex items-center justify-center gap-2 bg-[#7DD3FC] hover:bg-[#38BDF8] text-[#0369A1] font-extrabold py-3.5 px-4 rounded-2xl transition-all shadow-sm group text-sm">
                  Learn More
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: DAFTAR PRODUK UTAMA */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-playfair font-extrabold text-[#4A3219] mb-3">Our Fresh Bakes</h1>
        <p className="text-[#6B4C3A] font-medium text-base">Pilih varian favoritmu hari ini.</p>
      </div>

      {/* Grid Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
        {products.map((item) => {
          const currentCartItem = cartItems.find((cartItem) => cartItem.id === item.id);
          const currentQuantity = currentCartItem ? currentCartItem.quantity : 0;

          return (
            <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-amber-50 group flex flex-col h-full">
              {/* BARIS SALAH 2 (DIPERBAIKI): Membaca gambar dari folder public/images/ berdasarkan image_url database */}
              <div className="bg-[#FDE68A]/20 w-full h-56 rounded-[1.5rem] mb-6 flex items-center justify-center overflow-hidden">
                <img
                  src={item.image_url && item.image_url.startsWith("http") ? item.image_url : `http://localhost:5000/images/${item.image_url || "default.png"}`}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex-grow">
                <h3 className="font-playfair font-bold text-2xl text-[#4A3219] mb-1">{item.name}</h3>

                {/* BARIS SALAH 3 (DIPERBAIKI): Format angka harga murni dari database menjadi Rupiah titik cantik */}
                <p className="text-[#D97706] font-extrabold text-xl mb-4">Rp {item.price.toLocaleString("id-ID")}</p>
              </div>

              <div className="flex justify-center items-center mt-auto pt-4 border-t border-amber-50">
                <div className="flex items-center gap-6 bg-amber-50 px-4 py-2 rounded-full border border-amber-100 w-full justify-between">
                  <button type="button" onClick={() => handleMinus(item)} className="text-amber-800 hover:text-[#D97706] transition-colors p-1">
                    <Minus size={18} />
                  </button>

                  <span className="font-bold text-[#4A3219] text-lg text-center">{currentQuantity}</span>

                  <button type="button" onClick={() => handleAdd(item)} className="text-amber-800 hover:text-[#D97706] transition-colors p-1">
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tombol Checkout */}
      {totalItemsInCart > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
          <Link to="/cart" className="flex items-center justify-between bg-[#D97706] text-white font-extrabold px-6 py-4 rounded-2xl shadow-xl hover:bg-[#B45309] transition-all hover:scale-[1.02]">
            <div className="flex items-center gap-3">
              <span className="bg-white text-[#D97706] w-7 h-7 rounded-full flex items-center justify-center text-sm font-black shadow-sm">{totalItemsInCart}</span>
              <span>Lihat Keranjang Belanja</span>
            </div>
            <div className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-xl">
              Buka Keranjang <ArrowRight size={16} />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Shop;
