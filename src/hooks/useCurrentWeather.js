import {useState, useEffect} from "react";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const useCurrentWeather = (lat, lon) => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [error, setError] = useState(null);
    //const {NEXT_PUBLIC_API_KEY: apiKey} = process.env;

    useEffect(() => {
        //const apiKey = '0f7d217aa91b4baf966110425241108';
            axios.get`https://api.weatherapi.com/v1/current.json?key=0f7d217aa91b4baf966110425241108&q={lat, lon}&aqi=no`
                .then(response => {
                    setCurrentWeather(currentWeather ? response.data : response.data.current.condition.text)
                })
                .catch(error => {
                    console.log(error);
                });
        }, [lat, lon]);

    return {currentWeather, error};
}

export default useCurrentWeather;