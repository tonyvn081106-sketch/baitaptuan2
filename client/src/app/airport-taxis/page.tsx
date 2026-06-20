"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Calendar, Users, ArrowLeftRight, ChevronDown } from 'lucide-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { vi } from 'date-fns/locale/vi';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('vi', vi);

export default function AirportTaxisPage() {
  const [taxiType, setTaxiType] = useState('roundtrip');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const [passengers, setPassengers] = useState(2);
  const [showPassengers, setShowPassengers] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      
      {/* Search Section */}
      <section className="bg-[#f5f5f5] pt-12 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-1">Đặt taxi sân bay</h1>
          <p className="text-gray-500 mb-6 text-sm">Dịch vụ đưa đón sân bay tiện lợi đến và từ chỗ nghỉ</p>
          
          {/* Trip type */}
          <div className="flex gap-6 mb-4">
            <label className="flex items-center gap-2 cursor-pointer text-gray-700 text-sm">
              <input type="radio" name="taxiType" checked={taxiType === 'oneway'} onChange={() => setTaxiType('oneway')} className="w-4 h-4 accent-[#006ce4]" />
              Một chiều
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-gray-700 text-sm">
              <input type="radio" name="taxiType" checked={taxiType === 'roundtrip'} onChange={() => setTaxiType('roundtrip')} className="w-4 h-4 accent-[#006ce4]" />
              Hai chiều
            </label>
          </div>
          
          {/* Search Box - Single Line with yellow border */}
          <div className="bg-yellow-400 p-1 rounded flex flex-col md:flex-row shadow-sm">
            
            {/* Locations Container */}
            <div className="flex-1 bg-white rounded-t md:rounded-l md:rounded-tr-none flex items-center relative py-2">
              <input type="text" placeholder="Nhập điểm đón" className="w-full pl-4 pr-8 outline-none text-gray-700 text-sm placeholder-gray-500 bg-transparent h-10" />
              
              {/* Swap Icon */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-6 h-6 items-center justify-center">
                <ArrowLeftRight size={14} className="text-gray-400" />
              </div>
              
              <input type="text" placeholder="Nhập điểm đến" className="w-full pl-8 pr-4 outline-none text-gray-700 text-sm placeholder-gray-500 bg-transparent h-10" />
            </div>

            <div className="hidden md:block w-1 h-full bg-yellow-400"></div>
            
            {/* Departure Date */}
            <div className="relative flex items-center bg-white px-4 py-2 border-t md:border-t-0 border-gray-200 cursor-pointer min-w-[220px]">
              <Calendar className="text-gray-500 mr-3" size={20} />
              <div className="flex-1 w-full">
                <DatePicker 
                  selected={startDate} 
                  onChange={(d) => setStartDate(d)} 
                  className="w-full outline-none text-gray-900 text-sm bg-transparent cursor-pointer"
                  dateFormat="EEEE dd, 'Tháng' M, HH:mm"
                  locale="vi"
                >
                  <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-[#f5f5f5]">
                    <span className="text-gray-900 text-sm">Giờ đón</span>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <select 
                          className="appearance-none bg-white border border-gray-300 rounded px-2 py-1 pr-6 text-sm outline-none cursor-pointer"
                          value={startDate ? startDate.getHours().toString().padStart(2, '0') : '12'}
                          onChange={(e) => {
                            if (startDate) {
                              const newDate = new Date(startDate);
                              newDate.setHours(parseInt(e.target.value));
                              setStartDate(newDate);
                            }
                          }}
                        >
                          {Array.from({length: 24}).map((_, i) => (
                            <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none" />
                      </div>
                      <div className="relative">
                        <select 
                          className="appearance-none bg-white border border-gray-300 rounded px-2 py-1 pr-6 text-sm outline-none cursor-pointer"
                          value={startDate ? startDate.getMinutes().toString().padStart(2, '0') : '00'}
                          onChange={(e) => {
                            if (startDate) {
                              const newDate = new Date(startDate);
                              newDate.setMinutes(parseInt(e.target.value));
                              setStartDate(newDate);
                            }
                          }}
                        >
                          {['00', '15', '30', '45'].map(m => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </DatePicker>
              </div>
            </div>

            <div className="hidden md:block w-1 h-full bg-yellow-400"></div>
            
            {/* Return Date (only if roundtrip) */}
            <div className={`relative flex items-center bg-white px-4 py-2 border-t md:border-t-0 border-gray-200 cursor-pointer min-w-[220px] ${taxiType === 'oneway' ? 'opacity-50 pointer-events-none' : ''}`}>
              <Calendar className="text-gray-500 mr-3" size={20} />
              <div className="flex-1 w-full">
                <DatePicker 
                  selected={endDate} 
                  onChange={(d) => setEndDate(d)} 
                  className="w-full outline-none text-gray-900 text-sm bg-transparent cursor-pointer"
                  dateFormat="EEEE dd, 'Tháng' M, HH:mm"
                  locale="vi"
                >
                  <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-[#f5f5f5]">
                    <span className="text-gray-900 text-sm">Giờ đón</span>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <select 
                          className="appearance-none bg-white border border-gray-300 rounded px-2 py-1 pr-6 text-sm outline-none cursor-pointer"
                          value={endDate ? endDate.getHours().toString().padStart(2, '0') : '12'}
                          onChange={(e) => {
                            if (endDate) {
                              const newDate = new Date(endDate);
                              newDate.setHours(parseInt(e.target.value));
                              setEndDate(newDate);
                            }
                          }}
                        >
                          {Array.from({length: 24}).map((_, i) => (
                            <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none" />
                      </div>
                      <div className="relative">
                        <select 
                          className="appearance-none bg-white border border-gray-300 rounded px-2 py-1 pr-6 text-sm outline-none cursor-pointer"
                          value={endDate ? endDate.getMinutes().toString().padStart(2, '0') : '00'}
                          onChange={(e) => {
                            if (endDate) {
                              const newDate = new Date(endDate);
                              newDate.setMinutes(parseInt(e.target.value));
                              setEndDate(newDate);
                            }
                          }}
                        >
                          {['00', '15', '30', '45'].map(m => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </DatePicker>
              </div>
            </div>

            <div className="hidden md:block w-1 h-full bg-yellow-400"></div>

            {/* Passengers */}
            <div 
              className="relative flex items-center bg-white px-4 py-2 border-t md:border-t-0 border-gray-200 cursor-pointer min-w-[80px] justify-between"
              onClick={() => setShowPassengers(!showPassengers)}
            >
              <div className="flex items-center">
                <Users className="text-gray-500 mr-2" size={18} />
                <span className="text-gray-900 text-sm font-semibold">{passengers}</span>
              </div>
              <ChevronDown className="text-gray-500" size={16} />
              
              {showPassengers && (
                <div 
                  className="absolute top-full left-0 md:left-auto md:right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-50 p-4" 
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Hành khách</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        className="w-8 h-8 rounded border border-[#006ce4] text-[#006ce4] flex items-center justify-center hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed font-bold"
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                        disabled={passengers <= 1}
                      >
                        -
                      </button>
                      <span className="w-4 text-center text-sm font-semibold text-gray-900">{passengers}</span>
                      <button 
                        className="w-8 h-8 rounded border border-[#006ce4] text-[#006ce4] flex items-center justify-center hover:bg-blue-50 font-bold"
                        onClick={() => setPassengers(passengers + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Search Button */}
            <button className="bg-[#006ce4] hover:bg-blue-700 transition text-white font-bold px-8 py-3 md:py-0 rounded-b md:rounded-r md:rounded-bl-none text-sm">
              Tìm kiếm
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Features Row */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-16">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 flex-shrink-0">
              <img src="https://cf.bstatic.com/static/img/taxi/illustration_flight_tracking/a9b8915b4bc7c3e5e4070a9dd36b4bc0a7d5718a.svg" alt="Theo dõi chuyến bay" className="w-full h-full object-contain" />
            </div>
            <div className="pt-2">
              <h3 className="font-bold text-gray-900 text-sm mb-1">Theo dõi chuyến bay</h3>
              <p className="text-gray-500 text-xs leading-relaxed">Tài xế vẫn sẽ theo dõi và đợi bạn dù<br/>chuyến bay có trễ</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 flex-shrink-0">
              <img src="https://cf.bstatic.com/static/img/taxi/illustration_trusted/66fa5a8553d71207e2c90bbfe59178bb094a475d.svg" alt="Được tin dùng" className="w-full h-full object-contain" />
            </div>
            <div className="pt-2">
              <h3 className="font-bold text-gray-900 text-sm mb-1">Được tin dùng</h3>
              <p className="text-gray-500 text-xs leading-relaxed">Chúng tôi hợp tác với các tài xế chuyên<br/>nghiệp và có cung cấp chăm sóc khách<br/>hàng 24/7</p>
            </div>
          </div>
        </div>

        {/* Account Banner */}
        <div className="mt-8 border-t border-gray-100 pt-10">
          <h2 className="text-2xl font-bold text-gray-900">Tài khoản và chuyến đi của bạn</h2>
        </div>
      </main>

      <Footer />
    </div>
  );
}
