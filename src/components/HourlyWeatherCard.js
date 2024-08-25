import humidityIcon from './../../public/icons/humidity.png';
import windIcon from './../../public/icons/wind.png';
import thermometerIcon from './../../public/icons/thermometer.png';
import rainIcon from './../../public/icons/rain.png';
import Image from "next/image";
import {getBigWeatherIcon} from "@/utils/getBigWeatherIcon";

const HourlyWeatherCard = ({time, temp, humidity, wind, rain, condition}) => {


    return (
        <div className='hourly-weather-card'>
            <div className='hourly-time'>{time}</div>
            <div className='hourly-weather-card-item-container'>
                <Image className='condition-hourly-icon-big' src={getBigWeatherIcon({weatherCondition: condition})}
                       alt='weather-icon'></Image>
                <div className='hourly-weather-card-item'>
                    <Image className='hourly-weather-card-icon' src={thermometerIcon} alt='temperature-icon'></Image>
                    <h3 className='hourly-text'>{`${temp} C°`}</h3>
                </div>
                <div className='hourly-weather-card-item'>
                    <Image className='hourly-weather-card-icon' src={humidityIcon} alt='humidity-icon'></Image>
                    <span className='hourly-text'>{`${humidity}%`}</span>
                </div>
                <div className='hourly-weather-card-item'>
                    <Image className='hourly-weather-card-icon' src={windIcon} alt='wind-icon'></Image>
                    <span className='hourly-text'>{`${wind} km/h`}</span>
                </div>
                <div className='hourly-weather-card-item'>
                    <Image className='hourly-weather-card-icon' src={rainIcon} alt='rain-icon'></Image>
                    <span className='hourly-text'>{`${rain} %`}</span>
                </div>
            </div>
        </div>
    )
}

export default HourlyWeatherCard;