import React from "react"
import parseApiDateResponse from "@/utils/parseApiDateResponse";
import Image from 'next/image';
import humidity from './../../public/icons/humidity.png';
import pressure from './../../public/icons/pressure.png';
import wind from './../../public/icons/wind.png';
import getUvIcon from "@/utils/getUvIcon";
import getBigWeatherIcon from "@/utils/getBigWeatherIcon";
import Loading from "@/app/loading";

const CurrentWeatherCard = ({currentWeather, loading}) => {
     if (!currentWeather || !currentWeather.current) {
        return (
            <div>The weather data is not available. Please, try again later. </div>
        )
    } else if (loading) {
        return (loading);
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
            <>
                {loading ? <Loading/> :
                    <div className='current-weather-card'>
                <span
                    className='current-location'>{`${currentWeather.location.name}, ${currentWeather.location.region} (${currentWeather.location.country})`}</span>
                        <span className='current-date'>{date}</span>
                        <div>
                            <Image className='current-weather-image'
                                   src={getBigWeatherIcon(currentWeather.current.condition.text)}
                                   alt='big-weather-icon'></Image>
                        </div>
                        <div className='current-temperature-container'>
                            <span className='current-temperature'>{`${currentWeather.current.temp_c} C°`}</span>
                            <span
                                className='feels-like-temp'>Feels like: {`${currentWeather.current.feelslike_c} C°`}</span>
                        </div>
                        <span className='cloud-desc-text'>{getCloudDescription(currentWeather.current.cloud)}</span>
                        <div className='current-weather-numbers'>
                            <div className='current-icon-number'>
                                <Image className='current-card-icon' src={humidity} alt='windy-icon'></Image>
                                <span className='current-card-icon-text'>{`${currentWeather.current.humidity}%`}</span>
                            </div>
                            <div className='current-icon-number'>
                                <Image className='current-card-icon' src={wind} alt='windy-icon'></Image>
                                <span
                                    className='current-card-icon-text'>{`${currentWeather.current.wind_dir}, ${currentWeather.current.wind_kph} km/h`}</span>
                            </div>
                            <div className='current-icon-number'>
                                <Image className='current-card-icon' src={pressure} alt='windy-icon'></Image>
                                <span
                                    className='current-card-icon-text'>{`${currentWeather.current.pressure_mb} mb`}</span>
                            </div>
                            <div className='current-icon-number'>
                                <Image className='current-card-icon' src={getUvIcon(currentWeather.current.uv)}
                                       alt='windy-icon'></Image>
                                <span className='current-card-icon-text'>{currentWeather.current.uv}</span>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }
}
export default CurrentWeatherCard;