import React, { useState, useEffect } from 'react';
import { Key, Plus, Edit2, Trash2, Eye, EyeOff, Database, CreditCard, Mail, Cloud, Code, Lock, RefreshCw } from 'lucide-react';
import credentialsService from '../../services/credentialsService';
import { toast } from 'sonner';

const CredentialsManager = () => {
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCredential, setEditingCredential] = useState(null);
  const [showValues, setShowValues] = useState({});
  const [syncing, setSyncing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    key: '',
    value: '',
    category: 'api_key',
    description: ''
  });

  const categories = [
    { value: 'api_key', label: 'API Key', icon: Key },
    { value: 'database', label: 'Database', icon: Database },
    { value: 'payment', label: 'Payment', icon: CreditCard },
    { value: 'email', label: 'Email Service', icon: Mail },
    { value: 'storage', label: 'Storage', icon: Cloud },
    { value: 'other', label: 'Other', icon: Code }
  ];

  const commonCredentials = [
    { name: 'OpenAI API Key', key: 'OPENAI_API_KEY', category: 'api_key', description: 'API key for OpenAI GPT services' },
    { name: 'Anthropic API Key', key: 'ANTHROPIC_API_KEY', category: 'api_key', description: 'API key for Claude AI' },
    { name: 'Google Gemini API Key', key: 'GOOGLE_API_KEY', category: 'api_key', description: 'API key for Google Gemini' },
    { name: 'MongoDB URL', key: 'MONGO_URL', category: 'database', description: 'MongoDB connection string' },
    { name: 'MongoDB Database Name', key: 'DB_NAME', category: 'database', description: 'MongoDB database name' },
    { name: 'Stripe Secret Key', key: 'STRIPE_SECRET_KEY', category: 'payment', description: 'Stripe payment processing key' },
    { name: 'SendGrid API Key', key: 'SENDGRID_API_KEY', category: 'email', description: 'SendGrid email service key' },
    { name: 'AWS Access Key', key: 'AWS_ACCESS_KEY_ID', category: 'storage', description: 'AWS S3 access key' },
    { name: 'AWS Secret Key', key: 'AWS_SECRET_ACCESS_KEY', category: 'storage', description: 'AWS S3 secret key' }
  ];

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      setLoading(true);
      const data = await credentialsService.getAllCredentials();
      setCredentials(data);
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('You don\'t have permission to view credentials');
      } else {
        toast.error('Failed to load credentials');
      }
      console.error('Error fetching credentials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCredential) {
        await credentialsService.updateCredential(editingCredential.id, formData);
        toast.success('Credential updated successfully');
      } else {
        await credentialsService.createCredential(formData);
        toast.success('Credential created successfully');
      }
      
      fetchCredentials();
      closeModal();
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('You don\'t have permission to edit credentials');
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.detail || 'Credential with this key already exists');
      } else {
        toast.error('Failed to save credential');
      }
      console.error('Error saving credential:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this credential?')) {
      return;
    }

    try {
      await credentialsService.deleteCredential(id);
      toast.success('Credential deleted successfully');
      fetchCredentials();
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('You don\'t have permission to delete credentials');
      } else {
        toast.error('Failed to delete credential');
      }
      console.error('Error deleting credential:', error);
    }
  };

  const handleSync = async () => {
    if (!window.confirm('Sync all credentials to environment variables? This will update the runtime environment.')) {
      return;
    }

    try {
      setSyncing(true);
      const result = await credentialsService.syncToEnvironment();
      toast.success(result.message);
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('Only super admins can sync credentials');
      } else {
        toast.error('Failed to sync credentials');
      }
      console.error('Error syncing credentials:', error);
    } finally {
      setSyncing(false);
    }
  };

  const openModal = (credential = null) => {
    if (credential) {
      setEditingCredential(credential);
      setFormData({
        name: credential.name,
        key: credential.key,
        value: credential.value,
        category: credential.category,
        description: credential.description || ''
      });
    } else {
      setEditingCredential(null);
      setFormData({
        name: '',
        key: '',
        value: '',
        category: 'api_key',
        description: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCredential(null);
    setFormData({
      name: '',
      key: '',
      value: '',
      category: 'api_key',
      description: ''
    });
  };

  const toggleShowValue = (id) => {
    setShowValues(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const useCommonCredential = (common) => {
    setFormData({
      ...formData,
      name: common.name,
      key: common.key,
      category: common.category,
      description: common.description
    });
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.value === category);
    const Icon = cat ? cat.icon : Code;
    return <Icon size={18} />;
  };

  const getCategoryBadge = (category) => {
    const colors = {
      api_key: 'admin-badge-primary',
      database: 'admin-badge-success',
      payment: 'admin-badge-warning',
      email: 'admin-badge-info',
      storage: 'admin-badge-purple',
      other: 'admin-badge-secondary'
    };
    
    const cat = categories.find(c => c.value === category);
    return (
      <span className={`admin-badge ${colors[category] || 'admin-badge-secondary'}`}>
        {cat ? cat.label : category}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-card">
          <p>Loading credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">
            <Lock size={28} />
            Credentials Manager
          </h1>
          <p className="admin-page-subtitle">
            Manage API keys, database credentials, and other sensitive configuration
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="admin-btn admin-btn-secondary"
            onClick={handleSync}
            disabled={syncing}
            data-testid="sync-credentials-btn"
          >
            <RefreshCw size={18} className={syncing ? 'spinning' : ''} />
            {syncing ? 'Syncing...' : 'Sync to Environment'}
          </button>
          <button 
            className="admin-btn admin-btn-primary"
            onClick={() => openModal()}
            data-testid="add-credential-btn"
          >
            <Plus size={18} />
            Add Credential
          </button>
        </div>
      </div>

      {/* Credentials Grid */}
      <div className="admin-credentials-grid">
        {credentials.length === 0 ? (
          <div className="admin-card" style={{ gridColumn: '1 / -1' }}>
            <div className="admin-empty-state">
              <Lock size={48} />
              <h3>No Credentials Added</h3>
              <p>Add your first API key or credential to get started</p>
              <button 
                className="admin-btn admin-btn-primary"
                onClick={() => openModal()}
              >
                <Plus size={18} />
                Add First Credential
              </button>
            </div>
          </div>
        ) : (
          credentials.map(cred => (
            <div key={cred.id} className="admin-credential-card">
              <div className="admin-credential-header">
                <div className="admin-credential-icon">
                  {getCategoryIcon(cred.category)}
                </div>
                <div className="admin-credential-actions">
                  <button
                    className="admin-icon-btn"
                    onClick={() => toggleShowValue(cred.id)}
                    title={showValues[cred.id] ? 'Hide value' : 'Show value'}
                    data-testid={`toggle-value-${cred.id}`}
                  >
                    {showValues[cred.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    className="admin-icon-btn"
                    onClick={() => openModal(cred)}
                    title="Edit credential"
                    data-testid={`edit-credential-${cred.id}`}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="admin-icon-btn admin-icon-btn-danger"
                    onClick={() => handleDelete(cred.id)}
                    title="Delete credential"
                    data-testid={`delete-credential-${cred.id}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <h3 className="admin-credential-name">{cred.name}</h3>
              {getCategoryBadge(cred.category)}
              
              <div className="admin-credential-detail">
                <span className="admin-credential-label">Environment Key:</span>
                <code className="admin-credential-key">{cred.key}</code>
              </div>
              
              <div className="admin-credential-detail">
                <span className="admin-credential-label">Value:</span>
                <code className="admin-credential-value">
                  {showValues[cred.id] ? cred.value : cred.value}
                </code>
              </div>
              
              {cred.description && (
                <p className="admin-credential-description">{cred.description}</p>
              )}
              
              <div className="admin-credential-footer">
                <small>Updated: {new Date(cred.updated_at).toLocaleDateString()}</small>
                <small>By: {cred.updated_by}</small>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal admin-modal-large" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editingCredential ? 'Edit Credential' : 'Add New Credential'}</h2>
              <button className="admin-modal-close" onClick={closeModal}>&times;</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                {/* Common Credentials Quick Select */}
                {!editingCredential && (
                  <div className="admin-form-section">
                    <label className="admin-form-label">Quick Select Common Credentials:</label>
                    <div className="admin-quick-select-grid">
                      {commonCredentials.map((common, index) => (
                        <button
                          key={index}
                          type="button"
                          className="admin-quick-select-btn"
                          onClick={() => useCommonCredential(common)}
                        >
                          {getCategoryIcon(common.category)}
                          <span>{common.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Credential Name *</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g., OpenAI API Key"
                      required
                      data-testid="credential-name-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Category *</label>
                    <select
                      className="admin-form-input"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      required
                      data-testid="credential-category-select"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Environment Variable Key *</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={formData.key}
                    onChange={e => setFormData({...formData, key: e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, '_')})}
                    placeholder="e.g., OPENAI_API_KEY"
                    required
                    style={{ fontFamily: 'monospace' }}
                    data-testid="credential-key-input"
                  />
                  <small className="admin-form-help">Use uppercase with underscores (auto-formatted)</small>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Credential Value *</label>
                  <textarea
                    className="admin-form-input"
                    value={formData.value}
                    onChange={e => setFormData({...formData, value: e.target.value})}
                    placeholder="Enter the actual credential value"
                    rows={3}
                    required
                    style={{ fontFamily: 'monospace' }}
                    data-testid="credential-value-input"
                  />
                  <small className="admin-form-help">This will be encrypted and stored securely</small>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Description</label>
                  <textarea
                    className="admin-form-input"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="Optional description about this credential"
                    rows={2}
                    data-testid="credential-description-input"
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button 
                  type="button" 
                  className="admin-btn admin-btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-btn admin-btn-primary"
                  data-testid="save-credential-btn"
                >
                  {editingCredential ? 'Update Credential' : 'Add Credential'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CredentialsManager;
