import {
  Routes,
  Route,
  Link
} from "react-router-dom"

import {
  useRecoilValue,
  useSetRecoilState
} from "recoil"

import {
  cartState,
  userState
} from "./store/atoms"


import HomePage
from "./pages/HomePage"

import LoginPage
from "./pages/LoginPage"

import CourseListPage
from "./pages/CourseListPage"

import CourseDetailPage
from "./pages/CourseDetailPage"

import AddCoursePage
from "./pages/AddCoursePage"

import CartPage
from "./pages/CartPage"

import MyCoursesPage
from "./pages/MyCoursesPage"

import MyCourseDetailPage
from "./pages/MyCourseDetailPage"

import EditCoursePage
from "./pages/EditCoursePage"

import NotFoundPage
from "./pages/NotFoundPage"


function App() {

  const cartItems =
    useRecoilValue(cartState)

  const user =
    useRecoilValue(userState)
  const setUser = useSetRecoilState(userState)

  const handleLogout = () =>{
    setUser(null)

    localStorage.removeItem("user")

    alert("dang xuat thanh cong")
  }


  return (
    <div>

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}
      <header>

        <nav>

          <Link to="/">
            Home
          </Link>

          {" | "}

          <Link to="/courses">
            Courses
          </Link>

          {" | "}

          <Link to="/add-course">
            Add Course
          </Link>

          {" | "}

          <Link to="/cart">
            Cart
            (
              {cartItems.length}
            )
          </Link>

          {" | "}

          <Link to="/my-courses">
            Khóa học của tôi
          </Link>

          {" | "}

          {
            user

              ? (
               <div>
                 <span>

                  Xin chào:
                  {user.username}

                </span>

                <button onClick={handleLogout} >
                  Dang xuat
                </button>
               </div>

              
              )

              : (
                <Link to="/login">
                  Login
                </Link>
              )
          }

        </nav>

      </header>


      {/* ================================================= */}
      {/* ROUTES */}
      {/* ================================================= */}
      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />


        <Route
          path="/login"
          element={<LoginPage />}
        />


        <Route
          path="/courses"
          element={<CourseListPage />}
        />


        <Route
          path="/courses/:id"
          element={
            <CourseDetailPage />
          }
        />


        <Route
          path="/add-course"
          element={<AddCoursePage />}
        />


        <Route
          path="/cart"
          element={<CartPage />}
        />


        <Route
          path="/my-courses"
          element={
            <MyCoursesPage />
          }
        />


        <Route
          path="/my-course/:id"
          element={
            <MyCourseDetailPage />
          }
        />


        <Route
          path="/edit-course/:id"
          element={
            <EditCoursePage />
          }
        />


        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Routes>

    </div>
  )
}

export default App