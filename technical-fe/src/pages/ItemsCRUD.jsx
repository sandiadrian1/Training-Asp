import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { BadgeDollarSign } from 'lucide-react';
import { Shirt } from 'lucide-react';
import { useNavigate } from "react-router-dom";



function ItemsCRUD() {
  const [id, setId] = useState("");
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Arahkan ke halaman login jika belum login
    }
    Load();
  }, []);

  async function Load() {
    setLoading(true);
    try {
      const result = await axios.get(
        "http://localhost:5149/api/Items"
      );
      setItems(result.data);
      console.log(result);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setLoading(false);
  }

  async function Save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5149/api/Items/items", {
        Nama:nama,
        Harga:harga,
        Stok:stok,
        kategori:kategori,
        UrlGambar:gambar,
      });
      alert("Berhasil menambahkan Items");
      clearForm();
      Load();
    } catch (err) {
      alert("Error maaf: " + err);
    }
  }

  function EditType(items) {
    setNama(items.nama);
    setHarga(items.harga);
    setStok(items.stok),
    setKategori(items.kategori),
    setGambar(items.gambar),
    setId(items.id);
  }

  async function Delete(id) {
    try {
      await axios.delete("http://localhost:5149/api/Items/" + id);
      alert("Berhasil Menghapus");
      clearForm();
      Load();
    } catch (err) {
      alert("Error: " + err);
    }
  }

  async function Update(event) {
    event.preventDefault();
    try {
      await axios.put("http://localhost:5149/api/Items/" + id, {
        Nama: nama,
        Harga: harga,
        Stok : stok,
        kategori : kategori,
        UrlGambar : gambar,
      });
      alert("Update berhasil!");
      clearForm();
      Load();
    } catch (err) {
      alert("Error: " + err);
    }
  }

  function clearForm() {
    setId("");
    setNama("");
    setHarga("");
    setStok("");
    setKategori("");
    setGambar("");
  }

  return (
    <div>
    <header className="bg-green-600 text-white py-4">
    <nav className="container mx-auto">
      <ul className=" flex bg-origin-padding gap-10">
        <li><Link to="/Transaction" className="hover:underline"><BadgeDollarSign   size={44} strokeWidth={2.75} /></Link></li>
        <li><Link to="/ItemsCRUD" className="hover:underline"><Shirt size={44} strokeWidth={2.75} /></Link></li>
        <li><Link to="/" className  ="hover:underline">< LogOut  size={44} strokeWidth={2.75} /></Link></li>
      </ul>
    </nav>
  </header>
    <div className="max-w-4xl mx-auto p-4">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
        <form className="animate-fade-in-up" onSubmit={id ? Update : Save}>
      <h1 className="text-3xl font-bold text-center mb-8 animate-pulse">Manajemen Item</h1>
          <div className="form-group mb-4">
            <label htmlFor="nama" className="block text-lg font-semibold mb-2">Nama</label>
            <input
              type="text"
              className="form-control w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              id="nama"
              value={nama}
              onChange={(event) => setNama(event.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="harga" className="block text-lg font-semibold mb-2">Harga</label>
            <input
              type="number"
              className="form-control w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              id="harga"
              value={harga}
              onChange={(event) => setHarga(event.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="stok" className="block text-lg font-semibold mb-2">Stok</label>
            <input
              type="number"
              className="form-control w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              id="stok"
              value={stok}
              onChange={(event) => setStok(event.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="kategori" className="block text-lg font-semibold mb-2">Kategori</label>
            <input
              type="text"
              className="form-control w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              id="kategori"
              value={kategori}
              onChange={(event) => setKategori(event.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="gambar" className="block text-lg font-semibold mb-2">Upload Url Gambar</label>
            <input
              type="text"
              className="form-control w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              id="gambar"
              value={gambar}
              onChange={(event) => setGambar(event.target.value)}
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              type="submit"
            >
              {id ? "Update" : "Register"}
            </button>
            {id && (
              <button
                type="button"
                className="btn btn-secondary bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                onClick={clearForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      <br />
      <table className="table-auto w-full mt-8 animate-fade-in-down">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Item Id</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Harga</th>
            <th className="px-4 py-2">Stok</th>
            <th className="px-4 py-2">Kategori</th>
            <th className="px-4 py-2">Gambar</th>
            <th className="px-4 py-2">Option</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center py-4">Loading...</td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">No data available</td>
            </tr>
          ) : (
            items.map((item) => (
              <tr
                key={item.id}
                className="bg-white hover:bg-gray-100 transition duration-150"
              >
                <td className="border px-4 py-2 animate-fade-in-L">{item.id}</td>
                <td className="border px-4 py-2 animate animate-fade-in-L">{item.nama}</td>
                <td className="border px-4 py-2 animate animate-fade-in-R">{item.harga}</td>
                <td className="border px-4 py-2 animate animate-fade-in-L">{item.stok}</td>
                <td className="border px-4 py-2 animate animate-fade-in-R">{item.kategori}</td>
                <td className="border px-4 py-2 animate animate-fade-in-R"><img src={item.urlGambar} alt="" className="w-20 h-20  " /></td>
                <td className="border px-4 py-2">
                  <button
                    className=" animate-fade-in-Rbtn btn-warning bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 transition duration-200 mr-2"
                    onClick={() => EditType(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-200"
                    onClick={() => Delete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default ItemsCRUD;
