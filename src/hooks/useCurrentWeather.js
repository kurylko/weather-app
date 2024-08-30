import {useState, useEffect} from "react";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const useCurrentWeather = ({currentWeatherLocation}) => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [error, setError] = useState(null);
    const {lat, lon} = currentWeatherLocation || {};
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        if (lat && lon) {
            setLoading(true);
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat}, ${lon}&aqi=yes`
            axios.get(url)
                .then(response => {
                    setCurrentWeather(currentWeather ? response.data : response.data)
                })
                .catch(error => {
                    setError('Sorry. The weather data is not available. Please, try again later');
                    console.warn("Can not catch weather data");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [lat, lon]);

    return {currentWeather, error, loading};
}

export default useCurrentWeather;