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
    onError: (err, newBooking, context) => {
      queryClient.setQueryData(['bookings'], context?.previousBookings);
      toast.error('Failed to create booking');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/bookings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking deleted');
    },
    onError: () => {
      toast.error('Failed to delete booking');
    }
  });
};
