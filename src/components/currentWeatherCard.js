import React from "react"
import parseApiDateResponse from "@/utils/parseApiDateResponse";
import Image from 'next/image';
import windy from './../../public/icons/windy.png';
import rain  from './../../public/icons/rain.png';
import sunny from './../../public/icons/sunny.png';
import thermometer from './../../public/icons/thermometer.png';
import uv from './../../public/icons/uv.png';
import uvWarn from './../../public/icons/uv-warn.png';
import humidity from './../../public/icons/humidity.png';
import pressure from './../../public/icons/pressure.png';
import wind from './../../public/icons/wind.png';
import getUvIcon from "@/utils/getUvIcon";

const CurrentWeatherCard = ({currentWeather, formattedCurrentDate}) => {
    if (!currentWeather || !currentWeather.current) {
        return (
            <div>The weather data is not available. Please, try again later. </div>
        )
    } else {

        const currentDateString = currentWeather.location.localtime;
        const date = parseApiDateResponse(currentDateString);

        //const date = new Date (dateString);
        // const formattedDate = format(date, 'eeee, MMMM d, h:mm a');

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


        return (
            <div className='current-weather-card'>
                <div>{`${currentWeather.location.name}, ${currentWeather.location.region} (${currentWeather.location.country})`}</div>
                <div>{date}</div>
                <div>
                    <img className='current-weather-image' src={currentWeather.current.condition.icon}></img>
                </div>
                <div className='current-temperature-container'><p className='current-temperature'>{`${currentWeather.current.temp_c} C°`}</p>
                    <div>Feels like: {`${currentWeather.current.feelslike_c} C°`}</div>
                </div>
                <div className='current-weather-numbers'>
                    <div className='current-icon-number'><Image className='forecast-card-icon' src={humidity} alt='windy-icon'></Image>
                       <p>{`${currentWeather.current.humidity}%`}</p> </div>
                    <div className='current-icon-number'><Image className='forecast-card-icon' src={wind} alt='windy-icon'></Image>
                        <p>{`${currentWeather.current.wind_dir}, ${currentWeather.current.wind_kph} km/h`}</p>
                        </div>
                    <div className='current-icon-number'><Image className='forecast-card-icon' src={pressure} alt='windy-icon'></Image>
                        <p> {`${currentWeather.current.pressure_mb} mb`}</p></div>
                    <div className='current-icon-number'> <Image className='forecast-card-icon' src={getUvIcon(currentWeather.current.uv)} alt='windy-icon'></Image>
                        <p> {currentWeather.current.uv}</p>
                       </div>
                </div>
                <div>{getCloudDescription(currentWeather.current.cloud)}</div>
            </div>
        );
    }
}
export default CurrentWeatherCard;