"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, BedDouble, Users, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role === 'ADMIN') {
          setIsAdmin(true);
        } else {
          router.push('/');
        }
      } catch (e) {
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Đang kiểm tra quyền...</div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#003b95] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
          <p className="text-sm text-gray-300 mt-1">HomeStay Hà Nội</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" className={`flex items-center space-x-3 px-4 py-3 rounded text-sm font-bold transition ${typeof window !== 'undefined' && window.location.pathname === '/admin/dashboard' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
            <BedDouble size={20} />
            <span>Quản lý Nhà & Phòng</span>
          </Link>
          <Link href="/admin/customers" className={`flex items-center space-x-3 px-4 py-3 rounded text-sm font-bold transition ${typeof window !== 'undefined' && window.location.pathname === '/admin/customers' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
            <Users size={20} />
            <span>Khách hàng đang ở</span>
          </Link>
          <Link href="/admin/settings" className={`flex items-center space-x-3 px-4 py-3 rounded text-sm font-bold transition ${typeof window !== 'undefined' && window.location.pathname === '/admin/settings' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
            <Settings size={20} />
            <span>Cài đặt hệ thống</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center space-x-3 bg-red-600 hover:bg-red-700 w-full px-4 py-3 rounded text-sm font-bold transition text-left text-white shadow-sm mt-4">
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Bảng điều khiển</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-bold text-gray-600">Xin chào, Super Admin</span>
            <div className="w-10 h-10 bg-[#003b95] rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
