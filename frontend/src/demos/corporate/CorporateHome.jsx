import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cloud, Shield, Database, Smartphone, Boxes, Cpu, Users, Briefcase, ThumbsUp, Globe, Star, Lightbulb, Award, Heart, ExternalLink, ChevronRight } from 'lucide-react';
import CorporateNav from './CorporateNav';
import './corporate.css';
import {
  corporateInfo,
  corporateServices,
  corporateStats,
  corporateTeam,
  corporateTestimonials,
  corporateCaseStudies,
  corporateNews,
  corporateValues,
  corporateClients
} from '../../data/corporateData';

const iconMap = {
  Cloud, Shield, Database, Smartphone, Boxes, Cpu, Users, Briefcase, ThumbsUp, Globe, Lightbulb, Award, Heart
};

const CorporateHome = () => {
  return (
    <div className="corporate-demo">
      <CorporateNav />
      
      {/* Hero Section */}
      <section className="corporate-hero">
        <div className="corporate-hero-bg"></div>
        <div className="corporate-hero-content">
          <div className="container">
            <div className="corporate-hero-text">
              <h1 className="corporate-hero-title">
                {corporateInfo.tagline}
              </h1>
              <p className="corporate-hero-subtitle">
                {corporateInfo.description}
              </p>
              <div className="corporate-hero-buttons">
                <button className="corporate-btn corporate-btn-primary">
                  Get Started <ArrowRight size={20} />
                </button>
                <button className="corporate-btn corporate-btn-secondary">
                  Learn More
                </button>
              </div>
              <div className="corporate-hero-stats">
                <div className="hero-stat-item">
                  <span className="hero-stat-value">{corporateInfo.employees}</span>
                  <span className="hero-stat-label">Employees</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-value">{corporateInfo.locations}</span>
                  <span className="hero-stat-label">Locations</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-value">Since {corporateInfo.founded}</span>
                  <span className="hero-stat-label">Established</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="corporate-section corporate-services">
        <div className="container">
          <div className="corporate-section-header">
            <h2 className="corporate-section-title">Our Solutions</h2>
            <p className="corporate-section-subtitle">
              Comprehensive technology solutions tailored to your business needs
            </p>
          </div>
          <div className="corporate-services-grid">
            {corporateServices.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <div key={service.id} className="corporate-service-card">
                  <div className="service-card-icon">
                    {Icon && <Icon size={32} />}
                  </div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-description">{service.description}</p>
                  <ul className="service-card-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <ChevronRight size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="service-card-btn">
                    Learn More <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="corporate-section corporate-stats-section">
        <div className="container">
          <div className="corporate-stats-grid">
            {corporateStats.map((stat) => {
              const Icon = iconMap[stat.icon];
              return (
                <div key={stat.id} className="corporate-stat-card">
                  <div className="stat-card-icon">
                    {Icon && <Icon size={40} />}
                  </div>
                  <div className="stat-card-content">
                    <div className="stat-card-value">{stat.value}</div>
                    <div className="stat-card-label">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="corporate-section corporate-values">
        <div className="container">
          <div className="corporate-section-header">
            <h2 className="corporate-section-title">Our Core Values</h2>
            <p className="corporate-section-subtitle">
              The principles that guide everything we do
            </p>
          </div>
          <div className="corporate-values-grid">
            {corporateValues.map((value) => {
              const Icon = iconMap[value.icon];
              return (
                <div key={value.id} className="corporate-value-card">
                  <div className="value-card-icon">
                    {Icon && <Icon size={36} />}
                  </div>
                  <h3 className="value-card-title">{value.title}</h3>
                  <p className="value-card-description">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="corporate-section corporate-team">
        <div className="container">
          <div className="corporate-section-header">
            <h2 className="corporate-section-title">Leadership Team</h2>
            <p className="corporate-section-subtitle">
              Meet the experts driving innovation and excellence
            </p>
          </div>
          <div className="corporate-team-grid">
            {corporateTeam.map((member) => (
              <div key={member.id} className="corporate-team-card">
                <div className="team-card-image">
                  <img src={member.image} alt={member.name} />
                  <div className="team-card-overlay">
                    <div className="team-card-social">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="team-card-content">
                  <h3 className="team-card-name">{member.name}</h3>
                  <p className="team-card-role">{member.role}</p>
                  <p className="team-card-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="corporate-section corporate-case-studies">
        <div className="container">
          <div className="corporate-section-header">
            <h2 className="corporate-section-title">Success Stories</h2>
            <p className="corporate-section-subtitle">
              Real results for real clients
            </p>
          </div>
          <div className="corporate-case-studies-grid">
            {corporateCaseStudies.map((study) => (
              <div key={study.id} className="corporate-case-study-card">
                <div className="case-study-image">
                  <img src={study.image} alt={study.title} />
                  <div className="case-study-tags">
                    {study.tags.map((tag, idx) => (
                      <span key={idx} className="case-study-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="case-study-content">
                  <h3 className="case-study-title">{study.title}</h3>
                  <p className="case-study-client">{study.client} • {study.industry}</p>
                  <div className="case-study-details">
                    <div className="case-study-detail">
                      <strong>Challenge:</strong> {study.challenge}
                    </div>
                    <div className="case-study-detail">
                      <strong>Solution:</strong> {study.solution}
                    </div>
                    <div className="case-study-results">
                      <strong>Results:</strong> {study.results}
                    </div>
                  </div>
                  <button className="case-study-btn">
                    View Case Study <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="corporate-section corporate-testimonials">
        <div className="container">
          <div className="corporate-section-header">
            <h2 className="corporate-section-title">What Our Clients Say</h2>
            <p className="corporate-section-subtitle">
              Trusted by industry leaders worldwide
            </p>
          </div>
          <div className="corporate-testimonials-grid">
            {corporateTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="corporate-testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <Star key={idx} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                  <div className="testimonial-info">
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-role">{testimonial.role}</div>
                    <div className="testimonial-company">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="corporate-section corporate-news">
        <div className="container">
          <div className="corporate-section-header">
            <h2 className="corporate-section-title">Latest News</h2>
            <p className="corporate-section-subtitle">
              Stay updated with our latest announcements and insights
            </p>
          </div>
          <div className="corporate-news-grid">
            {corporateNews.map((news) => (
              <div key={news.id} className="corporate-news-card">
                <div className="news-card-image">
                  <img src={news.image} alt={news.title} />
                  <span className="news-card-category">{news.category}</span>
                </div>
                <div className="news-card-content">
                  <div className="news-card-date">{new Date(news.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                  <h3 className="news-card-title">{news.title}</h3>
                  <p className="news-card-excerpt">{news.excerpt}</p>
                  <button className="news-card-btn">
                    Read More <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="corporate-section corporate-clients">
        <div className="container">
          <div className="corporate-section-header">
            <h2 className="corporate-section-title">Trusted By Industry Leaders</h2>
          </div>
          <div className="corporate-clients-grid">
            {corporateClients.map((client, idx) => (
              <div key={idx} className="corporate-client-logo">
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="corporate-section corporate-cta">
        <div className="container">
          <div className="corporate-cta-content">
            <h2 className="corporate-cta-title">Ready to Transform Your Business?</h2>
            <p className="corporate-cta-subtitle">
              Let's discuss how we can help you achieve your digital transformation goals
            </p>
            <div className="corporate-cta-buttons">
              <button className="corporate-btn corporate-btn-primary">
                Schedule a Consultation <ArrowRight size={20} />
              </button>
              <button className="corporate-btn corporate-btn-outline">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="corporate-footer">
        <div className="container">
          <div className="corporate-footer-content">
            <div className="footer-section">
              <h3 className="footer-title">{corporateInfo.name}</h3>
              <p className="footer-description">{corporateInfo.description}</p>
            </div>
            <div className="footer-section">
              <h4 className="footer-heading">Solutions</h4>
              <ul className="footer-links">
                <li><a href="#services">Cloud Solutions</a></li>
                <li><a href="#services">Cybersecurity</a></li>
                <li><a href="#services">Data Analytics</a></li>
                <li><a href="#services">AI & ML</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="#news">News</a></li>
                <li><a href="#careers">Careers</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-heading">Contact</h4>
              <ul className="footer-contact">
                <li>{corporateInfo.email}</li>
                <li>{corporateInfo.phone}</li>
                <li>{corporateInfo.address}</li>
              </ul>
            </div>
          </div>
          <div className="corporate-footer-bottom">
            <p>© 2024 {corporateInfo.name}. All rights reserved.</p>
            <Link to="/portfolio/corporate-website-redesign" className="footer-back-link">
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CorporateHome;
