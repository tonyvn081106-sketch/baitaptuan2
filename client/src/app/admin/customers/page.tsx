"use client";

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export default function AdminCustomersPage() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['adminBookings'],
    queryFn: async () => {
      const { data } = await api.get('/bookings');
      return data;
    }
  });

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/bookings/${id}/status`, { status });
      // In a real app we'd use queryClient.invalidateQueries or optimistic updates
      window.location.reload(); 
    } catch (e) {
      alert('Có lỗi xảy ra khi cập nhật trạng thái');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý Khách Hàng (Đặt Phòng)</h2>
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
                  <th className="p-4 font-bold">Liên hệ</th>
                  <th className="p-4 font-bold">Phòng / Nhà</th>
                  <th className="p-4 font-bold">Thời gian</th>
                  <th className="p-4 font-bold">Tổng tiền</th>
                  <th className="p-4 font-bold text-center">Trạng thái</th>
                  <th className="p-4 font-bold text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {bookings?.length > 0 ? bookings.map((b: any) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="p-4 font-semibold text-gray-800">
                      {b.user?.name || 'Khách Vãng Lai'}
                    </td>
                    <td className="p-4 text-gray-600">
                      <div>{b.user?.email || 'N/A'}</div>
                      <div className="text-xs">{b.user?.phone || 'Chưa cập nhật SDT'}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-[#003b95]">{b.room?.name || 'Phòng đã xoá'}</div>
                      <div className="text-gray-500 text-xs mt-1">{b.room?.house_name || ''} - {b.room?.destination || ''}</div>
                    </td>
                    <td className="p-4 text-gray-800">
                      <div><span className="text-gray-500">In:</span> {new Date(b.check_in_date).toLocaleDateString('vi-VN')}</div>
                      <div><span className="text-gray-500">Out:</span> {new Date(b.check_out_date).toLocaleDateString('vi-VN')}</div>
                    </td>
                    <td className="p-4 font-bold text-gray-900">
                      {(b.total_amount || 0).toLocaleString('vi-VN')} đ
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        b.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 
                        b.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <select 
                        value={b.status} 
                        onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                        className="border border-gray-400 rounded px-2 py-1 text-sm font-semibold text-gray-900 bg-white outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option className="text-gray-900 font-semibold" value="PENDING">Chờ xác nhận</option>
                        <option className="text-gray-900 font-semibold" value="CONFIRMED">Xác nhận</option>
                        <option className="text-gray-900 font-semibold" value="CANCELLED">Huỷ</option>
                      </select>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">
                      Chưa có đơn đặt phòng nào trên hệ thống
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
