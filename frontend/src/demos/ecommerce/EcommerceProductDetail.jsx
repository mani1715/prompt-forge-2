import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Star, Heart, Share2, Check, ArrowLeft, TrendingUp } from 'lucide-react';
import { ecommerceProducts } from '../../data/ecommerceData';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { useCart } from '../../context/CartContext';
import './ecommerce.css';

const EcommerceProductDetail = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const product = ecommerceProducts.find(p => p.slug === slug);
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || null);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="ecommerce-shop">
        <div className="container-ecom">
          <div className="not-found-container">
            <h1>Product Not Found</h1>
            <Link to="/demo/ecommerce/shop">
              <Button>Back to Shop</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const relatedProducts = ecommerceProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="ecommerce-product-detail">
      <div className="container-ecom">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/demo/ecommerce">Home</Link>
          <span>/</span>
          <Link to="/demo/ecommerce/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        {/* Product Detail */}
        <div className="product-detail-layout">
          {/* Left - Images */}
          <div className="product-images-section">
            <div className="main-image-wrapper">
              <img 
                src={images[selectedImage]} 
                alt={product.name} 
                className="main-product-image"
              />
            </div>
            {images.length > 1 && (
              <div className="thumbnail-gallery">
                {images.map((img, idx) => (
                  <div 
                    key={idx}
                    className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right - Details */}
          <div className="product-details-section">
            <h1 className="product-detail-title">{product.name}</h1>
            
            <div className="product-rating-detail">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="star-icon" 
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="rating-text">{product.rating}</span>
              <span className="reviews-link">({product.reviews} reviews)</span>
            </div>

            <div className="product-pricing-detail">
              <span className="price-current">${product.price}</span>
              {product.discount > 0 && (
                <>
                  <span className="price-original">${product.originalPrice}</span>
                  <span className="discount-badge">Save {product.discount}%</span>
                </>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="product-option">
                <h3 className="option-label">Size</h3>
                <div className="option-buttons">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`option-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="product-option">
                <h3 className="option-label">Color</h3>
                <div className="option-buttons">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`option-btn ${selectedColor === color ? 'active' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="product-option">
              <h3 className="option-label">Quantity</h3>
              <div className="quantity-selector">
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="qty-input"
                />
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <Button 
                className="add-to-cart-btn-large"
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button variant="outline" className="wishlist-btn">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="share-btn">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Product Features */}
            <div className="product-features">
              <div className="feature-item">
                <Check className="h-5 w-5" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="feature-item">
                <Check className="h-5 w-5" />
                <span>Easy 30-day returns</span>
              </div>
              <div className="feature-item">
                <Check className="h-5 w-5" />
                <span>100% authentic products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <h2 className="section-title">You May Also Like</h2>
            <div className="products-grid">
              {relatedProducts.map(product => (
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
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default EcommerceProductDetail;