  import { useEffect } from 'react'
  import { useRecoilState, useRecoilValue } from 'recoil'
  import { cartState, cartTotalState } from '../store/atoms'

  export default function CartPage() {

    // ============================================================
    // Câu 8 - 
    // ============================================================
    const [items, setItems] = useRecoilState(cartState)

    // xóa item
    const removeItem = (id) => {
      setItems(prev =>
        prev.filter(item => item.id !== id)
      )
    }


    const updateQuantity = (id, q) => {

    
      if (q <= 0) {
        removeItem(id)
        return
      }

      setItems(prev =>
        prev.map(item =>
          item.id === id
            ? { ...item, quantity: q }
            : item
        )
      )
    }


    const clearAll = () => {
      setItems([])
    }


    // ============================================================
    // Câu 9 -
    // ============================================================
    const total = useRecoilValue(cartTotalState)


    // ============================================================
    // Câu 10 - 
    // ============================================================


    useEffect(() => {

      const savedCart = localStorage.getItem('cart-items')

      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }

    }, [setItems])



    useEffect(() => {

      console.log('a')

      localStorage.setItem(
        'cart-items',
        JSON.stringify(items)
      )

    }, [items])


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

        <h1 className="page-title">
          🛒 Giỏ hàng của bạn
        </h1>

        {items.length === 0 ? (

          <div className="empty">
            🛍️ Giỏ hàng đang trống

            <p style={{ marginTop: 8, fontSize: 14 }}>
              Hãy thêm khóa học vào giỏ nhé!
            </p>
          </div>

        ) : (

          <>
            <table className="cart-table">

              <thead>
                <tr>
                  <th>Khóa học</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>

                {items.map(item => (

                  <tr key={item.id}>

                    <td>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                        />

                        <span>
                          {item.title}
                        </span>
                      </div>
                    </td>

                    <td>
                      {formatPrice(item.price)}
                    </td>

                    <td>
                      <div className="qty-control">

                        {/* giảm */}
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

                        {/* tăng */}
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

                      </div>
                    </td>

                    <td>
                      <b>
                        {formatPrice(item.price * item.quantity)}
                      </b>
                    </td>

                    <td>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeItem(item.id)}
                      >
                        Xóa
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            <div className="cart-summary">

              <button
                className="btn btn-outline"
                onClick={clearAll}
              >
                🗑️ Xóa toàn bộ
              </button>

              <div>
                Tổng cộng:
                <span className="total">
                  {' '}
                  {formatPrice(total)}
                </span>
              </div>

            </div>

          </>

        )}

      </div>
    )
  }