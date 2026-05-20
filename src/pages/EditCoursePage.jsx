import {
  useEffect,
  useState
} from "react"

import {
  useNavigate,
  useParams
} from "react-router-dom"

import {
  useRecoilState
} from "recoil"

import {
  myCoursesState
} from "../store/atoms"


function EditCoursePage() {

  const { id } =
    useParams()

  const navigate =
    useNavigate()

  const [myCourses, setMyCourses] =
    useRecoilState(
      myCoursesState
    )


  // =====================================================
  // FORM
  // =====================================================
  const [title, setTitle] =
    useState("")

  const [instructor,
    setInstructor] =
    useState("")

  const [description,
    setDescription] =
    useState("")

  const [price, setPrice] =
    useState("")

  const [error, setError] =
    useState("")


  // =====================================================
  // LOAD COURSE
  // =====================================================
  useEffect(() => {

    const course =
      myCourses.find(

        item =>
          item.id === Number(id)
      )

    if (course) {

      setTitle(
        course.title
      )

      setInstructor(
        course.instructor
      )

      setDescription(
        course.description
      )

      setPrice(
        course.price
      )
    }

  }, [id, myCourses])


  // =====================================================
  // SUBMIT
  // =====================================================
  const handleSubmit = (e) => {

    e.preventDefault()


    // validate
    if (

      !title ||
      !instructor ||
      !description ||
      Number(price) <= 0

    ) {

      setError(
        "Vui lòng nhập đúng dữ liệu"
      )

      return
    }


    // update
    setMyCourses(prev =>

      prev.map(course =>

        course.id === Number(id)

          ? {
              ...course,

              title,

              instructor,

              description,

              price:
                Number(price)
            }

          : course
      )
    )


    alert(
      "Cập nhật thành công!"
    )

    navigate("/my-courses")
  }


  return (
    <div>

      <h1>
        Chỉnh sửa khóa học
      </h1>


      <form
        onSubmit={handleSubmit}
      >

        <input
          type="text"

          placeholder="Tên khóa học"

          value={title}

          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />


        <input
          type="text"

          placeholder="Giảng viên"

          value={instructor}

          onChange={(e) =>
            setInstructor(
              e.target.value
            )
          }
        />


        <textarea

          placeholder="Mô tả"

          value={description}

          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />


        <input
          type="number"

          placeholder="Giá"

          value={price}

          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
        />


        {
          error &&

          <p>
            {error}
          </p>
        }


        <button type="submit">
          Lưu thay đổi
        </button>

      </form>

    </div>
  )
}

export default EditCoursePage