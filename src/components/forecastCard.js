import React from "react";
import Image from 'next/image';
import parseApiDateResponse from "@/utils/parseApiDateResponse";
import windy from './../../public/icons/windy.png';
import rain from './../../public/icons/rain.png';
import sunny from './../../public/icons/sunny.png';

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
            <p>Next 3 days forecast</p>
            <div className='forecast-cards'>
                {forecastWithoutCurrentDay.map((forecastDay) =>
                    <div key={forecastDay.date} className='forecast-card'>
                        <div>{parseApiDateResponse(forecastDay["date"], 'dayOnly')}</div>
                        <img className='forecast-big-icon' src={forecastDay.day.condition.icon}></img>
                        <p className='forecast-max-temp'> {`${getInteger(forecastDay.day.maxtemp_c)} C°`}</p>
                        <div className='forecast-number-icon-container'>
                            <div className='forecast-number-icon'><Image className='forecast-card-icon' src={sunny}
                                                                         alt='sunny-icon'></Image>
                                {`${getInteger(forecastDay.day.mintemp_c)} C°`}
                            </div>
                            <div className='forecast-number-icon'><Image className='forecast-card-icon' src={rain}
                                                                         alt='rain-icon'></Image>
                                {`${forecastDay.day.avghumidity}%`}</div>
                            <div className='forecast-number-icon'>
                                <Image className='forecast-card-icon' src={windy} alt='windy-icon'></Image>
                                <p>{`${getInteger(forecastDay.day.maxwind_kph)} km/h`}</p>
                            </div>
                            <div>UV-index: {forecastDay.day.uv}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default ForecastCard;