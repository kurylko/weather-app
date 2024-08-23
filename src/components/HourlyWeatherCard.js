const HourlyWeatherCard = ({time, temp, humidity, wind, rain, condition}) => {


    return (
        <div className='hourly-weather-card'>
            <div className='hourly-weather-card-item'>Time: {time}</div>
            <div className='hourly-weather-card-item'>Condition:{condition}</div>
            <div className='hourly-weather-card-item'>Chance of rain:{rain}</div>
            <div className='hourly-weather-card-item'>Temperature: {temp}</div>
            <div className='hourly-weather-card-item'>Humidity: {humidity}</div>
            <div className='hourly-weather-card-item'>Wind km/h:{wind}</div>
        </div>
    )
}

export default HourlyWeatherCard;