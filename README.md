# 🌾 Hệ Thống Quản Lý Nông Nghiệp Công Nghệ Cao - AgroTech (Week 2)

Dự án Landing Page giới thiệu giải pháp nông nghiệp thông minh, tích hợp biểu mẫu kết nối dữ liệu thời gian thực và đăng ký tư vấn trực tuyến cho các chủ trang trại. Dự án được tối ưu hóa toàn diện về hiệu năng (Performance) và khả năng tiếp cận (Accessibility) theo chuẩn WCAG AA.

---

## 👥 Thành viên thực hiện
* **Họ và tên:** Lê Nguyễn Anh Minh
* **Mã sinh viên:** PH61630
* **Lớp / Khóa:** Phát triển phần mềm (Software Development) - FPT Polytechnic Hanoi
* **Vai trò trong Sprint 2:** Product Owner (PO) & Lead Developer

---

## 🛠️ Công nghệ sử dụng & Cấu trúc mã nguồn

* **Framework:** Next.js 16 (App Router) + React 19
* **Styling:** Tailwind CSS v4 (Cấu hình Design Tokens trực tiếp qua compiler `@theme`)

### Cấu trúc thư mục cốt lõi
```text
├── app/
│   ├── globals.css        # File CSS tổng gánh Tailwind v4, Design Tokens & Smooth Scroll
│   ├── layout.tsx         # Cấu hình RootLayout, dọn sạch cảnh báo scroll-behavior
│   ├── page.tsx           # Trang chính (Render tuần tự Hero -> Features -> CTA)
│   └── register/
│       └── page.tsx       # Route form đăng ký thành viên (Xử lý router chuyển hướng)
├── src/components/
│   ├── Hero.tsx           # Khối Hero (Chứa CTA phụ điều hướng cuộn mượt mà)
│   ├── Features.tsx       # Lưới tính năng (Grid Layout đáp ứng responsive 3 breakpoint)
│   └── CTA.tsx            # Khối Banner hành động kết nối biểu mẫu đăng ký
├── docs/
│   ├── a11y-checklist.md  # Tài liệu tự rà soát tiêu chuẩn tiếp cận người dùng
│   └── design-tokens.md   # Đặc tả hệ thống mã màu, khoảng cách và phông chữ
├── package.json           # Khai báo các scripts vận hành hệ thống (Bao gồm lệnh lhci)
└── README.md              # Tài liệu hướng dẫn và nghiệm thu dự án
📊 Các câu lệnh vận hành dự án (Scripts)Tại thư mục gốc của dự án, sử dụng các câu lệnh sau qua Terminal:
Cài đặt thư viện:Bash
npm install
Chạy môi trường phát triển (Local):Bash
npm run dev
Hệ thống khởi chạy tại địa chỉ: http://localhost:3000
Kiểm tra lỗi và đóng gói Production:Bash
npm run build
Chạy bản đóng gói sau khi build:Bash
npm run start
Khởi chạy tiến trình kiểm thử tự động Lighthouse CI:Bash
npm run lh
📱 Khả năng tương thích thiết bị (Responsive Breakpoints)Giao diện tuân thủ nghiêm ngặt tư duy Mobile-First, không sử dụng inline-style, tự động co giãn hoàn hảo qua 3 mốc kích thước yêu cầu:
Màn hình nhỏ (Mobile $\le$ 640px): 
Tiêu đề tự động ngắt dòng thông minh, form đăng ký thu gọn padding (p-5), bố cục chuyển về 1 cột dọc (flex-col, grid-cols-1) triệt tiêu lỗi tràn viền.
Màn hình trung bình (Tablet 641px - 1024px): Lưới tính năng tự động chia 2 cột (sm:grid-cols-2). Nút "Quay lại" trong form tự động nhảy về góc trái ngay ngắn.
Màn hình lớn (Laptop/Desktop $\ge$ 1025px): Khối Banner CTA mở rộng sang định dạng hàng ngang (lg:flex-row), lưới tính năng bung thành 3 cột tăm tắp (lg:grid-cols-3).
✅ Kết quả nghiệm thu tiêu chí chấp nhận (Week 2 Checklist)
[x] 3 Breakpoint hoạt động: Responsive mượt mà trên Mobile, Tablet và Laptop mà không bị vỡ hay tràn bố cục.
[x] Chỉ số Lighthouse đạt chuẩn siêu cao: Trang chính đạt điểm số lý tưởng khi quét ẩn danh (Performance $\ge$ 95, Accessibility = 100).
[x] Dịch chuyển bố cục (CLS < 0.10): Đạt mốc 0.00 tuyệt đối nhờ cơ chế thiết lập layout cứng cáp và xử lý thuộc tính data-scroll-behavior="smooth" chuẩn chỉ của Next.js.
[x] Semantic HTML & Landmark: Sử dụng chuẩn xác các thẻ <main>, <section> đi kèm aria-labelledby phục vụ tốt cho các công cụ Screen Reader đọc cấu trúc trang.
[x] Không lạm dụng Inline Style: Toàn bộ khoảng cách và màu sắc được điều khiển 100% bằng class tiện ích của Tailwind v4 được map từ hệ thống Design Tokens độc lập.
[x] Hồ sơ đính kèm đầy đủ: Đã bổ sung file rà soát docs/a11y-checklist.md và file tài liệu màu docs/design-tokens.md vào kho lưu trữ (Repo).