import Link from "next/link";

export default function CTA() {
  return (
    /* Landmark semantic rõ ràng bằng thẻ <section> kết hợp aria-labelledby */
    <section 
      className="py-12 px-4 bg-white md:py-16 lg:py-20" 
      aria-labelledby="cta-heading"
    >
      {/* BẢO ĐẢM 3 BREAKPOINT HOẠT ĐỘNG:
        - Mobile (<=640px): flex-col (xếp dọc), p-6, text-center
        - Tablet (641px-1024px): sm:p-10, sm:text-center
        - Desktop (>=1025px): lg:flex-row (xếp ngang), lg:p-12, lg:text-left, justify-between
      */}
      <div className="max-w-5xl mx-auto bg-brand-primary text-white rounded-2xl p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center lg:justify-between gap-6 sm:gap-8 shadow-xl border border-green-700/10">
        
        {/* Khối nội dung chữ - Đảm bảo phân cấp Heading chuẩn cho SEO/A11y */}
        <div className="space-y-3 max-w-xl text-center lg:text-left">
          <h2 
            id="cta-heading" 
            className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight"
          >
            Tham gia ngay hôm nay
          </h2>
          <p className="text-green-100 text-sm sm:text-base leading-relaxed">
            Sẵn sàng chuyển đổi số cho mô hình của bạn? Nhấp vào nút bên phải để điền đầy đủ thông tin đăng ký giải pháp.
          </p>
        </div>

        {/* NÚT ĐĂNG KÝ CHUYỂN TRANG:
          - Đạt chuẩn A11y Contrast (Độ tương phản chữ trắng trên nền tối Slate-900 cực gắt)
          - Có trạng thái hover/focus order rõ ràng phục vụ người dùng dùng bàn phím (Tab)
        */}
        <Link 
          href="/register"
          className="w-full sm:w-auto inline-flex items-center justify-center bg-text-main text-white font-extrabold px-8 py-4 rounded-xl hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-white/40 active:scale-98 transition-all shadow-lg shrink-0 text-sm sm:text-base"
        >
          Đăng ký tại đây
        </Link>

      </div>
    </section>
  );
}