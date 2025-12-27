import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Check, X, Star, Users, Zap, Shield, Globe, 
  BarChart3, Calendar, MessageSquare, FileText, Clock, 
  Target, TrendingUp, Award, ChevronDown, ChevronUp,
  Play, ArrowRight, CheckCircle2, Sparkles
} from 'lucide-react';
import './saas.css';

const SaasLandingHome = () => {
  const [activePricing, setActivePricing] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);
  const [stats, setStats] = useState({ users: 0, projects: 0, countries: 0 });

  // Animated counter effect
  useEffect(() => {
    const animateValue = (key, end, duration) => {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setStats(prev => ({ ...prev, [key]: end }));
          clearInterval(timer);
        } else {
          setStats(prev => ({ ...prev, [key]: Math.floor(start) }));
        }
      }, 16);
    };

    animateValue('users', 50000, 2000);
    animateValue('projects', 100000, 2000);
    animateValue('countries', 120, 2000);
  }, []);

  const features = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Smart Task Management',
      description: 'Organize tasks with intelligent prioritization, deadlines, and automated workflows'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Team Collaboration',
      description: 'Real-time collaboration with comments, mentions, and activity feeds'
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Advanced Analytics',
      description: 'Track productivity, identify bottlenecks, and optimize team performance'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Time Tracking',
      description: 'Built-in time tracking with detailed reports and billable hours'
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Document Management',
      description: 'Centralized file storage with version control and sharing permissions'
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Integrated Chat',
      description: 'Team messaging integrated directly into your project workspace'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Goal Tracking',
      description: 'Set and monitor team goals with progress tracking and milestones'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Enterprise Security',
      description: 'Bank-level encryption, SSO, and compliance with SOC 2 & GDPR'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      monthlyPrice: 19,
      yearlyPrice: 190,
      description: 'Perfect for small teams getting started',
      features: [
        { text: 'Up to 10 team members', included: true },
        { text: '50 projects', included: true },
        { text: '10 GB storage', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Email support', included: true },
        { text: 'Advanced analytics', included: false },
        { text: 'Custom integrations', included: false },
        { text: 'Priority support', included: false }
      ],
      popular: false
    },
    {
      name: 'Professional',
      monthlyPrice: 49,
      yearlyPrice: 490,
      description: 'For growing teams that need more power',
      features: [
        { text: 'Up to 50 team members', included: true },
        { text: 'Unlimited projects', included: true },
        { text: '100 GB storage', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Priority email support', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'Time tracking', included: true },
        { text: 'API access', included: false }
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      monthlyPrice: 'Custom',
      yearlyPrice: 'Custom',
      description: 'Advanced features for large organizations',
      features: [
        { text: 'Unlimited team members', included: true },
        { text: 'Unlimited projects', included: true },
        { text: 'Unlimited storage', included: true },
        { text: 'Advanced analytics & reporting', included: true },
        { text: '24/7 phone & email support', included: true },
        { text: 'Custom integrations & API', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'SLA guarantee', included: true }
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechStart Inc',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 5,
      text: 'TaskFlow Pro transformed how our team works. Productivity increased by 60% in just 3 months!'
    },
    {
      name: 'Michael Chen',
      role: 'Project Manager',
      company: 'Digital Ventures',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      rating: 5,
      text: 'The best project management tool we\'ve used. Clean interface and powerful features.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'CTO',
      company: 'Innovation Labs',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Finally, a tool that our entire team actually enjoys using. Game-changer for remote work!'
    }
  ];

  const integrations = [
    { name: 'Slack', logo: '💬' },
    { name: 'GitHub', logo: '🐙' },
    { name: 'Google Drive', logo: '📁' },
    { name: 'Dropbox', logo: '📦' },
    { name: 'Zoom', logo: '📹' },
    { name: 'Salesforce', logo: '☁️' },
    { name: 'Jira', logo: '🔷' },
    { name: 'Figma', logo: '🎨' }
  ];

  const faqs = [
    {
      question: 'How easy is it to get started with TaskFlow Pro?',
      answer: 'Extremely easy! You can sign up in under 2 minutes and start creating projects immediately. Our intuitive interface requires no training, and we offer free onboarding sessions for teams.'
    },
    {
      question: 'Can I switch plans at any time?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any charges or credits to your account.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-level 256-bit SSL encryption, regular security audits, and comply with SOC 2, GDPR, and CCPA standards. Your data is backed up daily and stored in secure data centers.'
    },
    {
      question: 'Do you offer a free trial?',
      answer: 'Yes! We offer a 14-day free trial with full access to all Professional plan features. No credit card required to start.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'Starter plans receive email support with 24-hour response time. Professional plans get priority email support with 4-hour response time. Enterprise customers receive 24/7 phone and email support with a dedicated account manager.'
    },
    {
      question: 'Can I import data from other tools?',
      answer: 'Yes! We support seamless imports from popular tools like Trello, Asana, Monday.com, and more. Our team can help with larger migrations.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="saas-container">
      {/* Navigation */}
      <nav className="saas-nav">
        <div className="nav-content">
          <Link to="/portfolio/saas-landing-page" className="back-link">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Case Study</span>
          </Link>
          <div className="nav-brand">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <span className="brand-name">TaskFlow Pro</span>
          </div>
          <button className="nav-cta-btn">Start Free Trial</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="saas-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap className="h-4 w-4" />
            <span>Trusted by 50,000+ teams worldwide</span>
          </div>
          <h1 className="hero-title">
            Manage Projects Like
            <span className="hero-gradient"> Never Before</span>
          </h1>
          <p className="hero-description">
            TaskFlow Pro streamlines project management with intelligent automation,
            real-time collaboration, and powerful analytics. Focus on what matters.
          </p>
          <div className="hero-actions">
            <button className="btn-primary btn-large">
              <Play className="h-5 w-5" />
              Start Free Trial
            </button>
            <button className="btn-secondary btn-large">
              <MessageSquare className="h-5 w-5" />
              Book a Demo
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">{stats.users.toLocaleString()}+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.projects.toLocaleString()}+</div>
              <div className="stat-label">Projects Managed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.countries}+</div>
              <div className="stat-label">Countries</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="dashboard-preview">
            <div className="preview-header">
              <div className="preview-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="preview-title">Dashboard Overview</div>
            </div>
            <div className="preview-content">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" alt="Dashboard" />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof">
        <p className="social-proof-text">Trusted by leading companies worldwide</p>
        <div className="company-logos">
          <div className="company-logo">Microsoft</div>
          <div className="company-logo">Google</div>
          <div className="company-logo">Amazon</div>
          <div className="company-logo">Apple</div>
          <div className="company-logo">Netflix</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="saas-features">
        <div className="section-header">
          <div className="section-badge">
            <Star className="h-4 w-4" />
            <span>Features</span>
          </div>
          <h2 className="section-title">Everything you need to succeed</h2>
          <p className="section-description">
            Powerful features designed to help your team collaborate better and deliver faster
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Integrations */}
      <section className="integrations-section">
        <div className="section-header">
          <h2 className="section-title">Integrates with your favorite tools</h2>
          <p className="section-description">
            Connect TaskFlow Pro with the tools you already use
          </p>
        </div>
        <div className="integrations-grid">
          {integrations.map((integration, index) => (
            <div key={index} className="integration-card">
              <span className="integration-logo">{integration.logo}</span>
              <span className="integration-name">{integration.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="section-header">
          <div className="section-badge">
            <Award className="h-4 w-4" />
            <span>Pricing</span>
          </div>
          <h2 className="section-title">Choose the perfect plan for your team</h2>
          <p className="section-description">
            Start free. Upgrade when you're ready. Cancel anytime.
          </p>
        </div>

        <div className="pricing-toggle">
          <button 
            className={activePricing === 'monthly' ? 'active' : ''}
            onClick={() => setActivePricing('monthly')}
          >
            Monthly
          </button>
          <button 
            className={activePricing === 'yearly' ? 'active' : ''}
            onClick={() => setActivePricing('yearly')}
          >
            Yearly
            <span className="savings-badge">Save 20%</span>
          </button>
        </div>

        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <div className="pricing-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">
                  {typeof plan.monthlyPrice === 'number' ? (
                    <>
                      <span className="price-currency">$</span>
                      <span className="price-amount">
                        {activePricing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                      </span>
                      <span className="price-period">/{activePricing === 'monthly' ? 'month' : 'year'}</span>
                    </>
                  ) : (
                    <span className="price-custom">Custom Pricing</span>
                  )}
                </div>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className={feature.included ? 'included' : 'not-included'}>
                    {feature.included ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <X className="h-5 w-5" />
                    )}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <button className={`btn-plan ${plan.popular ? 'btn-primary' : 'btn-outline'}`}>
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header">
          <div className="section-badge">
            <Star className="h-4 w-4" />
            <span>Testimonials</span>
          </div>
          <h2 className="section-title">Loved by teams everywhere</h2>
          <p className="section-description">
            See what our customers have to say about TaskFlow Pro
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <img src={testimonial.image} alt={testimonial.name} className="author-image" />
                <div className="author-info">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-description">
            Everything you need to know about TaskFlow Pro
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button 
                className="faq-question"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                {openFaq === index ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {openFaq === index && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="cta-content">
          <h2 className="cta-title">Ready to transform your workflow?</h2>
          <p className="cta-description">
            Join 50,000+ teams already using TaskFlow Pro to manage their projects better
          </p>
          <div className="cta-actions">
            <button className="btn-primary btn-large">
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="btn-secondary btn-large">
              Contact Sales
            </button>
          </div>
          <div className="cta-features">
            <div className="cta-feature">
              <CheckCircle2 className="h-5 w-5" />
              <span>14-day free trial</span>
            </div>
            <div className="cta-feature">
              <CheckCircle2 className="h-5 w-5" />
              <span>No credit card required</span>
            </div>
            <div className="cta-feature">
              <CheckCircle2 className="h-5 w-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="saas-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-logo">
              <Sparkles className="h-6 w-6" />
              <span>TaskFlow Pro</span>
            </div>
            <p>Modern project management for modern teams</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Security</a>
              <a href="#">Integrations</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">Help Center</a>
              <a href="#">API</a>
              <a href="#">Status</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 TaskFlow Pro. All rights reserved.</p>
          <div className="footer-badges">
            <span className="badge">🔒 SOC 2 Certified</span>
            <span className="badge">✓ GDPR Compliant</span>
            <span className="badge">⚡ 99.9% Uptime</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SaasLandingHome;