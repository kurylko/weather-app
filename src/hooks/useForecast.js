import axios from 'axios'
import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss'
import { useEffect, useState } from 'react'

const useForecast = ({ forecastWeatherLocation }) => {
  const [forecast, setForecast] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { lat, lon } = forecastWeatherLocation || {}

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY

    if (lat && lon) {
      setLoading(true)
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat}, ${lon}&days=4&aqi=yes&alerts=yes`
      axios
        .get(url)
        .then((response) => {
          setForecast(response.data)
        })
        .catch((error) => {
          console.log('Can not catch weather forecast data', error)
          setError('Can not catch weather forecast data')
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [lat, lon])

  return { forecast, error, loading }
}

export default useForecast
