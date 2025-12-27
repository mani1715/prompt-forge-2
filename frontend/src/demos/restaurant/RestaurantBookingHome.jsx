import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Users, MapPin, Phone, Mail, Star, Check, ChevronRight, Utensils, Wine, Coffee, Award } from 'lucide-react';
import './restaurant.css';

const RestaurantBookingHome = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    restaurant: null,
    date: '',
    time: '',
    guests: 2,
    tableType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Restaurant Data
  const restaurants = [
    {
      id: 1,
      name: 'The Italian Garden',
      cuisine: 'Italian',
      rating: 4.8,
      reviews: 1250,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      description: 'Authentic Italian cuisine with a modern twist',
      location: '123 Main Street, Downtown',
      phone: '+1 (555) 123-4567',
      email: 'info@italiangarden.com',
      features: ['Outdoor Seating', 'Wine Bar', 'Private Dining', 'Live Music'],
      tables: [
        { type: '2-seater', available: 5, price: null },
        { type: '4-seater', available: 8, price: null },
        { type: '6-seater', available: 3, price: null },
        { type: 'Private Room', available: 1, price: null }
      ]
    },
    {
      id: 2,
      name: 'Sakura Sushi Bar',
      cuisine: 'Japanese',
      rating: 4.9,
      reviews: 980,
      image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&h=600&fit=crop',
      description: 'Premium sushi and Japanese fine dining',
      location: '456 Oak Avenue, Midtown',
      phone: '+1 (555) 234-5678',
      email: 'reservations@sakurasushi.com',
      features: ['Sushi Bar', 'Chef\'s Table', 'Sake Pairing', 'Omakase'],
      tables: [
        { type: '2-seater', available: 6, price: null },
        { type: '4-seater', available: 4, price: null },
        { type: 'Sushi Bar', available: 8, price: null },
        { type: 'Chef\'s Table', available: 1, price: null }
      ]
    },
    {
      id: 3,
      name: 'The Steakhouse Prime',
      cuisine: 'Steakhouse',
      rating: 4.7,
      reviews: 1450,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
      description: 'Premium aged steaks and classic cocktails',
      location: '789 Broadway, Financial District',
      phone: '+1 (555) 345-6789',
      email: 'book@steakhouseprime.com',
      features: ['Dry-Aged Steaks', 'Wine Cellar', 'Cigar Lounge', 'Valet Parking'],
      tables: [
        { type: '2-seater', available: 4, price: null },
        { type: '4-seater', available: 10, price: null },
        { type: '6-seater', available: 5, price: null },
        { type: 'Private Dining', available: 2, price: null }
      ]
    }
  ];

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '5:00 PM',
    '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
    '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  const handleRestaurantSelect = (restaurant) => {
    setBookingData({ ...bookingData, restaurant });
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDateTimeSelect = () => {
    if (bookingData.date && bookingData.time) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTableSelect = (tableType) => {
    setBookingData({ ...bookingData, tableType });
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    const id = 'BK' + Date.now().toString().slice(-8);
    setBookingId(id);
    setBookingConfirmed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetBooking = () => {
    setStep(1);
    setBookingData({
      restaurant: null,
      date: '',
      time: '',
      guests: 2,
      tableType: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
    setBookingConfirmed(false);
    setBookingId('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (bookingConfirmed) {
    return (
      <div className="restaurant-container">
        <nav className="restaurant-nav">
          <div className="nav-content">
            <Link to="/portfolio/restaurant-booking-platform" className="back-link">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Case Study</span>
            </Link>
            <div className="nav-title">
              <Utensils className="h-6 w-6 text-orange-600" />
              <span>Restaurant Booking Platform</span>
            </div>
          </div>
        </nav>

        <div className="confirmation-container">
          <div className="confirmation-card">
            <div className="confirmation-icon">
              <Check className="h-16 w-16" />
            </div>
            <h1 className="confirmation-title">Booking Confirmed!</h1>
            <p className="confirmation-subtitle">Your table has been reserved successfully</p>

            <div className="booking-id-card">
              <div className="booking-id-label">Booking ID</div>
              <div className="booking-id-value">{bookingId}</div>
            </div>

            <div className="confirmation-details">
              <h3>Reservation Details</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <Utensils className="detail-icon" />
                  <div>
                    <div className="detail-label">Restaurant</div>
                    <div className="detail-value">{bookingData.restaurant?.name}</div>
                  </div>
                </div>
                <div className="detail-item">
                  <Calendar className="detail-icon" />
                  <div>
                    <div className="detail-label">Date</div>
                    <div className="detail-value">{new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  </div>
                </div>
                <div className="detail-item">
                  <Clock className="detail-icon" />
                  <div>
                    <div className="detail-label">Time</div>
                    <div className="detail-value">{bookingData.time}</div>
                  </div>
                </div>
                <div className="detail-item">
                  <Users className="detail-icon" />
                  <div>
                    <div className="detail-label">Guests</div>
                    <div className="detail-value">{bookingData.guests} {bookingData.guests === 1 ? 'Guest' : 'Guests'}</div>
                  </div>
                </div>
                <div className="detail-item">
                  <MapPin className="detail-icon" />
                  <div>
                    <div className="detail-label">Table Type</div>
                    <div className="detail-value">{bookingData.tableType}</div>
                  </div>
                </div>
              </div>

              <div className="contact-info">
                <h4>Contact Information</h4>
                <p><strong>Name:</strong> {bookingData.firstName} {bookingData.lastName}</p>
                <p><strong>Email:</strong> {bookingData.email}</p>
                <p><strong>Phone:</strong> {bookingData.phone}</p>
                {bookingData.specialRequests && (
                  <p><strong>Special Requests:</strong> {bookingData.specialRequests}</p>
                )}
              </div>
            </div>

            <div className="confirmation-message">
              <p>A confirmation email has been sent to <strong>{bookingData.email}</strong></p>
              <p>We look forward to serving you at {bookingData.restaurant?.name}!</p>
            </div>

            <button onClick={resetBooking} className="btn btn-primary btn-large">
              Make Another Reservation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-container">
      {/* Navigation */}
      <nav className="restaurant-nav">
        <div className="nav-content">
          <Link to="/portfolio/restaurant-booking-platform" className="back-link">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Case Study</span>
          </Link>
          <div className="nav-title">
            <Utensils className="h-6 w-6 text-orange-600" />
            <span>Restaurant Booking Platform</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {step === 1 && (
        <section className="restaurant-hero">
          <div className="hero-content">
            <h1 className="hero-title">Reserve Your Perfect Table</h1>
            <p className="hero-description">
              Book a table at the finest restaurants in the city with real-time availability
            </p>
            <div className="hero-features">
              <div className="hero-feature">
                <Clock className="h-6 w-6" />
                <span>Instant Confirmation</span>
              </div>
              <div className="hero-feature">
                <Award className="h-6 w-6" />
                <span>Top-Rated Restaurants</span>
              </div>
              <div className="hero-feature">
                <Check className="h-6 w-6" />
                <span>No Booking Fees</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Progress Steps */}
      {step > 1 && (
        <div className="progress-steps">
          <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Date & Time</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Select Table</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Your Details</div>
          </div>
        </div>
      )}

      <div className="restaurant-content">
        {/* Step 1: Restaurant Selection */}
        {step === 1 && (
          <div className="step-container">
            <h2 className="step-title">Choose Your Restaurant</h2>
            <p className="step-description">Select from our curated collection of premium dining experiences</p>
            
            <div className="restaurants-grid">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="restaurant-card" onClick={() => handleRestaurantSelect(restaurant)}>
                  <div className="restaurant-image">
                    <img src={restaurant.image} alt={restaurant.name} />
                    <div className="restaurant-rating">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{restaurant.rating}</span>
                      <span className="rating-count">({restaurant.reviews})</span>
                    </div>
                  </div>
                  <div className="restaurant-info">
                    <h3 className="restaurant-name">{restaurant.name}</h3>
                    <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                    <p className="restaurant-description">{restaurant.description}</p>
                    <div className="restaurant-location">
                      <MapPin className="h-4 w-4" />
                      <span>{restaurant.location}</span>
                    </div>
                    <div className="restaurant-features">
                      {restaurant.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="feature-badge">{feature}</span>
                      ))}
                    </div>
                    <button className="btn btn-primary btn-block">
                      Book Now
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Selection */}
        {step === 2 && bookingData.restaurant && (
          <div className="step-container">
            <div className="selected-restaurant-banner">
              <img src={bookingData.restaurant.image} alt={bookingData.restaurant.name} />
              <div className="banner-info">
                <h3>{bookingData.restaurant.name}</h3>
                <p>{bookingData.restaurant.cuisine} • {bookingData.restaurant.location}</p>
              </div>
              <button onClick={() => setStep(1)} className="btn btn-ghost">Change</button>
            </div>

            <h2 className="step-title">Select Date & Time</h2>
            
            <div className="datetime-grid">
              <div className="datetime-section">
                <label className="datetime-label">
                  <Calendar className="h-5 w-5" />
                  Select Date
                </label>
                <input
                  type="date"
                  min={getTodayDate()}
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  className="datetime-input"
                />
              </div>

              <div className="datetime-section">
                <label className="datetime-label">
                  <Users className="h-5 w-5" />
                  Number of Guests
                </label>
                <select
                  value={bookingData.guests}
                  onChange={(e) => setBookingData({ ...bookingData, guests: parseInt(e.target.value) })}
                  className="datetime-input"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            {bookingData.date && (
              <div className="timeslots-section">
                <label className="datetime-label">
                  <Clock className="h-5 w-5" />
                  Available Time Slots
                </label>
                <div className="timeslots-grid">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setBookingData({ ...bookingData, time })}
                      className={`timeslot-btn ${bookingData.time === time ? 'selected' : ''}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {bookingData.date && bookingData.time && (
              <button onClick={handleDateTimeSelect} className="btn btn-primary btn-large">
                Continue to Table Selection
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Step 3: Table Selection */}
        {step === 3 && (
          <div className="step-container">
            <h2 className="step-title">Select Your Table</h2>
            <p className="step-description">Choose the perfect seating arrangement for your party</p>
            
            <div className="tables-grid">
              {bookingData.restaurant?.tables.map((table, idx) => (
                <div
                  key={idx}
                  className={`table-card ${bookingData.tableType === table.type ? 'selected' : ''} ${table.available === 0 ? 'unavailable' : ''}`}
                  onClick={() => table.available > 0 && handleTableSelect(table.type)}
                >
                  <div className="table-icon">
                    <Utensils className="h-8 w-8" />
                  </div>
                  <h3 className="table-type">{table.type}</h3>
                  <div className="table-availability">
                    {table.available > 0 ? (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-600">{table.available} Available</span>
                      </>
                    ) : (
                      <span className="text-red-600">Fully Booked</span>
                    )}
                  </div>
                  {bookingData.tableType === table.type && (
                    <div className="selected-badge">
                      <Check className="h-4 w-4" />
                      Selected
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Customer Details */}
        {step === 4 && (
          <div className="step-container">
            <h2 className="step-title">Your Details</h2>
            <p className="step-description">Please provide your contact information to confirm the reservation</p>
            
            <form onSubmit={handleSubmitBooking} className="booking-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    required
                    value={bookingData.firstName}
                    onChange={(e) => setBookingData({ ...bookingData, firstName: e.target.value })}
                    className="form-input"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={bookingData.lastName}
                    onChange={(e) => setBookingData({ ...bookingData, lastName: e.target.value })}
                    className="form-input"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <Mail className="h-4 w-4" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <Phone className="h-4 w-4" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Special Requests (Optional)</label>
                <textarea
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                  className="form-textarea"
                  placeholder="Any dietary restrictions, accessibility needs, or special occasions?"
                  rows="4"
                ></textarea>
              </div>

              <div className="booking-summary">
                <h3>Booking Summary</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-label">Restaurant:</span>
                    <span className="summary-value">{bookingData.restaurant?.name}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Date:</span>
                    <span className="summary-value">{new Date(bookingData.date).toLocaleDateString()}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Time:</span>
                    <span className="summary-value">{bookingData.time}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Guests:</span>
                    <span className="summary-value">{bookingData.guests}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Table:</span>
                    <span className="summary-value">{bookingData.tableType}</span>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-large">
                Confirm Reservation
                <Check className="h-5 w-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantBookingHome;
