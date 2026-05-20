import {
  useParams,
  useNavigate
} from "react-router-dom"

import {
  useRecoilValue,
  useSetRecoilState
} from "recoil"

import {
  cartState,
  userState
} from "../store/atoms"

import useFetch from "../hooks/useFetch"

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


  const {
    data,
    loading,
    error
  } = useFetch(

    () =>
      mockApi.getCourseById(id),

    [id]
  )


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


    setCart(prev => {

      const exist =
        prev.find(

          item =>
            item.id === data.id
        )

      // đã tồn tại
      if (exist) {

        return prev.map(item =>

          item.id === data.id

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

        ...prev,

        {
          ...data,
          quantity: 1
        }
      ]
    })


    alert(
      "Đã thêm vào giỏ hàng!"
    )
  }


  // loading
  if (loading) {

    return (
      <h2>
        Loading...
      </h2>
    )
  }


  // error
  if (error) {

    return (
      <h2>
        {error}
      </h2>
    )
  }


  // not found
  if (!data) {

    return (
      <h2>
        Không tìm thấy khóa học
      </h2>
    )
  }


  return (
    <div>

      <img
        src={data.image}
        alt={data.title}
        width="300"
      />

      <h1>
        {data.title}
      </h1>

      <h3>
        {data.instructor}
      </h3>

      <p>
        {data.level}
      </p>

      <p>
        {data.description}
      </p>

      <h2>
        {data.price}
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