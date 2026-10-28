import api from './api';
import { MOCK_CAMPAIGNS } from '../mocks/campaigns';
import type { AxiosResponse } from 'axios';
import type { Campaign } from '../types/api';

function isAxiosResponse<T>(value: T | AxiosResponse<T>): value is AxiosResponse<T> {
  return typeof value === 'object' && value !== null && 'data' in value && 'status' in value;
}

function responseData<T>(value: T | AxiosResponse<T>): T {
  return isAxiosResponse(value) ? value.data : value;
}

export const campaignService = {
  getAll: async (filters?: Record<string, string>): Promise<Campaign[]> => {
    try {
      return responseData(await api.get<Campaign[]>('/campaigns', { params: filters }));
    } catch {
      return MOCK_CAMPAIGNS as unknown as Campaign[];
    }
  },
  getById: async (id: string): Promise<Campaign | null> => {
    try {
      return responseData(await api.get<Campaign>(`/campaigns/${id}`));
    } catch {
      return (MOCK_CAMPAIGNS as unknown as Campaign[]).find((campaign) => campaign.id === id) || null;
    }
  },
  create: async (data: Partial<Campaign>): Promise<Campaign> =>
    responseData(await api.post<Campaign>('/campaigns', data)),
  update: async (id: string, data: Partial<Campaign>): Promise<Campaign> =>
    responseData(await api.put<Campaign>(`/campaigns/${id}`, data)),
  delete: async (id: string): Promise<void> => {
    await api.delete(`/campaigns/${id}`);
  },
  getMetrics: (id: string) => api.get(`/campaigns/${id}/metrics`),
};
