import Link from "next/link";

export default function CTA() {
  return (
    <section 
      className="py-12 px-4 bg-white md:py-16 lg:py-20" 
      aria-labelledby="cta-heading"
    >
      {/*
        - text-white của khối thành text-slate-900 để tương phản tốt trên nền Emerald sáng.
        - Chuyển text-green-100 của đoạn mô tả thành text-slate-700 để dễ đọc hơn, không hại mắt.
      */}
      <div className="max-w-5xl mx-auto bg-brand-primary text-slate-900 rounded-2xl p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center lg:justify-between gap-6 sm:gap-8 shadow-xl border border-emerald-500/10">
        
        <div className="space-y-3 max-w-xl text-center lg:text-left">
          <h2 
            id="cta-heading" 
            className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-slate-950"
          >
            Tham gia ngay hôm nay
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            Sẵn sàng chuyển đổi số cho mô hình của bạn? Nhấp vào nút bên phải để điền đầy đủ thông tin đăng ký giải pháp.
          </p>
        </div>

        {/*
          - bg-text-main thành bg-slate-900 để nút hiển thị khối đen sắc nét, nổi bật hoàn toàn.
          - focus:ring-white/40 thành focus:ring-slate-900/20 cho hợp ngữ cảnh nền sáng.
        */}
        <Link 
          href="/register"
          className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-900 text-white font-extrabold px-8 py-4 rounded-xl hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/20 active:scale-98 transition-all shadow-lg shrink-0 text-sm sm:text-base"
        >
          Đăng ký tại đây
        </Link>

      </div>
    </section>
  );
}