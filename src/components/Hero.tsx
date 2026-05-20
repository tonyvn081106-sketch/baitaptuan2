export default function Hero() {
  return (
    <section 
      className="py-12 md:py-20 lg:py-24 px-4 text-center bg-brand-bg border-b border-slate-100" 
      aria-labelledby="hero-heading"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* ĐÃ SỬA: Bỏ md:whitespace-nowrap, thêm max-w-4xl để tự động ngắt dòng mượt mà */}
        <h1 
          id="hero-heading" 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-main tracking-tight md:tracking-normal max-w-4xl mx-auto leading-tight"
        >
          Nông nghiệp công nghệ cao
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg text-text-body max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
          Giải pháp thông minh giúp tăng năng suất và phát triển bền vững dựa trên nền tảng dữ liệu số thời gian thực.
        </p>
        
        <div className="pt-2">
          <a 
            href="#features"
            className="inline-flex items-center justify-center bg-brand-primary text-white font-bold px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl hover:bg-brand-dark shadow-md hover:shadow-lg transition-all outline-none focus:ring-4 focus:ring-green-200 text-sm sm:text-base cursor-pointer"
          >
            Bắt đầu ngay
          </a>
        </div>
      </div>
    </section>
  );
}