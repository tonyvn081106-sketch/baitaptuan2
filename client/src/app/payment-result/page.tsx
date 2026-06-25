"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'success' | 'failed' | 'loading'>('loading');
  const [message, setMessage] = useState('Đang xử lý kết quả thanh toán...');

  useEffect(() => {
    const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
    
    if (vnp_ResponseCode) {
      if (vnp_ResponseCode === '00') {
        setStatus('success');
        setMessage('Giao dịch thanh toán thành công!'); 
      } else {
        setStatus('failed');
        setMessage(`Thanh toán thất bại hoặc đã bị hủy (Mã lỗi: ${vnp_ResponseCode})`);
      }
    } else {
      setStatus('failed');
      setMessage('Không tìm thấy thông tin thanh toán.');
    }
  }, [searchParams]);

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-16 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center shadow-md max-w-lg w-full">
        {status === 'loading' ? (
          <div className="text-4xl mb-4 animate-spin">⏳</div>
        ) : status === 'success' ? (
          <div className="text-6xl mb-4 text-green-500">✅</div>
        ) : (
          <div className="text-6xl mb-4 text-red-500">❌</div>
        )}
        
        <h2 className="text-2xl font-bold mb-4 text-[#003b95]">{message}</h2>
        
        {status === 'success' && (
          <p className="text-gray-600 mb-8">
            Cảm ơn bạn đã đặt phòng và thanh toán. Chủ nhà sẽ sớm liên hệ với bạn để xác nhận!
          </p>
        )}
        
        {status === 'failed' && (
          <p className="text-gray-600 mb-8">
            Vui lòng kiểm tra lại số dư thẻ hoặc liên hệ ngân hàng. Bạn có thể thanh toán lại trong mục Quản lý chuyến đi.
          </p>
        )}
        
        <div className="flex flex-col gap-3">
          <Link href="/dashboard">
            <button className="w-full bg-[#0071c2] text-white px-8 py-3 rounded font-bold hover:bg-[#005999] transition shadow">
              Quản lý chuyến đi
            </button>
          </Link>
          <Link href="/">
            <button className="w-full bg-gray-100 text-[#0071c2] px-8 py-3 rounded font-bold hover:bg-gray-200 transition">
              Trở về Trang chủ
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function PaymentResultPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Đang tải...</div>}>
        <PaymentResultContent />
      </Suspense>
      <Footer />
    </div>
  );
}
