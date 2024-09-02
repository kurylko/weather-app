import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json(
      { error: 'City name is required' },
      { status: 400 }
    )
  }

  require('dotenv').config()
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'No API Key' }, { status: 500 })
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`

  try {
    const response = await fetch(url)

    const data = await response.json()

    console.log('Google Maps API response:', data)

    if (data.status === 'OK' && data.results.length > 0) {
      const coordinates = data.results[0].geometry.location
      return NextResponse.json({ placeData: coordinates })
    } else {
      return NextResponse.json(
        { error: 'No coordinates found' },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
