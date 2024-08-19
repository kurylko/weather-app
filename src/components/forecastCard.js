import React from "react";
import Image from 'next/image';
import parseApiDateResponse from "@/utils/parseApiDateResponse";
import thermometer from './../../public/icons/thermometer.png';
import humidity from './../../public/icons/humidity.png';
import wind from './../../public/icons/wind.png';
import getUvIcon from "@/utils/getUvIcon";
import getBigWeatherIcon from "@/utils/getBigWeatherIcon";


const ForecastCard = ({forecast}) => {
    if (!forecast || !forecast.forecast) {
        return <div>The weather forecast is not available. Please, try again later. </div>
    }
    const forecastWithCurrentDay = forecast.forecast["forecastday"];
    const forecastWithoutCurrentDay = forecastWithCurrentDay.slice(1);
    //const forecastDateString = forecast.forecast["forecastday"]["date"];

    const getInteger = (number) => {
        const integer = Math.round(number);
        return integer;
    }



    return (
        <div className='forecast-cards-container'>
            <span>Next 3 days forecast</span>
            <div className='forecast-cards'>
                {forecastWithoutCurrentDay.map((forecastDay) =>
                    <div key={forecastDay.date} className='forecast-card'>
                        <span>{parseApiDateResponse(forecastDay["date"], 'dayOnly')}</span>
                        <Image className='forecast-big-icon' src={getBigWeatherIcon(forecastDay.day.condition.text)} alt='weather-condition-icon'></Image>
                        <span className='forecast-max-temp'> {`${getInteger(forecastDay.day.maxtemp_c)} C°`}</span>
                        <div className='forecast-number-icon-container'>
                            <div className='forecast-number-icon'>
                                <Image className='forecast-card-icon' src={thermometer} alt='temp-icon'></Image>
                                {`${getInteger(forecastDay.day.mintemp_c)} C°`}
                            </div>
                            <div className='forecast-number-icon'><Image className='forecast-card-icon' src={humidity}
                                                                         alt='humidity-icon'></Image>
                                {`${forecastDay.day.avghumidity}%`}</div>
                            <div className='forecast-number-icon'>
                                <Image className='forecast-card-icon' src={wind} alt='wind-icon'></Image>
                               {`${getInteger(forecastDay.day.maxwind_kph)} km/h`}
                            </div>
                            <div className='forecast-number-icon'>
                                <Image className='forecast-card-icon' src={getUvIcon(forecastDay.day.uv)} alt='uv-icon'></Image>
                               {`${forecastDay.day.uv}`}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default ForecastCard;