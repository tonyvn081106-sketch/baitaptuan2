"use client";

import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { X } from 'lucide-react';

export default function AdminBookingsPage() {
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['adminBookings'],
    queryFn: async () => {
      const { data } = await api.get('/bookings');
      return data;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [modalData, setModalData] = useState<{isOpen: boolean; id: string; status: string; actionName: string} | null>(null);
  const [reason, setReason] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSelectChange = (id: string, newStatus: string) => {
    // Prevent changing if already in that status
    const booking = bookings?.find((b: any) => b.id === id);
    if (booking?.status === newStatus) return;

    const actionName = newStatus === 'CONFIRMED' ? 'Xác nhận' : newStatus === 'CANCELLED' ? 'Huỷ' : newStatus === 'CHECKED_OUT' ? 'báo khách Đã trả phòng sớm cho' : 'Chờ xác nhận';
    setModalData({ isOpen: true, id, status: newStatus, actionName });
    setReason('');
  };

  const confirmUpdate = async () => {
    if (!modalData) return;
    if (modalData.status === 'CANCELLED' && !reason.trim()) {
      alert('Vui lòng nhập lý do hủy!');
      return;
    }
    
    setIsUpdating(true);
    try {
      await api.put(`/bookings/${modalData.id}/status`, { 
        status: modalData.status, 
        reason: modalData.status === 'CANCELLED' ? reason : undefined 
      });
      window.location.reload(); 
    } catch (e) {
      alert('Có lỗi xảy ra khi cập nhật trạng thái');
      setIsUpdating(false);
      setModalData(null);
    }
  };

  const filteredBookings = bookings?.filter((b: any) => {
    if (!searchQuery.trim()) return true;
    const searchLower = searchQuery.toLowerCase();
    const name = (b.user?.name || 'Khách Vãng Lai').toLowerCase();
    const email = (b.user?.email || '').toLowerCase();
    const phone = (b.user?.phone || '').toLowerCase();
    return name.includes(searchLower) || email.includes(searchLower) || phone.includes(searchLower);
  }).sort((a: any, b: any) => {
    // 1. Sort by status (PENDING first)
    if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
    if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;
    
    // 2. Sort by date (newest first). If created_at is missing, sort by id string comparison
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
    if (dateA !== dateB) return dateB - dateA;
    return b.id.localeCompare(a.id);
  }) || [];

  const pendingCount = bookings?.filter((b: any) => b.status === 'PENDING').length || 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">Quản lý Đặt Phòng</h2>
          {pendingCount > 0 && (
            <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm animate-pulse">
              {pendingCount} Đơn mới
            </span>
          )}
        </div>
        <input 
          type="text"
          placeholder="Tìm tên, email, sđt khách..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-[#0071c2] w-64 text-sm shadow-sm"
        />
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
                {filteredBookings.length > 0 ? filteredBookings.map((b: any) => (
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
                        b.status === 'CHECKED_OUT' ? 'bg-gray-100 text-gray-700' :
                        b.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {b.status === 'CHECKED_OUT' ? 'ĐÃ TRẢ PHÒNG' : b.status}
                      </span>
                      {b.status === 'CANCELLED' && b.cancellation_reason && (
                        <div className="text-xs text-red-500 mt-2 italic max-w-[150px] mx-auto truncate" title={b.cancellation_reason}>
                          Lý do: {b.cancellation_reason}
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <select 
                        value={b.status} 
                        onChange={(e) => handleSelectChange(b.id, e.target.value)}
                        className="border border-gray-400 rounded px-2 py-1 text-sm font-semibold text-gray-900 bg-white outline-none focus:border-blue-500 cursor-pointer"
                        disabled={b.status === 'CHECKED_OUT'}
                      >
                        {b.status === 'PENDING' && <option className="text-gray-900 font-semibold" value="PENDING">Chờ xác nhận</option>}
                        <option className="text-gray-900 font-semibold" value="CONFIRMED">Xác nhận (Khách đang ở)</option>
                        <option className="text-gray-900 font-semibold" value="CHECKED_OUT">Trả phòng sớm</option>
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

      {/* Custom Confirmation Modal */}
      {modalData?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-50 rounded-t-xl">
              <h3 className="text-lg font-bold text-[#003b95]">
                Xác nhận hành động
              </h3>
              <button onClick={() => setModalData(null)} className="text-gray-400 hover:text-gray-600 transition">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 font-medium mb-4">
                Bạn chắc chắn muốn {modalData.actionName.toLowerCase()} đặt phòng này?
              </p>
              
              {modalData.status === 'CANCELLED' && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Lý do huỷ <span className="text-red-500">*</span></label>
                  <textarea 
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#0071c2] resize-none"
                    rows={3}
                    placeholder="Vui lòng nhập lý do huỷ đơn..."
                    autoFocus
                  />
                </div>
              )}
            </div>

            <div className="p-5 border-t border-gray-200 flex justify-end space-x-3 rounded-b-xl bg-gray-50">
              <button 
                onClick={() => setModalData(null)}
                className="px-5 py-2 border border-gray-300 text-gray-700 rounded font-bold hover:bg-gray-200 transition"
                disabled={isUpdating}
              >
                Hủy thao tác
              </button>
              <button 
                onClick={confirmUpdate}
                disabled={isUpdating}
                className="px-5 py-2 bg-[#0071c2] text-white rounded font-bold hover:bg-[#005999] transition shadow disabled:opacity-50"
              >
                {isUpdating ? 'Đang xử lý...' : 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
