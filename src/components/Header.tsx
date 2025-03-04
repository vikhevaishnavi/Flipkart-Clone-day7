import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';

const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <span className="text-blue-600 font-bold italic bg-white px-1 rounded">Flipkart</span>
              <span className="text-xs ml-1 italic text-yellow-200 flex flex-col">
                <span>Explore</span>
                <span className="flex items-center">Plus <span className="text-yellow-400 ml-1">✦</span></span>
              </span>
            </Link>
            <div className="hidden md:flex relative w-96">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full py-2 px-4 rounded-sm text-gray-800 focus:outline-none"
              />
              <button className="absolute right-0 top-0 h-full px-3 text-blue-600">
                <Search size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div 
              className="hidden md:flex items-center space-x-1 cursor-pointer relative"
              onMouseEnter={() => setShowLoginDropdown(true)}
              onMouseLeave={() => setShowLoginDropdown(false)}
            >
              <User size={20} />
              <span>Login</span>
              <ChevronDown size={16} />
              
              {showLoginDropdown && (
                <div className="absolute top-full right-0 mt-1 w-60 bg-white shadow-lg rounded-sm text-gray-800 z-50">
                  <div className="p-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="font-medium">New Customer?</h3>
                      <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center hover:bg-gray-50 p-1">
                        <User size={18} className="mr-2 text-gray-600" />
                        <span>My Profile</span>
                      </li>
                      <li className="flex items-center hover:bg-gray-50 p-1">
                        <ShoppingBag size={18} className="mr-2 text-gray-600" />
                        <span>Orders</span>
                      </li>
                      <li className="flex items-center hover:bg-gray-50 p-1">
                        <Heart size={18} className="mr-2 text-gray-600" />
                        <span>Wishlist</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <Link to="/become-seller" className="hidden md:flex items-center space-x-1 cursor-pointer">
              <span>Become a Seller</span>
            </Link>
            <div className="hidden md:flex items-center space-x-1 cursor-pointer">
              <Heart size={20} />
              <span>Wishlist</span>
            </div>
            <Link to="/cart" className="flex items-center space-x-1 cursor-pointer">
              <div className="relative">
                <ShoppingBag size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              <span className="hidden md:inline">Cart</span>
            </Link>
          </div>
        </div>
        
        <div className="md:hidden mt-3 relative">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full py-2 px-4 rounded-sm text-gray-800 focus:outline-none"
          />
          <button className="absolute right-0 top-0 h-full px-3 text-blue-600">
            <Search size={20} />
          </button>
        </div>
      </div>
      
      {/* Category Navigation */}
      <div className="bg-white text-gray-800 shadow-sm">
        <div className="container mx-auto overflow-x-auto">
          <div className="flex space-x-8 py-2 px-4 min-w-max">
            <Link to="/category/Grocery" className="flex flex-col items-center hover:text-blue-600">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                alt="Grocery" className="w-16 h-16 object-contain" />
              <span className="text-sm mt-1 font-medium">Grocery</span>
            </Link>
            <Link to="/category/Mobiles" className="flex flex-col items-center hover:text-blue-600">
              <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                alt="Mobiles" className="w-16 h-16 object-contain" />
              <span className="text-sm mt-1 font-medium">Mobiles</span>
            </Link>
            <Link to="/category/Fashion" className="flex flex-col items-center hover:text-blue-600 group">
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                alt="Fashion" className="w-16 h-16 object-contain" />
              <span className="text-sm mt-1 font-medium flex items-center">Fashion <ChevronDown size={14} className="ml-1" /></span>
            </Link>
            <Link to="/category/Electronics" className="flex flex-col items-center hover:text-blue-600 group">
              <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                alt="Electronics" className="w-16 h-16 object-contain" />
              <span className="text-sm mt-1 font-medium flex items-center">Electronics <ChevronDown size={14} className="ml-1" /></span>
            </Link>
            <Link to="/category/Home" className="flex flex-col items-center hover:text-blue-600 group">
              <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                alt="Home" className="w-16 h-16 object-contain" />
              <span className="text-sm mt-1 font-medium flex items-center">Home & Furniture <ChevronDown size={14} className="ml-1" /></span>
            </Link>
            <Link to="/category/Appliances" className="flex flex-col items-center hover:text-blue-600">
              <img src="https://images.unsplash.com/photo-1585515320310-259814833e62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                alt="Appliances" className="w-16 h-16 object-contain" />
              <span className="text-sm mt-1 font-medium">Appliances</span>
            </Link>
            <Link to="/category/Travel" className="flex flex-col items-center hover:text-blue-600">
              <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                alt="Travel" className="w-16 h-16 object-contain" />
              <span className="text-sm mt-1 font-medium">Flight Bookings</span>
            </Link>
            <Link to="/category/Beauty" className="flex flex-col items-center hover:text-blue-600 group">
              <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                alt="Beauty" className="w-16 h-16 object-contain" />
              <span className="text-sm mt-1 font-medium flex items-center">Beauty, Toys & More <ChevronDown size={14} className="ml-1" /></span>
            </Link>
            <Link to="/category/TwoWheelers" className="flex flex-col items-center hover:text-blue-600 group">
              <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                alt="Two Wheelers" className="w-16 h-16 object-contain" />
              <span className="text-sm mt-1 font-medium flex items-center">Two Wheelers <ChevronDown size={14} className="ml-1" /></span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;