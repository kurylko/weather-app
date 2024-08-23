import humidityIcon from './../../public/icons/humidity.png';
import windIcon from './../../public/icons/wind.png';
import thermometerIcon from './../../public/icons/thermometer.png';
import rainIcon from './../../public/icons/rain.png';
import Image from "next/image";
import {getBigWeatherIcon} from "@/utils/getBigWeatherIcon";

const HourlyWeatherCard = ({time, temp, humidity, wind, rain, condition}) => {


    return (
        <div className='hourly-weather-card'>
            <div className='hourly-weather-card-item hourly-time'>{time}</div>
            <div className='hourly-weather-card-item'>
                <Image className='condition-hourly-icon-big' src={getBigWeatherIcon({weatherCondition: condition})}
                       alt='weather-icon'></Image>
            </div>
            <div className='hourly-weather-card-item'>
                <Image className='hourly-weather-card-icon' src={thermometerIcon} alt='temperature-icon'></Image>
                {`${temp} C°`}</div>
            <div className='hourly-weather-card-item'>
                <Image className='hourly-weather-card-icon' src={humidityIcon} alt='humidity-icon'></Image>
                {`${humidity }%` }</div>
            <div className='hourly-weather-card-item'>
                <Image className='hourly-weather-card-icon' src={windIcon} alt='wind-icon'></Image>
                {`${wind} km/h`}</div>
            <div className='hourly-weather-card-item'>
                <Image className='hourly-weather-card-icon' src={rainIcon} alt='rain-icon'></Image>
                {`${rain} %`}</div>
        </div>
    )
}

export default HourlyWeatherCard;