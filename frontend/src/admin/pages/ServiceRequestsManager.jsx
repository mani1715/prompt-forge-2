import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle, X as XIcon, MessageSquare, Phone, Calendar, Mail, User, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import {
  getAllServiceRequests,
  updateServiceRequest,
  getServiceRequest
} from '../../services/feelingsService';

const ServiceRequestsManager = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchRequests();
  }, [statusFilter]);

  const fetchRequests = async () => {
    try {
      const filter = statusFilter === 'all' ? null : statusFilter;
      const data = await getAllServiceRequests(filter);
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load service requests');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (request) => {
    try {
      const detailedRequest = await getServiceRequest(request.id);
      setSelectedRequest(detailedRequest);
      setShowDetailModal(true);
    } catch (error) {
      console.error('Error fetching request details:', error);
      toast.error('Failed to load request details');
    }
  };

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      await updateServiceRequest(requestId, { status: newStatus });
      toast.success('Status updated successfully');
      fetchRequests();
      if (selectedRequest && selectedRequest.id === requestId) {
        setSelectedRequest({ ...selectedRequest, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: { bg: '#FEF3C7', color: '#92400E', label: 'Pending' },
      in_progress: { bg: '#DBEAFE', color: '#1E40AF', label: 'In Progress' },
      completed: { bg: '#D1FAE5', color: '#065F46', label: 'Completed' },
      cancelled: { bg: '#FEE2E2', color: '#991B1B', label: 'Cancelled' }
    };
    
    const style = statusStyles[status] || statusStyles.pending;
    return (
      <span style={{
        background: style.bg,
        color: style.color,
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600'
      }}>
        {style.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading requests...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1C2A3A', margin: '0 0 8px 0' }}>
          <MessageSquare style={{ display: 'inline', marginRight: '12px', color: '#E8B4C8' }} size={32} />
          Service Requests
        </h1>
        <p style={{ color: '#6B7280', margin: 0 }}>
          Manage customer service requests - {requests.length} total requests
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {['all', 'pending', 'in_progress', 'completed', 'cancelled'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`admin-btn ${statusFilter === status ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
            style={{ textTransform: 'capitalize' }}
          >
            {status === 'all' ? 'All' : status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Requests Table */}
      <div className="admin-stat-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <tr>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Customer</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Service</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Event Date</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Created</th>
                <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>
                    No requests found
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr key={request.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: '600', color: '#1C2A3A' }}>{request.customer_name}</div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>{request.customer_email}</div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>{request.customer_phone}</div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: '500', color: '#1C2A3A' }}>{request.service_name}</div>
                      <div style={{
                        display: 'inline-block',
                        background: '#E8B4C8',
                        color: '#6B2D3C',
                        padding: '2px 8px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '600',
                        marginTop: '4px'
                      }}>
                        {request.event_type}
                      </div>
                    </td>
                    <td style={{ padding: '16px', color: '#6B7280' }}>
                      {formatDate(request.event_date)}
                    </td>
                    <td style={{ padding: '16px' }}>
                      {getStatusBadge(request.status)}
                    </td>
                    <td style={{ padding: '16px', color: '#6B7280', fontSize: '14px' }}>
                      {formatDate(request.created_at)}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleViewDetails(request)}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent style={{ maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto' }}>
          <DialogHeader>
            <DialogTitle>Service Request Details</DialogTitle>
          </DialogHeader>

          {selectedRequest && (
            <div style={{ marginTop: '24px' }}>
              {/* Status Update */}
              <div style={{ marginBottom: '24px', padding: '16px', background: '#F9FAFB', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Update Status:
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['pending', 'in_progress', 'completed', 'cancelled'].map(status => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedRequest.id, status)}
                      className={`admin-btn admin-btn-sm ${
                        selectedRequest.status === status ? 'admin-btn-primary' : 'admin-btn-secondary'
                      }`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Details */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1C2A3A' }}>
                  Customer Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>Name</div>
                    <div style={{ fontWeight: '500' }}>{selectedRequest.customer_name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>Email</div>
                    <div style={{ fontWeight: '500' }}>{selectedRequest.customer_email}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>Phone</div>
                    <div style={{ fontWeight: '500' }}>{selectedRequest.customer_phone}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>WhatsApp</div>
                    <div style={{ fontWeight: '500' }}>{selectedRequest.customer_whatsapp || 'N/A'}</div>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1C2A3A' }}>
                  Service Details
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>Service</div>
                    <div style={{ fontWeight: '500' }}>{selectedRequest.service_name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>Event Type</div>
                    <div style={{ fontWeight: '500' }}>{selectedRequest.event_type}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>Event Date</div>
                    <div style={{ fontWeight: '500' }}>{formatDate(selectedRequest.event_date)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>Recipient Name</div>
                    <div style={{ fontWeight: '500' }}>{selectedRequest.recipient_name || 'N/A'}</div>
                  </div>
                </div>
              </div>

              {/* Message */}
              {selectedRequest.message && (
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1C2A3A' }}>
                    Customer Message
                  </h3>
                  <div style={{
                    padding: '16px',
                    background: '#F9FAFB',
                    borderRadius: '12px',
                    color: '#374151',
                    lineHeight: '1.6'
                  }}>
                    {selectedRequest.message}
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              {selectedRequest.special_instructions && (
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1C2A3A' }}>
                    Special Instructions
                  </h3>
                  <div style={{
                    padding: '16px',
                    background: '#FEF3C7',
                    borderRadius: '12px',
                    color: '#92400E',
                    lineHeight: '1.6'
                  }}>
                    {selectedRequest.special_instructions}
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1C2A3A' }}>
                  Admin Notes
                </h3>
                <textarea
                  className="admin-form-textarea"
                  rows={4}
                  placeholder="Add internal notes about this request..."
                  defaultValue={selectedRequest.admin_notes || ''}
                  onBlur={async (e) => {
                    if (e.target.value !== (selectedRequest.admin_notes || '')) {
                      try {
                        await updateServiceRequest(selectedRequest.id, { admin_notes: e.target.value });
                        toast.success('Notes updated');
                      } catch (error) {
                        toast.error('Failed to update notes');
                      }
                    }
                  }}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceRequestsManager;