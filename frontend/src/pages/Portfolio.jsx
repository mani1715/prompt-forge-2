import React, { useEffect, useState, useMemo } from 'react';
import ProjectCard from '../components/portfolio/ProjectCard';

const API_URL = 'https://mspn-dev.onrender.com/api/projects/';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    let mounted = true;

    const fetchProjects = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (mounted && Array.isArray(data)) {
          setProjects(data);
        }
      } catch (err) {
        setError('Failed to load projects');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProjects();
    return () => (mounted = false);
  }, []);

  const categories = useMemo(() => {
    return ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter(p => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  if (loading) {
    return <div className="page-loader">Loading projects…</div>;
  }

  if (error) {
    return <div className="page-error">{error}</div>;
  }

  return (
    <div className="portfolio-page">
      {/* Hero */}
      <section className="portfolio-hero">
        <h1 className="page-title">Our Portfolio</h1>
        <p className="page-subtitle">
          Explore our successful projects and case studies
        </p>
      </section>

      {/* Filters */}
      <section className="filter-section">
        <div className="filter-container">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-button ${
                selectedCategory === category ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="portfolio-projects-section">
        <div className="portfolio-projects-grid">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
