'use client';

import './global.css';
import useUserLocation from "@/hooks/useUserLocation";
import useCurrentWeather from "@/hooks/useCurrentWeather";
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import ForecastCard from "@/components/ForecastCard";
import Astro from "@/components/Astro";
import useForecast from "@/hooks/useForecast";
import {useSelector} from "react-redux";
import {selectPlaceFromSearch} from "@/state/selectors";
import HourlyWeatherCard from "@/components/HourlyWeatherCard";

export default function Home() {
    const {geoLocationData, geoLocationError} = useUserLocation();
    const placeFromSearch = useSelector(selectPlaceFromSearch);

    const activeLocation = placeFromSearch || geoLocationData

    const {
        currentWeather,
        error: currentWeatherError,
        loading: currentWeatherLoading
    } = useCurrentWeather({currentWeatherLocation: activeLocation});
    const {
        forecast,
        error: forecastError,
        loading: forecastLoading
    } = useForecast({forecastWeatherLocation: activeLocation});


    return (
        <div className='home-page'>
            <CurrentWeatherCard currentWeather={currentWeather} loading={currentWeatherLoading}/>
            <ForecastCard forecast={forecast} loading={forecastLoading}></ForecastCard>
            <Astro forecast={forecast}/>
            <HourlyWeatherCard forecast={forecast}/>

            {geoLocationData ? <p> {`User's location: ${geoLocationData.lat}, ${geoLocationData.lon}`} </p> :
                <p> No location detected </p>}
            {!!placeFromSearch && <p>{`User's Display location: ${placeFromSearch.lat}, ${placeFromSearch.lon}`}</p>}
        </div>
    );
}
