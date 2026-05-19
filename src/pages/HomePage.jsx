import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <h1 className="page-title">Chào mừng đến với EduCourse 🎓</h1>
      <div style={{ background: 'white', padding: 24, borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <p style={{ marginBottom: 16, color: '#374151', fontSize: 16 }}>
          Hệ thống quản lý khóa học trực tuyến - bài kiểm tra cuối kỳ môn ReactJS.
        </p>
        <p style={{ marginBottom: 16, color: '#374151' }}>
          Hãy hoàn thành các chức năng theo yêu cầu của đề bài. Mỗi file code đều có comment <code>// TODO (Câu X)</code> hướng dẫn rõ ràng.
        </p>
        <Link to="/courses" className="btn btn-primary">Xem danh sách khóa học →</Link>
      </div>
    </div>
  )
}
