"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // 1. Hiện popup alert thông báo (Tiến trình dừng lại ở đây đợi người dùng tương tác)
    alert("Hệ thống đã ghi nhận thông tin đăng ký nông trại của bạn!");
    
    // 2. NGAY SAU KHI ẤN OK: Lệnh này sẽ kích hoạt để đá về trang chủ
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-brand-bg py-6 px-4 sm:py-12 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-5 sm:p-8 border border-slate-100 space-y-6">
        
        {/* Tiêu đề */}
        <div className="space-y-3 text-center relative flex flex-col items-center">
          <button 
            type="button"
            onClick={() => router.push("/")} 
            className="sm:absolute sm:left-0 sm:top-1 text-sm font-semibold text-brand-primary hover:text-brand-dark transition-colors mb-2 sm:mb-0 focus:outline-none focus:underline cursor-pointer"
          >
            ← Quay lại
          </button>
          
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-text-main tracking-tight pt-2 sm:pt-0">
            Đăng Ký Thành Viên
          </h1>
          <p className="text-text-muted text-xs sm:text-sm max-w-sm">
            Hệ thống quản lý Nông nghiệp Công nghệ cao AgroTech
          </p>
        </div>

        {/* Form liên kết với hàm handleSubmit */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* ... Các trường input (Họ tên, SĐT, Tên trang trại...) giữ nguyên như cũ của bạn ... */}
          <div className="space-y-1">
            <label htmlFor="fullname" className="block text-sm font-semibold text-text-body">
              Họ và tên chủ trang trại <span className="text-red-500">*</span>
            </label>
            <input
              id="fullname"
              type="text"
              required
              placeholder="Ví dụ: Nguyễn Văn A"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-text-main bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all text-sm"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="phone" className="block text-sm font-semibold text-text-body">
              Số điện thoại liên hệ <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              placeholder="Nhập số điện thoại..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-text-main bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all text-sm"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="farm-name" className="block text-sm font-semibold text-text-body">
              Tên tổ chức / Trang trại
            </label>
            <input
              id="farm-name"
              type="text"
              placeholder="Ví dụ: Hợp tác xã Xanh Việt"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-text-main bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all text-sm"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="farm-type" className="block text-sm font-semibold text-text-body">
              Mô hình canh sản xuất <span className="text-red-500">*</span>
            </label>
            <select
              id="farm-type"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-text-main bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all text-sm cursor-pointer"
            >
              <option value="">-- Chọn mô hình --</option>
              <option value="greenhouse">Nhà kính thông minh (Greenhouse)</option>
              <option value="hydroponics">Thủy canh công nghệ cao</option>
              <option value="open-field">Trang trại mở / Cây ăn quả số</option>
              <option value="livestock">Chăn nuôi tự động hóa</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="block text-sm font-semibold text-text-body">
              Yêu cầu tư vấn cụ thể
            </label>
            <textarea
              id="message"
              rows={3}
              placeholder="Nêu rõ diện tích nông trại hoặc vấn đề bạn đang gặp phải..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-text-main bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all text-sm resize-none"
            ></textarea>
          </div>

          {/* Nút gửi */}
          <button
            type="submit"
            className="w-full mt-2 bg-brand-primary text-white font-bold py-3.5 rounded-xl hover:bg-brand-dark transition-colors shadow-md outline-none focus:ring-4 focus:ring-green-100 cursor-pointer"
          >
            Gửi yêu cầu đăng ký
          </button>
        </form>

      </div>
    </main>
  );
}