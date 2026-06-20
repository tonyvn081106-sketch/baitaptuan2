"use client";

import { useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.forgotPassword(email);
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.resetPassword({ email, code, newPassword });
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Mã xác thực không hợp lệ hoặc đã hết hạn.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[440px] bg-white p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        
        {step === 1 && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quên mật khẩu</h2>
              <p className="text-sm text-gray-600">
                Nhập email của bạn, chúng tôi sẽ gửi mã xác thực để đặt lại mật khẩu.
              </p>
            </div>
            {error && <div className="mb-4 text-sm text-red-500 bg-red-50 p-3 rounded">{error}</div>}
            <form onSubmit={handleSendCode}>
              <div className="relative mb-8">
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
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-[#f3f4f6] text-gray-400 font-semibold py-3.5 rounded-full hover:bg-[#e5e7eb] hover:text-gray-600 transition-colors disabled:opacity-70 border border-gray-200"
                style={email ? { backgroundColor: '#2b7dfa', color: 'white', borderColor: '#2b7dfa' } : {}}
              >
                {loading ? 'Đang gửi...' : 'Gửi mã xác thực'}
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
              <Link href="/login" className="font-medium text-[#2b7dfa] hover:underline">Quay lại Đăng nhập</Link>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Nhập mã xác thực</h2>
              <p className="text-sm text-gray-600">
                Mã xác thực đã được gửi cho email <strong>{email}</strong> (Vui lòng xem trong Terminal của Server).
              </p>
            </div>
            {error && <div className="mb-4 text-sm text-red-500 bg-red-50 p-3 rounded">{error}</div>}
            <form onSubmit={handleResetPassword}>
              <div className="relative mb-5">
                <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">Mã OTP (6 số)</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3.5 outline-none focus:border-[#2b7dfa] transition-colors text-gray-900 bg-white tracking-widest text-lg font-mono text-center"
                  placeholder="••••••"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="relative mb-8">
                <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">Mật khẩu mới</label>
                <input
                  type="password"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3.5 outline-none focus:border-[#2b7dfa] transition-colors text-gray-900 bg-white"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !code || !newPassword}
                className="w-full bg-[#f3f4f6] text-gray-400 font-semibold py-3.5 rounded-full hover:bg-[#e5e7eb] hover:text-gray-600 transition-colors disabled:opacity-70 border border-gray-200"
                style={code && newPassword ? { backgroundColor: '#2b7dfa', color: 'white', borderColor: '#2b7dfa' } : {}}
              >
                {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
              </button>
            </form>
          </>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Đổi mật khẩu thành công!</h2>
            <p className="text-sm text-gray-600 mb-8">
              Mật khẩu của bạn đã được cập nhật. Bây giờ bạn có thể đăng nhập bằng mật khẩu mới.
            </p>
            <Link href="/login" className="block w-full bg-[#2b7dfa] text-white font-semibold py-3.5 rounded-full hover:bg-blue-600 transition-colors border border-[#2b7dfa]">
              Đăng nhập ngay
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
