import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, TrendingUp, Star, ArrowRight, Sparkles } from 'lucide-react';
import { ecommerceProducts, ecommerceBanners, ecommerceCategories } from '../../data/ecommerceData';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { useCart } from '../../context/CartContext';
import EcommerceNav from './EcommerceNav';
import './ecommerce.css';

const EcommerceHome = () => {
  const { addToCart } = useCart();
  const featuredProducts = ecommerceProducts.filter(p => p.featured).slice(0, 8);

  return (
    <div className="ecommerce-demo">
      <EcommerceNav />
      {/* Hero Banner */}
      <section className="ecommerce-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles className="h-4 w-4" />
            <span>Summer Collection 2024</span>
          </div>
          <h1 className="hero-title">Elevate Your Style</h1>
          <p className="hero-subtitle">Discover premium fashion at unbeatable prices</p>
          <div className="hero-cta">
            <Link to="/demo/ecommerce/shop">
              <Button className="btn-primary-large">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="ecommerce-section">
        <div className="container-ecom">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Explore our curated collections</p>
          </div>
          <div className="categories-grid">
            {ecommerceCategories.map(category => (
              <Link 
                key={category.id} 
                to={`/demo/ecommerce/shop?category=${category.slug}`}
                className="category-card"
              >
                <div className="category-image-wrapper">
                  <img src={category.image} alt={category.name} className="category-image" />
                  <div className="category-overlay">
                    <span className="category-name">{category.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="ecommerce-section bg-gray">
        <div className="container-ecom">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Handpicked favorites just for you</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
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
          <div className="text-center mt-8">
            <Link to="/demo/ecommerce/shop">
              <Button variant="outline" className="view-all-btn">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="ecommerce-section">
        <div className="container-ecom">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="feature-title">Premium Quality</h3>
              <p className="feature-desc">Handpicked products from top brands</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="feature-title">Easy Shopping</h3>
              <p className="feature-desc">Seamless checkout experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-desc">We're here to help anytime</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EcommerceHome;