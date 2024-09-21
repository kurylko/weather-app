'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import SearchBar from '@/components/SearchBar'
import usePlacesAutocomplete from '@/hooks/usePlacesAutocomplete'
import { getCoordinates } from '@/state/searchPlaceSlice'

export default function NoGeoDataPage() {
  const router = useRouter()

  const dispatch = useDispatch()

  const [searchInput, setSearchInput] = useState('')
  const [triggerSearch, setTriggerSearch] = useState(false)
  const inputRef = useRef(null)

  const { predictions, fetchPredictions, setPredictions } =
    usePlacesAutocomplete()

  const handleChangeSearch = (e) => {
    setSearchInput(e.target.value)
    if (e.target.value) {
      fetchPredictions(e.target.value)
    } else {
      setPredictions([])
    }
  }

  const handleSearch = () => {
    dispatch(getCoordinates({ city: searchInput }))
    setSearchInput('')
    setPredictions([])
    if (inputRef.current) {
      inputRef.current.blur()
    }
    router.push('/weather')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
      setSearchInput('')
      setPredictions([])
      if (inputRef.current) {
        inputRef.current.blur()
      }
      router.push('/weather')
    }
  }

  const onPredictionClick = (prediction) => {
    setSearchInput(prediction.description)
    setTriggerSearch(true)
    setPredictions([])
  }

  useEffect(() => {
    if (triggerSearch) {
      handleSearch()
      setTriggerSearch(false)
    }
  }, [triggerSearch])

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          router.push('/weather')
        },
        (error) => {
          console.warn('Geolocation error:', error.message)
        }
      )
    } else {
      console.warn('No geolocation in browser')
    }
  }, [router])

  return (
    <div className="no-user-geolocation-page">
      <span className="no-geolocation-text">
        Enable geolocation in your browser or type the location in search.
      </span>
      <SearchBar
        onClick={handleSearch}
        onKeyDown={handleKeyDown}
        onChange={handleChangeSearch}
        searchInput={searchInput}
        inputRef={inputRef}
        predictions={predictions}
        onPredictionClick={onPredictionClick}
      />
    </div>
  )
}
