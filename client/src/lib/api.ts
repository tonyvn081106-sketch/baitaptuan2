import axios, { AxiosInstance } from 'axios';

interface CustomApi extends AxiosInstance {
  createRoom: (formData: FormData) => Promise<any>;
  updateRoom: (id: string, formData: FormData) => Promise<any>;
  deleteRoom: (id: string) => Promise<any>;
  changePassword: (data: any) => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (data: any) => Promise<any>;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
}) as CustomApi;

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
api.forgotPassword = (email: string) => api.post('/auth/forgot-password', { email });
api.resetPassword = (data: any) => api.post('/auth/reset-password', data);

export default api;
