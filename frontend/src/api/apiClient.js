import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use(resp => resp, async err => {
  if (err.response?.status === 401 && !err.config._retry) {
    err.config._retry = true;
    const refresh = localStorage.getItem('refreshToken');
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/refresh/`, { refresh });
    localStorage.setItem('accessToken', res.data.access);
    err.config.headers.Authorization = `Bearer ${res.data.access}`;
    return api.request(err.config);
  }
  return Promise.reject(err);
});
export default api;
