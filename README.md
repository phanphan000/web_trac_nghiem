# 🚀 Web Thi Trắc Nghiệm - Setup

Dự án này gồm 3 phần:

- **Frontend (React + Tailwind)** chạy ở cổng `5173`
- **Backend (Laravel)** chạy ở cổng `8000`
- **Database (MySQL)** chạy ở cổng `3306`

---

## ⚙️ Yêu cầu

- php : 8. trở lên
- node : 20. trở lên
- composer : 2.5 trở lên
---

## ▶️ Cách chạy

1.Nếu lần đầu chạy react+ Laravel
--Trong react chạy:
npm install

--Trong Laravel chạy:
composer install
php artisan key:generate


2. Chạy lệnh trong folder chứa 2 folder con ( fe,be)

npm run dev
php artisan serve

3.Chạy lệnh seed data ( câu hỏi, môn học,chủ đề, role)

php artisan db:seed 

4.Mở trình duyệt:

FE: http://localhost:5173 ( Nơi hiển thị view )
BE: http://localhost:8000 ( Không bắt buộc )

---

