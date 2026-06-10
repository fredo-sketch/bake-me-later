import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // --- STATE FORM KUE ---
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  // --- STATE MODE EDIT ---
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  // --- STATE DAFTAR KUE ---
  const [products, setProducts] = useState([]);

  // Fungsi ambil data dari backend (Sudah ditambahkan https://)
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://bakemelater-backend-production.up.railway.app/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
    }
  };

  // Cek token otomatis saat halaman di-refresh agar tidak bolak-balik login
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      fetchProducts();
    }
  }, []);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // --- FUNGSI LOGIN: Nembak ke Railway asli & simpan token ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://bakemelater-backend-production.up.railway.app/api/auth/login", {
        username: loginData.username,
        password: loginData.password,
      });

      localStorage.setItem("adminToken", response.data.token); // Simpan token di browser
      setIsAuthenticated(true);
      setLoginError("");
      fetchProducts();
    } catch (error) {
      setLoginError(error.response?.data?.message || "Login gagal, cuy! ❌");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Format file salah, cuy! Hanya boleh gambar (JPG, JPEG, PNG, WEBP) ❌");
      e.target.value = "";
      setImageFile(null);
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File kegedean, cuy! Maksimal ukuran gambar hanya 2 MB ❌");
      e.target.value = "";
      setImageFile(null);
      return;
    }
    setImageFile(file);
  };

  const handleEditClick = (product) => {
    setIsEditMode(true);
    setEditProductId(product.id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description || "");
    setImageFile(null);
    if (document.getElementById("imageInput")) {
      document.getElementById("imageInput").value = "";
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditProductId(null);
    setName("");
    setPrice("");
    setDescription("");
    setImageFile(null);
    if (document.getElementById("imageInput")) {
      document.getElementById("imageInput").value = "";
    }
  };

  // --- FUNGSI SUBMIT FORM (Membawa Token di Header Authorization) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    const dataToSend = new FormData();
    dataToSend.append("name", name);
    dataToSend.append("price", price);
    dataToSend.append("description", description);
    if (imageFile) {
      dataToSend.append("image", imageFile);
    }

    try {
      if (isEditMode) {
        const response = await axios.put(`https://bakemelater-backend-production.up.railway.app/api/products/${editProductId}`, dataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Melampirkan Token Keamanan
          },
        });
        setStatusMessage(response.data.message);
      } else {
        if (!imageFile) {
          alert("Silakan pilih gambar kue terlebih dahulu, cuy!");
          return;
        }
        const response = await axios.post("https://bakemelater-backend-production.up.railway.app/api/products", dataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Melampirkan Token Keamanan
          },
        });
        setStatusMessage(response.data.message);
      }

      handleCancelEdit();
      fetchProducts();
    } catch (error) {
      setStatusMessage(error.response?.data?.message || "Terjadi kesalahan!");
    }
  };

  // --- FUNGSI HAPUS KUE (Membawa Token di Header Authorization) ---
  const handleDelete = async (id, productName) => {
    if (window.confirm(`Beneran mau menghapus kue "${productName}" dari etalase?`)) {
      const token = localStorage.getItem("adminToken");
      try {
        const response = await axios.delete(`https://bakemelater-backend-production.up.railway.app/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, // Melampirkan Token Keamanan
        });
        alert(response.data.message);
        if (editProductId === id) handleCancelEdit();
        fetchProducts();
      } catch (error) {
        alert(error.response?.data?.message || "Gagal menghapus kue!");
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-900 mb-2 text-center">Admin Login 🔒</h2>
          <p className="text-xs text-gray-500 text-center mb-6">Khusus Owner BakeMeLater</p>
          {loginError && <div className="mb-4 p-2.5 bg-red-50 text-red-700 text-xs rounded-lg text-center">{loginError}</div>}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">USERNAME</label>
              <input type="text" name="username" value={loginData.username} onChange={handleLoginChange} className="w-full p-2 border rounded-lg text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">PASSWORD</label>
              <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} className="w-full p-2 border rounded-lg text-sm" required />
            </div>
            <button type="submit" className="w-full py-2.5 bg-amber-800 text-white font-bold rounded-lg text-sm">
              Masuk Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 p-8 flex flex-col md:flex-row gap-8 items-start justify-center max-w-6xl mx-auto">
      {/* KIRI: FORM TAMBAH / EDIT KUE */}
      <div className="bg-white p-8 rounded-2xl shadow-md w-full md:w-1/2 border border-amber-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-amber-900">{isEditMode ? "✏️ Edit Menu Kue" : "Tambah Menu Baru 👩‍🍳"}</h2>
          <button
            onClick={() => {
              localStorage.removeItem("adminToken"); // Hapus token saat logout
              setIsAuthenticated(false);
            }}
            className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md hover:bg-gray-200"
          >
            Logout
          </button>
        </div>

        {statusMessage && <div className="mb-4 p-3 bg-amber-100 text-amber-800 text-sm rounded-lg text-center font-medium">{statusMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Kue</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="Contoh: Matcha Fleur" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Harga (Rupiah)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="Contoh: 35000" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="2" className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="Jelaskan kelezatan kuemu..." />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Gambar Kue {isEditMode && <span className="text-xs font-normal text-gray-400">(Kosongkan jika tidak ingin ganti foto)</span>}</label>
            <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border border-gray-300 rounded-lg text-sm" required={!isEditMode} />
          </div>

          <div className="flex gap-2 pt-2">
            <button type="submit" className={`w-full py-3 text-white font-bold rounded-lg ${isEditMode ? "bg-blue-600 hover:bg-blue-700" : "bg-amber-700 hover:bg-amber-800"}`}>
              {isEditMode ? "Simpan Perubahan Kue 💾" : "Masukkan ke Etalase"}
            </button>
            {isEditMode && (
              <button type="button" onClick={handleCancelEdit} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 rounded-lg text-sm">
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* KANAN: DAFTAR MENU */}
      <div className="bg-white p-8 rounded-2xl shadow-md w-full md:w-1/2 border border-amber-100 h-[600px] overflow-y-auto">
        <h2 className="text-xl font-bold text-amber-900 mb-6">Manajemen Etalase Kue 📋</h2>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-amber-50/50 transition">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={product.image_url?.startsWith("http") ? product.image_url : `https://bakemelater-backend-production.up.railway.app/images/${product.image_url || "default.png"}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{product.name}</h4>
                  <p className="text-xs text-amber-700 font-semibold">Rp {product.price?.toLocaleString("id-ID")}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => handleEditClick(product)} className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold px-3 py-1.5 rounded-lg text-xs transition duration-150">
                  Edit
                </button>
                <button onClick={() => handleDelete(product.id, product.name)} className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-1.5 rounded-lg text-xs transition duration-150">
                  Hapus
                </button>
              </div>
            </div>
          ))}

          {products.length === 0 && <p className="text-sm text-gray-400 text-center py-8">Belum ada kue di etalase tokomu.</p>}
        </div>
      </div>
    </div>
  );
}
