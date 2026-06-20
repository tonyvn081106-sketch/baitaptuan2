# Dự án Đặt phòng Full-Stack (Next.js ↔ NestJS)

Dự án Tuần 5 - Kết nối Full-stack và Realtime bằng Socket.io, kết hợp Tanstack Query để cache/retry và optimistic updates.
Database đã được cấu hình sang MongoDB Atlas và hệ thống hỗ trợ khởi chạy toàn bộ qua Docker Compose.

## Kiến trúc Hệ thống E2E

```mermaid
graph TD
    Client[Next.js App Router] -->|REST API + JWT Bearer| Server[NestJS API]
    Client <-->|WebSocket Realtime| Server
    Server -->|Prisma ORM| Database[(MongoDB Atlas)]
```

## Luồng Hoạt động Auth & Realtime
1. **Luồng Auth**: 
   - Đăng nhập từ UI (`/login`) gọi API backend `POST /auth/login`.
   - Trả về token JWT lưu trên `localStorage`.
   - Axios Interceptor ở client sẽ tự động thêm Header `Authorization: Bearer <token>` vào các request tới Dashboard `/bookings`.
2. **Luồng Realtime**:
   - Khi tạo booking thành công (`POST /bookings`), Backend sẽ kích hoạt `NotificationsGateway`.
   - Bắn sự kiện WebSocket `booking:created` đến toàn bộ Clients.
   - Client hiển thị Toast (thông báo) bằng `react-hot-toast`.

## Setup Biến Môi Trường (.env)

**Tạo `.env` trong thư mục `server/`** (đã được cấu hình sẵn cho MongoDB Atlas)
```env
DATABASE_URL="mongodb+srv://tonyvn081106_db_user:123456a%40@cluster0.iptss4p.mongodb.net/DatLich?appName=Cluster0"
JWT_SECRET="supersecret"
```

## Hướng dẫn Chạy Hệ thống với Docker Compose
Cách nhanh nhất để khởi chạy hệ thống (Frontend và Backend) là dùng lệnh:
```bash
docker-compose up --build
```
Lệnh này sẽ tự động khởi tạo Client ở cổng 3001 và Server ở cổng 3000 và kết nối trực tiếp đến MongoDB Atlas.

## Hướng dẫn Chạy Local & E2E Tests (Không dùng Docker)
Nếu muốn chạy trực tiếp bằng NodeJS:
1. **Khởi tạo Database (Tạo Client Schema)**:
   ```bash
   cd server
   npx prisma generate
   ```
   *(Lưu ý: MongoDB không cần `prisma migrate` do tính chất schemaless, chỉ cần `prisma generate` để tạo Prisma Client).*
2. **Khởi chạy Development**:
   - **Backend**: `cd server && npm run start:dev` (Cổng 3000)
   - **Frontend**: `cd client && npm run dev` (Cổng 3001)
3. **Chạy Playwright E2E Tests**:
   - Chạy lệnh `cd client && npx playwright test --reporter=list`
   - Playwright sẽ tự động thực thi 2 file tests: `e2e/login.spec.ts` và `e2e/bookings-crud.spec.ts`.
