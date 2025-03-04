import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Filter, ChevronDown } from 'lucide-react';
import { products, brands, priceRanges } from '../data/products';
import { useCart } from '../context/CartContext';
import { FilterState, Product } from '../types';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { dispatch } = useCart();
  const [showFilters, setShowFilters] = useState(false);
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    category: category || '',
    priceRange: [0, Infinity],
    brand: '',
    minRating: 0,
    sortBy: 'popularity'
  });

  useEffect(() => {
    // Update category filter when URL param changes
    setFilters(prev => ({ ...prev, category: category || '' }));
  }, [category]);

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // Apply brand filter
    if (filters.brand) {
      result = result.filter(product => product.brand === filters.brand);
    }

    // Apply price range filter
    result = result.filter(
      product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Apply rating filter
    result = result.filter(product => product.rating >= filters.minRating);

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [filters]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Mobile filter button */}
      <div className="md:hidden bg-white p-3 rounded-lg shadow-sm mb-4">
        <button 
          className="w-full flex items-center justify-between"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="flex items-center">
            <Filter size={18} className="mr-2" />
            Filters
          </span>
          <ChevronDown size={18} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {/* Filters sidebar */}
      <div className={`${showFilters || 'hidden md:block'} w-full md:w-64 bg-white p-4 rounded-lg shadow-sm h-fit`}>
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        
        {/* Category filter */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Category</h3>
          <select 
            className="w-full p-2 border rounded-md"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {['Electronics', 'Fashion', 'Home', 'Beauty', 'Mobiles'].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        {/* Brand filter */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Brand</h3>
          <select 
            className="w-full p-2 border rounded-md"
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        
        {/* Price range filter */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Price Range</h3>
          <select 
            className="w-full p-2 border rounded-md"
            value={`${filters.priceRange[0]}-${filters.priceRange[1]}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split('-').map(Number);
              handleFilterChange('priceRange', [min, max || Infinity]);
            }}
          >
            <option value="0-Infinity">All Prices</option>
            {priceRanges.map(([min, max]) => (
              <option key={`${min}-${max}`} value={`${min}-${max}`}>
                {formatPrice(min)} - {max === Infinity ? 'Above' : formatPrice(max)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Rating filter */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Minimum Rating</h3>
          <div className="flex items-center">
            {[4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                className={`flex items-center mr-3 px-2 py-1 rounded ${
                  filters.minRating === rating ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'
                }`}
                onClick={() => handleFilterChange('minRating', rating)}
              >
                {rating}+ <Star size={14} className="ml-1 fill-current" />
              </button>
            ))}
          </div>
        </div>
        
        {/* Sort options */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Sort By</h3>
          <select 
            className="w-full p-2 border rounded-md"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value as any)}
          >
            <option value="popularity">Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        
        {/* Reset filters */}
        <button 
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md transition"
          onClick={() => setFilters({
            category: category || '',
            priceRange: [0, Infinity],
            brand: '',
            minRating: 0,
            sortBy: 'popularity'
          })}
        >
          Reset Filters
        </button>
      </div>
      
      {/* Product grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {filters.category ? filters.category : 'All Products'} ({filteredProducts.length})
          </h2>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="text-lg text-gray-600">No products match your filters.</p>
            <button 
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
              onClick={() => setFilters({
                category: category || '',
                priceRange: [0, Infinity],
                brand: '',
                minRating: 0,
                sortBy: 'popularity'
              })}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <h3 className="font-medium text-sm text-gray-500">{product.brand}</h3>
                  <Link to={`/product/${product.id}`} className="block">
                    <h2 className="font-medium mb-1 line-clamp-2 h-12" title={product.name}>{product.name}</h2>
                  </Link>
                  <div className="flex items-center mb-2">
                    <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded flex items-center">
                      {product.rating} <Star size={12} className="ml-0.5 fill-current" />
                    </span>
                    <span className="text-gray-500 text-xs ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{formatPrice(product.price)}</span>
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
                      onClick={() => handleAddToCart(product)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;