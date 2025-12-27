import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, Video, PhoneCall } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BookConsultation = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || '/api';

  useEffect(() => {
    fetchSettings();
    fetchAvailableSlots();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${backendUrl}/booking-settings/`);
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await axios.get(`${backendUrl}/bookings/available-slots?start_date=${today}&days=21`);
      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const getAvailableDates = () => {
    const dates = {};
    availableSlots.forEach(slot => {
      if (!dates[slot.date]) {
        dates[slot.date] = [];
      }
      if (slot.is_available) {
        dates[slot.date].push(slot);
      }
    });
    return Object.keys(dates).filter(date => dates[date].length > 0);
  };

  const getSlotsForDate = (date) => {
    return availableSlots.filter(slot => slot.date === date && slot.is_available);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedSlot) {
      toast.error('Please select a date and time slot');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${backendUrl}/bookings/`, {
        ...formData,
        preferred_date: selectedDate,
        preferred_time_slot: selectedSlot
      });
      
      setSubmitted(true);
      toast.success('Booking request submitted successfully!');
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSelectedDate('');
      setSelectedSlot('');
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error(error.response?.data?.detail || 'Failed to submit booking');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short',
      day: 'numeric', 
      month: 'short'
    });
  };

  const availableDates = getAvailableDates();

  if (!settings || !settings.is_active) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking System Unavailable</h2>
            <p className="text-gray-600">
              The booking system is currently not available. Please contact us directly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center" data-testid="booking-success">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Request Submitted!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your interest! We've received your booking request and will confirm your consultation shortly.
            </p>
            <div className="bg-purple-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-purple-900 mb-2">What's Next?</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>You'll receive a confirmation email within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>We'll send you the meeting link (if Google Meet) or call details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Prepare any questions you'd like to discuss</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Book Another Consultation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4" data-testid="book-consultation-page">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book a Free Consultation
          </h1>
          <p className="text-xl text-gray-600">
            Schedule a meeting to discuss your project requirements
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-gray-700">
              {settings.meeting_type === 'Google Meet' ? (
                <><Video className="w-5 h-5 text-purple-600" />Google Meet</>
              ) : (
                <><PhoneCall className="w-5 h-5 text-purple-600" />Phone Call</>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5 text-purple-600" />
              30 Minutes
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Free
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                Your Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="John Doe"
                    data-testid="booking-name-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="john@example.com"
                    data-testid="booking-email-input"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="+91 9876543210"
                    data-testid="booking-phone-input"
                  />
                </div>
              </div>
            </div>

            {/* Select Date */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Select Date <span className="text-red-500">*</span>
              </h2>
              {availableDates.length === 0 ? (
                <p className="text-gray-600 py-8 text-center">No available dates at the moment</p>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {availableDates.slice(0, 15).map(date => (
                    <button
                      key={date}
                      type="button"
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedSlot('');
                      }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedDate === date
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      data-testid={`date-${date}`}
                    >
                      <div className="text-sm font-medium">{formatDate(date)}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Select Time Slot */}
            {selectedDate && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  Select Time <span className="text-red-500">*</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {getSlotsForDate(selectedDate).map(slot => (
                    <button
                      key={slot.time_slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot.time_slot)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedSlot === slot.time_slot
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      data-testid={`slot-${slot.time_slot}`}
                    >
                      <div className="font-medium">{slot.time_slot}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {slot.available_spots} spot{slot.available_spots !== 1 ? 's' : ''} left
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                Message (Optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Tell us about your project or any specific questions..."
                data-testid="booking-message-input"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting || !selectedDate || !selectedSlot}
                className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-lg"
                data-testid="submit-booking-btn"
              >
                {submitting ? 'Submitting...' : 'Book Consultation'}
              </button>
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
              <strong>Note:</strong> All times are in Indian Standard Time (IST). You'll receive a confirmation email within 24 hours.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookConsultation;
