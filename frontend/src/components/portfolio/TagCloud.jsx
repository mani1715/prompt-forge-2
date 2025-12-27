import React from 'react';
import { Code } from 'lucide-react';
import './portfolio-components.css';

const TagCloud = ({ tags, onTagClick, selectedTags = [] }) => {
  // Calculate tag frequency (for sizing)
  const getTagSize = (count) => {
    if (count >= 4) return 'tag-large';
    if (count >= 2) return 'tag-medium';
    return 'tag-small';
  };

  return (
    <div className="tag-cloud-section" data-admin-editable="tag-cloud">
      <div className="tag-cloud-header">
        <Code className="tag-cloud-icon" />
        <h3 className="tag-cloud-title">Popular Technologies</h3>
      </div>
      <p className="tag-cloud-subtitle">Click on a technology to filter projects</p>
      
      <div className="tag-cloud-container">
        {tags.map((tag) => (
          <button
            key={tag.name}
            onClick={() => onTagClick(tag.name)}
            className={`tag-cloud-item ${getTagSize(tag.count)} ${
              selectedTags.includes(tag.name) ? 'tag-selected' : ''
            }`}
            aria-pressed={selectedTags.includes(tag.name)}
            aria-label={`Filter by ${tag.name}`}
          >
            {tag.name}
            <span className="tag-count">({tag.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
