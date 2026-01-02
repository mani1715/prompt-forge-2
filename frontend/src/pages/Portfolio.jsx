import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/api/projects/');
        const data = res.data || [];

        setProjects(data);

        const uniqueCategories = [
          'All',
          ...new Set(data.map((p) => p.category).filter(Boolean)),
        ];

        setCategories(uniqueCategories);
      } catch (err) {
        console.error('❌ Failed to load projects', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  if (loading) {
    return <div className="text-center py-20">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="portfolio-page">
      {/* Hero */}
      <section className="portfolio-hero">
        <div className="portfolio-hero-content">
          <h1 className="page-title">Our Portfolio</h1>
          <p className="page-subtitle">
            Explore our collection of successful projects and client solutions
          </p>
        </div>
      </section>

      {/* Filters */}
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

      {/* Projects */}
      <section className="portfolio-projects-section">
        <div className="portfolio-projects-grid">
          {filteredProjects.length === 0 && (
            <p className="text-center col-span-full">
              No projects found.
            </p>
          )}

          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/portfolio/${project.slug}`}
              className="portfolio-card-link"
            >
              <Card className="portfolio-card">
                <div className="portfolio-image">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="portfolio-overlay">
                    <span className="portfolio-category">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="portfolio-info">
                  <h3 className="portfolio-title">{project.title}</h3>
                  <p className="portfolio-description">
                    {project.description}
                  </p>

                  <div className="portfolio-technologies">
                    {project.tech_stack?.map((tech, i) => (
                      <span key={i} className="portfolio-tech-tag">
                        {tech}
                      </span>
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
