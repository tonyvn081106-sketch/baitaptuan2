"use client";

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Trash2, X, Image as ImageIcon, CheckCircle, Home, ChevronDown, ChevronUp } from 'lucide-react';
import api from '@/lib/api';
import { useCreateRoom, useDeleteRoom } from '@/hooks/useRooms';
import Image from 'next/image';

export default function AdminDashboardPage() {
  const { data: rooms, isLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data } = await api.get('/rooms');
      return data;
    }
  });

  const { data: bookings } = useQuery({
    queryKey: ['adminDashboardBookings'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/bookings');
        return data;
      } catch (e) {
        return [];
      }
    }
  });

  const isOccupied = (roomId: string) => {
    if (!bookings) return false;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    return bookings.some((b: any) => {
      if (b.status === 'CANCELLED') return false;
      if (b.room?.id !== roomId && b.room_id !== roomId) return false;
      const checkIn = new Date(b.check_in_date);
      checkIn.setHours(0, 0, 0, 0);
      const checkOut = new Date(b.check_out_date);
      checkOut.setHours(0, 0, 0, 0);
      
      return now >= checkIn && now < checkOut;
    });
  };

  const createRoom = useCreateRoom();
  const deleteRoom = useDeleteRoom();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for creating a whole House
  const [formData, setFormData] = useState({
    house_name: '',
    destination: 'Cơ sở Hoàn Kiếm',
    description: 'Homestay thiết kế hiện đại, sạch sẽ, đầy đủ tiện nghi.',
  });
  
  const [selectedRooms, setSelectedRooms] = useState({
    single: { selected: true, name: 'Phòng Đơn', price: 400000, desc: 'Phòng nhỏ gọn, đầy đủ tiện nghi.', quantity: 1 },
    double: { selected: true, name: 'Phòng Đôi', price: 650000, desc: 'Phòng đôi thoáng đãng.', quantity: 1 },
    studio: { selected: false, name: 'Căn hộ Studio', price: 850000, desc: 'Có bếp nhỏ tiện lợi.', quantity: 1 },
    family: { selected: false, name: 'Phòng Gia Đình', price: 1200000, desc: 'Rộng rãi cho 4 người.', quantity: 1 },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  const [expandedHouses, setExpandedHouses] = useState<Record<string, boolean>>({});
  const [calendarModal, setCalendarModal] = useState<{ isOpen: boolean, room: any | null }>({ isOpen: false, room: null });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const groupedHouses = useMemo(() => {
    if (!rooms) return [];
    const grouped = rooms.reduce((acc: any, room: any) => {
      const houseName = room.house_name || 'HomeStay Hà Nội';
      if (!acc[houseName]) {
        acc[houseName] = {
          name: houseName,
          destination: room.destination,
          image: room.image_url,
          rooms: []
        };
      }
      acc[houseName].rooms.push(room);
      return acc;
    }, {});
    return Object.values(grouped);
  }, [rooms]);

  const totalPages = Math.ceil(groupedHouses.length / itemsPerPage);
  const paginatedHouses = groupedHouses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenModal = () => {
    setFormData({
      house_name: '',
      destination: 'Cơ sở Hoàn Kiếm',
      description: 'Homestay thiết kế hiện đại, sạch sẽ, đầy đủ tiện nghi.',
    });
    setSelectedRooms({
      single: { selected: true, name: 'Phòng Đơn', price: 400000, desc: 'Phòng nhỏ gọn, đầy đủ tiện nghi.', quantity: 1 },
      double: { selected: true, name: 'Phòng Đôi', price: 650000, desc: 'Phòng đôi thoáng đãng.', quantity: 1 },
      studio: { selected: false, name: 'Căn hộ Studio', price: 850000, desc: 'Có bếp nhỏ tiện lợi.', quantity: 1 },
      family: { selected: false, name: 'Phòng Gia Đình', price: 1200000, desc: 'Rộng rãi cho 4 người.', quantity: 1 },
    });
    setPreviewImage('');
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.house_name) {
      alert('Vui lòng nhập tên nhà!');
      return;
    }

    const roomsToCreate = Object.values(selectedRooms).filter(r => r.selected);
    if (roomsToCreate.length === 0) {
      alert('Vui lòng chọn ít nhất một loại phòng!');
      return;
    }

    try {
      // Execute multiple API calls to create each room type for this house
      const promises: Promise<any>[] = [];
      roomsToCreate.forEach((rt) => {
        const qty = rt.quantity || 1;
        for (let i = 0; i < qty; i++) {
          const data = new FormData();
          data.append('name', qty > 1 ? `${rt.name} ${i + 1}` : rt.name);
          data.append('room_number', `${formData.destination.charAt(6).toUpperCase()}-${Math.floor(Math.random() * 1000)}`);
          data.append('destination', formData.destination);
          data.append('house_name', formData.house_name);
          data.append('price', rt.price.toString());
          data.append('description', rt.desc);
          if (selectedFile) {
            data.append('image', selectedFile);
          }
          promises.push(createRoom.mutateAsync(data));
        }
      });

      await Promise.all(promises);
      alert(`Đã tạo thành công Nhà ${formData.house_name} với ${roomsToCreate.length} loại phòng!`);
      setIsModalOpen(false);
    } catch (error) {
      alert('Có lỗi xảy ra khi tạo nhà!');
    }
  };

  const handleDeleteHouse = async (house: any) => {
    if (confirm(`Bạn có chắc chắn muốn xoá toàn bộ Nhà "${house.name}" bao gồm ${house.rooms.length} hạng phòng?`)) {
      try {
        const promises = house.rooms.map((r: any) => deleteRoom.mutateAsync(r.id));
        await Promise.all(promises);
        alert('Đã xoá nhà thành công!');
      } catch (e) {
        alert('Có lỗi khi xoá nhà!');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý Nhà Homestay</h2>
        <button 
          onClick={handleOpenModal}
          className="bg-[#0071c2] text-white px-4 py-2 rounded flex items-center space-x-2 font-bold hover:bg-[#005999] transition shadow"
        >
          <Plus size={18} />
          <span>Thêm Nhà Mới</span>
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-10">Đang tải dữ liệu...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedHouses.map((house: any) => (
              <div key={house.name} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="relative h-48 bg-gray-100">
                  {house.image && (house.image.startsWith('http') || house.image.startsWith('/')) ? (
                    <Image src={house.image} alt={house.name} fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <Home size={40} />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button 
                      onClick={() => handleDeleteHouse(house)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow"
                      title="Xoá toàn bộ nhà này"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#003b95] mb-1">{house.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 flex items-center gap-1">
                    <span className="font-semibold text-gray-800">{house.destination}</span>
                  </p>
                  <div className="border-t border-gray-100 pt-4">

                  <button 
                    onClick={() => setExpandedHouses(prev => ({...prev, [house.name]: !prev[house.name]}))}
                    className="w-full flex justify-between items-center text-sm font-bold text-gray-700 mb-2 hover:text-[#0071c2] transition"
                  >
                    <span>Chi tiết {house.rooms.length} phòng:</span>
                    {expandedHouses[house.name] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  
                  {expandedHouses[house.name] && (() => {
                    return (
                      <ul className="space-y-2 mt-3 max-h-48 overflow-y-auto pr-1">
                        {house.rooms.map((r: any) => {
                          const occupied = isOccupied(r.id);
                          return (
                            <li key={r.id} className="text-sm flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100">
                              <span className="flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                  {occupied && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>}
                                  <span className={`relative inline-flex rounded-full h-3 w-3 ${occupied ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                </span>
                                <span className="font-medium text-gray-800">{r.name}</span>
                              </span>
                              <div className="flex items-center gap-3">
                                <span className={`text-xs font-bold ${occupied ? 'text-red-600' : 'text-green-600'}`}>
                                  {occupied ? 'Đang có khách' : 'Sẵn sàng'}
                                </span>
                                <button 
                                  onClick={() => setCalendarModal({ isOpen: true, room: r })}
                                  className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded transition font-medium"
                                >
                                  Xem lịch
                                </button>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  })()}
                </div>
                </div>
              </div>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-10 h-10 rounded font-bold transition flex items-center justify-center ${currentPage === idx + 1 ? 'bg-[#003b95] text-white shadow' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal Popup Create House */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
              <h3 className="text-xl font-bold text-[#003b95]">
                Thêm Nhà Homestay Mới
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="houseForm" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Tên Nhà (Homestay)</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Ví dụ: EmCii Homestay"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#0071c2] outline-none transition placeholder-gray-500"
                      value={formData.house_name}
                      onChange={e => setFormData({...formData, house_name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Cơ sở</label>
                    <select 
                      className="w-full text-gray-900 font-semibold border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-[#0071c2] outline-none bg-white"
                      value={formData.destination}
                      onChange={e => setFormData({...formData, destination: e.target.value})}
                    >
                      <option value="Cơ sở Hoàn Kiếm" className="text-gray-900">Cơ sở Hoàn Kiếm</option>
                      <option value="Cơ sở Tây Hồ" className="text-gray-900">Cơ sở Tây Hồ</option>
                      <option value="Cơ sở Cầu Giấy" className="text-gray-900">Cơ sở Cầu Giấy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Các hạng phòng có trong Nhà này</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(selectedRooms).map(([key, rt]) => (
                      <label key={key} className={`border p-3 rounded-lg flex items-start space-x-3 cursor-pointer transition ${rt.selected ? 'border-[#0071c2] bg-blue-50/50' : 'border-gray-200 hover:border-blue-300'}`}>
                        <input 
                          type="checkbox" 
                          className="mt-1 w-4 h-4 text-[#0071c2]"
                          checked={rt.selected}
                          onChange={(e) => setSelectedRooms({
                            ...selectedRooms,
                            [key]: { ...rt, selected: e.target.checked }
                          })}
                        />
                        <div className="flex-1">
                          <div className="font-bold text-gray-800">{rt.name}</div>
                          <div className="text-xs text-gray-500 mb-2">{rt.desc}</div>
                          <div className="flex space-x-2">
                            <input 
                              type="number" 
                              disabled={!rt.selected}
                              value={rt.price}
                              onChange={(e) => setSelectedRooms({
                                ...selectedRooms,
                                [key]: { ...rt, price: Number(e.target.value) }
                              })}
                              className="w-full text-sm font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 disabled:bg-gray-100 disabled:text-gray-500 outline-none placeholder-gray-500"
                              placeholder="Giá (VNĐ)"
                            />
                            <input 
                              type="number" 
                              min="1"
                              max="20"
                              disabled={!rt.selected}
                              value={rt.quantity}
                              onChange={(e) => setSelectedRooms({
                                ...selectedRooms,
                                [key]: { ...rt, quantity: Number(e.target.value) }
                              })}
                              className="w-16 text-center text-sm font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 disabled:bg-gray-100 disabled:text-gray-500 outline-none placeholder-gray-500"
                              title="Số lượng phòng"
                              placeholder="SL"
                            />
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Ảnh đại diện Nhà</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-40 h-28 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden bg-gray-50">
                      {previewImage ? (
                        <Image src={previewImage} alt="Preview" fill className="object-cover" />
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="text-gray-400 mx-auto mb-1" />
                          <span className="text-xs text-gray-500">Chưa có ảnh</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#0071c2] file:text-white hover:file:bg-[#005999] transition cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3 rounded-b-xl bg-white">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded font-bold hover:bg-gray-100 transition"
              >
                Huỷ bỏ
              </button>
              <button 
                form="houseForm"
                type="submit"
                disabled={createRoom.isPending}
                className="px-6 py-2 bg-[#0071c2] text-white rounded font-bold hover:bg-[#005999] transition shadow disabled:opacity-50"
              >
                {createRoom.isPending ? 'Đang tạo...' : 'Tạo Nhà mới'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Popup Calendar */}
      {calendarModal.isOpen && calendarModal.room && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
              <h3 className="text-xl font-bold text-[#003b95]">
                Lịch đặt phòng: {calendarModal.room.name}
              </h3>
              <button onClick={() => setCalendarModal({ isOpen: false, room: null })} className="text-gray-400 hover:text-gray-600 transition">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {(() => {
                const roomBookings = bookings?.filter((b: any) => 
                  (b.room?.id === calendarModal.room.id || b.room_id === calendarModal.room.id) &&
                  b.status !== 'CANCELLED'
                ).sort((a: any, b: any) => new Date(a.check_in_date).getTime() - new Date(b.check_in_date).getTime());

                if (!roomBookings || roomBookings.length === 0) {
                  return <div className="text-center text-gray-500 py-10">Phòng này chưa có lịch đặt nào sắp tới.</div>;
                }

                return (
                  <div className="space-y-4">
                    {roomBookings.map((b: any) => {
                      const checkIn = new Date(b.check_in_date);
                      const checkOut = new Date(b.check_out_date);
                      const now = new Date();
                      now.setHours(0,0,0,0);
                      const isPast = checkOut < now;
                      const isCurrent = checkIn <= now && checkOut > now;
                      
                      return (
                        <div key={b.id} className={`p-4 border rounded-lg ${isCurrent ? 'border-red-300 bg-red-50' : isPast ? 'border-gray-200 bg-gray-50 opacity-70' : 'border-[#0071c2]/30 bg-blue-50/30'}`}>
                          <div className="flex justify-between mb-2">
                            <span className="font-bold text-gray-800">{b.user?.name || 'Khách vãng lai'}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${b.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                              {b.status === 'PENDING' ? 'Chờ xác nhận' : 'Đã xác nhận'}
                            </span>
                          </div>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <div><span className="block text-xs text-gray-400">Nhận phòng</span> <b>{checkIn.toLocaleDateString('vi-VN')}</b></div>
                            <div><span className="block text-xs text-gray-400">Trả phòng</span> <b>{checkOut.toLocaleDateString('vi-VN')}</b></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
