import React, { useState, useEffect } from 'react';
import { Plus, Link2, Copy, Eye, Clock, TrendingUp, X as XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
  getAllGeneratedLinks,
  generateLink,
  updateGeneratedLink,
  deleteGeneratedLink,
  getAllServiceRequests
} from '../../services/feelingsService';

const GeneratedLinksManager = () => {
  const [links, setLinks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [formData, setFormData] = useState({
    request_id: '',
    link_url: '',
    expiry_hours: 24,
    notes: ''
  });

  useEffect(() => {
    fetchLinks();
    fetchCompletedRequests();
  }, []);

  const fetchLinks = async () => {
    try {
      const data = await getAllGeneratedLinks();
      setLinks(data);
    } catch (error) {
      console.error('Error fetching links:', error);
      toast.error('Failed to load generated links');
    } finally {
      setLoading(false);
    }
  };

  const fetchCompletedRequests = async () => {
    try {
      const allRequests = await getAllServiceRequests();
      // Filter for requests without generated links
      const pendingRequests = allRequests.filter(req => 
        !req.generated_link_id && req.status !== 'cancelled'
      );
      setRequests(pendingRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleGenerateLink = async (e) => {
    e.preventDefault();
    
    try {
      await generateLink(formData);
      toast.success('Link generated successfully!');
      fetchLinks();
      fetchCompletedRequests();
      setShowGenerateModal(false);
      setFormData({
        request_id: '',
        link_url: '',
        expiry_hours: 24,
        notes: ''
      });
    } catch (error) {
      console.error('Error generating link:', error);
      toast.error('Failed to generate link');
    }
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  const handleToggleActive = async (link) => {
    try {
      await updateGeneratedLink(link.id, { is_active: !link.is_active });
      toast.success('Link status updated');
      fetchLinks();
    } catch (error) {
      console.error('Error updating link:', error);
      toast.error('Failed to update link status');
    }
  };

  const handleDelete = async (linkId) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      try {
        await deleteGeneratedLink(linkId);
        toast.success('Link deleted successfully');
        fetchLinks();
      } catch (error) {
        console.error('Error deleting link:', error);
        toast.error('Failed to delete link');
      }
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isExpired = (expiresAt) => {
    return new Date(expiresAt) < new Date();
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading links...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1C2A3A', margin: '0 0 8px 0' }}>
            <Link2 style={{ display: 'inline', marginRight: '12px', color: '#E8B4C8' }} size={32} />
            Generated Links
          </h1>
          <p style={{ color: '#6B7280', margin: 0 }}>
            Manage mini-site links for customers - {links.length} total links
          </p>
        </div>
        <button
          onClick={() => setShowGenerateModal(true)}
          className="admin-btn admin-btn-primary"
          disabled={requests.length === 0}
        >
          <Plus size={18} />
          Generate New Link
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div className="admin-stat-card">
          <div className="admin-stat-icon blue">
            <Link2 size={24} />
          </div>
          <div className="admin-stat-content">
            <div className="admin-stat-label">Total Links</div>
            <div className="admin-stat-value">{links.length}</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon green">
            <TrendingUp size={24} />
          </div>
          <div className="admin-stat-content">
            <div className="admin-stat-label">Active Links</div>
            <div className="admin-stat-value">
              {links.filter(l => l.is_active && !l.is_expired).length}
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon purple">
            <Eye size={24} />
          </div>
          <div className="admin-stat-content">
            <div className="admin-stat-label">Total Views</div>
            <div className="admin-stat-value">
              {links.reduce((sum, link) => sum + (link.views_count || 0), 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        {links.map((link) => {
          const expired = isExpired(link.expires_at);
          return (
            <div
              key={link.id}
              className="admin-stat-card"
              style={{
                opacity: link.is_active && !expired ? 1 : 0.6,
                position: 'relative',
                borderLeft: `4px solid ${link.is_active && !expired ? '#10B981' : '#EF4444'}`
              }}
            >
              {/* Status Badges */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                display: 'flex',
                gap: '8px',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                {expired && (
                  <span style={{
                    background: '#FEE2E2',
                    color: '#991B1B',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}>
                    Expired
                  </span>
                )}
                {!link.is_active && (
                  <span style={{
                    background: '#F3F4F6',
                    color: '#6B7280',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}>
                    Inactive
                  </span>
                )}
              </div>

              {/* Link Details */}
              <div style={{ marginBottom: '16px', marginRight: '80px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1C2A3A',
                  margin: '0 0 4px 0'
                }}>
                  {link.service_name}
                </h3>
                <div style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  marginBottom: '8px'
                }}>
                  For: {link.customer_name}
                  {link.recipient_name && ` → ${link.recipient_name}`}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#9CA3AF',
                  fontFamily: 'monospace',
                  background: '#F9FAFB',
                  padding: '8px',
                  borderRadius: '6px',
                  wordBreak: 'break-all'
                }}>
                  {link.link_url}
                </div>
              </div>

              {/* Short Code */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>Short Code:</span>
                <span style={{
                  background: 'linear-gradient(135deg, #E8B4C8, #F5D5E0)',
                  color: '#6B2D3C',
                  padding: '4px 12px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  fontFamily: 'monospace'
                }}>
                  {link.short_code}
                </span>
              </div>

              {/* Time Info */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
                  <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Expires: {formatDateTime(link.expires_at)}
                </div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>
                  <Eye size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Views: {link.views_count || 0}
                  {link.last_viewed_at && ` (Last: ${formatDateTime(link.last_viewed_at)})`}
                </div>
              </div>

              {/* Actions */}
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid #E5E7EB',
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}>
                <button
                  onClick={() => handleCopyLink(link.link_url)}
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  title="Copy Link"
                >
                  <Copy size={14} />
                </button>
                <button
                  onClick={() => handleDelete(link.id)}
                  className="admin-btn admin-btn-danger admin-btn-sm"
                  title="Delete Link"
                >
                  <XIcon size={14} />
                </button>
                <div style={{ marginLeft: 'auto' }}>
                  <label className="admin-toggle">
                    <input
                      type="checkbox"
                      checked={link.is_active}
                      onChange={() => handleToggleActive(link)}
                    />
                    <span className="admin-toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Generate Link Modal */}
      <Dialog open={showGenerateModal} onOpenChange={setShowGenerateModal}>
        <DialogContent style={{ maxWidth: '600px' }}>
          <DialogHeader>
            <DialogTitle>Generate New Link</DialogTitle>
            <DialogDescription>
              Create a mini-site link for a customer service request
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleGenerateLink} style={{ marginTop: '24px' }}>
            <div className="admin-form-group">
              <Label htmlFor="request_id">Select Service Request *</Label>
              <select
                id="request_id"
                className="admin-form-select"
                value={formData.request_id}
                onChange={(e) => setFormData(prev => ({ ...prev, request_id: e.target.value }))}
                required
              >
                <option value="">-- Select a request --</option>
                {requests.map(request => (
                  <option key={request.id} value={request.id}>
                    {request.service_name} - {request.customer_name} ({request.event_type})
                  </option>
                ))}
              </select>
              {requests.length === 0 && (
                <p style={{ fontSize: '13px', color: '#EF4444', marginTop: '8px' }}>
                  No pending requests available. All requests have links or are cancelled.
                </p>
              )}
            </div>

            <div className="admin-form-group">
              <Label htmlFor="link_url">Mini-Site URL *</Label>
              <Input
                id="link_url"
                type="url"
                value={formData.link_url}
                onChange={(e) => setFormData(prev => ({ ...prev, link_url: e.target.value }))}
                placeholder="https://untold-story.example.com/..."
                required
              />
            </div>

            <div className="admin-form-group">
              <Label htmlFor="expiry_hours">Link Expiry Time (hours) *</Label>
              <Input
                id="expiry_hours"
                type="number"
                value={formData.expiry_hours}
                onChange={(e) => setFormData(prev => ({ ...prev, expiry_hours: parseInt(e.target.value) }))}
                min="1"
                max="168"
                placeholder="24"
                required
              />
              <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>
                Set how many hours the link will be active (1-168 hours / 1-7 days)
              </p>
            </div>

            <div className="admin-form-group">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                placeholder="Any additional notes about this link..."
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                type="button"
                onClick={() => setShowGenerateModal(false)}
                className="admin-btn admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="admin-btn admin-btn-primary"
                disabled={requests.length === 0}
              >
                Generate Link
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GeneratedLinksManager;