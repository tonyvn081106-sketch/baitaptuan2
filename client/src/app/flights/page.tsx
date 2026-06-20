"use client";

import { useState } from 'react';
import { Plane, Calendar, User, ChevronDown, MapPin, Globe, CheckCircle, ChevronRight, Search, ArrowLeftRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function FlightsPage() {
  const [flightType, setFlightType] = useState('roundtrip');
  const [seatClass, setSeatClass] = useState('economy');
  const [directFlight, setDirectFlight] = useState(false);
  const [activeTab, setActiveTab] = useState('international');
  
  const [from, setFrom] = useState({ code: 'HAN', name: 'Sân bay Quốc tế Nội Bài' });
  const [to, setTo] = useState({ code: '', name: '' });
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [passengers, setPassengers] = useState({ adults: 1, children: 0 });

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <div className="bg-[#003b95] text-white pt-6 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition font-semibold">
            <ArrowLeft size={20} /> Quay lại trang chủ
          </Link>
          <h1 className="text-4xl font-extrabold mb-2">So sánh và đặt vé máy bay dễ dàng</h1>
          <p className="text-xl mb-8">Khám phá điểm đến trong mơ tiếp theo</p>
          
          {/* Search Box */}
          <div className="bg-white rounded-lg p-1 space-y-1">
            {/* Options */}
            <div className="flex flex-wrap items-center gap-6 px-4 py-3 text-gray-800 text-sm font-semibold">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="type" checked={flightType === 'roundtrip'} onChange={() => setFlightType('roundtrip')} className="w-5 h-5 accent-[#006ce4]" />
                Khứ hồi
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="type" checked={flightType === 'oneway'} onChange={() => setFlightType('oneway')} className="w-5 h-5 accent-[#006ce4]" />
                Một chiều
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="type" checked={flightType === 'multi'} onChange={() => setFlightType('multi')} className="w-5 h-5 accent-[#006ce4]" />
                Nhiều chặng
              </label>
              
              <div className="flex items-center gap-2 cursor-pointer text-[#006ce4]">
                Hạng phổ thông <ChevronDown size={16} />
              </div>
              
              <label className="flex items-center gap-2 cursor-pointer font-normal text-gray-600">
                <input type="checkbox" checked={directFlight} onChange={(e) => setDirectFlight(e.target.checked)} className="w-4 h-4" />
                Chỉ tìm chuyến bay thẳng
              </label>
            </div>
            
            {/* Inputs */}
            <div className="relative flex flex-col md:flex-row gap-1 p-1">
              <div className="relative flex items-center bg-white border-2 border-yellow-400 rounded p-2 flex-1 cursor-pointer">
                <Plane className="text-gray-400 mx-2" size={20} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-semibold">Bay từ</p>
                  {from.code ? (
                    <p className="text-gray-900 font-bold">{from.code} <span className="font-normal text-sm text-gray-600">{from.name}</span></p>
                  ) : <p className="text-gray-400 font-semibold text-sm">Chọn điểm đi</p>}
                </div>
              </div>
              
              <button onClick={handleSwap} className="absolute left-1/2 md:left-auto md:relative top-[22%] md:top-auto -translate-y-1/2 md:-translate-y-0 -translate-x-1/2 md:-translate-x-0 bg-white border border-gray-300 rounded-full p-1 z-10 hover:bg-gray-100 transition shadow-sm md:mx-[-12px]">
                <ArrowLeftRight size={16} className="text-[#006ce4] hidden md:block" />
                <ArrowLeftRight size={16} className="text-[#006ce4] block md:hidden rotate-90" />
              </button>

              <div className="relative flex items-center bg-white border border-gray-300 rounded p-2 flex-1 cursor-pointer" onClick={() => setShowToDropdown(!showToDropdown)}>
                <Plane className="text-gray-400 mx-2 transform rotate-90" size={20} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-semibold">Bay đến</p>
                  {to.code ? (
                    <p className="text-gray-900 font-bold">{to.code} <span className="font-normal text-sm text-gray-600">{to.name}</span></p>
                  ) : <p className="text-gray-400 font-semibold text-sm">Bay đến</p>}
                </div>
                {/* To Dropdown */}
                {showToDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-[350px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4" onClick={(e) => e.stopPropagation()}>
                    <p className="text-sm font-semibold text-gray-800 mb-2">Sân bay, thành phố hoặc quốc gia</p>
                    <input type="text" className="w-full border-2 border-[#006ce4] rounded px-3 py-2 outline-none text-gray-900 font-semibold mb-4" autoFocus />
                    <p className="text-xs text-gray-500 mb-4">Chọn nhiều sân bay cùng một lúc hoặc chọn "Bất cứ nơi đâu" để khám phá</p>
                    <p className="text-xs font-semibold text-gray-500 mb-2">Khám phá các điểm đến</p>
                    <div 
                      className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer transition"
                      onClick={() => { setTo({ code: 'ANY', name: 'Bất cứ nơi đâu' }); setShowToDropdown(false); }}
                    >
                      <div className="flex items-center gap-2">
                        <Globe size={18} className="text-gray-600" />
                        <span className="font-bold text-gray-900">Bất cứ nơi đâu</span>
                        <span className="bg-[#008234] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">Mới</span>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative flex items-center bg-white border border-gray-300 rounded p-2 flex-1">
                <Calendar className="text-gray-400 mx-2" size={20} />
                <div className="flex-1 w-full flex">
                  <div className="flex-1 relative w-full">
                    <p className="text-xs text-gray-500 font-semibold absolute top-[-4px] left-0 pointer-events-none z-10">Ngày bay</p>
                    <div className="pt-3 w-full">
                      <DatePicker 
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)} 
                        className="w-full outline-none text-gray-900 font-semibold text-sm bg-transparent cursor-pointer"
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-1 flex-1">
                <div className="flex-1 relative flex items-center bg-white border border-gray-300 rounded p-2 cursor-pointer" onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}>
                  <User className="text-gray-400 mx-2" size={20} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-semibold">Hành khách</p>
                    <p className="text-gray-900 font-semibold text-sm">{passengers.adults} người lớn, {passengers.children} trẻ em</p>
                  </div>
                  {/* Passenger Dropdown */}
                  {showPassengerDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-semibold text-gray-800">Người lớn</p>
                          <p className="text-xs text-gray-500">Từ 18 tuổi</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setPassengers(p => ({ ...p, adults: Math.max(1, p.adults - 1) }))} className="w-8 h-8 flex items-center justify-center rounded border border-[#006ce4] text-[#006ce4] font-bold hover:bg-blue-50 transition">-</button>
                          <span className="w-4 text-center font-semibold text-gray-900">{passengers.adults}</span>
                          <button onClick={() => setPassengers(p => ({ ...p, adults: p.adults + 1 }))} className="w-8 h-8 flex items-center justify-center rounded border border-[#006ce4] text-[#006ce4] font-bold hover:bg-blue-50 transition">+</button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-800">Trẻ em</p>
                          <p className="text-xs text-gray-500">0 - 17 tuổi</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setPassengers(p => ({ ...p, children: Math.max(0, p.children - 1) }))} className="w-8 h-8 flex items-center justify-center rounded border border-[#006ce4] text-[#006ce4] font-bold hover:bg-blue-50 transition">-</button>
                          <span className="w-4 text-center font-semibold text-gray-900">{passengers.children}</span>
                          <button onClick={() => setPassengers(p => ({ ...p, children: p.children + 1 }))} className="w-8 h-8 flex items-center justify-center rounded border border-[#006ce4] text-[#006ce4] font-bold hover:bg-blue-50 transition">+</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button className="bg-[#006ce4] hover:bg-blue-700 transition text-white font-bold px-6 md:px-8 rounded text-lg">
                  Tìm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 space-y-16">
        {/* Khám phá mọi nơi */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Khám phá mọi nơi</h2>
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden cursor-pointer group">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" alt="Map" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <button className="bg-[#006ce4] hover:bg-blue-700 transition text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 shadow-lg">
                <Globe size={20} /> Mở bản đồ
              </button>
            </div>
          </div>
        </section>

        {/* Khám phá theo quốc gia */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900">Khám phá theo quốc gia</h2>
          <p className="text-gray-600 mb-6 mt-1">Khám phá các điểm đến thịnh hành, dễ dàng bay đến</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {['Việt Nam', 'Thái Lan', 'Nhật Bản'].map((country, idx) => (
              <div key={country} className="relative h-64 rounded-xl overflow-hidden cursor-pointer group">
                <img src={`https://picsum.photos/seed/${country}/400/600`} alt={country} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <p className="absolute bottom-4 left-4 text-white font-bold text-lg flex items-center gap-2">
                  <span className="w-5 h-5 bg-red-500 rounded-full inline-block border-2 border-white"></span> {country}
                </p>
              </div>
            ))}
            <div className="relative h-64 rounded-xl overflow-hidden cursor-pointer bg-[#003b95] hover:bg-[#00225c] transition flex flex-col items-center justify-center text-white text-center p-6">
              <Globe size={48} className="text-yellow-400 mb-4" />
              <p className="font-bold text-xl mb-2">Bất cứ nơi đâu</p>
              <p className="text-sm text-blue-200">Khám phá tất cả điểm đến</p>
            </div>
          </div>
        </section>

        {/* Chuyến bay phổ biến gần bạn */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Chuyến bay phổ biến gần bạn</h2>
          <p className="text-gray-600 mb-6">Tìm ưu đãi cho chuyến bay trong nước và quốc tế</p>
          
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            <button 
              className={`pb-4 font-semibold ${activeTab === 'international' ? 'text-[#006ce4] border-b-2 border-[#006ce4]' : 'text-gray-500 hover:text-gray-800'}`}
              onClick={() => setActiveTab('international')}
            >
              Quốc tế
            </button>
            <button 
              className={`pb-4 font-semibold ${activeTab === 'domestic' ? 'text-[#006ce4] border-b-2 border-[#006ce4]' : 'text-gray-500 hover:text-gray-800'}`}
              onClick={() => setActiveTab('domestic')}
            >
              Trong nước
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { to: 'Bangkok', date: '20 tháng 6 - 21 tháng 6' },
              { to: 'Kuta', date: '20 tháng 6 - 9 tháng 7' },
              { to: 'Tokyo', date: '24 tháng 6 - 8 tháng 7' },
              { to: 'Siem Reap', date: '20 tháng 6 - 27 tháng 6' }
            ].map((route) => (
              <div key={route.to} className="group cursor-pointer">
                <div className="h-40 rounded-xl overflow-hidden mb-3">
                  <img src={`https://picsum.photos/seed/${route.to}/400/300`} alt={route.to} className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-[#006ce4] transition">Hà Nội đến {route.to}</h3>
                <p className="text-sm text-gray-500">{route.date} • Khứ hồi</p>
              </div>
            ))}
          </div>
        </section>

        {/* Banner Account */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tài khoản và chuyến đi của bạn</h2>
          <div className="border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between shadow-sm">
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Tất cả thông tin về chuyến đi của bạn đều ở cùng một nơi</h3>
              <p className="text-gray-600 mb-4">Đăng nhập để đặt nhanh hơn và dễ dàng quản lý chuyến đi</p>
              <div className="flex gap-4">
                <button className="bg-[#006ce4] hover:bg-blue-700 transition text-white font-bold py-2 px-6 rounded">Đăng nhập</button>
                <button className="text-[#006ce4] hover:bg-blue-50 transition font-bold py-2 px-6 rounded">Đăng ký</button>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="https://cf.bstatic.com/static/img/genius/genius-illustration/35dffbd77c9ff493a743b185386da658603d7cf3.png" alt="Genius" className="h-24 object-contain" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-gray-50 -mx-4 px-4 py-12 border-t border-gray-200 mt-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <Search className="text-yellow-500 w-10 h-10 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Vô vàn lựa chọn</h3>
                <p className="text-sm text-gray-600">Dễ dàng so sánh chuyến bay, hãng bay và giá cả – tất cả ở cùng một nơi</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-yellow-500 w-10 h-10 flex-shrink-0 flex items-center justify-center font-bold text-xl border-2 border-yellow-500 rounded-full">₫</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Không ẩn phí</h3>
                <p className="text-sm text-gray-600">Liệt kê giá cả rõ ràng ở mỗi bước</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Plane className="text-yellow-500 w-10 h-10 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Linh hoạt hơn</h3>
                <p className="text-sm text-gray-600">Đổi ngày bay với loại vé linh hoạt*</p>
              </div>
            </div>
          </div>
          <p className="max-w-6xl mx-auto text-xs text-gray-500 mt-8">*Một số chuyến bay có loại vé linh hoạt đi kèm phụ phí</p>
        </section>

        {/* Các chuyến bay hàng đầu */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Các chuyến bay hàng đầu từ Việt Nam</h2>
          <p className="text-gray-600 mb-6">Khám phá các điểm đến có thể đi từ Việt Nam và lên kế hoạch mới</p>
          
          <div className="flex gap-4 border-b border-gray-200 mb-8 overflow-x-auto pb-2">
            <button className="px-4 py-2 border rounded-full border-[#006ce4] text-[#006ce4] bg-blue-50 text-sm font-semibold whitespace-nowrap">Đường bay phổ biến</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-semibold whitespace-nowrap">Thành phố</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-semibold whitespace-nowrap">Quốc gia</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-semibold whitespace-nowrap">Vùng</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-semibold whitespace-nowrap">Sân bay</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
            {[
              'Đà Nẵng', 'TP. Hồ Chí Minh', 'Bangkok',
              'Phú Quốc', 'Kuta', 'Siem Reap',
              'Singapore', 'Tokyo', 'Kuala Lumpur'
            ].map(city => (
              <div key={city} className="flex items-center gap-4 group cursor-pointer">
                <img src={`https://picsum.photos/seed/${city}/64/64`} alt={city} className="w-16 h-16 rounded object-cover" />
                <span className="font-bold text-gray-900 group-hover:text-[#006ce4] transition">Hà Nội &rarr; {city}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Các câu hỏi thường gặp</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            {[
              'Làm sao để tìm các chuyến bay có giá rẻ nhất trên Booking.com?',
              'Tôi có thể đặt vé máy bay một chiều trên Booking.com không?',
              'Tôi có thể đặt chuyến bay trước bao lâu?',
              'Các chuyến bay có rẻ hơn khi càng gần ngày đi không?',
              'Vé linh hoạt là gì?',
              'Booking.com có tính phí khi dùng thẻ tín dụng không?'
            ].map((q, i) => (
              <div key={i} className="border-b border-gray-200 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                <span className="font-semibold text-gray-900">{q}</span>
                <ChevronDown className="text-gray-400" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
