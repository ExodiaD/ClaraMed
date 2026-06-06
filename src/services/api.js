import axios from 'axios';

/**
 * Instância do Axios pré-configurada para comunicação com o backend ClaraMed.
 * A baseURL é obtida da variável de ambiente VITE_API_URL.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adiciona um interceptor para injetar o token JWT caso exista
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('claramed_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
