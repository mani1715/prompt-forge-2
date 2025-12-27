import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag } from 'lucide-react';
import { projects } from '../data/mock';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const PortfolioItem = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="portfolio-item-page">
        <div className="not-found">
          <h1>Project Not Found</h1>
          <Link to="/portfolio">
            <Button>Back to Portfolio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-item-page">
      {/* Back Button */}
      <div className="back-navigation">
        <Link to="/portfolio">
          <Button variant="ghost" className="back-button">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>
      </div>

      {/* Project Header */}
      <section className="project-header">
        <div className="project-header-content">
          <span className="project-category-badge">{project.category}</span>
          <h1 className="project-page-title">{project.title}</h1>
          <p className="project-page-description">{project.description}</p>
        </div>
      </section>

      {/* Project Image */}
      <section className="project-image-section">
        <img src={project.image} alt={project.title} className="project-main-image" />
      </section>

      {/* Project Details */}
      <section className="project-details-section">
        <div className="project-details-grid">
          <div className="project-main-content">
            <h2 className="detail-section-title">Project Overview</h2>
            <p className="detail-paragraph">
              This project showcases our expertise in {project.category.toLowerCase()}. We built a comprehensive solution that addresses the client's unique requirements while maintaining high standards of quality and performance.
            </p>
            <p className="detail-paragraph">
              The project was developed using modern technologies and best practices, ensuring scalability, maintainability, and optimal user experience across all devices.
            </p>
            
            <h2 className="detail-section-title">Key Features</h2>
            <ul className="feature-list">
              <li>Responsive design that works seamlessly on all devices</li>
              <li>Optimized performance for fast loading times</li>
              <li>Clean, maintainable code following industry standards</li>
              <li>SEO-friendly architecture for better visibility</li>
              <li>Secure and reliable implementation</li>
            </ul>

            <h2 className="detail-section-title">Technologies Used</h2>
            <div className="technologies-list">
              {project.technologies.map((tech, i) => (
                <span key={i} className="technology-badge">{tech}</span>
              ))}
            </div>
          </div>

          <div className="project-sidebar">
            <Card className="project-info-card">
              <h3 className="info-card-title">Project Info</h3>
              <div className="info-item">
                <Calendar className="h-4 w-4" />
                <div>
                  <div className="info-label">Completed</div>
                  <div className="info-value">2024</div>
                </div>
              </div>
              <div className="info-item">
                <Tag className="h-4 w-4" />
                <div>
                  <div className="info-label">Category</div>
                  <div className="info-value">{project.category}</div>
                </div>
              </div>
            </Card>

            <Card className="project-cta-card">
              <h3 className="cta-card-title">Interested in a Similar Project?</h3>
              <p className="cta-card-description">
                Let's discuss how we can create something amazing for you.
              </p>
              <Link to="/contact">
                <Button className="w-full">
                  Get In Touch
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="related-projects-section">
        <h2 className="section-title">More Projects</h2>
        <div className="related-projects-grid">
          {projects
            .filter(p => p.id !== project.id)
            .slice(0, 3)
            .map((relatedProject) => (
              <Link key={relatedProject.id} to={`/portfolio/${relatedProject.id}`} className="related-project-link">
                <Card className="related-project-card">
                  <img src={relatedProject.image} alt={relatedProject.title} loading="lazy" />
                  <div className="related-project-info">
                    <h4>{relatedProject.title}</h4>
                    <p>{relatedProject.category}</p>
                  </div>
                </Card>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
};

export default PortfolioItem;