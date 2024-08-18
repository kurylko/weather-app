import axios from "axios";
import {error} from "next/dist/build/output/log";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;


export async function getCoordinates({city}) {

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;

    try {
        const response = await axios.get(url, {
            params: {
                address: city,
                key: apiKey
            }
        });

        const results = response.data.results;
        if (results.length > 0) {
            const {lat: latitude, lng: longitude} = results[0].geometry.location;
            return {latitude, longitude};
        } else {
            throw error('No results found');
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
}

