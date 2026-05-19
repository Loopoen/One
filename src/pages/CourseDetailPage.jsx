import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { cartState } from '../store/atoms'
import { useFetch } from '../hooks/useFetch'
import { mockApi } from '../api/mockApi.js'

export default function CourseDetailPage() {

 
  const { id } = useParams()

 
  const navigate = useNavigate()


  const setCart = useSetRecoilState(cartState)

  const {
    data,
    loading,
    error
  } = useFetch(
    () => mockApi.getCourseById(Number(id)),
    [id]
  )

  
  const course =
    data?.course ||
    data?.data ||
    data



  const handleAddToCart = () => {

    setCart(prevCart => {

      const existed = prevCart.find(
        item => item.id === course.id
      )

  
      if (existed) {

        return prevCart.map(item =>
          item.id === course.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
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


    navigate('/cart')
  }


  if (loading) {
    return (
      <div className="loading">
        ⏳ Đang tải...
      </div>
    )
  }


  if (error) {
    return (
      <div className="error-box">
        ❌ {error}
      </div>
    )
  }


  if (!course) {
    return (
      <div className="error-box">
        ❌ Không tìm thấy khóa học
      </div>
    )
  }


  const formatPrice = (p) =>
    new Intl.NumberFormat(
      'vi-VN',
      {
        style: 'currency',
        currency: 'VND'
      }
    ).format(p)


  return (

    <div>

      <Link
        to="/courses"
        className="btn btn-outline btn-sm"
        style={{ marginBottom: 16 }}
      >
        ← Quay lại
      </Link>


      <div className="detail-wrap">

        <div className="detail-main">

          <img
            src={course.image}
            alt={course.title}
          />

          <h1>
            {course.title}
          </h1>

          <div className="detail-meta">

            <span className="badge badge-info">
              {course.level}
            </span>

            &nbsp;•&nbsp;
            👨‍🏫 {course.instructor}

            &nbsp;•&nbsp;
            ⏱️ {course.duration}

            &nbsp;•&nbsp;
            👥 {course.students} học viên

          </div>

          <p className="detail-description">
            {course.description}
          </p>

        </div>


        <div className="detail-side">

          <div className="price-big">
            {formatPrice(course.price)}
          </div>

          <button
            className="btn btn-success"
            style={{
              width: '100%',
              marginBottom: 8
            }}
            onClick={handleAddToCart}
          >
            🛒 Thêm vào giỏ hàng
          </button>

          <button
            className="btn btn-outline"
            style={{
              width: '100%'
            }}
          >
            ❤️ Yêu thích
          </button>

        </div>

      </div>

    </div>
  )
}