"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useRoomDetails } from '@/hooks/useRooms';
import { useCreateBooking } from '@/hooks/useBookings';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState, use } from 'react';

export default function RoomDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: room, isLoading } = useRoomDetails(resolvedParams.id);
  const { mutate: createBooking, isPending } = useCreateBooking();
  const router = useRouter();

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  if (isLoading) return <div className="text-center py-20 text-xl font-bold">Đang tải...</div>;
  if (!room) return <div className="text-center py-20 text-xl font-bold">Không tìm thấy phòng</div>;

  const handleBooking = () => {
    if (!localStorage.getItem('token')) {
      toast.error('Vui lòng đăng nhập để đặt phòng!');
      router.push('/login');
      return;
    }
    
    if (!checkInDate || !checkOutDate) {
      toast.error('Vui lòng chọn ngày nhận/trả phòng!');
      return;
    }

    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime <= 0) {
      toast.error('Ngày trả phòng phải sau ngày nhận phòng!');
      return;
    }
    
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalAmount = room.price * nights;

    createBooking({
      room_id: room.id,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      total_amount: totalAmount
    }, {
      onSuccess: () => {
        toast.success('Đặt phòng thành công! Đang chờ xác nhận.');
        router.push('/dashboard'); // Go to bookings dashboard
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">Khách sạn</span>
              <span className="text-yellow-400 text-sm">★★★★★</span>
            </div>
            <h1 className="text-3xl font-bold text-[#003b95]">{room.name}</h1>
            <p className="text-sm text-[#0071c2] underline mt-1">{room.destination}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#003b95]">{room.price.toLocaleString('vi-VN')} VND <span className="text-sm font-normal text-gray-500">/đêm</span></div>
            <button 
              onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-2 bg-[#0071c2] text-white px-6 py-2 rounded font-bold hover:bg-[#005999] transition"
            >
              Đặt ngay
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          <div className="col-span-2 row-span-2 relative h-[400px] rounded-l overflow-hidden">
            <Image src={room.image_url} alt={room.name} fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover" />
          </div>
          <div className="relative h-[196px] rounded-tr overflow-hidden">
            <Image src="https://picsum.photos/seed/room1/400/300" alt="Phòng" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
          </div>
          <div className="relative h-[196px] rounded-br overflow-hidden">
            <Image src="https://picsum.photos/seed/room2/400/300" alt="Phòng tắm" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">Mô tả chỗ nghỉ</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{room.description}</p>
              
              <h3 className="font-bold text-lg mb-3">Chi tiết cấu hình phòng</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-3xl mb-2">👤</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sức chứa</span>
                  <span className="text-sm font-bold text-[#003b95]">{room.name.includes('Gia Đình') ? '4 người lớn' : room.name.includes('Đôi') || room.name.includes('Studio') ? '2 người lớn' : '1 người lớn'}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 text-center border-l border-gray-100">
                  <span className="text-3xl mb-2">🛏️</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Giường ngủ</span>
                  <span className="text-sm font-bold text-[#003b95]">{room.name.includes('Gia Đình') ? '2 giường đôi lớn' : room.name.includes('Đôi') ? '1 giường đôi cực lớn' : '1 giường đơn'}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 text-center border-l border-gray-100">
                  <span className="text-3xl mb-2">📐</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Diện tích</span>
                  <span className="text-sm font-bold text-[#003b95]">{room.name.includes('Gia Đình') ? '45 m²' : room.name.includes('Studio') ? '35 m²' : room.name.includes('Đôi') ? '25 m²' : '15 m²'}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 text-center border-l border-gray-100">
                  <span className="text-3xl mb-2">🖼️</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Tầm nhìn</span>
                  <span className="text-sm font-bold text-[#003b95]">{room.name.includes('Studio') || room.name.includes('Gia Đình') ? 'View toàn cảnh' : 'View ban công'}</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-3">Các tiện nghi được ưa chuộng nhất</h2>
              <div className="flex flex-wrap gap-4 text-sm text-green-700">
                <span className="flex items-center space-x-1"><span className="text-xl">🏊</span><span>Hồ bơi ngoài trời</span></span>
                <span className="flex items-center space-x-1"><span className="text-xl">📶</span><span>WiFi miễn phí</span></span>
                <span className="flex items-center space-x-1"><span className="text-xl">🚗</span><span>Xe đưa đón sân bay</span></span>
                <span className="flex items-center space-x-1"><span className="text-xl">🏋️</span><span>Trung tâm thể dục</span></span>
              </div>
            </div>
          </div>

          {/* Booking Form Sidebar */}
          <aside id="booking-section" className="w-full md:w-80 bg-[#ebf3ff] p-6 rounded border border-[#0071c2]">
            <h3 className="font-bold text-lg mb-4 text-[#003b95]">Hoàn tất đặt phòng</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">Ngày nhận phòng</label>
                <input 
                  type="date" 
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full text-gray-900 font-semibold border border-gray-300 bg-white rounded p-2 outline-none focus:border-[#0071c2]" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">Ngày trả phòng</label>
                <input 
                  type="date" 
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full text-gray-900 font-semibold border border-gray-300 bg-white rounded p-2 outline-none focus:border-[#0071c2]" 
                />
              </div>
              
              <div className="border-t border-[#0071c2]/30 pt-4 mt-4">
                {checkInDate && checkOutDate && new Date(checkOutDate).getTime() > new Date(checkInDate).getTime() && (
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))} đêm x {room.price.toLocaleString('vi-VN')} đ</span>
                    <span>{(room.price * Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))).toLocaleString('vi-VN')} đ</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-xl text-[#003b95] mb-4 border-t border-dashed border-gray-300 pt-2">
                  <span>Tổng cộng:</span>
                  <span>
                    {checkInDate && checkOutDate && new Date(checkOutDate).getTime() > new Date(checkInDate).getTime() 
                      ? (room.price * Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))).toLocaleString('vi-VN') 
                      : '0'} đ
                  </span>
                </div>
                <button 
                  onClick={handleBooking}
                  disabled={isPending}
                  className="w-full bg-[#0071c2] text-white py-3 rounded font-bold hover:bg-[#005999] transition disabled:opacity-70"
                >
                  {isPending ? 'Đang xử lý...' : 'Tôi sẽ đặt!'}
                </button>
                <p className="text-xs text-center text-gray-500 mt-3">Bạn sẽ không bị trừ tiền ngay lập tức</p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
