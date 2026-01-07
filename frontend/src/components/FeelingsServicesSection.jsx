import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Gift, Sparkles, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { getAllFeelingsServices, createServiceRequest } from '../services/feelingsService';
import './FeelingsServices.css';

const FeelingsServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_whatsapp: '',
    event_date: '',
    recipient_name: '',
    message: '',
    special_instructions: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getAllFeelingsServices(true);
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowRequestForm(true);
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const requestData = {
        service_id: selectedService.id,
        ...formData
      };

      await createServiceRequest(requestData);
      toast.success('Request submitted successfully! We will contact you soon via WhatsApp.');
      setShowRequestForm(false);
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        customer_whatsapp: '',
        event_date: '',
        recipient_name: '',
        message: '',
        special_instructions: ''
      });
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const eventIcons = {
    Birthday: Gift,
    Engagement: Heart,
    Proposal: Heart,
    Wedding: Heart,
    Anniversary: Calendar
  };

  if (loading) {
    return (
      <section className="feelings-services-section">
        <div className="feelings-container">
          <div className="text-center">Loading services...</div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return null;
  }

  return (
    <>
      {/* HERO SECTION */}
      <section className="feelings-hero-section">
        <div className="feelings-hero-background">
          <div className="floral-decoration floral-left">
            <svg viewBox="0 0 200 200" className="floral-svg">
              <circle cx="100" cy="100" r="40" fill="#E8B4C8" opacity="0.3" />
              <circle cx="120" cy="80" r="30" fill="#D4869C" opacity="0.4" />
              <circle cx="80" cy="80" r="30" fill="#D4869C" opacity="0.4" />
            </svg>
          </div>
          <div className="floral-decoration floral-right">
            <svg viewBox="0 0 200 200" className="floral-svg">
              <circle cx="100" cy="100" r="40" fill="#E8B4C8" opacity="0.3" />
              <circle cx="120" cy="120" r="30" fill="#D4869C" opacity="0.4" />
              <circle cx="80" cy="120" r="30" fill="#D4869C" opacity="0.4" />
            </svg>
          </div>
        </div>
        
        <div className="feelings-hero-content">
          <div className="feelings-hero-badge">
            <Sparkles className="w-4 h-4" />
            <span>Special Service</span>
          </div>
          
          <h1 className="feelings-hero-title" data-testid="feelings-hero-title">
            We Don't Build Websites,
            <br />
            <span className="feelings-hero-subtitle">We Build Feelings</span>
          </h1>
          
          <p className="feelings-hero-description">
            Explore our collection of beautifully crafted web experiences designed to create lasting memories. Each service is a unique way to express your emotions and share special moments with your loved ones.
          </p>

          <div className="feelings-hero-features">
            <div className="hero-feature-item">
              <Clock className="w-5 h-5" />
              <span>24-Hour Active Links</span>
            </div>
            <div className="hero-feature-item">
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Delivery</span>
            </div>
            <div className="hero-feature-item">
              <Heart className="w-5 h-5" />
              <span>Personalized Design</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="feelings-services-section">
        <div className="feelings-container">
          <div className="section-header-feelings">
            <h2 className="section-title-feelings">Our Feelings Expression Services</h2>
            <p className="section-description-feelings">
              Choose the perfect service for your special occasion
            </p>
          </div>

          <div className="feelings-services-grid">
            {services.map((service, index) => {
              const EventIcon = eventIcons[service.event_type] || Heart;
              return (
                <Card 
                  key={service.id} 
                  className="feelings-service-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  data-testid={`service-card-${service.event_type.toLowerCase()}`}
                >
                  {/* Service Image */}
                  {service.images && service.images.length > 0 && (
                    <div className="service-image-container">
                      <img 
                        src={service.images[0]} 
                        alt={service.name}
                        className="service-image-feelings"
                      />
                      <div className="service-image-overlay">
                        {service.demo_url && (
                          <a
                            href={service.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="demo-link-overlay"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>View Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="service-card-header">
                    <div className="service-icon-feelings">
                      <EventIcon className="w-8 h-8" />
                    </div>
                    <div className="service-badge">{service.event_type}</div>
                  </div>

                  <h3 className="service-name-feelings">{service.name}</h3>
                  <p className="service-description-feelings">{service.description}</p>

                  {service.features && service.features.length > 0 && (
                    <ul className="service-features-feelings">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>
                          <span className="feature-bullet">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="service-pricing">
                    <div className="price-container">
                      <span className="original-price">{service.currency}{service.original_price}</span>
                      <span className="offer-price">{service.currency}{service.offer_price}</span>
                    </div>
                    <div className="discount-badge">
                      Save {service.currency}{service.original_price - service.offer_price}
                    </div>
                  </div>

                  <div className="service-card-actions">
                    {service.demo_url && (
                      <Button 
                        variant="outline"
                        className="demo-button"
                        onClick={() => window.open(service.demo_url, '_blank')}
                        data-testid={`demo-button-${service.event_type.toLowerCase()}`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                    <Button 
                      className="service-cta-button"
                      onClick={() => handleServiceClick(service)}
                      data-testid={`request-button-${service.event_type.toLowerCase()}`}
                    >
                      Get This Website
                      <Heart className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* REQUEST FORM DIALOG */}
      <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
        <DialogContent className="feelings-dialog" data-testid="service-request-dialog">
          <DialogHeader>
            <DialogTitle>Request {selectedService?.name}</DialogTitle>
            <DialogDescription>
              Fill in the details below and we'll contact you via WhatsApp to create your special mini-site.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitRequest} className="feelings-form">
            <div className="form-grid">
              <div className="form-field">
                <Label htmlFor="customer_name">Your Name *</Label>
                <Input
                  id="customer_name"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  required
                  data-testid="input-customer-name"
                />
              </div>

              <div className="form-field">
                <Label htmlFor="customer_email">Your Email *</Label>
                <Input
                  id="customer_email"
                  name="customer_email"
                  type="email"
                  value={formData.customer_email}
                  onChange={handleInputChange}
                  required
                  data-testid="input-customer-email"
                />
              </div>

              <div className="form-field">
                <Label htmlFor="customer_phone">Your Phone *</Label>
                <Input
                  id="customer_phone"
                  name="customer_phone"
                  type="tel"
                  value={formData.customer_phone}
                  onChange={handleInputChange}
                  required
                  data-testid="input-customer-phone"
                />
              </div>

              <div className="form-field">
                <Label htmlFor="customer_whatsapp">WhatsApp Number *</Label>
                <Input
                  id="customer_whatsapp"
                  name="customer_whatsapp"
                  type="tel"
                  value={formData.customer_whatsapp}
                  onChange={handleInputChange}
                  required
                  placeholder="We'll send the link here"
                  data-testid="input-customer-whatsapp"
                />
              </div>

              <div className="form-field">
                <Label htmlFor="event_date">Event Date</Label>
                <Input
                  id="event_date"
                  name="event_date"
                  type="date"
                  value={formData.event_date}
                  onChange={handleInputChange}
                  data-testid="input-event-date"
                />
              </div>

              <div className="form-field">
                <Label htmlFor="recipient_name">Recipient Name</Label>
                <Input
                  id="recipient_name"
                  name="recipient_name"
                  value={formData.recipient_name}
                  onChange={handleInputChange}
                  placeholder="Who is this for?"
                  data-testid="input-recipient-name"
                />
              </div>
            </div>

            <div className="form-field">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="Share your feelings..."
                data-testid="input-message"
              />
            </div>

            <div className="form-field">
              <Label htmlFor="special_instructions">Special Instructions</Label>
              <Textarea
                id="special_instructions"
                name="special_instructions"
                value={formData.special_instructions}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any specific requirements? (e.g., color theme, specific photos)"
                data-testid="input-special-instructions"
              />
            </div>

            <div className="form-actions">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowRequestForm(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={submitting}
                data-testid="submit-request-button"
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeelingsServicesSection;
