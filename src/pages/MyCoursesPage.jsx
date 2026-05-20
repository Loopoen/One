import {
  Link
} from "react-router-dom"

import {
  useRecoilValue
} from "recoil"

import {
  myCoursesState
} from "../store/atoms"


function MyCoursesPage() {

  const myCourses =
    useRecoilValue(
      myCoursesState
    )


  // empty
  if (myCourses.length === 0) {

    return (
      <h2>
        Chưa có khóa học nào
      </h2>
    )
  }


  return (
    <div>

      <h1>
        Khóa học của tôi
      </h1>


      {
        myCourses.map(course => (

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


            <Link
              to={`/my-course/${course.id}`}
            >
              Xem chi tiết
            </Link>


            <br />


            <Link
              to={`/edit-course/${course.id}`}
            >
              Chỉnh sửa
            </Link>

          </div>
        ))
      }

    </div>
  )
}

export default MyCoursesPage