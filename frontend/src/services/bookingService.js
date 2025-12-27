import api from './api';

export const bookingService = {
  // Get available time slots for a date range
  getAvailableSlots: async (startDate, days = 14) => {
    try {
      const response = await api.get(`/bookings/available-slots`, {
        params: { start_date: startDate, days }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check if a specific slot is available
  checkAvailability: async (date, timeSlot) => {
    try {
      const response = await api.get(`/bookings/check-availability`, {
        params: { date, time_slot: timeSlot }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new booking (public endpoint)
  createBooking: async (bookingData) => {
    try {
      const response = await api.post(`/bookings/`, bookingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get booking settings (public endpoint)
  getBookingSettings: async () => {
    try {
      const response = await api.get(`/booking-settings/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Admin endpoints
  admin: {
    // Get all bookings
    getAllBookings: async (status = null, date = null) => {
      try {
        const params = {};
        if (status) params.status = status;
        if (date) params.date = date;
        
        const response = await api.get(`/bookings/admin/all`, { params });
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    // Get upcoming bookings
    getUpcomingBookings: async () => {
      try {
        const response = await api.get(`/bookings/admin/upcoming`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    // Get booking by ID
    getBooking: async (bookingId) => {
      try {
        const response = await api.get(`/bookings/admin/${bookingId}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    // Update booking
    updateBooking: async (bookingId, updateData) => {
      try {
        const response = await api.put(`/bookings/admin/${bookingId}`, updateData);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    // Delete booking
    deleteBooking: async (bookingId) => {
      try {
        const response = await api.delete(`/bookings/admin/${bookingId}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    // Get booking stats
    getBookingStats: async () => {
      try {
        const response = await api.get(`/bookings/admin/stats/summary`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    // Get booking settings
    getSettings: async () => {
      try {
        const response = await api.get(`/booking-settings/admin`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    // Create/Update booking settings
    saveSettings: async (settings) => {
      try {
        const response = await api.post(`/booking-settings/admin`, settings);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  }
};
