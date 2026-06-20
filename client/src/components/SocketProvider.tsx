"use client";

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

export default function SocketProvider() {
  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('booking:created', (data) => {
      toast.success(data.message || 'New Booking Created!');
    });

    socket.on('status:changed', (data) => {
      toast(data.message || 'Booking Status Changed!', { icon: 'ℹ️' });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
}
