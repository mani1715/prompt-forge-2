import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || '/api';

/**
 * Track analytics event - fails silently to not block user actions
 */
const trackEvent = async (eventType, data = {}) => {
  try {
    // Non-blocking async call
    await axios.post(`${API_URL}/analytics/event`, {
      event_type: eventType,
      ...data
    }, {
      timeout: 2000 // 2 second timeout
    });
  } catch (error) {
    // Fail silently - don't block user actions or show errors
    console.debug('Analytics tracking failed:', error.message);
  }
};

/**
 * Track page view
 */
export const trackPageView = (pageName) => {
  trackEvent('page_view', { page_name: pageName });
};

/**
 * Track contact form submission
 */
export const trackContactSubmission = () => {
  trackEvent('contact_submission');
};

/**
 * Track pricing calculator opened
 */
export const trackCalculatorOpened = () => {
  trackEvent('calculator_opened');
};

/**
 * Track pricing calculator estimate generated
 */
export const trackCalculatorEstimate = () => {
  trackEvent('calculator_estimate');
};

/**
 * Track blog post view
 */
export const trackBlogView = (blogId, blogTitle) => {
  trackEvent('blog_view', {
    blog_id: blogId,
    blog_title: blogTitle
  });
};

/**
 * Get analytics summary (admin only)
 */
export const getAnalyticsSummary = async (period = '7days', token) => {
  try {
    const response = await axios.get(`${API_URL}/analytics/summary`, {
      params: { period },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
