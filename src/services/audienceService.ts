import api from './api';

export const audienceService = {
  getAll: () => api.get('/audiences'),
  getById: (id: string) => api.get(`/audiences/${id}`),
  create: (data: any) => api.post('/audiences', data),
};
