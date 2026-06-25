"use client";

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

import { useQueryClient } from '@tanstack/react-query';

export default function SocketProvider() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io('http://localhost:3000', {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.log('Connected to socket server:', socket.id);
    });

    socket.on('booking:created', (data) => {
      console.log("booking:created: ", data);
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user?.role === 'ADMIN') {
            queryClient.invalidateQueries({ queryKey: ['admin_notification_count'] });
            queryClient.invalidateQueries({ queryKey: ['adminBookings'] });
            toast.success(`Có đơn đặt phòng mới từ ${data.booking.user?.name || 'Khách vãng lai'}!`, {
              duration: 5000,
              position: 'top-right',
            });
          }
        } catch (e) {}
      }
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected from socket server:', reason);
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
    });

    socket.on('status:changed', (data) => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user.role === 'GUEST' && data.booking?.user_id === user.id) {
            toast(`Trạng thái đơn đặt phòng của bạn đã đổi thành: ${data.booking.status}`, { icon: 'ℹ️', duration: 5000 });
          }
        } catch (e) {}
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
}
