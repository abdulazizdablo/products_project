
import React from 'react';

import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">

        <Routes>

          <Route path="/add-product" element={<ProductForm />} />


          <Route path="/" element={<ProductList />} />



        </Routes>


      </BrowserRouter>
    </div>
  );
}

export default App;
