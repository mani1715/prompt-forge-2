import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/mock';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...new Set(projects.map(p => p.category))];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="portfolio-page">
      {/* Portfolio Hero */}
      <section className="portfolio-hero">
        <div className="portfolio-hero-content">
          <h1 className="page-title">Our Portfolio</h1>
          <p className="page-subtitle">
            Explore our collection of successful projects and client solutions
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="filter-container">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="filter-button"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="portfolio-projects-section">
        <div className="portfolio-projects-grid">
          {filteredProjects.map((project) => (
            <Link key={project.id} to={`/portfolio/${project.id}`} className="portfolio-card-link">
              <Card className="portfolio-card">
                <div className="portfolio-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="portfolio-overlay">
                    <span className="portfolio-category">{project.category}</span>
                  </div>
                </div>
                <div className="portfolio-info">
                  <h3 className="portfolio-title">{project.title}</h3>
                  <p className="portfolio-description">{project.description}</p>
                  <div className="portfolio-technologies">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="portfolio-tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;