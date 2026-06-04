import { useState } from "react";
import { useCart } from "./CartContext";

function Checkout() {
  // Ambil data dari data pusat
  const { cartItems, getTotalPrice } = useCart();

  // State untuk menangkap input form
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    metodePembayaran: "Transfer Bank (Manual)",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!formData.nama.trim() || !formData.alamat.trim()) {
      alert("Silakan isi Nama dan Alamat lengkap kamu terlebih dahulu ya! 😊");
      return;
    }

    if (cartItems.length === 0) {
      alert("Keranjang belanjamu kosong, yuk pilih kue dulu di menu Shop!");
      return;
    }

    const nomorWhatsapp = "6285291849407";

    let listPesananText = "";
    cartItems.forEach((item, index) => {
      listPesananText += `${index + 1}. *${item.name}* (Jumlah: ${item.quantity}) - ${item.price}\n`;
    });

    const pesanUtuh = `─────────── ୨୧ ───────────
      PESANAN BARU - BAKEMELATER
─────────── ୨୧ ───────────

Detail Pengiriman:
♡ Nama Lengkap: ${formData.nama}
♡ Alamat Lengkap: ${formData.alamat}
♡ Metode Pembayaran: ${formData.metodePembayaran}

Daftar Pesanan:
${listPesananText}
Total Harga: Rp ${getTotalPrice().toLocaleString("id-ID")}

Terima kasih! Mohon segera diproses ya kak.
─────────── ୨୧ ───────────`;

    const urlFormat = encodeURIComponent(pesanUtuh);

    window.open(`https://wa.me/${nomorWhatsapp}?text=${urlFormat}`, "_blank");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100">
        <h1 className="text-2xl font-extrabold text-amber-900 mb-6">Detail Pengiriman 📦</h1>

        <form onSubmit={handleSendMessage} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-amber-950 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full border border-amber-200 p-3 rounded-xl focus:outline-none focus:border-rose-400 bg-amber-50/20"
              placeholder="Masukkan nama kamu"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-amber-950 mb-1">Alamat Lengkap</label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="w-full border border-amber-200 p-3 rounded-xl focus:outline-none focus:border-rose-400 bg-amber-50/20 h-24"
              placeholder="Alamat rumah atau lokasi pengiriman"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-amber-950 mb-1">Metode Pembayaran</label>
            <select name="metodePembayaran" value={formData.metodePembayaran} onChange={handleChange} className="w-full border border-amber-200 p-3 rounded-xl focus:outline-none focus:border-rose-400 bg-white">
              <option value="Transfer Bank (Manual)">Transfer Bank (Manual)</option>
              <option value="E-Wallet (Dana / OVO / GoPay)">E-Wallet (Dana / OVO / GoPay)</option>
              <option value="COD (Bayar di Tempat)">COD (Bayar di Tempat)</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-colors shadow-md mt-6 block text-center">
            Konfirmasi Pesanan Sekarang
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
