import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: async (credentials: any) => {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('Đăng nhập thành công');
      router.push('/');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Tài khoản hoặc mật khẩu không chính xác');
    }
  });
};

export const useRegister = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: async (credentials: any) => {
      const { data } = await api.post('/auth/register', credentials);
      return data;
    },
    onSuccess: () => {
      toast.success('Đăng ký thành công. Vui lòng đăng nhập.');
      router.push('/login');
    },
    onError: (error: any) => {
      let msg = error.response?.data?.message || 'Đăng ký thất bại';
      if (msg === 'Email already exists') msg = 'Email này đã được sử dụng!';
      toast.error(msg);
    }
  });
};
