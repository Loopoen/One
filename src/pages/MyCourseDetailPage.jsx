import {
  useParams
} from "react-router-dom"

import {
  useRecoilValue
} from "recoil"

import {
  myCoursesState
} from "../store/atoms"


function MyCourseDetailPage() {

  const { id } =
    useParams()

  const courses =
    useRecoilValue(
      myCoursesState
    )


  const course =
    courses.find(

      item =>
        item.id === Number(id)
    )


  // not found
  if (!course) {

    return (
      <h2>
        Không tìm thấy khóa học
      </h2>
    )
  }


  return (
    <div>

      <img
        src={course.image}
        alt={course.title}
        width="300"
      />

      <h1>
        {course.title}
      </h1>

      <h3>
        {course.instructor}
      </h3>

      <p>
        {course.description}
      </p>

      <h2>
        {course.price}
      </h2>

    </div>
  )
}

export default MyCourseDetailPage