import api from './api';

export const analyticsService = {
  getDashboardData: () => api.get('/analytics/dashboard'),
  getEngagementMetrics: () => api.get('/analytics/engagement'),
  getConversionData: () => api.get('/analytics/conversions'),
};
