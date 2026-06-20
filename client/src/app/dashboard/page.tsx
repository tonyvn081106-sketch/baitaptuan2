"use client";

import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useBookings, useDeleteBooking } from '@/hooks/useBookings';

export default function DashboardPage() {
  const { data: bookings, isLoading, error } = useBookings();
  const { mutate: deleteBooking } = useDeleteBooking();

  const handleCancel = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn hủy đặt phòng này?')) {
      deleteBooking(id);
    }
  };

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
                        </div>
                        <div className={`px-3 py-1 rounded text-sm font-bold ${
                          booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 
                          booking.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.status === 'PENDING' ? 'ĐANG CHỜ' : booking.status === 'CONFIRMED' ? 'ĐÃ XÁC NHẬN' : 'ĐÃ HỦY'}
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
                      <button 
                        onClick={() => handleCancel(booking.id)}
                        disabled={booking.status === 'CANCELLED'}
                        className="text-red-600 font-bold px-4 py-2 hover:bg-red-50 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Hủy phòng
                      </button>
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
      </div>
    </ProtectedRoute>
  );
}
