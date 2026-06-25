"use client";

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { DollarSign, TrendingUp, Calendar, CreditCard } from 'lucide-react';
import { format, subMonths, isSameMonth, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function AdminRevenuePage() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['adminRevenueBookings'],
    queryFn: async () => {
      const { data } = await api.get('/bookings');
      return data;
    }
  });

  if (isLoading) {
    return <div className="text-center py-10">Đang tải dữ liệu doanh thu...</div>;
  }

  // Lọc các đơn hàng hợp lệ để tính doanh thu (đã thanh toán hoặc xác nhận)
  const validBookings = bookings?.filter((b: any) => 
    b.status === 'CONFIRMED' || b.status === 'PAID' || b.status === 'COMPLETED'
  ) || [];

  // 1. Tổng doanh thu
  const totalRevenue = validBookings.reduce((sum: number, b: any) => sum + (b.total_amount || 0), 0);

  // 2. Doanh thu tháng này
  const now = new Date();
  const currentMonthBookings = validBookings.filter((b: any) => {
    // Sử dụng thời gian tạo đơn (khi khách hàng thanh toán/đặt) thay vì ngày trả phòng
    const date = b.created_at ? new Date(b.created_at) : now;
    return isSameMonth(date, now);
  });
  const currentMonthRevenue = currentMonthBookings.reduce((sum: number, b: any) => sum + (b.total_amount || 0), 0);

  // 3. Doanh thu tháng trước
  const lastMonth = subMonths(now, 1);
  const lastMonthBookings = validBookings.filter((b: any) => {
    const date = b.created_at ? new Date(b.created_at) : now;
    return isSameMonth(date, lastMonth);
  });
  const lastMonthRevenue = lastMonthBookings.reduce((sum: number, b: any) => sum + (b.total_amount || 0), 0);

  // Tính phần trăm tăng trưởng
  let growthRate = 0;
  if (lastMonthRevenue === 0) {
    growthRate = currentMonthRevenue > 0 ? 100 : 0;
  } else {
    growthRate = ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
  }

  // 4. Doanh thu theo tháng (6 tháng gần nhất) để vẽ biểu đồ
  const monthlyData = [];
  let maxMonthlyRevenue = 0;
  for (let i = 5; i >= 0; i--) {
    const monthDate = subMonths(now, i);
    const mBookings = validBookings.filter((b: any) => {
      const date = b.created_at ? new Date(b.created_at) : now;
      return isSameMonth(date, monthDate);
    });
    const rev = mBookings.reduce((sum: number, b: any) => sum + (b.total_amount || 0), 0);
    if (rev > maxMonthlyRevenue) maxMonthlyRevenue = rev;
    
    monthlyData.push({
      label: format(monthDate, 'MM/yyyy'),
      revenue: rev,
      count: mBookings.length
    });
  }

  // Format tiền Việt Nam
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Đơn hàng gần đây có đóng góp doanh thu
  const recentValidBookings = [...validBookings]
    .sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Quản lý Doanh Thu</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Revenue Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Tổng doanh thu toàn thời gian</p>
            <p className="text-3xl font-bold text-[#003b95]">{formatMoney(totalRevenue)}</p>
            <p className="text-xs text-gray-400 mt-2">Từ {validBookings.length} đơn đặt phòng hoàn tất</p>
          </div>
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-[#003b95]">
            <DollarSign size={28} />
          </div>
        </div>

        {/* Current Month Revenue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Doanh thu tháng này</p>
            <p className="text-3xl font-bold text-gray-900">{formatMoney(currentMonthRevenue)}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${growthRate >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(1)}%
              </span>
              <span className="text-xs text-gray-400">so với tháng trước</span>
            </div>
          </div>
          <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600">
            <TrendingUp size={28} />
          </div>
        </div>

        {/* Current Month Bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Đơn đặt phòng tháng này</p>
            <p className="text-3xl font-bold text-gray-900">{currentMonthBookings.length}</p>
            <p className="text-xs text-gray-400 mt-2">Chỉ tính đơn đã thanh toán/xác nhận</p>
          </div>
          <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
            <Calendar size={28} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bar Chart (6 months) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Biểu đồ doanh thu 6 tháng gần nhất</h3>
          <div className="h-64 flex items-end justify-between gap-2 mt-4 pb-4 border-b border-gray-100">
            {monthlyData.map((data, idx) => {
              const heightPercent = maxMonthlyRevenue > 0 ? (data.revenue / maxMonthlyRevenue) * 100 : 0;
              return (
                <div key={idx} className="flex flex-col items-center flex-1 group h-full justify-end">
                  <div className="relative flex justify-center w-full flex-1 flex-col-reverse group">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10 pointer-events-none">
                      {formatMoney(data.revenue)}
                      <br/>
                      {data.count} đơn
                    </div>
                    {/* Bar */}
                    <div 
                      className="w-4/5 max-w-[40px] bg-[#0071c2] rounded-t-sm mx-auto transition-all duration-500 group-hover:bg-[#003b95]"
                      style={{ height: `${Math.max(heightPercent, 2)}%` }} // Minimum 2% height just to show it exists
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-3 font-medium">{data.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Đơn hàng mới nhất</h3>
          <div className="space-y-4">
            {recentValidBookings.length > 0 ? (
              recentValidBookings.map((b: any) => (
                <div key={b.id} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                      <CreditCard size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-gray-800 truncate">{b.user?.name || 'Khách vãng lai'}</p>
                      <p className="text-xs text-gray-500 truncate">{b.room?.name || 'Phòng'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#0071c2]">+{formatMoney(b.total_amount || 0)}</p>
                    <p className="text-xs text-gray-400">
                      {b.created_at ? format(new Date(b.created_at), 'dd/MM/yyyy') : 'N/A'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">Chưa có giao dịch nào.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
