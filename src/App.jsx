import { Routes, Route, NavLink, Link } from 'react-router-dom'
// import { useRecoilValue } from 'recoil'
// import { cartState } from './store/atoms'

import HomePage from './pages/HomePage'
import CourseListPage from './pages/CourseListPage'
import CourseDetailPage from './pages/CourseDetailPage'
import CartPage from './pages/CartPage'
import AddCoursePage from './pages/AddCoursePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  // ============================================================
  // TODO (Câu 8 - Recoil):
  // Đọc cartState bằng useRecoilValue và tính tổng số sản phẩm trong giỏ hàng
  // (sum của tất cả item.quantity) để hiển thị badge bên cạnh icon "Giỏ hàng".
  // Nếu cartCount = 0 thì không hiển thị badge.
  // ============================================================
  const cartCount = 0 // <-- thay bằng cách đọc từ recoil

  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">📘 EduCourse</Link>
        <div className="navbar-menu">
          <NavLink to="/" end>Trang chủ</NavLink>
          <NavLink to="/courses">Khóa học</NavLink>
          <NavLink to="/add-course">Thêm khóa học</NavLink>
          <NavLink to="/cart">
            🛒 Giỏ hàng
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>
          <NavLink to="/login">Đăng nhập</NavLink>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CourseListPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/add-course" element={<AddCoursePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="footer">
        © 2025 EduCourse - React Final Exam
      </footer>
    </div>
  )
}

export default App
