import React from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FloatingCart: React.FC = () => {
  const { state, dispatch, getTotalItems, getTotalPrice } = useCart();
  
  const handleToggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };
  
  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { id, quantity } 
    });
  };
  
  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      {/* Floating cart button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all z-50"
        onClick={handleToggleCart}
        aria-label="Open cart"
      >
        <ShoppingCart size={24} />
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-800 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {getTotalItems()}
          </span>
        )}
      </button>
      
      {/* Cart sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white shadow-xl z-50 w-full max-w-md transform transition-transform duration-300 ease-in-out ${
          state.isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Cart header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Your Cart ({getTotalItems()})</h2>
            <button 
              onClick={handleToggleCart}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Close cart"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Cart items */}
          <div className="flex-grow overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart size={64} className="text-gray-300 mb-4" />
                <p className="text-gray-500 mb-2">Your cart is empty</p>
                <button 
                  onClick={handleToggleCart}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {state.items.map(item => (
                  <li key={item.id} className="flex border-b pb-4">
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium line-clamp-2">{item.name}</h3>
                      <p className="text-blue-600 font-bold">{formatPrice(item.price)}</p>
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full border hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full border hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded-full"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Cart footer */}
          {state.items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-bold">{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Delivery:</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between mb-4 text-lg font-bold">
                <span>Total:</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay */}
      {state.isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleToggleCart}
        />
      )}
    </>
  );
};

export default FloatingCart;