import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Home, Building2, Filter, MapPin, 
  Bed, Bath, Maximize, DollarSign, TrendingUp, Users, 
  Award, Phone, Mail, Heart, ChevronRight, Star
} from 'lucide-react';
import { properties, propertyTypes } from '../../data/realEstateData';
import './real-estate.css';

const RealEstateHome = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState('all');
  const [bedrooms, setBedrooms] = useState('any');

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'All' || property.type === selectedType;
      
      let matchesPrice = true;
      const price = property.status === 'For Rent' || property.status === 'For Lease' ? property.price * 12 : property.price;
      
      if (priceRange === 'under500k') matchesPrice = price < 500000;
      else if (priceRange === '500k-1m') matchesPrice = price >= 500000 && price < 1000000;
      else if (priceRange === '1m-2m') matchesPrice = price >= 1000000 && price < 2000000;
      else if (priceRange === '2m+') matchesPrice = price >= 2000000;
      
      const matchesBedrooms = bedrooms === 'any' || 
                              (bedrooms === '1' && property.bedrooms === 1) ||
                              (bedrooms === '2' && property.bedrooms === 2) ||
                              (bedrooms === '3' && property.bedrooms === 3) ||
                              (bedrooms === '4+' && property.bedrooms >= 4);
      
      return matchesSearch && matchesType && matchesPrice && matchesBedrooms;
    });
  }, [searchTerm, selectedType, priceRange, bedrooms]);

  const featuredProperties = properties.filter(p => p.featured).slice(0, 6);

  const formatPrice = (property) => {
    if (property.status === 'For Rent' || property.status === 'For Lease') {
      return `$${property.price.toLocaleString()}${property.priceType || '/month'}`;
    }
    return `$${property.price.toLocaleString()}`;
  };

  const handlePropertyClick = (slug) => {
    navigate(`/demo/real-estate/property/${slug}`);
  };

  const handleViewAllClick = () => {
    navigate('/demo/real-estate/listings');
  };

  return (
    <div className="real-estate-container">
      {/* Navigation */}
      <nav className="real-estate-nav">
        <div className="nav-content">
          <Link to="/portfolio/real-estate-portal" className="back-link">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Case Study</span>
          </Link>
          <div className="nav-brand">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="brand-name">PrimeRealty</span>
          </div>
          <div className="nav-links">
            <a href="#properties">Properties</a>
            <a href="#agents">Agents</a>
            <button className="nav-cta-btn">List Property</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="real-estate-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Home</h1>
          <p className="hero-description">
            Discover the perfect property from our extensive collection of homes, apartments, and commercial spaces
          </p>
          
          {/* Search Bar */}
          <div className="hero-search">
            <div className="search-input-group">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by location, property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="search-select"
            >
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select 
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="search-select"
            >
              <option value="all">All Prices</option>
              <option value="under500k">Under $500K</option>
              <option value="500k-1m">$500K - $1M</option>
              <option value="1m-2m">$1M - $2M</option>
              <option value="2m+">$2M+</option>
            </select>
            <select 
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="search-select"
            >
              <option value="any">Any Beds</option>
              <option value="1">1 Bed</option>
              <option value="2">2 Beds</option>
              <option value="3">3 Beds</option>
              <option value="4+">4+ Beds</option>
            </select>
            <button className="search-btn" onClick={handleViewAllClick}>
              <Search className="h-5 w-5" />
              Search
            </button>
          </div>

          {/* Quick Stats */}
          <div className="hero-stats">
            <div className="stat-card">
              <Building2 className="stat-icon" />
              <div className="stat-info">
                <div className="stat-value">1,200+</div>
                <div className="stat-label">Properties</div>
              </div>
            </div>
            <div className="stat-card">
              <Users className="stat-icon" />
              <div className="stat-info">
                <div className="stat-value">850+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
            </div>
            <div className="stat-card">
              <Award className="stat-icon" />
              <div className="stat-info">
                <div className="stat-value">15+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="property-types-section">
        <div className="section-header">
          <h2 className="section-title">Browse by Property Type</h2>
          <p className="section-description">Find the perfect property that matches your lifestyle</p>
        </div>
        <div className="property-types-grid">
          <div className="type-card" onClick={() => { setSelectedType('House'); handleViewAllClick(); }}>
            <div className="type-icon">
              <Home className="h-8 w-8" />
            </div>
            <h3>Houses</h3>
            <p>{properties.filter(p => p.type === 'House').length} Properties</p>
          </div>
          <div className="type-card" onClick={() => { setSelectedType('Apartment'); handleViewAllClick(); }}>
            <div className="type-icon">
              <Building2 className="h-8 w-8" />
            </div>
            <h3>Apartments</h3>
            <p>{properties.filter(p => p.type === 'Apartment').length} Properties</p>
          </div>
          <div className="type-card" onClick={() => { setSelectedType('Condo'); handleViewAllClick(); }}>
            <div className="type-icon">
              <Building2 className="h-8 w-8" />
            </div>
            <h3>Condos</h3>
            <p>{properties.filter(p => p.type === 'Condo').length} Properties</p>
          </div>
          <div className="type-card" onClick={() => { setSelectedType('Commercial'); handleViewAllClick(); }}>
            <div className="type-icon">
              <Building2 className="h-8 w-8" />
            </div>
            <h3>Commercial</h3>
            <p>{properties.filter(p => p.type === 'Commercial').length} Properties</p>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="featured-properties-section" id="properties">
        <div className="section-header">
          <h2 className="section-title">Featured Properties</h2>
          <p className="section-description">Handpicked properties just for you</p>
        </div>
        <div className="properties-grid">
          {featuredProperties.map(property => (
            <div 
              key={property.id} 
              className="property-card"
              onClick={() => handlePropertyClick(property.slug)}
            >
              <div className="property-image">
                <img src={property.mainImage} alt={property.title} />
                <div className="property-badge">{property.status}</div>
                <button className="favorite-btn">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
              <div className="property-content">
                <div className="property-price">{formatPrice(property)}</div>
                <h3 className="property-title">{property.title}</h3>
                <div className="property-location">
                  <MapPin className="h-4 w-4" />
                  <span>{property.city}, {property.state}</span>
                </div>
                <div className="property-features">
                  {property.bedrooms && (
                    <div className="feature-item">
                      <Bed className="h-4 w-4" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                  )}
                  <div className="feature-item">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="feature-item">
                    <Maximize className="h-4 w-4" />
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="section-footer">
          <button className="btn-primary" onClick={handleViewAllClick}>
            View All Properties
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose PrimeRealty</h2>
          <p className="section-description">Your trusted partner in real estate</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Search className="h-6 w-6" />
            </div>
            <h3>Advanced Search</h3>
            <p>Find exactly what you're looking for with our powerful search and filter tools</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <MapPin className="h-6 w-6" />
            </div>
            <h3>Prime Locations</h3>
            <p>Access properties in the most desirable neighborhoods and growing areas</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Users className="h-6 w-6" />
            </div>
            <h3>Expert Agents</h3>
            <p>Work with experienced professionals who understand your needs</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <DollarSign className="h-6 w-6" />
            </div>
            <h3>Best Prices</h3>
            <p>Competitive pricing and great deals on quality properties</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3>Market Insights</h3>
            <p>Stay informed with the latest market trends and investment opportunities</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Award className="h-6 w-6" />
            </div>
            <h3>Trusted Service</h3>
            <p>15+ years of excellence in real estate services</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Find Your Dream Home?</h2>
          <p className="cta-description">
            Let our expert team help you find the perfect property
          </p>
          <div className="cta-actions">
            <button className="btn-primary btn-large" onClick={handleViewAllClick}>
              Browse Properties
            </button>
            <button className="btn-secondary btn-large">
              <Phone className="h-5 w-5" />
              Contact an Agent
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="real-estate-footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <Home className="h-6 w-6" />
              <span>PrimeRealty</span>
            </div>
            <p>Your trusted partner in finding the perfect property</p>
            <div className="footer-contact">
              <div className="contact-item">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <Mail className="h-4 w-4" />
                <span>info@primerealty.com</span>
              </div>
            </div>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#properties">Properties</a>
            <a href="#agents">Agents</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-section">
            <h4>Property Types</h4>
            <a href="#houses">Houses</a>
            <a href="#apartments">Apartments</a>
            <a href="#condos">Condos</a>
            <a href="#commercial">Commercial</a>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <a href="#mortgage">Mortgage Calculator</a>
            <a href="#guides">Buying Guides</a>
            <a href="#blog">Blog</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 PrimeRealty. All rights reserved.</p>
          <div className="footer-badges">
            <span className="badge">⭐ 4.9/5 Rating</span>
            <span className="badge">✓ Verified Listings</span>
            <span className="badge">🔒 Secure</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RealEstateHome;
