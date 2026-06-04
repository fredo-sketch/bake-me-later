import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import Img1 from "../assets/images/1.png";
import Img2 from "../assets/images/2.png";
import Img3 from "../assets/images/3.png";
import Img4 from "../assets/images/4.png";
import Img5 from "../assets/images/5.png";
import Img6 from "../assets/images/6.png";

const cookieImages = [Img1, Img2, Img3, Img4, Img5, Img6];

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 text-center">
      {/* Hero Section Container */}
      <div className="bg-[#FDE68A]/30 rounded-[3rem] p-10 md:p-20 shadow-sm mb-16 border border-amber-100/50 overflow-hidden relative">
        {/* ─── 1. MARQUEE ATAS: TRANSPARAN & BERJALAN KE KIRI ─── */}
        <div className="w-full max-w-3xl mx-auto overflow-hidden mb-10 bg-transparent">
          <div className="flex gap-6 shrink-0 animate-marquee whitespace-nowrap min-w-full">
            {[...cookieImages, ...cookieImages, ...cookieImages].map((img, index) => (
              <div key={`marquee-top-${index}`} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-sm border border-amber-100/30 shrink-0">
                <img src={img} alt="BakeMeLater Cookie Top" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Konten Teks Tengah */}
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-bold text-[#D97706] mb-6 shadow-sm">
          <Star size={16} fill="#D97706" /> 100% Homemade with Love
        </div>

        <h1 className="text-5xl md:text-7xl font-playfair font-extrabold text-[#4A3219] mb-6 leading-tight">
          BakeMeLater, <br />
          <span className="text-[#D97706]">Bake Your Day Better.</span>
        </h1>

        <p className="text-[#6B4C3A] text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
          Karena setiap hari layak dirayakan, kami menghadirkan cookies yang dirancang untuk menciptakan momen berkesan. Dengan cita rasa terbaik dan kualitas pilihan, setiap gigitan menghadirkan manisnya kebahagiaan.
        </p>

        {/* ─── 2. MARQUEE BAWAH: TRANSPARAN & BERJALAN KE KANAN (REVERSE) ─── */}
        <div className="w-full max-w-3xl mx-auto overflow-hidden mb-12 bg-transparent">
          <div className="flex gap-6 shrink-0 animate-marquee-reverse whitespace-nowrap min-w-full">
            {[...cookieImages, ...cookieImages, ...cookieImages].map((img, index) => (
              <div key={`marquee-bottom-${index}`} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-sm border border-amber-100/30 shrink-0">
                <img src={img} alt="BakeMeLater Cookie Bottom" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Pesan Sekarang */}
        <Link to="/shop" className="inline-flex items-center gap-3 bg-[#D97706] text-white font-extrabold px-10 py-4 rounded-full hover:bg-[#B45309] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-lg relative z-10">
          Pesan Sekarang <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}

export default Home;
