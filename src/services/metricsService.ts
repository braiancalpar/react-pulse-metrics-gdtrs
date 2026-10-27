import api from './api';
import { mockMetrics } from '../mocks/metrics';

export const metricsService = {
  getOverview: async (dateRange?: any) => {
    try {
      return await api.get('/metrics/overview');
    } catch {
      return mockMetrics;
    }
  },
  getTimeSeries: async (metric: string) => {
    try {
      return await api.get('/metrics/timeseries', { params: { metric } });
    } catch {
      return (mockMetrics as any).timeSeries;
    }
  },
  getByChannel: async () => {
    try {
      return await api.get('/metrics/by-channel');
    } catch {
      return (mockMetrics as any).byChannel;
    }
  },
  getFunnel: async () => {
    try {
      return await api.get('/metrics/funnel');
    } catch {
      return (mockMetrics as any).funnel;
    }
  },
  getEngagement: async () => {
    try {
      return await api.get('/metrics/engagement');
    } catch {
      return (mockMetrics as any).engagement;
    }
  },
};
