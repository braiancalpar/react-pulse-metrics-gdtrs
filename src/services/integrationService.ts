import api from './api';

export const integrationService = {
  getAll: () => api.get('/integrations'),
  connect: (id: string) => api.post(`/integrations/${id}/connect`),
  disconnect: (id: string) => api.post(`/integrations/${id}/disconnect`),
  sync: (id: string) => api.post(`/integrations/${id}/sync`),
};
