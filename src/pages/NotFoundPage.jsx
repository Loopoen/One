import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="empty">
      <h1 style={{ fontSize: 48 }}>404</h1>
      <p style={{ fontSize: 18, marginBottom: 16 }}>Không tìm thấy trang</p>
      <Link to="/" className="btn btn-primary">Về trang chủ</Link>
    </div>
  )
}
