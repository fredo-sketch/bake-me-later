import { Link } from "react-router-dom";

function ProductDetail() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-amber-100">
        <div>
          <img src="../src/assets/images/kue-tart-coklat.webp" alt="Kue Tart Coklat" className="w-full aspect-square object-cover rounded-2xl shadow-inner" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-600 px-3 py-1 rounded-full">Best Seller</span>
          <h1 className="text-3xl font-extrabold text-amber-900 mt-3 mb-2">Kue Tart Coklat Premium</h1>
          <p className="text-2xl font-bold text-rose-500 mb-4">Rp 150.000</p>
          <p className="text-gray-600 mb-6 leading-relaxed">Kue tart coklat lembut dengan lapisan selai strawberry segar di tengahnya dan siraman coklat ganache Belgia yang melimpah.</p>

          <Link to="/cart" className="w-full text-center block bg-rose-500 text-white font-bold py-3 rounded-xl hover:bg-rose-600 transition-colors shadow-md">
            Masukkan Keranjang 🛒
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
