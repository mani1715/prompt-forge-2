import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Star } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import './portfolio-components.css';

const ProjectCard = ({ project }) => {
  if (!project) return null;

  const image =
    project.image_url || project.image || '/placeholder-project.jpg';

  const technologies =
    project.tech_stack || project.technologies || [];

  const liveDemo =
    project.live_demo_url || project.liveUrl || project.liveLink;

  const github =
    project.github_url || project.githubLink;

  return (
    <Card className="project-card-premium">
      {/* Featured */}
      {project.featured && (
        <div className="project-featured-badge">
          <Star className="h-3 w-3" fill="currentColor" />
          <span>Featured</span>
        </div>
      )}

      {/* Image */}
      <div className="project-card-image-wrapper">
        <img
          src={image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          width="400"
          height="260"
          className="project-card-image"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-project.jpg';
          }}
        />

        {/* Overlay */}
        <div className="project-card-overlay">
          <div className="project-overlay-buttons">
            <Link to={`/portfolio/${project.slug || project.id}`}>
              <Button className="project-overlay-btn btn-view">
                View Case Study
              </Button>
            </Link>

            {liveDemo && (
              <a
                href={liveDemo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="project-overlay-btn btn-demo">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              </a>
            )}
          </div>
        </div>

        <div className="project-category-badge">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="project-card-content">
        <h3 className="project-card-title">
          {project.title}
        </h3>

        <p className="project-card-description">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="project-tech-tags">
          {technologies.slice(0, 4).map((tech, i) => (
            <span key={i} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-card-footer">
          <Link
            to={`/portfolio/${project.slug || project.id}`}
            className="project-read-more"
          >
            View Details →
          </Link>

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-github-link"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <div className="project-card-gradient" />
    </Card>
  );
};

export default ProjectCard;
