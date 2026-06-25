"use client";

import Link from 'next/link';
import { BedDouble, MapPin, User, LogOut } from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

function HeaderContent() {
  const [user, setUser] = useState<{ email: string, id: string, name?: string, role?: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState('Trang chủ');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname === '/') {
      setActiveCategory('Trang chủ');
    } else if (pathname === '/search') {
      const branch = searchParams.get('branch');
      if (branch) {
        setActiveCategory(branch);
      } else {
        setActiveCategory('');
      }
    } else {
      setActiveCategory('');
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <header className="bg-[#003b95] text-white">
      {/* Top Nav */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          HomeStay Hà Nội
        </Link>
        <div className="flex items-center space-x-6 text-sm font-medium">
          <div className="hidden md:flex items-center space-x-2">
            <button className="hover:bg-white/10 px-3 py-2 rounded font-semibold transition">VND</button>
            <button className="hover:bg-white/10 px-3 py-2 rounded font-semibold transition text-lg">🇻🇳</button>
            <button className="hover:bg-white/10 p-2 rounded-full transition" title="Hỗ trợ khách hàng">
              <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center font-bold text-sm">?</div>
            </button>
            <Link href="/host" className="hover:bg-white/10 px-3 py-2 rounded font-semibold transition">Đăng chỗ nghỉ của Quý vị</Link>
          </div>
          {user ? (
            <div className="flex items-center space-x-4">
              {user.role === 'ADMIN' && (
                <Link href="/admin/dashboard" className="flex items-center space-x-2 bg-yellow-400 text-[#003b95] px-3 py-2 rounded font-bold hover:bg-yellow-500 transition">
                  <span>Trang Quản Trị</span>
                </Link>
              )}
              <Link href="/dashboard" className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-full cursor-pointer hover:bg-white/20 transition">
                <div className="bg-white text-[#003b95] rounded-full p-1">
                  <User size={16} />
                </div>
                <span className="font-semibold">{user.name || user.email.split('@')[0]}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-white text-[#003b95] px-4 py-2 rounded font-semibold hover:bg-gray-100 transition"
              >
                <LogOut size={16} />
                <span>Đăng xuất</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/register" className="bg-white text-[#003b95] px-4 py-2 rounded font-semibold hover:bg-gray-100 transition">
                Đăng ký
              </Link>
              <Link href="/login" className="bg-white text-[#003b95] px-4 py-2 rounded font-semibold hover:bg-gray-100 transition">
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 pb-4 overflow-x-auto">
        <div className="flex space-x-2">
          {[
            { id: 'Trang chủ', icon: BedDouble, href: '/' },
            { id: 'Cơ sở Hoàn Kiếm', icon: MapPin, href: '/search?branch=Cơ sở Hoàn Kiếm' },
            { id: 'Cơ sở Tây Hồ', icon: MapPin, href: '/search?branch=Cơ sở Tây Hồ' },
            { id: 'Cơ sở Cầu Giấy', icon: MapPin, href: '/search?branch=Cơ sở Cầu Giấy' },
          ].map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  if (category.href) router.push(category.href);
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition whitespace-nowrap ${
                  isActive
                    ? 'bg-white/20 border border-white'
                    : 'border border-transparent hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                <span>{category.id}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<header className="bg-[#003b95] text-white h-24"></header>}>
      <HeaderContent />
    </Suspense>
  );
}
