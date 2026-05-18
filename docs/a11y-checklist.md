# KẾT QUẢ TỰ RÀ SOÁT ACCESSIBILITY (A11Y) - TUẦN 2

Dự án đã được kiểm tra thủ công kết hợp công cụ quét tự động Lighthouse để đảm bảo khả năng tiếp cận tối đa.

## 1. Cấu trúc Landmark & Semantic HTML
- [x] Tiêu đề trang chính sử dụng thẻ `<h1>` độc nhất để định vị ngữ nghĩa cho Screen Reader.
- [x] Khối Hero, Tính năng, và Banner hành động được bọc tuần tự trong các thẻ `<section>` có thuộc tính định danh `aria-labelledby` trỏ trực tiếp vào ID tiêu đề.
- [x] Trang đăng ký thành viên được bọc trong thẻ `<main>` để làm rõ phân vùng nội dung cốt lõi của route.

## 2. Liên kết biểu mẫu (Form Accessibility)
- [x] Tất cả các thẻ `<label>` hiển thị đều có thuộc tính `htmlFor` kết nối tương ứng với thuộc tính `id` nằm trong các thẻ `<input>` và `<select>`.
- [x] Các trường bắt buộc nhập đều có thuộc tính `required` và ký tự đánh dấu trực quan cho người dùng.

## 3. Quản lý Focus & Tương tác bàn phím
- [x] Khai báo đầy đủ các class `focus:ring-4` hoặc `focus:underline` trên toàn bộ các nút bấm và thẻ liên kết điều hướng, giúp hiển thị viền bọc rõ ràng khi người dùng điều khiển bằng phím Tab.