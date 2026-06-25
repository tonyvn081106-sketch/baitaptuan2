import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import toast from 'react-hot-toast';

export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data } = await api.get('/bookings');
      return data;
    },
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bookingData: any) => {
      const { data } = await api.post('/bookings', bookingData);
      return data;
    },
    onMutate: async (newBooking) => {
      await queryClient.cancelQueries({ queryKey: ['bookings'] });
      const previousBookings = queryClient.getQueryData(['bookings']);
      
      queryClient.setQueryData(['bookings'], (old: any) => {
        return [...(old || []), { id: Date.now(), ...newBooking, status: 'PENDING' }];
      });
      
      return { previousBookings };
    },
    onError: (err: any, newBooking, context) => {
      queryClient.setQueryData(['bookings'], context?.previousBookings);
      if (err.response?.status === 409) {
        toast.error('Rất tiếc! Phòng này vừa được đặt bởi người khác trong khoảng thời gian này. Vui lòng chọn ngày khác!', {
          duration: 5000,
        });
      } else {
        toast.error('Có lỗi xảy ra khi đặt phòng, vui lòng thử lại!');
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      await api.put(`/bookings/${id}/status`, { status: 'CANCELLED', reason });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Hủy phòng thành công');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi hủy phòng');
    }
  });
};
