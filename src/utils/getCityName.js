export async function getCityName({ geolocationData }) {
  //const {lat: lat, lon: lng} = geolocationData;

  //const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  //const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  const url = `/api/get-city-name?lat=${geolocationData.lat}&lng=${geolocationData.lon}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText} can not fetch`)
  }

  const data = await response.json()
  return data?.city || 'City not found'
}
