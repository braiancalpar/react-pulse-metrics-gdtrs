import api from './api';
import { MOCK_CAMPAIGNS } from '../mocks/campaigns';

export const campaignService = {
  getAll: async (filters?: any) => {
    try {
      return await api.get('/campaigns', { params: filters });
    } catch {
      return MOCK_CAMPAIGNS;
    }
  },
  getById: async (id: string) => {
    try {
      return await api.get(`/campaigns/${id}`);
    } catch {
      return MOCK_CAMPAIGNS.find((c: any) => c.id === id) || null;
    }
  },
  create: (data: any) => api.post('/campaigns', data),
  update: (id: string, data: any) => api.put(`/campaigns/${id}`, data),
  delete: (id: string) => api.delete(`/campaigns/${id}`),
  getMetrics: (id: string) => api.get(`/campaigns/${id}/metrics`),
};
