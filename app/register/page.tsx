"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Xử lý thông báo và điều hướng mượt mà
    setTimeout(() => {
      alert("Hệ thống đã ghi nhận thông tin đăng ký nông trại của bạn!");
      router.push("/");
    }, 300);
  };

  return (
    <main className="min-h-screen bg-neutral-light py-space-md px-4 sm:py-space-lg flex items-center justify-center font-body">
      <div className="max-w-xl w-full bg-neutral-surface rounded-2xl shadow-xl p-5 sm:p-8 border border-neutral-muted/10 space-y-space-sm">
        
        {/* Khối điều hướng và tiêu đề */}
        <div className="space-y-2 text-center relative flex flex-col items-center">
          <button 
            type="button"
            onClick={() => router.push("/")} 
            aria-label="Quay lại trang chủ"
            className="sm:absolute sm:left-0 sm:top-1 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-state-focus focus:ring-offset-2 rounded-md cursor-pointer"
          >
            <span aria-hidden="true">←</span> Quay lại
          </button>
          
          <h1 className="text-xl sm:text-2xl md:text-2xl font-extrabold text-neutral-dark tracking-tight pt-2 sm:pt-0">
            Đăng Ký Thành Viên
          </h1>
          <p className="text-neutral-muted text-sm max-w-sm">
            Hệ thống quản lý Nông nghiệp Công nghệ cao AgroTech
          </p>
        </div>

        {/* Biểu mẫu đăng ký */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          
          <div className="space-y-space-xs">
            <label htmlFor="fullname" className="block text-sm font-semibold text-neutral-dark">
              Họ và tên chủ trang trại <span className="text-brand-accent" aria-hidden="true">*</span>
            </label>
            <input
              id="fullname"
              type="text"
              required
              aria-required="true"
              placeholder="Ví dụ: Nguyễn Văn A"
              className="w-full px-4 py-3 rounded-xl border border-neutral-muted/30 text-neutral-dark bg-neutral-light/50 focus:outline-none focus:ring-2 focus:ring-state-focus transition-all text-base"
            />
          </div>

          <div className="space-y-space-xs">
            <label htmlFor="phone" className="block text-sm font-semibold text-neutral-dark">
              Số điện thoại liên hệ <span className="text-brand-accent" aria-hidden="true">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              aria-required="true"
              pattern="[0-9]{10,11}"  
              placeholder="Nhập số điện thoại (10-11 số)..."
              className="w-full px-4 py-3 rounded-xl border border-neutral-muted/30 text-neutral-dark bg-neutral-light/50 focus:outline-none focus:ring-2 focus:ring-state-focus transition-all text-base"
            />
          </div>

          <div className="space-y-space-xs">
            <label htmlFor="farm-name" className="block text-sm font-semibold text-neutral-dark">
              Tên tổ chức / Trang trại
            </label>
            <input
              id="farm-name"
              type="text"
              placeholder="Ví dụ: Hợp tác xã Xanh Việt"
              className="w-full px-4 py-3 rounded-xl border border-neutral-muted/30 text-neutral-dark bg-neutral-light/50 focus:outline-none focus:ring-2 focus:ring-state-focus transition-all text-base"
            />
          </div>

          <div className="space-y-space-xs">
            <label htmlFor="farm-type" className="block text-sm font-semibold text-neutral-dark">
              Mô hình canh sản xuất <span className="text-brand-accent" aria-hidden="true">*</span>
            </label>
            <select
              id="farm-type"
              required
              aria-required="true"
              className="w-full px-4 py-3 rounded-xl border border-neutral-muted/30 text-neutral-dark bg-neutral-light/50 focus:outline-none focus:ring-2 focus:ring-state-focus transition-all text-base cursor-pointer"
            >
              <option value="">-- Chọn mô hình --</option>
              <option value="greenhouse">Nhà kính thông minh (Greenhouse)</option>
              <option value="hydroponics">Thủy canh công nghệ cao</option>
              <option value="open-field">Trang trại mở / Cây ăn quả số</option>
              <option value="livestock">Chăn nuôi tự động hóa</option>
            </select>
          </div>

          <div className="space-y-space-xs">
            <label htmlFor="message" className="block text-sm font-semibold text-neutral-dark">
              Yêu cầu tư vấn cụ thể
            </label>
            <textarea
              id="message"
              rows={3}
              placeholder="Nêu rõ diện tích nông trại hoặc vấn đề bạn đang gặp phải..."
              className="w-full px-4 py-3 rounded-xl border border-neutral-muted/30 text-neutral-dark bg-neutral-light/50 focus:outline-none focus:ring-2 focus:ring-state-focus transition-all text-base resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-brand-primary text-white font-bold py-3.5 rounded-xl hover:bg-brand-secondary focus:ring-4 focus:ring-brand-primary/20 transition-colors shadow-md outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-base"
          >
            {isSubmitting ? "Đang gửi dữ liệu..." : "Gửi yêu cầu đăng ký"}
          </button>
        </form>

      </div>
    </main>
  );
}