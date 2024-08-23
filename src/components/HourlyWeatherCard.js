const HourlyWeatherCard = ({forecast}) => {
    if (!forecast?.forecast) {
        return;
    }

    const hourlyWeather = forecast.forecast['forecastday'][0][''];

    return (
        <div className='hourly-weather-card'>hourly </div>
    )
}

export default HourlyWeatherCard;