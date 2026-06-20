import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.createRoom = (formData: FormData) => api.post('/rooms', formData);
api.updateRoom = (id: string, formData: FormData) => api.put(`/rooms/${id}`, formData);
api.deleteRoom = (id: string) => api.delete(`/rooms/${id}`);
api.changePassword = (data: any) => api.put('/auth/change-password', data);

export default api;
