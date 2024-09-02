import { useEffect, useState } from 'react'

import { parsePlaceData } from '@/utils/parsePlaceData'

const useUserLocation = () => {
  const [geoLocationData, setGeoLocationData] = useState(null)
  const [geoLocationError, setGeoLocationError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false)
          setGeoLocationData(parsePlaceData({ placeData: position?.coords }))
        },
        (error) => {
          setLoading(false)
          setGeoLocationError('Oops.Can not get your geolocation')
        }
      )
    } else {
      setLoading(false)
      setGeoLocationError('Your geolocation is not supported by your browser')
    }
  }, [])

  return { geoLocationData, geoLocationError, geoLocationLoading: loading }
}

export default useUserLocation
