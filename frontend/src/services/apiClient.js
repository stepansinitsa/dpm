import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    const message = error?.response?.data?.message || 'Произошла ошибка';
    console.error('API Error:', error.config.url, message);
    return Promise.reject({ message });
  },
);

export default apiClient;