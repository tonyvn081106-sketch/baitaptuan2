"use client";

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useBookings, useCancelBooking } from '@/hooks/useBookings';
import api from '@/lib/api';
import { X } from 'lucide-react';

export default function DashboardPage() {
  const { data: bookings, isLoading, error } = useBookings();
  const { mutate: cancelBooking } = useCancelBooking();

  const [cancelModalOpen, setCancelModalOpen] = useState<{isOpen: boolean; id: string} | null>(null);
  const [selectedReason, setSelectedReason] = useState('Tôi tìm được chỗ ở rẻ hơn');
  const [otherReason, setOtherReason] = useState('');
  const [isCanceling, setIsCanceling] = useState(false);

  const handlePayment = async (bookingId: string, amount: number) => {
    try {
      const response = await api.post('/payments/create_payment_url', { bookingId, amount });
      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Lỗi khi tạo URL thanh toán:', error);
      alert('Không thể khởi tạo thanh toán. Vui lòng thử lại sau.');
    }
  };

  const handleCancelClick = (id: string) => {
    setCancelModalOpen({ isOpen: true, id });
    setSelectedReason('Tôi tìm được chỗ ở rẻ hơn');
    setOtherReason('');
  };

  const confirmCancel = () => {
    if (!cancelModalOpen) return;
    
    let finalReason = selectedReason;
    if (selectedReason === 'Lý do khác') {
      if (!otherReason.trim()) {
        alert('Vui lòng nhập lý do hủy phòng của bạn!');
        return;
      }
      finalReason = otherReason;
    }
    
    setIsCanceling(true);
    cancelBooking({ id: cancelModalOpen.id, reason: finalReason }, {
      onSettled: () => {
        setIsCanceling(false);
        setCancelModalOpen(null);
      }
    });
  };

  const cancelReasons = [
    'Tôi tìm được chỗ ở rẻ hơn',
    'Tôi thay đổi lịch trình chuyến đi',
    'Tôi bận công việc đột xuất',
    'Tôi nhập sai thông tin đặt phòng',
    'Lý do khác'
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
        <Header />
        
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-[#003b95]">Quản lý chuyến đi của bạn</h1>
          
          {isLoading && <div className="text-center py-10">Đang tải dữ liệu...</div>}
          {error && (!bookings || bookings.length === 0) && <div className="text-center py-10 text-red-500">Có lỗi xảy ra khi tải dữ liệu! Vui lòng thử lại.</div>}
          
          <div className="space-y-6">
            {!isLoading && bookings?.length > 0 ? (
              bookings.map((booking: any) => (
                <div key={booking.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row">
                  <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 bg-gray-200">
                    {booking.room?.image_url ? (
                      <Image 
                        src={booking.room.image_url} 
                        alt={booking.room.name || 'Khách sạn'} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 256px"
                        className="object-cover" 
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-400">Không có ảnh</div>
                    )}
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h2 className="text-2xl font-bold text-[#003b95]">{booking.room?.name || 'Khách sạn (Đã bị xoá khỏi hệ thống)'}</h2>
                          <p className="text-sm text-[#0071c2]">{booking.room?.destination || 'Việt Nam'}</p>
                          {booking.status === 'CANCELLED' && booking.cancellation_reason && (
                            <p className="text-sm text-red-600 font-medium italic mt-2">Lý do huỷ: {booking.cancellation_reason}</p>
                          )}
                        </div>
                        <div className={`px-3 py-1 rounded text-sm font-bold h-fit ${
                          booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 
                          booking.status === 'PAID' ? 'bg-blue-100 text-blue-700' : 
                          booking.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.status === 'PENDING' ? 'ĐANG CHỜ' : booking.status === 'CONFIRMED' ? 'ĐÃ XÁC NHẬN' : booking.status === 'PAID' ? 'ĐÃ THANH TOÁN' : 'ĐÃ HỦY'}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4 text-sm bg-gray-50 p-4 rounded border">
                        <div>
                          <p className="text-gray-500">Nhận phòng</p>
                          <p className="font-bold text-gray-900">{new Date(booking.check_in_date).toLocaleDateString('vi-VN')}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Trả phòng</p>
                          <p className="font-bold text-gray-900">{new Date(booking.check_out_date).toLocaleDateString('vi-VN')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end mt-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Tổng cộng</p>
                        <p className="text-xl font-bold text-gray-900">{booking.total_amount?.toLocaleString('vi-VN')} VND</p>
                      </div>
                      <div className="flex gap-2">
                        {booking.status === 'PENDING' && (
                          <button 
                            onClick={() => handlePayment(booking.id, booking.total_amount)}
                            className="bg-[#0071c2] text-white font-bold px-4 py-2 hover:bg-[#005999] rounded transition"
                          >
                            Thanh toán VNPAY
                          </button>
                        )}
                        <button 
                          onClick={() => handleCancelClick(booking.id)}
                          disabled={booking.status === 'CANCELLED'}
                          className="text-red-600 font-bold px-4 py-2 hover:bg-red-50 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Hủy phòng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              !isLoading && (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center shadow-sm">
                  <div className="text-6xl mb-4">🧳</div>
                  <h2 className="text-2xl font-bold mb-2">Bạn chưa có chuyến đi nào</h2>
                  <p className="text-gray-600 mb-6">Đã đến lúc phủ bụi chiếc vali và bắt đầu lên kế hoạch cho chuyến phiêu lưu tiếp theo rồi!</p>
                  <Link href="/">
                    <button className="bg-[#0071c2] text-white px-8 py-3 rounded font-bold hover:bg-[#005999] transition shadow">
                      Bắt đầu tìm kiếm
                    </button>
                  </Link>
                </div>
              )
            )}
          </div>
        </main>
        
        <Footer />
        
        {/* Customer Cancel Modal */}
        {cancelModalOpen?.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col">
              <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                <h3 className="text-lg font-bold text-red-600">
                  Hủy đặt phòng
                </h3>
                <button onClick={() => setCancelModalOpen(null)} className="text-gray-400 hover:text-gray-600 transition">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 font-medium mb-4">
                  Bạn có chắc chắn muốn hủy đặt phòng này? Vui lòng cho chúng tôi biết lý do:
                </p>
                
                <div className="space-y-3 mb-4">
                  {cancelReasons.map((r) => (
                    <label key={r} className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="cancelReason" 
                        value={r}
                        checked={selectedReason === r}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="w-4 h-4 text-[#0071c2] focus:ring-[#0071c2]"
                      />
                      <span className="text-gray-700 text-sm font-medium">{r}</span>
                    </label>
                  ))}
                </div>

                {selectedReason === 'Lý do khác' && (
                  <div className="mt-3">
                    <textarea 
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#0071c2] resize-none text-sm"
                      rows={3}
                      placeholder="Vui lòng nhập lý do cụ thể..."
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <div className="p-5 border-t border-gray-200 flex justify-end space-x-3 rounded-b-xl bg-gray-50">
                <button 
                  onClick={() => setCancelModalOpen(null)}
                  className="px-5 py-2 border border-gray-300 text-gray-700 rounded font-bold hover:bg-gray-200 transition"
                  disabled={isCanceling}
                >
                  Không, giữ lại
                </button>
                <button 
                  onClick={confirmCancel}
                  disabled={isCanceling}
                  className="px-5 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition shadow disabled:opacity-50"
                >
                  {isCanceling ? 'Đang xử lý...' : 'Xác nhận hủy'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
