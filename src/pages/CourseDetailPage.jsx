import {
  useEffect,
  useState
} from "react"

import {
  useNavigate,
  useParams
} from "react-router-dom"

import {
  useRecoilValue,
  useSetRecoilState
} from "recoil"

import {
  cartState,
  userState
} from "../store/atoms"

import { mockApi }
from "../api/mockApi"


function CourseDetailPage() {

  const { id } =
    useParams()

  const navigate =
    useNavigate()

  const user =
    useRecoilValue(userState)

  const setCart =
    useSetRecoilState(cartState)


  // =====================================================
  // STATE
  // =====================================================
  const [course, setCourse] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState("")


  // =====================================================
  // FETCH COURSE
  // =====================================================
  useEffect(() => {

    const fetchCourse =
    async () => {

      try {

        setLoading(true)

        setError("")


        // lấy tất cả khóa học
        const data =
          await mockApi.getCourses()


        // API có thể trả:
        // [] hoặc { data: [] }

        const courses =
          Array.isArray(data)

            ? data

            : data.data || []


        // tìm theo id
        const found =
          courses.find(

            item =>

              String(item.id) ===
              String(id)
          )


        setCourse(found)

      }
      catch (err) {

        setError(

          err.message ||
          "Có lỗi xảy ra"
        )
      }
      finally {

        setLoading(false)
      }
    }

    fetchCourse()

  }, [id])


  // =====================================================
  // ADD TO CART
  // =====================================================
  const handleAddToCart =
  () => {

    // chưa login
    if (!user) {

      alert(
        "Bạn cần đăng nhập"
      )

      navigate("/login")

      return
    }


    setCart(prevCart => {

      const existed =
        prevCart.find(

          item =>

            String(item.id) ===
            String(course.id)
        )


      // đã tồn tại
      if (existed) {

        return prevCart.map(item =>

          String(item.id) ===
          String(course.id)

            ? {
                ...item,
                quantity:
                  item.quantity + 1
              }

            : item
        )
      }


      // chưa tồn tại
      return [

        ...prevCart,

        {
          ...course,
          quantity: 1
        }
      ]
    })


    alert(
      "Đã thêm vào giỏ hàng!"
    )
  }


  // =====================================================
  // LOADING
  // =====================================================
  if (loading) {

    return (
      <div className="page">

        <h1>
          ⏳ Loading...
        </h1>

      </div>
    )
  }


  // =====================================================
  // ERROR
  // =====================================================
  if (error) {

    return (
      <div className="page">

        <h1>
          ❌ {error}
        </h1>

      </div>
    )
  }


  // =====================================================
  // NOT FOUND
  // =====================================================
  if (!course) {

    return (
      <div className="page">

        <h1>
          Không tìm thấy khóa học
        </h1>

      </div>
    )
  }


  // =====================================================
  // UI
  // =====================================================
  return (
    <div className="page detail-page">

      <img
        src={course.image}
        alt={course.title}
      />


      <h1>
        {course.title}
      </h1>


      <h3>
        👨‍🏫 {course.instructor}
      </h3>


      <p>
        📘 {course.level}
      </p>


      <p>
        {course.description}
      </p>


      <h2>
        💰 {course.price}
      </h2>


      <button
        onClick={handleAddToCart}
      >
        Thêm vào giỏ
      </button>

    </div>
  )
}

export default CourseDetailPage