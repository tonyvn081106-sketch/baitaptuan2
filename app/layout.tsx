import type { Metadata } from "next";
// Tải font trực tiếp qua cơ chế tối ưu hóa độc quyền của Next.js
import { Inter, Plus_Jakarta_Sans } from "next/font/google"; 
import "./globals.css"; 

// Cấu hình font Inter cho phần nội dung (Body)
const inter = Inter({
  subsets: ["vietnamese"],
  variable: "--font-body",
  display: "swap", // Tránh chặn render trang
});

// Cấu hình font Plus Jakarta Sans cho tiêu đề (Heading)
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["vietnamese"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  // Tiêu đề trang ngắn gọn, chứa từ khóa chính trực quan.
  title: "Nông Nghiệp Công Nghệ Cao",
  // Thẻ mô tả súc tích, tối ưu hóa tỷ lệ click chuột (CTR) khi hiển thị trên trang kết quả tìm kiếm của Google.
  description: "Giải pháp nông nghiệp thông minh",
};

export default function RootLayout({  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="vi" 
      data-scroll-behavior="smooth"
      /* Đổ các biến font đã tối ưu vào HTML class */
      className={`${inter.variable} ${plusJakartaSans.variable}`}
    >
      {/* SỬA: Đổi font-sans thành font-body để khớp chính xác với biến --font-body nhận từ Next.js */}
      <body className="bg-neutral-light text-neutral-dark font-body antialiased">
        {children}
      </body>
    </html>
  );
}