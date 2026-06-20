"use client";

import { Plane, Calendar, User, ChevronDown, MapPin, Menu, DoorClosed } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function FlightHotelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* White-label Header */}
      <header className="bg-white px-4 py-3 flex items-center justify-between shadow-sm">
        <Link href="/" className="text-[#003b95] text-2xl font-bold tracking-tight">
          Booking.com
        </Link>
        <div className="flex items-center space-x-4">
          <button className="hidden md:block text-[#006ce4] border border-[#006ce4] px-4 py-2 rounded font-semibold hover:bg-blue-50 transition text-sm">
            Đăng ký cho thuê nhà
          </button>
          <div className="hidden md:flex items-center space-x-2">
            <button className="px-2 py-2 rounded hover:bg-gray-100 transition text-lg">🇻🇳</button>
            <button className="px-2 py-2 rounded hover:bg-gray-100 transition font-semibold">đ</button>
          </div>
          <button className="text-[#006ce4] font-semibold px-4 py-2 hover:bg-blue-50 rounded transition text-sm">
            Đăng nhập
          </button>
          <button className="text-[#006ce4] border border-[#006ce4] px-4 py-2 rounded-full font-semibold hover:bg-blue-50 transition text-sm">
            Tạo tài khoản
          </button>
          <button className="p-2 hover:bg-gray-100 rounded transition">
            <Menu className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex-1 min-h-[600px] flex flex-col justify-center px-4 md:px-12 lg:px-24">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1920&q=80" 
            alt="Ocean background" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <h1 className="text-white text-5xl md:text-6xl font-bold mb-2">Toàn bộ kỳ nghỉ trong một cú bấm chuột!</h1>
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">Đặt chuyến bay + khách sạn</h2>
          <p className="text-white/90 text-sm font-semibold mb-8">Cộng tác với Booking.com</p>

          {/* Search Box */}
          <div className="space-y-2">
            {/* Top row buttons */}
            <div className="flex items-center space-x-2">
              <button className="bg-[#488cf4] hover:bg-blue-500 text-white flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded">
                Khứ hồi <ChevronDown size={16} />
              </button>
              <button className="bg-[#488cf4] hover:bg-blue-500 text-white flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded">
                Phổ thông <ChevronDown size={16} />
              </button>
            </div>

            {/* Inputs Row 1 */}
            <div className="flex flex-col md:flex-row gap-1">
              <div className="flex-1 flex gap-1">
                <div className="flex-1 bg-white rounded p-3 flex flex-col justify-center cursor-text">
                  <div className="flex items-center text-gray-500 text-xs mb-1">
                    <Plane size={14} className="mr-2" /> Bay từ
                  </div>
                  <input type="text" placeholder="Bay từ" className="w-full outline-none text-gray-900 font-semibold" />
                </div>
                <div className="flex-1 bg-white rounded p-3 flex flex-col justify-center cursor-text">
                  <div className="flex items-center text-gray-500 text-xs mb-1">
                    <MapPin size={14} className="mr-2" /> Bay đến
                  </div>
                  <input type="text" placeholder="Bay đến" className="w-full outline-none text-gray-900 font-semibold" />
                </div>
              </div>
              <div className="flex-1 flex gap-1">
                <div className="flex-1 bg-white rounded p-3 flex flex-col justify-center cursor-text">
                  <div className="flex items-center text-gray-500 text-xs mb-1">
                    <Calendar size={14} className="mr-2" /> Ngày đi
                  </div>
                  <input type="text" placeholder="Ngày đi" className="w-full outline-none text-gray-900 font-semibold" />
                </div>
                <div className="flex-1 bg-white rounded p-3 flex flex-col justify-center cursor-text">
                  <div className="flex items-center text-gray-500 text-xs mb-1">
                    <Calendar size={14} className="mr-2" /> Ngày về
                  </div>
                  <input type="text" placeholder="Ngày về" className="w-full outline-none text-gray-900 font-semibold" />
                </div>
              </div>
            </div>

            {/* Inputs Row 2 */}
            <div className="flex flex-col md:flex-row gap-1">
              <div className="flex gap-1 md:w-1/2">
                <div className="flex-1 bg-white rounded p-3 flex items-center gap-3 cursor-pointer">
                  <User size={20} className="text-gray-500" />
                  <span className="text-gray-900 font-semibold">1 Hành khách</span>
                </div>
                <div className="flex-1 bg-white rounded p-3 flex items-center gap-3 cursor-pointer">
                  <DoorClosed size={20} className="text-gray-500" />
                  <span className="text-gray-900 font-semibold">1 Phòng</span>
                </div>
              </div>
              <button className="bg-[#488cf4] hover:bg-blue-600 transition text-white font-bold py-3 px-8 rounded md:w-1/2 text-lg">
                TÌM CHUYẾN BAY + KHÁCH SẠN
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Agoda-style Footer */}
      <footer className="w-full">
        {/* Light section */}
        <div className="bg-[#eef2f5] pt-12 pb-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-sm text-[#333]">
            <div>
              <h4 className="font-bold text-[#242424] mb-4">Trợ giúp</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:underline">Trung tâm trợ giúp</a></li>
                <li><a href="#" className="hover:underline">Câu hỏi thường gặp</a></li>
                <li><a href="#" className="hover:underline">Chính sách Bảo mật</a></li>
                <li><a href="#" className="hover:underline">Chính sách về cookie</a></li>
                <li><a href="#" className="hover:underline">Điều khoản sử dụng</a></li>
                <li><a href="#" className="hover:underline">Đạo luật Dịch vụ số (EU)</a></li>
                <li><a href="#" className="hover:underline">Nguyên tắc và báo cáo nội dung</a></li>
                <li><a href="#" className="hover:underline">Tuyên bố về Đạo luật Nô lệ Hiện đại</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#242424] mb-4">Công ty</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:underline">Về chúng tôi</a></li>
                <li><a href="#" className="hover:underline">Tuyển dụng</a></li>
                <li><a href="#" className="hover:underline">Báo chí</a></li>
                <li><a href="#" className="hover:underline">Nhật ký mạng</a></li>
                <li><a href="#" className="hover:underline">PointsMAX</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#242424] mb-4">Điểm du lịch</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:underline">Quốc gia</a></li>
                <li><a href="#" className="hover:underline">Mọi chặng bay</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#242424] mb-4">Đối tác của chúng tôi</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:underline">Cổng thông tin đối tác YCS</a></li>
                <li><a href="#" className="hover:underline">Partner Hub</a></li>
                <li><a href="#" className="hover:underline">Quảng cáo trên Agoda</a></li>
                <li><a href="#" className="hover:underline">Đối tác liên kết</a></li>
                <li><a href="#" className="hover:underline">Tư liệu API Agoda</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#242424] mb-4">Tải ứng dụng</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:underline">Ứng dụng iOS</a></li>
                <li><a href="#" className="hover:underline">Ứng dụng Android</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dark section */}
        <div className="bg-[#2a2a2e] pt-12 pb-8 px-4 text-center">
          <div className="max-w-4xl mx-auto mb-10">
            <p className="text-[#a1a1a1] text-xs mb-1">Toàn bộ nội dung tại đây © 2005 – 2026 Công ty cổ phần BFD. Bảo lưu mọi quyền.</p>
            <p className="text-[#a1a1a1] text-xs">Công ty cổ phần BFD là thành viên của Tập đoàn Booking Holdings, nhà cung cấp dịch vụ du lịch trực tuyến & các dịch vụ có liên quan hàng đầu thế giới.</p>
          </div>
          
          {/* Logos Row */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80">
            {/* Fake logos using text and simple styling */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-white font-bold text-xl tracking-tighter">agoda</span>
              <div className="flex gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              </div>
            </div>
            
            <div className="text-[#1070e3] font-bold text-2xl tracking-tighter">priceline<span className="text-white text-xs align-super ml-0.5">.com</span></div>
            
            <div className="flex bg-[#ff690f] text-white px-2 py-0.5 font-bold tracking-widest text-sm rounded-sm">K A Y A K</div>
            
            <div className="text-white font-bold text-xl tracking-tight">Booking.com</div>
            
            <div className="flex items-center text-white font-semibold text-lg tracking-tight">
              <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span> OpenTable
            </div>
          </div>
          
          <p className="text-[#555] text-[10px] mt-12 font-mono">hk-pc-2i-agoda-front-end-cron-prod-6ddc446495-xjhbk</p>
        </div>
      </footer>
    </div>
  );
}
