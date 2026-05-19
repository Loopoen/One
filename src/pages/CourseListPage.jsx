import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { cartState } from '../store/atoms'
import { mockApi } from '../api/mockApi'

export default function CourseListPage() {

  // ============================================================
  // Câu 1
  // ============================================================
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

 useEffect(() => {

  const fetchCourses = async () => {

    try {

      setLoading(true)
      setError(null)

      const data = await mockApi.getCourses()



      setCourses(
        Array.isArray(data)
          ? data
          :  data.data || []
      )

    }
    catch (err) {

      setError(
        err.message || 'Có lỗi xảy ra'
      )

    }
    finally {

      setLoading(false)

    }
  }

  fetchCourses()

}, [])


  // ============================================================
  // Câu 2
  // ============================================================
  const [keyword, setKeyword] = useState('')
  const [levelFilter, setLevelFilter] = useState('')
  const [sortBy, setSortBy] = useState('')


  // ============================================================
  // Câu 3
  // ============================================================
  const filteredCourses = useMemo(() => {

    let result = [...courses]

    if (keyword.trim()) {
      result = result.filter(course =>
        course.title.toLowerCase().includes(keyword.toLowerCase())
      )
    }

    // filter level
    if (levelFilter) {
      result = result.filter(course =>
        course.level === levelFilter
      )
    }

    // sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    }

    if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    }

    return result

  }, [courses, keyword, levelFilter, sortBy])


  // ============================================================
  // Câu 4
  // ============================================================
  const setCart = useSetRecoilState(cartState)

  console.log("hehe",setCart)

  const handleAddToCart = useCallback((course) => {

    setCart(prevCart => {

      const existed = prevCart.find(item => item.id === course.id)

     
      if (existed) {
        return prevCart.map(item =>
          item.id === course.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      

      return [  
        ...prevCart,
        {
          ...course,
          quantity: 1
        }
      ]
    })

    alert("Đã thêm vào giỏ hàng!")

  }, [setCart])


  return (
    <div>
      <h1 className="page-title">Danh sách khóa học</h1>

      <div className="toolbar">

        <input
          type="text"
          placeholder="🔍 Tìm theo tên khóa học..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
        >
          <option value="">Tất cả trình độ</option>
          <option value="Cơ bản">Cơ bản</option>
          <option value="Trung bình">Trung bình</option>
          <option value="Nâng cao">Nâng cao</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Mặc định</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
        </select>

        <div className="spacer" />

        <span style={{ color: '#6b7280', fontSize: 14 }}>
          Hiển thị: <b>{filteredCourses.length}</b> / {courses.length} khóa học
        </span>

      </div>

      {loading && (
        <div className="loading">
          ⏳ Đang tải dữ liệu...
        </div>
      )}

      {error && (
        <div className="error-box">
          ❌ {error}
        </div>
      )}

      {!loading && !error && filteredCourses.length === 0 && (
        <div className="empty">
          😔 Không có khóa học nào phù hợp
        </div>
      )}

      <div className="course-grid">
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

    </div>
  )
}


// =============================================================
// Câu 5
// =============================================================
function CourseCard({ course, onAddToCart }) {

  const formatPrice = new Intl.NumberFormat(
    'vi-VN',
    {
      style: 'currency',
      currency: 'VND'
    }
  ).format(course.price)

  return (
    <div className="course-card">

      <img
        src={course.image}
        alt={course.title}
      />

      <div className="course-card-body">

        <span className="level">
          {course.level}
        </span>

        <h3>
          {course.title}
        </h3>

        <p className="instructor">
          👨‍🏫 {course.instructor}
        </p>

        <p className="price">
          {formatPrice}
        </p>

      </div>

      <div className="course-card-footer">

        <Link
          to={`/courses/${course.id}`}
          className="btn-detail"
        >
          Xem chi tiết
        </Link>

        <button
          className="btn-cart"
          onClick={() => onAddToCart(course)}
        >
          Thêm vào giỏ
        </button>

      </div>

    </div>
  )
}