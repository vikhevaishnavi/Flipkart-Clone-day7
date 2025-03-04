import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Share2, Shield, Truck, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };
  
  const handleBuyNow = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    dispatch({ type: 'TOGGLE_CART' });
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Generate similar products
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 6);
  
  // Mock multiple images for the product
  const productImages = [
    product.image,
    `https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80`,
    `https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80`,
    `https://images.unsplash.com/photo-1600185652960-4ed27e35c716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80`,
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="order-2 md:order-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:h-96">
            {productImages.map((img, index) => (
              <div 
                key={index}
                className={`border-2 rounded cursor-pointer min-w-16 h-16 ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'}`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={img} 
                  alt={`${product.name} view ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          <div className="order-1 md:order-2 flex-grow">
            <div className="sticky top-20 h-96 flex items-center justify-center border rounded-lg">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            
            <div className="flex gap-4 mt-6">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center"
              >
                <ShoppingBag size={20} className="mr-2" />
                ADD TO CART
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center"
              >
                <Truck size={20} className="mr-2" />
                BUY NOW
              </button>
            </div>
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <div className="mb-4">
            <p className="text-gray-500">{product.brand}</p>
            <h1 className="text-xl font-medium">{product.name}</h1>
            <div className="flex items-center mt-1">
              <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded flex items-center">
                {product.rating} <Star size={12} className="ml-0.5 fill-current" />
              </span>
              <span className="text-gray-500 text-sm ml-2">({product.reviews} Reviews)</span>
              <span className="text-green-600 ml-2 text-sm">Assured</span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              <span className="text-gray-500 line-through ml-2">{formatPrice(product.price * 1.4)}</span>
              <span className="text-green-600 ml-2">30% off</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
          </div>
          
          {/* Offers */}
          <div className="border rounded-md p-3 mb-6">
            <h3 className="font-medium mb-2">Available offers</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-600 font-medium mr-2">•</span>
                <span>
                  <span className="font-medium">Bank Offer:</span> 10% off on HDFC Bank Credit Card, up to ₹1,500 on orders of ₹5,000 and above
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-medium mr-2">•</span>
                <span>
                  <span className="font-medium">Special Price:</span> Get extra ₹3,000 off (price inclusive of discount)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-medium mr-2">•</span>
                <span>
                  <span className="font-medium">No Cost EMI:</span> Avail No Cost EMI on select cards for orders above ₹3,000
                </span>
              </li>
            </ul>
          </div>
          
          {/* Delivery */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Delivery</h3>
            <div className="flex items-center">
              <input 
                type="text" 
                placeholder="Enter delivery pincode" 
                className="border rounded-l p-2 w-40"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r">Check</button>
            </div>
            <div className="flex items-center mt-3 text-sm">
              <Truck size={16} className="text-blue-600 mr-2" />
              <span>Free delivery on orders above ₹500</span>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <RotateCcw size={16} className="text-blue-600 mr-2" />
              <span>7 days replacement policy</span>
            </div>
          </div>
          
          {/* Highlights */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Highlights</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li className="flex items-center">
                <span className="text-gray-600 mr-2">•</span>
                <span>Brand: {product.brand}</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-600 mr-2">•</span>
                <span>Category: {product.category}</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-600 mr-2">•</span>
                <span>Highly Rated</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-600 mr-2">•</span>
                <span>Top Selling</span>
              </li>
            </ul>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-sm text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>
      
      {/* Similar Products */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {similarProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden border hover:shadow-md transition cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm truncate">{product.name}</h3>
                <p className="text-green-600 font-medium text-sm">{formatPrice(product.price)}</p>
                <div className="flex items-center mt-1">
                  <span className="bg-green-600 text-white text-xs px-1 py-0.5 rounded flex items-center">
                    {product.rating} <Star size={10} className="ml-0.5 fill-current" />
                  </span>
                  <span className="text-gray-500 text-xs ml-1">({product.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;