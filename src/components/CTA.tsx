import Link from "next/link";

export default function CTA() {
  return (
    <section 
      className="py-space-lg px-4 bg-neutral-surface" 
      aria-labelledby="cta-heading"
    >
      <div className="max-w-5xl mx-auto bg-brand-primary text-white rounded-2xl p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center lg:justify-between gap-6 sm:gap-8 shadow-xl border border-brand-primary/10">
        
        <div className="space-y-3 max-w-xl text-center lg:text-left">
          <h2 
            id="cta-heading" 
            className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white font-sans"
          >
            Tham gia ngay hôm nay
          </h2>
          <p className="text-white/90 text-base leading-relaxed font-medium">
            Sẵn sàng chuyển đổi số cho mô hình của bạn? Nhấp vào nút bên phải để điền đầy đủ thông tin đăng ký giải pháp.
          </p>
        </div>

        <Link 
          href="/register"
          className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-accent text-white font-extrabold px-8 py-4 rounded-xl hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-brand-accent/30 active:scale-98 transition-all shadow-lg shrink-0 text-base"
        >
          Đăng ký tại đây
        </Link>

      </div>
    </section>
  );
}