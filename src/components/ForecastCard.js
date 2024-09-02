import humidity from '@public/icons/humidity.png'
import thermometer from '@public/icons/thermometer.png'
import wind from '@public/icons/wind.png'
import Image from 'next/image'

const ForecastCard = ({
  day,
  condition,
  maxTemp,
  minTemp,
  humidityN,
  windN,
  uvIcon,
  uvIndex,
}) => {
  return (
    <div className="forecast-card">
      <h3 className="forecast-day">{day}</h3>
      <Image
        className="forecast-big-icon"
        src={condition}
        priority
        alt="weather-condition-icon"
      ></Image>
      <span className="forecast-max-temp"> {`${maxTemp} C°`}</span>
      <div className="forecast-number-icon-container">
        <div className="forecast-number-icon">
          <Image
            className="forecast-card-icon"
            src={thermometer}
            alt="temp-icon"
          ></Image>
          {`${minTemp} C°`}
        </div>
        <div className="forecast-number-icon">
          <Image
            className="forecast-card-icon"
            src={humidity}
            alt="humidity-icon"
          ></Image>
          {`${humidityN}%`}
        </div>
        <div className="forecast-number-icon">
          <Image
            className="forecast-card-icon"
            src={wind}
            alt="wind-icon"
          ></Image>
          {`${windN} km/h`}
        </div>
        <div className="forecast-number-icon">
          <Image
            className="forecast-card-icon"
            src={uvIcon}
            alt="uv-icon"
          ></Image>
          {`${uvIndex}`}
        </div>
      </div>
    </div>
  )
}
export default ForecastCard
