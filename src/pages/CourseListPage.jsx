import {
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react"

import {
  Link
} from "react-router-dom"

import {
  useSetRecoilState,
  useRecoilValue
} from "recoil"

import {
  cartState,
  userState
} from "../store/atoms"

import { mockApi }
from "../api/mockApi"


export default function CourseListPage() {

  // =====================================================
  // DATA
  // =====================================================
  const [courses, setCourses] =
    useState([])

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState(null)


  useEffect(() => {

    const fetchCourses =
    async () => {

      try {

        setLoading(true)

        setError(null)

        const data =
          await mockApi.getCourses()

        setCourses(

          Array.isArray(data)

            ? data

            : data.data || []
        )
      }
      catch (err) {

        setError(
          err.message
        )
      }
      finally {

        setLoading(false)
      }
    }

    fetchCourses()

  }, [])


  // =====================================================
  // FILTER
  // =====================================================
  const [keyword, setKeyword] =
    useState("")

  const [levelFilter,
    setLevelFilter] =
    useState("")

  const [sortBy, setSortBy] =
    useState("")


  // =====================================================
  // MEMO
  // =====================================================
  const filteredCourses =
  useMemo(() => {

    let result =
      [...courses]

    // search
    if (keyword.trim()) {

      result = result.filter(

        course =>

          course.title
            .toLowerCase()
            .includes(
              keyword.toLowerCase()
            )
      )
    }

    // filter
    if (levelFilter) {

      result = result.filter(

        course =>

          course.level ===
          levelFilter
      )
    }

    // sort
    if (sortBy === "price-asc") {

      result.sort(

        (a, b) =>

          a.price - b.price
      )
    }

    if (sortBy === "price-desc") {

      result.sort(

        (a, b) =>

          b.price - a.price
      )
    }

    return result

  }, [

    courses,
    keyword,
    levelFilter,
    sortBy
  ])


  // =====================================================
  // CART
  // =====================================================
  const setCart =
    useSetRecoilState(cartState)

  const user =
    useRecoilValue(userState)


  const handleAddToCart =
  useCallback((course) => {

    // chưa login
    if (!user) {

      alert(
        "Bạn cần đăng nhập"
      )

      return
    }


    setCart(prevCart => {

      const existed =
        prevCart.find(

          item =>
            item.id === course.id
        )

      // tồn tại
      if (existed) {

        return prevCart.map(item =>

          item.id === course.id

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

  }, [setCart, user])


  return (
    <div>

      <h1>
        Danh sách khóa học
      </h1>


      {/* SEARCH */}
      <div>

        <input
          type="text"

          placeholder="Tìm khóa học..."

          value={keyword}

          onChange={(e) =>
            setKeyword(
              e.target.value
            )
          }
        />


        <select
          value={levelFilter}

          onChange={(e) =>
            setLevelFilter(
              e.target.value
            )
          }
        >
          <option value="">
            Tất cả
          </option>

          <option value="Cơ bản">
            Cơ bản
          </option>

          <option value="Trung bình">
            Trung bình
          </option>

          <option value="Nâng cao">
            Nâng cao
          </option>

        </select>


        <select
          value={sortBy}

          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
        >
          <option value="">
            Mặc định
          </option>

          <option value="price-asc">
            Giá tăng dần
          </option>

          <option value="price-desc">
            Giá giảm dần
          </option>

        </select>

      </div>


      {/* LOADING */}
      {
        loading &&

        <h2>
          Loading...
        </h2>
      }


      {/* ERROR */}
      {
        error &&

        <h2>
          {error}
        </h2>
      }


      {/* EMPTY */}
      {
        !loading &&
        filteredCourses.length === 0 &&

        <h2>
          Không có khóa học
        </h2>
      }


      {/* LIST */}
      <div>

        {
          filteredCourses.map(course => (

            <div
              key={course.id}
            >

              <img
                src={course.image}
                alt={course.title}
                width="200"
              />

              <h3>
                {course.title}
              </h3>

              <p>
                {course.instructor}
              </p>

              <p>
                {course.level}
              </p>

              <p>
                {course.price}
              </p>


              <Link
                to={`/courses/${course.id}`}
              >
                Xem chi tiết
              </Link>


              <button
                onClick={() =>
                  handleAddToCart(course)
                }
              >
                Thêm vào giỏ
              </button>

            </div>
          ))
        }

      </div>

    </div>
  )
}