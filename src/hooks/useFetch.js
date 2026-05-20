import { useState, useEffect } from 'react'

// ============================================================
// Câu 6 - 
// ============================================================

export default function useFetch(asyncFn, deps = []) {

  const [data, setData] = useState(null)

  
  const [loading, setLoading] = useState(false)


  const [error, setError] = useState(null)


  useEffect(() => {

    const fetchData = async () => {

      try {

        setLoading(true)

        setError(null)

      
        const response = await asyncFn()

   
        setData(response)

      }
      catch (err) {

        // lưu lỗi
        setError(
          err.message || 'Có lỗi xảy ra'
        )

      }
      finally {

      
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