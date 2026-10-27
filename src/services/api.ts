import axios from 'axios';

// Instância axios com interceptors frágeis - dívida técnica
// Problema: sem tratamento de erro adequado, token hardcoded, sem retry logic
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request - adiciona token (frágil: sem refresh token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response - tratamento básico demais
api.interceptors.response.use(
  (response) => response.data, // retorna só data, muda o tipo esperado
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      // window.location.href = '/login'; // comentado porque quebrava testes
    }
    if (error.response?.status === 500) {
      console.error('Erro interno do servidor:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
