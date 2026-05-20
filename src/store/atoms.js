import {
  atom,
  selector
} from "recoil"

export const userState = atom({

  key: "userState",

  default: (() => {

    const saved =
      localStorage.getItem(
        "user"
      )

    return saved
      ? JSON.parse(saved)
      : null

  })()
})

export const cartState = atom({

  key: "cartState",

  default: [],

  effects: [

    ({ setSelf, onSet }) => {

      const savedCart =
        localStorage.getItem(
          "cart-items"
        )

      if (savedCart != null) {

        setSelf(
          JSON.parse(savedCart)
        )
      }


      // SAVE
      onSet((newItems) => {

        localStorage.setItem(

          "cart-items",

          JSON.stringify(newItems)
        )
      })
    }
  ]
})


export const myCoursesState = atom({

  key: "myCoursesState",

  default: (() => {

    const saved =
      localStorage.getItem(
        "myCourses"
      )

    return saved
      ? JSON.parse(saved)
      : []

  })()
})

export const cartTotalState =
selector({

  key: "cartTotalState",

  get: ({ get }) => {

    const items =
      get(cartState)

    return items.reduce(

      (sum, item) =>

        sum +
        item.price *
        item.quantity,

      0
    )
  }
})