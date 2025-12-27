import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Home, Store, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './ecommerce.css';

const EcommerceNav = () => {
  const { getCartItemsCount, toggleCart } = useCart();
  const cartCount = getCartItemsCount();

  return (
    <nav className="ecommerce-nav">
      <div className="ecommerce-nav-container">
        {/* Back to Portfolio */}
        <Link to="/portfolio/shopify-ecommerce-platform" className="back-to-portfolio">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Logo */}
        <Link to="/demo/ecommerce" className="ecommerce-logo">
          <Store className="h-6 w-6" />
          <span>StyleHub</span>
        </Link>

        {/* Navigation Links */}
        <div className="ecommerce-nav-links">
          <Link to="/demo/ecommerce" className="nav-link">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link to="/demo/ecommerce/shop" className="nav-link">
            <Store className="h-5 w-5" />
            <span>Shop</span>
          </Link>
        </div>

        {/* Cart Button */}
        <Link to="/demo/ecommerce/cart" className="cart-button">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default EcommerceNav;
