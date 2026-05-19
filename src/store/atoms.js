  import { atom, selector } from 'recoil'

// ============================================================
// Câu 7 - 
// ============================================================

export const userState = atom({
  key: 'userState',
  default: null
})


// ============================================================
// Câu 8 - 
// ============================================================

export const cartState = atom({
  key: 'cartState',
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      // 1. Khi ứng dụng vừa chạy, đọc ngay localStorage để gán vào trạng thái khởi tạo
      const savedCart = localStorage.getItem('cart-items');
      if (savedCart != null) {
        setSelf(JSON.parse(savedCart));
      }

      // 2. Bất cứ khi nào atom này thay đổi (thêm, sửa, xóa), tự động lưu vào localStorage
      onSet((newItems, _, isReset) => {
        if (isReset) {
          localStorage.removeItem('cart-items');
        } else {
          localStorage.setItem('cart-items', JSON.stringify(newItems));
        }
      });
    },
  ],
})


// ============================================================
// Câu 9 - 
// ============================================================

export const cartTotalState = selector({

  key: 'cartTotalState',


  get: ({ get }) => {

    // lấy dữ liệu từ cartState
    const items = get(cartState)

    // tính tổng tiền
    return items.reduce(

      (sum, item) => {
        return sum + item.price * item.quantity
      },

      0
    )
  }

})