import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil"

import {
  cartState,
  cartTotalState,
  myCoursesState
} from "../store/atoms"


function CartPage() {

  const [items, setItems] =
    useRecoilState(cartState)

  const total =
    useRecoilValue(cartTotalState)

  const setMyCourses =
    useSetRecoilState(
      myCoursesState
    )


  // =====================================================
  // REMOVE
  // =====================================================
  const removeItem = (id) => {

    setItems(prev =>

      prev.filter(
        item => item.id !== id
      )
    )
  }


  // =====================================================
  // UPDATE
  // =====================================================
  const updateQuantity =
  (id, quantity) => {

    // <= 0
    if (quantity <= 0) {

      removeItem(id)

      return
    }


    setItems(prev =>

      prev.map(item =>

        item.id === id

          ? {
              ...item,
              quantity
            }

          : item
      )
    )
  }


  // =====================================================
  // CHECKOUT
  // =====================================================
  const handleCheckout = () => {

    if (items.length === 0) {

      alert(
        "Giỏ hàng trống"
      )

      return
    }


    // thêm vào khóa học của tôi
    setMyCourses(prev => [

      ...prev,

      ...items
    ])


    // clear cart
    setItems([])

    alert(
      "Thanh toán thành công!"
    )
  }


  return (
    <div>

      <h1>
        Giỏ hàng
      </h1>


      {
        items.length === 0 &&

        <h2>
          Giỏ hàng trống
        </h2>
      }


      {
        items.map(item => (

          <div
            key={item.id}
          >

            <img
              src={item.image}
              alt={item.title}
              width="200"
            />

            <h3>
              {item.title}
            </h3>

            <p>
              {item.price}
            </p>


            <button
              onClick={() =>

                updateQuantity(
                  item.id,
                  item.quantity - 1
                )
              }
            >
              -
            </button>


            <span>
              {item.quantity}
            </span>


            <button
              onClick={() =>

                updateQuantity(
                  item.id,
                  item.quantity + 1
                )
              }
            >
              +
            </button>


            <button
              onClick={() =>
                removeItem(item.id)
              }
            >
              Xóa
            </button>

          </div>
        ))
      }


      <h2>
        Tổng tiền:
        {total}
      </h2>


      <button
        onClick={handleCheckout}
      >
        Thanh toán
      </button>

    </div>
  )
}

export default CartPage