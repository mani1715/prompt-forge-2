import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, XCircle, Clock as ClockIcon, Filter, Link as LinkIcon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const BookingsManager = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  const backendUrl = process.env.REACT_APP_BACKEND_URL || '/api';

  useEffect(() => {
    fetchBookings();
    fetchStats();
  }, [filterStatus, filterDate]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('admin_token') || localStorage.getItem('adminToken');
      let url = `${backendUrl}/bookings/admin/all`;
      const params = new URLSearchParams();
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (filterDate) params.append('date', filterDate);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('admin_token') || localStorage.getItem('adminToken');
      const response = await axios.get(`${backendUrl}/bookings/admin/stats/summary`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setMeetingLink(booking.meeting_link || '');
    setAdminNotes(booking.admin_notes || '');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
    setMeetingLink('');
    setAdminNotes('');
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const token = localStorage.getItem('admin_token') || localStorage.getItem('adminToken');
      await axios.put(
        `${backendUrl}/bookings/admin/${bookingId}`,
        { status, meeting_link: meetingLink, admin_notes: adminNotes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Booking ${status} successfully!`);
      fetchBookings();
      fetchStats();
      closeModal();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking');
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    
    try {
      const token = localStorage.getItem('admin_token') || localStorage.getItem('adminToken');
      await axios.delete(`${backendUrl}/bookings/admin/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Booking deleted successfully!');
      fetchBookings();
      fetchStats();
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Failed to delete booking');
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="bookings-manager-page">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-purple-600" />
          Bookings Manager
        </h1>
        <p className="text-gray-600 mt-1">Manage consultation bookings and appointments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600">Total Bookings</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{stats.total || 0}</div>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow-sm border border-yellow-200 p-4">
          <div className="text-sm text-yellow-800">Pending</div>
          <div className="text-2xl font-bold text-yellow-900 mt-1">{stats.pending || 0}</div>
        </div>
        <div className="bg-green-50 rounded-lg shadow-sm border border-green-200 p-4">
          <div className="text-sm text-green-800">Confirmed</div>
          <div className="text-2xl font-bold text-green-900 mt-1">{stats.confirmed || 0}</div>
        </div>
        <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-200 p-4">
          <div className="text-sm text-blue-800">Upcoming</div>
          <div className="text-2xl font-bold text-blue-900 mt-1">{stats.upcoming || 0}</div>
        </div>
        <div className="bg-red-50 rounded-lg shadow-sm border border-red-200 p-4">
          <div className="text-sm text-red-800">Cancelled</div>
          <div className="text-2xl font-bold text-red-900 mt-1">{stats.cancelled || 0}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              data-testid="filter-status"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Date</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              data-testid="filter-date"
            />
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No bookings found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date & Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Meeting Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-2">
                        <User className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <div className="font-medium text-gray-900">{booking.name}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {booking.email}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {booking.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        {formatDate(booking.preferred_date)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Clock className="w-4 h-4" />
                        {booking.preferred_time_slot}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">{booking.meeting_type}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[booking.status]}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal(booking)}
                          className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                          data-testid={`view-booking-${booking.id}`}
                        >
                          View
                        </button>
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                          data-testid={`delete-booking-${booking.id}`}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                  <div className="text-gray-900">{selectedBooking.name}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <div className="text-gray-900">{selectedBooking.email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                  <div className="text-gray-900">{selectedBooking.phone}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Meeting Type</label>
                  <div className="text-gray-900">{selectedBooking.meeting_type}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
                  <div className="text-gray-900">{formatDate(selectedBooking.preferred_date)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Time</label>
                  <div className="text-gray-900">{selectedBooking.preferred_time_slot}</div>
                </div>
              </div>

              {/* Message */}
              {selectedBooking.message && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Message</label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                    {selectedBooking.message}
                  </div>
                </div>
              )}

              {/* Meeting Link */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Meeting Link {selectedBooking.meeting_type === 'Google Meet' && '(Required for confirmation)'}
                </label>
                <input
                  type="url"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  data-testid="meeting-link-input"
                />
              </div>

              {/* Admin Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Admin Notes</label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows="3"
                  placeholder="Internal notes about this booking..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  data-testid="admin-notes-input"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Current Status</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[selectedBooking.status]}`}>
                  {selectedBooking.status}
                </span>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                data-testid="close-modal-btn"
              >
                Close
              </button>
              {selectedBooking.status !== 'cancelled' && (
                <button
                  onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                  data-testid="cancel-booking-btn"
                >
                  <XCircle className="w-4 h-4" />
                  Cancel Booking
                </button>
              )}
              {selectedBooking.status !== 'confirmed' && (
                <button
                  onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                  data-testid="confirm-booking-btn"
                >
                  <CheckCircle className="w-4 h-4" />
                  Confirm Booking
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsManager;
