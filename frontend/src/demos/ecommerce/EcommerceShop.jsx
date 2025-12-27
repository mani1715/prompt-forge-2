import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Search, SlidersHorizontal, X } from 'lucide-react';
import { ecommerceProducts, ecommerceCategories } from '../../data/ecommerceData';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { useCart } from '../../context/CartContext';
import EcommerceNav from './EcommerceNav';
import './ecommerce.css';

const EcommerceShop = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...ecommerceProducts];

    // Filter by category
    if (selectedCategory !== 'all') {
      products = products.filter(p => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by price
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort products
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        products.sort((a, b) => b.id - a.id);
        break;
      default: // featured
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return products;
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  return (
    <div className="ecommerce-shop">
      {/* Header */}
      <div className="shop-header">
        <div className="container-ecom">
          <h1 className="shop-title">Shop All Products</h1>
          <p className="shop-subtitle">Discover your next favorite item</p>
        </div>
      </div>

      <div className="container-ecom">
        <div className="shop-layout">
          {/* Sidebar Filters */}
          <aside className={`shop-sidebar ${showFilters ? 'show-mobile' : ''}`}>
            <div className="sidebar-header">
              <h3 className="sidebar-title">Filters</h3>
              <button 
                className="close-filters-btn"
                onClick={() => setShowFilters(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="filter-section">
              <h4 className="filter-title">Category</h4>
              <div className="filter-options">
                <button
                  className={`filter-option ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  All Products
                </button>
                {ecommerceCategories.map(cat => (
                  <button
                    key={cat.id}
                    className={`filter-option ${selectedCategory === cat.slug ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.slug)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="filter-section">
              <h4 className="filter-title">Price Range</h4>
              <div className="price-inputs">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="price-input"
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="price-input"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Reset Filters */}
            <Button 
              variant="outline" 
              className="reset-filters-btn"
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange([0, 500]);
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </aside>

          {/* Main Content */}
          <div className="shop-main">
            {/* Search and Sort Bar */}
            <div className="shop-toolbar">
              <div className="search-box">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <button 
                className="mobile-filter-btn"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className="h-5 w-5" />
                Filters
              </button>

              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="results-count">
              Showing {filteredProducts.length} products
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="product-card">
                    <Link to={`/demo/ecommerce/product/${product.slug}`} className="product-image-link">
                      <div className="product-image-wrapper">
                        <img src={product.image} alt={product.name} className="product-image" />
                        {product.discount > 0 && (
                          <span className="product-discount">-{product.discount}%</span>
                        )}
                      </div>
                    </Link>
                    <div className="product-info">
                      <Link to={`/demo/ecommerce/product/${product.slug}`}>
                        <h3 className="product-name">{product.name}</h3>
                      </Link>
                      <div className="product-rating">
                        <Star className="star-icon" fill="currentColor" />
                        <span>{product.rating}</span>
                        <span className="reviews-count">({product.reviews})</span>
                      </div>
                      <div className="product-pricing">
                        <span className="product-price">${product.price}</span>
                        {product.discount > 0 && (
                          <span className="product-original-price">${product.originalPrice}</span>
                        )}
                      </div>
                      <Button 
                        className="add-to-cart-btn"
                        onClick={() => {
                          addToCart(product, 1, product.sizes[0], product.colors[0]);
                        }}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No products found matching your criteria.</p>
                <Button onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 500]);
                  setSearchQuery('');
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceShop;