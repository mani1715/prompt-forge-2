import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Star, Clock, Filter, Search, ArrowRight, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { courses, categories } from '../../data/lmsData';
import './lms.css';

const LmsCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  // Filter courses
  let filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.categoryId === parseInt(selectedCategory);
    const matchesLevel = selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  // Sort courses
  if (sortBy === 'popular') {
    filteredCourses.sort((a, b) => b.students - a.students);
  } else if (sortBy === 'rating') {
    filteredCourses.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'price-low') {
    filteredCourses.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredCourses.sort((a, b) => b.price - a.price);
  }

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSearchQuery('');
    setSortBy('popular');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedLevel !== 'all' || searchQuery !== '';

  return (
    <div className="lms-page">
      {/* Navigation */}
      <nav className="lms-nav">
        <div className="lms-nav-container">
          <Link to="/demo/lms" className="lms-logo">
            <BookOpen className="h-8 w-8" />
            <span className="lms-logo-text">EduLearn</span>
          </Link>
          
          <div className="lms-nav-links">
            <Link to="/demo/lms" className="lms-nav-link">Home</Link>
            <Link to="/demo/lms/courses" className="lms-nav-link active">Courses</Link>
            <Link to="#" className="lms-nav-link">Instructors</Link>
            <Link to="#" className="lms-nav-link">About</Link>
          </div>

          <div className="lms-nav-actions">
            <Button variant="ghost" className="lms-nav-btn">Sign In</Button>
            <Button className="lms-nav-btn-primary">Sign Up</Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="lms-courses-header">
        <div className="lms-container">
          <h1 className="lms-courses-title">Explore Our Courses</h1>
          <p className="lms-courses-subtitle">
            {filteredCourses.length} courses available to help you achieve your goals
          </p>
        </div>
      </div>

      <div className="lms-container">
        <div className="lms-courses-layout">
          {/* Sidebar Filters */}
          <aside className={`lms-sidebar ${showFilters ? 'lms-sidebar-mobile-open' : ''}`}>
            <div className="lms-sidebar-header">
              <div className="lms-sidebar-title">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </div>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="lms-clear-filters">
                  Clear All
                </button>
              )}
              <button 
                className="lms-sidebar-close"
                onClick={() => setShowFilters(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Search */}
            <div className="lms-filter-group">
              <label className="lms-filter-label">Search</label>
              <div className="lms-search-filter">
                <Search className="lms-search-filter-icon" />
                <input 
                  type="text"
                  placeholder="Search courses..."
                  className="lms-search-filter-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lms-filter-group">
              <label className="lms-filter-label">Category</label>
              <div className="lms-filter-options">
                <label className="lms-filter-option">
                  <input 
                    type="radio" 
                    name="category" 
                    value="all"
                    checked={selectedCategory === 'all'}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span>All Categories</span>
                </label>
                {categories.map(category => (
                  <label key={category.id} className="lms-filter-option">
                    <input 
                      type="radio" 
                      name="category" 
                      value={category.id}
                      checked={selectedCategory === String(category.id)}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    <span>{category.name}</span>
                    <span className="lms-filter-count">
                      ({courses.filter(c => c.categoryId === category.id).length})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div className="lms-filter-group">
              <label className="lms-filter-label">Level</label>
              <div className="lms-filter-options">
                <label className="lms-filter-option">
                  <input 
                    type="radio" 
                    name="level" 
                    value="all"
                    checked={selectedLevel === 'all'}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  />
                  <span>All Levels</span>
                </label>
                <label className="lms-filter-option">
                  <input 
                    type="radio" 
                    name="level" 
                    value="beginner"
                    checked={selectedLevel === 'beginner'}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  />
                  <span>Beginner</span>
                </label>
                <label className="lms-filter-option">
                  <input 
                    type="radio" 
                    name="level" 
                    value="intermediate"
                    checked={selectedLevel === 'intermediate'}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  />
                  <span>Intermediate</span>
                </label>
                <label className="lms-filter-option">
                  <input 
                    type="radio" 
                    name="level" 
                    value="advanced"
                    checked={selectedLevel === 'advanced'}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  />
                  <span>Advanced</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lms-courses-main">
            {/* Toolbar */}
            <div className="lms-courses-toolbar">
              <button 
                className="lms-filter-toggle"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="h-5 w-5" />
                Filters
              </button>

              <div className="lms-sort-container">
                <label htmlFor="sort" className="lms-sort-label">Sort by:</label>
                <select 
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="lms-sort-select"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="lms-active-filters">
                <span className="lms-active-filters-label">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <button 
                    className="lms-active-filter-tag"
                    onClick={() => setSelectedCategory('all')}
                  >
                    {categories.find(c => c.id === parseInt(selectedCategory))?.name}
                    <X className="h-3 w-3" />
                  </button>
                )}
                {selectedLevel !== 'all' && (
                  <button 
                    className="lms-active-filter-tag"
                    onClick={() => setSelectedLevel('all')}
                  >
                    {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}
                    <X className="h-3 w-3" />
                  </button>
                )}
                {searchQuery && (
                  <button 
                    className="lms-active-filter-tag"
                    onClick={() => setSearchQuery('')}
                  >
                    Search: "{searchQuery}"
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}

            {/* Courses Grid */}
            {filteredCourses.length > 0 ? (
              <div className="lms-courses-grid">
                {filteredCourses.map((course) => (
                  <Link 
                    key={course.id} 
                    to={`/demo/lms/course/${course.slug}`}
                    className="lms-course-card"
                    data-testid={`course-card-${course.id}`}
                  >
                    <div className="lms-course-image-wrapper">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="lms-course-image"
                        loading="lazy"
                      />
                      {course.bestseller && (
                        <div className="lms-course-badge">Bestseller</div>
                      )}
                      {course.new && (
                        <div className="lms-course-badge lms-badge-new">New</div>
                      )}
                    </div>

                    <div className="lms-course-content">
                      <div className="lms-course-meta">
                        <span className="lms-course-category">{course.category}</span>
                        <span className="lms-course-level">{course.level}</span>
                      </div>

                      <h3 className="lms-course-title">{course.title}</h3>
                      
                      <p className="lms-course-instructor">
                        <Users className="h-4 w-4" />
                        {course.instructor}
                      </p>

                      <div className="lms-course-stats">
                        <div className="lms-course-rating">
                          <Star className="lms-star-icon" fill="currentColor" />
                          <span className="lms-rating-value">{course.rating}</span>
                          <span className="lms-rating-count">({course.reviews})</span>
                        </div>
                        <div className="lms-course-students">
                          <Users className="h-4 w-4" />
                          {course.students.toLocaleString()}
                        </div>
                      </div>

                      <div className="lms-course-footer">
                        <div className="lms-course-duration">
                          <Clock className="h-4 w-4" />
                          {course.duration}
                        </div>
                        <div className="lms-course-price">
                          {course.discount > 0 && (
                            <span className="lms-price-original">${course.originalPrice}</span>
                          )}
                          <span className="lms-price-current">${course.price}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="lms-no-results">
                <BookOpen className="lms-no-results-icon" />
                <h3 className="lms-no-results-title">No courses found</h3>
                <p className="lms-no-results-text">
                  Try adjusting your filters or search query
                </p>
                <Button onClick={clearFilters} className="lms-no-results-btn">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="lms-footer">
        <div className="lms-container">
          <div className="lms-footer-bottom">
            <p>&copy; 2025 EduLearn. All rights reserved.</p>
            <div className="lms-footer-back">
              <Link to="/portfolio/educational-lms-platform" className="lms-back-link">
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to Portfolio
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LmsCourses;