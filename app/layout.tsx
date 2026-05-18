import type { Metadata } from "next";
// Import file globals.css duy nhất gánh toàn bộ Tailwind v4 và Design Tokens
import "./globals.css"; 

export const metadata: Metadata = {
  title: "Nông Nghiệp Công Nghệ Cao",
  description: "Giải pháp nông nghiệp thông minh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* Đã thêm data-scroll-behavior để dọn sạch cảnh báo của Next.js */
    <html lang="vi" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}