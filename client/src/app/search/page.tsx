"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBox from '@/components/SearchBox';
import { useSearchRooms } from '@/hooks/useRooms';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const branch = searchParams.get('branch') || '';
  
  const { data: rooms, isLoading } = useSearchRooms(branch);

  const [expandedHouse, setExpandedHouse] = useState<string | null>(null);

  const housesArray = useMemo(() => {
    if (!rooms) return [];
    const grouped = rooms.reduce((acc: any, room: any) => {
      const houseName = room.house_name || 'HomeStay Hà Nội';
      if (!acc[houseName]) {
        acc[houseName] = {
          name: houseName,
          rooms: [],
          minPrice: room.price,
          destination: room.destination,
          image: room.image_url,
          rating: room.rating
        };
      }
      acc[houseName].rooms.push(room);
      if (room.price < acc[houseName].minPrice) {
        acc[houseName].minPrice = room.price;
      }
      return acc;
    }, {});
    return Object.values(grouped);
  }, [rooms]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      
      <div className="bg-[#003b95] pb-12 pt-4 px-4">
        <div className="max-w-6xl mx-auto">
          <SearchBox />
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded border border-gray-200">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Chọn lọc theo:</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="rounded text-[#0071c2]" />
                <span>Nhiều người đánh giá tốt</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="rounded text-[#0071c2]" />
                <span>Giá thấp nhất</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="rounded text-[#0071c2]" />
                <span>Gần trung tâm</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-bold mb-4">
            {branch ? `Tìm thấy ${housesArray.length} nhà tại: ${branch}` : `Tất cả các nhà (${housesArray.length})`}
          </h2>
          
          {isLoading ? (
            <div className="text-center py-10">Đang tìm kiếm...</div>
          ) : housesArray.length > 0 ? (
            housesArray.map((house: any) => {
              const isExpanded = expandedHouse === house.name;
              
              return (
                <div key={house.name} className="bg-white border border-gray-200 rounded shadow-sm hover:shadow-md transition overflow-hidden">
                  {/* House Header Card */}
                  <div 
                    className="p-4 flex flex-col md:flex-row gap-4 cursor-pointer"
                    onClick={() => setExpandedHouse(isExpanded ? null : house.name)}
                  >
                    <div className="relative w-full md:w-64 h-48 md:h-auto rounded overflow-hidden flex-shrink-0">
                      <Image 
                        src={house.image && (house.image.startsWith('http') || house.image.startsWith('/')) ? house.image : 'https://picsum.photos/seed/fallback/600/400'} 
                        alt={house.name} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 256px" 
                        className="object-cover" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-2xl font-bold text-[#0071c2]">{house.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">Tuyệt hảo</span>
                            <div className="bg-[#003b95] text-white font-bold p-1 rounded rounded-bl-none text-sm">{house.rating}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">{house.destination}</div>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          Homestay thiết kế hiện đại, sạch sẽ, đẩy đủ tiện nghi. Tọa lạc tại khu vực an ninh tốt, gần trung tâm và các điểm du lịch.
                        </p>
                        <div className="text-xs text-green-700 font-bold bg-green-50 inline-block px-2 py-1 rounded mb-2">
                          Miễn phí hủy • Thanh toán tại chỗ
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-end mt-4">
                        <div className="text-sm text-gray-700 font-medium">{house.rooms.length} hạng phòng đang trống</div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500 mb-1">Giá chỉ từ</div>
                          <div className="text-2xl font-bold text-gray-900 mb-2">{(house.minPrice || 0).toLocaleString('vi-VN')} VND</div>
                          <button className="flex items-center gap-1 bg-[#0071c2] text-white px-4 py-2 rounded font-bold hover:bg-[#005999] transition">
                            {isExpanded ? 'Đóng danh sách' : 'Xem các phòng trống'}
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rooms Accordion */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50 p-4">
                      <h4 className="font-bold text-lg mb-4 text-gray-800">Các hạng phòng tại {house.name}</h4>
                      <div className="space-y-4">
                        {house.rooms.map((room: any) => (
                          <div key={room.id} className="bg-white border border-gray-200 rounded p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="relative w-24 h-24 rounded overflow-hidden flex-shrink-0">
                                <Image 
                                  src={room.image_url && (room.image_url.startsWith('http') || room.image_url.startsWith('/')) ? room.image_url : 'https://picsum.photos/seed/fallback/600/400'} 
                                  alt={room.name} 
                                  fill 
                                  className="object-cover" 
                                />
                              </div>
                                <div>
                                  <h5 className="font-bold text-[#0071c2] text-lg mb-1">{room.name}</h5>
                                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{room.description}</p>
                                  
                                  {/* Cấu hình chi tiết phòng */}
                                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                    <span className="flex items-center gap-1">
                                      👤 {room.name.includes('Gia Đình') ? '4 người lớn' : room.name.includes('Đôi') || room.name.includes('Studio') ? '2 người lớn' : '1 người lớn'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      🛏️ {room.name.includes('Gia Đình') ? '2 giường đôi lớn' : room.name.includes('Đôi') ? '1 giường đôi cực lớn' : '1 giường đơn'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      📐 {room.name.includes('Gia Đình') ? '45m²' : room.name.includes('Studio') ? '35m²' : room.name.includes('Đôi') ? '25m²' : '15m²'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      🖼️ {room.name.includes('Studio') || room.name.includes('Gia Đình') ? 'View toàn cảnh thành phố' : 'View ban công thoáng mát'}
                                    </span>
                                  </div>
                                  
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded">Bao gồm bữa sáng</span>
                                    <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">Miễn phí hủy</span>
                                  </div>
                                </div>
                            </div>
                            <div className="text-right sm:border-l sm:pl-4 border-gray-200 min-w-[150px]">
                              <div className="text-xl font-bold mb-2">{(room.price || 0).toLocaleString('vi-VN')} đ</div>
                              <Link href={`/rooms/${room.id}`}>
                                <button className="w-full bg-[#0071c2] text-white px-3 py-2 rounded text-sm font-bold hover:bg-[#005999] transition">
                                  Đặt phòng này
                                </button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-white border border-gray-200 rounded">
              Không tìm thấy chỗ nghỉ nào phù hợp.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { Suspense } from 'react';
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100">Đang tải...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
