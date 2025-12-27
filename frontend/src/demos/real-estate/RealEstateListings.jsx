import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Home, Filter, MapPin, Bed, Bath, 
  Maximize, Heart, SlidersHorizontal, Grid3x3, List
} from 'lucide-react';
import { properties, propertyTypes } from '../../data/realEstateData';
import './real-estate.css';

const RealEstateListings = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState('all');
  const [bedrooms, setBedrooms] = useState('any');
  const [bathrooms, setBathrooms] = useState('any');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(true);

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    let filtered = properties.filter(property => {
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
      
      const matchesBathrooms = bathrooms === 'any' ||
                               (bathrooms === '1' && property.bathrooms >= 1 && property.bathrooms < 2) ||
                               (bathrooms === '2' && property.bathrooms >= 2 && property.bathrooms < 3) ||
                               (bathrooms === '3+' && property.bathrooms >= 3);
      
      return matchesSearch && matchesType && matchesPrice && matchesBedrooms && matchesBathrooms;
    });

    // Sort properties
    if (sortBy === 'featured') {
      filtered.sort((a, b) => b.featured - a.featured);
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => b.yearBuilt - a.yearBuilt);
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.views - a.views);
    }

    return filtered;
  }, [searchTerm, selectedType, priceRange, bedrooms, bathrooms, sortBy]);

  const formatPrice = (property) => {
    if (property.status === 'For Rent' || property.status === 'For Lease') {
      return `$${property.price.toLocaleString()}${property.priceType || '/month'}`;
    }
    return `$${property.price.toLocaleString()}`;
  };

  const handlePropertyClick = (slug) => {
    navigate(`/demo/real-estate/property/${slug}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setPriceRange('all');
    setBedrooms('any');
    setBathrooms('any');
  };

  return (
    <div className="real-estate-container">
      {/* Navigation */}
      <nav className="real-estate-nav">
        <div className="nav-content">
          <Link to="/demo/real-estate" className="back-link">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="nav-brand">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="brand-name">PrimeRealty</span>
          </div>
          <button className="nav-cta-btn">List Property</button>
        </div>
      </nav>

      <div className="listings-container">
        {/* Filters Sidebar */}
        <aside className={`filters-sidebar ${showFilters ? 'show' : 'hide'}`}>
          <div className="filters-header">
            <h3>
              <Filter className="h-5 w-5" />
              Filters
            </h3>
            <button onClick={clearFilters} className="clear-filters-btn">Clear All</button>
          </div>

          <div className="filter-group">
            <label className="filter-label">Search</label>
            <div className="search-input-wrapper">
              <Search className="search-icon-small" />
              <input
                type="text"
                placeholder="Location, property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input"
              />
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Property Type</label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Price Range</label>
            <select 
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Prices</option>
              <option value="under500k">Under $500K</option>
              <option value="500k-1m">$500K - $1M</option>
              <option value="1m-2m">$1M - $2M</option>
              <option value="2m+">$2M+</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Bedrooms</label>
            <select 
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="filter-select"
            >
              <option value="any">Any</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4+">4+ Bedrooms</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Bathrooms</label>
            <select 
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="filter-select"
            >
              <option value="any">Any</option>
              <option value="1">1+ Bathroom</option>
              <option value="2">2+ Bathrooms</option>
              <option value="3+">3+ Bathrooms</option>
            </select>
          </div>
        </aside>

        {/* Main Content */}
        <main className="listings-main">
          {/* Toolbar */}
          <div className="listings-toolbar">
            <button 
              className="toggle-filters-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-5 w-5" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>

            <div className="toolbar-info">
              <span className="results-count">
                {filteredAndSortedProperties.length} Properties Found
              </span>
            </div>

            <div className="toolbar-actions">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
              </select>

              <div className="view-mode-toggle">
                <button 
                  className={viewMode === 'grid' ? 'active' : ''}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-5 w-5" />
                </button>
                <button 
                  className={viewMode === 'list' ? 'active' : ''}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Properties Grid/List */}
          {filteredAndSortedProperties.length === 0 ? (
            <div className="no-results">
              <Search className="h-16 w-16" />
              <h3>No Properties Found</h3>
              <p>Try adjusting your filters or search criteria</p>
              <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
            </div>
          ) : (
            <div className={`properties-${viewMode}`}>
              {filteredAndSortedProperties.map(property => (
                <div 
                  key={property.id} 
                  className={`property-card ${viewMode}`}
                  onClick={() => handlePropertyClick(property.slug)}
                >
                  <div className="property-image">
                    <img src={property.mainImage} alt={property.title} />
                    <div className="property-badge">{property.status}</div>
                    {property.featured && <div className="featured-badge">Featured</div>}
                    <button className="favorite-btn" onClick={(e) => e.stopPropagation()}>
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="property-content">
                    <div className="property-price">{formatPrice(property)}</div>
                    <h3 className="property-title">{property.title}</h3>
                    <div className="property-location">
                      <MapPin className="h-4 w-4" />
                      <span>{property.address}, {property.city}, {property.state}</span>
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
                    {viewMode === 'list' && (
                      <p className="property-description-preview">{property.description.substring(0, 150)}...</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RealEstateListings;