import React, { useEffect } from 'react';
import { trackPageView } from '../services/analytics';
import FeelingsServicesSection from '../components/FeelingsServicesSection';
import './pages.css';
import './Services.css';

const Services = () => {
  useEffect(() => {
    // Track page view
    trackPageView('services');
  }, []);

  return (
    <div className="services-page-premium">
      {/* FEELINGS SERVICES SECTION - HERO + SERVICES GRID */}
      <FeelingsServicesSection />
    </div>
  );
};

export default Services;
