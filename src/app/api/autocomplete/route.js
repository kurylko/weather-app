import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const input = searchParams.get('input')

  if (!input) {
    return NextResponse.json({ error: 'Input value required' }, { status: 400 })
  }
  require('dotenv').config()
  const apiKey = process.env.GOOGLE_PLACES_AUTOCOMPLETE_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'No API Key' }, { status: 500 })
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to fetch predictions')
    }

    const data = await response.json()
    if (data.status === 'OK') {
      const predictions = data.predictions
      return NextResponse.json({
        predictions: predictions ? predictions : 'No predictions available',
      })
    }
  } catch (error) {
    console.error('Error fetching predictions:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
