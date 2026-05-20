import {
  useState
} from "react"

import {
  useNavigate
} from "react-router-dom"

import {
  useSetRecoilState
} from "recoil"

import {
  userState
} from "../store/atoms"


function LoginPage() {

  const navigate =
    useNavigate()

  const setUser =
    useSetRecoilState(userState)


  const [username, setUsername] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [error, setError] =
    useState("")


  const handleSubmit = (e) => {

    e.preventDefault()

    // TK giả
    if (

      username === "admin" &&
      password === "123456"

    ) {

      setUser({

        username
      })

      alert(
        "Đăng nhập thành công!"
      )

      navigate("/")
    }
    else {

      setError(
        "Sai tài khoản hoặc mật khẩu"
      )
    }
  }


  return (
    <div>

      <h1>
        Đăng nhập
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"

          placeholder="Username"

          value={username}

          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
        />


        <input
          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />


        {
          error &&
          <p>{error}</p>
        }


        <button type="submit">
          Đăng nhập
        </button>

      </form>

    </div>
  )
}

export default LoginPage