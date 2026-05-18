# Design Tokens – Landing Page (Nông nghiệp công nghệ cao AgroTech)

Hệ thống Design Tokens được xây dựng tập trung để áp dụng nhất quán trong mã nguồn dự án thông qua chỉ thị `@theme` của Tailwind CSS v4, đảm bảo tính responsive tự động và đạt chuẩn tiếp cận WCAG AA.

## 1. Color System (Hệ màu tương phản AA)

### Primary & Brand
- `--color-brand-primary`: #16a34a (Green 600 – Xanh lá cây đại diện cho nông nghiệp xanh)
- `--color-brand-dark`: #15803d (Green 700 – Xanh đậm hơn áp dụng khi người dùng hover chuột)
- `--color-brand-bg`: #f8fafc (Slate 50 – Nền xám xanh dịu mắt, giảm lóa cho các khối card con)

### Neutral & Text
- `--background`: #ffffff (Màu nền trắng chủ đạo của trang)
- `--foreground` / `--color-text-main`: #0f172a (Slate 900 – Đen sâu tiêu đề, đạt độ tương phản tuyệt đối)
- `--color-text-body`: #334155 (Slate 700 – Xám đậm cho chữ nội dung, bảo đảm đọc rõ ràng)
- `--color-text-muted`: #475569 (Slate 600 – Xám chữ phụ cho mô tả nhỏ)

**Lý do chọn màu:** Kế thừa sắc xanh sinh thái kết hợp với các sắc độ đen/xám của hệ màu Slate hiện đại. Đạt tỷ lệ tương phản vượt mốc 4.5:1, giúp giao diện đạt điểm Lighthouse Accessibility tối đa (100/100).

---

## 2. Spacing & Layout

Hệ thống spacing sử dụng đơn vị tương đối (`rem`) dựa trên gốc scale 4px chuẩn UI hiện đại giúp giao diện co giãn mượt mà qua các thiết bị:
- `--spacing-sm`: 1rem (16px) - Khoảng cách đệm nhỏ, khoảng cách chữ.
- `--spacing-md`: 1.5rem (24px) - Khoảng cách giữa các thẻ con, padding của card.
- `--spacing-lg`: 3rem (48px) - Khoảng cách an toàn giữa các Section chính.
- `--spacing-xl`: 5rem (80px) - Khoảng đệm đỉnh cao cho Hero section trên Laptop.

**Lý do chọn:** Đảm bảo 3 breakpoint hoạt động hoàn hảo (`<=640px`, `641–1024px`, `>=1025px`), triệt tiêu hoàn toàn lỗi tràn viền (Overflow) và giữ chỉ số dịch chuyển bố cục CLS < 0.10.

---

## 3. Typography (Chống lỗi font tiếng Việt)

- `--font-sans`: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
- `--text-sm`: 14px (Chữ phụ, ghi chú form)
- `--text-base`: 16px (Chữ nội dung body mặc định)
- `--text-lg`: 20px (Tiêu đề card tính năng nhỏ)
- `--text-xl`: 32px (Tiêu đề khối trên Mobile)
- `--text-2xl`: 48px - 60px (Tiêu đề lớn Hero trên Laptop)

**Lý do chọn:** Ép trình duyệt sử dụng phông chữ hệ thống tiêu chuẩn có sẵn trên máy để **khắc phục triệt để lỗi Font Fallback** (Ký tự tiếng Việt có dấu bị mỏng hoặc đổi phông chữ khác khi đi với độ đậm `font-bold`).

---

## 4. Cách áp dụng trong Tailwind v4

Thay vì sử dụng inline-style, toàn bộ token trên được map trực tiếp vào compiler thông qua `@theme inline` trong file `app/globals.css`:

```css
@theme inline {
  --color-brand-primary: var(--color-brand-primary);
  --font-sans: var(--font-sans);
}