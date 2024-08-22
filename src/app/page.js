'use client';

import './global.css';
import useUserLocation from "@/hooks/useUserLocation";
import useCurrentWeather from "@/hooks/useCurrentWeather";
import CurrentWeatherCard from "@/components/currentWeatherCard";
import ForecastCard from "@/components/forecastCard";
import Astro from "@/components/astro";
import useForecast from "@/hooks/useForecast";
import {useSelector} from "react-redux";
import {selectCurrentPlace} from "@/state/selectors";

export default function Home({locationDisplayFromProps}) {
    const {actualLocation, error: locationError} = useUserLocation();
    const {lat: actualLat, lon: actualLon} = actualLocation;

    const {placeFromSearchLat, placeFromSearchLon} = useSelector(selectCurrentPlace);


    const locationDisplay = locationDisplayFromProps || {lat: null, lon: null};
    const {lat: locationDisplayLat, lon: locationDisplayLon} = locationDisplay;

    const {
        currentWeather,
        error: currentWeatherError,
        loading: currentWeatherLoading
    } = useCurrentWeather({currentWeatherLocation: locationDisplay});
    const {
        forecast,
        error: forecastError,
        loading: forecastLoading
    } = useForecast({forecastWeatherLocation: locationDisplay});


    return (
        <div className='home-page'>
            <CurrentWeatherCard currentWeather={currentWeather} loading={currentWeatherLoading}/>
            <ForecastCard forecast={forecast} loading={forecastLoading}></ForecastCard>
            <Astro forecast={forecast}/>
            {actualLocation ? <p> {`User's location: ${actualLocation.lat}, ${actualLocation.lon}`} </p> :
                <p> No location detected </p>}
            {placeFromSearchLat && <p>{`User's Display location: ${placeFromSearchLat}, ${placeFromSearchLon}`}</p>}
        </div>
    );
}
