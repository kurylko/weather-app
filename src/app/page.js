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


    const hourlyWeatherData = forecast?.forecast['forecastday'][0]['hour'] || [];
    const hourlyWeatherDataForSpecificHours = [0, 6, 12, 18].map((hourIndex => hourlyWeatherData[hourIndex]));
    console.log(hourlyWeatherDataForSpecificHours);


    return (
        <div className='home-page'>
            <CurrentWeatherCard currentWeather={currentWeather} loading={currentWeatherLoading}/>
            <ForecastCard forecast={forecast} loading={forecastLoading}></ForecastCard>
            <Astro forecast={forecast}/>
            <div className='hourly-weather-card-container'>
            {hourlyWeatherDataForSpecificHours && hourlyWeatherDataForSpecificHours.map((hourly) =>
                <HourlyWeatherCard key={hourly?.time}
                                   time={hourly?.time}
                                   temp={hourly?.temp_c}
                                   humidity={hourly?.humidity}
                                   wind={hourly?.wind_kph}
                                   rain={hourly?.chance_of_rain}
                                   condition={hourly?.condition.text}
                />
            )}
            </div>
            {geoLocationData ? <p> {`User's location: ${geoLocationData.lat}, ${geoLocationData.lon}`} </p> :
                <p> No location detected </p>}
            {!!placeFromSearch && <p>{`User's Display location: ${placeFromSearch.lat}, ${placeFromSearch.lon}`}</p>}
        </div>
    );
}
