import api from './api';

export const userService = {
  getTeam: () => api.get('/users/team'),
  getById: (id: string) => api.get(`/users/${id}`),
  updateProfile: (id: string, data: any) => api.put(`/users/${id}`, data),
  invite: (email: string, role: string) => api.post('/users/invite', { email, role }),
};
