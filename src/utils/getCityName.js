import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export async function getCityName({geolocationData}) {
    const {lat: lat, lon: lng} = geolocationData;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'OK') {
        const addressComponents = data.results[0].address_components;
        const city = addressComponents.find(component =>
            component.types.includes('locality')
        );
        return city ? city.long_name : 'City not found';

    } else {
        return 'City not found';
    }
}