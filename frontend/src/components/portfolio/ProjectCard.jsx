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
    project.live_demo_url || project.liveUrl;

  const github =
    project.github_url || project.githubLink;

  return (
    <Card className="project-card-premium">
      {project.featured && (
        <div className="project-featured-badge">
          <Star size={14} fill="currentColor" />
          Featured
        </div>
      )}

      <div className="project-card-image-wrapper">
        <img
          src={image}
          alt={project.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-project.jpg';
          }}
        />

        <div className="project-card-overlay">
          <Link to={`/portfolio/${project.slug || project.id}`}>
            <Button>View Details</Button>
          </Link>

          {liveDemo && (
            <a href={liveDemo} target="_blank" rel="noreferrer">
              <Button>
                <ExternalLink size={16} />
                Live Demo
              </Button>
            </a>
          )}
        </div>
      </div>

      <div className="project-card-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="project-tech-tags">
          {technologies.map((tech, i) => (
            <span key={i} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        {github && (
          <a href={github} target="_blank" rel="noreferrer">
            <Github size={18} />
          </a>
        )}
      </div>
    </Card>
  );
};

export default ProjectCard;
