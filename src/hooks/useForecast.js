import {useState, useEffect} from "react";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const useForecast = ({forecastWeatherLocation}) => {
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);

    const {lat, lon} = forecastWeatherLocation || {};

    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        if(lat && lon ) {
            const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat}, ${lon}&days=4&aqi=no&alerts=no`
            axios.get(url)
                .then(response => {
                    setForecast(forecast ? response.data : response.data)
                })
                .catch(error => {
                    console.log("Can not catch weather forecast data");
                });}
    }, [lat, lon]);

    return {forecast, error};
}

export default useForecast;