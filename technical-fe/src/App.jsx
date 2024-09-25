/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import Login from './pages/Login';
import Footer from './components/Footer';
import ItemsCRUD from './pages/ItemsCRUD';
import Transaction from './pages/Transaction';

const App = () => {
  return (
    <Router>
        <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Transaction" element={<Transaction />} />
        <Route path="/ItemsCrud" element={<ItemsCRUD/>} />
      </Routes>
       <Footer/>
      </main>
    </Router>
  );
};

export default App;
