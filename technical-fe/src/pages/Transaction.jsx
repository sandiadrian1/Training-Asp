import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ParkirForm from '../components/TransactionForm';
import ParkirList from '../components/TransactionList';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { BadgeDollarSign } from 'lucide-react';
import { Shirt} from 'lucide-react';
import ItemStock from '../components/ItemStock';



const Transaction = () => {
  const [item, setItem] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [id, setId] = useState(null);
  const [itemId, setItemId] = useState(0);
  const [quantity, setQuantity] = useState('');
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();

  // Cek apakah pengguna sudah login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Arahkan ke halaman login jika belum login
    } else {
      loadItems(token);
      loadTransaction(token);
    }
  }, [navigate]);

  const loadItems = async (token) => {
    try {
      const response = await axios.get('http://localhost:5149/api/Items', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItem(response.data);
    } catch (err) {
      console.error('Gagal mengambil data TypeTransportasi:', err);
    }
  };

  const loadTransaction = async (token) => {
    try {
      const response = await axios.get("http://localhost:5149/api/Transaction/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data);
    } catch (err) {
      console.error('Gagal mengambil data Transaksi:', err);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const txid = parseInt(itemId);
      const data = {
        itemId: txid,
        quantity,
      };

      if (id === null) {
        await axios.post('http://localhost:5149/api/Transaction/transactions', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.put(`https://localhost:7122/api/Parkir/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      resetForm();
      loadTransaction(token);
      loadItems(token);
      alert('Pembayaran Sukses');
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  const resetForm = () => {
    setId(null);
    setItemId('');
    setQuantity('');
  };



  return (
    <div>
    <header className="bg-green-600 text-white py-4">
    <nav className="container mx-auto">
      <ul className=" flex bg-origin-padding gap-10">
        <li><Link to="/parkir" className="hover:underline"><BadgeDollarSign size={44} strokeWidth={2.75} /></Link></li>
        <li><Link to="/ItemsCRUD" className="hover:underline"><Shirt  size={44} strokeWidth={2.75} /></Link></li>
        <li><Link to="/" className="hover:underline"><LogOut  size={44} strokeWidth={2.75} /></Link></li>
      </ul>
    </nav>
  </header>
    <div className="container mx-auto p-4">
      <ParkirForm
        item={item}
        itemId={itemId}
        setItemId={setItemId}
        quantity={quantity}
        setQuantity={setQuantity}
        handleSave={handleSave}
        resetForm={resetForm}
      />
      <ParkirList
        transactions={transactions}
       
      />
      <ItemStock
        item={item}
     />
    </div>
    </div>
  );
};

export default Transaction;
