import React from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductListing from './components/ProductListing';
import FloatingCart from './components/FloatingCart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-2">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/category/:category" element={<CategoryPage />} />
            </Routes>
          </main>
          <FloatingCart />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;