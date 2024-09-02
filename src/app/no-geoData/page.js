'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import SearchBar from '@/components/SearchBar'
import { getCoordinates } from '@/state/searchPlaceSlice'

export default function NoGeoDataPage() {
  const router = useRouter()

  const dispatch = useDispatch()

  const [searchInput, setSearchInput] = useState('')

  const handleChangeSearch = (e) => setSearchInput(e.target.value)

  const handleSearch = () => {
    dispatch(getCoordinates({ city: searchInput }))
    setSearchInput('')
    router.push('/weather')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
      setSearchInput('')
      router.push('/weather')
    }
  }

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
      />
    </div>
  )
}
