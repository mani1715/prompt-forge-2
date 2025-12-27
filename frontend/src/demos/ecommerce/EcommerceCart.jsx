import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { useCart } from '../../context/CartContext';
import './ecommerce.css';

const EcommerceCart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="ecommerce-cart">
        <div className="container-ecom">
          <div className="empty-cart">
            <ShoppingBag className="empty-cart-icon" />
            <h2 className="empty-cart-title">Your cart is empty</h2>
            <p className="empty-cart-text">Add some products to get started!</p>
            <Link to="/demo/ecommerce/shop">
              <Button className="continue-shopping-btn">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="ecommerce-cart">
      <div className="container-ecom">
        <h1 className="cart-title">Shopping Cart</h1>
        <p className="cart-subtitle">Review your items before checkout</p>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items-section">
            {cartItems.map(item => (
              <Card key={item.cartItemId} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <Link to={`/demo/ecommerce/product/${item.slug}`}>
                    <h3 className="cart-item-name">{item.name}</h3>
                  </Link>
                  {item.selectedSize && (
                    <p className="cart-item-option">Size: {item.selectedSize}</p>
                  )}
                  {item.selectedColor && (
                    <p className="cart-item-option">Color: {item.selectedColor}</p>
                  )}
                  <p className="cart-item-price">${item.price}</p>
                </div>
                <div className="cart-item-quantity">
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="cart-item-total">
                  <p className="item-total-price">${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    className="remove-item-btn"
                    onClick={() => removeFromCart(item.cartItemId)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="cart-summary-section">
            <Card className="order-summary">
              <h2 className="summary-title">Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <p className="free-shipping-note">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link to="/demo/ecommerce/checkout">
                <Button className="checkout-btn">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/demo/ecommerce/shop">
                <Button variant="outline" className="continue-shopping-btn-outline">
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceCart;