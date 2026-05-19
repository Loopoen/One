import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../store/atoms'

export default function LoginPage() {

  // ============================================================
  // Câu 7 - Recoil cho User
  // ============================================================
  const [user, setUser] = useRecoilState(userState)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')


  const handleLogin = (e) => {

    e.preventDefault()

  
    setError('')

    // validate
    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu')
      return
    }

    
    setUser({
      username,
      loginTime: new Date().toLocaleString('vi-VN')
    })

  
    setUsername('')
    setPassword('')
  }


  
  const handleLogout = () => {
    setUser(null)
  }


  return (
    <div className="auth-wrap">

      <div className="auth-card">

        {user ? (

          <div style={{ textAlign: 'center' }}>

            <h2>
              👋 Xin chào, {user.username}!
            </h2>

            <p style={{ marginTop: 12 }}>
              🕒 Thời gian đăng nhập:
            </p>

            <p style={{ color: '#6b7280' }}>
              {user.loginTime}
            </p>

            <button
              className="btn btn-danger"
              style={{ marginTop: 20 }}
              onClick={handleLogout}
            >
              Đăng xuất
            </button>

          </div>

        ) : (

          <>

            <h2>
              🔐 Đăng nhập
            </h2>

            <form onSubmit={handleLogin}>

              {error && (
                <div className="error-box">
                  {error}
                </div>
              )}

              <div className="form-group">

                <label>
                  Tên đăng nhập
                </label>

                <input
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  placeholder="Nhập tên đăng nhập"
                />

              </div>

              <div className="form-group">

                <label>
                  Mật khẩu
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Nhập mật khẩu"
                />

              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Đăng nhập
              </button>

            </form>

          </>

        )}

      </div>

    </div>
  )
}