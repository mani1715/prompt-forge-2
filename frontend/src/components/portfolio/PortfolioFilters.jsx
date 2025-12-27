import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import './portfolio-components.css';

const PortfolioFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalProjects,
  filteredCount
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'featured', label: 'Featured' },
    { value: 'popular', label: 'Most Popular' }
  ];

  return (
    <div className="portfolio-filters-section" data-admin-editable="portfolio-filters">
      {/* Filter Summary */}
      <div className="filters-summary">
        <h2 className="filters-title">Explore Projects</h2>
        <p className="filters-count">
          Showing <strong>{filteredCount}</strong> of <strong>{totalProjects}</strong> projects
        </p>
      </div>

      {/* Search Bar */}
      <div className="filters-search-bar">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search by project name or technology..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
            aria-label="Search projects"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="sort-wrapper">
          <SlidersHorizontal className="sort-icon" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select"
            aria-label="Sort projects"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="filters-categories" data-admin-editable="filter-categories">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`filter-category-btn ${
              selectedCategory === category ? 'active' : ''
            }`}
            variant="outline"
            aria-pressed={selectedCategory === category}
            aria-label={`Filter by ${category}`}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PortfolioFilters;
