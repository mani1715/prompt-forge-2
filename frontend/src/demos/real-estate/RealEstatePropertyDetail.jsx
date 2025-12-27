import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Home, MapPin, Bed, Bath, Maximize, Calendar, 
  Heart, Share2, Mail, Phone, ChevronLeft, ChevronRight,
  Check, DollarSign, Calculator
} from 'lucide-react';
import { properties } from '../../data/realEstateData';
import './real-estate.css';

const RealEstatePropertyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.slug === slug);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showMortgageCalc, setShowMortgageCalc] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [mortgageData, setMortgageData] = useState({
    downPayment: 20,
    interestRate: 6.5,
    loanTerm: 30
  });

  if (!property) {
    return (
      <div className="real-estate-container">
        <div className="error-container">
          <h1>Property Not Found</h1>
          <Link to="/demo/real-estate" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  const formatPrice = (property) => {
    if (property.status === 'For Rent' || property.status === 'For Lease') {
      return `$${property.price.toLocaleString()}${property.priceType || '/month'}`;
    }
    return `$${property.price.toLocaleString()}`;
  };

  const calculateMortgage = () => {
    const price = property.price;
    const down = (price * mortgageData.downPayment) / 100;
    const loanAmount = price - down;
    const monthlyRate = mortgageData.interestRate / 100 / 12;
    const numPayments = mortgageData.loanTerm * 12;
    
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                           (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      downPayment: down.toFixed(2),
      loanAmount: loanAmount.toFixed(2)
    };
  };

  const mortgage = property.status === 'For Sale' ? calculateMortgage() : null;

  const similarProperties = properties
    .filter(p => p.id !== property.id && p.type === property.type && p.city === property.city)
    .slice(0, 3);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleSubmitContact = (e) => {
    e.preventDefault();
    alert('Thank you! An agent will contact you soon.');
    setShowContactForm(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="real-estate-container">
      {/* Navigation */}
      <nav className="real-estate-nav">
        <div className="nav-content">
          <Link to="/demo/real-estate/listings" className="back-link">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Listings</span>
          </Link>
          <div className="nav-brand">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="brand-name">PrimeRealty</span>
          </div>
          <button className="nav-cta-btn">List Property</button>
        </div>
      </nav>

      <div className="property-detail-container">
        {/* Image Gallery */}
        <section className="property-gallery">
          <div className="main-image-container">
            <img src={property.images[currentImageIndex]} alt={property.title} className="main-image" />
            {property.images.length > 1 && (
              <>
                <button className="gallery-nav prev" onClick={prevImage}>
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button className="gallery-nav next" onClick={nextImage}>
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            <div className="gallery-actions">
              <button className="action-btn">
                <Heart className="h-5 w-5" />
                Save
              </button>
              <button className="action-btn">
                <Share2 className="h-5 w-5" />
                Share
              </button>
            </div>
          </div>
          <div className="thumbnail-gallery">
            {property.images.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`${property.title} ${index + 1}`}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </section>

        <div className="property-detail-content">
          {/* Property Info */}
          <div className="property-main-info">
            <div className="property-header">
              <div>
                <div className="property-badge-inline">{property.status}</div>
                <h1 className="property-detail-title">{property.title}</h1>
                <div className="property-location-large">
                  <MapPin className="h-5 w-5" />
                  <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
                </div>
              </div>
              <div className="property-price-large">{formatPrice(property)}</div>
            </div>

            <div className="property-stats-grid">
              {property.bedrooms && (
                <div className="stat-box">
                  <Bed className="stat-icon" />
                  <div className="stat-info">
                    <div className="stat-value">{property.bedrooms}</div>
                    <div className="stat-label">Bedrooms</div>
                  </div>
                </div>
              )}
              <div className="stat-box">
                <Bath className="stat-icon" />
                <div className="stat-info">
                  <div className="stat-value">{property.bathrooms}</div>
                  <div className="stat-label">Bathrooms</div>
                </div>
              </div>
              <div className="stat-box">
                <Maximize className="stat-icon" />
                <div className="stat-info">
                  <div className="stat-value">{property.sqft}</div>
                  <div className="stat-label">Sq Ft</div>
                </div>
              </div>
              <div className="stat-box">
                <Calendar className="stat-icon" />
                <div className="stat-info">
                  <div className="stat-value">{property.yearBuilt}</div>
                  <div className="stat-label">Year Built</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="property-section">
              <h2>About This Property</h2>
              <p className="property-description">{property.description}</p>
            </div>

            {/* Features */}
            <div className="property-section">
              <h2>Property Features</h2>
              <div className="features-list">
                {property.features.map((feature, index) => (
                  <div key={index} className="feature-item-check">
                    <Check className="h-5 w-5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="property-section">
              <h2>Property Details</h2>
              <div className="details-grid">
                <div className="detail-row">
                  <span className="detail-label">Property Type:</span>
                  <span className="detail-value">{property.type}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">{property.status}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Year Built:</span>
                  <span className="detail-value">{property.yearBuilt}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Lot Size:</span>
                  <span className="detail-value">{property.lotSize}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Price per Sq Ft:</span>
                  <span className="detail-value">${(property.price / property.sqft).toFixed(2)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Views:</span>
                  <span className="detail-value">{property.views}</span>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="property-section">
              <h2>Location</h2>
              <div className="map-placeholder">
                <MapPin className="h-16 w-16" />
                <p>{property.address}</p>
                <p>{property.city}, {property.state} {property.zipCode}</p>
                <p className="map-note">Interactive map would be integrated here (Mapbox/Google Maps)</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="property-sidebar">
            {/* Agent Card */}
            <div className="agent-card">
              <h3>Contact Agent</h3>
              <div className="agent-profile">
                <img src={property.agent.image} alt={property.agent.name} className="agent-image" />
                <div>
                  <div className="agent-name">{property.agent.name}</div>
                  <div className="agent-title">Licensed Real Estate Agent</div>
                </div>
              </div>
              <div className="agent-contact">
                <a href={`tel:${property.agent.phone}`} className="contact-btn">
                  <Phone className="h-5 w-5" />
                  {property.agent.phone}
                </a>
                <a href={`mailto:${property.agent.email}`} className="contact-btn">
                  <Mail className="h-5 w-5" />
                  {property.agent.email}
                </a>
              </div>
              <button 
                className="btn-primary btn-block"
                onClick={() => setShowContactForm(!showContactForm)}
              >
                <Mail className="h-5 w-5" />
                Request Information
              </button>
            </div>

            {/* Contact Form */}
            {showContactForm && (
              <div className="contact-form-card">
                <h3>Send Message</h3>
                <form onSubmit={handleSubmitContact}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="form-input"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="form-input"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="form-input"
                  />
                  <textarea
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    className="form-textarea"
                    rows="4"
                  ></textarea>
                  <button type="submit" className="btn-primary btn-block">Send Message</button>
                </form>
              </div>
            )}

            {/* Mortgage Calculator */}
            {property.status === 'For Sale' && (
              <div className="mortgage-card">
                <h3>
                  <Calculator className="h-5 w-5" />
                  Mortgage Calculator
                </h3>
                <div className="mortgage-input-group">
                  <label>Down Payment (%)</label>
                  <input
                    type="number"
                    value={mortgageData.downPayment}
                    onChange={(e) => setMortgageData({...mortgageData, downPayment: parseFloat(e.target.value)})}
                    min="0"
                    max="100"
                    className="form-input"
                  />
                </div>
                <div className="mortgage-input-group">
                  <label>Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={mortgageData.interestRate}
                    onChange={(e) => setMortgageData({...mortgageData, interestRate: parseFloat(e.target.value)})}
                    min="0"
                    max="20"
                    className="form-input"
                  />
                </div>
                <div className="mortgage-input-group">
                  <label>Loan Term (years)</label>
                  <select
                    value={mortgageData.loanTerm}
                    onChange={(e) => setMortgageData({...mortgageData, loanTerm: parseInt(e.target.value)})}
                    className="form-select"
                  >
                    <option value="15">15 years</option>
                    <option value="20">20 years</option>
                    <option value="30">30 years</option>
                  </select>
                </div>
                <div className="mortgage-results">
                  <div className="mortgage-result-item">
                    <span>Monthly Payment</span>
                    <strong>${parseFloat(mortgage.monthlyPayment).toLocaleString()}</strong>
                  </div>
                  <div className="mortgage-result-item">
                    <span>Down Payment</span>
                    <strong>${parseFloat(mortgage.downPayment).toLocaleString()}</strong>
                  </div>
                  <div className="mortgage-result-item">
                    <span>Loan Amount</span>
                    <strong>${parseFloat(mortgage.loanAmount).toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <section className="similar-properties-section">
            <h2>Similar Properties in {property.city}</h2>
            <div className="properties-grid">
              {similarProperties.map(prop => (
                <div 
                  key={prop.id} 
                  className="property-card"
                  onClick={() => {
                    navigate(`/demo/real-estate/property/${prop.slug}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="property-image">
                    <img src={prop.mainImage} alt={prop.title} />
                    <div className="property-badge">{prop.status}</div>
                  </div>
                  <div className="property-content">
                    <div className="property-price">{formatPrice(prop)}</div>
                    <h3 className="property-title">{prop.title}</h3>
                    <div className="property-location">
                      <MapPin className="h-4 w-4" />
                      <span>{prop.city}, {prop.state}</span>
                    </div>
                    <div className="property-features">
                      {prop.bedrooms && (
                        <div className="feature-item">
                          <Bed className="h-4 w-4" />
                          <span>{prop.bedrooms} Beds</span>
                        </div>
                      )}
                      <div className="feature-item">
                        <Bath className="h-4 w-4" />
                        <span>{prop.bathrooms} Baths</span>
                      </div>
                      <div className="feature-item">
                        <Maximize className="h-4 w-4" />
                        <span>{prop.sqft} sqft</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default RealEstatePropertyDetail;
