"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBox from '@/components/SearchBox';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 flex items-center justify-center min-h-[500px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero.jpg" 
            alt="Hero Background" 
            fill 
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#003b95]/80 via-[#003b95]/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-white w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-md">Đặt lịch HomeStay Hà Nội</h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-md">Không gian ấm cúng, trải nghiệm tuyệt vời giữa lòng thủ đô...</p>
        </div>
      </section>

      {/* Search Box */}
      <div className="px-4 relative z-20 -mt-10 mb-8">
        <div className="max-w-6xl mx-auto shadow-2xl rounded-xl bg-white p-2 border border-gray-100">
          <SearchBox />
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Why Choose Us */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Vì sao lại chọn HomeStay Hà Nội?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex items-start space-x-4">
              <div className="text-4xl">📝</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Đặt phòng dễ dàng</h3>
                <p className="text-gray-600 text-sm">Xác nhận ngay lập tức, thanh toán linh hoạt</p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex items-start space-x-4">
              <div className="text-4xl">👍</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Không gian ấm cúng</h3>
                <p className="text-gray-600 text-sm">Trang bị đầy đủ tiện nghi như chính ngôi nhà của bạn</p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex items-start space-x-4">
              <div className="text-4xl">🌍</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Vị trí trung tâm</h3>
                <p className="text-gray-600 text-sm">3 cơ sở đắc địa tại Hoàn Kiếm, Tây Hồ và Cầu Giấy</p>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Room Types */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Các hạng phòng của chúng tôi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="cursor-pointer group">
              <div className="relative h-48 rounded-lg overflow-hidden mb-2">
                <Image src="/images/room-single.jpg" alt="Phòng Đơn" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <h3 className="font-bold">Phòng Đơn (Single)</h3>
            </div>
            <div className="cursor-pointer group">
              <div className="relative h-48 rounded-lg overflow-hidden mb-2">
                <Image src="/images/room-double.jpg" alt="Phòng Đôi" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <h3 className="font-bold">Phòng Đôi (Double)</h3>
            </div>
            <div className="cursor-pointer group">
              <div className="relative h-48 rounded-lg overflow-hidden mb-2">
                <Image src="/images/room-studio.jpg" alt="Studio" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <h3 className="font-bold">Căn hộ Studio</h3>
            </div>
            <div className="cursor-pointer group">
              <div className="relative h-48 rounded-lg overflow-hidden mb-2">
                <Image src="/images/room-family.jpg" alt="Phòng Gia Đình" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <h3 className="font-bold">Phòng Gia Đình</h3>
            </div>
          </div>
        </section>

        {/* Explore Branches */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Các cơ sở của chúng tôi</h2>
            <p className="text-gray-600">Khám phá 3 cơ sở tiện nghi tọa lạc tại các vị trí đắc địa nhất Hà Nội</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/search?branch=Cơ sở Hoàn Kiếm" className="cursor-pointer group block">
              <div className="relative h-64 rounded-lg overflow-hidden mb-3">
                <Image src="/images/branch-hoankiem.jpg" alt="Cơ sở Hoàn Kiếm" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-xl">Cơ sở Hoàn Kiếm</h3>
                  <p className="text-sm text-white/80">Trung tâm phố cổ, cách hồ Gươm 5 phút</p>
                </div>
              </div>
            </Link>
            
            <Link href="/search?branch=Cơ sở Tây Hồ" className="cursor-pointer group block">
              <div className="relative h-64 rounded-lg overflow-hidden mb-3">
                <Image src="/images/branch-tayho.jpg" alt="Cơ sở Tây Hồ" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-xl">Cơ sở Tây Hồ</h3>
                  <p className="text-sm text-white/80">View hồ lộng gió, thiết kế hiện đại</p>
                </div>
              </div>
            </Link>
            
            <Link href="/search?branch=Cơ sở Cầu Giấy" className="cursor-pointer group block">
              <div className="relative h-64 rounded-lg overflow-hidden mb-3">
                <Image src="/images/branch-caugiay.jpg" alt="Cơ sở Cầu Giấy" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-xl">Cơ sở Cầu Giấy</h3>
                  <p className="text-sm text-white/80">Khu dân cư yên tĩnh, gần trung tâm thương mại</p>
                </div>
              </div>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
