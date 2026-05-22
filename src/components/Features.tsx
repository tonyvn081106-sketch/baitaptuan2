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
      className="py-space-lg px-4 bg-neutral-surface" 
      aria-labelledby="features-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          id="features-heading" 
          className="text-2xl sm:text-3xl md:text-2xl font-bold text-center text-neutral-dark tracking-tight font-sans"
        >
          Tính năng nổi bật
        </h2>
        
        <div className="mt-8 sm:mt-12 grid gap-space-sm grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {featureList.map((item, index) => (
            <div 
              key={index} 
              className="p-5 sm:p-6 bg-neutral-light rounded-xl border border-neutral-muted/10 hover:bg-neutral-surface hover:border-brand-primary shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="font-bold text-lg sm:text-xl text-neutral-dark break-words font-sans">
                {item.title}
              </h3>
              <p className="text-neutral-muted mt-2 sm:mt-3 text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}