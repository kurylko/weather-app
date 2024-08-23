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
import parseApiDateResponse from "@/utils/parseApiDateResponse";
import {getBigWeatherIcon} from "@/utils/getBigWeatherIcon";
import {getUvIcon} from "@/utils/getUvIcon";
import React from "react";

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
    const hourlyWeatherDataForSpecificHours = hourlyWeatherData.length ? [0, 6, 12, 18].map((hourIndex => hourlyWeatherData[hourIndex])) : null;

    const currentDay = forecast?.forecast['forecastday'][0];
    const currentDayAndDateString = currentDay?.date ? parseApiDateResponse((currentDay?.date), 'dayAndDate') : null;

    const getInteger = (number) => Math.round(number);

    console.log('ttttvv', currentWeather)

    function getCloudDescription(cloudPercentage) {
        if (cloudPercentage >= 91) {
            return 'The sky is completely overcast with dense clouds'
        } else if (cloudPercentage >= 76) {
            return 'The sky is mostly covered with clouds'
        } else if (cloudPercentage >= 51) {
            return 'The sky is mostly cloudy with some clear spots'
        } else if (cloudPercentage >= 26) {
            return 'The sky is partly cloudy with significant clear patches'
        } else if (cloudPercentage >= 11) {
            return 'The sky is partly cloudy with occasional clouds'
        } else if (cloudPercentage >= 1) {
            return 'The sky is mostly clear with a few clouds'
        } else {
            return 'The sky is completely clear with no clouds.'
        }
    }


    const forecastWithCurrentDay = forecast?.forecast["forecastday"];
    const forecastWithoutCurrentDay = forecastWithCurrentDay?.slice(1);
    console.log('forecast', forecastWithoutCurrentDay);


    return (
        <div className='home-page'>
            <CurrentWeatherCard currentWeather={currentWeather}
                                loading={currentWeatherLoading}
                                date={currentDayAndDateString}
                                city={currentWeather?.location?.name}
                                region={currentWeather?.location?.region}
                                country={currentWeather?.location?.country}
                                condition={getBigWeatherIcon({weatherCondition: currentWeather?.current?.condition.text})}
                                temperature={currentWeather?.current?.temp_c}
                                feelsLike={currentWeather?.current?.feelslike_c}
                                cloud={getCloudDescription(currentWeather?.current?.cloud)}
                                humidityN={currentWeather?.current?.humidity}
                                windDir={currentWeather?.current?.wind_dir}
                                windKph={currentWeather?.current?.wind_kph}
                                pressureN={currentWeather?.current?.pressure_mb}
                                uvIndexIcon={getUvIcon({uvIndex: currentWeather?.current?.uv})}
                                uvIndex={currentWeather?.current?.uv}
            />
            <div className='forecast-cards-container'>
                {!!forecast && <span>3 days forecast</span>}
                <div className='forecast-cards'>
                    {forecastWithoutCurrentDay ? forecastWithoutCurrentDay.map((forecastDay) =>
                        <ForecastCard
                            key={forecastDay.date}
                            forecast={forecast}
                            loading={forecastLoading}
                            day={parseApiDateResponse(forecastDay?.date, 'dayOnly')}
                            condition={getBigWeatherIcon({weatherCondition: forecastDay.day.condition.text})}
                            maxTemp={getInteger(forecastDay.day.maxtemp_c)}
                            minTemp={getInteger(forecastDay.day.mintemp_c)}
                            humidityN={forecastDay.day.avghumidity}
                            windN={getInteger(forecastDay.day.maxwind_kph)}
                            uvIcon={getUvIcon({uvIndex: forecastDay.day.uv})}
                            uvIndex={forecastDay.day.uv}
                        />
                    ) : null}
                </div>
            </div>

            {!!forecast && <span>Sun and Moon forecast</span>}
            <Astro forecast={forecast}/>
            {!!currentDayAndDateString &&
                <span className='current-day-hourly'>{`Weather on ${currentDayAndDateString}`}</span>}
            <div className='hourly-weather-card-container'>
                {hourlyWeatherDataForSpecificHours && hourlyWeatherDataForSpecificHours.map((hourly) =>
                    <HourlyWeatherCard key={hourly.time}
                                       time={parseApiDateResponse((hourly.time), 'hourOnly')}
                                       temp={getInteger(hourly.temp_c)}
                                       humidity={hourly.humidity}
                                       wind={getInteger(hourly.wind_kph)}
                                       rain={hourly.chance_of_rain}
                                       condition={hourly.condition.text}
                    />
                )}
            </div>
            {geoLocationData ? <p> {`User's location: ${geoLocationData.lat}, ${geoLocationData.lon}`} </p> :
                <p> No location detected </p>}
            {!!placeFromSearch && <p>{`User's Display location: ${placeFromSearch.lat}, ${placeFromSearch.lon}`}</p>}
        </div>
    );
}
