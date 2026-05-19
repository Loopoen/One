import { useState, useEffect } from 'react'

// ============================================================
// Câu 6 - 
// ============================================================

export function useFetch(asyncFn, deps = []) {

  // state dữ liệu
  const [data, setData] = useState(null)

  // state loading
  const [loading, setLoading] = useState(false)

  // state lỗi
  const [error, setError] = useState(null)


  useEffect(() => {

    const fetchData = async () => {

      try {

        // bắt đầu loading
        setLoading(true)

        // reset lỗi
        setError(null)

        // gọi async function
        const response = await asyncFn()

        // lưu data
        setData(response)

      }
      catch (err) {

        // lưu lỗi
        setError(
          err.message || 'Có lỗi xảy ra'
        )

      }
      finally {

        // tắt loading
        setLoading(false)

      }
    }

    fetchData()

  }, deps)


  return {
    data,
    loading,
    error
  }
}