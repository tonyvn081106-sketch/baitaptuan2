"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Calendar, Clock, Search } from 'lucide-react';
import Image from 'next/image';

export default function CarRentalPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[#003b95] text-white pt-16 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Thuê xe ô tô cho bất cứ loại chuyến đi nào</h1>
          <p className="text-xl md:text-2xl mb-8">Tiết kiệm lớn, hỗ trợ 24/7 và hủy miễn phí</p>
          
          {/* Search Box */}
          <div className="bg-yellow-400 p-1 rounded-lg">
            <div className="bg-white rounded p-4">
              <div className="flex items-center mb-4">
                <input type="checkbox" id="returnSameLocation" className="w-4 h-4 mr-2" defaultChecked />
                <label htmlFor="returnSameLocation" className="text-sm text-gray-800 font-semibold cursor-pointer">Trả xe tại cùng địa điểm</label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-1">
                <div className="md:col-span-5 relative flex items-center bg-white border-2 border-yellow-400 rounded p-3">
                  <MapPin className="text-gray-400 mr-2" size={24} />
                  <input type="text" placeholder="Địa điểm nhận xe" className="w-full outline-none text-gray-900 font-semibold" />
                </div>
                
                <div className="md:col-span-3 relative flex items-center bg-white border border-gray-300 rounded p-3">
                  <Calendar className="text-gray-400 mr-2" size={20} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-semibold">Ngày nhận</p>
                    <p className="text-gray-900 font-semibold text-sm">Hôm nay</p>
                  </div>
                  <Clock className="text-gray-400 ml-2" size={20} />
                  <p className="text-gray-900 font-semibold text-sm ml-1">10:00</p>
                </div>
                
                <div className="md:col-span-3 relative flex items-center bg-white border border-gray-300 rounded p-3">
                  <Calendar className="text-gray-400 mr-2" size={20} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-semibold">Ngày trả</p>
                    <p className="text-gray-900 font-semibold text-sm">Ngày mai</p>
                  </div>
                  <Clock className="text-gray-400 ml-2" size={20} />
                  <p className="text-gray-900 font-semibold text-sm ml-1">10:00</p>
                </div>
                
                <button className="md:col-span-1 bg-[#006ce4] hover:bg-blue-700 transition text-white font-bold rounded flex items-center justify-center py-3">
                  <Search size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Popular Brands */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-8">Các thương hiệu cho thuê xe phổ biến</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            <div className="text-2xl font-black italic text-gray-800">HERTZ</div>
            <div className="text-2xl font-extrabold text-red-600 tracking-tighter">AVIS</div>
            <div className="text-2xl font-bold text-green-700">Enterprise</div>
            <div className="text-2xl font-bold text-blue-800 italic">Alamo</div>
            <div className="text-2xl font-bold text-yellow-600">Budget</div>
            <div className="text-2xl font-black text-gray-900 tracking-widest">SIXT</div>
          </div>
        </section>

        {/* Info blocks */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚗</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Đa dạng lựa chọn</h3>
            <p className="text-gray-600 text-sm">Từ xe nhỏ gọn gọn gàng đến xe SUV rộng rãi cho gia đình.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Không phí ẩn</h3>
            <p className="text-gray-600 text-sm">Biết chính xác số tiền bạn phải trả. Không phí thẻ tín dụng.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎧</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Hỗ trợ khách hàng 24/7</h3>
            <p className="text-gray-600 text-sm">Chúng tôi luôn sẵn sàng hỗ trợ bạn bất kể khi nào và ở đâu.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
