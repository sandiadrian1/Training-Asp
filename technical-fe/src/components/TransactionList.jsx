/* eslint-disable react/prop-types */
// import React from "react";

const TransactionList = ({ transactions}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center p-10">Laporan Penjualan</h2>
      <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in-up">
        <thead>
          <tr className="bg-blue-500 text-white">
            
            <th className="p-4 animate-fade-in-L">Item</th>
            <th className="p-4 animate-fade-in-L">Quantitas</th>
            <th className="p-4 animate-fade-in-R">Harga</th>
            <th className="p-4 animate-fade-in-L">Total Harga</th>
            <th className="p-4 animate-fade-in-L">Kategori</th>
            <th className="p-4 animate-fade-in-R">Tanggal Transaksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-100 transition duration-300 ease-in-out">
              
              <td className="p-4 text-center animate-fade-in-L">{transaction.item.nama}</td>
              <td className="p-4 text-center animate-fade-in-L">{transaction.kuantitas}</td>
              <td className="p-4 text-center animate-fade-in-L">{transaction.item.harga}</td>
              <td className="p-4 text-center animate-fade-in-L">{transaction.totalHarga}</td>
              <td className="p-4 text-center animate-fade-in-L">{transaction.item.kategori}</td>
              <td className="p-4 text-center animate-fade-in-L">{new Date(transaction.tanggalTransaksi).toLocaleString()}</td>

              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};  

export default TransactionList;
