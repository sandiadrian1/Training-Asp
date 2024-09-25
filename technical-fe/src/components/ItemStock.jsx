/* eslint-disable react/prop-types */
// import React from "react";

const ItemStock = ({ item, handleEdit, handleDelete, handleDetail }) => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center p-20">Laporan Stock</h2>
        <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in-up">
          <thead>
            <tr className="bg-blue-500 text-white">
              
              <th className="p-4 animate-fade-in-L">Item</th>
              <th className="p-4 animate-fade-in-L">Stok Tersisa</th>
            </tr>
          </thead>
          <tbody>
            {item.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-100 transition duration-300 ease-in-out">
                
                <td className="p-4 text-center animate-fade-in-L">{transaction.nama}</td>
                <td className="p-4 text-center animate-fade-in-L">{transaction.stok}</td>
                  
        
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ItemStock;
  