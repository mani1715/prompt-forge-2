import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, Shield, Send, MessageCircle, Instagram } from 'lucide-react';
import { agencyInfo } from '../data/mock';
import newsletterService from '../services/newsletterService';
import settingsService from '../services/settingsService';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [whatsappNumber, setWhatsappNumber] = useState(agencyInfo.socialLinks.whatsapp || '');
  const [instagramUrl, setInstagramUrl] = useState(agencyInfo.socialLinks.instagram || '');
  const [twitterUrl, setTwitterUrl] = useState(agencyInfo.socialLinks.twitter || '');

  // Fetch social links from settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await settingsService.getSettings();
        if (settings?.whatsapp_number) {
          setWhatsappNumber(settings.whatsapp_number);
        }
        if (settings?.social_links?.instagram) {
          setInstagramUrl(settings.social_links.instagram);
        }
        if (settings?.social_links?.twitter) {
          setTwitterUrl(settings.social_links.twitter);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        // Use default values from mock data if settings fetch fails
      }
    };
    fetchSettings();
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await newsletterService.subscribe(email);
      setMessage({ type: 'success', text: result.message });
      setEmail('');
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to subscribe. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    if (whatsappNumber) {
      const message = encodeURIComponent("Hi Prompt Forge, I'm interested in your services.");
      window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    }
  };

  return (
    <footer className="footer" style={{ padding: '3rem 0 1.5rem' }}>
      <div className="footer-container">
        {/* Footer Top */}
        <div className="footer-top" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.5fr', gap: '2rem', marginBottom: '2rem' }}>
          {/* Brand and Newsletter Combined */}
          <div className="footer-brand-newsletter" style={{ gridColumn: '1 / 3' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem' }}>
              {/* Brand Section */}
              <div style={{ flex: '1' }}>
                <h3 className="footer-logo" style={{
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '28px',
                  letterSpacing: '0.5px',
                  marginBottom: '10px'
                }}>
                  {agencyInfo.name}
                </h3>
                <p className="footer-tagline" style={{ color: '#D1D5DB', fontWeight: '500', marginBottom: '1rem' }}>{agencyInfo.tagline}</p>
                <div className="footer-social">
                  <a
                    href={agencyInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={agencyInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  {twitterUrl && (
                    <a
                      href={twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {whatsappNumber && (
                    <button
                      onClick={handleWhatsAppClick}
                      className="social-link"
                      aria-label="WhatsApp"
                      title="Chat on WhatsApp"
                      style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      <MessageCircle className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Newsletter Section */}
              <div style={{ flex: '1' }}>
                <h4 style={{ 
                  fontSize: '18px', 
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '10px',
                  letterSpacing: '0.5px'
                }}>
                  📧 Stay Updated
                </h4>
                <p style={{ 
                  fontSize: '13px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  color: '#9CA3AF',
                  marginBottom: '12px'
                }}>
                  Get exclusive updates and offers.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                  <div className="newsletter-input-wrapper" style={{
                    position: 'relative',
                    border: '2px solid rgba(139, 92, 246, 0.4)',
                    borderRadius: '10px',
                    background: 'rgba(139, 92, 246, 0.08)',
                    padding: '2px',
                    boxShadow: '0 0 15px rgba(139, 92, 246, 0.15)'
                  }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="newsletter-input"
                      disabled={loading}
                      style={{ 
                        background: 'rgba(15, 22, 41, 0.9)',
                        border: 'none',
                        paddingRight: '45px',
                        fontSize: '13px',
                        padding: '10px'
                      }}
                    />
                    <button 
                      type="submit" 
                      className="newsletter-button"
                      disabled={loading}
                      aria-label="Subscribe to newsletter"
                      style={{
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                        border: 'none',
                        boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)',
                        transition: 'all 0.3s ease',
                        padding: '8px',
                        width: '36px',
                        height: '36px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 14px rgba(139, 92, 246, 0.4)';
                      }}
                    >
                      {loading ? (
                        <span className="newsletter-loading">...</span>
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  
                  <p style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    color: '#9CA3AF',
                    fontWeight: '400',
                    marginTop: '8px'
                  }}>
                    <Shield className="h-3 w-3" style={{ color: '#8B5CF6' }} />
                    Privacy protected. Unsubscribe anytime.
                  </p>

                  {message.text && (
                    <p style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      marginTop: '10px',
                      fontWeight: '500',
                      background: message.type === 'success' 
                        ? 'rgba(16, 185, 129, 0.15)' 
                        : 'rgba(239, 68, 68, 0.15)',
                      border: `1px solid ${message.type === 'success' ? '#10B981' : '#EF4444'}`,
                      color: message.type === 'success' ? '#10B981' : '#EF4444'
                    }}>
                      {message.text}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-group">
            <h4 className="footer-links-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/portfolio" className="footer-link">Portfolio</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Services & Contact Combined */}
          <div>
            <div className="footer-links-group" style={{ marginBottom: '1.5rem' }}>
              <h4 className="footer-links-title">Services</h4>
              <ul className="footer-links-list">
                <li><span className="footer-link">Website Development</span></li>
                <li><span className="footer-link">E-commerce Solutions</span></li>
                <li><span className="footer-link">Full-Stack Development</span></li>
              </ul>
            </div>

            <div className="footer-links-group">
              <h4 className="footer-links-title">Contact</h4>
              <ul className="footer-links-list">
                <li>
                  <a href={`mailto:${agencyInfo.email}`} className="footer-link">
                    {agencyInfo.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${agencyInfo.phone}`} className="footer-link">
                    {agencyInfo.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} {agencyInfo.name}. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <span className="footer-link">Privacy Policy</span>
            <span className="footer-link">Terms of Service</span>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Link
                to="/client/login"
                className="footer-link"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                  padding: '10px',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                  width: '40px',
                  height: '40px'
                }}
                title="Client Portal"
                data-testid="footer-client-login"
              >
                <Mail className="h-5 w-5" />
              </Link>
              <Link
                to="/admin/login"
                className="footer-link"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                  padding: '10px',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                  width: '40px',
                  height: '40px'
                }}
                title="Admin Panel"
                data-testid="footer-admin-login"
              >
                <Shield className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;