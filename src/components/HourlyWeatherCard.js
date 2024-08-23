const HourlyWeatherCard = ({forecast}) => {
    if (!forecast?.forecast) {
        return;
    }

    const hourlyWeatherData = forecast.forecast['forecastday'][0]['hour'];

    const hourlyWeatherDataForSpecificHours = [0, 6, 12, 18].map((hourIndex => hourlyWeatherData[hourIndex]));

    console.log('hourlyWeather:', hourlyWeatherDataForSpecificHours);

    return (
        <div className='hourly-weather-card'>hourly
            <div></div>
        </div>
    )
}

export default HourlyWeatherCard;