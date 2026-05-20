import {
    useReducer
} from "react"

import {
    useNavigate
} from "react-router-dom"

import {
    useRecoilValue
} from "recoil"

import {
    userState
} from "../store/atoms"

import { mockApi } from "../api/mockApi"


const initialState = {

    title: "",

    instructor: "",

    description: "",

    price: "",

    error: ""
}


function reducer(state, action) {

    switch (action.type) {

        case "CHANGE":

            return {

                ...state,

                [action.field]:
                    action.value
            }

        case "ERROR":

            return {

                ...state,

                error:
                    action.payload
            }

        case "RESET":

            return initialState

        default:
            return state
    }
}


function AddCoursePage() {

    const navigate = useNavigate()

    const user =
        useRecoilValue(userState)


    const [state, dispatch] =
        useReducer(
            reducer,
            initialState
        )


    // Chưa login
    if (!user) {

        return (
            <h2>
                Bạn cần đăng nhập
            </h2>
        )
    }


    const handleSubmit =
        async (e) => {

            e.preventDefault()

            if (
                !state.title ||
                !state.instructor ||
                !state.description ||
                Number(state.price) <= 0
            ) {

                dispatch({

                    type: "ERROR",

                    payload:
                        "Vui lòng nhập đúng dữ liệu"
                })

                return
            }


            await mockApi.createCourse({

                title:
                    state.title,

                instructor:
                    state.instructor,

                description:
                    state.description,

                price:
                    Number(state.price)
            })


            alert(
                "Thêm khóa học thành công!"
            )

            dispatch({
                type: "RESET"
            })

            navigate("/")
        }


    return (
        <div>

            <h1>
                Thêm khóa học
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"

                    placeholder="Tên khóa học"

                    value={state.title}

                    onChange={(e) =>

                        dispatch({

                            type: "CHANGE",

                            field: "title",

                            value:
                                e.target.value
                        })
                    }
                />


                <input
                    type="text"

                    placeholder="Giảng viên"

                    value={state.instructor}

                    onChange={(e) =>

                        dispatch({

                            type: "CHANGE",

                            field:
                                "instructor",

                            value:
                                e.target.value
                        })
                    }
                />


                <textarea

                    placeholder="Mô tả"

                    value={state.description}

                    onChange={(e) =>

                        dispatch({

                            type: "CHANGE",

                            field:
                                "description",

                            value:
                                e.target.value
                        })
                    }
                />


                <input
                    type="number"

                    placeholder="Giá"

                    value={state.price}

                    onChange={(e) =>

                        dispatch({

                            type: "CHANGE",

                            field:
                                "price",

                            value:
                                e.target.value
                        })
                    }
                />


                {
                    state.error &&
                    <p>{state.error}</p>
                }


                <button type="submit">
                    Thêm khóa học
                </button>

            </form>

        </div>
    )
}

export default AddCoursePage