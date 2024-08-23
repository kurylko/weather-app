const HourlyWeatherCard = ({time, temp, humidity, wind, rain, condition}) => {


    return (
        <div className='hourly-weather-card'>
            <div className='hourly-weather-card-item'>{time}</div>
            <div className='hourly-weather-card-item'>{condition}</div>
            <div className='hourly-weather-card-item'>Chance of rain:{rain}</div>
            <div className='hourly-weather-card-item'>{temp}</div>
            <div className='hourly-weather-card-item'>{humidity}</div>
            <div className='hourly-weather-card-item'>{wind}</div>
        </div>
    )
}

export default HourlyWeatherCard;