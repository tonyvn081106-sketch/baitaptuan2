"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { X, Image as ImageIcon } from 'lucide-react';

const ROOM_TYPES = [
  { id: 'single', name: 'Phòng Đơn', desc: 'Phòng nhỏ gọn, đầy đủ tiện nghi.', defaultPrice: '400000' },
  { id: 'double', name: 'Phòng Đôi', desc: 'Phòng đôi thoáng đãng.', defaultPrice: '650000' },
  { id: 'studio', name: 'Căn hộ Studio', desc: 'Có bếp nhỏ tiện lợi.', defaultPrice: '850000' },
  { id: 'family', name: 'Phòng Gia Đình', desc: 'Rộng rãi cho 4 người.', defaultPrice: '1200000' },
];

const FACILITIES = [
  'Cơ sở Hoàn Kiếm',
  'Cơ sở Tây Hồ',
  'Cơ sở Cầu Giấy',
];

export default function HostPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [houseName, setHouseName] = useState('');
  const [facility, setFacility] = useState(FACILITIES[0]);
  
  const [selectedRooms, setSelectedRooms] = useState<Record<string, { price: string; quantity: string }>>({});
  
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleRoomToggle = (roomId: string, defaultPrice: string) => {
    setSelectedRooms(prev => {
      const newState = { ...prev };
      if (newState[roomId]) {
        delete newState[roomId];
      } else {
        newState[roomId] = { price: defaultPrice, quantity: '1' };
      }
      return newState;
    });
  };

  const handleRoomChange = (roomId: string, field: 'price' | 'quantity', value: string) => {
    setSelectedRooms(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        [field]: value
      }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Object.keys(selectedRooms).length === 0) {
      toast.error('Vui lòng chọn ít nhất một hạng phòng!');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Vui lòng đăng nhập để thực hiện chức năng này!');
        router.push('/login');
        return;
      }

      // Upload sequentially for each room type
      for (const roomId of Object.keys(selectedRooms)) {
        const roomTypeInfo = ROOM_TYPES.find(r => r.id === roomId);
        const roomData = selectedRooms[roomId];
        
        const data = new FormData();
        data.append('house_name', houseName);
        data.append('name', roomTypeInfo?.name || '');
        data.append('destination', facility);
        data.append('price', roomData.price);
        data.append('quantity', roomData.quantity);
        data.append('description', roomTypeInfo?.desc || '');
        if (imageFile) {
          data.append('image', imageFile);
        }

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/rooms`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });
      }

      toast.success('Đăng nhà Homestay thành công!');
      router.push('/');
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi đăng nhà Homestay');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white">
          <h1 className="text-xl font-bold text-[#003b95]">Thêm Nhà Homestay Mới</h1>
          <button 
            onClick={() => router.back()}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <form id="homestay-form" onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Tên Nhà (Homestay)</label>
                <input
                  required
                  type="text"
                  placeholder="Ví dụ: EmCii Homestay"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-[#003b95] transition text-gray-900 font-medium placeholder-gray-500"
                  value={houseName}
                  onChange={(e) => setHouseName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Cơ sở</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-[#003b95] transition bg-white text-gray-900 font-medium"
                  value={facility}
                  onChange={(e) => setFacility(e.target.value)}
                >
                  {FACILITIES.map(fac => (
                    <option className="text-gray-900 font-medium" key={fac} value={fac}>{fac}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700">Các hạng phòng có trong Nhà này</label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ROOM_TYPES.map((room) => {
                  const isSelected = !!selectedRooms[room.id];
                  
                  return (
                    <div 
                      key={room.id}
                      className={`border rounded-lg p-4 transition ${isSelected ? 'border-[#003b95] bg-blue-50/30' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id={room.id}
                          checked={isSelected}
                          onChange={() => handleRoomToggle(room.id, room.defaultPrice)}
                          className="mt-1 mr-3 h-4 w-4 text-[#003b95] rounded border-gray-300 focus:ring-[#003b95]"
                        />
                        <div className="flex-1">
                          <label htmlFor={room.id} className="font-bold text-gray-900 block cursor-pointer">
                            {room.name}
                          </label>
                          <p className="text-xs text-gray-500 mt-1">{room.desc}</p>
                          
                          <div className="mt-4 flex gap-3">
                            <input
                              type="number"
                              disabled={!isSelected}
                              value={selectedRooms[room.id]?.price || room.defaultPrice}
                              onChange={(e) => handleRoomChange(room.id, 'price', e.target.value)}
                              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded outline-none focus:border-[#003b95] text-gray-900 font-medium disabled:bg-gray-100 disabled:text-gray-400"
                              placeholder="Giá"
                            />
                            <input
                              type="number"
                              disabled={!isSelected}
                              min="1"
                              value={selectedRooms[room.id]?.quantity || '1'}
                              onChange={(e) => handleRoomChange(room.id, 'quantity', e.target.value)}
                              className="w-20 px-3 py-1.5 text-sm border border-gray-300 rounded outline-none focus:border-[#003b95] text-gray-900 font-medium disabled:bg-gray-100 text-center disabled:text-gray-400"
                              placeholder="SL"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Ảnh đại diện Nhà</label>
              <div className="flex items-center gap-4 border border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition">
                <div className="w-24 h-24 bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 overflow-hidden">
                  {imageFile ? (
                    <img src={URL.createObjectURL(imageFile)} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <>
                      <ImageIcon size={24} className="mb-2" />
                      <span className="text-[10px]">Chưa có ảnh</span>
                    </>
                  )}
                </div>
                
                <div className="flex-1 flex items-center">
                  <label className="cursor-pointer bg-[#0071c2] hover:bg-[#005999] text-white px-4 py-2 rounded font-bold text-sm transition shadow-sm">
                    Chọn tệp
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                  <span className="ml-3 text-sm text-gray-500">
                    {imageFile ? imageFile.name : 'Không có tệp nào được chọn'}
                  </span>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-end gap-3 rounded-b-lg">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-bold hover:bg-gray-50 transition"
          >
            Huỷ bỏ
          </button>
          <button
            type="submit"
            form="homestay-form"
            disabled={loading}
            className="px-6 py-2 bg-[#0071c2] text-white rounded-md font-bold hover:bg-[#005999] transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Đang xử lý...' : 'Tạo Nhà mới'}
          </button>
        </div>
      </div>
    </div>
  );
}
