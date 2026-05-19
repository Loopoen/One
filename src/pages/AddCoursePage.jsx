import { useReducer, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockApi } from '../api/mockApi'

// ============================================================
// Câu 11 - 
// ============================================================

const initialState = {
  title: '',
  instructor: '',
  price: '',
  level: 'Cơ bản',
  description: '',
  errors: {},
  submitting: false
}

function formReducer(state, action) {

  switch (action.type) {

    case 'CHANGE_FIELD':
      return {
        ...state,
        [action.field]: action.value
      }

  
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors
      }

  
    case 'SUBMIT_START':
      return {
        ...state,
        submitting: true,
        errors: {}
      }

  
    case 'SUBMIT_SUCCESS':
      return {
        ...initialState
      }

    case 'SUBMIT_FAIL':
      return {
        ...state,
        submitting: false
      }

    default:
      return state
  }
}

export default function AddCoursePage() {

  const [state, dispatch] = useReducer(formReducer, initialState)

  const navigate = useNavigate()

  // ============================================================
  // Câu 12 - useRef
  // ============================================================
  const titleInputRef = useRef()


  const handleSubmit = async (e) => {

    e.preventDefault()

    const errors = {}

    if (!state.title.trim()) {
      errors.title = 'Tên khóa học không được rỗng'
    }


    if (!state.instructor.trim()) {
      errors.instructor = 'Vui lòng nhập tên giảng viên'
    }

   
    if (!state.price || Number(state.price) <= 0) {
      errors.price = 'Giá phải lớn hơn 0'
    }

   
    if (Object.keys(errors).length > 0) {

      dispatch({
        type: 'SET_ERRORS',
        errors
      })

  
      if (errors.title) {
        titleInputRef.current.focus()
      }

      return
    }

    try {

      dispatch({
        type: 'SUBMIT_START'
      })

      await mockApi.createCourse({
        title: state.title,
        instructor: state.instructor,
        price: Number(state.price),
        level: state.level,
        description: state.description
      })

      dispatch({
        type: 'SUBMIT_SUCCESS'
      })

      alert('Thêm khóa học thành công!')

      navigate('/courses')

    }
    catch (error) {

      dispatch({
        type: 'SUBMIT_FAIL'
      })

      alert('Có lỗi xảy ra!')
    }
  }

  return (
    <div>

      <h1 className="page-title">
        ➕ Thêm khóa học mới
      </h1>

      <form className="form-card" onSubmit={handleSubmit}>

        <div className="form-group">

          <label>Tên khóa học *</label>

          <input
            ref={titleInputRef}
            type="text"
            value={state.title}
            onChange={(e) =>
              dispatch({
                type: 'CHANGE_FIELD',
                field: 'title',
                value: e.target.value
              })
            }
            placeholder="VD: ReactJS từ cơ bản"
          />

          {state.errors.title && (
            <div className="error">
              {state.errors.title}
            </div>
          )}

        </div>

        <div className="form-group">

          <label>Giảng viên *</label>

          <input
            type="text"
            value={state.instructor}
            onChange={(e) =>
              dispatch({
                type: 'CHANGE_FIELD',
                field: 'instructor',
                value: e.target.value
              })
            }
            placeholder="VD: Nguyễn Văn A"
          />

          {state.errors.instructor && (
            <div className="error">
              {state.errors.instructor}
            </div>
          )}

        </div>

        <div className="form-group">

          <label>Giá (VNĐ) *</label>

          <input
            type="number"
            value={state.price}
            onChange={(e) =>
              dispatch({
                type: 'CHANGE_FIELD',
                field: 'price',
                value: e.target.value
              })
            }
            placeholder="VD: 500000"
          />

          {state.errors.price && (
            <div className="error">
              {state.errors.price}
            </div>
          )}

        </div>

        <div className="form-group">

          <label>Trình độ</label>

          <select
            value={state.level}
            onChange={(e) =>
              dispatch({
                type: 'CHANGE_FIELD',
                field: 'level',
                value: e.target.value
              })
            }
          >
            <option value="Cơ bản">Cơ bản</option>
            <option value="Trung bình">Trung bình</option>
            <option value="Nâng cao">Nâng cao</option>
          </select>

        </div>

        <div className="form-group">

          <label>Mô tả</label>

          <textarea
            rows={4}
            value={state.description}
            onChange={(e) =>
              dispatch({
                type: 'CHANGE_FIELD',
                field: 'description',
                value: e.target.value
              })
            }
            placeholder="Mô tả khóa học..."
          />

        </div>

        <div className="form-actions">

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate('/courses')}
          >
            Hủy
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={state.submitting}
          >
            {state.submitting
              ? 'Đang lưu...'
              : 'Lưu khóa học'}
          </button>

        </div>

      </form>

    </div>
  )
}