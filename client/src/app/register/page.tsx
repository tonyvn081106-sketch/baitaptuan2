"use client";

import { useState } from 'react';
import { useRegister } from '@/hooks/useAuth';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('MALE');
  const [phone, setPhone] = useState('');
  const { mutate: registerUser, isPending } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser({ email, password, name, dob, gender, phone });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[440px] bg-white p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tạo tài khoản</h2>
          <p className="text-sm text-gray-600">
            Đăng ký miễn phí để nhận những ưu đãi và quyền lợi tuyệt vời!
          </p>
        </div>



        <form onSubmit={handleSubmit}>
          <div className="relative mb-5">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">Họ và tên</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3.5 outline-none focus:border-[#2b7dfa] transition-colors text-gray-900 bg-white"
              placeholder="Nguyen Van A"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          <div className="relative mb-5">
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

          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500 z-10">Ngày sinh</label>
              <DatePicker
                selected={dob ? new Date(dob) : null}
                onChange={(date: Date | null) => setDob(date ? date.toISOString().split('T')[0] : '')}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/MM/yyyy"
                className="w-full border border-gray-300 rounded-lg px-4 py-3.5 outline-none focus:border-[#2b7dfa] transition-colors text-gray-900 bg-white"
                placeholderText="DD/MM/YYYY"
                required
              />
            </div>

            <div className="relative flex-1">
              <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">Giới tính</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3.5 outline-none focus:border-[#2b7dfa] transition-colors bg-white text-gray-900"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
              </select>
            </div>
          </div>

          <div className="relative mb-8">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">Số điện thoại</label>
            <input
              type="tel"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3.5 outline-none focus:border-[#2b7dfa] transition-colors text-gray-900 bg-white"
              placeholder="0123 456 789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#f3f4f6] text-gray-400 font-semibold py-3.5 rounded-full hover:bg-[#e5e7eb] hover:text-gray-600 transition-colors disabled:opacity-70 border border-gray-200"
            style={email && password && name && dob && phone ? { backgroundColor: '#2b7dfa', color: 'white', borderColor: '#2b7dfa' } : {}}
          >
            {isPending ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500 leading-relaxed">
          Bằng việc đăng ký, tôi đồng ý với <a href="#" className="text-[#2b7dfa] hover:underline">Điều khoản sử dụng</a> và <a href="#" className="text-[#2b7dfa] hover:underline">Chính sách bảo mật</a> của Agoda.
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          Đã có tài khoản? <Link href="/login" className="font-medium text-[#2b7dfa] hover:underline">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
