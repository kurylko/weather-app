import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import HeaderLocation from '@/components/HeaderLocation'
import SearchBar from '@/components/SearchBar'
import useCurrentWeather from '@/hooks/useCurrentWeather'
import useUserLocation from '@/hooks/useUserLocation'
import { getCoordinates } from '@/state/searchPlaceSlice'
import { getBigWeatherIcon } from '@/utils/getBigWeatherIcon'
import { getCityName } from '@/utils/getCityName'

const Header = () => {
  const pathname = usePathname()

  const [city, setCity] = useState(null)

  const dispatch = useDispatch()

  const [searchInput, setSearchInput] = useState('')
  const inputRef = useRef(null)

  const handleChangeSearch = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  const handleSearch = () => {
    dispatch(getCoordinates({ city: searchInput }))
    setSearchInput('')
    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
      setSearchInput('')
      if (inputRef.current) {
        inputRef.current.blur()
      }
    }
  }

  const browserLocation = useUserLocation()
  const locationData =
    browserLocation?.geoLocationData?.lat != null
      ? browserLocation?.geoLocationData
      : null

  useEffect(() => {
    const fetchCityName = async () => {
      if (locationData) {
        const cityName = await getCityName({ geolocationData: locationData })
        setCity(cityName)
      }
    }

    fetchCityName()
  }, [locationData])

  const {
    currentWeather,
    error: currentWeatherError,
    loading: currentWeatherLoading,
  } = useCurrentWeather({ currentWeatherLocation: locationData })

  const currentWeatherCondition = currentWeather?.current?.condition?.text
  const currentWeatherIcon = getBigWeatherIcon({
    weatherCondition: currentWeatherCondition,
  })

  return (
    <header>
      <HeaderLocation
        city={city}
        icon={currentWeatherIcon}
        currentWeatherCondition={currentWeatherCondition}
      />
      {pathname !== '/no-geoData' && (
        <SearchBar
          onClick={handleSearch}
          onKeyDown={handleKeyDown}
          onChange={handleChangeSearch}
          searchInput={searchInput}
          inputRef={inputRef}
        />
      )}
    </header>
  )
}
export default Header
