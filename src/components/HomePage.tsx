import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/products';

const HomePage: React.FC = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Group products by category for display
  const fashionProducts = products.filter(p => p.category === 'Fashion').slice(0, 6);
  const electronicsProducts = products.filter(p => p.category === 'Electronics').slice(0, 6);
  const homeProducts = products.filter(p => p.category === 'Home').slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Banner Carousel */}
      <div className="relative bg-orange-500 rounded-lg overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-r-full p-2 shadow-md z-10">
          <ChevronLeft size={24} className="text-gray-600" />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-l-full p-2 shadow-md z-10">
          <ChevronRight size={24} className="text-gray-600" />
        </div>
        
        <div className="flex items-center">
          <div className="w-1/2 p-8">
            <h2 className="text-white text-3xl font-bold mb-2">Domestic flights</h2>
            <h3 className="text-white text-4xl font-bold mb-4">Starts at ₹1,299</h3>
            <p className="text-white text-xl mb-4">Book now</p>
            <button className="bg-white text-blue-600 font-bold py-2 px-4 rounded">FLYFK</button>
          </div>
          <div className="w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
              alt="Flight Booking" 
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full ${i === 3 ? 'w-8 bg-blue-600' : 'w-4 bg-gray-300'}`}
            ></div>
          ))}
        </div>
      </div>
      
      {/* 499 Only Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">499 only</h2>
          <Link to="/products" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
            VIEW ALL
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {fashionProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="group">
              <div className="bg-white rounded-lg overflow-hidden hover:shadow-md transition">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm truncate">{product.name}</h3>
                  <p className="text-green-600 font-medium text-sm">From {formatPrice(product.price)}</p>
                  <p className="text-gray-500 text-xs truncate">{product.brand}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Electronics Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Best of Electronics</h2>
          <Link to="/category/Electronics" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
            VIEW ALL
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {electronicsProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="group">
              <div className="bg-white rounded-lg overflow-hidden hover:shadow-md transition">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm truncate">{product.name}</h3>
                  <p className="text-green-600 font-medium text-sm">From {formatPrice(product.price)}</p>
                  <p className="text-gray-500 text-xs truncate">{product.brand}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Home & Furniture Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Home & Furniture</h2>
          <Link to="/category/Home" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
            VIEW ALL
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {homeProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="group">
              <div className="bg-white rounded-lg overflow-hidden hover:shadow-md transition">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm truncate">{product.name}</h3>
                  <p className="text-green-600 font-medium text-sm">From {formatPrice(product.price)}</p>
                  <p className="text-gray-500 text-xs truncate">{product.brand}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;