"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';
import Image from 'next/image';

export default function AttractionsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[#003b95] text-white pt-16 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Khám phá, trải nghiệm và tận hưởng</h1>
          <p className="text-xl md:text-2xl mb-8">Tìm và đặt vé các trải nghiệm, tour du lịch và hoạt động tốt nhất</p>
          
          {/* Search Box */}
          <div className="bg-yellow-400 p-1 rounded-lg max-w-4xl">
            <div className="bg-white rounded p-1 flex items-center">
              <div className="flex-1 relative flex items-center bg-white rounded p-2">
                <Search className="text-gray-400 mr-3 ml-2" size={24} />
                <input type="text" placeholder="Bạn muốn đi đâu?" className="w-full outline-none text-gray-900 text-lg font-semibold placeholder-gray-500" />
              </div>
              <button className="bg-[#006ce4] hover:bg-blue-700 transition text-white font-bold px-8 py-3 rounded text-lg">
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Top Destinations */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Điểm đến hàng đầu</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { name: 'Paris', tours: '1,234 tour và hoạt động' },
              { name: 'Rome', tours: '987 tour và hoạt động' },
              { name: 'London', tours: '1,500 tour và hoạt động' },
              { name: 'Tokyo', tours: '850 tour và hoạt động' },
              { name: 'Bangkok', tours: '640 tour và hoạt động' },
              { name: 'Hà Nội', tours: '320 tour và hoạt động' },
              { name: 'New York', tours: '1,100 tour và hoạt động' },
              { name: 'Dubai', tours: '730 tour và hoạt động' },
            ].map((dest) => (
              <div key={dest.name} className="relative h-64 rounded-xl overflow-hidden cursor-pointer group">
                <Image src={`https://picsum.photos/seed/${dest.name}/400/400`} alt={dest.name} fill className="object-cover group-hover:scale-110 transition duration-700" sizes="(max-width: 768px) 100vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-bold text-xl">{dest.name}</h3>
                  <p className="text-white/80 text-sm">{dest.tours}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Loại hoạt động</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { icon: '🏛️', name: 'Bảo tàng & Nghệ thuật' },
              { icon: '🎢', name: 'Công viên giải trí' },
              { icon: '🚢', name: 'Du thuyền' },
              { icon: '🚌', name: 'Tour tham quan' },
              { icon: '🍴', name: 'Ẩm thực' },
              { icon: '🎭', name: 'Show diễn' },
            ].map((cat) => (
              <div key={cat.name} className="border border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition">
                <div className="text-4xl mb-2">{cat.icon}</div>
                <h3 className="font-semibold text-sm">{cat.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
