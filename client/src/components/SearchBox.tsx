"use client";

import { BedDouble, Calendar, User, MapPin, ChevronDown, Plus, Minus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Import Vietnamese locale for date picker
import { vi } from 'date-fns/locale/vi';
registerLocale('vi', vi);

const BRANCHES = [
  "Cơ sở Hoàn Kiếm", "Cơ sở Tây Hồ", "Cơ sở Cầu Giấy", "Tất cả các cơ sở"
];

export default function SearchBox() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // States
  const [branch, setBranch] = useState('');
  const [isBranchOpen, setIsBranchOpen] = useState(false);

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [isDateOpen, setIsDateOpen] = useState(false);

  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [pets, setPets] = useState(false);
  const [isGuestOpen, setIsGuestOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // react-datepicker uses portals by default for popups, but we are using inline mode
      // So checking containerRef should be sufficient
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsBranchOpen(false);
        setIsDateOpen(false);
        setIsGuestOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openBranch = () => { setIsBranchOpen(true); setIsDateOpen(false); setIsGuestOpen(false); };
  const openDate = () => { setIsDateOpen(true); setIsBranchOpen(false); setIsGuestOpen(false); };
  const openGuest = () => { setIsGuestOpen(true); setIsBranchOpen(false); setIsDateOpen(false); };

  const handleSearch = () => {
    setIsBranchOpen(false);
    setIsDateOpen(false);
    setIsGuestOpen(false);
    
    if (branch.trim() && branch !== 'Tất cả các cơ sở') {
      router.push(`/search?branch=${encodeURIComponent(branch.trim())}`);
    } else {
      router.push('/search');
    }
  };

  const handleSelectBranch = (selected: string) => {
    setBranch(selected);
    setIsBranchOpen(false);
    openDate(); // auto move to next step
  };

  const formatDateRange = () => {
    if (!startDate && !endDate) return '';
    const startStr = startDate ? startDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
    const endStr = endDate ? endDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
    return `${startStr} — ${endStr}`;
  };

  const formatGuests = () => {
    return `${adults} người lớn · ${childrenCount} trẻ em · ${rooms} phòng`;
  };

  return (
    <div ref={containerRef} className="bg-[#febb02] p-1 rounded-lg w-full max-w-6xl mx-auto flex flex-col md:flex-row shadow-lg relative z-50">
      
      {/* 1. Branch Input */}
      <div className={`relative flex-1 flex items-center bg-white rounded md:rounded-r-none md:rounded-l p-2 md:p-0 mb-1 md:mb-0 md:mr-1 transition-all ${isBranchOpen ? 'ring-2 ring-[#0071c2] z-10' : ''}`}>
        <BedDouble size={24} className="text-gray-400 mx-3" />
        <input 
          type="text" 
          placeholder="Chọn cơ sở HomeStay?" 
          className="w-full h-10 outline-none text-gray-900 placeholder-gray-500 font-medium bg-transparent cursor-pointer"
          value={branch}
          readOnly
          onClick={openBranch}
        />
        {/* Branch Dropdown */}
        {isBranchOpen && (
          <div className="absolute top-[110%] left-0 w-[350px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2">
            <h4 className="text-xs font-bold text-gray-500 uppercase px-4 py-2">Danh sách cơ sở</h4>
            <ul className="max-h-64 overflow-y-auto">
              {BRANCHES.map((b) => (
                <li 
                  key={b} 
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3 transition"
                  onClick={() => handleSelectBranch(b)}
                >
                  <MapPin size={20} className="text-gray-500" />
                  <div>
                    <div className="font-bold text-gray-800">{b}</div>
                    <div className="text-xs text-gray-500">{b === 'Tất cả các cơ sở' ? 'Mọi khu vực' : 'Hà Nội'}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* 2. Date Input */}
      <div className={`relative flex-1 flex items-center bg-white rounded md:rounded-none p-2 md:p-0 mb-1 md:mb-0 md:mr-1 transition-all ${isDateOpen ? 'ring-2 ring-[#0071c2] z-10' : ''}`}>
        <Calendar size={24} className="text-gray-400 mx-3" />
        <input 
          type="text" 
          placeholder="Nhận phòng — Trả phòng" 
          className="w-full h-10 outline-none text-gray-900 placeholder-gray-500 font-medium cursor-pointer bg-transparent"
          value={formatDateRange()}
          readOnly
          onClick={openDate}
        />
        
        {/* DatePicker Dropdown */}
        {isDateOpen && (
          <div className="absolute top-[110%] left-0 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden" style={{ width: 'max-content' }}>
            <div className="flex border-b">
              <button className="flex-1 py-3 font-bold text-[#0071c2] border-b-2 border-[#0071c2]">Lịch</button>
              <button className="flex-1 py-3 text-gray-600 hover:bg-gray-50 font-medium">Ngày linh hoạt</button>
            </div>
            <div className="p-4">
              <DatePicker
                selected={startDate}
                onChange={(update) => {
                  setDateRange(update);
                  if (update[0] && update[1]) {
                    // Both selected, wait a bit then close or move to next
                    setTimeout(() => openGuest(), 300);
                  }
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                monthsShown={2}
                minDate={new Date()}
                locale="vi"
                className="booking-datepicker"
              />
            </div>
            {/* Custom Footer */}
            <div className="p-4 border-t flex flex-wrap gap-2 items-center bg-gray-50">
              <button className="border-2 border-[#0071c2] text-[#0071c2] font-bold rounded-full px-4 py-1.5 text-sm bg-blue-50">Ngày chính xác</button>
              <button className="border border-gray-300 text-gray-700 font-bold rounded-full px-4 py-1.5 text-sm hover:bg-gray-100 flex items-center gap-1"><Plus size={16}/> 1 ngày</button>
              <button className="border border-gray-300 text-gray-700 font-bold rounded-full px-4 py-1.5 text-sm hover:bg-gray-100 flex items-center gap-1"><Plus size={16}/> 2 ngày</button>
              <button className="border border-gray-300 text-gray-700 font-bold rounded-full px-4 py-1.5 text-sm hover:bg-gray-100 flex items-center gap-1"><Plus size={16}/> 3 ngày</button>
              <button className="border border-gray-300 text-gray-700 font-bold rounded-full px-4 py-1.5 text-sm hover:bg-gray-100 flex items-center gap-1"><Plus size={16}/> 7 ngày</button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Guests Input */}
      <div className={`relative flex-1 flex items-center bg-white rounded md:rounded-none p-2 md:p-0 mb-1 md:mb-0 md:mr-1 transition-all ${isGuestOpen ? 'ring-2 ring-[#0071c2] z-10' : ''}`}>
        <User size={24} className="text-gray-400 mx-3" />
        <div 
          className="w-full flex justify-between items-center h-10 cursor-pointer px-2 text-gray-900 font-medium"
          onClick={openGuest}
        >
          <span className="truncate">{formatGuests()}</span>
          <ChevronDown size={20} className="text-gray-500" />
        </div>
        
        {/* Guests Dropdown */}
        {isGuestOpen && (
          <div className="absolute top-[110%] left-0 w-[350px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-6">
            <div className="space-y-4 mb-6">
              {/* Adults */}
              <div className="flex justify-between items-center">
                <span className="font-bold">Người lớn</span>
                <div className="flex items-center gap-4 border border-gray-300 rounded p-1">
                  <button onClick={() => adults > 1 && setAdults(adults - 1)} className="text-[#0071c2] hover:bg-blue-50 p-1 disabled:text-gray-300" disabled={adults <= 1}>
                    <Minus size={20} />
                  </button>
                  <span className="w-4 text-center font-bold">{adults}</span>
                  <button onClick={() => setAdults(adults + 1)} className="text-[#0071c2] hover:bg-blue-50 p-1">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              
              {/* Children */}
              <div className="flex justify-between items-center">
                <span className="font-bold">Trẻ em</span>
                <div className="flex items-center gap-4 border border-gray-300 rounded p-1">
                  <button onClick={() => childrenCount > 0 && setChildrenCount(childrenCount - 1)} className="text-[#0071c2] hover:bg-blue-50 p-1 disabled:text-gray-300" disabled={childrenCount <= 0}>
                    <Minus size={20} />
                  </button>
                  <span className="w-4 text-center font-bold">{childrenCount}</span>
                  <button onClick={() => setChildrenCount(childrenCount + 1)} className="text-[#0071c2] hover:bg-blue-50 p-1">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              
              {/* Rooms */}
              <div className="flex justify-between items-center">
                <span className="font-bold">Phòng</span>
                <div className="flex items-center gap-4 border border-gray-300 rounded p-1">
                  <button onClick={() => rooms > 1 && setRooms(rooms - 1)} className="text-[#0071c2] hover:bg-blue-50 p-1 disabled:text-gray-300" disabled={rooms <= 1}>
                    <Minus size={20} />
                  </button>
                  <span className="w-4 text-center font-bold">{rooms}</span>
                  <button onClick={() => setRooms(rooms + 1)} className="text-[#0071c2] hover:bg-blue-50 p-1">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Pets Toggle */}
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Mang thú cưng đi cùng</span>
                <div 
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${pets ? 'bg-green-600' : 'bg-gray-300'}`}
                  onClick={() => setPets(!pets)}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${pets ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-1">Động vật trợ giúp không được xem là vật nuôi.</p>
              <a href="#" className="text-xs text-[#0071c2] hover:underline">Đọc thêm về chủ đề đi du lịch cùng động vật trợ giúp</a>
            </div>

            {/* Done Button */}
            <button 
              onClick={() => setIsGuestOpen(false)}
              className="w-full py-2 border-2 border-[#0071c2] text-[#0071c2] rounded font-bold hover:bg-blue-50 transition"
            >
              Xong
            </button>
          </div>
        )}
      </div>

      {/* 4. Search Button */}
      <button 
        onClick={handleSearch}
        className="bg-[#0071c2] hover:bg-[#005999] text-white font-bold text-xl px-8 py-3 rounded md:rounded-l-none md:rounded-r transition"
      >
        Tìm
      </button>
    </div>
  );
}
