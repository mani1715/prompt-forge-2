import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Star } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import './portfolio-components.css';

const ProjectCard = ({ project }) => {
  return (
    <Card className="project-card-premium" data-admin-editable={`project-${project.id}`}>
      {/* Featured Badge */}
      {project.featured && (
        <div className="project-featured-badge" data-admin-editable={`project-featured-${project.id}`}>
          <Star className="h-3 w-3" fill="currentColor" />
          <span>Featured</span>
        </div>
      )}

      {/* Project Image */}
      <div className="project-card-image-wrapper">
        <img 
          src={project.image} 
          alt={project.title}
          className="project-card-image"
          loading="lazy"
          data-admin-editable={`project-image-${project.id}`}
        />
        
        {/* Hover Overlay */}
        <div className="project-card-overlay">
          <div className="project-overlay-buttons">
            <Link to={`/portfolio/${project.slug || project.id}`}>
              <Button className="project-overlay-btn btn-view">
                <span>View Case Study</span>
              </Button>
            </Link>
            {(project.liveUrl || project.liveLink) && (
              <a href={project.liveUrl || project.liveLink} target="_blank" rel="noopener noreferrer">
                <Button className="project-overlay-btn btn-demo">
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Demo</span>
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Category Badge */}
        <div className="project-category-badge" data-admin-editable={`project-category-${project.id}`}>
          {project.category}
        </div>
      </div>

      {/* Project Info */}
      <div className="project-card-content">
        <h3 className="project-card-title" data-admin-editable={`project-title-${project.id}`}>
          {project.title}
        </h3>
        
        <p className="project-card-description" data-admin-editable={`project-desc-${project.id}`}>
          {project.shortDesc || project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="project-tech-tags" data-admin-editable={`project-tech-${project.id}`}>
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="tech-tag">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="tech-tag tech-tag-more">+{project.technologies.length - 4}</span>
          )}
        </div>

        {/* Footer with Links */}
        <div className="project-card-footer">
          <Link to={`/portfolio/${project.slug || project.id}`} className="project-read-more">
            View Details →
          </Link>
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-github-link">
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* Card Gradient Effect */}
      <div className="project-card-gradient"></div>
    </Card>
  );
};

export default ProjectCard;
