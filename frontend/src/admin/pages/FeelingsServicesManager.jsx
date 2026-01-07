import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Heart, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import {
  getAllFeelingsServices,
  createFeelingsService,
  updateFeelingsService,
  deleteFeelingsService
} from '../../services/feelingsService';

const FeelingsServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    event_type: 'Birthday',
    description: '',
    features: [],
    original_price: 499,
    offer_price: 299,
    currency: '₹',
    images: [],
    demo_url: '',
    is_active: true,
    display_order: 0
  });

  const eventTypeOptions = ['Birthday', 'Engagement', 'Proposal', 'Wedding', 'Anniversary', 'Other'];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getAllFeelingsServices();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        event_type: service.event_type,
        description: service.description,
        features: service.features || [],
        original_price: service.original_price,
        offer_price: service.offer_price,
        currency: service.currency,
        images: service.images || [],
        demo_url: service.demo_url || '',
        is_active: service.is_active,
        display_order: service.display_order
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        event_type: 'Birthday',
        description: '',
        features: [],
        original_price: 499,
        offer_price: 299,
        currency: '₹',
        images: [],
        demo_url: '',
        is_active: true,
        display_order: services.length
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeaturesChange = (value) => {
    const featuresArray = value.split('\n').map(f => f.trim()).filter(f => f);
    setFormData(prev => ({ ...prev, features: featuresArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingService) {
        await updateFeelingsService(editingService.id, formData);
        toast.success('Service updated successfully');
      } else {
        await createFeelingsService(formData);
        toast.success('Service created successfully');
      }
      
      fetchServices();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteFeelingsService(id);
        toast.success('Service deleted successfully');
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('Failed to delete service');
      }
    }
  };

  const handleToggleActive = async (service) => {
    try {
      await updateFeelingsService(service.id, { is_active: !service.is_active });
      toast.success('Service status updated');
      fetchServices();
    } catch (error) {
      console.error('Error toggling service:', error);
      toast.error('Failed to update service status');
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading services...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1C2A3A', margin: '0 0 8px 0' }}>
            <Heart style={{ display: 'inline', marginRight: '12px', color: '#E8B4C8' }} size={32} />
            Feelings Services Manager
          </h1>
          <p style={{ color: '#6B7280', margin: 0 }}>
            Manage your feelings expression services - {services.length} services
          </p>
        </div>
        <button onClick={() => handleOpenModal()} className="admin-btn admin-btn-primary">
          <Plus size={18} />
          Add New Service
        </button>
      </div>

      {/* Services Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '24px'
      }}>
        {services.map((service) => (
          <div
            key={service.id}
            className="admin-stat-card"
            style={{
              opacity: service.is_active ? 1 : 0.5,
              position: 'relative',
              borderLeft: `4px solid ${service.is_active ? '#E8B4C8' : '#ccc'}`
            }}
          >
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              display: 'flex',
              gap: '8px'
            }}>
              <button
                onClick={() => handleOpenModal(service)}
                className="admin-btn admin-btn-secondary admin-btn-sm"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="admin-btn admin-btn-danger admin-btn-sm"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #E8B4C8, #F5D5E0)',
                color: '#6B2D3C',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                {service.event_type}
              </div>
              
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1C2A3A',
                margin: '0 0 8px 0'
              }}>
                {service.name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6B7280',
                margin: '0 0 16px 0',
                lineHeight: '1.6'
              }}>
                {service.description}
              </p>
            </div>

            {service.features && service.features.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                {service.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} style={{
                    fontSize: '13px',
                    color: '#6B7280',
                    padding: '4px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#E8B4C8' }}>✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            )}

            <div style={{
              paddingTop: '16px',
              borderTop: '1px solid #E5E7EB',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{
                  fontSize: '14px',
                  color: '#9CA3AF',
                  textDecoration: 'line-through',
                  marginRight: '8px'
                }}>
                  {service.currency}{service.original_price}
                </span>
                <span style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#6B2D3C'
                }}>
                  {service.currency}{service.offer_price}
                </span>
              </div>
              <label className="admin-toggle">
                <input
                  type="checkbox"
                  checked={service.is_active}
                  onChange={() => handleToggleActive(service)}
                />
                <span className="admin-toggle-slider"></span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={handleCloseModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">
                {editingService ? 'Edit Feelings Service' : 'Add New Feelings Service'}
              </h2>
              <button onClick={handleCloseModal} className="admin-modal-close">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Service Name *</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Untold Story - Birthday Special"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Event Type *</label>
                  <select
                    className="admin-form-select"
                    value={formData.event_type}
                    onChange={(e) => handleInputChange('event_type', e.target.value)}
                    required
                  >
                    {eventTypeOptions.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Description *</label>
                  <textarea
                    className="admin-form-textarea"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    placeholder="Brief description of the service"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Features (one per line)</label>
                  <textarea
                    className="admin-form-textarea"
                    value={formData.features.join('\n')}
                    onChange={(e) => handleFeaturesChange(e.target.value)}
                    rows={4}
                    placeholder="Custom photo gallery\nPersonal message section\n24-hour active link"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Original Price *</label>
                    <input
                      type="number"
                      className="admin-form-input"
                      value={formData.original_price}
                      onChange={(e) => handleInputChange('original_price', parseFloat(e.target.value))}
                      min="0"
                      step="1"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Offer Price *</label>
                    <input
                      type="number"
                      className="admin-form-input"
                      value={formData.offer_price}
                      onChange={(e) => handleInputChange('offer_price', parseFloat(e.target.value))}
                      min="0"
                      step="1"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Display Order</label>
                    <input
                      type="number"
                      className="admin-form-input"
                      value={formData.display_order}
                      onChange={(e) => handleInputChange('display_order', parseInt(e.target.value))}
                      min="0"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => handleInputChange('is_active', e.target.checked)}
                  />
                  <label htmlFor="is_active" style={{ cursor: 'pointer', margin: 0 }}>
                    Active Service (visible to customers)
                  </label>
                </div>
              </div>
              
              <div className="admin-modal-footer">
                <button type="button" onClick={handleCloseModal} className="admin-btn admin-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  {editingService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeelingsServicesManager;