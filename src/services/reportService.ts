import api from './api';

export const reportService = {
  getAll: () => api.get('/reports'),
  getById: (id: string) => api.get(`/reports/${id}`),
  create: (data: any) => api.post('/reports', data),
  delete: (id: string) => api.delete(`/reports/${id}`),
  generate: (id: string) => api.post(`/reports/${id}/generate`),
};
