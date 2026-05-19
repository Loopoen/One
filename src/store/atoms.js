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
  default: []
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