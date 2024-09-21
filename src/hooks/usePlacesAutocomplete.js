import { useEffect, useState } from 'react'

const usePlacesAutocomplete = () => {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPredictions = async (inputValue) => {
    if (!inputValue) {
      setPredictions([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/autocomplete?input=${encodeURIComponent(inputValue)}`
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setPredictions([])
      } else {
        setPredictions(data.predictions)
      }
    } catch (error) {
      console.error('Error fetching predictions:', error)
      setError('Failed to fetch predictions')
      setPredictions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPredictions()
  }, [])

  return { predictions, setPredictions, fetchPredictions, loading, error }
}
export default usePlacesAutocomplete
