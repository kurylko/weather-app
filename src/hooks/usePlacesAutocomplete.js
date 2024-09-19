import { useEffect, useState } from 'react'

const Autocomplete = (apiKey) => {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadGoogleMapsScript = () => {
    if (typeof window.google === 'undefined') {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.onload = () => console.log('Google Maps script loaded')
      document.head.appendChild(script)
    }
  }

  const getPlacePredictions = (inputValue) => {
    if (typeof google === 'undefined' || !inputValue) return

    const autocompleteService = new google.maps.places.AutocompleteService()
    setLoading(true)
    autocompleteService.getPlacePredictions(
      { input: inputValue },
      (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setPredictions(predictions)
          setLoading(false)
        } else {
          setError('Error fetching place predictions')
          setLoading(false)
          setPredictions([])
        }
      }
    )
  }

  useEffect(() => {
    loadGoogleMapsScript()
  }, [])

  return { predictions, setPredictions, getPlacePredictions, loading, error }
}
export default Autocomplete
