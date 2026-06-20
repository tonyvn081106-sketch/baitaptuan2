import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export const useSearchRooms = (destination: string) => {
  return useQuery({
    queryKey: ['rooms', destination],
    queryFn: async () => {
      const { data } = await api.get(`/rooms${destination ? `?destination=${destination}` : ''}`);
      return data;
    }
  });
};

export const useRoomDetails = (id: string) => {
  return useQuery({
    queryKey: ['rooms', id],
    queryFn: async () => {
      const { data } = await api.get(`/rooms/${id}`);
      return data;
    },
    enabled: !!id
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post('/rooms', formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    }
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string, formData: FormData }) => {
      const { data } = await api.put(`/rooms/${id}`, formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    }
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/rooms/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    }
  });
};
