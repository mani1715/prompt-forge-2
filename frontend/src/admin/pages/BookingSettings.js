import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Settings, Save, Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const BookingSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [meetingType, setMeetingType] = useState('Google Meet');
  const [isActive, setIsActive] = useState(true);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || '/api';

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('admin_token') || localStorage.getItem('adminToken');
      const response = await axios.get(`${backendUrl}/booking-settings/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data) {
        setSettings(response.data);
        setAvailableDays(response.data.available_days || []);
        setTimeSlots(response.data.time_slots || []);
        setMeetingType(response.data.meeting_type || 'Google Meet');
        setIsActive(response.data.is_active !== false);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = (day) => {
    if (availableDays.includes(day)) {
      setAvailableDays(availableDays.filter(d => d !== day));
    } else {
      setAvailableDays([...availableDays, day]);
    }
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { start_time: '10:00', end_time: '11:00', max_bookings: 1 }]);
  };

  const updateTimeSlot = (index, field, value) => {
    const updated = [...timeSlots];
    if (field === 'max_bookings') {
      // Ensure max_bookings is always a valid number (minimum 1)
      const numValue = parseInt(value) || 1;
      updated[index][field] = numValue;
    } else {
      updated[index][field] = value;
    }
    setTimeSlots(updated);
  };

  const removeTimeSlot = (index) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (availableDays.length === 0) {
      toast.error('Please select at least one available day');
      return;
    }

    if (timeSlots.length === 0) {
      toast.error('Please add at least one time slot');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token') || localStorage.getItem('adminToken');
      const data = {
        available_days: availableDays,
        time_slots: timeSlots,
        meeting_type: meetingType,
        is_active: isActive
      };

      await axios.post(`${backendUrl}/booking-settings/admin`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Booking settings saved successfully!');
      fetchSettings();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="booking-settings-page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-purple-600" />
            Booking Settings
          </h1>
          <p className="text-gray-600 mt-1">Configure availability and consultation settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          data-testid="save-settings-btn"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Booking System Status</h3>
            <p className="text-sm text-gray-600 mt-1">
              {isActive ? 'Accepting new bookings' : 'Booking system is disabled'}
            </p>
          </div>
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex items-center gap-2"
            data-testid="toggle-system-status"
          >
            {isActive ? (
              <ToggleRight className="w-12 h-12 text-green-500" />
            ) : (
              <ToggleLeft className="w-12 h-12 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Available Days */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Available Days</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {DAYS_OF_WEEK.map(day => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`p-3 rounded-lg border-2 transition-all ${
                availableDays.includes(day)
                  ? 'border-purple-600 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              data-testid={`day-toggle-${day.toLowerCase()}`}
            >
              <div className="font-medium text-sm">{day.substring(0, 3)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Time Slots</h3>
          </div>
          <button
            onClick={addTimeSlot}
            className="flex items-center gap-2 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            data-testid="add-time-slot-btn"
          >
            <Plus className="w-4 h-4" />
            Add Slot
          </button>
        </div>

        <div className="space-y-3">
          {timeSlots.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No time slots added yet</p>
          ) : (
            timeSlots.map((slot, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={slot.start_time}
                      onChange={(e) => updateTimeSlot(index, 'start_time', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      data-testid={`start-time-${index}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">End Time</label>
                    <input
                      type="time"
                      value={slot.end_time}
                      onChange={(e) => updateTimeSlot(index, 'end_time', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      data-testid={`end-time-${index}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Max Bookings</label>
                    <input
                      type="number"
                      min="1"
                      value={slot.max_bookings || 1}
                      onChange={(e) => updateTimeSlot(index, 'max_bookings', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      data-testid={`max-bookings-${index}`}
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeTimeSlot(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  data-testid={`remove-slot-${index}`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Meeting Type */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Meeting Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={() => setMeetingType('Google Meet')}
            className={`p-4 rounded-lg border-2 transition-all ${
              meetingType === 'Google Meet'
                ? 'border-purple-600 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
            data-testid="meeting-type-google-meet"
          >
            <div className="font-medium">Google Meet</div>
            <div className="text-sm text-gray-600 mt-1">Video consultation via Google Meet</div>
          </button>
          <button
            onClick={() => setMeetingType('Phone Call')}
            className={`p-4 rounded-lg border-2 transition-all ${
              meetingType === 'Phone Call'
                ? 'border-purple-600 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
            data-testid="meeting-type-phone-call"
          >
            <div className="font-medium">Phone Call</div>
            <div className="text-sm text-gray-600 mt-1">Phone consultation</div>
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> All times are in Indian Standard Time (IST). Changes to availability will affect future bookings only.
        </p>
      </div>
    </div>
  );
};

export default BookingSettings;
