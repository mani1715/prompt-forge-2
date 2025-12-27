import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Github, Calendar, Tag as TagIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import './portfolio-components.css';

const QuickViewModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !project) return null;

  const images = project.images || [project.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true"></div>

      {/* Modal */}
      <div className="quick-view-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Modal Content */}
        <div className="modal-content">
          {/* Image Carousel */}
          <div className="modal-image-section">
            <img
              src={images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="modal-image"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="carousel-btn carousel-prev"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="carousel-btn carousel-next"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image Indicators */}
                <div className="carousel-indicators">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`indicator ${idx === currentImageIndex ? 'active' : ''}`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Project Details */}
          <div className="modal-details">
            <div className="modal-header">
              <span className="modal-category">{project.category}</span>
              <h2 id="modal-title" className="modal-title">{project.title}</h2>
            </div>

            <p className="modal-description">
              {project.longDesc || project.description}
            </p>

            {/* Key Metrics */}
            {project.metrics && (
              <div className="modal-metrics">
                {project.metrics.users && (
                  <div className="metric-item">
                    <span className="metric-value">{project.metrics.users}</span>
                    <span className="metric-label">Active Users</span>
                  </div>
                )}
                {project.metrics.increase && (
                  <div className="metric-item">
                    <span className="metric-value">{project.metrics.increase}</span>
                    <span className="metric-label">Performance Boost</span>
                  </div>
                )}
                {project.metrics.revenue && (
                  <div className="metric-item">
                    <span className="metric-value">{project.metrics.revenue}</span>
                    <span className="metric-label">Revenue Growth</span>
                  </div>
                )}
              </div>
            )}

            {/* Tech Stack */}
            <div className="modal-tech">
              <h4 className="modal-tech-title">Technologies Used</h4>
              <div className="modal-tech-tags">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="modal-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="modal-info">
              {project.date && (
                <div className="modal-info-item">
                  <Calendar className="h-4 w-4" />
                  <span>{project.date}</span>
                </div>
              )}
              {project.clientName && (
                <div className="modal-info-item">
                  <TagIcon className="h-4 w-4" />
                  <span>Client: {project.clientName}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="modal-actions">
              <Link to={`/portfolio/${project.slug || project.id}`} className="modal-action-link">
                <Button className="modal-btn modal-btn-primary">
                  View Full Case Study
                </Button>
              </Link>
              <div className="modal-external-links">
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="modal-btn">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="modal-btn">
                      <Github className="h-4 w-4 mr-2" />
                      Source Code
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickViewModal;
