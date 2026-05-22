"use client";

import { useState } from "react";

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section 
      className="relative py-space-md sm:py-space-lg px-4 text-center bg-neutral-light border-b border-neutral-muted/10 font-sans" 
      aria-labelledby="hero-heading"
    >
      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6 sm:mb-10 px-2 sm:px-4">
        <div className="text-3xl sm:text-4xl font-extrabold text-neutral-dark font-sans tracking-tight">
          BFD
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Mở menu điều hướng"
          className="p-2 sm:p-2.5 rounded-xl border-2 border-brand-primary text-neutral-dark hover:bg-brand-primary/10 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-state-focus shrink-0"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-18 sm:top-22 right-6 sm:right-8 w-44 sm:w-48 bg-neutral-surface rounded-xl shadow-xl border border-neutral-muted/10 p-2 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
          <a href="#features" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2.5 text-sm font-semibold text-neutral-dark hover:bg-neutral-light rounded-lg transition-colors">
            Tính năng
          </a>
          <a href="/register" className="block px-4 py-2.5 text-sm font-semibold text-neutral-dark hover:bg-neutral-light rounded-lg transition-colors">
            Đăng ký thành viên
          </a>
        </div>
      )}

      {/* --- HERO CONTENT --- */}
      <div className="max-w-3xl mx-auto space-y-space-sm pt-2 sm:pt-6 px-2">
        <h1 
          id="hero-heading" 
          /* TỐI ƯU QUYẾT ĐỊNH: Dùng text-xl cho mobile để text nằm gọn trên 2 dòng, giảm tối đa diện tích LCP. Lên màn hình lớn bung ra text-3xl theo đúng token */
          className="text-xl sm:text-3xl md:text-3xl font-extrabold text-neutral-dark tracking-tight leading-tight font-sans max-w-2xl mx-auto break-words"
        >
          Nông nghiệp công nghệ cao
        </h1>
        
        <p className="text-sm sm:text-base text-neutral-muted max-w-xl mx-auto leading-relaxed">
          Giải pháp thông minh giúp tăng năng suất và phát triển bền vững dựa trên nền tảng dữ liệu số thời gian thực.
        </p>
        
        <div className="pt-2">
          <a 
            href="#features"
            className="inline-flex items-center justify-center bg-brand-primary text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-xl hover:bg-brand-secondary shadow-md hover:shadow-lg transition-all outline-none focus:ring-4 focus:ring-brand-primary/20 text-sm sm:text-base cursor-pointer"
          >
            Bắt đầu ngay
          </a>
        </div>
      </div>
    </section>
  );
}