import React from "react";
import Image from 'next/image';
import parseApiDateResponse from "@/utils/parseApiDateResponse";
import thermometer from './../../public/icons/thermometer.png';
import humidity from './../../public/icons/humidity.png';
import wind from './../../public/icons/wind.png';
import {getUvIcon} from "@/utils/getUvIcon";
import {getBigWeatherIcon} from "@/utils/getBigWeatherIcon";
import Loader from "@/components/Loader";


const ForecastCard = ({forecast, loading, day, condition, maxTemp, minTemp, humidityN, windN, uvIcon, uvIndex}) => {

    const noForecastMessage = 'The weather forecast is not available. Please, try again later.';
    const forecastLoaderText = 'Loading weather forecast...';

    if (loading) {
        return (
            <div className='current-weather-card no-weather-card'>
                <Loader loaderText={forecastLoaderText}/>
            </div>
        );
    } else if (!forecast || !forecast.forecast) {
        return <div className='current-weather-card'>{noForecastMessage} </div>
    }


    return (
        <div className='forecast-card'>
            <span className='forecast-day'>{day}</span>
            <Image className='forecast-big-icon'
                   src={condition}
                   alt='weather-condition-icon'></Image>
            <span className='forecast-max-temp'> {`${maxTemp} C°`}</span>
            <div className='forecast-number-icon-container'>
                <div className='forecast-number-icon'>
                    <Image className='forecast-card-icon' src={thermometer} alt='temp-icon'></Image>
                    {`${minTemp} C°`}
                </div>
                <div className='forecast-number-icon'><Image className='forecast-card-icon' src={humidity}
                                                             alt='humidity-icon'></Image>
                    {`${humidityN}%`}</div>
                <div className='forecast-number-icon'>
                    <Image className='forecast-card-icon' src={wind} alt='wind-icon'></Image>
                    {`${windN} km/h`}
                </div>
                <div className='forecast-number-icon'>
                    <Image className='forecast-card-icon' src={uvIcon}
                           alt='uv-icon'></Image>
                    {`${uvIndex}`}
                </div>
            </div>
        </div>
    );
}
export default ForecastCard;