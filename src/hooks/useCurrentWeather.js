import {useState, useEffect} from "react";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const useCurrentWeather = ({currentWeatherLocation}) => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [error, setError] = useState(null);
    const {lat, lon} = currentWeatherLocation || {};

    useEffect(() => {

        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        if(lat && lon ) {
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat}, ${lon}&aqi=no`
            axios.get(url)
                .then(response => {
                    setCurrentWeather(currentWeather ? response.data : response.data)
                })
                .catch(error => {
                    setError('Can not catch weather data');
                    console.log("Can not catch weather data");
                });}
        }, [lat, lon]);

    return {currentWeather, error};
}

export default useCurrentWeather;