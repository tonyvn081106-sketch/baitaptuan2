# Dàn ý Thuyết trình (Slide Outline - Tuần 5)

Dự kiến thiết kế 7-10 trang cho tuần 5.

## Slide 1: Tiêu đề
- **Tiêu đề**: Kết nối Full-Stack Next.js ↔ NestJS
- **Phụ đề**: Hoàn thiện Auth, Realtime, và E2E Testing
- **Trình bày**: Tên bạn

## Slide 2: Mục tiêu Tuần 5
- Xây dựng hệ thống hoàn chỉnh từ Front tới Back.
- Áp dụng các khái niệm nâng cao: TanStack Query (Retry/Backoff).
- Thực thi Socket.io cho các tác vụ thời gian thực.
- Đảm bảo chất lượng bằng E2E Tests.

## Slide 3: Kiến trúc Hệ thống
- (Chèn sơ đồ Mermaid từ file README.md)
- NestJS làm API trung tâm kết nối Database PostgreSQL.
- Next.js phục vụ SSR và Client Component.

## Slide 4: Authentication Flow (JWT)
- Form Đăng nhập -> Gửi API NestJS -> Xác thực bằng Bcrypt.
- Trả về Access Token, lưu trữ và bảo vệ các routes.
- Axios Interceptor đính kèm Token.

## Slide 5: Data Fetching với TanStack Query
- Thay thế `useEffect` bằng `useQuery` và `useMutation`.
- Cơ chế Optimistic Updates (cập nhật UI trước, chờ API phản hồi).
- **Retry & Backoff**: Tự động thử lại khi request failed, giúp cải thiện UX.

## Slide 6: Realtime Event với Socket.io
- Server: Cài đặt Websocket Gateway, phát sự kiện (`emit`).
- Client: Nhận sự kiện, hiện Toast Notification qua `react-hot-toast`.
- Use-case: Thông báo cho Admin hoặc Lễ tân ngay khi khách hàng đặt phòng.

## Slide 7: E2E Playwright Tests
- Tại sao lại cần E2E? Đảm bảo tính liền mạch của các luồng nghiệp vụ.
- Kịch bản `login.spec.ts`: Auth Flow E2E.
- Kịch bản `bookings-crud.spec.ts`: Test Create, Delete.
- Chạy headless trên CI pipeline.

## Slide 8: Các lỗi phổ biến & Checklist Khắc phục
- Lỗi CORS: Khai báo `@WebSocketGateway({ cors: true })`.
- Lỗi Token: Token hết hạn, Invalid signature -> Check `JWT_SECRET`.
- Lỗi Hydration ở Next.js do dùng API Window trước khi render.

## Slide 9: Demo Live
- Khởi động 2 Terminal (Backend 3000, Frontend 3001).
- Trình bày trực tiếp quá trình Đặt phòng.
- Thấy Toast nhảy lập tức (Realtime).

## Slide 10: Q&A
- Cảm ơn và trả lời câu hỏi.
