export default function Features() {
  const featureList = [
    { title: "AI nông nghiệp", desc: "Ứng dụng trí tuệ nhân tạo để tối ưu hóa chu kỳ sản xuất và dự báo rủi ro thiên tai." },
    { title: "Tăng năng suất", desc: "Sử dụng công nghệ cảm biến sinh học để tối ưu hóa quy trình và tăng sản lượng trang trại." },
    { title: "Phát triển bền vững", desc: "Giải pháp xanh giúp giảm thiểu tác động môi trường, tiết kiệm tài nguyên nước." },
    { title: "Quản lý thông minh", desc: "Hệ thống dashboard trực quan giúp nông dân theo dõi và điều khiển từ xa qua di động." },
    { title: "Truy xuất nguồn gốc", desc: "Minh bạch hóa toàn bộ quy trình cung ứng từ hạt giống đến siêu thị bằng Blockchain." },
    { title: "Tưới nước tự động", desc: "Cảm biến đo độ ẩm đất chuẩn xác để tự động kích hoạt phun tưới nhỏ giọt." }
  ];

  return (
    <section 
      id="features" 
      className="py-12 md:py-20 lg:py-24 px-4 bg-white" 
      aria-labelledby="features-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          id="features-heading" 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-text-main tracking-tight"
        >
          Tính năng nổi bật
        </h2>
        
        {/* SỬA LẠI GRID LAYOUT ĐÁP ỨNG CHUẨN 3 BREAKPOINT:
            - Mặc định ở mobile: grid-cols-1 (1 cột đứng), gap-4 để không bị thưa quá
            - Tablet (sm trở lên): sm:grid-cols-2, sm:gap-6
            - Desktop (lg trở lên): lg:grid-cols-3
        */}
        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {featureList.map((item, index) => (
            <div 
              key={index} 
              className="p-5 sm:p-6 bg-slate-50 rounded-xl border border-slate-200/60 hover:bg-white hover:border-brand-primary/40 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="font-bold text-lg sm:text-xl text-text-main break-words">
                {item.title}
              </h3>
              <p className="text-text-muted mt-2 sm:mt-3 text-xs sm:text-sm md:text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}