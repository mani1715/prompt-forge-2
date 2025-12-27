import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { corporateInfo } from '../../data/corporateData';

const CorporateNav = () => {
  return (
    <nav className="corporate-nav">
      <div className="container">
        <div className="corporate-nav-content">
          <Link to="/demo/corporate" className="corporate-logo">
            <Building2 size={32} />
            <span>{corporateInfo.name}</span>
          </Link>
          <div className="corporate-nav-links">
            <a href="#services">Solutions</a>
            <a href="#team">Team</a>
            <a href="#case-studies">Case Studies</a>
            <a href="#news">News</a>
            <button className="corporate-nav-btn">Contact Us</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CorporateNav;
