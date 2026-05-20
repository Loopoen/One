import {
  atom,
  selector
} from "recoil"


export const userState = atom({

  key: "userState",

  default:

    JSON.parse(

      localStorage.getItem(
        "user"
      )

    ) || null
})



export const cartState = atom({

  key: "cartState",

  default: [],

  effects: [

    ({ setSelf, onSet }) => {

      // LOAD
      const savedCart =
        localStorage.getItem(
          "cart-items"
        )

      if (savedCart != null) {

        setSelf(
          JSON.parse(savedCart)
        )
      }


     
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

  default:

    JSON.parse(

      localStorage.getItem(
        "myCourses"
      )

    ) || []
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