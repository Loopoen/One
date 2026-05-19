# 🎓 ĐỀ KIỂM TRA REACT JS - QUẢN LÝ KHÓA HỌC

## 📋 Hướng dẫn cài đặt

```bash
# Bước 1: Cài đặt thư viện
npm install

# Bước 2: Chạy ứng dụng
npm run dev

# Mở http://localhost:3000
```

## 📁 Cấu trúc thư mục

```
src/
├── api/
│   └── mockApi.js          ← Mock API (KHÔNG SỬA)
├── components/             ← (Sinh viên có thể tạo thêm component nếu muốn)
├── hooks/
│   └── useFetch.js         ← Custom hook (Câu 6)
├── pages/
│   ├── HomePage.jsx        ← Đã hoàn thành
│   ├── CourseListPage.jsx  ← Câu 1, 2, 3, 4, 5
│   ├── CourseDetailPage.jsx← Câu 6
│   ├── CartPage.jsx        ← Câu 8, 9, 10
│   ├── AddCoursePage.jsx   ← Câu 11, 12
│   ├── LoginPage.jsx       ← Câu 7
│   └── NotFoundPage.jsx
├── store/
│   └── atoms.js            ← Recoil atoms + selector (Câu 7, 8, 9)
├── App.jsx                 ← Routing đã setup sẵn (cần code Câu 8 - cart badge)
├── main.jsx                ← Entry point (KHÔNG SỬA)
└── styles.css              ← CSS đã có sẵn (KHÔNG CẦN SỬA)
```

## 🎯 Cách làm bài

1. Đọc kỹ đề bài (file `DE_THI.docx` hoặc đề giấy)
2. Tìm các comment `// TODO (Câu X - ...)` trong code
3. Hoàn thành lần lượt từng câu
4. Test trên trình duyệt sau mỗi câu

## ⚠️ Lưu ý

- **KHÔNG được sửa**: `mockApi.js`, `main.jsx`, `styles.css`, `index.html`
- **KHÔNG được**: dùng Internet, AI, IDE có AI
- Giao diện đã có CSS sẵn - chỉ cần làm logic React
- Nộp bài: nén thư mục `src/` thành file zip với tên `MSSV_HoTen.zip`
