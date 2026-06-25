"use client";

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useMemo } from 'react';

export default function AdminCustomersPage() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['adminBookingsForCustomers'],
    queryFn: async () => {
      const { data } = await api.get('/bookings');
      return data;
    }
  });

  const customers = useMemo(() => {
    if (!bookings) return [];
    const customerMap = bookings.reduce((acc: any, b: any) => {
      if (b.user) {
        if (!acc[b.user.id]) {
          acc[b.user.id] = {
            id: b.user.id,
            name: b.user.name,
            email: b.user.email,
            phone: b.user.phone,
            totalBookings: 0,
            totalSpent: 0,
            latestBooking: b.created_at,
          };
        }
        acc[b.user.id].totalBookings += 1;
        if (b.status === 'CONFIRMED') {
          acc[b.user.id].totalSpent += b.total_amount || 0;
        }
      }
      return acc;
    }, {});
    return Object.values(customerMap);
  }, [bookings]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý Khách Hàng</h2>
      </div>

      {isLoading ? (
        <div className="text-center py-10">Đang tải dữ liệu...</div>
      ) : (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                  <th className="p-4 font-bold">Khách hàng</th>
                  <th className="p-4 font-bold">Email</th>
                  <th className="p-4 font-bold">Số điện thoại</th>
                  <th className="p-4 font-bold text-center">Tổng đơn (đã đặt)</th>
                  <th className="p-4 font-bold text-right">Tổng chi tiêu (Đã xác nhận)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {customers.length > 0 ? customers.map((c: any) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="p-4 font-semibold text-gray-800">
                      {c.name}
                    </td>
                    <td className="p-4 text-gray-600">
                      {c.email}
                    </td>
                    <td className="p-4 text-gray-600">
                      {c.phone || 'Chưa cập nhật'}
                    </td>
                    <td className="p-4 text-center font-bold text-gray-900">
                      {c.totalBookings}
                    </td>
                    <td className="p-4 font-bold text-[#003b95] text-right">
                      {c.totalSpent.toLocaleString('vi-VN')} đ
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Chưa có dữ liệu khách hàng
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

