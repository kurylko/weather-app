import {NextResponse} from 'next/server';

export async function GET(request) {
    const {searchParams} = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (!lat || !lng) {
        return NextResponse.json(
            {error: 'Latitude and longitude are required'},
            {status: 400}
        );
    }

    require('dotenv').config();
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            {error: 'No API Key'},
            {status: 500}
        );
    }


    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Google Maps API response:', data);

        if (data.status === 'OK') {
            const addressComponents = data.results[0].address_components;
            const city = addressComponents.find(component =>
                component.types.includes('locality')
            );
            return NextResponse.json(
                {city: city ? city.long_name : 'City not found'}
            );
        } else {
            return NextResponse.json(
                {error: 'City not found'},
                {status: 404}
            );
        }
    } catch (error) {
        console.error('Error fetching city:', error);
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        );
    }

}