import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Search, Menu } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Topbar = ({ onMenuToggle }) => {
  const { logout, adminData } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Safely get owner name
  const ownerName = adminData?.settings?.agency?.owner || 'Admin';
  
  return (
    <header className="admin-topbar">
      {/* Mobile Menu Toggle */}
      <button 
        className="admin-mobile-menu-toggle"
        onClick={onMenuToggle}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      <div className="admin-topbar-title">
        Admin Panel
      </div>
      
      <div className="admin-topbar-actions">
        <button 
          className="admin-btn admin-btn-secondary admin-btn-sm"
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <LogOut size={16} />
          <span className="admin-logout-text">Logout</span>
        </button>
        
        <div className="admin-profile">
          <div className="admin-avatar">
            {ownerName.charAt(0).toUpperCase()}
          </div>
          <div className="admin-profile-info">
            <h4>{ownerName}</h4>
            <p>Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
