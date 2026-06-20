"use client";

import { useState } from 'react';
import { useLogin } from '@/hooks/useAuth';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[440px] bg-white p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Đăng nhập hoặc tạo tài khoản</h2>
          <p className="text-sm text-gray-600">
            Đăng ký miễn phí hoặc đăng nhập để nhận những ưu đãi và quyền lợi tuyệt vời!
          </p>
        </div>



        <form onSubmit={handleSubmit}>
          <div className="relative mb-5">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">Email</label>
            <input
              type="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3.5 outline-none focus:border-[#2b7dfa] transition-colors text-gray-900 bg-white"
              placeholder="id@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative mb-2">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">Mật khẩu</label>
            <input
              type="password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3.5 outline-none focus:border-[#2b7dfa] transition-colors text-gray-900 bg-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end mb-6">
            <Link href="/forgot-password" className="text-sm font-medium text-[#2b7dfa] hover:underline">
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#f3f4f6] text-gray-400 font-semibold py-3.5 rounded-full hover:bg-[#e5e7eb] hover:text-gray-600 transition-colors disabled:opacity-70 border border-gray-200"
            style={email && password ? { backgroundColor: '#2b7dfa', color: 'white', borderColor: '#2b7dfa' } : {}}
          >
            {isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>



        <div className="mt-8 text-center text-xs text-gray-500 leading-relaxed">
          Bằng việc đăng nhập, tôi đồng ý với <a href="#" className="text-[#2b7dfa] hover:underline">Điều khoản sử dụng</a> và <a href="#" className="text-[#2b7dfa] hover:underline">Chính sách bảo mật</a> của Agoda.
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          Chưa có tài khoản? <Link href="/register" className="font-medium text-[#2b7dfa] hover:underline">Đăng ký</Link>
        </div>
      </div>
    </div>
  );
}
